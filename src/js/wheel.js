export function createWheel(target, opts = {
    speed: 200,
    padding: 1.5,
    gap: [3000, 12000],
    bothDirections: true,
}) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    const img = el.querySelector('img');
    if (!img) return;

    let timer = null;
    let anim = null;
    let destroyed = false;

    function schedule() {
        if (destroyed) return;
        const [min, max] = opts.gap;
        const delay = min + Math.random() * (max - min);
        timer = setTimeout(rollOnce, delay);
    }

    function clearTimer() {
        if (timer) { clearTimeout(timer); timer = null; }
    }

    function cancelAnim() {
        if (anim) { try { anim.cancel(); } catch {} anim = null; }
    }

    function rollOnce() {
        if (destroyed) return;

        const size = el.getBoundingClientRect().width; // assume square
        const r = size / 2;
        const C = 2 * Math.PI * r;
        const w = innerWidth;

        const rightward = opts.bothDirections ? Math.random() < 0.5 : true;
        const pad = size * opts.padding;
        const startX = rightward ? -pad : (w + pad);
        const endX   = rightward ? (w + pad) : -pad;

        const distance = Math.abs(endX - startX);
        const degrees  = (distance / C) * 360 * (rightward ? 1 : -1);
        const duration = (distance / opts.speed) * 1000;

        cancelAnim();
        anim = el.animate(
            [
                { transform: `translate3d(${startX}px,0,0) rotate(0deg)` },
                { transform: `translate3d(${endX}px,0,0) rotate(${degrees}deg)` }
            ],
            { duration, easing: 'linear', fill: 'forwards', composite: 'replace' }
        );
        anim.onfinish = schedule;
    }

    function start() {
        if (destroyed) return;
        clearTimer();
        if (img.complete) schedule();
        else img.addEventListener('load', schedule, { once: true });
    }

    function stop() { clearTimer(); cancelAnim(); }
    function destroy() { destroyed = true; stop(); }
    function updateOptions(newOpts = {}) {
        if ('speed' in newOpts) opts.speed = newOpts.speed;
        if ('padding' in newOpts) opts.padding = newOpts.padding;
        if ('gap' in newOpts) opts.gap = newOpts.gap;
        if ('bothDirections' in newOpts) opts.bothDirections = newOpts.bothDirections;
    }

    return { start, stop, destroy, updateOptions };
}
