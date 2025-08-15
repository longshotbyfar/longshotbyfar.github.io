/* ============================================================================
 Stains — tiny personality-driven stains that react to the pointer.

 - Proximity p (0..1) is the master dial. Everything scales from it.
 - Personality bends four knobs:
     • approach  : attract vs. recoil intent
     • volatility: eagerness/strength of jerks + twitch speed
     • confidence: recovery slowness + opacity drop amount
     • sensitivity: how hard p hits (perceived closeness)
 - Base wander keeps the thing alive at rest.
 - Jerks are short, eased bursts temporarily overriding wander.
 - Visuals mirror intent so “mood” reads at a glance (opacity/saturation).
 Debug rule of thumb:
   If lost, turn off everything except base wander; then layer:
     1) intent force → “tickled vs. pain”
     2) jerks       → “startle”
     3) visuals     → “emotion”
============================================================================ */

/* ─────────────────────────────────────────────────────────────
   Exports
────────────────────────────────────────────────────────────── */
export {POINTER, setWorld, spawnStains, makeStain};

/* ─────────────────────────────────────────────────────────────
   Pointer (shared), HUD toggle
────────────────────────────────────────────────────────────── */
const POINTER = {x: innerWidth / 2, y: innerHeight / 2};

addEventListener('mousemove', ({clientX: x, clientY: y}) => {
    POINTER.x = x;
    POINTER.y = y;
}, {passive: true});

addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (!t) return;
    POINTER.x = t.clientX;
    POINTER.y = t.clientY;
}, {passive: true});

/* ─────────────────────────────────────────────────────────────
   World: a soft bias field that nudges every agent
   friendliness (-1..+1): negative = avoidant, positive = curious
   tension      (0..1)  : more jitter/jerk
   dimness      (0..1)  : lower opacity
────────────────────────────────────────────────────────────── */
const World = (() => {
    const state = {friendliness: 0, tension: 0, dimness: 0};
    const clamp = (a, b, x) => Math.max(a, Math.min(b, x));

    function setWorld(partial = {}) {
        if ('friendliness' in partial) state.friendliness = clamp(-1, 1, partial.friendliness);
        if ('tension' in partial) state.tension = clamp(0, 1, partial.tension);
        if ('dimness' in partial) state.dimness = clamp(0, 1, partial.dimness);
        // eslint-disable-next-line no-console
        console.log('WORLD', {...state});
    }

    return {state, setWorld};
})();
const {setWorld} = World;

/* ─────────────────────────────────────────────────────────────
   Constants + tiny utils
────────────────────────────────────────────────────────────── */
const FAR_R = 260;
const PANIC_R = 70;

const GAIN = {jitterAmp: 6, jitterHz: 6, trans: 5, rot: 10};

const clamp = (a, b, x) => Math.max(a, Math.min(b, x));
const clamp01 = x => clamp(0, 1, x);

const rand = n => Math.random() * n;
const randBetween = (a, b) => a + Math.random() * (b - a);

/* ─────────────────────────────────────────────────────────────
   HUD
────────────────────────────────────────────────────────────── */
const HUD = {
    attach(el) {
        if (!__DEV__) return () => {
        };
        const hud = document.createElement('div');
        Object.assign(hud.style, {
            position: 'fixed',
            font: '11px/1.1 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            color: '#e8eaed',
            background: 'rgba(0,0,0,.55)',
            padding: '2px 6px',
            borderRadius: '6px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            transform: 'translate(-50%,-150%)',
            zIndex: 2147483647
        });
        document.body.appendChild(hud);
        return (text) => {
            const r = el.getBoundingClientRect();
            hud.style.left = (r.left + r.width / 2) + 'px';
            hud.style.top = r.top + 'px';
            hud.textContent = text;
        };
    }
};

/* ─────────────────────────────────────────────────────────────
   RNG (xorshift32) — deterministic but tiny
────────────────────────────────────────────────────────────── */
function makeRNG(seed = Math.floor(Math.random() * 1e9)) {
    let s = seed >>> 0;
    const f = (max = null) => {
        s ^= s << 13;
        s ^= s >>> 17;
        s ^= s << 5;
        s >>>= 0;
        const x = s / 0xffffffff;
        return max == null ? x : x * max;
    };
    f.int = n => Math.floor(f() * n);  // 0..n-1
    f.seed = seed >>> 0;
    return f;
}

const choose = (rng, arr) => arr[rng.int(arr.length)];

/* ─────────────────────────────────────────────────────────────
   Color: approach-biased palette (blue → orange)
   approach (-1..+1) maps to hue ~200°→20°, with jitter.
────────────────────────────────────────────────────────────── */
const Colors = {
    biasedRGBA(approach, a = 0.4) {
        const hueDeg = 200 - ((approach + 1) / 2) * (200 - 20);
        const h = (hueDeg + Math.random() * 24 - 12 + 360) % 360;
        const s = 60 + Math.random() * 30;
        const l = 40 + Math.random() * 15;

        // HSL → RGB
        const c = (1 - Math.abs(2 * l / 100 - 1)) * (s / 100);
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l / 100 - c / 2;
        let r = 0, g = 0, b = 0;
        if (h < 60) [r, g, b] = [c, x, 0];
        else if (h < 120) [r, g, b] = [x, c, 0];
        else if (h < 180) [r, g, b] = [0, c, x];
        else if (h < 240) [r, g, b] = [0, x, c];
        else if (h < 300) [r, g, b] = [x, 0, c];
        else [r, g, b] = [c, 0, x];

        const R = Math.round((r + m) * 255);
        const G = Math.round((g + m) * 255);
        const B = Math.round((b + m) * 255);
        return `rgba(${R},${G},${B},${a})`;
    }
};

/* ─────────────────────────────────────────────────────────────
   Geometry / proximity
────────────────────────────────────────────────────────────── */
const Geo = {
    centerOf(el, w, h) {
        return {
            cx: (parseFloat(el.style.left) || 0) + w / 2,
            cy: (parseFloat(el.style.top) || 0) + h / 2
        };
    },
    proximity(pointer, cx, cy) {
        const dx = pointer.x - cx, dy = pointer.y - cy;
        const dist = Math.hypot(dx, dy);
        const p = clamp01((FAR_R - dist) / (FAR_R - PANIC_R));
        return {dist, p, dx, dy};
    }
};

/* ─────────────────────────────────────────────────────────────
   Personality
   Axes:
     approach   (−1..+1)
     volatility (0..1)
     confidence (0..1)
     sensitivity(0.2..1)
     eccentricity (0..1)
   Quirks: clingy, startlesLate, drifter, stoic, showoff, sleepy
────────────────────────────────────────────────────────────── */
const Personality = {
    make(seed) {
        const rng = makeRNG(seed);
        const approach = rng() * 2 - 1;
        const volatility = clamp01(0.05 + rng() * 0.85);
        const confidence = clamp01(rng());
        const sensitivity = clamp(0.2, 1, rng());
        const eccentricity = clamp01(rng());

        const quirks = new Set();
        if (rng() < 0.25) quirks.add('clingy');
        if (rng() < 0.20) quirks.add('startlesLate');
        if (rng() < 0.15) quirks.add('drifter');
        if (rng() < 0.12) quirks.add('stoic');
        if (rng() < 0.10) quirks.add('showoff');
        if (rng() < 0.08) quirks.add('sleepy');

        const hueBias = rng(); // unused externally but could tint later
        const mood = {t: rng() * Math.PI * 2, speed: 0.00005 + rng() * 0.0002};

        const archetype = (() => {
            const a = approach, v = volatility, c = confidence;
            if (a > 0.4 && v < 0.4) return 'Curious';
            if (a > 0.4 && v >= 0.4) return 'Impish';
            if (a < -0.4 && v > 0.5) return 'Skittish';
            if (a < -0.4 && v <= 0.5) return 'Aloof';
            if (c > 0.7 && v > 0.6) return 'Defiant';
            if (quirks.has('sleepy')) return 'Drowsy';
            return choose(rng, ['Odd', 'Soft', 'Tentative', 'Feral', 'Mousy']);
        })();

        return {
            seed: rng.seed, approach, volatility, confidence, sensitivity,
            eccentricity, quirks, hueBias, mood, archetype
        };
    },

    /**
     * Translate personality + world + proximity into live parameters.
     * This is the “control surface” the motion/visual layers read.
     */
    evalLive(persona, p) {
        // Mood drift 0..1
        const m = 0.5 + 0.5 * Math.sin(persona.mood.t);
        persona.mood.t += persona.mood.speed;

        // Sensitivity modulates perceived proximity
        const pEff = clamp01(p * (0.8 + persona.sensitivity * 0.5));

        // Friendly world bias shifts approach
        const approach = clamp(-1, 1, persona.approach + World.state.friendliness * 0.35);
        const avoid = approach < 0 ? -approach : 0;
        const seek = approach > 0 ? approach : 0;

        // Intent
        const attractK = seek * (0.06 + 0.04 * m);
        const recoilK = avoid * (0.12 + 0.08 * (1 - persona.confidence));

        // Volatility + world tension
        const tension = clamp01(persona.volatility * 0.8 + World.state.tension * 0.6);
        const jerkScale = 0.9 + tension * 0.5;
        const jerkBias = 0.7 + tension * 0.9; // multiplies probability
        const jerkDir = approach >= 0 ? 'toward' : 'away';

        // Visuals
        const stoicFactor = persona.quirks.has('stoic') ? 0.5 : 1;
        const opacityBase = 0.96 - World.state.dimness * 0.08;
        const opacityDrop = (0.15 + 0.10 * (1 - persona.confidence)) * stoicFactor;
        const saturateBump = (seek - avoid) * 0.25; // more color when seeking

        // Size bias
        const scaleExcite = seek * 0.06;
        const scaleShrink = avoid * 0.05;

        // Recovery
        let recoveryLowpass = 0.08 * (1 - persona.confidence);
        if (persona.quirks.has('sleepy')) recoveryLowpass += 0.06;

        // Eccentricity → off-axis squish + showoff spikes
        const eccScale = 1 + persona.eccentricity * 0.2;
        const rotSpike = persona.quirks.has('showoff') ? 1.5 : 1.0;

        return {
            pEff, attractK, recoilK,
            jerkScale, jerkBias, jerkDir,
            opacityBase, opacityDrop, saturateBump,
            scaleExcite, scaleShrink,
            recoveryLowpass,
            eccScale, rotSpike
        };
    }
};

/* ─────────────────────────────────────────────────────────────
   Motion primitives (base wander + micro squish + gains)
────────────────────────────────────────────────────────────── */
const Motion = {
    gains(BASE, p) {
        return {
            jitterAmp: BASE.jitterAmp * (1 + GAIN.jitterAmp * p),
            jitterHz: BASE.jitterHz * (1 + GAIN.jitterHz * p),
            transAmpPx: BASE.transAmpPx * (1 + GAIN.trans * p),
            rotAmpDeg: BASE.rotAmpDeg * (1 + GAIN.rot * p)
        };
    },
    base(t, phase, jitterHz, transAmpPx, rotAmpDeg) {
        const tx = Math.sin(t * jitterHz * 0.5 + phase * 5) * transAmpPx;
        const ty = Math.cos(t * jitterHz * 0.47 + phase * 4) * transAmpPx;
        const rot = Math.sin(t * 0.0016 + phase * 3) * rotAmpDeg;
        return {tx, ty, rot};
    },
    microSquish(t, jitterHz, phase, jitterAmp) {
        return 1 + Math.sin(t * jitterHz + phase * 7) * jitterAmp;
    }
};

/* ─────────────────────────────────────────────────────────────
   Visuals
────────────────────────────────────────────────────────────── */
const Visuals = {
    apply(el, E, pEff, breathe, micro, baseScaleX, baseScaleY) {
        const sat = 1 + E.saturateBump * pEff;
        const opacity = (E.opacityBase - E.opacityDrop * pEff);
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = `saturate(${sat.toFixed(2)})`;

        // scale already computed before (we just keep it grouped here for symmetry)
        return {sX: baseScaleX, sY: baseScaleY, breathe, micro};
    }
};

/* ─────────────────────────────────────────────────────────────
   Stain – the agent itself
────────────────────────────────────────────────────────────── */
function makeStain(opts = {}) {
    const el = document.createElement('div');
    const W = 80, H = 80;

    // Per-stain personality
    const persona = opts.personality || Personality.make(opts.seed);

    Object.assign(el.style, {
        position: 'fixed',
        width: `${W}px`,
        height: `${H}px`,
        backgroundColor: Colors.biasedRGBA(persona.approach, 0.4),
        pointerEvents: 'none',
        left: `${Math.random() * (innerWidth * 0.6 - W / 2)}px`,
        top: `${Math.random() * (innerHeight - H / 2)}px`,
        willChange: 'transform, opacity, filter',
        transformOrigin: `${30 + rand(40)}% ${30 + rand(40)}%`
    });
    document.body.appendChild(el);

    let updateHUD;
    if (__DEV__) updateHUD = HUD.attach(el);

    // Local state
    const state = {
        breathDepth: 0.015 + rand(0.015),
        breathHz: 0.0008 + rand(0.0008),
        phase: Math.random() * Math.PI * 2,
        lastTune: performance.now(),
        jerk: null,
        nextJerk: performance.now() + 4000 + rand(5000),
        BASE: {
            jitterAmp: 0.001 + rand(0.0015),
            jitterHz: 0.010 + rand(0.015),
            transAmpPx: 0.08 + rand(0.18),
            rotAmpDeg: 0.03 + rand(0.06)
        }
    };

    function tick(t) {
        // Breath re-tune
        if (t - state.lastTune > 5000 + rand(7000)) {
            const sleepy = persona.quirks.has('sleepy') ? 0.7 : 1;
            state.breathDepth = 0.012 + rand(0.02);
            state.breathHz = (0.0006 + rand(0.001)) * sleepy;
            state.lastTune = t;
        }

        const breathe = 1 + Math.sin(t * state.breathHz + state.phase) * state.breathDepth;

        // Proximity
        const {cx, cy} = Geo.centerOf(el, W, H);
        const P = POINTER || {x: innerWidth / 2, y: innerHeight / 2};
        const {dist, p, dx, dy} = Geo.proximity(P, cx, cy);

        if (__DEV__) {
            const d = dist || 1;
            el.style.boxShadow = dist < FAR_R
                ? `${(-dx / d) * 6}px ${(-dy / d) * 6}px 10px rgba(0,0,0,.35)`
                : '0 8px 20px rgba(0,0,0,.35)';
        }

        // Gains & base motion
        const g = Motion.gains(state.BASE, p);
        const micro = Motion.microSquish(t, g.jitterHz, state.phase, g.jitterAmp);
        let {tx, ty, rot} = Motion.base(t, state.phase, g.jitterHz, g.transAmpPx, g.rotAmpDeg);

        // Far-field drifter boost
        if (persona.quirks.has('drifter') && p < 0.2) {
            tx *= 1.6;
            ty *= 1.6;
        }

        // Live parameters from personality (includes world)
        const E = Personality.evalLive(persona, p);

        // Intent forces
        if (E.attractK) {
            tx += dx * (E.attractK * E.pEff);
            ty += dy * (E.attractK * E.pEff);
        }
        if (E.recoilK) {
            const d = dist || 1, ux = -dx / d, uy = -dy / d;
            tx += ux * (W * E.recoilK * E.pEff);
            ty += uy * (H * E.recoilK * E.pEff);
        }

        // Jerk probability & trigger
        const pJerkBase = clamp01((E.pEff - 0.6) / 0.4) * E.jerkBias;
        const pJerk = persona.quirks.has('startlesLate') ? (E.pEff > 0.8 ? pJerkBase : 0) : pJerkBase;

        if (!state.jerk && (t >= state.nextJerk || Math.random() < 0.02 * pJerk)) {
            let vx = Math.random() * 2 - 1, vy = Math.random() * 2 - 1;
            if (E.jerkDir !== 'random') {
                const d = dist || 1;
                vx = dx / d;
                vy = dy / d;
                if (E.jerkDir === 'away') {
                    vx *= -1;
                    vy *= -1;
                }
            }
            const k = (0.4 + 0.8 * clamp01(pJerk)) * (E.jerkScale || 1);
            const mag = state.BASE.transAmpPx * (8 * k);
            state.jerk = {
                start: t,
                dur: 90 + rand(140),
                dx: vx * mag,
                dy: vy * mag,
                ds: (0.03 + rand(0.05)) * k * (E.jerkDir === 'away' ? -1 : +1),
                drot: (Math.random() * 2 - 1) * (6 * k) * (E.rotSpike || 1)
            };
            state.nextJerk = t + (3500 + rand(3500)) / (0.6 + k);
        }

        // Scale shaping (eccentricity skews X/Y)
        const excite = 1 + E.scaleExcite * E.pEff;
        const shrink = 1 - E.scaleShrink * E.pEff;
        const sMulX = excite * shrink * (E.eccScale || 1);
        const sMulY = excite * shrink / (E.eccScale || 1);

        // timid/sleepy recovery lowpass
        if (E.recoveryLowpass && E.pEff < 0.2 && !state.jerk) {
            const low = 1 - E.recoveryLowpass;
            tx *= low;
            ty *= low;
            rot *= low;
        }

        // Jerk overlay path
        if (state.jerk) {
            const u = (t - state.jerk.start) / state.jerk.dur;
            if (u >= 1) {
                state.jerk = null;
            } else {
                const e = 1 - Math.pow(2, -10 * u);
                tx += state.jerk.dx * e;
                ty += state.jerk.dy * e;
                rot += state.jerk.drot * e;

                const sJ = 1 + Math.abs(state.jerk.ds) * e; // sign baked earlier
                const sX = (breathe * micro * sMulX * sJ).toFixed(4);
                const sY = (breathe / (micro * sMulY * sJ)).toFixed(4);

                el.style.transform =
                    `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${sX}, ${sY})`;

                Visuals.apply(el, E, E.pEff, breathe, micro, sX, sY);

                if (__DEV__) {
                    updateHUD(
                        `p=${E.pEff.toFixed(2)} app=${persona.approach.toFixed(2)} `
                        + `conf=${persona.confidence.toFixed(2)} vol=${persona.volatility.toFixed(2)} `
                        + `arch=${persona.archetype} JERK u=${u.toFixed(2)}`
                    );
                }
                requestAnimationFrame(tick);
                return;
            }
        }

        // Non-jerk path
        const sX = (breathe * micro * sMulX).toFixed(4);
        const sY = (breathe / (micro * sMulY)).toFixed(4);
        el.style.transform =
            `translate(${tx.toFixed(2)}px,${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${sX}, ${sY})`;

        Visuals.apply(el, E, E.pEff, breathe, micro, sX, sY);

        if (__DEV__) {
            updateHUD(
                `p=${E.pEff.toFixed(2)} app=${persona.approach.toFixed(2)} `
                + `conf=${persona.confidence.toFixed(2)} vol=${persona.volatility.toFixed(2)} `
                + `arch=${persona.archetype}`
            );
        }

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    el.dataset.persona = (opts.debugName || persona.archetype);
    return el;
}

/* ─────────────────────────────────────────────────────────────
   Spawner — reproducible casts via seed
────────────────────────────────────────────────────────────── */
function spawnStains(n = 5, {seed} = {}) {
    const rng = makeRNG(seed ?? Math.floor(Math.random() * 1e9));
    for (let i = 0; i < n; i++) {
        const s = rng.int(1e9);
        (window.requestIdleCallback
                ? requestIdleCallback(() => makeStain({seed: s}))
                : setTimeout(() => makeStain({seed: s}), 0)
        );
    }
}
