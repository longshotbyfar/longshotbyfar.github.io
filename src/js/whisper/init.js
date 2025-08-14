import { whisper } from './whispers.js';

export function initWhispers(containerOrSelector) {
    const container = typeof containerOrSelector === 'string'
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;

    if (!container) return; // nothing to do

    container.addEventListener('click', () => {
        container.replaceChildren();
        for (let i = 0; i < 2; i++) {
            const p = document.createElement('p');
            p.textContent = whisper();
            container.appendChild(p);
        }
    });

    // prime once
    container.click();
}
