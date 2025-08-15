export function wireBSOD({
                             ratePerClick = 0.01,
                             autoCloseAt100 = true,
                             oncePerVisit = false,
                             delayMs = 3000
                         } = {}) {
    let active = false;
    let trippedThisVisit = false;

    const o = document.createElement('div');
    o.className = 'bsod';
    o.innerHTML = `
<div class="wrap" role="dialog" aria-live="assertive" aria-label="System ritual fault">
  <h1>*** STOP: 0x0000DEAD (UNREALITY_NOT_HANDLED)</h1>
  <p>An irrecoverable metaphysical fault has occurred and the ritual process has been halted` +
        `to prevent bleed-through into the physical layer.</p>
  <p>If this is the first time you’ve encountered this failure, step away from the screen. ` +
        `If it appears again, the fabric of reality is compromised.</p>
  <pre>Technical necro-info:
*** STOP: 0x0000DEAD (0xFEEDFACE, 0xBADCAFFE, 0x00000000, 0xDEADC0DE)
*** <span class="mod">reality.js</span> – ADDRESS <span class="addr">0666:0B00</span> base at 06660000, DateStamp 0000BEEF
*** ERROR: Stack underflow in dreamspace context
*** TRACE: /blood/veil/core/memory : NULLVOID
  </pre>
  <div class="bar" aria-hidden="true"><i></i></div>
  <p class="hint">Transcribing last coherent thought: <span class="pct">0</span>%</p>
  <p class="hint">Press ESC or click to attempt re-synchronization (not recommended).</p>
</div>`;
    document.body.appendChild(o);

    function showBSOD() {
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
            pct = Math.min(100, pct + (Math.random() * 9 + 3) | 0); // +3..+12
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
        }
    }

    document.addEventListener('click', (e) => {
        if (active) return;
        if (oncePerVisit && trippedThisVisit) return;
        if (Math.random() < ratePerClick) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            setTimeout(() => showBSOD(e), delayMs);
        }
    }, true);
}
