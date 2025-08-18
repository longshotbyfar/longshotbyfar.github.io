import {DOM} from './dom.js';
import {State} from './state.js';
import {safeArray} from './util.js';

function showJsonError(raw, err, label) {
    const listEl = document.getElementById('list');
    const emptyEl = document.getElementById('empty');
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    emptyEl.innerHTML = `Failed to parse <code>${label}</code><br><br><small>${(err && err.message) || 'SyntaxError'}</small>`;
    console.error('JSON parse error in', label, err);
}

export async function loadData() {
    if (DOM.inline && DOM.inline.textContent && DOM.inline.textContent.trim()) {
        try {
            State.rawItems = JSON.parse(DOM.inline.textContent.trim());
        } catch (e) {
            showJsonError(DOM.inline.textContent, e, '#links-json');
            throw e;
        }
    } else {
        const r = await fetch(State.src, {cache: 'no-store'});
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        const raw = await r.text();
        try {
            State.rawItems = JSON.parse(raw);
        } catch (e) {
            showJsonError(raw, e, State.src);
            throw e;
        }
    }

    State.items = safeArray(State.rawItems).map(it => ({
        link: String(it.link || ''),
        name: it.name ? String(it.name) : '',
        read: !!it.read,
        category: (it.category || 'Uncategorised')
    }));
}
