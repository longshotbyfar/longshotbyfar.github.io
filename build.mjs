// build.mjs
import esbuild from 'esbuild';
import {cp, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {minify as minifyHTML} from 'html-minifier-terser';
import process from 'process';
import stripConsoleLogPlugin from "./plugins/stripConsoleLog.mjs";
import frictionPlugin from "./plugins/friction.mjs";

const ROOT = process.cwd();
const SRC = 'src';
const DIST = 'dist';

await mkdir(DIST, {recursive: true});

const MANGLE_PROP_PREFIX_RE = /^_x_/;

await esbuild.build({
    entryPoints: ['src/js/app.js'],
    bundle: true,
    globalName: 'D',

    define: {
        DEBUG: "false"   // will replace every DEBUG in your code with literal false
    },

    minify: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    keepNames: false,

    mangleProps: /^_x_/,
    mangleQuoted: true,          // also mangle "_x_*" when quoted
    reserveProps: /^__/,         // do NOT touch __proto__/__whatever
    mangleCache: {},             // optional: persist this object across builds

    format: 'iife',
    target: 'es2018',
    legalComments: 'none',
    drop: ['debugger'],
    outfile: 'dist/app.js',
    plugins: [
        stripConsoleLogPlugin(),
        frictionPlugin()
    ]
});

let inlineCSS = '';
try {
    const files = await readdir(join(SRC, 'css'));
    for (const f of files) if (f.endsWith('.css')) {
        let css = await readFile(join(SRC, 'css', f), 'utf8');
        css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // strip comments
        inlineCSS += css + '\n';
    }
} catch {
}

let html = await readFile(join(SRC, 'index.html'), 'utf8');
html = html.replace(
    /(<pre[\s\S]*?>[\s\S]*?<\/pre>)/g,
    block => block.replace(/<--/g, '&lt;--')
);
html = html
    .replace(/<link[^>]+href=["']\s*css\/[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<script[^>]*src=["']\s*js\/[^"']+["'][^>]*>\s*<\/script>\s*/gi, '')
    .replace(/\n\s*\n/g, '\n');
if (inlineCSS.trim()) {
    const styleTag = `<style>${inlineCSS}</style>`;
    html = html.includes('</head>') ? html.replace('</head>', `${styleTag}</head>`) : styleTag + html;
}

if (!/app\.js/.test(html)) {
    html = html.replace('</body>', '<script src="app.js" defer></script></body>');
}
const min = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: {level: 2},
    minifyJS: {format: {comments: false}}
});

await writeFile(join(DIST, 'index.html'), min, 'utf8');
try {
    await cp(join(SRC, 'assets'), join(DIST, 'assets'), {recursive: true});
} catch {
}

console.log('✅ Built → dist/index.html + dist/app.js');
