import { whisper } from './whisper.js';

export function initWhispers(containerOrSelector) {
    const container = typeof containerOrSelector === 'string'
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;

    if (!container) return; // nothing to do

    container.addEventListener('click', () => refreshWhispers(container));
    refreshWhispers(container);
}

function refreshWhispers(container) {
    container.replaceChildren();
    for (let i = 0; i < 2; i++) {
        const p = document.createElement('p');
        p.textContent = whisper();
        container.appendChild(p);
    }
}
