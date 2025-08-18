export const sum = (arr) => arr?.reduce((a, b) => a + b, 0) || 0;
export const mean = (arr) => (!arr || arr.length === 0) ? 0 : sum(arr) / arr.length;

export function median(arr) {
    if (!arr?.length) return 0;
    const a = arr.slice().sort((x, y) => x - y);
    const m = a.length >> 1;
    return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

export function percentile(arr, p) {
    if (!arr?.length) return 0;
    if (p <= 0) return Math.min(...arr);
    if (p >= 100) return Math.max(...arr);
    const a = arr.slice().sort((x, y) => x - y);
    const rank = (p / 100) * (a.length - 1);
    const lo = Math.floor(rank), hi = Math.ceil(rank), t = rank - lo;
    return a[lo] * (1 - t) + a[hi] * t;
}

export function variance(arr, mu = mean(arr)) {
    if (!arr?.length) return 0;
    let s = 0; for (let i = 0; i < arr.length; i++) { const d = arr[i] - mu; s += d * d; }
    return s / arr.length;
}
export const stdev = (arr) => Math.sqrt(variance(arr));

export function histogram(arr, bins = 10, { min = Math.min(...arr), max = Math.max(...arr) } = {}) {
    if (!arr?.length) return { bins: [], counts: [] };
    const counts = new Array(bins).fill(0);
    const w = (max - min) || 1;
    for (const x of arr) {
        const t = Math.max(0, Math.min(1, (x - min) / w));
        let b = Math.floor(t * bins);
        if (b === bins) b = bins - 1;
        counts[b]++;
    }
    const edges = Array.from({ length: bins + 1 }, (_, i) => min + (i * w) / bins);
    return { bins: edges, counts };
}

// Entropy (counts can be Map, Object, or array of counts)
export function entropyFromCounts(counts) {
    let total = 0, it = [];
    if (Array.isArray(counts)) { it = counts; total = sum(counts); }
    else if (counts instanceof Map) { counts.forEach(v => it.push(v)); total = sum(it); }
    else { for (const k in counts) { it.push(counts[k]); } total = sum(it); }
    if (total <= 0) return 0;
    let H = 0;
    for (const v of it) if (v > 0) { const p = v / total; H -= p * Math.log(p); }
    return H; // nats
}

export function normEntropyFromCounts(counts) {
    const it = (counts instanceof Map) ? Array.from(counts.values()) :
        (Array.isArray(counts) ? counts.slice() : Object.values(counts));
    const K = it.filter(v => v > 0).length || 1;
    const H = entropyFromCounts(it);
    return H / Math.log(K);
}

// Gini (inequality of shares)
export function gini(arr) {
    if (!arr?.length) return 0;
    const a = arr.slice().sort((x,y)=>x-y);
    const n = a.length, S = sum(a);
    if (S === 0) return 0;
    let cum = 0, acc = 0;
    for (let i = 0; i < n; i++) { cum += a[i]; acc += cum; }
    return (n + 1 - 2 * (acc / cum)) / n;
}

// Argmax / normalize
export function argmax(arr) { let i = 0, m = -Infinity, idx = -1;
    for (; i < arr.length; i++) if (arr[i] > m) { m = arr[i]; idx = i; } return idx; }
export function normalize(arr) {
    const s = sum(arr) || 1; return arr.map(x => x / s);
}

// Rolling window stats (fixed-size queue)
export function rollingMean(window, next, state) {
    if (!state) state = { sum: 0, buf: new Array(window).fill(0), i: 0 };
    state.sum -= state.buf[state.i];
    state.buf[state.i] = next;
    state.sum += next;
    state.i = (state.i + 1) % window;
    return { value: state.sum / window, state };
}
