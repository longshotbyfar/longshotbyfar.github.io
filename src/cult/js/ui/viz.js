// viz.js
import {knobs} from "../config/config.js";
import {computeMetrics} from "../util/metrics.js";
import {inBrowser} from "../util/util.js";

/* ============ Config ============ */
const HISTORY = () => knobs.viz.chartHistory;

/* ============ Which metrics to show ============ */
const SERIES = [
    {key: "entropy", label: "Entropy (H)", fmt: v => v},
    {key: "frontier", label: "Frontier length", fmt: v => v},
    {key: "clusters_p90", label: "Cluster size (p90)", fmt: v => v},
    {key: "loner_pct", label: "Loner %", fmt: v => v, min: 0, max: 1},
    {key: "occupancy", label: "Occupancy", fmt: v => v, min: 0, max: 1},
];

/* ============ State ============ */
const history = {
    ticks: [],
    // per-key arrays created on-demand
};
const charts = new Map(); // key -> Chart instance

/* ============ DOM helpers ============ */
function ensureCanvas(id, title, w = 860, h = 180) {
    let wrap = document.getElementById(id + "_wrap");
    if (!wrap) {
        wrap = document.createElement("div");
        wrap.id = id + "_wrap";
        wrap.style.margin = "10px 0 16px";
        // title
        const h4 = document.createElement("div");
        h4.textContent = title;
        h4.style.font = "600 13px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
        h4.style.margin = "0 0 6px";
        wrap.appendChild(h4);
        // canvas
        const canvas = document.createElement("canvas");
        canvas.id = id;
        canvas.width = w;
        canvas.height = h;
        wrap.appendChild(canvas);
        document.body.appendChild(wrap);
    }
    return document.getElementById(id);
}

/* ============ Data helpers ============ */
function pushHistoryPoint(tick, metrics) {
    // init arrays lazily
    if (!history.ticks) history.ticks = [];
    for (const {key} of SERIES) {
        if (!history[key]) history[key] = [];
    }

    history.ticks.push(tick);
    for (const {key, fmt} of SERIES) {
        history[key].push(fmt(metrics[key] ?? 0));
    }

    // cap length
    const cap = HISTORY();
    if (history.ticks.length > cap) {
        const trim = arr => arr.slice(-cap);
        history.ticks = trim(history.ticks);
        for (const {key} of SERIES) history[key] = trim(history[key]);
    }
}

/* ============ Chart helpers ============ */
function ensureChartFor(key, canvas, label, min, max) {
    if (charts.has(key)) return charts.get(key);
    if (typeof Chart === "undefined") {
        console.warn("[viz] Chart.js not found — metrics charts will not render.");
        return null;
    }
    const chart = new Chart(canvas, {
        type: "line",
        data: {
            labels: history.ticks,
            datasets: [
                {
                    label,
                    data: history[key],
                    borderWidth: 1,
                    fill: false,
                    pointRadius: 0
                }
            ]
        },
        options: {
            animation: false,
            responsive: false,
            maintainAspectRatio: false,
            plugins: {legend: {display: true}},
            scales: {
                x: {ticks: {autoSkip: true, maxTicksLimit: 8}},
                y: {
                    beginAtZero: min === 0,
                    min: typeof min === "number" ? min : undefined,
                    max: typeof max === "number" ? max : undefined
                }
            }
        }
    });
    charts.set(key, chart);
    return chart;
}

/* ============ Public API ============ */
export function updateChart(world) {
    // compute current metrics snapshot
    const m = computeMetrics(world);
    // push to history
    pushHistoryPoint(world.tick, m);

    // build/update individual charts
    for (const {key, label, min, max} of SERIES) {
        const canvas = ensureCanvas(`chart_${key}`, label);
        const c = ensureChartFor(key, canvas, label, min, max);
        if (!c) continue;
        c.data.labels = history.ticks;
        c.data.datasets[0].data = history[key];
        c.update();
    }
}

/* ============ Optional quick inspect on click ============ */
if (inBrowser()) document.addEventListener?.("click", (e) => {
    const node = e.target;
    if (!(node instanceof HTMLCanvasElement)) return;
    const id = node.id;
    if (!id?.startsWith("chart_")) return;
    const key = id.replace("chart_", "");
    const ch = charts.get(key);
    if (!ch) return;
    const idx = ch._active?.[0]?.index;
    if (idx == null) return;
    const t = history.ticks[idx];
    console.log(`[metrics:${key}] tick=${t}`, {
        value: history[key][idx],
        all: SERIES.reduce((o, s) => (o[s.key] = history[s.key][idx], o), {})
    });
});
