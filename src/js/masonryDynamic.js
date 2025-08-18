export function mountMasonry(stackSelector = '.stack') {
    const stack = document.querySelector(stackSelector);
    if (!stack) return { layout: () => {}, destroy: () => {} };

    const GAP = () => parseFloat(getComputedStyle(stack).getPropertyValue('--gap')) || 20;
    const MIN = () => parseFloat(getComputedStyle(stack).getPropertyValue('--min')) || 260;

    let cards = Array.from(stack.querySelectorAll('.card'));
    const ro = new ResizeObserver(layout);

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

    function layout() {
        cards = Array.from(stack.querySelectorAll('.card'));
        if (!cards.length) { stack.style.height = '0px'; return; }

        const gap = GAP();
        const min = MIN();

        const W = stack.clientWidth;
        const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
        const colW = (W - (cols - 1) * gap) / cols;

        const H = new Array(cols).fill(0); // column heights

        for (const el of cards) {
            const span = Math.min(cols, parseInt(el.dataset.span || '1', 10));

            // best start column = window with lowest max height
            let best = 0, bestH = Infinity;
            for (let c = 0; c <= cols - span; c++) {
                const windowH = Math.max(...H.slice(c, c + span));
                if (windowH < bestH) { bestH = windowH; best = c; }
            }

            const left = best * (colW + gap);
            const width = span * colW + (span - 1) * gap;

            el.style.left = left + 'px';
            el.style.top  = bestH + 'px';
            el.style.width = width + 'px';

            const h = el.getBoundingClientRect().height;
            const newH = bestH + h + gap;
            for (let c = best; c < best + span; c++) H[c] = newH;
        }

        stack.style.height = (Math.max(...H) - gap) + 'px';
    }

    cards.forEach(el => {
        ro.observe(el);
        el.style.display = 'block';
    });
    window.addEventListener('resize', layout, { passive: true });

    watchImages();
    layout();

    console.log("laid hehe")

    return {
        layout,
        destroy() {
            try { ro.disconnect(); } catch {}
            window.removeEventListener('resize', layout);
        }
    };
}
