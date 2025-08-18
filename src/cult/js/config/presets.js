import {knobs} from "./config.js";

export const BORDER_WARS = {
    world: {
        numAgents: 320,         // high density
            interactRadius: 2,
            seekKinProb: 0.92,
            seekKinRadius: 5,
            outgroupRepulsion: 0.85,
            wanderProb: 0.02
    },
    agent: {
        temperature: 0.92,      // monocultural heads
            hysteresisGap: 0.22,
            floorEps: 0.02,
            decayRate: 0.025,
            dropProb: 0.002
    },
    interaction: {
        learnRate: 0.24,        // slowish border movement
            kinBias: 0.65,
            needBias: 0.15,
            noise: 0.005
    }
};

export const MOSAIC_CITY = {
    world: {
        numAgents: 280,
        interactRadius: 2,
        seekKinProb: 0.7,
        seekKinRadius: 3,
        outgroupRepulsion: 0.4,
        wanderProb: 0.25
    },
    agent: {
        temperature: 1.18,      // plural heads
        hysteresisGap: 0.12,
        floorEps: 0.005,
        decayRate: 0.03,
        dropProb: 0.004
    },
    interaction: {
        learnRate: 0.28,
        kinBias: 0.45,
        needBias: 0.28,
        noise: 0.02
    }
};

export const SHIFTING_DUNES = {
    world: {
        numAgents: 250,
        interactRadius: 1,
        seekKinProb: 0.55,
        seekKinRadius: 2,
        outgroupRepulsion: 0.2,
        wanderProb: 0.35
    },
    agent: {
        temperature: 1.25,
        hysteresisGap: 0.08,
        floorEps: 0.003,
        decayRate: 0.04,
        dropProb: 0.008
    },
    interaction: {
        learnRate: 0.18,
        kinBias: 0.3,
        needBias: 0.4,
        noise: 0.05
    }
};

export const ARCHIPELAGO = {
    world: {
        numAgents: 160,         // sparse
        interactRadius: 1,
        seekKinProb: 0.85,
        seekKinRadius: 3,
        outgroupRepulsion: 0.9,
        wanderProb: 0.1
    },
    agent: {
        temperature: 1.05,
        hysteresisGap: 0.2,
        floorEps: 0.015,
        decayRate: 0.025,
        dropProb: 0.002
    },
    interaction: {
        learnRate: 0.26,
        kinBias: 0.55,
        needBias: 0.15,
        noise: 0.01
    }
};

export const HIVEMIND = {
    world: {
        numAgents: 300,
        interactRadius: 2,
        seekKinProb: 0.98,
        seekKinRadius: 6,
        outgroupRepulsion: 0.95,
        wanderProb: 0.0
    },
    agent: {
        temperature: 0.85,
        hysteresisGap: 0.25,
        floorEps: 0.05,
        decayRate: 0.015,
        dropProb: 0.001
    },
    interaction: {
        learnRate: 0.45,
        kinBias: 0.9,
        needBias: 0.05,
        noise: 0.0
    }
};

export const FRACTAL_FRONTIER = {
    world: {
        numAgents: 300,
        interactRadius: 2,
        seekKinProb: 0.6,
        seekKinRadius: 3,
        outgroupRepulsion: 0.5,
        wanderProb: 0.15
    },
    agent: {
        temperature: 1.22,
        hysteresisGap: 0.1,
        floorEps: 0.004,
        decayRate: 0.03,
        dropProb: 0.003
    },
    interaction: {
        learnRate: 0.24,
        kinBias: 0.5,
        needBias: 0.35,
        noise: 0.03
    }
};

export function applyPreset(preset) {
    for (const key in preset) {
        if (!Object.prototype.hasOwnProperty.call(knobs, key)) continue;
        if (typeof knobs[key] === "object" && !Array.isArray(knobs[key]) && knobs[key] !== null) {
            applyPreset(knobs[key], preset[key]);
        } else {
            knobs[key] = preset[key];
        }
    }
    return knobs;
}
