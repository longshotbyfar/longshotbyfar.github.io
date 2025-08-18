// main.js
import {initWorld} from "./world.js";
import {updateChart} from "../ui/viz.js";
import {setEngineRandomNumberGenFactory, stepWorld} from "./engine.js";
import {knobs} from "../config/config.js";
import {ensureKnobPanel} from "../ui/controls.js";
import {ensureDiagnosticsPanel, refreshDiagnosticsPanel} from "../ui/diagnostics.js";
import {initCanvasGrid, drawGrid} from "../ui/canvas-grid.js";
import {getSelected} from "../ui/selection.js";
import {inBrowser, printMetrics, worldHash} from '../util/util.js';
import {makeRandomNumberGenFactory} from "../util/rng.js";
import {computeMetrics} from "../util/metrics.js";
import {SEEDS} from "../config/seeds.js";
import {ARCHIPELAGO, BORDER_WARS, FRACTAL_FRONTIER, HIVEMIND, applyPreset} from "../config/presets.js";

export let paused = false;

export function setPaused(p) {
    paused = p;
}

function wireUI() {
    if (!inBrowser()) return;
    addEventListener("keypress", e => {
        if (e.key === " ") {
            e.preventDefault();
            setPaused(!paused);
        }
        if (e.key?.toUpperCase() === "Z") {
            const btn = document.getElementById("knobCollapseBtn");
            if (btn) {
                e.preventDefault();
                btn.click();
            }
        }
    });
}

function fastForward(world, ticks = 0, rngFactory) {
    printMetrics(world);
    for (let i = 0; i < ticks; i++) {
        stepWorld(world, rngFactory);                 // <-- pass RNG through
        if (world.tick % 100 === 0) console.log(`@${world.tick}`);
    }
    printMetrics(world);
}

function runSim(rngFactory, world, ticks = 2000) {
    fastForward(world, ticks, rngFactory);
    return computeMetrics(world);
}

function runBrowser(rngFactory, world, ffTicks) {
    fastForward(world, ffTicks, rngFactory);

    wireUI();
    ensureKnobPanel();
    ensureDiagnosticsPanel(world);
    initCanvasGrid(world, {cellSize: 18});
    drawGrid(world);
    loop(world, rngFactory);
}

function loop(world, rngFactory) {
    if (!paused) {
        stepWorld(world);                 // <-- pass RNG through
        drawGrid(world);
        refreshDiagnosticsPanel(world, getSelected());
        if (world.tick % 5 === 0) updateChart(world);
    }
    setTimeout(() => loop(world, rngFactory), knobs.world.tickMs);
}

function checkSanity() {
    Object.freeze(SEEDS.subjects);
    Object.freeze(SEEDS.verbs);
    Object.freeze(SEEDS.objects);

    if (!SEEDS.subjects.length || !SEEDS.verbs.length || !SEEDS.objects.length)
        throw new Error("SEEDS arrays empty");

    const probeFactory = makeRandomNumberGenFactory();
    const probeRng = probeFactory("probe");
    console.assert(typeof probeRng === "function" && probeRng() >= 0 && probeRng() < 1);
}

function debugAddWindow(rngFactory, world) {
    window.metrics = computeMetrics;
    window.world = world;
    window.ff = ticks => {
        const prevPaused = paused;
        setPaused(true);
        fastForward(window.world, ticks, rngFactory);
        drawGrid(window.world);
        refreshDiagnosticsPanel(window.world, getSelected());
        setPaused(prevPaused);
    };
}

function prestart(seed, ffTicks) {
    checkSanity();

    const rngFactory = makeRandomNumberGenFactory(seed);
    setEngineRandomNumberGenFactory(rngFactory);
    const world = initWorld(knobs.world.width, knobs.world.height, knobs.world.numAgents, rngFactory);

    applyPreset(BORDER_WARS);

    if (inBrowser()) {
        debugAddWindow(rngFactory, world);

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => runBrowser(rngFactory, world, ffTicks));
        } else {
            runBrowser(rngFactory, world, ffTicks);
        }
    } else {
        runSim(rngFactory, world, ffTicks);
    }
}

const MASTER_SEED = "run-2025-08-10";
const FF_TICKS = 1000;
prestart(MASTER_SEED, FF_TICKS);
