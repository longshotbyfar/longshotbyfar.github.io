// engine.js
import {DETERMINISTIC, knobs} from "../config/config.js";
import {R, randomDir} from "../util/rng.js";
import {Agent} from "./agent.js";
import {beliefs} from "./beliefs.js";
import {clamp, logistic, ouStep, satGain, softmaxT, temperPow, triangle} from "../util/shapes.js";

function defaultRandomNumberGenFactory() {
    return Math.random;
}

let engineRandomNumberGenFactory = defaultRandomNumberGenFactory;

export function setEngineRandomNumberGenFactory(factory) {
    engineRandomNumberGenFactory = (typeof factory === "function") ? factory : defaultRandomNumberGenFactory;
}

export function getEngineRandomNumberGenFactory() {
    return engineRandomNumberGenFactory;
}

const stageRng = (world, agentId, stage) =>
    engineRandomNumberGenFactory(`agent=${agentId}|tick=${world.tick}|stage=${stage}`);

class EventQueue {
    constructor() {
        this.q = [];
    }

    push(e) {
        this.q.push(e);
    }

    drain(filterFn) {
        if (!filterFn) {
            const out = this.q;
            this.q = [];
            return out;
        }
        const keep = [];
        const out = [];
        for (const e of this.q) (filterFn(e) ? out : keep).push(e);
        this.q = keep;
        return out;
    }
}

const wanderProb = () => knobs.world.wanderProb;
const interactRadius = () => knobs.world.interactRadius;

function neighborsOf(world, agent, radius = interactRadius()) {
    const acc = [];
    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue;
            if (Math.abs(dx) + Math.abs(dy) > radius) continue; // Manhattan
            const x = agent.x + dx, y = agent.y + dy;
            if (x < 0 || y < 0 || x >= world.width || y >= world.height) continue;
            const other = world.grid[y][x];
            if (other && other.id !== agent.id) acc.push(other);
        }
    }
    return acc;
}

function localKinFraction(world, a, R = 2) {
    const neigh = neighborsOf(world, a, R);
    if (!neigh.length || !a.dominantBeliefId) return 0;
    let same = 0;
    for (const n of neigh) if (n.dominantBeliefId === a.dominantBeliefId) same++;
    return same / neigh.length;
}

function cohesionStep(world, agent) {
    const neigh = neighborsOf(world, agent, knobs.world.seekKinRadius ?? 0);
    if (!neigh.length || !agent.dominantBeliefId) return null;

    let vx = 0, vy = 0;
    for (const other of neigh) {
        const kin = Agent.relationScore(agent.dominantBeliefId, other.dominantBeliefId);
        const attract = kin / 3;
        const repel = ((3 - kin) / 3) * (knobs.world.outgroupRepulsion ?? 0);
        const w = attract - repel;

        const dx = other.x - agent.x;
        const dy = other.y - agent.y;
        const dist = Math.abs(dx) + Math.abs(dy);
        const scale = w / Math.max(1, dist);

        vx += Math.sign(dx) * scale;
        vy += Math.sign(dy) * scale;
    }

    const ax = Math.abs(vx), ay = Math.abs(vy);
    if (ax < 1e-6 && ay < 1e-6) return null;
    const step = ax >= ay ? [Math.sign(vx), 0] : [0, Math.sign(vy)];
    const nx = clamp(agent.x + step[0], 0, world.width - 1);
    const ny = clamp(agent.y + step[1], 0, world.height - 1);
    return [nx, ny];
}

/** ---------------- Systems: emit intents, no mutation ---------------- */

// 0) Decay -> emits ApplyBelief for each agent (we keep decay as belief deltas)
function DecaySystem(world, rngFactory, Q) {
    for (const a of world.agents) {
        const r = stageRng(world, a.id, "Decay");
        // mean-reverting modulation of decay
        a.__ou = ouStep(a.__ou || 0, {theta: 0.15, sigma: knobs.shapes.ouSigma, rand: r});
        const factor = 1 + 0.75 * a.traits.forgetfulness;
        const drift = 1 + 0.10 * a.__ou; // +/-10%
        const rate = Math.min(0.99, knobs.agent.decayRate * factor * drift);

        const changes = [];
        a.beliefs.forEach((v, k) => {
            let nv = v * (1 - rate);
            if (r() < (knobs.agent.dropProb ?? 0.01)) nv *= (1 - (knobs.agent.dropFrac ?? 0.25));
            const delta = nv - v;
            if (delta !== 0) changes.push({beliefId: k, delta});
        });

        if (changes.length) {
            Q.push({kind: "BeliefApply", tick: world.tick, agentId: a.id, changes, noiseStage: "DecayNoise"});
        }
    }
}

function MoveIntentSystem(world, rngFactory, Q) {
    for (const a of world.agents) {
        let target = null;

        const kinFrac = localKinFraction(world, a, knobs.world.seekKinRadius ?? 2); // 0..1
        // Seek more in mixed zones, less in uniform zones.
        const shapedSeek = triangle(kinFrac, 0.5, knobs.shapes.seekWidth) * (knobs.world.seekKinProb ?? 0);
        const seekRng = stageRng(world, a.id, "SeekKin?");
        if (R.pass(seekRng, shapedSeek)) {
            target = cohesionStep(world, a);
        }

        if (!target) {
            const wanderRng = stageRng(world, a.id, "Wander?");
            if (R.pass(wanderRng, knobs.world.wanderProb ?? 0.7)) {
                const dirRng = stageRng(world, a.id, "WanderDir");
                const [dx, dy] = randomDir(dirRng); // unbiased; biasing is optional candy
                const nx = clamp(a.x + dx, 0, world.width - 1);
                const ny = clamp(a.y + dy, 0, world.height - 1);
                target = [nx, ny];
            }
        }

        if (!target) continue;
        const [nx, ny] = target;
        const priRng = stageRng(world, a.id, "MovePri");
        Q.push({
            kind: "MoveIntent",
            tick: world.tick,
            agentId: a.id,
            from: {x: a.x, y: a.y},
            to: {x: nx, y: ny},
            pri: priRng()
        });
    }
}

function InteractIntentSystem(world, rngFactory, Q) {
    for (const a of world.agents) {
        const neigh = neighborsOf(world, a);
        if (!neigh.length || !a.dominantBeliefId) continue;

        const pickRng = stageRng(world, a.id, "InteractPick");
        const idx = R.pickIndex(pickRng, neigh.length);
        const b = neigh[idx];
        if (!b?.dominantBeliefId) continue;

        // base signals
        const aId = a.dominantBeliefId;
        const bId = b.dominantBeliefId;
        const kin = Agent.relationScore(aId, b.dominantBeliefId);
        const need = (b.beliefs.get(bId) || 0) - (a.beliefs.get(bId) || 0);

        // 1) how “open” is agent a to update right now?
        const p = logistic(knobs.interaction.needBias * need + knobs.interaction.kinBias * kin,
            0, knobs.shapes.needSlope);

        // 2) convert kin (0..3) to a smooth signed scale [-, +]
        const kinScale = satGain(kin, 1, knobs.shapes.kinSatK);   // 0..~1
        const signed = (2 * kinScale - 1) * knobs.shapes.kinAmpl + knobs.shapes.kinBias;
        // signed < 0 → repel; > 0 → attract

        // 3) raw delta, tempered to avoid spiky swings
        const raw = knobs.interaction.learnRate * (1 + 0.8 * a.traits.openness) * p * signed;
        const delta = temperPow(raw, knobs.shapes.learnTemp);

        // emit belief updates
        // split delta across neighbor's top-2 beliefs (softmax by their weights)
        const k = 2; // how many beliefs to absorb
        const entries = [...b.beliefs.entries()].sort((x, y) => y[1] - x[1]).slice(0, k);
        const vals = entries.map(([, v]) => v);
        const probs = softmaxT(vals, 1.0); // from util/shapes.js
        const changes = entries.map(([id], i) => ({beliefId: id, delta: delta * probs[i]}));
        if (kin === 0) {
            changes.push({beliefId: aId, delta: Math.abs(delta) * 0.25});
        }
        Q.push({kind: "BeliefApply", tick: world.tick, agentId: b.id, changes, noiseStage: "InteractNoise"});

        // merge chance shaped by high kin only
        const mergeThresh = (knobs.interaction.mergeKinThreshold ?? 3);
        if (kin >= mergeThresh) {
            const prob = (knobs.interaction.mergeProbWhenKin ?? 0.04) * (0.75 + 0.25 * a.traits.openness);
            if (R.pass(pickRng, prob)) {
                const mId = beliefs.mergeIds(aId, bId, pickRng);
                if (mId) {
                    Q.push({
                        kind: "BeliefApply",
                        tick: world.tick,
                        agentId: a.id,
                        changes: [{beliefId: mId, delta: 0.06}],
                        noiseStage: "InteractNoise"
                    });
                }
            }
        }
    }
}

function VisionIntentSystem(world, rngFactory, Q) {
    for (const a of world.agents) {
        const r = stageRng(world, a.id, "Vision");
        const base = knobs.agent.visionProb;
        const chance = base * (1 + 1.5 * a.traits.visionary);
        if (r() < chance) {
            const id = beliefs.randomId(r);
            Q.push({
                kind: "BeliefApply", tick: world.tick, agentId: a.id,
                changes: [{beliefId: id, delta: knobs.agent.visionStrength}],
                noiseStage: "VisionNoise"
            });
        }
    }
}

// Move: one winner per target cell; tie by pri then agentId
function ResolveMoves(world, Q) {
    const intents = Q.drain(e => e.kind === "MoveIntent");
    const byCell = new Map();

    for (const m of intents) {
        const key = `${m.to.x},${m.to.y}`;
        let arr = byCell.get(key);
        if (!arr) {
            arr = [];
            byCell.set(key, arr);
        }
        arr.push(m);
    }

    for (const [key, arr] of byCell) {
        const [x, y] = key.split(",").map(Number);
        if (world.grid[y][x]) continue;               // occupied stays blocked
        arr.sort((a, b) => (b.pri - a.pri) || (a.agentId - b.agentId));
        const w = arr[0];
        const agent = world.agents[w.agentId];
        if (!agent) continue;

        // commit move
        world.grid[agent.y][agent.x] = null;
        agent.x = x;
        agent.y = y;
        world.grid[y][x] = agent;
    }
}

function ApplyBeliefs(world, rngFactory, Q) {
    const events = Q.drain(e => e.kind === "BeliefApply");
    const byAgent = new Map();

    for (const e of events) {
        let list = byAgent.get(e.agentId);
        if (!list) {
            list = [];
            byAgent.set(e.agentId, list);
        }
        for (const ch of e.changes) list.push(ch);
    }

    for (const [agentId, changes] of byAgent) {
        const a = world.agents[agentId];
        if (!a) continue;
        const noiseRng = rngFactory(`agent=${agentId}|tick=${world.tick}|stage=BeliefNoise`);
        a.applyBeliefChanges(changes, noiseRng);
    }
}

export function stepWorld(world) {
    if (DETERMINISTIC && engineRandomNumberGenFactory === defaultRandomNumberGenFactory) {
        throw new Error("Deterministic mode: engine RNG factory not set");
    }

    const Q = new EventQueue();

    // Order mirrors your old loop: decay -> vision -> move -> interact
    DecaySystem(world, engineRandomNumberGenFactory, Q);
    VisionIntentSystem(world, engineRandomNumberGenFactory, Q);
    MoveIntentSystem(world, engineRandomNumberGenFactory, Q);
    InteractIntentSystem(world, engineRandomNumberGenFactory, Q);

    ResolveMoves(world, Q);
    ApplyBeliefs(world, engineRandomNumberGenFactory, Q);

    world.tick++;
}
