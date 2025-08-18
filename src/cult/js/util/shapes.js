// util/shapes.js
// Shape index (grab-and-go):
// ---------------------------------------------------------------------------
// smoothstep / smootherstep → gentle / ultra-gentle ease-in-out
// triangle / pulse          → hard/soft window shapes
// hinge / softplus          → hard/soft thresholds
// logistic / tanh01         → sigmoids in [0..1]
// borderBell / borderGauss  → peaks in the middle, fade at edges
// satGain / temperPow       → compress / exaggerate magnitudes
// superlin                  → superlinear growth
// gaussKernel / expKernel   → distance weighting
// softmaxT / sampleDiscrete → discrete choice & softmax
// logisticMap               → chaotic oscillator on [0..1]
// ema                        → exponential moving average
// ouStep                     → mean-reverting noisy drift
// ---------------------------------------------------------------------------
// All deterministic given inputs (except ouStep unless you pass seeded rand)

// ---------------------------------------------------------------------------
// Core utilities

export const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
export const lerp = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------------------
// Easing & step functions
// Turn a raw [0..1] into something smoother / more controllable.

export const smoothStep = (x, a = 0, b = 1) => {
    // 3t^2 - 2t^3 between a..b
    const t = clamp((x - a) / Math.max(1e-9, b - a), 0, 1);
    return t * t * (3 - 2 * t);
};

export const smootherStep = (x, a = 0, b = 1) => {
    // Quintic smooth — flatter start/end than smoothStep
    const t = clamp((x - a) / Math.max(1e-9, b - a), 0, 1);
    return t * t * t * (t * (6 * t - 15) + 10);
};

export const triangle = (x, c = 0.5, w = 0.6) => {
    // Linear peak at c, drop to 0 at edges of width w
    const d = Math.abs(x - c);
    const half = Math.max(1e-9, w / 2);
    const t = 1 - d / half;
    return clamp(t, 0, 1);
};

export const pulse = (x, a = 0.3, b = 0.7) =>
    (x >= a && x <= b) ? 1 : 0; // Hard-edged on/off window

export const hinge = (x, c = 0) => Math.max(0, x - c); // ReLU with offset
export const softplus = (x) => Math.log1p(Math.exp(x)); // Smooth hinge

// ---------------------------------------------------------------------------
// Sigmoids / bell curves
// Map inputs to bounded [0..1] transitions or peaks.

export function logistic(x, c = 0, s = 1) {
    // Steepness controlled by s; center at c
    const z = -(x - c) * (s || 1);
    return 1 / (1 + Math.exp(z));
}

export const tanh01 = (x, c = 0, s = 1) =>
    // tanh remapped to [0..1]
    0.5 * (Math.tanh((x - c) / s) + 1);

export const borderBell = (x, lo = 0.3, hi = 0.7) => {
    // Peak in middle of lo..hi, fall to 0 at edges
    const mid = (lo + hi) / 2;
    const w = Math.max(1e-9, (hi - lo) / 2);
    const t = clamp(1 - Math.abs(x - mid) / w, 0, 1);
    return smoothStep(t, 0, 1);
};

export const borderGauss = (kinFrac, sigma = 0.18) =>
    // Gaussian centered at 0.5
    Math.exp(-((kinFrac - 0.5) ** 2) / (sigma * sigma));

// ---------------------------------------------------------------------------
// Nonlinear gains & compressors

export function satGain(x, g = 1, k = 1) {
    // Saturating curve → plateaus at g as x→∞
    const xx = Math.max(0, x);
    return (g * xx) / (xx + (k || 1e-9));
}

export function temperPow(x, T = 1) {
    // Compress/exaggerate magnitudes: T>1 = flatter, T<1 = sharper
    if (T === 1) return x;
    const s = Math.sign(x);
    return s * Math.pow(Math.abs(x), 1 / T);
}

export const superlin = (v, alpha = 1.25) =>
    // Superlinear growth for positives only
    Math.pow(Math.max(0, v), alpha);

// ---------------------------------------------------------------------------
// Distance kernels
// Weight by distance — common in neighbor influence, etc.

export const gaussKernel = (d, sigma = 1) =>
    Math.exp(-(d * d) / (2 * sigma * sigma));

export const expKernel = (d, lam = 1) =>
    Math.exp(-lam * Math.max(0, d));

// ---------------------------------------------------------------------------
// Probabilities & sampling

export function softmaxT(values, T = 1) {
    // Temperature-scaled softmax → returns probability distribution
    const invT = 1 / Math.max(1e-9, T);
    const m = Math.max(...values);
    const exps = values.map(v => Math.exp((v - m) * invT));
    const Z = exps.reduce((a, b) => a + b, 0) || 1;
    return exps.map(e => e / Z);
}

export function sampleDiscrete(rng, probs) {
    // Pick index i with probability probs[i]
    let r = rng();
    for (let i = 0; i < probs.length; i++) {
        r -= probs[i];
        if (r <= 0) return i;
    }
    return probs.length - 1;
}

// ---------------------------------------------------------------------------
// Stateful / chaotic dynamics

export const logisticMap = (c, r = 3.9) =>
    // Chaotic recurrence on [0,1]
    clamp(r * c * (1 - c), 0, 1);

export const ema = (prev, val, lambda = 0.1) =>
    // Exponential moving average
    prev + lambda * (val - prev);

export function ouStep(xPrev, {theta = 0.15, sigma = 0.25, rand}) {
    // Ornstein–Uhlenbeck: mean-reverting noisy step
    const n = (rand?.() ?? Math.random) * 2 - 1; // uniform noise in [-1,1]
    return xPrev + theta * (0 - xPrev) + sigma * n;
}
