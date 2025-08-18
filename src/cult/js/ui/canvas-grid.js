// ui/canvas-grid.js
import { beliefs } from "../core/beliefs.js";
import { getSelected, onSelectedChange, setSelected } from "./selection.js";

let canvas, ctx, cell, DPR = 1;

export function initCanvasGrid(world, { id = "gridCanvas", cellSize = 18 } = {}) {
    canvas = document.getElementById(id);
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = id;
        document.body.appendChild(canvas);
    }
    ctx = canvas.getContext("2d");
    cell = cellSize;

    // initial size from the actual grid (not knobs)
    resizeCanvas(world);

    addListeners(world);

    // redraw on selection change
    onSelectedChange(() => drawGrid(world));

    // diagnostics events should pass an Event; ignore payload and redraw safely
    document.addEventListener("diag-change", () => drawGrid(world));

    drawGrid(world);
}

export function resizeCanvas(world) {
    const { W, H } = gridDims(world);
    if (!W || !H) return; // nothing to size to yet

    DPR = Math.max(1, window.devicePixelRatio || 1);
    const pxW = W * cell;
    const pxH = H * cell;

    // Only touch DOM if dims changed (reduces flicker/jank)
    const cssW = canvas.style.width ? parseInt(canvas.style.width, 10) : -1;
    const cssH = canvas.style.height ? parseInt(canvas.style.height, 10) : -1;
    if (cssW !== pxW) canvas.style.width = pxW + "px";
    if (cssH !== pxH) canvas.style.height = pxH + "px";

    const wantW = Math.floor(pxW * DPR);
    const wantH = Math.floor(pxH * DPR);
    if (canvas.width !== wantW || canvas.height !== wantH) {
        canvas.width = wantW;
        canvas.height = wantH;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    // Do not draw here; caller might be mid-update. Let them call drawGrid()
}

/* ===== styling ===== */
const CELL_GAP = 1;
const CELL_RADIUS = 3;
const GRID_BG_FILL = "rgba(255,255,255,0.04)";
const TILE_STROKE = "rgba(0,0,0,0.15)";
const EMPTY_TILE_FILL = "rgba(255,255,255,0.06)";
const ID_TEXT_FILL = "rgba(0,0,0,0.80)";
const ID_FONT_FAMILY = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

export function drawGrid(world) {
    const { W, H, ok } = gridDims(world);
    if (!ok) return;

    // If canvas size is stale (knobs changed / world reset), resync once
    const needW = W * cell, needH = H * cell;
    const cssW = parseInt(canvas?.style?.width || "0", 10);
    const cssH = parseInt(canvas?.style?.height || "0", 10);
    if (!canvas || cssW !== needW || cssH !== needH) resizeCanvas(world);

    ctx.clearRect(0, 0, W * cell, H * cell);

    ctx.fillStyle = GRID_BG_FILL;
    for (let y = 0; y < H; y++) {
        // guard missing row
        if (!world.grid[y]) continue;
        for (let x = 0; x < W; x++) {
            ctx.fillRect(x * cell, y * cell, cell - CELL_GAP, cell - CELL_GAP);
        }
    }

    ctx.fillStyle = EMPTY_TILE_FILL;
    for (let y = 0; y < H; y++) {
        const row = world.grid[y]; if (!row) continue;
        for (let x = 0; x < W; x++) {
            if (!row[x]) {
                roundedRect(x*cell, y*cell, cell-CELL_GAP, cell-CELL_GAP, CELL_RADIUS, true, false);
            }
        }
    }

    const selectedId = getSelected();

    for (const a of world.agents || []) {
        // safety: skip out-of-bounds coords during resets
        if (a.x < 0 || a.y < 0 || a.x >= W || a.y >= H) continue;

        const x = a.x * cell, y = a.y * cell;
        const wCell = cell - CELL_GAP, hCell = cell - CELL_GAP;

        // tile fill
        const fill = colorForDominant(a.dominantBeliefId);
        ctx.fillStyle = fill;
        roundedRect(x, y, wCell, hCell, CELL_RADIUS, true, false);

        // border
        ctx.strokeStyle = TILE_STROKE;
        ctx.lineWidth = 1;
        roundedRect(x + 0.5, y + 0.5, wCell - 1, hCell - 1, Math.max(0, CELL_RADIUS - 1), false, true);

        // centered ID
        drawCenteredLabel(String(a.id), x, y, wCell, hCell);

        // highlight
        if (a.id === selectedId) drawHighlightAround(x, y, wCell, hCell, fill);
    }
}

function gridDims(world) {
    const H = world?.grid?.length | 0;
    const W = (H > 0 && Array.isArray(world.grid[0])) ? world.grid[0].length | 0 : 0;
    return { W, H, ok: W > 0 && H > 0 };
}

function roundedRect(x, y, w, h, r, fill, stroke) {
    const rr = Math.min(r, w * 0.5, h * 0.5);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

function fitFontSize(text, maxW, maxH) {
    let size = Math.floor(Math.min(maxH * 0.7, maxW * 0.6));
    if (size < 8) return 8;
    ctx.font = `${size}px ${ID_FONT_FAMILY}`;
    let width = ctx.measureText(text).width;

    const minSize = 8;
    while ((width > maxW * 0.9 || size > maxH * 0.8) && size > minSize) {
        size -= 1;
        ctx.font = `${size}px ${ID_FONT_FAMILY}`;
        width = ctx.measureText(text).width;
    }
    return size;
}

function drawCenteredLabel(text, x, y, w, h) {
    const size = fitFontSize(text, w, h);
    ctx.font = `${size}px ${ID_FONT_FAMILY}`;
    ctx.fillStyle = ID_TEXT_FILL;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + w / 2, y + h / 2);
}

function addListeners(world) {
    // use closure so we always pass THIS world to handlers
    canvas.addEventListener("pointerdown", e => {
        const { x, y } = canvasToCell(world, e.offsetX, e.offsetY);
        const row = world.grid[y];
        const a = row ? row[x] : null;
        if (a) setSelected(a.id);
    });

    // window.resize needs to call with world
    window.addEventListener("resize", () => {
        resizeCanvas(world);
        drawGrid(world);
    });
}

function canvasToCell(world, offx, offy) {
    const { W, H } = gridDims(world);
    // If grid is unavailable, clamp to 0,0 to avoid NaNs
    if (!W || !H) return { x: 0, y: 0 };
    return {
        x: clampInt(offx / cell, 0, W - 1),
        y: clampInt(offy / cell, 0, H - 1),
    };
}

function clampInt(n, lo, hi) {
    n = Math.floor(n);
    return n < lo ? lo : n > hi ? hi : n;
}

const WHITE = "#ffffff";
const cultColorCache = new Map();

function colorForDominant(beliefId) {
    if (!beliefId) return "rgba(255,255,255,0.15)";

    const count = beliefs.counts.get(beliefId) || 0;
    if (count === 1) return WHITE;

    let c = cultColorCache.get(beliefId);
    if (!c) {
        const key = beliefs.toString(beliefId) || String(beliefId);
        const hue = [...key].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 360;
        const sat = 90, light = 65;
        c = `hsl(${hue}, ${sat}%, ${light}%)`;
        cultColorCache.set(beliefId, c);
    }
    return c;
}

function drawHighlightAround(x, y, w, h, tileFill) {
    ctx.save();
    const haloExpand = 4;
    const haloX = x - haloExpand;
    const haloY = y - haloExpand;
    const haloW = w + haloExpand * 2;
    const haloH = h + haloExpand * 2;

    ctx.strokeStyle = tileFill;
    ctx.lineWidth = 2;
    ctx.shadowColor = tileFill;
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    roundedRect(haloX, haloY, haloW, haloH, CELL_RADIUS + 2, false, true);
    ctx.restore();
}
