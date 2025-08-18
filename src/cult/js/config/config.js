// config.js
import {inBrowser} from "../util/util.js";

export const DETERMINISTIC = true;

const listeners = new Set();

export const knobs = {
    world: {
        width: 50, height: 50,
        numAgents: 420,
        interactRadius: 2,
        seekKinProb: 0.6,
        seekKinRadius: 3,
        outgroupRepulsion: 0.35,
        wanderProb: 0.35,
        fastForwardTicks: 0,
        tickMs: 100,    // browser sim
    },

    agent: {
        // belief memory
        capacityK: 8,
        floorEps: 0.005,            
        budget: 1.0, strengthMax: 1.0,

        // switching & sharpening
        hysteresisGap: 0.18,       
        temperature: 1.15,        

        // forgetting
        decayRate: 0.035,
        dropProb: 0.00,  
        dropFrac      : 0.12,

        // visions (background innovation)
        visionProb: 0.0015,
        visionStrength: 0.6,

        payFraction: 0.6,
    },

    interaction: {
        learnRate: 0.22,
        kinBias: 0.45,
        needBias: 0.22,
        noise: 0.03,
        mergeKinThreshold: 3,
        mergeProbWhenKin: 0.06,
    },

    shapes: {
        needSlope: 1.0,
        kinSatK: 0.45,
        kinAmpl: 1.1,
        kinBias: -0.15,
        learnTemp: 1.15,
        ouSigma: 0.22,
        seekWidth: 0.7,
    },

    ui: {
        knobPanelCollapsed: false
    },
    viz: {
        gridEmptyOpacity: 0.3,
        chartTopN: 5,
        chartHistory: 100,
        colorMinClusterSize: 2
    }
};

if (inBrowser()) window.knobs = knobs;

export function setKnob(path, value) {
    const keys = path.split('.');
    let cur = knobs;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
    cur[keys[keys.length - 1]] = value;
    listeners.forEach(fn => fn(path, value));
}

export function onKnobChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}
