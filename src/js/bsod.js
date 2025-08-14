// full BSOD with small chance per click; cancels that click's navigation
export function wireBSOD({
                      ratePerClick = 0.01,       // 2% chance per click
                      autoCloseAt100 = true,     // close when "dump" hits 100%
                      oncePerVisit = false       // set true to only ever trigger once
                  } = {}) {
    let active = false;
    let trippedThisVisit = false;

    // overlay DOM (one-time)
    const o = document.createElement('div');
    o.className = 'bsod';
    o.innerHTML = `
    <div class="wrap" role="dialog" aria-live="assertive" aria-label="System error">
      <h1>*** STOP: 0x000000ED (UNTHOUGHT_NOT_HANDLED)</h1>
      <p>A problem has been detected and the ritual has been shut down to prevent damage to your session.</p>
      <p>If this is the first time you've seen this stop screen, relax. If this screen appears again, consider mercy.</p>
      <pre>Technical info:
*** STOP: 0x000000ED (0xBADC0DE, 0x00000001, 0x00000000, 0xDEADC0DE)
*** <span class="mod">site.js</span> - ADDRESS <span class="addr">001A:4D00</span> base at 001A0000, DateStamp 00000000</pre>
      <div class="bar" aria-hidden="true"><i></i></div>
      <p class="hint">Dumping physical memory: <span class="pct">0</span>%</p>
      <p class="hint">Press ESC or click to attempt to continue.</p>
    </div>`;
    document.body.appendChild(o);

    function showBSOD(cancelledClickEvent) {
        if (active) return;
        active = true;
        if (oncePerVisit) trippedThisVisit = true;

        // lock scroll
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';

        o.classList.add('show');

        const bar = o.querySelector('.bar i');
        const pctEl = o.querySelector('.pct');
        let pct = 0;

        const iv = setInterval(() => {
            pct = Math.min(100, pct + (Math.random()*9 + 3) | 0); // +3..+12
            bar.style.width = pct + '%';
            pctEl.textContent = pct;
            if (pct >= 100 && autoCloseAt100) {
                clearInterval(iv);
                done();
            }
        }, 80);

        function done() {
            clearInterval(iv);
            o.classList.remove('show');
            document.documentElement.style.overflow = prevOverflow;
            active = false;
            // if we intercepted a click, optionally re-fire it after close:
            // (leave disabled for chaos; enable if you want polite behavior)
            // if (cancelledClickEvent && cancelledClickEvent.target) cancelledClickEvent.target.click();
        }
    }

    // probabilistic hijack on any click (capture so it beats links/buttons)
    document.addEventListener('click', (e) => {
        if (active) return;
        if (oncePerVisit && trippedThisVisit) return;
        if (Math.random() < ratePerClick) {
            // stop this click from navigating / activating
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            showBSOD(e);
        }
    }, true);
}
