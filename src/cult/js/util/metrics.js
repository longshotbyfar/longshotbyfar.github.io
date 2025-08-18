import { clusterExact4 } from './clusters.js';
import { mean, median, percentile } from './stats.js';
import {worldHash} from "./util.js";

export function computeMetrics(world) {
    const N = world.agents.length;

    const count = new Map();
    for (const a of world.agents) count.set(a.dominantBeliefId, (count.get(a.dominantBeliefId)||0)+1);
    let H=0, total=0; count.forEach(v=>total+=v);
    count.forEach(v => { const p=v/total; if (p>0) H -= p*Math.log(p); });

    const { clusters, frontierLen, occupied, loner_pct_agents } = clusterExact4(world);

    return {
        tick: world.tick,
        hash: worldHash(world),
        entropy: H,
        clusters_mean: mean(clusters),
        clusters_median: median(clusters),
        clusters_p90: percentile(clusters, 90),
        frontier: frontierLen,
        loner_pct: loner_pct_agents,
        occupancy: occupied / (world.width * world.height) // bonus sanity
    };
}
