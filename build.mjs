// build.mjs
import esbuild from 'esbuild';
import {cp, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {minify as minifyHTML} from 'html-minifier-terser';
import process from 'process';
import frictionPlugin from "./plugins/friction.mjs";

const ROOT = process.cwd();
const SRC = 'src';
const DIST = 'dist';

const isCI =
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.CI === 'true' ||
    process.env.NODE_ENV === 'production';

const override = process.env.DEV?.toLowerCase();
const DEV = override === 'true' ? true
    : override === 'false' ? false
        : !isCI;

await mkdir(DIST, {recursive: true});

await esbuild.build({
    entryPoints: ['src/js/app.js'],
    bundle: true,
    globalName: 'D',
    define: { __DEV__: DEV ? 'true' : 'false' },
    // banner: { js: `const __DEV__ = ${DEV ? 'true' : 'false'};` },

    minify: !DEV,
    minifyIdentifiers: !DEV,
    minifySyntax: !DEV,
    minifyWhitespace: !DEV,
    keepNames: DEV,
    sourcemap: DEV ? 'inline' : false,

    // only mangle in prod; leave undefined in dev
    mangleProps: DEV ? undefined : /^_x_/,
    mangleQuoted: DEV ? undefined : true,
    reserveProps: /^__/,        // never touch __proto__/__*
    mangleCache: DEV ? undefined : {},

    format: 'iife',
    target: 'es2018',
    legalComments: 'none',
    drop: ['debugger'],
    outfile: 'dist/app.js',
    plugins: [
        frictionPlugin()
    ]
});

// -----------------------------------------------------------------------------
// Build HTML (inline CSS, inject script, minify)
let inlineCSS = '';
try {
    const files = await readdir(join(SRC, 'css'));
    for (const f of files) if (f.endsWith('.css')) {
        let css = await readFile(join(SRC, 'css', f), 'utf8');
        css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // strip comments
        inlineCSS += css + '\n';
    }
} catch { /* no css dir, fine */ }

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
} catch { /* no assets dir, fine */ }

console.log(`✅ Built (${DEV ? 'dev' : 'prod'}) → dist/index.html + dist/app.js`);
