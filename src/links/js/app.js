import {DOM} from './dom.js';
import {loadData} from './data.js';
import {filteredItems, sortVisible} from './filter.js';
import {renderCategoryChips, renderHeader, renderList} from './render.js';
import {wireKeys, wireInputs} from './events.js';

function renderAll() {
    const visible = sortVisible(filteredItems(DOM.qInput.value, DOM.unreadCb.checked));
    renderHeader(visible);
    renderList(visible);
    renderCategoryChips();
}

export async function init() {
    try {
        await loadData();
    } catch {
        return;
    }
    renderAll();
    addEventListener('linkindex:render', renderAll);
    wireInputs(renderAll);
    wireKeys(renderAll);
}

init();
