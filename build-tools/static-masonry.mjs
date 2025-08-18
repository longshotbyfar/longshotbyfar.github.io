// tools/masonry-static.mjs
import http from 'node:http';
import {promises as fs} from 'node:fs';
import {join, resolve} from 'node:path';
import puppeteer from 'puppeteer';

const ROOT = resolve('dist');              // serve built site
const PAGE = '/index.html';                // the page with the stack (adjust if needed)

// same logic as your runtime (minus observers)
function layoutScript() {
    function clamp(a,b,x){ return Math.max(a, Math.min(b, x)); }
    const stack = document.querySelector('.stack');
    if (!stack) return { ok:false, reason:'no .stack' };

    const GAP = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 20;
    const MIN = () => parseFloat(getComputedStyle(stack).getPropertyValue('--min')) || 260;

    const cards = Array.from(stack.querySelectorAll('.card'));
    if (!cards.length) return { ok:false, reason:'no cards' };

    const gap = GAP();
    const min = MIN();
    const W = stack.clientWidth;
    const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
    const colW = (W - (cols - 1) * gap) / cols;
    const H = new Array(cols).fill(0);

    const out = [];
    for (const el of cards) {
        const span = Math.min(cols, parseInt(el.dataset.span || '1', 10));
        let best = 0, bestH = Infinity;
        for (let c = 0; c <= cols - span; c++) {
            const windowH = Math.max(...H.slice(c, c + span));
            if (windowH < bestH) { bestH = windowH; best = c; }
        }
        const left = best * (colW + gap);
        const width = span * colW + (span - 1) * gap;

        // temporarily set width to measure height faithfully
        const prevW = el.style.width;
        const prevL = el.style.left;
        const prevT = el.style.top;
        el.style.width = width + 'px';
        el.style.left = left + 'px';
        el.style.top  = bestH + 'px';

        const h = el.getBoundingClientRect().height;
        const newH = bestH + h + gap;
        for (let c = best; c < best + span; c++) H[c] = newH;

        const idx = el.getAttribute('data-i') ?? String(out.length);
        out.push({ i: Number(idx), left, top: bestH, width });
        // revert (not strictly needed)
        el.style.width = prevW; el.style.left = prevL; el.style.top = prevT;
    }

    return { ok:true, cols, height: Math.max(...H) - gap, positions: out };
}

// tiny static server
function serve(root, port=0){
    return new Promise(resolveServer => {
        const server = http.createServer(async (req, res) => {
            let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
            if (urlPath.endsWith('/')) urlPath += 'index.html';
            const filePath = join(root, urlPath);
            try {
                const data = await fs.readFile(filePath);
                const ext = filePath.split('.').pop().toLowerCase();
                const type = ext === 'html' ? 'text/html'
                    : ext === 'css' ? 'text/css'
                        : ext === 'js' ? 'text/javascript'
                            : ext === 'svg' ? 'image/svg+xml'
                                : 'application/octet-stream';
                res.writeHead(200, {'Content-Type': type});
                res.end(data);
            } catch {
                res.writeHead(404); res.end('not found');
            }
        }).listen(port, () => resolveServer(server));
    });
}

function cssForBreakpoint(bp, positions, totalHeight) {
    const lines = [];
    lines.push(`/* ${bp.label} (${bp.min}px–${bp.max ?? '∞'}px), cols=${bp.cols} */`);
    const mq = bp.max ? `@media (min-width:${bp.min}px) and (max-width:${bp.max}px){`
        : `@media (min-width:${bp.min}px){`;
    lines.push(mq);
    lines.push(`  .stack{height:${Math.round(totalHeight)}px}`);
    for (const p of positions) {
        lines.push(`  .card[data-i="${p.i}"]{left:${p.left.toFixed(2)}px;top:${p.top.toFixed(2)}px;width:${p.width.toFixed(2)}px}`);
    }
    lines.push('}');
    return lines.join('\n');
}

function breakpointsFrom(min, gap, maxWidth=1600) {
    // columns change when floor((W+gap)/(min+gap)) changes
    // compute ranges for cols = 1..N
    const bps = [];
    let cols = 1;
    while (true) {
        const minW = Math.ceil(cols*min + (cols-1)*gap);
        const nextCols = cols+1;
        const nextMinW = Math.ceil(nextCols*min + (nextCols-1)*gap);
        const maxW = nextMinW - 1;
        bps.push({ cols, min:minW, max:maxW, label:`${cols} col` });
        if (nextMinW > maxWidth) break;
        cols = nextCols;
    }
    // last one: open-ended
    const last = bps[bps.length-1];
    last.max = undefined;
    last.label = `${last.cols}+ col`;
    return bps;
}

export async function runStaticMasonry() {
    const server = await serve(ROOT);
    const {port} = server.address();
    const base = `http://localhost:${port}${PAGE}`;

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // navigate once to warm cache
    await page.goto(base, { waitUntil: 'networkidle0' });

    // read min/gap from computed styles
    const { min, gap } = await page.evaluate(() => {
        const stack = document.querySelector('.stack');
        const cs = getComputedStyle(stack);
        return {
            min: parseFloat(cs.getPropertyValue('--min')) || 260,
            gap: parseFloat(cs.getPropertyValue('--gap')) || 20
        };
    });

    const bps = breakpointsFrom(min, gap, 2000);

    const blocks = [];
    for (const bp of bps) {
        const width = Math.max(bp.min, 360);
        await page.setViewport({ width, height: 1400, deviceScaleFactor: 1 });

        // ensure fonts/images settled
        await page.waitForNetworkIdle({ idleTime: 200, timeout: 10000 }).catch(() => {});
        await page.evaluate(() => document.fonts ? document.fonts.ready : null).catch(()=>{});

        const res = await page.evaluate(layoutScript);
        if (!res.ok) throw new Error(`layout failed: ${res.reason}`);
        blocks.push(cssForBreakpoint(bp, res.positions, res.height));
    }

    await browser.close();
    server.close();

    const outCss = `/* generated by masonry-static.mjs */\n${blocks.join('\n\n')}\n`;
    await fs.writeFile(join(ROOT, '', 'masonry-static.css'), outCss, 'utf8');
    console.log('✅ wrote css/masonry-static.css');
}
