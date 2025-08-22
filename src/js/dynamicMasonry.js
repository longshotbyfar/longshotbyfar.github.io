export function mountDynamicMasonry({
                                 container = '.stack',
                                 card = '.card',
                                 getSpan = el => {
                                     const raw = el.getAttribute('data-col-span');
                                     const n = Number.parseInt(raw, 10);
                                     if (!Number.isFinite(n) || n <= 0) return 1;
                                     if (n > 3) return 3;
                                     return n;
                                 },
                                 adaptiveSpan = false,       // turn on if you really need it
                                 strictShelf = false,        // level shelves after priority groups
                                 priorityAttr = 'data-priority',
                                 // performance knobs
                                 resizeDebounceMs = 80,
                                 minColWidth = null,         // fallback if you don't use --min
                                 gapPx = null,               // fallback if you don't use --gap
                             } = {}) {
    const root = typeof container === 'string' ? document.querySelector(container) : container;
    if (!root) throw new Error('masonry: container not found');

    root.style.position = 'relative';
    const baseCardCSS = `
    position:absolute;
    margin:0;
    max-width:none;
    min-width:0;
    will-change:transform;
    content-visibility:auto;
    contain: layout paint style;
    contain-intrinsic-size: 300px auto; /* tune per design */
  `;
    const cards = () => Array.from(root.querySelectorAll(card));
    cards().forEach(el => (el.style.cssText += baseCardCSS));

    // Scheduler
    let pending = false;
    let lastLayoutW = -1;
    let ro, mo, resizeTimer = 0;

    const state = {
        cols: 1,
        colW: 0,
        H: new Float64Array(1),
        meta: new Map(), // el -> {span, h, dirty}
    };

    function readVars() {
        const cs = getComputedStyle(root);
        const min = minColWidth ?? (parseFloat(cs.getPropertyValue('--min')) || 260);
        const gap = gapPx ?? (parseFloat(cs.getPropertyValue('--gap')) || 20);
        const W = root.clientWidth || root.getBoundingClientRect().width || 0;
        const cols = Math.max(1, Math.floor((W + gap) / (min + gap)));
        const colW = cols > 0 ? (W - (cols - 1) * gap) / cols : W;
        return { W, min, gap, cols, colW };
    }

    function ensureMeta() {
        for (const el of cards()) {
            if (!state.meta.has(el)) {
                state.meta.set(el, { span: Math.max(1, getSpan(el)) | 0, h: 0, dirty: true });
                el.style.cssText += baseCardCSS;
            }
        }
        // purge removed
        for (const el of Array.from(state.meta.keys())) {
            if (!el.isConnected || !el.matches(card)) state.meta.delete(el);
        }
    }

    function layout() {
        pending = false;
        ensureMeta();

        // 1) Compute geometry and write widths (WRITE)
        const { W, gap, cols, colW } = readVars();
        const widthChanged = Math.abs(W - lastLayoutW) >= 4; // ignore tiny oscillations
        lastLayoutW = W;
        state.cols = cols;
        state.colW = colW;
        if (state.H.length !== cols) state.H = new Float64Array(cols);
        for (let i = 0; i < cols; i++) state.H[i] = 0;

        const items = Array.from(state.meta.entries());
        // Priority grouping (cheap)
        items.sort((a, b) => {
            const pa = Number.parseFloat(a[0].getAttribute(priorityAttr)) || Infinity;
            const pb = Number.parseFloat(b[0].getAttribute(priorityAttr)) || Infinity;
            return pa - pb;
        });

        // Pass A: set target widths; mark dirty if width bucket changed
        for (const [el, meta] of items) {
            const prefer = Math.min(meta.span, cols);
            const span = adaptiveSpan ? prefer /* full search is pricey; keep simple */ : prefer;
            const width = span * colW + (span - 1) * gap;
            if (el.__mw !== width) {
                el.style.width = width + 'px';
                el.__mw = width;
                meta.dirty = true;
            }
        }

        // 2) Measure heights in one read phase (READ)
        // Force a single style flush by reading once,
        // then read all offsetHeights (they're now hot).
        // eslint-disable-next-line no-unused-expressions
        root.offsetHeight;
        for (const [el, meta] of items) {
            if (meta.dirty || widthChanged || meta.h === 0) {
                meta.h = el.offsetHeight;
                meta.dirty = false;
            }
        }

        // 3) Place items (COMPUTE)
        const positions = [];
        const H = state.H;
        function place(el, meta) {
            const prefer = Math.min(meta.span, cols);
            let bestSpan = prefer, bestC = 0, bestH = Infinity;

            // adaptive (cheap variant): try prefer and (prefer-1) only
            const spanCandidates = adaptiveSpan && prefer > 1 ? [prefer, prefer - 1] : [prefer];

            let choice = null;
            for (const span of spanCandidates) {
                const limit = cols - span;
                let cBest = 0, hBest = Infinity;
                for (let c = 0; c <= limit; c++) {
                    // max skyline in window
                    let h = 0;
                    for (let k = c; k < c + span; k++) if (H[k] > h) h = H[k];
                    if (h < hBest) { hBest = h; cBest = c; }
                }
                const newH = hBest + meta.h + gap;
                if (!choice || newH < choice.newH || (newH === choice.newH && span > choice.span)) {
                    choice = { span, c: cBest, top: hBest, left: cBest * (colW + gap), width: span * colW + (span - 1) * gap, newH };
                }
            }
            // raise skyline
            for (let k = choice.c; k < choice.c + choice.span; k++) H[k] = choice.newH;
            return choice;
        }

        let i = 0;
        while (i < items.length) {
            const groupStart = i;
            const pHere = Number.parseFloat(items[i][0].getAttribute(priorityAttr)) || Infinity;
            while (i < items.length && (Number.parseFloat(items[i][0].getAttribute(priorityAttr)) || Infinity) === pHere) {
                const [el, meta] = items[i++];
                const pos = place(el, meta);
                positions.push([el, pos]);
            }
            if (strictShelf) {
                const shelf = Math.max(...H);
                for (let c = 0; c < H.length; c++) H[c] = shelf;
            }
        }

        // 4) Commit transforms & container height (WRITE)
        let maxH = 0;
        for (const [el, p] of positions) {
            if (!p) continue;
            el.style.transform = `translate(${p.left.toFixed(2)}px, ${p.top.toFixed(2)}px)`;
            el.style.width = p.width.toFixed(2) + 'px';
            if (p.top + (el.offsetHeight || 0) > maxH) maxH = Math.max(maxH, p.top + (el.offsetHeight || 0));
        }
        // Remove last gap from container height
        root.style.height = (Math.max(...H) ? Math.max(...H) - (gap || 0) : 0) + 'px';
    }

    function schedule() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(layout);
    }

    // Observers
    ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(schedule, resizeDebounceMs);
    });
    ro.observe(root);

    mo = new MutationObserver(muts => {
        let touched = false;
        for (const m of muts) {
            if (m.type === 'childList') touched = true;
            if (m.type === 'attributes' && m.target.matches(card)) {
                const meta = state.meta.get(m.target);
                if (meta) meta.dirty = true;
                touched = true;
            }
        }
        if (touched) schedule();
    });
    mo.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class', 'data-col-span', 'data-span', 'data-priority'] });

    // First paint
    schedule();

    return {
        update() { schedule(); },
        disconnect() { ro?.disconnect(); mo?.disconnect(); },
    };
}
