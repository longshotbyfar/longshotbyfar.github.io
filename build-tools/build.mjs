// build.mjs
import esbuild from 'esbuild';
import { minify as minifyHTML } from 'html-minifier-terser';
import { load as loadHTML } from 'cheerio';
import { cp, mkdir, readdir, readFile, writeFile, access } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';
import process from 'process';
import frictionPlugin from './plugins/friction.mjs';
import { runStaticMasonry } from './static-masonry.mjs';

/* ────────────── FLAGS ────────────── */
const IS_CI =
    process.env.GITHUB_ACTIONS === 'true' ||
    process.env.CI === 'true' ||
    process.env.NODE_ENV === 'production';

// Explicit check of process.env.DEV
let DEV;
if (process.env.DEV?.toLowerCase() === 'true') DEV = true;      // user forced dev
else if (process.env.DEV?.toLowerCase() === 'false') DEV = false; // user forced prod
else DEV = !IS_CI; // fallback: dev if not CI/prod

const PROD = !DEV;

// Feature toggles
const ENABLE_FRICTION = PROD;          // obfuscation only in prod
const ENABLE_STATIC_MASONRY = true;    // generate static CSS per page
const MINIFY_HTML = true;              // ok to minify HTML

// Roots
const SRC = 'src';
const DIST = 'dist';

// Esbuild define constants
const DEFINE = {
    __DEV__: DEV ? 'true' : 'false',
    'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
};

/* ────────────── FS HELPERS ────────────── */
await mkdir(DIST, { recursive: true });

const exists = async (p) => {
    try { await access(p); return true; } catch { return false; }
};
const listRootHtml = async () => (await readdir(SRC)).filter(f => f.toLowerCase().endsWith('.html'));
const stripCssComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

async function readCssDir(dir) {
    try {
        const files = (await readdir(dir)).filter(f => f.endsWith('.css'));
        let out = '';
        for (const f of files) out += stripCssComments(await readFile(join(dir, f), 'utf8')) + '\n';
        return out;
    } catch {
        return '';
    }
}

async function resolveImplicitEntry(pageName) {
    if (pageName === 'index') {
        for (const c of ['js/index.js', 'js/app.js']) if (await exists(join(SRC, c))) return c;
    } else {
        for (const c of [
            `${pageName}/js/app.js`,
            `${pageName}/index.js`,
            `${pageName}/js/${pageName}.js`,
        ]) if (await exists(join(SRC, c))) return c;
    }
    return null;
}

/* ────────────── PARSE HTML PAGES ────────────── */
const htmlFiles = await listRootHtml();
if (!htmlFiles.length) {
    console.error('No HTML files found in src/');
    process.exit(1);
}

const pages = [];
const masonryPages = [];

for (const htmlName of htmlFiles) {
    const pageName = basename(htmlName, extname(htmlName));
    const raw = await readFile(join(SRC, htmlName), 'utf8');
    const $ = loadHTML(raw, { decodeEntities: false });

    // Ensure structure
    if ($('html').length === 0) {
        const bodyInner = $.root().html();
        $.root().empty().append('<!doctype html><html lang="en"><head></head><body></body></html>');
        $('body').append(bodyInner);
    }
    if ($('head').length === 0) $('html').prepend('<head></head>');
    if ($('body').length === 0) $('html').append('<body></body>');

    // Fix empty data-* safely
    $('*').each((_, el) => {
        const attrs = el.attribs || {};
        for (const [k, v] of Object.entries(attrs)) {
            if (k.startsWith('data-') && (v == null || v === undefined)) $(el).attr(k, '');
        }
    });

    // Detect masonry stack & stamp stable indexes for cards
    const hasStack = $('.stack .card').length > 0;
    if (hasStack) {
        $('.stack .card').each((i, el) => $(el).attr('data-i', String(i)));
        masonryPages.push(pageName);
    }

    // Collect ALL local module scripts (preserve order); leave remote alone
    const localSrcs = [];
    $('script[src]').each((_, el) => {
        const s = $(el).attr('src')?.trim();
        if (!s) return;
        if (/^https?:\/\//i.test(s)) return;       // keep CDN scripts untouched
        localSrcs.push(s.replace(/^\.\//, ''));     // normalize leading './'
    });

    // Remove ONLY local <script src> (keep remote CDNs)
    $('script[src]').each((_, el) => {
        const s = $(el).attr('src')?.trim();
        if (s && !/^https?:\/\//i.test(s)) $(el).remove();
    });

    // Remove ONLY local stylesheet links; keep remote CSS
    $('link[rel="stylesheet"]').each((_, el) => {
        const href = $(el).attr('href')?.trim();
        if (href && !/^https?:\/\//i.test(href)) $(el).remove();
    });

    // Inline per-page CSS
    const css = pageName === 'index'
        ? await readCssDir(join(SRC, 'css'))
        : await readCssDir(join(SRC, pageName, 'css'));
    if (css.trim()) $('head').append(`<style>${css}</style>`);

    // Pre-inject link to generated masonry CSS (static pass writes it later)
    if (hasStack) $('head').append(`<link rel="stylesheet" href="masonry-${pageName}.css">`);

    // If no explicit local scripts, try implicit entry
    const implicit = localSrcs.length ? null : await resolveImplicitEntry(pageName);

    // Re-inject local scripts (or implicit), preserving order
    if (localSrcs.length) {
        for (const s of localSrcs) $('body').append(`<script type="module" src="${s}"></script>`);
    } else if (implicit) {
        $('body').append(`<script type="module" src="${implicit}"></script>`);
    }

    // Serialize
    let serialized = $.html();
    if (!/^<!doctype html>/i.test(serialized)) serialized = `<!doctype html>\n${serialized}`;

    // Keep list for bundling; prefer explicit list, else implicit, else empty
    const jsRelList = localSrcs.length ? localSrcs : (implicit ? [implicit] : []);

    if (!jsRelList.length) {
        console.warn(`[build] Page "${pageName}" has no local scripts (only remote/CDN or none).`);
    }

    pages.push({ htmlName, pageName, html: serialized, jsRelList, hasStack });
}

/* ────────────── BUNDLE JS (shared chunks) ────────────── */
const entriesAbs = [
    ...new Set(pages.flatMap(p => p.jsRelList).map(rel => join(SRC, rel)))
];

if (entriesAbs.length) {
    console.log('[build] Entry points:');
    for (const e of entriesAbs) console.log('  -', e);

    await esbuild.build({
        entryPoints: entriesAbs,
        bundle: true,
        splitting: true,             // shared chunks across pages
        format: 'esm',
        platform: 'browser',
        target: 'es2018',

        define: DEFINE,
        minify: PROD,
        minifyIdentifiers: PROD,
        minifySyntax: PROD,
        minifyWhitespace: PROD,
        sourcemap: DEV ? 'inline' : false,
        legalComments: 'none',
        drop: ['debugger'],

        outdir: DIST,
        outbase: SRC,                // mirror src/** → dist/**
        entryNames: '[dir]/[name]',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',

        plugins: ENABLE_FRICTION ? [frictionPlugin({
            base64Strings: true,
            injectDecoy: true,
            wrapEval: false,
            sabotageWhitespace: false, // keep off unless fully hardened
        })] : [],
        logLevel: 'info',
    });
} else {
    console.warn('[build] No JS entry points found.');
}

/* ────────────── WRITE HTML ────────────── */
for (const p of pages) {
    try {
        const htmlOut = MINIFY_HTML
            ? await minifyHTML(p.html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: { level: 2 },
                minifyJS: false, // esbuild handles JS
            })
            : p.html;

        await writeFile(join(DIST, p.htmlName), htmlOut, 'utf8');
    } catch (e) {
        console.error(`HTML write failed for ${p.htmlName}:`, e?.message || e);
        await writeFile(join(DIST, p.htmlName), p.html, 'utf8');
    }
}

/* ────────────── ASSETS ────────────── */
const copyIf = async (from, to) => { if (await exists(from)) await cp(from, to, { recursive: true }); };
await copyIf(join(SRC, 'assets'), join(DIST, 'assets'));
for (const { pageName } of pages) {
    if (pageName !== 'index') await copyIf(join(SRC, pageName, 'assets'), join(DIST, pageName, 'assets'));
}

// Disable Jekyll on GH Pages (don’t let it ignore files that start with underscores)
await writeFile(join(DIST, '.nojekyll'), '', 'utf8');

/* ────────────── STATIC MASONRY ────────────── */
if (ENABLE_STATIC_MASONRY && masonryPages.length) {
    for (const pageName of masonryPages) {
        try {
            await runStaticMasonry(pageName);
        } catch (e) {
            console.warn(`⚠️ masonry failed on ${pageName}:`, e?.message || e);
        }
    }
}

/* ────────────── SUMMARY ────────────── */
console.log(
    `✅ Built ${pages.length} page(s) → ${DIST}/ ** (${DEV ? 'dev' : 'prod'}) ` +
    `[friction:${ENABLE_FRICTION ? 'on' : 'off'} · staticMasonry:${ENABLE_STATIC_MASONRY ? 'on' : 'off'}]`
);
