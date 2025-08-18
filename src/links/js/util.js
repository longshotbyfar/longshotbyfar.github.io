export function hostOf(url) {
    try {
        return new URL(url).host.replace(/^www\./, '');
    } catch {
        return ''
    }
}

export function norm(s) {
    return (s || '').toLowerCase();
}

export function safeArray(v) {
    return Array.isArray(v) ? v : [];
}