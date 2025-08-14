export function wireObjet(node) {
    let busy = false;
    node.addEventListener('mouseenter', () => {
        if (busy) return; busy = true;
        node.style.opacity = '0';
        setTimeout(() => {
            node.style.transition = 'none';
            const rect = node.getBoundingClientRect();
            const maxL = window.innerWidth - rect.width;
            const maxT = window.innerHeight - rect.height;
            node.style.left = `${Math.random()*maxL}px`;
            node.style.top  = `${Math.random()*maxT}px`;
            void node.offsetWidth;
            node.style.transition = 'opacity .6s ease';
            node.style.opacity = '1';
            setTimeout(()=> busy=false, 600);
        }, 600);
    });
}
