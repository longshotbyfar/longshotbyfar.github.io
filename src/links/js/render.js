import {State} from './state.js';
import {hostOf} from './util.js';
import {DOM} from "./dom.js";

export function computeCategoryCounts() {
    State.catCounts = new Map();
    for (const it of State.items) {
        const c = (it.category || 'Uncategorised').trim();
        State.catCounts.set(c, (State.catCounts.get(c) || 0) + 1);
    }
}

export function renderCategoryChips() {
    computeCategoryCounts();
    DOM.catsEl.innerHTML = '';

    function makeChip(label, count, key) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.dataset.key = key ?? '';
        const isActive = (State.activeCat === null && key === null) || (key && key === State.activeCat);
        if (isActive) b.classList.add('active');
        b.innerHTML = `<span>${label}</span><span class="count">${count}</span>`;
        b.addEventListener('click', () => {
            State.activeCat = (State.activeCat === key) ? null : key;
            dispatchEvent(new CustomEvent('linkindex:render'));
        });
        return b;
    }

    DOM.catsEl.appendChild(makeChip('All', State.items.length, null));
    const frag = document.createDocumentFragment();
    [...State.catCounts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true, sensitivity: 'base'}))
        .forEach(([cat, count]) => frag.appendChild(makeChip(cat, count, cat)));
    DOM.catsEl.appendChild(frag);
}

export function renderHeader(visible) {
    const unreadVisible = visible.filter(x => !x.read).length;
    DOM.selEl.textContent = State.activeCat || 'All categories';
    DOM.infoEl.textContent = `${visible.length} item${visible.length === 1 ? '' : 's'}`;
    DOM.statEl.textContent = `(${unreadVisible}/${visible.length || 0} visible unread)`;
}

export function renderList(visible) {
    DOM.listEl.innerHTML = '';
    DOM.emptyEl.style.display = visible.length ? 'none' : 'block';
    const frag = document.createDocumentFragment();
    for (const it of visible) {
        const li = document.createElement('li');
        li.className = 'row';
        const dot = document.createElement('div');
        dot.className = 'dot ' + (it.read ? '' : 'unread');
        li.appendChild(dot);
        const a = document.createElement('a');
        a.className = 'name';
        a.href = it.link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = it.name || hostOf(it.link) || it.link;
        li.appendChild(a);
        const h = document.createElement('div');
        h.className = 'host';
        h.textContent = hostOf(it.link);
        li.appendChild(h);
        frag.appendChild(li);
    }
    DOM.listEl.appendChild(frag);
}