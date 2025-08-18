// rng.js — deterministic seeds and per-salt streams

import {DETERMINISTIC} from "../config/config.js";

export const U32_MAX = 0x1_0000_0000; // 2^32
// base: turn rng():[0,1) into unsigned 32-bit int
export const u32 = (rng) => (rng() * U32_MAX) >>> 0;
// fraction [0,1) from u32
export const f01 = (rng) => u32(rng) / U32_MAX;
// strictly (0,1) to avoid log(0) in Box–Muller
export const fOpen01 = (rng) => (u32(rng) + 0.5) / (U32_MAX + 1);
// uniform [a,b)
export const randRange = (rng, a, b) => a + (b - a) * f01(rng);


export function cyrb32(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return () => {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    };
}

export function splitmix32(a) {
    return function() {
        a |= 0;
        a = (a + 0x9e3779b9) | 0;
        let t = a ^ (a >>> 16);
        t = Math.imul(t, 0x21f0aaad); t ^= t >>> 15;
        t = Math.imul(t, 0x735a2d97); t ^= t >>> 15;
        return (t >>> 0) / 4294967296;
    };
}

// masterSeed -> rngGenerator(salt) -> rng()
// each call yields an independent stream
export function makeRandomNumberGenFactory(masterSeedString = "seed") {
    const seedFn = cyrb32(String(masterSeedString));
    return (salt = "") => {
        const mix = (seedFn() ^ cyrb32(String(salt))()) >>> 0;
        return splitmix32(mix);
    };
}

// standard normal via Box–Muller (deterministic if rng is)
export function randNorm(rng) {
    const u = fOpen01(rng);          // (0,1)
    const v = f01(rng);              // [0,1)
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// weighted pick — fully integer gate (no float thresholds)
export function pickWeighted(rng, items, weights) {
    const n = items.length;
    if (n === 0) throw new Error("pickWeighted: empty items");
    if (weights.length !== n) throw new Error("pickWeighted: weights/items mismatch");

    // sanitize & sum
    const w = new Array(n);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        const wi = Number.isFinite(weights[i]) ? Math.max(0, weights[i]) : 0;
        w[i] = wi; sum += wi;
    }
    if (sum <= 0) return items[0]; // all zero: pick first deterministically

    // scale to 32-bit integer buckets
    // ensure coverage by handing leftover units to largest weights
    const scaled = new Array(n);
    let acc = 0, leftover = U32_MAX;
    for (let i = 0; i < n; i++) {
        const si = Math.floor(w[i] / sum * U32_MAX);
        scaled[i] = si; acc += si;
    }
    leftover -= acc;
    if (leftover > 0) {
        // distribute leftovers to entries with largest fractional parts
        const fracs = w.map(x => x / sum * U32_MAX - Math.floor(x / sum * U32_MAX));
        const order = [...fracs.keys()].sort((a,b)=>fracs[b]-fracs[a]);
        for (let k = 0; k < leftover; k++) scaled[order[k % n]]++;
    }

    // draw and walk cumulative
    const r = u32(rng);
    let cum = 0;
    for (let i = 0; i < n; i++) {
        cum += scaled[i];
        if (r < cum) return items[i];
    }
    return items[n - 1]; // should not hit, safety
}
export const rand01 = f01;

export function pickRandom(rng, arr) {
    if (!arr?.length) throw new Error("pickRandom: empty array");
    // integer gate: avoids any float rounding bias
    return arr[u32(rng) % arr.length];
}

// Value noise from coordinates (cheap)
export function hash2D(x, y, salt = "field") {
    const key = `${x},${y}|${salt}`;
    const seed = cyrb32(key)();
    return splitmix32(seed)();
}

export function randomDir(rng) {
    if (DETERMINISTIC && rng === Math.random) {
        console.warn("Math.random rng in randomDir");
    }
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    return dirs[R.pickIndex(rng, dirs.length)];
}

export function hash32(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^ (h >>> 16)) >>> 0;
}

export const R = {
    u32: rng => (rng() * 0x1_0000_0000) >>> 0,
    pickIndex: (rng, n) => R.u32(rng) % n,
    pass: (rng, p) => R.u32(rng) < ((p * 0x1_0000_0000) >>> 0),
};