export function devtoolsFumbler({
                             gapPx = 140,          // threshold in pixels
                             pollMs = 800,         // polling interval
                             onOpen = ()=>{},
                             onClose = ()=>{}
                         } = {}) {
    let open = false, t = null;

    function calcOpen(){
        const wGap = Math.max(0, window.outerWidth  - window.innerWidth);
        const hGap = Math.max(0, window.outerHeight - window.innerHeight);
        return (wGap > gapPx) || (hGap > gapPx);
    }

    function check(){
        const now = calcOpen();
        if (now !== open) {
            open = now;
            (open ? onOpen : onClose)();
        }
    }

    window.addEventListener('resize', check, { passive: true });
    window.addEventListener('orientationchange', check, { passive: true });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
    t = setInterval(check, pollMs);
    check();

    return { stop(){ clearInterval(t); window.removeEventListener('resize', check); } };
}
