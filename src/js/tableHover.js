export function wireAsciiFlip(pre) {
    const original = pre.getAttribute('data-original');
    const hover = pre.getAttribute('data-hover');
    pre.innerHTML = original;
    pre.addEventListener('mouseenter', () => pre.innerHTML = hover);
    pre.addEventListener('mouseleave', () => pre.innerHTML = original);
}
