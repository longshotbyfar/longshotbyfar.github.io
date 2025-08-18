// clusters_exact4.js
export function clusterExact4(world) {
    const W = world.width, H = world.height, G = world.grid;
    const seen = new Uint8Array(W * H);
    const idx = (x,y) => y*W + x;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    const clusters = [];         // sizes (only size>=2)
    let occupied = 0;
    let edgesOccOcc = 0;         // total occupied-occupied 4-neighbor edges
    let edgesSame = 0;           // same-ID edges
    let edgesDiff = 0;           // different-ID edges (this is your frontier)

    // edge scan (right/down to count once)
    for (let y=0; y<H; y++) for (let x=0; x<W; x++) {
        const a = G[y][x]; if (a) occupied++;
        if (!a) continue;
        const aId = a.dominantBeliefId;
        if (x+1 < W) {
            const b = G[y][x+1];
            if (b) {
                edgesOccOcc++;
                if (b.dominantBeliefId === aId) edgesSame++; else edgesDiff++;
            }
        }
        if (y+1 < H) {
            const b = G[y+1][x];
            if (b) {
                edgesOccOcc++;
                if (b.dominantBeliefId === aId) edgesSame++; else edgesDiff++;
            }
        }
    }

    // BFS for exact-ID, 4-neighbour components
    const qx = new Int32Array(W*H), qy = new Int32Array(W*H);
    for (let y=0; y<H; y++) for (let x=0; x<W; x++) {
        const a = G[y][x]; if (!a) continue;
        const k = idx(x,y); if (seen[k]) continue;

        const dom = a.dominantBeliefId;
        let head=0, tail=0, size=0;
        seen[k]=1; qx[tail]=x; qy[tail]=y; tail++;

        while (head < tail) {
            const cx=qx[head], cy=qy[head]; head++; size++;
            for (const [dx,dy] of dirs) {
                const nx=cx+dx, ny=cy+dy;
                if (nx<0||ny<0||nx>=W||ny>=H) continue;
                const kk=idx(nx,ny); if (seen[kk]) continue;
                const n = G[ny][nx]; if (!n) continue;
                if (n.dominantBeliefId === dom) { seen[kk]=1; qx[tail]=nx; qy[tail]=ny; tail++; }
            }
        }
        if (size >= 2) clusters.push(size); // only real cliques
    }

    // loner agents = occupied - sum(cluster sizes)
    const inClusters = clusters.reduce((a,s)=>a+s,0);
    const lonerAgents = Math.max(0, occupied - inClusters);

    return {
        clusters,                            // sizes >=2
        frontierLen: edgesDiff,              // unlike occupied adjacencies
        occupied,
        edgesOccOcc,
        edgesSame,
        edgesDiff,
        loner_pct_agents: occupied ? lonerAgents / occupied : 0
    };
}
