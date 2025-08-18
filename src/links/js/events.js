import {State} from './state.js';
import {DOM} from "./dom.js";

export function wireKeys(render) {
    window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== DOM.qInput) {
            e.preventDefault();
            DOM.qInput.focus();
            DOM.qInput.select();
        } else if (e.key.toLowerCase() === 'u') {
            DOM.unreadCb.checked = !DOM.unreadCb.checked;
            render();
        } else if (e.key === 'Escape') {
            if (DOM.qInput.value) {
                DOM.qInput.value = '';
                render();
            } else if (State.activeCat) {
                State.activeCat = null;
                render();
            }
        }
    });
}

export function wireInputs(render) {
    DOM.qInput.addEventListener('input', render);
    DOM.unreadCb.addEventListener('change', render);
}