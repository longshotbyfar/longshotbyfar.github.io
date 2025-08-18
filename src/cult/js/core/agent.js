// agent.js
import {beliefs} from "./beliefs.js";
import {DETERMINISTIC, knobs} from "../config/config.js";
import {pickRandom, R} from "../util/rng.js";

export class Agent {
    constructor(id, x, y, rngGenFactory, seedBeliefId = null) {
        if (!rngGenFactory) throw new Error("Agent ctor requires rngGenFactory");

        this.id = id;
        this.x = x;
        this.y = y;

        const nameRng = rngGenFactory(`agent=${id}|stage=Name`);
        this.name = this.generateGoofyName(nameRng);

        const t = name => {
            const r = rngGenFactory(`agent=${id}|stage=Trait|name=${name}`);
            return R.u32(r) / 0x1_0000_0000;
        };

        this.traits = {
            susceptibility: t("susceptibility"),
            assertiveness:  t("assertiveness"),
            steadfastness:  t("steadfastness"),
            forgetfulness:  t("forgetfulness"),
            openness:       t("openness"),
            visionary:      t("visionary"),
        };

        const traitRng = rngGenFactory(`agent=${id}|stage=Traits`);
        const initBeliefRng = rngGenFactory(`agent=${id}|stage=InitBelief`);

        this.traits = {
            susceptibility: traitRng(),
            assertiveness: traitRng(),
            steadfastness: traitRng(),   // ↑ => harder to flip
            forgetfulness: traitRng(),   // ↑ => decays faster
            openness: traitRng(),   // ↑ => learns faster / merges more
            visionary: traitRng(),   // ↑ => more likely for visions
        };

        this.beliefs = new Map();       // beliefId -> strength
        this.dominantBeliefId = null;

        const b0 = seedBeliefId ?? beliefs.randomId(initBeliefRng);
        this.setBelief(b0, 1);          // setBelief internally reconciles + updates dominant
    }

    // --- State mutation primitives (no RNG inside unless injected) ---

    setBelief(id, strength) {
        if (!id || !Number.isFinite(strength)) return;
        const max = knobs.agent.strengthMax;
        if (strength <= 0) this.beliefs.delete(id);
        else this.beliefs.set(id, Math.min(strength, max));
        this.reconcileAndUpdateDominant();
    }

    /**
     * Add delta to belief id. Optional noiseRng for symmetric noise injection.
     * This is the ONLY place where learning mass moves.
     */
    addBelief(id, delta, noiseRng = null) {
        if (!id || !Number.isFinite(delta) || delta === 0) return;

        // Optional symmetric noise, injected by resolver/system
        let d = delta;
        const noise = knobs.interaction.noise || 0;
        if (noiseRng && noise > 0) d += (noiseRng() * 2 - 1) * noise;

        const max = knobs.agent.strengthMax;
        const cur = this.beliefs.get(id) || 0;

        // Diminishing returns / losses
        let eff = d;
        if (d > 0) eff *= (1 - cur / max); // harder to gain near the top
        else eff *= (cur / max);     // easier to lose if you're big

        const next = Math.max(0, Math.min(max, cur + eff));
        this.beliefs.set(id, next);

        // Pay-from-others only when we actually added mass
        const pay = knobs.agent.payFraction ?? 0.6; // <— NEW KNOB (0..1)
        if (eff > 0 && pay > 0) {
            let othersSum = 0;
            this.beliefs.forEach((v, k) => {
                if (k !== id) othersSum += v;
            });
            const pay = knobs.agent.payFraction ?? 0.6; // <— NEW KNOB (0..1)
            if (eff > 0 && pay > 0) {
                if (othersSum > 0) {
                    let toTake = Math.min(eff * pay, othersSum);
                    this.beliefs.forEach((v, k) => {
                        if (k === id || toTake <= 0) return;
                        const cut = toTake * (v / othersSum);
                        this.beliefs.set(k, Math.max(0, v - cut));
                    });
                }
            }
        }
    }

    /**
     * Batch apply deltas (from interaction/vision resolvers).
     * Pass a per-stage noiseRng if you want consistent noise per apply.
     */
    applyBeliefChanges(changes, noiseRng = null) {
        if (!Array.isArray(changes)) return;
        for (const ch of changes) {
            if (!ch) continue;
            this.addBelief(ch.beliefId, ch.delta, noiseRng);
        }
        this.reconcileAndUpdateDominant();
    }

    /**
     * Vision application (resolver already chose beliefId + strength)
     */
    applyVision(beliefId, strength, noiseRng = null) {
        if (!beliefId || !Number.isFinite(strength)) return;
        this.addBelief(beliefId, strength, noiseRng);
        this.reconcileAndUpdateDominant();
    }

    /**
     * Decay step with injected RNG (so event loop controls randomness).
     */
    stepDecay(rng, rate = knobs.agent.decayRate) {
        if (DETERMINISTIC && !rng) throw new Error("stepDecay called without rng");
        const factor = 1 + 0.75 * this.traits.forgetfulness;
        const r = Math.min(0.99, rate * factor);

        this.beliefs.forEach((v, k) => {
            let nv = v * (1 - r);
            if (R.pass(rng, knobs.agent.dropProb ?? 0.01)) {
                nv *= (1 - (knobs.agent.dropFrac ?? 0.25));
            }
            this.beliefs.set(k, nv);
        });

        this.reconcileAndUpdateDominant();
    }

    // --- Dominance & reconciliation ---

    updateDominant() {
        const baseGap = knobs.agent.hysteresisGap;
        const gapMin = baseGap * (1 + 0.8 * this.traits.steadfastness);

        const prev = this.dominantBeliefId;
        let maxId = null, maxVal = -Infinity;
        this.beliefs.forEach((v, k) => {
            if (v > maxVal) {
                maxVal = v;
                maxId = k;
            }
        });

        if (!prev) return this._setDominant(maxId);

        const prevVal = this.beliefs.get(prev) ?? -Infinity;
        const challenger = this.beliefs.get(maxId) ?? -Infinity;
        const gap = challenger - prevVal;

        const shouldFlip = maxId !== prev && gap >= gapMin;
        this._setDominant(shouldFlip ? maxId : prev);
    }

    _setDominant(id) {
        if (id === this.dominantBeliefId) return;
        beliefs.decCount(this.dominantBeliefId);
        this.dominantBeliefId = id || null;
        beliefs.incCount(this.dominantBeliefId);
    }

    _reconcile() {
        // prune tiny
        const eps = knobs.agent.floorEps;
        for (const [k, v] of this.beliefs) if (v < eps) this.beliefs.delete(k);

        // cap memory
        const K = knobs.agent.capacityK;
        if (this.beliefs.size > K) {
            const sorted = [...this.beliefs.entries()].sort((a, b) => b[1] - a[1]);
            this.beliefs = new Map(sorted.slice(0, K));
        }

        // clamp per-belief
        const max = knobs.agent.strengthMax;
        this.beliefs.forEach((v, k) => this.beliefs.set(k, Math.min(v, max)));

        // temperature renorm: T>1 => FLATTEN, T<1 => SHARPEN
        let sum = 0;
        this.beliefs.forEach(v => sum += v);
        if (sum > 0) {
            const traitT = knobs.agent.temperature * (1 - 0.3 * this.traits.steadfastness);
            const pow = 1 / traitT;
            let z = 0;
            this.beliefs.forEach((v, k) => {
                const w = Math.pow(v, pow);
                this.beliefs.set(k, w);
                z += w;
            });
            const s = knobs.agent.budget / z;
            this.beliefs.forEach((v, k) => this.beliefs.set(k, Math.min(v * s, max)));
        }
    }

    reconcileAndUpdateDominant() {
        this._reconcile();
        this.updateDominant();
    }

    // --- Utilities ---

    generateGoofyName(rng) {
        if (DETERMINISTIC && rng === Math.random) {
            console.warn("Math.random rng in generateGoofyName");
        }
        const p = namePrefixes[R.pickIndex(rng, namePrefixes.length)];
        const m = nameMiddles[R.pickIndex(rng, nameMiddles.length)];
        const s = nameSuffixes[R.pickIndex(rng, nameSuffixes.length)];
        return `${p}${m}${s}`;
    }

    static relationScore(aId, bId) {
        const a = beliefs.getSvo(aId), b = beliefs.getSvo(bId);
        if (!a || !b) return 0;
        let s = 0;
        if (a.s?.term === b.s?.term) s++;
        if (a.v?.term === b.v?.term) s++;
        if (a.o?.term === b.o?.term) s++;
        return s;
    }
}

/* goofy name pools */
const namePrefixes = ["Grim", "Slug", "Wig", "Zap", "Drip", "Blor", "Fro", "Yob", "Twib", "Snar", "Ooze", "Krog", "Nib"];
const nameMiddles = ["bo", "zi", "mo", "cha", "dru", "lek", "pa", "greb", "qu", "fra", "blub", "xan"];
const nameSuffixes = ["tus", "nard", "lock", "zak", "min", "pleen", "doot", "gar", "ax", "glomp", "vex", "po"];

// convenience
export function makeAgent(id, x, y, rngGenFactory, seedBeliefId = null) {
    return new Agent(id, x, y, rngGenFactory, seedBeliefId);
}
