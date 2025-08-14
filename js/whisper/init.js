export function initWhispers(container){
    if (!window.whisper) return;
    container.addEventListener('click', () => {
        container.replaceChildren();
        for (let i=0;i<2;i++){
            const p = document.createElement('p');
            p.textContent = window.whisper();
            container.appendChild(p);
        }
    });
    container.click();
}
