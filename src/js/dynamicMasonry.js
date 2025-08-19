// UNUSED
export function mountMasonry(stackSelector = '.stack') {
    const stack = document.querySelector(stackSelector);
    if (!stack) return { layout: () => {}, destroy: () => {} };

    if (!document.getElementById('masonry-base-css')) {
        const s = document.createElement('style');
        s.id = 'masonry-base-css';
        s.textContent = `.stack{position:relative}.stack>.card{position:absolute;box-sizing:border-box;margin:0;max-width:none;min-width:0}`;
        document.head.appendChild(s);
    }

    const GAP = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 20;
    const MIN = () => parseFloat(getComputedStyle(stack).getPropertyValue('--min')) || 260;

    let cards = Array.from(stack.querySelectorAll('.card'));
    const ro = new ResizeObserver(() => requestAnimationFrame(layout)); // match static’s “after paint” timing
    ro.observe(stack);
    cards.forEach(el => ro.observe(el));

    function watchImages() {
        for (const el of cards) {
            el.querySelectorAll('img').forEach(img => {
                if (!img.complete) {
                    img.addEventListener('load', layout,  { once: true });
                    img.addEventListener('error', layout, { once: true });
                }
            });
        }
    }

    const getSpan = (el, cols) => {
        const raw = el.getAttribute('data-col-span') ?? el.getAttribute('data-span');
        const n = Number.parseInt(raw, 10);
        const s = Number.isFinite(n) && n > 0 ? n : 1;
        return Math.min(cols, Math.max(1, s));
    };

    const measure = (el) => {
        const cs = getComputedStyle(el);
        if (cs.contentVisibility === 'auto') {
            const prev = el.style.contentVisibility;
            el.style.contentVisibility = 'visible';
            void el.offsetHeight; // force layout
            const h = el.offsetHeight;
            el.style.contentVisibility = prev || '';
            return h;
        }
        return el.offsetHeight; // border-box, ignores transforms/pseudos
    };

    function layout() {
        cards = Array.from(stack.querySelectorAll('.card'));
        if (!cards.length) { stack.style.height = '0px'; return; }

        const gap = GAP();
        const min = MIN();

        const W = stack.clientWidth;
        const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
        const colW = (W - (cols - 1) * gap) / cols;

        const H = new Array(cols).fill(0); // column heights

        // ensure stable indices like static (data-i)
        cards.forEach((el, i) => { if (!el.hasAttribute('data-i')) el.setAttribute('data-i', String(i)); });

        for (const el of cards) {
            // inline guards vs hostile CSS (mirror static runtime)
            el.style.position = 'absolute';
            el.style.margin = '0';
            el.style.maxWidth = 'none';
            el.style.minWidth = '0';

            const span = getSpan(el, cols);

            // pure greedy: choose window with lowest max height (no virgin penalty)
            let best = 0, bestH = Infinity;
            for (let c = 0; c <= cols - span; c++) {
                const windowH = Math.max(...H.slice(c, c + span));
                if (windowH < bestH) { bestH = windowH; best = c; }
            }

            const left  = best * (colW + gap);
            const width = span * colW + (span - 1) * gap;
            el.style.width = width + 'px';
            const h = measure(el);

            el.style.left = left + 'px';
            el.style.top  = bestH + 'px';

            const newH = bestH + h + gap;
            for (let c = best; c < best + span; c++) H[c] = newH;
        }

        const totalH = Math.max(...H) || 0;
        stack.style.height = (totalH ? totalH - gap : 0) + 'px';
    }

    window.addEventListener('resize', () => requestAnimationFrame(layout), { passive: true });
    watchImages();
    requestAnimationFrame(layout);

    return {
        layout,
        destroy() {
            try { ro.disconnect(); } catch {}
            window.removeEventListener('resize', layout);
        }
    };
}
