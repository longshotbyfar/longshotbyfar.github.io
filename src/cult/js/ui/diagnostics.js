// ui/diagnostics.js
import { beliefs } from "../core/beliefs.js";
import { getSelected, setSelected, onSelectedChange } from "./selection.js";

let body;
let msg;

export function ensureDiagnosticsPanel(world) {
    if (document.getElementById("diagPanel")) return;

    const panel = document.createElement("div");
    panel.id = "diagPanel";
    panel.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
      <label for="diagId" style="font:12px system-ui">[SPACE TO PAUSE/RESUME] Agent ID</label>
      <input id="diagId" type="number" min="0" step="1" style="width:80px;padding:2px 4px;" />
      <button id="diagBtn" style="padding:2px 8px;">Inspect</button>
      <span id="diagMsg" style="font:12px system-ui;color:#888;margin-left:6px;"></span>
    </div>
    <div id="diagBody" style="font:12px/1.4 system-ui, sans-serif;"></div>
  `;
    Object.assign(panel.style, {
        position: "fixed", right: "12px", top: "12px", width: "320px",
        maxHeight: "80vh", overflow: "auto", padding: "10px",
        borderRadius: "8px", background: "rgba(20,20,24,0.92)", color: "#eaeaea",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)", zIndex: 10000
    });
    document.body.appendChild(panel);

    const input = panel.querySelector("#diagId");
    const btn   = panel.querySelector("#diagBtn");
    msg   = panel.querySelector("#diagMsg");
    body  = panel.querySelector("#diagBody");

    onSelectedChange(id => {
        input.value = id ?? "";
        refreshDiagnosticsPanel(world, id)
    });
    btn.addEventListener("click", () => setSelected(Number(input.value)));
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") setSelected(Number(input.value));
    });
}

export function refreshDiagnosticsPanel(world, id) {
    if (id === null || id === "") { msg.textContent = ""; body.innerHTML = ""; return; }
    const agent = world.agents.find(a => a.id === id);
    if (!agent) { msg.textContent = "No such agent."; body.innerHTML = ""; return; }
    msg.textContent = "";
    body.innerHTML = renderAgentData(world, agent);
}

// Pure renderer
export function renderAgentData(world, agent) {
    if (!agent) return;

    const sum = [...agent.beliefs.values()].reduce((a,b)=>a+b,0);
    const H = (()=>{ let h=0; agent.beliefs.forEach(v=>{ const p=v/sum; if(p>0) h+=-p*Math.log2(p); }); return h; })();
    const top = [...agent.beliefs.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5);
    const dom = beliefs.toString(agent.dominantBeliefId) || "—";
    const traits = agent.traits;

    return `
    <div style="font-weight:600;margin-bottom:6px;">Agent ${agent.id} — ${agent.name}</div>
    <div>📍 Pos: (${agent.x}, ${agent.y})</div>
    <div>🧬 Traits:<br>
      Susceptibility: ${num(traits.susceptibility)}<br>
      Assertiveness: ${num(traits.assertiveness)}<br>
      Forgetfulness: ${num(traits.forgetfulness)}<br>
      Openness: ${num(traits.openness)}<br>
      Steadfastness: ${num(traits.steadfastness)}<br>
      Visionary: ${num(traits.visionary)}<br>
    </div>
    <div>🧠 Memory: ${agent.beliefs.size} beliefs</div>
    <div>Σ mass: ${num(sum)} &nbsp; H: ${num(H)}</div>
    <div>🏴 Dominant: <span style="opacity:.9">${dom}</span></div>
    <hr style="border:none;border-top:1px solid rgba(255,255,255,.12);margin:6px 0;">
    <div style="margin-bottom:4px;"><b>Top beliefs</b></div>
    ${top.map(([id,v])=>`<div>• ${beliefs.toString(id)} <span style="opacity:.8">(${num(v)})</span></div>`).join("") || "<i>none</i>"}
    <hr style="border:none;border-top:1px solid rgba(255,255,255,.12);margin:6px 0;">
    <div style="margin-bottom:4px;"><b>Neighbors (radius 1) · kinship</b></div>
    ${neighbors(world, agent,1).map(n => `• #${n.id} — kin ${relation(agent.dominantBeliefId, n.dominantBeliefId)}`).join("<br>") || "<i>none</i>"}
  `;
}
function num(x){ return Number.isFinite(x) ? x.toFixed(2) : "—"; }
function neighbors(world, agent, r){ const acc=[]; for(let dx=-r;dx<=r;dx++)for(let dy=-r;dy<=r;dy++){ if(dx||dy){ if(Math.abs(dx)+Math.abs(dy)<=r){ const x=agent.x+dx,y=agent.y+dy; if(x>=0&&y>=0&&x<world.width&&y<world.height){ const o=world.grid[y][x]; if(o) acc.push(o); }}}} return acc; }
function relation(aId,bId){ const A=beliefs.getSvo(aId),B=beliefs.getSvo(bId); if(!A||!B) return 0; let s=0; if(A.s?.term===B.s?.term)s++; if(A.v?.term===B.v?.term)s++; if(A.o?.term===B.o?.term)s++; return s; }
