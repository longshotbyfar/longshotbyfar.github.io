// controls.js
import { knobs, setKnob } from "../config/config.js";

const LS_COLLAPSE = "beliefsim.knobPanelCollapsed";
const LS_FILTER   = "beliefsim.knobFilter";

// [path, min, max, step]
const schema = [
    // --- World geometry & pacing ---
    ["world.interactRadius", 0, 5, 1],
    ["world.tickMs", 10, 1000, 10],
    ["world.fastForwardTicks", 0, 5000, 10],

    // --- Local movement field ---
    ["world.seekKinProb", 0, 1, 0.01],
    ["world.seekKinRadius", 0, 8, 1],
    ["world.outgroupRepulsion", 0, 1, 0.01],
    ["world.wanderProb", 0, 1, 0.01],

    // --- Agent belief memory & dynamics ---
    ["agent.capacityK", 1, 128, 1],
    ["agent.floorEps", 0, 0.1, 0.001],
    ["agent.hysteresisGap", 0, 1, 0.01],
    ["agent.temperature", 0.25, 2, 0.02],
    ["agent.decayRate", 0, 0.2, 0.001],
    ["agent.dropProb", 0, 0.05, 0.0005],
    ["agent.dropFrac", 0, 1, 0.01],

    // budget/clamp
    ["agent.budget", 0.1, 10, 0.1],
    ["agent.strengthMax", 0.1, 10, 0.1],

    // novelty
    ["agent.visionProb", 0, 0.02, 0.0001],
    ["agent.visionStrength", 0, 3, 0.1],

    // mass flow
    ["agent.payFraction", 0, 1, 0.05],
    ["agent.secondaryFloor", 0, 0.2, 0.005],

    // --- Interaction ---
    ["interaction.learnRate", 0, 1, 0.01],
    ["interaction.kinBias", 0, 2, 0.01],
    ["interaction.needBias", 0, 2, 0.01],
    ["interaction.noise", 0, 0.2, 0.005],
    ["interaction.mergeKinThreshold", 0, 3, 1],
    ["interaction.mergeProbWhenKin", 0, 1, 0.01],

    // --- Shapes ---
    ["shapes.needSlope", 0.1, 5, 0.05],
    ["shapes.kinSatK", 0.05, 3, 0.05],
    ["shapes.kinAmpl", 0, 3, 0.05],
    ["shapes.kinBias", -1, 1, 0.02],
    ["shapes.learnTemp", 0.5, 3, 0.05],
    ["shapes.ouSigma", 0, 1, 0.01],
    ["shapes.seekWidth", 0.1, 1, 0.02],

    // --- Viz ---
    ["viz.chartHistory", 10, 2000, 10],
];

let filterQuery = "";


export function ensureKnobPanel() {
    if (document.getElementById("knobPanel")) return;

    // restore state
    try {
        const raw = localStorage.getItem(LS_COLLAPSE);
        if (raw !== null) setKnob("ui.knobPanelCollapsed", !!JSON.parse(raw));
    } catch {}
    try {
        filterQuery = localStorage.getItem(LS_FILTER) || "";
    } catch {}

    const panel = document.createElement("div");
    panel.id = "knobPanel";
    Object.assign(panel.style, {
        position: "fixed", left: "12px", top: "12px", width: "320px",
        maxHeight: "80vh", overflow: "auto", padding: "10px",
        borderRadius: "8px", background: "rgba(24,24,28,0.92)", color: "#eaeaea",
        font: "12px/1.4 system-ui, sans-serif", zIndex: 10000
    });

    // header
    const header = document.createElement("div");
    Object.assign(header.style, {
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "6px"
    });
    const title = document.createElement("div");
    title.style.fontWeight = "600";
    title.textContent = "[SPACE TO PAUSE/RESUME] Knobs";
    const btn = document.createElement("button");
    btn.id = "knobCollapseBtn";
    btn.style.cssText = "font:12px system-ui;padding:2px 6px;";
    btn.textContent = knobs.ui.knobPanelCollapsed ? "Expand" : "Collapse";
    btn.addEventListener("click", () => {
        const next = !knobs.ui.knobPanelCollapsed;
        setKnob("ui.knobPanelCollapsed", next);
        btn.textContent = next ? "Expand" : "Collapse";
        try { localStorage.setItem(LS_COLLAPSE, JSON.stringify(next)); } catch {}
        renderRows();
    });
    header.appendChild(title);
    header.appendChild(btn);
    panel.appendChild(header);

    // search (hidden when collapsed)
    const searchWrap = document.createElement("div");
    Object.assign(searchWrap.style, { display: "flex", gap: "6px", marginBottom: "8px" });

    const search = document.createElement("input");
    Object.assign(search.style, {
        flex: "1 1 auto", padding: "4px 6px", borderRadius: "4px",
        border: "1px solid #555", background: "#111", color: "#ddd"
    });
    search.type = "text";
    search.placeholder = "filter (e.g. temp, seek, noise)";
    search.value = filterQuery;

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "×";
    Object.assign(clearBtn.style, { font: "12px system-ui", padding: "2px 8px" });
    clearBtn.title = "Clear";

    const hint = document.createElement("div");
    hint.textContent = "Press / to focus";
    Object.assign(hint.style, { opacity: 0.6, fontSize: "11px", margin: "2px 0 6px" });

    searchWrap.appendChild(search);
    searchWrap.appendChild(clearBtn);
    panel.appendChild(searchWrap);
    panel.appendChild(hint);

    const body = document.createElement("div");
    body.id = "knobPanelBody";
    panel.appendChild(body);
    document.body.appendChild(panel);

    // shortcut: "/" focuses filter; if panel collapsed, it expands first.
    addEventListener("keydown", (e) => {
        if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (knobs.ui.knobPanelCollapsed) {
                setKnob("ui.knobPanelCollapsed", false);
                btn.textContent = "Collapse";
                try { localStorage.setItem(LS_COLLAPSE, "false"); } catch {}
                renderRows();
            }
            e.preventDefault();
            search.focus();
            search.select();
        }
    });

    // filter behavior (debounced)
    let t = null;
    const applyFilter = (q) => {
        filterQuery = (q || "").trim().toLowerCase();
        try { localStorage.setItem(LS_FILTER, filterQuery); } catch {}
        renderRows();
    };
    search.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => applyFilter(search.value), 80);
    });
    clearBtn.addEventListener("click", () => {
        search.value = "";
        applyFilter("");
        search.focus();
    });

    function renderRows() {
        // hide or show search UI depending on collapse state
        const vis = knobs.ui.knobPanelCollapsed ? "none" : "flex";
        searchWrap.style.display = vis;
        hint.style.display = knobs.ui.knobPanelCollapsed ? "none" : "block";

        body.innerHTML = "";
        if (knobs.ui.knobPanelCollapsed) return;

        const q = filterQuery;
        const rows = q
            ? schema.filter(([path]) => path.toLowerCase().includes(q))
            : schema;

        if (!rows.length) {
            const none = document.createElement("div");
            none.textContent = "No knobs match.";
            none.style.opacity = "0.7";
            none.style.padding = "6px 2px";
            body.appendChild(none);
            return;
        }

        for (const [path, min, max, step] of rows) {
            body.appendChild(createKnobControl(path, min, max, step, q));
        }
    }

    renderRows();
}

function createKnobControl(path, min, max, step, highlight = "") {
    const wrapper = document.createElement("div");
    wrapper.className = "knob-control";
    wrapper.style.marginBottom = "8px";

    const top = document.createElement("div");
    Object.assign(top.style, {
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "2px", gap: "8px"
    });

    const label = document.createElement("label");
    label.innerHTML = highlight ? highlightMatch(path, highlight) : path;
    label.style.opacity = "0.9";

    // --- number input: APPLY ONLY ON ENTER ---
    const number = document.createElement("input");
    number.type = "number";
    number.min = String(min);
    number.max = String(max);
    number.step = String(step);
    number.value = String(get(knobs, path));
    number.title = "Type then press Enter to apply (Esc to revert)";
    Object.assign(number.style, {
        width: "76px", padding: "2px 4px",
        background: "#161616", color: "#ddd", border: "1px solid #444"
    });

    // Track dirty state (value edited but not applied)
    const cleanValue = () => String(get(knobs, path));
    const markDirty = (isDirty) => {
        number.style.borderColor = isDirty ? "#888" : "#444";
        number.style.background = isDirty ? "#1d1d1d" : "#161616";
    };
    number.addEventListener("input", () => {
        markDirty(number.value !== cleanValue());
        // do NOT apply yet
    });
    number.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const val = cast(number.value, min, max, step);
            number.value = String(val);
            // apply & sync slider
            sync(val, true);
            markDirty(false);
        } else if (e.key === "Escape") {
            number.value = cleanValue();
            markDirty(false);
        }
    });

    top.appendChild(label);
    top.appendChild(number);

    // slider (live apply)
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(min);
    slider.max = String(max);
    slider.step = String(step);
    slider.value = number.value;
    slider.style.width = "100%";

    // sync helper
    const sync = (v, fromNumber = false) => {
        const val = cast(v, min, max, step);
        if (!fromNumber) number.value = String(val); // when slider moves, overwrite number
        slider.value = String(val);
        setKnob(path, val);
    };

    slider.addEventListener("input", e => {
        sync(e.target.value);
        // if number was dirty, overwrite it (we chose “slider is source of truth”)
        markDirty(false);
    });

    wrapper.appendChild(top);
    wrapper.appendChild(slider);
    return wrapper;
}

function highlightMatch(text, q) {
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text;
    const before = text.slice(0, i);
    const mid = text.slice(i, i + q.length);
    const after = text.slice(i + q.length);
    return `${escapeHtml(before)}<mark style="background:#3a3a3a;color:#fff;border-radius:3px;padding:0 2px">${escapeHtml(mid)}</mark>${escapeHtml(after)}`;
}
function escapeHtml(s) {
    return s.replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));
}

function get(obj, path) {
    return path.split(".").reduce((o, k) => o[k], obj);
}

function cast(v, min, max, step) {
    let n = Number(v);
    if (Number.isNaN(n)) n = min;
    n = Math.min(max, Math.max(min, n));
    if (!String(step).includes(".")) return Math.round(n);
    const places = Math.max(0, (String(step).split(".")[1] || "").length);
    const snapped = Math.round(n / step) * step;
    return Number(snapped.toFixed(places));
}
