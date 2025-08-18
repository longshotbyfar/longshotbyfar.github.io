// beliefs.js
// deterministic belief registry + S/V/O helpers

import { SEEDS } from "../config/seeds.js";
import {pickRandom, R} from "../util/rng.js";
import { DETERMINISTIC } from "../config/config.js";

/* ---------- safety: freeze seed pools so no one mutates them at runtime ---------- */
if (Array.isArray(SEEDS?.subjects)) Object.freeze(SEEDS.subjects);
if (Array.isArray(SEEDS?.verbs))    Object.freeze(SEEDS.verbs);
if (Array.isArray(SEEDS?.objects))  Object.freeze(SEEDS.objects);

/* ---------- SVO utilities ---------- */
export function keyFromSvo(svo) {
    const s = svo?.s?.term ?? "";
    const v = svo?.v?.term ?? "";
    const o = svo?.o?.term ?? "";
    return `${s}::${v}::${o}`;
}

export function stringifySvo(svo) {
    if (!svo?.s?.term || !svo?.v?.term || !svo?.o?.term) return "???";
    return `${svo.s.term} ${svo.v.term} ${svo.o.term}`;
}

// Seedable SVO draw
export function randomSvo(rng = Math.random) {
    if (DETERMINISTIC && rng === Math.random) {
        console.warn("randomSvo used without seeded RNG");
    }
    const s = pickRandom(rng, SEEDS.subjects);
    const v = pickRandom(rng, SEEDS.verbs);
    const o = pickRandom(rng, SEEDS.objects);
    return { s, v, o };
}

// Seedable merge: pick per-slot from a|b 50/50
export function mergeSvo(a, b, rng = Math.random) {
    if (DETERMINISTIC && rng === Math.random) {
        console.warn("mergeSvo used without seeded RNG");
    }
    const choose = (x, y) => (R.pass(rng, 0.5) ? x : y);

    return { s: choose(a.s, b.s), v: choose(a.v, b.v), o: choose(a.o, b.o) };
}

/* ---------- Registry ---------- */
export class BeliefRegistry {
    constructor() {
        this.byId = new Map();    // BeliefId -> {svo}
        this.idByKey = new Map(); // "s::v::o" -> BeliefId
        this.counts = new Map();  // dominance counts (for viz/diagnostics)
        this.nextNum = 0;
    }

    reset() {
        this.byId.clear();
        this.idByKey.clear();
        this.counts.clear();
        this.nextNum = 0;
    }

    ensureIdForSvo(svo) {
        if (!svo?.s || !svo?.v || !svo?.o) return null;
        const key = keyFromSvo(svo);
        const hit = this.idByKey.get(key);
        if (hit) return hit;
        const id = `b${this.nextNum++}`;
        this.idByKey.set(key, id);
        this.byId.set(id, { svo });
        return id;
    }

    getSvo(id) { return this.byId.get(id)?.svo ?? null; }
    toString(id) { return stringifySvo(this.getSvo(id)); }

    incCount(id) { if (id) this.counts.set(id, (this.counts.get(id) || 0) + 1); }
    decCount(id) {
        if (!id) return;
        const n = (this.counts.get(id) || 0) - 1;
        if (n <= 0) this.counts.delete(id); else this.counts.set(id, n);
    }

    // Draw a new random SVO and ensure ID (seeded)
    randomId(rng = Math.random) {
        if (DETERMINISTIC && rng === Math.random) {
            console.warn("randomId used without seeded RNG");
        }
        const svo = randomSvo(rng);
        return this.ensureIdForSvo(svo);
    }

    // Merge two belief IDs into a composite SVO (seeded)
    mergeIds(aId, bId, rng = Math.random) {
        if (DETERMINISTIC && rng === Math.random) {
            console.warn("mergeIds used without seeded RNG");
        }
        const a = this.getSvo(aId);
        const b = this.getSvo(bId);
        if (!a || !b) return null;
        const m = mergeSvo(a, b, rng);
        return this.ensureIdForSvo(m);
    }

    allIds() { return Array.from(this.byId.keys()); }
    size()   { return this.byId.size; }
}

/* ---------- singleton ---------- */
export const beliefs = new BeliefRegistry();
