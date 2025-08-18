export function slantCards(selector = '.card') {
    const cards = document.querySelectorAll(selector);
    if (!cards.length) return;

    cards.forEach(card => {
        const rot = (Math.random() * 5 - 1.5).toFixed(2);
        const tx  = Math.floor(Math.random() * 5 - 2);
        const ty  = Math.floor(Math.random() * 5 - 2);
        card.style.setProperty('--card-rot', rot + 'deg');
        card.style.setProperty('--card-tx',  tx + 'px');
        card.style.setProperty('--card-ty',  ty + 'px');
    });
}
