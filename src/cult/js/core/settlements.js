// settlements.js
import { beliefs } from "./beliefs.js";

const BELIEVER_COUNT_THRESHOLD = 10;
const BLOB_SIZE_THRESHOLD = 10;

function findBeliefBlobs(world, threshold = BELIEVER_COUNT_THRESHOLD) {
    const blobs = {};
    const visited = new Set();

    for (const [beliefId, count] of beliefs.counts.entries()) {
        if (count < threshold) continue;

        blobs[beliefId] = [];

        for (const agent of world.agents) {
            if (agent.dominantBeliefId !== beliefId) continue;
            if (visited.has(agent.id)) continue;

            const blob = floodFillBlob(agent, beliefId, visited);
            if (blob.length >= BLOB_SIZE_THRESHOLD) {
                blobs[beliefId].push(blob);
                for (const a of blob) visited.add(a.id);
            }
        }
    }

    return blobs;
}

function floodFillBlob(world, start, beliefId, visited) {
    const queue = [start];
    const blob = [];

    while (queue.length > 0) {
        const a = queue.pop();
        if (visited.has(a.id)) continue;
        visited.add(a.id);
        blob.push(a);

        for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nx = (a.x + dx + world.width)  % world.width;
            const ny = (a.y + dy + world.height) % world.height;
            const neighbor = world.grid[ny][nx];
            if (!neighbor || visited.has(neighbor.id)) continue;
            if (neighbor.dominantBeliefId !== beliefId) continue;
            queue.push(neighbor);
        }
    }

    return blob;
}

export const getSettlementCandidates = () => {
    const blobsByBelief = findBeliefBlobs(BELIEVER_COUNT_THRESHOLD);
    return Object.entries(blobsByBelief)
        .filter(([, blobs]) => blobs.some(b => b.length >= BLOB_SIZE_THRESHOLD));
};

export function updateSettlements(world) {
    world.settlements = {};
    const blobsByBelief = findBeliefBlobs(BELIEVER_COUNT_THRESHOLD);

    for (const [beliefId, blobs] of Object.entries(blobsByBelief)) {
        if (!blobs || blobs.length === 0) continue;

        world.settlements[beliefId] = blobs.map((blob, i) => {
            const coords = blob.map(a => ({ x: a.x, y: a.y }));
            const centroid = {
                x: Math.round(coords.reduce((s, c) => s + c.x, 0) / coords.length),
                y: Math.round(coords.reduce((s, c) => s + c.y, 0) / coords.length),
            };

            return {
                id: `${beliefId}-${i}`,
                beliefId,
                belief: beliefs.getSvo(beliefId), // new API
                members: blob.map(a => a.id),
                centroid,
                formedAt: world.tick,
                status: "active",
            };
        });
    }
}

window.gsc = getSettlementCandidates();