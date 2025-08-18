// policies/interact.js
import { beliefs } from "../core/beliefs.js";
import { knobs } from "../config/config.js";
import { Agent } from "../core/agent.js";
import {R} from "../util/rng.js";

export function makeInteractIntent(world, a, b, rng) {
    if (!a?.dominantBeliefId || !b?.dominantBeliefId) return null;

    const aId = a.dominantBeliefId;
    const bId = b.dominantBeliefId;
    const kin = Agent.relationScore(aId, bId); // 0..3

    const { needBias: beta, kinBias: gamma, learnRate: tau, mergeProbWhenKin, mergeKinThreshold } = knobs.interaction;

    const opennessBoost = 1 + 0.8 * a.traits.openness;
    const need = (b.beliefs.get(bId) || 0) - (a.beliefs.get(bId) || 0);
    const x = beta * need + gamma * kin;
    const p = 1 / (1 + Math.exp(-x)); // 0..1

    const signed = (kin >= 2) ? +1 : (kin === 1 ? +0.25 : -0.6);
    const delta = tau * opennessBoost * p * signed;

    const intents = [{
        kind: "BeliefApply",
        tick: world.tick,
        agentId: b.id,
        changes: [{ beliefId: bId, delta }]
    }];

    if (kin === 0) {
        intents.push({
            kind: "BeliefApply",
            tick: world.tick,
            agentId: a.id,
            changes: [{ beliefId: aId, delta: Math.abs(delta) * 0.25 }]
        });
    }

    if (kin >= (mergeKinThreshold ?? 3)) {
        const prob = mergeProbWhenKin * (0.75 + 0.25 * a.traits.openness);
        if (R.pass(rng(), prob)) {
            const mId = beliefs.mergeIds(aId, bId, rng);
            if (mId) {
                intents.push({
                    kind: "BeliefApply",
                    tick: world.tick,
                    agentId: a.id,
                    changes: [{ beliefId: mId, delta: 0.06 }]
                });
            }
        }
    }

    return intents; // array; resolver will enqueue all
}
