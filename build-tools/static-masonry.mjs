import http from 'node:http';
import {promises as fs} from 'node:fs';
import {join, resolve} from 'node:path';
import puppeteer from 'puppeteer';

function layoutScript() {
    const stack = document.querySelector('.stack');
    if (!stack) return { ok: false, reason: 'no .stack' };

    const GAP = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 20;
    const MIN = () => parseFloat(getComputedStyle(stack).getPropertyValue('--min')) || 260;

    let cards = Array.from(stack.querySelectorAll('.card'));
    if (!cards.length) {
        stack.style.height = '0px';
        return { ok: true, positions: [], height: 0 };
    }

    const gap = GAP();
    const min = MIN();

    const W = stack.clientWidth;
    const cols = Math.max(1, Math.floor((W + gap) / (min + gap))); // this WILL be 1/2/3 at the widths we drive
    const colW = (W - (cols - 1) * gap) / cols;

    const H = new Array(cols).fill(0); // column heights

    // span: prefer data-col-span, fall back to legacy data-span
    const getSpan = el => {
        const raw = el.getAttribute('data-col-span') ?? el.getAttribute('data-span');
        const n = Number.parseInt(raw, 10);
        const s = Number.isFinite(n) && n > 0 ? n : 1;
        return Math.min(cols, Math.max(1, s));
    };

    // robust height: ignore transforms; handle content-visibility:auto
    const measure = el => {
        const cs = getComputedStyle(el);
        if (cs.contentVisibility === 'auto') {
            const prev = el.style.contentVisibility;
            el.style.contentVisibility = 'visible';
            void el.offsetHeight;
            const h = el.offsetHeight;
            el.style.contentVisibility = prev || '';
            return h;
        }
        return el.offsetHeight;
    };

    const positions = [];

    for (const el of cards) {
        // harden against hostile CSS
        el.style.position = 'absolute';
        el.style.margin = '0';
        el.style.maxWidth = 'none';
        el.style.minWidth = '0';

        const span = getSpan(el);

        let best = 0, bestH = Infinity;

        for (let c = 0; c <= cols - span; c++) {
            const window = H.slice(c, c + span);
            const windowH = Math.max(...window);
            if (windowH < bestH) { bestH = windowH; best = c; }
        }

        const left = best * (colW + gap);
        const width = span * colW + (span - 1) * gap;
        const prevWidth = el.style.width;
        el.style.width = width + 'px';

        const h = measure(el);
        const newH = bestH + h + gap;
        for (let c = best; c < best + span; c++) H[c] = newH;

        positions.push({ i: el.getAttribute('data-i') || '0', left, top: bestH, width });
        el.style.width = prevWidth;
    }

    const totalH = Math.max(...H) || 0;
    const stackH = totalH ? totalH - gap : 0;
    stack.style.height = stackH + 'px';

    return { ok: true, positions, height: stackH };
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

function cssForBreakpoint(bp, positions, totalHeight) {
    const lines = [];
    lines.push(`/* ${bp.label} (${bp.min}px–${bp.max ?? '∞'}px), cols=${bp.cols} */`);
    const mq = bp.max
        ? `@media (min-width:${bp.min}px) and (max-width:${bp.max}px){`
        : `@media (min-width:${bp.min}px){`;
    lines.push(mq);
    lines.push(`  .stack{height:${Math.round(totalHeight)}px}`);
    for (const p of positions) {
        lines.push(
            `  .card[data-i="${p.i}"]{left:${p.left.toFixed(2)}px;top:${p.top.toFixed(2)}px;width:${p.width.toFixed(2)}px}`
        );
    }
    lines.push('}');
    return lines.join('\n');
}

function breakpointsFrom(min, gap, maxCols = 3) {
    const bps = [];
    for (let cols = 1; cols <= maxCols; cols++) {
        const minW = Math.ceil(cols * min + (cols - 1) * gap);
        const nextMinW = Math.ceil((cols + 1) * min + cols * gap);
        const maxW = cols === maxCols ? undefined : nextMinW - 1;
        bps.push({ cols, min: minW, max: maxW, label: `${cols} col${cols > 1 ? 's' : ''}` });
    }
    return bps;
}

export async function runStaticMasonry(pageName = 'index') {
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

        // Pull --min/--gap from the live page
        const { min, gap } = await page.evaluate(() => {
            const stack = document.querySelector('.stack');
            if (!stack) return { min: 260, gap: 20 };
            const cs = getComputedStyle(stack);
            return {
                min: parseFloat(cs.getPropertyValue('--min')) || 260,
                gap: parseFloat(cs.getPropertyValue('--gap')) || 20,
            };
        });

        const bps = breakpointsFrom(min, gap, 3); // force 1/2/3 columns

        const blocks = [];
        for (const bp of bps) {
            // Drive viewport to a representative width for this column count
            const width = Math.max(bp.min, 900); // 900 ensures we actually hit 3-col layout for the last block
            await page.setViewport({ width, height: 1400, deviceScaleFactor: 1 });

            // Settle fonts/images
            await page.waitForNetworkIdle({ idleTime: 200, timeout: 10000 }).catch(() => {});
            await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});

            const res = await page.evaluate(layoutScript);
            if (!res || !res.ok) throw new Error(`layout failed: ${res?.reason || 'unknown'}`);

            blocks.push(cssForBreakpoint(bp, res.positions, res.height));
        }

        const outCss = `/* generated masonry for ${pageName} */\n${blocks.join('\n\n')}\n`;
        await fs.writeFile(join(ROOT, EMITTED_CSS_NAME), outCss, 'utf8');
        console.log(`✅ wrote ${EMITTED_CSS_NAME}`);
    } finally {
        await browser.close();
        server.close();
    }
}
