const POINTER = { x: innerWidth/2, y: innerHeight/2 };
addEventListener('mousemove', e => { POINTER.x = e.clientX; POINTER.y = e.clientY; }, { passive:true });
addEventListener('touchmove', e => {
    const t = e.touches[0]; if (t) { POINTER.x = t.clientX; POINTER.y = t.clientY; }
}, { passive:true });

function getRandomColor(a=0.4){
    const r= Math.floor(Math.random()*256),
        g= Math.floor(Math.random()*256),
        b= Math.floor(Math.random()*256);
    return `rgba(${r},${g},${b},${a})`;
}
function makeStain() {
    const el = document.createElement('div');
    const W = 80, H = 80;

    Object.assign(el.style, {
        position: 'fixed', width: W+'px', height: H+'px',
        backgroundColor: getRandomColor(0.4), pointerEvents: 'none',
        left: `${Math.random() * (innerWidth * 0.6 - W/2)}px`,
        top:  `${Math.random() * (innerHeight - H/2)}px`,
        willChange: 'transform, opacity',
        transformOrigin: `${30 + Math.random()*40}% ${30 + Math.random()*40}%`
    });
    document.body.appendChild(el);

    // subtle base breath
    let breathDepth = 0.015 + Math.random()*0.015;   // 1.5–3%
    let breathHz    = 0.0008 + Math.random()*0.0008; // ~6–12s
    const phase     = Math.random()*Math.PI*2;
    let lastTune    = performance.now();

    // microscopic idle life (barely visible when far)
    const BASE = {
        jitterAmp:  0.001 + Math.random()*0.0015, // scale twitch depth
        jitterHz:   0.010 + Math.random()*0.015,  // twitch speed
        transAmpPx: 0.08  + Math.random()*0.18,   // wander px
        rotAmpDeg:  0.03  + Math.random()*0.06    // wobble deg
    };

    // proximity radii + linear gains
    const FAR_R   = 260;      // ~only breathing outside this
    const PANIC_R = 70;       // full tremor inside this
    const GAIN = { jitterAmp: 6, jitterHz: 6, trans: 5, rot: 10 };

    // jerk events
    let jerk = null;                  // {start,dur,dx,dy,ds,drot}
    let nextJerk = lastTune + 4000 + Math.random()*5000;

    const baseLeft = parseFloat(el.style.left) || 0;
    const baseTop  = parseFloat(el.style.top)  || 0;

    const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;

    function triggerJerk(t, k) {
        jerk = {
            start: t,
            dur: 90 + Math.random()*140,
            dx: (Math.random()*2-1) * BASE.transAmpPx * (8*k),
            dy: (Math.random()*2-1) * BASE.transAmpPx * (8*k),
            ds: (0.03 + Math.random()*0.05) * k,
            drot: (Math.random()*2-1) * (6*k)
        };
        nextJerk = t + (3500 + Math.random()*3500) / (0.6 + k);
    }

    function tick(t) {
        // occasionally retune breath (still subtle)
        if (t - lastTune > 5000 + Math.random()*7000) {
            breathDepth = 0.012 + Math.random()*0.02;
            breathHz    = 0.0006 + Math.random()*0.001;
            lastTune = t;
        }

        const breathe = 1 + Math.sin(t*breathHz + phase) * breathDepth;

        // linear proximity p = 0..1 (FAR_R -> 0, PANIC_R -> 1)
        const P = POINTER || { x: innerWidth/2, y: innerHeight/2 };
        const cx = baseLeft + W/2, cy = baseTop + H/2;
        const dist = Math.hypot(P.x - cx, P.y - cy);
        const p = clamp01((FAR_R - dist) / (FAR_R - PANIC_R));

        // linearly scale motion intensities
        const jitterAmp   = BASE.jitterAmp  * (1 + GAIN.jitterAmp * p);
        const jitterHz    = BASE.jitterHz   * (1 + GAIN.jitterHz  * p);
        const transAmpPx  = BASE.transAmpPx * (1 + GAIN.trans     * p);
        const rotAmpDeg   = BASE.rotAmpDeg  * (1 + GAIN.rot       * p);

        // anisotropic micro-squish uses jitterAmp
        const micro = 1 + Math.sin(t * jitterHz + phase * 7) * jitterAmp;

        // wander + wobble
        let tx  = Math.sin(t*jitterHz*0.5 + phase*5) * transAmpPx;
        let ty  = Math.cos(t*jitterHz*0.47 + phase*4) * transAmpPx;
        let rot = Math.sin(t*0.0016 + phase*3) * rotAmpDeg;

        // jerk chance ramps only when close
        const pJerk = clamp01((p - 0.6) / 0.4); // 0 until ~60% proximity
        if (!jerk && (t >= nextJerk || Math.random() < 0.02 * pJerk)) {
            triggerJerk(t, 0.4 + 0.8 * pJerk);
        }

        if (jerk) {
            const u = (t - jerk.start) / jerk.dur;
            if (u >= 1) {
                jerk = null;
            } else {
                const e = 1 - Math.pow(2, -10*u);
                tx  += jerk.dx * e;
                ty  += jerk.dy * e;
                rot += jerk.drot * e;
                const sJ = 1 + jerk.ds * e;
                el.style.transform =
                    `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px)`+
                    ` rotate(${rot.toFixed(2)}deg)`+
                    ` scale(${(breathe * micro * sJ).toFixed(4)}, ${(breathe / (micro * sJ)).toFixed(4)})`;
            }
        } else {
            el.style.transform =
                `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px)`+
                ` rotate(${rot.toFixed(2)}deg)`+
                ` scale(${(breathe * micro).toFixed(4)}, ${(breathe / micro).toFixed(4)})`;
        }

        // subtle flinch with proximity
        el.style.opacity = (0.97 - 0.12 * p).toFixed(3);

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    return el;
}

export function spawnStains(n=5){
    for (let i=0;i<n;i++) {
        // defer between frames so layout doesn’t choke
        requestIdleCallback?.(()=>makeStain()) ?? setTimeout(()=>makeStain(),0);
    }
}

/*-----------------------------------------------------------------------------
makeStain() — spawns one reactive blotch that “breathes” and reacts to proximity.

DEPENDENCIES
- Expects a global pointer object:  window.POINTER = { x, y }  (client coords).
  If absent, it defaults to screen center until the first pointer event.

RETURNS
- The created <div> element (position: fixed). You can remove() it later.

BASELINE BEHAVIOR (far away)
- Subtle “breathing” via scale:
    breathDepth  ~ 0.015–0.03   // how deep the breath feels (±% of size)
    breathHz     ~ 0.0006–0.0016 // slower = calmer (cycles per ms; 0.001 ~ 1s/1000ms factor)
- Microscopic idle motion (so it isn’t perfectly still):
    BASE.jitterAmp   // tiny extra scale twitch depth
    BASE.jitterHz    // tiny twitch speed
    BASE.transAmpPx  // sub-pixel wander in px
    BASE.rotAmpDeg   // microscopic wobble in degrees
  Keep these very small if you want “barely alive” at distance.

PROXIMITY → INTENSITY (linear)
- Distance thresholds (pixels, from stain center):
    FAR_R    // ≥ FAR_R → almost only breathing
    PANIC_R  // ≤ PANIC_R → full tremor/jerk
- We compute linear proximity p in [0..1]:
    p = clamp01( (FAR_R − distance) / (FAR_R − PANIC_R) )
- Motion gains ramp linearly with p (0=far, 1=very close):
    GAIN.jitterAmp  // extra scale twitch depth as p↑
    GAIN.jitterHz   // twitch speed as p↑
    GAIN.trans      // wander distance as p↑
    GAIN.rot        // wobble amplitude (deg) as p↑
  Effective amplitudes per frame:
    jitterAmp   = BASE.jitterAmp  * (1 + GAIN.jitterAmp * p)
    jitterHz    = BASE.jitterHz   * (1 + GAIN.jitterHz  * p)
    transAmpPx  = BASE.transAmpPx * (1 + GAIN.trans     * p)
    rotAmpDeg   = BASE.rotAmpDeg  * (1 + GAIN.rot       * p)

PANIC EVENTS (“jerks”)
- Short bursts that add a punch to translate/rotate/scale.
- Trigger probability ramps only when close:
    pJerk = clamp01((p − 0.6) / 0.4)   // 0 until ~60% proximity, then linear→1
  Strength scales with pJerk. Increase the 0.6 to make jerks rarer; decrease to make them eager.
- To disable jerks entirely: skip triggerJerk() calls or force pJerk=0.

VISUAL SHAPE
- transformOrigin is randomized per stain so scale/rotate pivots off-center (more organic).
- Opacity dips a little with p (looks like a flinch):  opacity ≈ 0.97 − 0.12*p.

PERF NOTES
- Only writes style.transform + style.opacity each frame (GPU-friendly).
- “will-change” hint is set; don’t spawn hundreds unless you like dropped frames.
- Stains are position:fixed and use clientX/Y, so they track correctly regardless of scroll.

TUNING RECIPES
- Calmer far-field: reduce BASE.* and/or lower GAIN.*; raise FAR_R so p≈0 most of the time.
- Panic only on true hover: shrink PANIC_R (e.g., 50–60) and/or make pJerk kick in at 0.8.
- More skittish near cursor: raise GAIN.trans / GAIN.jitterAmp.
- Bigger/smaller stains: change W/H; consider scaling BASE.transAmpPx proportionally.

INPUT CAPTURE
- pointerEvents:'none' means stains never block clicks/hover. Remove it if you need true :hover,
  but then they’ll intercept pointer events.

MATH CHEAT SHEET
- p ∈ [0..1] drives everything.
- micro-squish uses jitterAmp to do an anisotropic scale: scaleX ≈ breathe*micro, scaleY ≈ breathe/micro.
  That tiny X/Y mismatch is what sells “alive.”

Commit message in human: “linear proximity → subtle far, panic on top.”
-----------------------------------------------------------------------------*/

