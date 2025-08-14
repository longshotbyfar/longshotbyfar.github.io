export function wireAsciiFlip(pre) {
    const original = pre.getAttribute('data-original');
    const hover = pre.getAttribute('data-hover');
    pre.textContent = original;
    pre.addEventListener('mouseenter', ()=> pre.textContent = hover);
    pre.addEventListener('mouseleave', ()=> pre.textContent = original);
}
