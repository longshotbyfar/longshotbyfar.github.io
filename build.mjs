// build.mjs
import esbuild from 'esbuild';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { minify as minifyHTML } from 'html-minifier-terser';

const SRC  = 'src';
const DIST = 'dist';

await mkdir(DIST, { recursive: true });

/* -------- bundle JS to memory -------- */
const result = await esbuild.build({
    entryPoints: [join(SRC, 'js', 'main.js')],
    bundle: true,
    minify: true,
    format: 'iife',
    target: 'es2018',
    legalComments: 'none',
    drop: ['console', 'debugger'],
    mangleProps: /^_/,
    write: false, // we’ll post-process
    outfile: 'dist/app.js',
});

/* -------- post-process JS: base64 string literals -------- */
function encodeStrings(js) {
    let out = '', i = 0, n = js.length;
    let q = null, esc = false, sl = false, ml = false, buf = '';
    const emitEncoded = (s, quote) => {
        // skip templates that interpolate
        if (quote === '`' && s.includes('${')) return quote + s + quote;
        const plain = s
            .replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t')
            .replace(/\\`/g,'`').replace(/\\"/g,'"').replace(/\\\\/g,'\\');
        if (plain.length < 6) return quote + s + quote;
        const b64 = Buffer.from(plain, 'utf8').toString('base64');
        return `__B64("${b64}")`;
    };
    while (i < n) {
        const ch = js[i], nx = js[i+1];
        if (sl) { out += ch; if (ch === '\n') sl = false; i++; continue; }
        if (ml) { out += ch; if (ch === '*' && nx === '/') { out += nx; i += 2; ml = false; continue; } i++; continue; }
        if (q) {
            if (esc) { buf += ch; esc = false; i++; continue; }
            if (ch === '\\') { buf += ch; esc = true; i++; continue; }
            if (ch === q) { out += emitEncoded(buf, q); q = null; buf = ''; i++; continue; }
            buf += ch; i++; continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { q = ch; buf = ''; i++; continue; }
        if (ch === '/' && nx === '/') { out += ch; sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { out += ch; ml = true; i++; continue; }
        out += ch; i++;
    }
    return `function __B64(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return atob(s)}}\n` + out;
}

let jsCode = result.outputFiles[0].text;
jsCode = encodeStrings(jsCode);

// If your host has a strict CSP (no eval), keep it as a plain IIFE.
// If you WANT the eval wrapper, uncomment the three lines below.
/*
jsCode = `eval(Function("return (function(){"+JSON.stringify(${JSON.stringify(jsCode)})+"}).call(this)")());`;
*/

await writeFile(join(DIST, 'app.js'), jsCode, 'utf8');

/* -------- inline CSS (merge & minify lightly) -------- */
let inlineCSS = '';
try {
    const cssFiles = await readdir(join(SRC, 'css'));
    for (const f of cssFiles) {
        if (!f.endsWith('.css')) continue;
        inlineCSS += (await readFile(join(SRC, 'css', f), 'utf8')) + '\n';
    }
} catch (_) {
    // no css folder? fine.
}

/* -------- build HTML: load src/index.html, strip dev links, inject CSS+JS -------- */
let html = await readFile(join(SRC, 'index.html'), 'utf8');

// Escape raw "<" in <pre> blocks that look like markup (e.g., "<-- DNS table")
html = html.replace(
    /(<pre[\s\S]*?>[\s\S]*?<\/pre>)/g,
    block => block.replace(/<--/g, '&lt;--') // keeps ASCII intact
);

// Remove any dev-time CSS/JS includes pointing to src/ paths
html = html
    // kill CSS links to css/*.css (we inline CSS instead)
    .replace(/<link[^>]+href=["']\s*css\/[^"']+["'][^>]*>\s*/gi, '')
    // kill any <script ... src="js/...">
    .replace(/<script[^>]*src=["']\s*js\/[^"']+["'][^>]*>\s*<\/script>\s*/gi, '')
    // also remove stray whitespace around removed tags
    .replace(/\n\s*\n/g, '\n');

// Inject inline CSS before </head> (strip comments first)
if (inlineCSS.trim()) {
    // strip all CSS comments /* ... */
    const cssStripped = inlineCSS.replace(/\/\*[\s\S]*?\*\//g, '');
    const styleTag = `<style>${cssStripped}</style>`;
    if (html.includes('</head>')) {
        html = html.replace('</head>', `${styleTag}</head>`);
    } else {
        html = styleTag + html;
    }
}

// Ensure our bundle is loaded (strip JS comments before output)
if (!/app\.js/.test(html)) {
    html = html.replace('</body>', '<script src="app.js" defer></script></body>');
}

// Minify HTML aggressively
const min = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true, // nukes all <!-- --> comments
    minifyCSS: {
        level: 2
    },
    minifyJS: {
        format: { comments: false }
    }
});

await writeFile(join(DIST, 'index.html'), min, 'utf8');

console.log('✅ Built → dist/index.html + dist/app.js');
