import {norm} from './util.js';
import {State} from "./state.js";

export function filteredItems(qValue, onlyUnread) {
    const q = norm(qValue);
    const cat = State.activeCat;
    const out = [];
    for (const it of State.items) {
        if (onlyUnread && it.read) continue;
        if (cat && (it.category || '').trim() !== cat) continue;
        if (q) {
            const hay = `${norm(it.name)} ${norm(it.link)} ${norm(it.category)}`;
            if (!hay.includes(q)) continue;
        }
        out.push(it);
    }
    return out;
}

export function sortVisible(list) {
    return list.sort((a, b) => {
        const ra = !!a.read, rb = !!b.read;
        if (ra !== rb) return ra - rb; // unread first
        return norm(a.name).localeCompare(norm(b.name));
    });
}