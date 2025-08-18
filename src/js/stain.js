export {POINTER, spawnStains, makeStain, setWorld};

// Config
const CFG = {
    size: 90,
    colorS: 70,
    colorL: 50,
    hueJitter: 12,
    panicR: 70,
    farR: 260,
    shadow: {blur: 10, offScale: 6, spreadNear: 1, spreadFar: -8, curve: 3},
    baseOpacity: 0.7,
    opacityBump: 0.18,
    base: {jitterAmp: 0.001, jitterHz: 0.010, transAmp: 0.12, rotAmp: 0.05},
    gain: {jitterAmp: 6, jitterHz: 6, transAmp: 5, rotAmp: 10}
};

// Utils
const clamp = (a, b, x) => Math.max(a, Math.min(b, x));
const clamp01 = x => clamp(0, 1, x);
const rand = (a = 1) => Math.random() * a;

// Pointer (shared)
const POINTER = {x: innerWidth / 2, y: innerHeight / 2};
addEventListener('mousemove', ({clientX: x, clientY: y}) => (POINTER.x = x, POINTER.y = y), {passive: true});
addEventListener('touchmove', e => {
    const t = e.touches[0];
    if (t) (POINTER.x = t.clientX, POINTER.y = t.clientY);
}, {passive: true});

// World (bias field)
const World = (() => {
    const state = {friendliness: 0, tension: 0, dimness: 0};
    return {
        state, setWorld(p = {}) {
            if ('friendliness' in p) state.friendliness = clamp(-1, 1, p.friendliness);
            if ('tension' in p) state.tension = clamp(0, 1, p.tension);
            if ('dimness' in p) state.dimness = clamp(0, 1, p.dimness);
        },
    };
})();
const {setWorld} = World;

// Color
const hueForApproach = a => 200 - ((a + 1) / 2) * 180; // -1..+1 → 200→20
const pickHue = (approach) => (hueForApproach(approach) + (rand(CFG.hueJitter * 2) - CFG.hueJitter) + 360) % 360;

// Motion (proximity, wander)
function proximity(pointer, cx, cy) {
    const dx = pointer.x - cx, dy = pointer.y - cy;
    const dist = Math.hypot(dx, dy);
    const p = clamp01((CFG.farR - dist) / (CFG.farR - CFG.panicR));
    return {dx, dy, dist: Math.max(1, dist), p};
}

function gains(p) {
    return {
        jitterHz: CFG.base.jitterHz * (1 + CFG.gain.jitterHz * p),
        jitterAmp: CFG.base.jitterAmp * (1 + CFG.gain.jitterAmp * p),
        transAmp: CFG.base.transAmp * (1 + CFG.gain.transAmp * p),
        rotAmp: CFG.base.rotAmp * (1 + CFG.gain.rotAmp * p)
    };
}

function baseMotion(t, phase, g) {
    return {
        tx: Math.sin(t * g.jitterHz * 0.5 + phase * 5) * g.transAmp,
        ty: Math.cos(t * g.jitterHz * 0.47 + phase * 4) * g.transAmp,
        rot: Math.sin(t * 0.0016 + phase * 3) * g.rotAmp,
        micro: 1 + Math.sin(t * g.jitterHz + phase * 7) * g.jitterAmp
    };
}

// Visuals (single source of truth)
const Visuals = {
    spreadFor(dist) {
        const NEAR = CFG.panicR, FAR = CFG.farR;
        const t = clamp01((dist - NEAR) / (FAR - NEAR));   // 0 near, 1 far
        const w = 1 - Math.pow(t, CFG.shadow.curve);       // 1 near, 0 far
        return CFG.shadow.spreadFar + (CFG.shadow.spreadNear - CFG.shadow.spreadFar) * w;
    }, alpha(pEff) {
        const ceiling = CFG.baseOpacity - World.state.dimness * 0.08;
        return clamp01(ceiling + CFG.opacityBump * pEff);  // close → more opaque
    }, saturation(seekMinusAvoid, pEff) {
        return 1 + (seekMinusAvoid * 0.25) * pEff;
    }, paint(el, {hue, alpha, sat, dx, dy, dist}) {
        el.style.backgroundColor = `hsl(${hue} ${CFG.colorS}% ${CFG.colorL}% / ${alpha.toFixed(3)})`;
        el.style.filter = `saturate(${sat.toFixed(2)})`;
        const s = Visuals.spreadFor(dist).toFixed(2);
        const off = CFG.shadow.offScale;
        el.style.boxShadow = `${(-dx / dist) * off}px ${(-dy / dist) * off}px` + ` ${CFG.shadow.blur}px ${s}px rgba(0,0,0,.20)`;
    }
};

// HUD (opt-in, per-stain)
const HUD = {
    attach(targetEl) {
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
            const r = targetEl.getBoundingClientRect();
            hud.style.left = (r.left + r.width / 2) + 'px';
            hud.style.top = r.top + 'px';
            hud.textContent = text;
        };
    }
};

// Stain
class Stain {
    constructor(x, y, {size = CFG.size, dev = false} = {}) {
        this.size = size;
        this.dev = dev;
        this.el = document.createElement('div');
        this.persona = Stain.makePersona();
        this.hue = pickHue(this.persona.approach);

        Object.assign(this.el.style, {
            position: 'fixed',
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: `hsl(${this.hue} ${CFG.colorS}% ${CFG.colorL}% / ${CFG.baseOpacity})`,
            pointerEvents: 'none',
            willChange: 'transform, opacity, filter',
            transformOrigin: `${30 + rand(40)}% ${30 + rand(40)}%`
        });
        document.body.appendChild(this.el);

        // DEV HUD (optional)
        this.updateHUD = this.dev ? HUD.attach(this.el) : null;

        // local anim state
        this.phase = Math.random() * Math.PI * 2;
        this.lastTune = performance.now();
        this.breathDepth = 0.03 + rand(0.015);
        this.breathHz = 0.0008 + rand(0.0008);
        this.jerk = null;
        this.nextJerk = performance.now() + 4000 + rand(5000);

        requestAnimationFrame(this.tick);
    }

    static makePersona() {
        const approach = Math.random() * 2 - 1;
        const volatility = clamp01(0.05 + Math.random() * 0.85);
        const confidence = clamp01(Math.random());
        const sensitivity = clamp(0.2, 1, Math.random());
        const eccentricity = clamp01(Math.random());
        const quirks = new Set();
        if (Math.random() < 0.25) quirks.add('clingy');
        if (Math.random() < 0.20) quirks.add('startlesLate');
        if (Math.random() < 0.15) quirks.add('drifter');
        if (Math.random() < 0.12) quirks.add('stoic');
        if (Math.random() < 0.10) quirks.add('showoff');
        if (Math.random() < 0.08) quirks.add('sleepy');
        return {
            approach,
            volatility,
            confidence,
            sensitivity,
            eccentricity,
            quirks,
            moodT: Math.random() * Math.PI * 2,
            moodSpeed: 0.00005 + Math.random() * 0.0002
        };
    }

    static evalLive(persona, p) {
        persona.moodT += persona.moodSpeed;
        const m = 0.5 + 0.5 * Math.sin(persona.moodT);

        const pEff = clamp01(p * (0.8 + persona.sensitivity * 0.5));
        const appr = clamp(-1, 1, persona.approach + World.state.friendliness * 0.35);
        const avoid = Math.max(0, -appr), seek = Math.max(0, appr);

        const attractK = seek * (0.06 + 0.04 * m);
        const recoilK = avoid * (0.12 + 0.08 * (1 - persona.confidence));

        const tension = clamp01(persona.volatility * 0.8 + World.state.tension * 0.6);
        const jerkScale = 0.9 + tension * 0.5;
        const jerkBias = 0.7 + tension * 0.9;
        const jerkDir = appr >= 0 ? 'toward' : 'away';

        const scaleExcite = seek * 0.06, scaleShrink = avoid * 0.05;
        let recoveryLowpass = 0.08 * (1 - persona.confidence);
        if (persona.quirks.has('sleepy')) recoveryLowpass += 0.06;
        const eccScale = 1 + persona.eccentricity * 0.2;
        const rotSpike = persona.quirks.has('showoff') ? 1.5 : 1;

        return {
            pEff,
            attractK,
            recoilK,
            jerkScale,
            jerkBias,
            jerkDir,
            seekMinusAvoid: (seek - avoid),
            scaleExcite,
            scaleShrink,
            recoveryLowpass,
            eccScale,
            rotSpike
        };
    }

    tick = (t) => {
        // breath retune
        if (t - this.lastTune > 5000 + rand(7000)) {
            const sleepy = this.persona.quirks.has('sleepy') ? 0.7 : 1;
            this.breathDepth = 0.012 + rand(0.02);
            this.breathHz = (0.0006 + rand(0.001)) * sleepy;
            this.lastTune = t;
        }

        const breathe = 1 + Math.sin(t * this.breathHz + this.phase) * this.breathDepth;

        // proximity
        const left = parseFloat(this.el.style.left) || 0;
        const top = parseFloat(this.el.style.top) || 0;
        const cx = left + this.size / 2, cy = top + this.size / 2;
        const {dx, dy, dist, p} = proximity(POINTER, cx, cy);

        // base motion
        const g = gains(p);
        const {tx: btx, ty: bty, rot: brot, micro} = baseMotion(t, this.phase, g);
        let tx = btx, ty = bty, rot = brot;

        // personality eval
        const E = Stain.evalLive(this.persona, p);

        // intent forces
        if (E.attractK) {
            tx += dx * (E.attractK * E.pEff);
            ty += dy * (E.attractK * E.pEff);
        }
        if (E.recoilK) {
            const ux = -dx / dist, uy = -dy / dist;
            tx += ux * (this.size * E.recoilK * E.pEff);
            ty += uy * (this.size * E.recoilK * E.pEff);
        }

        // jerk trigger
        const pJerkBase = clamp01((E.pEff - 0.6) / 0.4) * E.jerkBias;
        const pJerk = this.persona.quirks.has('startlesLate') ? (E.pEff > 0.8 ? pJerkBase : 0) : pJerkBase;

        if (!this.jerk && (t >= this.nextJerk || Math.random() < 0.02 * pJerk)) {
            let vx = dx / dist, vy = dy / dist;
            if (E.jerkDir === 'away') (vx *= -1, vy *= -1);
            const k = (0.4 + 0.8 * clamp01(pJerk)) * (E.jerkScale || 1);
            const mag = CFG.base.transAmp * (8 * k);
            this.jerk = {
                start: t,
                dur: 90 + rand(140),
                dx: vx * mag,
                dy: vy * mag,
                ds: (0.03 + rand(0.05)) * k * (E.jerkDir === 'away' ? -1 : +1),
                drot: (Math.random() * 2 - 1) * (6 * k) * (E.rotSpike || 1)
            };
            this.nextJerk = t + (3500 + rand(3500)) / (0.6 + k);
        }

        // scale shaping
        const excite = 1 + E.scaleExcite * E.pEff;
        const shrink = 1 - E.scaleShrink * E.pEff;
        let sMulX = excite * shrink * (E.eccScale || 1);
        let sMulY = excite * shrink / (E.eccScale || 1);

        // timid/sleepy recovery
        if (E.recoveryLowpass && E.pEff < 0.2 && !this.jerk) {
            const low = 1 - E.recoveryLowpass;
            tx *= low;
            ty *= low;
            rot *= low;
        }

        // jerk overlay
        if (this.jerk) {
            const u = (t - this.jerk.start) / this.jerk.dur;
            if (u >= 1) {
                this.jerk = null;
            } else {
                const e = 1 - Math.pow(2, -10 * u);
                tx += this.jerk.dx * e;
                ty += this.jerk.dy * e;
                rot += this.jerk.drot * e;
                const sJ = 1 + Math.abs(this.jerk.ds) * e;
                sMulX *= sJ;
                sMulY *= sJ;
            }
        }

        // transform
        const sX = (breathe * micro * sMulX).toFixed(4);
        const sY = (breathe / (micro * sMulY)).toFixed(4);
        this.el.style.transform = `translate(${tx.toFixed(2)}px,` + ` ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${sX},${sY})`;

        // visuals
        const alpha = Visuals.alpha(E.pEff);
        const sat = Visuals.saturation(E.seekMinusAvoid, E.pEff);
        Visuals.paint(this.el, {hue: this.hue, alpha, sat, dx, dy, dist});

        // DEV HUD text (if enabled)
        if (this.updateHUD) {
            this.updateHUD(`p=${E.pEff.toFixed(2)}  a=${this.persona.approach.toFixed(2)}  ` + `conf=${this.persona.confidence.toFixed(2)}` + ` vol=${this.persona.volatility.toFixed(2)}`);
        }

        requestAnimationFrame(this.tick);
    }
}

// Sampling: spaced boxes (top-left)
function sampleBoxes(n, w, h, {
    box = CFG.size, margin = 100, gap = 100, tries = 800
} = {}) {
    const pts = [];
    const half = box / 2;
    const minCenterDist2 = (box + gap) * (box + gap);
    const xMin = margin + half, xMax = w - (margin + half);
    const yMin = margin + half, yMax = h - (margin + half);
    if (xMax <= xMin || yMax <= yMin) return [];

    const cell = (box + gap) / Math.SQRT2;
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    const grid = new Map();
    const key = (c, r) => `${c},${r}`;

    const neighbors = (x, y) => {
        const c = Math.floor(x / cell), r = Math.floor(y / cell);
        const out = [];
        for (let rr = r - 2; rr <= r + 2; rr++) {
            if (rr < 0 || rr >= rows) continue;
            for (let cc = c - 2; cc <= c + 2; cc++) {
                if (cc < 0 || cc >= cols) continue;
                const arr = grid.get(key(cc, rr));
                if (arr) out.push(...arr);
            }
        }
        return out;
    };

    const add = (x, y) => {
        const c = Math.floor(x / cell), r = Math.floor(y / cell);
        const k = key(c, r);
        if (!grid.has(k)) grid.set(k, []);
        grid.get(k).push({x, y});
        pts.push({x: Math.round(x - half), y: Math.round(y - half)});
    };

    for (let i = 0; i < n; i++) {
        let placed = false;
        for (let t = 0; t < tries; t++) {
            const x = xMin + Math.random() * (xMax - xMin);
            const y = yMin + Math.random() * (yMax - yMin);
            let ok = true;
            for (const p of neighbors(x, y)) {
                const dx = p.x - x, dy = p.y - y;
                if (dx * dx + dy * dy < minCenterDist2) {
                    ok = false;
                    break;
                }
            }
            if (!ok) continue;
            add(x, y);
            placed = true;
            break;
        }
        if (!placed) break;
    }
    return pts;
}

// Public API
function makeStain(x, y, opts = {}) {
    return new Stain(x, y, opts); // { size, dev }
}

function spawnStains(n = 3, {box = CFG.size, margin = 100, gap = 100, dev = false} = {}) {
    const pts = sampleBoxes(n, innerWidth, innerHeight, {box, margin, gap});
    for (const p of pts) {
        (window.requestIdleCallback ? requestIdleCallback : f => setTimeout(f, 0))(() => makeStain(p.x, p.y, {
            size: box,
            dev
        }));
    }
}
