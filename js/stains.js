function getRandomColor(a=0.4){
    const r= Math.floor(Math.random()*256),
        g= Math.floor(Math.random()*256),
        b= Math.floor(Math.random()*256);
    return `rgba(${r},${g},${b},${a})`;
}

function makeStain() {
    const el = document.createElement('div');
    Object.assign(el.style, {
        position:'fixed', width:'80px', height:'80px',
        backgroundColor:getRandomColor(0.4), pointerEvents:'none',
        left: `${Math.random() * (window.innerWidth*0.6 - 40)}px`,
        top:  `${Math.random() * (window.innerHeight - 40)}px`,
        willChange: 'transform'
    });
    document.body.appendChild(el);

    let target = 1.05 + Math.random()*0.1;
    let speed  = 0.002 + Math.random()*0.003;
    const phase = Math.random()*Math.PI*2;
    let last = performance.now();

    function tick(t){
        const elapsed = t - last;
        if (elapsed > 2000 + Math.random()*2000) {
            target = 1.03 + Math.random()*0.12;
            speed  = 0.0015 + Math.random()*0.004;
            last = t;
        }
        const scale = 1 + Math.sin(t*speed + phase) * (target - 1);
        el.style.transform = `scale(${scale})`;
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return el;
}

export function spawnStains(n=5){
    for (let i=0;i<n;i++) {
        // defer between frames so layout doesn’t choke
        requestIdleCallback?.(()=>makeStain()) ?? setTimeout(()=>makeStain(),0);
    }
}
