export function startEntropyTimer(timerEl, ghostEl) {
    if (localStorage.getItem("nachträglichkeit") === "true") {
        ghostEl.textContent = "You were here before.";
    }
    localStorage.setItem("nachträglichkeit", "true");

    let entropy = parseInt(localStorage.getItem("entropyValue") || "0", 10);
    timerEl.textContent = `Time spent here: ${entropy}s`;

    let tick = 0;
    setInterval(() => {
        const r = Math.random();
        if (r < 0.01) entropy -= 1;
        else if (r < 0.02) entropy += 2;
        else entropy += 1;
        timerEl.textContent = `Time spent here: ${entropy}s`;
        tick++;
        if (tick % 5 === 0) {
            localStorage.setItem("entropyValue", entropy.toString());
        }
    }, 1000);
}
