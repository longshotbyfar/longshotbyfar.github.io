// world.js
import { beliefs } from "./beliefs.js";
import { makeAgent } from "./agent.js";

const world = {
    width: 0,
    height: 0,
    grid: [],
    agents: [],
    tick: 0,
    log: [],
    settlements: {},
};

export const getWorld = () => world; // single source of truth

function emptyGrid(W, H) {
    // H rows, each length W — no shared rows
    return Array.from({ length: H }, () => Array(W).fill(null));
}

export function serpentineScanFrom(x0, y0, W, H) {
    const ord = [];
    for (let k = 0; k < H; k++) {
        const y = (y0 + k) % H;
        if ((k & 1) === 0) {
            for (let t = 0; t < W; t++) ord.push([ (x0 + t) % W, y ]);
        } else {
            for (let t = 0; t < W; t++) ord.push([ (x0 - t + W) % W, y ]);
        }
    }
    return ord;
}


// (salt:string) => rng():number
export function initWorld(W, H, N, rngFactory) {
    if (typeof rngFactory !== "function") {
        throw new Error("initWorld requires rngFactory(salt) -> rng()");
    }

    beliefs.reset?.();

    world.width = W | 0;
    world.height = H | 0;
    world.grid = emptyGrid(world.width, world.height);
    world.agents = [];
    world.tick = 0;
    world.log = [];
    world.settlements = {};

    const coords = [];
    for (let y = 0; y < world.height; y++) {
        for (let x = 0; x < world.width; x++) coords.push([x, y]);
    }

    const rng = rngFactory("init|shuffle");
    // Fisher–Yates
    for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const tmp = coords[i]; coords[i] = coords[j]; coords[j] = tmp;
    }

    const take = Math.min(N | 0, coords.length);
    for (let id = 0; id < take; id++) {
        const [x, y] = coords[id];
        const a = makeAgent(id, x, y, rngFactory);
        world.grid[y][x] = a;
        world.agents.push(a);
    }

    // sanity check for grid shape
    if (
        world.grid.length !== world.height ||
        !Array.isArray(world.grid[0]) ||
        world.grid[0].length !== world.width
    ) {
        throw new Error(
            `Bad grid shape: rows=${world.grid.length} cols0=${world.grid[0]?.length} expected=${world.height}x${world.width}`
        );
    }

    return world;
}

// to avoid engine/global RNG coupling if needed
export function placeAgent(worldObj, agent, rngFactory) {
    const rngX = rngFactory(`spawn|agent=${agent.id}|x`);
    const rngY = rngFactory(`spawn|agent=${agent.id}|y`);

    // Optional burn-in
    rngX(); rngX(); rngY(); rngY();

    let x0 = (rngX() * worldObj.width) | 0;
    let y0 = (rngY() * worldObj.height) | 0;

    const order = serpentineScanFrom(x0, y0, worldObj.width, worldObj.height);
    let x = x0, y = y0;
    if (worldObj.grid[y][x]) {
        for (const [xx, yy] of order) {
            if (!worldObj.grid[yy][xx]) { x = xx; y = yy; break; }
        }
    }

    agent.x = x;
    agent.y = y;
    worldObj.grid[y][x] = agent;
}
