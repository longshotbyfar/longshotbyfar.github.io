// build.mjs
import esbuild from 'esbuild';
import {minify as minifyHTML} from 'html-minifier-terser';
import {load as loadHTML} from 'cheerio';
import {cp, mkdir, readdir, readFile, writeFile, access} from 'node:fs/promises';
import {join, basename, extname} from 'node:path';
import process from 'process';
import frictionPlugin from './plugins/friction.mjs';
import {runStaticMasonry} from "./static-masonry.mjs"; // remove if not using

const SRC = 'src';
const DIST = 'dist';

const isCI = process.env.GITHUB_ACTIONS === 'true'
    || process.env.CI === 'true'
    || process.env.NODE_ENV === 'production';

const DEV_OVERRIDE = process.env.DEV?.toLowerCase();
const DEV = DEV_OVERRIDE === 'true' ? true : DEV_OVERRIDE === 'false' ? false : !isCI;

await mkdir(DIST, {recursive: true});

/* ───────────────── helpers ───────────────── */
const exists = async p => {
    try {
        await access(p);
        return true;
    } catch {
        return false;
    }
};
const listRootHtml = async () => (await readdir(SRC)).filter(f => f.toLowerCase().endsWith('.html'));
const stripCssComments = css => css.replace(/\/\*[\s\S]*?\*\//g, '');

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
            `${pageName}/js/${pageName}.js`
        ]) if (await exists(join(SRC, c))) return c;
    }
    return null;
}

/* ───────── parse pages with Cheerio, preserve/decide scripts ───────── */
const htmlFiles = await listRootHtml();
if (!htmlFiles.length) {
    console.error('No HTML files found in src/');
    process.exit(1);
}

const pages = [];
for (const htmlName of htmlFiles) {
    const pageName = basename(htmlName, extname(htmlName));
    const raw = await readFile(join(SRC, htmlName), 'utf8');

    const $ = loadHTML(raw, {decodeEntities: false});

    // Ensure structure
    if ($('html').length === 0) {
        const bodyInner = $.root().html();
        $.root().empty().append('<!doctype html><html lang="en"><head></head><body></body></html>');
        $('body').append(bodyInner);
    }
    if ($('head').length === 0) $('html').prepend('<head></head>');
    if ($('body').length === 0) $('html').append('<body></body>');

    // Fix empty data-* safely (iterate all nodes)
    $('*').each((_, el) => {
        const attrs = el.attribs || {};
        for (const [k, v] of Object.entries(attrs)) {
            if (k.startsWith('data-') && (v == null || v === undefined)) $(el).attr(k, '');
        }
    });

    // Detect masonry stack & stamp stable indexes for cards
    const hasStack = $('.stack .card').length > 0;
    if (hasStack) $('.stack .card').each((i, el) => $(el).attr('data-i', String(i)));

    // Stash first explicit LOCAL module src, ignore http(s)
    let explicitLocalSrc = null;
    $('script[src]').each((_, el) => {
        const s = $(el).attr('src')?.trim();
        if (!s) return;
        if (/^https?:\/\//i.test(s)) return; // leave remote alone
        if (!explicitLocalSrc) explicitLocalSrc = s.replace(/^\.\//, '');
    });

    // Remove ONLY local <script src> (keep remote CDNs like Chart.js)
    $('script[src]').each((_, el) => {
        const s = $(el).attr('src')?.trim();
        if (s && !/^https?:\/\//i.test(s)) $(el).remove();
    });

    // Remove ONLY local stylesheet links; keep remote CSS
    $('link[rel="stylesheet"]').each((_, el) => {
        const href = $(el).attr('href')?.trim();
        if (href && !/^https?:\/\//i.test(href)) $(el).remove();
    });

    // Per-page CSS inline
    const css = pageName === 'index'
        ? await readCssDir(join(SRC, 'css'))
        : await readCssDir(join(SRC, pageName, 'css'));
    if (css.trim()) $('head').append(`<style>${css}</style>`);

    // Pre-inject link to generated masonry CSS (we'll write it later)
    if (hasStack) {
        $('head').append(`<link rel="stylesheet" href="masonry-${pageName}.css">`);
    }

    // Decide JS entry
    const jsRel = explicitLocalSrc ?? await resolveImplicitEntry(pageName);

    // Re-inject the local module entry (remote scripts already remain)
    if (jsRel) $('body').append(`<script type="module" src="${jsRel}"></script>`);

    // Serialize
    let serialized = $.html();
    if (!/^<!doctype html>/i.test(serialized)) serialized = `<!doctype html>\n${serialized}`;

    pages.push({htmlName, pageName, html: serialized, jsRel, hasStack});
}

/* ───────── bundle ESM entries (mirror src/** → dist/**) ───────── */
const entriesAbs = [...new Set(pages.filter(p => p.jsRel).map(p => join(SRC, p.jsRel)))];

if (entriesAbs.length) {
    await esbuild.build({
        entryPoints: entriesAbs,
        bundle: true,
        splitting: true,
        format: 'esm',
        platform: 'browser',
        target: 'es2018',

        define: {__DEV__: DEV ? 'true' : 'false'},
        minify: !DEV,
        minifyIdentifiers: !DEV,
        minifySyntax: !DEV,
        minifyWhitespace: !DEV,
        sourcemap: DEV ? 'inline' : false,
        legalComments: 'none',
        drop: ['debugger'],

        outdir: DIST,
        outbase: SRC,                 // mirror src/** → dist/**
        entryNames: '[dir]/[name]',
        chunkNames: 'chunks/[name]-[hash]',
        assetNames: 'assets/[name]-[hash]',
        plugins: [frictionPlugin()] // or remove
    });
}

/* ───────── minify and write each HTML ───────── */
for (const p of pages) {
    const min = await minifyHTML(p.html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: {level: 2},
        minifyJS: {format: {comments: false}}
    });
    await writeFile(join(DIST, p.htmlName), min, 'utf8');
}

/* ───────── copy assets (root + per-page) ───────── */
const copyIf = async (from, to) => {
    if (await exists(from)) await cp(from, to, {recursive: true});
};
await copyIf(join(SRC, 'assets'), join(DIST, 'assets'));
for (const {pageName} of pages) {
    if (pageName !== 'index') await copyIf(join(SRC, pageName, 'assets'), join(DIST, pageName, 'assets'));
}

try {
    await runStaticMasonry();
} catch (e) {
    console.warn('⚠️ static masonry skipped:', e?.message || e);
}

console.log(`✅ Built ${pages.length} page(s) (${DEV ? 'dev' : 'prod'}) → dist/**`);
