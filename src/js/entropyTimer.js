export function startEntropyTimer(outEl){
    let entropy = 0;
    setInterval(()=>{
        const r = Math.random();
        if (r < 0.01) entropy -= 1;
        else if (r < 0.02) entropy += 2;
        else entropy += 1;
        outEl.textContent = `Time spent here: ${entropy}s`;
    }, 1000);
}
