// core/selection.js
let selectedId = null;
const listeners = new Set();

export function getSelected() { return selectedId; }

export function setSelected(id) {
    const next = Number.isInteger(id) ? id : null;
    if (next === selectedId) return;
    selectedId = next;
    listeners.forEach(fn => fn(selectedId));
}

export function onSelectedChange(fn) {
    listeners.add(fn);
    fn(selectedId);             // immediate sync
    return () => listeners.delete(fn);
}
