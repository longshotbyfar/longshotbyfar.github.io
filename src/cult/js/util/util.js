import {cyrb32} from "./rng.js";
import {computeMetrics} from "./metrics.js";

export const inBrowser = () =>  typeof window !== "undefined";

export function worldHash(world) {
    const W = world.width, H = world.height, G = world.grid;
    let h = 2166136261 >>> 0; // FNV-ish start
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const a = G[y][x];
            // include occupancy + dominant id
            const id = a?.dominantBeliefId ?? '#';
            const s = cyrb32(String(id))();           // 32-bit
            h ^= s; h = Math.imul(h, 16777619) >>> 0; // mix
        }
    }
    return h >>> 0; // uint32
}

export function printMetrics(world) {
    console.log(`@${world.tick}`);
    console.log(computeMetrics(world));
}