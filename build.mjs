// build.mjs
import esbuild from 'esbuild';
import { readFile, writeFile, mkdir, readdir, cp, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { minify as minifyHTML } from 'html-minifier-terser';
import process from 'process';

import stripConsoleLog from './plugins/stripConsoleLog.mjs';
import friction from './plugins/friction.mjs';

const ROOT = process.cwd();
const SRC  = 'src';
const DIST = 'dist';

await mkdir(DIST, { recursive: true });

/* -------- JS: bundle then let plugins post-process outfile -------- */
await esbuild.build({
    entryPoints: [join(SRC, 'js', 'main.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    target: 'es2018',
    legalComments: 'none',         // strip JS block comments in output
    drop: ['debugger'],            // keep console.error/warn; logs are removed by our plugin
    outfile: join(DIST, 'app.js'),
    write: true,                   // friction will rewrite outfile in-place onEnd
    plugins: [
        stripConsoleLog(),     // remove only console.log(...)
        friction({
            base64Strings: true,
            injectDecoy:  true,
            wrapEval:     false,       // set true if you want eval wrapper & accept CSP risk
            sabotageWhitespace: true
        })
    ]
});

/* -------- CSS inline (optional) -------- */
let inlineCSS = '';
try {
    const files = await readdir(join(SRC, 'css'));
    for (const f of files) if (f.endsWith('.css')) {
        let css = await readFile(join(SRC, 'css', f), 'utf8');
        css = css.replace(/\/\*[\s\S]*?\*\//g, ''); // strip comments
        inlineCSS += css + '\n';
    }
} catch {}

/* -------- HTML: load src, strip dev links, inject CSS+JS, minify -------- */
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
    minifyCSS: { level: 2 },
    minifyJS: { format: { comments: false } }
});

await writeFile(join(DIST, 'index.html'), min, 'utf8');

/* -------- extras: copy assets + CNAME if present -------- */
try { await cp(join(SRC, 'assets'), join(DIST, 'assets'), { recursive: true }); } catch {}
try { await copyFile(join(ROOT, 'CNAME'), join(DIST, 'CNAME')); } catch {}

console.log('✅ Built → dist/index.html + dist/app.js');
