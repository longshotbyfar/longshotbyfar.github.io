// plugins/stripConsoleLog.mjs
import { readFile } from 'node:fs/promises';

export default function stripConsoleLogPlugin() {
    return {
        name: 'strip-console-log',
        setup(build) {
            build.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, async (args) => {
                let code = await readFile(args.path, 'utf8');
                code = removeConsoleLogs(code);
                return { contents: code, loader: args.path.endsWith('x') ? 'tsx' : 'js' };
            });
        }
    };
}

// Remove console.log(...) outside strings/comments (handles multiline + nested parens)
function removeConsoleLogs(src) {
    let out = '', i = 0, n = src.length;
    let q = null, esc = false, sl = false, ml = false;
    const isIdent = c => /[A-Za-z0-9_$]/.test(c);

    while (i < n) {
        const ch = src[i], nx = src[i+1];

        if (sl) { out += ch; if (ch === '\n') sl = false; i++; continue; }
        if (ml) { out += ch; if (ch === '*' && nx === '/') { out += nx; i += 2; ml = false; } else i++; continue; }

        if (q) {
            out += ch;
            if (esc) { esc = false; i++; continue; }
            if (ch === '\\') { esc = true; i++; continue; }
            if (ch === q) q = null;
            i++; continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { q = ch; out += ch; i++; continue; }

        if (ch === '/' && nx === '/') { out += ch; sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { out += ch; ml = true; i++; continue; }

        if (ch === 'c' && src.slice(i, i+7) === 'console' && !isIdent(src[i-1])) {
            let j = i + 7;
            while (j < n && /\s/.test(src[j])) j++;
            if (src[j] === '.' && src.slice(j+1, j+4) === 'log' && !isIdent(src[j+4])) {
                j += 4;
                while (j < n && /\s/.test(src[j])) j++;
                if (src[j] === '(') {
                    let depth = 0, k = j;
                    do {
                        const c = src[k];
                        if (c === '(') depth++;
                        else if (c === ')') depth--;
                        else if (c === '"' || c === "'" || c === '`') {
                            let qq = c, esc2 = false; k++;
                            while (k < n) {
                                const cc = src[k];
                                if (esc2) { esc2 = false; k++; continue; }
                                if (cc === '\\') { esc2 = true; k++; continue; }
                                if (cc === qq) break;
                                k++;
                            }
                        }
                        k++;
                    } while (k < n && depth > 0);
                    while (k < n && /\s/.test(src[k])) k++;
                    if (src[k] === ';') k++;
                    i = k; // skip the whole call
                    continue;
                }
            }
        }

        out += ch; i++;
    }
    return out;
}
