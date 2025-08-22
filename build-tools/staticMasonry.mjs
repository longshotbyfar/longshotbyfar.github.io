// masonry-static.js — width-sliced static masonry generator (ESM).
// Generates many narrow @media blocks (default 60px slices) so pixels stay honest across the range.

import http from 'node:http';
import {promises as fs} from 'node:fs';
import {join, resolve} from 'node:path';
import puppeteer from 'puppeteer';

/**
 * Runs in the page to compute positions. Supports:
 *  - LEGACY_MODE: original skyline placement
 *  - STRICT_SHELF: level all column heights after each priority group
 *  - ADAPTIVE_SPAN: try [min..max] span per card, pick best-fit
 */
function layoutScript({ LEGACY_MODE = false, STRICT_SHELF = false, ADAPTIVE_SPAN = true } = {}) {
    const stack = document.querySelector('.stack');
    if (!stack) return { ok: false, reason: 'no .stack' };

    const GAP = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 20;
    const MIN = () => parseFloat(getComputedStyle(stack).getPropertyValue('--min')) || 260;

    const cards = Array.from(stack.querySelectorAll('.card'));
    if (!cards.length) { stack.style.height = '0px'; return { ok: true, positions: [], height: 0 }; }

    const gap = GAP();
    const min = MIN();
    const W = stack.clientWidth;
    const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
    const colW = (W - (cols - 1) * gap) / cols;

    // shared utils
    const measure = el => {
        const cs = getComputedStyle(el);
        if (cs.contentVisibility === 'auto') {
            const prev = el.style.contentVisibility;
            el.style.contentVisibility = 'visible'; void el.offsetHeight;
            const h = el.offsetHeight; el.style.contentVisibility = prev || ''; return h;
        }
        return el.offsetHeight;
    };
    const harden = el => {
        el.style.position = 'absolute';
        el.style.margin = '0';
        el.style.maxWidth = 'none';
        el.style.minWidth = '0';
    };
    const getSpan = el => {
        const raw = el.getAttribute('data-col-span') ?? el.getAttribute('data-span');
        const n = Number.parseInt(raw, 10);
        return Number.isFinite(n) && n > 0 ? Math.min(cols, n) : 1;
    };

    // ---------- LEGACY MODE ----------
    if (LEGACY_MODE) {
        const H = new Array(cols).fill(0);
        const positions = [];

        for (const el of cards) {
            harden(el);
            const span = getSpan(el);

            // find best window (lowest skyline)
            let best = 0, bestH = Infinity;
            for (let c = 0; c <= cols - span; c++) {
                const windowH = Math.max(...H.slice(c, c + span));
                if (windowH < bestH) { bestH = windowH; best = c; }
            }

            const left = best * (colW + gap);
            const width = span * colW + (span - 1) * gap;

            const prevW = el.style.width;
            el.style.width = width + 'px';
            const h = measure(el);
            el.style.width = prevW;

            const newH = bestH + h + gap;
            for (let c = best; c < best + span; c++) H[c] = newH;

            positions.push({ i: el.getAttribute('data-i') || '0', left, top: bestH, width });
        }

        const totalH = Math.max(...H) || 0;
        const stackH = totalH ? totalH - gap : 0;
        stack.style.height = stackH + 'px';
        return { ok: true, positions, height: stackH, _cols: cols, _W: W };
    }

    // ---------- PRIORITY + (optional) ADAPTIVE SPAN ----------
    const H = new Array(cols).fill(0);
    const positions = [];

    const getPri = el => {
        const raw = el.getAttribute('data-priority');
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
    };

    function placeAdaptive(el) {
        const prefer = getSpan(el);
        const minS = Number.parseInt(el.getAttribute('data-col-span-min') || prefer, 10);
        const maxS = Number.parseInt(el.getAttribute('data-col-span-max') || prefer, 10);
        const fixed = el.hasAttribute('data-fixed-span') || el.getAttribute('data-adaptive') === '0';

        const spans = (ADAPTIVE_SPAN && !fixed)
            ? [...Array(maxS - minS + 1).keys()].map(i => maxS - i) // wide→narrow
            : [prefer];

        let choice = null;
        for (const span of spans) {
            let bestC = 0, bestH = Infinity;
            for (let c = 0; c <= cols - span; c++) {
                const windowH = Math.max(...H.slice(c, c + span));
                if (windowH < bestH) { bestH = windowH; bestC = c; }
            }

            const left = bestC * (colW + gap);
            const width = span * colW + (span - 1) * gap;

            const prevW = el.style.width;
            el.style.width = width + 'px';
            const h = measure(el);
            el.style.width = prevW;

            const newH = bestH + h + gap;

            if (!choice || newH < choice.newH || (newH === choice.newH && span > choice.span)) {
                choice = { span, c: bestC, left, width, top: bestH, newH };
            }
        }

        for (let c = choice.c; c < choice.c + choice.span; c++) H[c] = choice.newH;
        return { left: choice.left, top: choice.top, width: choice.width };
    }

    function placeGroup(elements) {
        for (const el of elements) {
            harden(el);
            const p = placeAdaptive(el);
            positions.push({ i: el.getAttribute('data-i') || '0', ...p });
        }
        if (STRICT_SHELF) {
            const shelf = Math.max(...H);
            for (let c = 0; c < cols; c++) H[c] = shelf;
        }
    }

    // group cards by priority and place low→high
    const byPri = new Map();
    for (const el of cards) {
        const p = getPri(el);
        if (!byPri.has(p)) byPri.set(p, []);
        byPri.get(p).push(el);
    }
    const priLevels = Array.from(byPri.keys()).sort((a, b) => a - b);
    for (const p of priLevels) placeGroup(byPri.get(p));

    const totalH = Math.max(...H) || 0;
    const stackH = totalH ? totalH - gap : 0;
    stack.style.height = stackH + 'px';
    return { ok: true, positions, height: stackH, _cols: cols, _W: W };
}

function serve(root, port = 0) {
    return new Promise(resolveServer => {
        const server = http.createServer(async (req, res) => {
            let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
            if (urlPath.endsWith('/')) urlPath += 'index.html';
            const filePath = join(root, urlPath);
            try {
                const data = await fs.readFile(filePath);
                const ext = (filePath.split('.').pop() || '').toLowerCase();
                const type =
                    ext === 'html' ? 'text/html' :
                        ext === 'css'  ? 'text/css' :
                            ext === 'js'   ? 'text/javascript' :
                                ext === 'svg'  ? 'image/svg+xml' :
                                    ext === 'png'  ? 'image/png' :
                                        ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                                            ext === 'webp' ? 'image/webp' :
                                                'application/octet-stream';
                res.writeHead(200, { 'Content-Type': type });
                res.end(data);
            } catch {
                res.writeHead(404);
                res.end('not found');
            }
        }).listen(port, () => resolveServer(server));
    });
}

// CSS emitter for a width slice
function cssForSlice(slice, positions, totalHeight) {
    const lines = [];
    const label = `${slice.label} (cols=${slice.cols}, measured W=${slice.measuredWidth}px)`;

    if (slice.min === 0 && typeof slice.max === 'number') {
        lines.push(`/* ${label} */`);
        lines.push(`@media (max-width:${slice.max}px){`);
    } else if (typeof slice.max === 'number') {
        lines.push(`/* ${label} */`);
        lines.push(`@media (min-width:${slice.min}px) and (max-width:${slice.max}px){`);
    } else {
        lines.push(`/* ${label} */`);
        lines.push(`@media (min-width:${slice.min}px){`);
    }

    lines.push(`  .stack{height:${Math.round(totalHeight)}px}`);
    for (const p of positions) {
        lines.push(
            `  .card[data-i="${p.i}"]{left:${p.left.toFixed(2)}px;top:${p.top.toFixed(2)}px;width:${p.width.toFixed(2)}px}`
        );
    }
    lines.push('}');
    return lines.join('\n');
}

// Build contiguous width slices (e.g., 0–319, 320–379, 380–439, ... , END–∞)
function buildSlices({ start = 320, end = 1440, step = 60 } = {}) {
    const slices = [];
    if (start > 0) {
        slices.push({ min: 0, max: start - 1, label: `≤${start - 1}px` });
    }
    for (let w = start; w < end; w += step) {
        const max = Math.min(w + step - 1, end - 1);
        slices.push({ min: w, max, label: `${w}-${max}px` });
    }
    // final open-ended slice
    slices.push({ min: end, max: undefined, label: `≥${end}px` });
    return slices;
}

/**
 * Generate static masonry CSS across many narrow width slices.
 *
 * @param {string} pageName - page name (maps to dist/{name}.html)
 * @param {object} layoutOpts - options forwarded to layoutScript()
 * @param {object} sliceCfg - { start, end, step } width slicing (defaults: 320..1440, step 60)
 */
export async function runStaticMasonry(pageName = 'index', layoutOpts = {}, sliceCfg = {}) {
    const EMITTED_CSS_NAME = `masonry-${pageName}.css`;
    const PAGE = `/${pageName}.html`;
    const ROOT = resolve('dist');

    const server = await serve(ROOT);
    const { port } = server.address();
    const base = `http://localhost:${port}${PAGE}`;

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote',
            '--single-process',
        ],
    });

    try {
        const page = await browser.newPage();
        await page.goto(base, { waitUntil: 'networkidle0' });

        // Helper to read current CSS vars and container width
        async function readMeta() {
            return await page.evaluate(() => {
                const stack = document.querySelector('.stack');
                if (!stack) return { min: 260, gap: 20, W: 0 };
                const cs = getComputedStyle(stack);
                return {
                    min: parseFloat(cs.getPropertyValue('--min')) || 260,
                    gap: parseFloat(cs.getPropertyValue('--gap')) || 20,
                    W: stack.clientWidth
                };
            });
        }

        // Construct many narrow width slices
        const slices = buildSlices(sliceCfg);

        // Base CSS so measured absolute positions actually apply
        const baseCSS = [
            '/* base needed for static positions to match measurement */',
            '.stack{position:relative}',
            '.card{position:absolute;margin:0;max-width:none;min-width:0}'
        ].join('\n');

        const blocks = [];
        for (const sl of slices) {
            // Pick a test width inside the slice
            let testW;
            if (sl.min === 0 && typeof sl.max === 'number') {
                testW = Math.max(240, Math.floor(sl.max * 0.9));
            } else if (typeof sl.max === 'number') {
                testW = Math.floor((sl.min + sl.max) / 2);
            } else { // open-ended
                testW = sl.min + 40;
            }
            await page.setViewport({ width: Math.max(240, Math.ceil(testW)), height: 1400, deviceScaleFactor: 1 });

            // Settle fonts/images
            await page.waitForNetworkIdle({ idleTime: 200, timeout: 10000 }).catch(() => {});
            await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});

            // Re-read vars at this width; compute expected cols
            const { min, gap } = await readMeta();

            // Run layout, returning positions and the page-reported cols at this width
            const res = await page.evaluate(layoutScript, layoutOpts);
            if (!res || !res.ok) throw new Error(`layout failed: ${res?.reason || 'unknown'}`);

            // Sanity: compute cols again from the page; use the one from res
            const measuredCols = res._cols ?? (await page.evaluate(() => {
                const stack = document.querySelector('.stack');
                if (!stack) return 1;
                const cs = getComputedStyle(stack);
                const gap = parseFloat(cs.getPropertyValue('--gap')) || 20;
                const min = parseFloat(cs.getPropertyValue('--min')) || 260;
                const W = stack.clientWidth;
                return Math.max(1, Math.floor((W + gap) / (min + gap)));
            }));

            // Emit a CSS block for this slice
            blocks.push(cssForSlice(
                { ...sl, cols: measuredCols, measuredWidth: res._W ?? testW, minVar: min, gapVar: gap },
                res.positions,
                res.height
            ));
        }

        const outCss = `/* generated masonry for ${pageName} — width-sliced */\n${baseCSS}\n\n${blocks.join('\n\n')}\n`;
        await fs.writeFile(join(ROOT, EMITTED_CSS_NAME), outCss, 'utf8');
        console.log(`✅ wrote ${EMITTED_CSS_NAME}`);
    } finally {
        await browser.close();
        server.close();
    }
}
