// build-plugins/friction.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const MIN_B64_LENGTH = 2;

export default function frictionPlugin({
                                           base64Strings = true,
                                           injectDecoy = true,
                                           wrapEval = false,            // beware CSP; keep false unless you want pain
                                           sabotageWhitespace = true    // replace spaces/newlines outside strings
                                       } = {}) {
    return {
        name: 'friction',
        setup(build) {
            // optional decoy banner at the very top (human-looking noise)
            if (injectDecoy) {
                build.onStart(() => {
                    build.initialOptions.banner ||= {};
                    build.initialOptions.banner.js =
                        `/* build:${Date.now().toString(36)} */
(function(){var App={init:function(){},run:function(){}};try{console.clear()}catch(_){}})();\n` +
                        (build.initialOptions.banner.js || '');
                });
            }

            // After esbuild writes files, vandalize the main outfile in-place.
            build.onEnd(async () => {
                const out = build.initialOptions.outfile;
                if (!out) return; // this plugin assumes single-file output

                let code = await readFile(out, 'utf8');

                if (base64Strings) code = encodeStrings(code);
                if (wrapEval)      code = wrapWithEval(code);
                if (sabotageWhitespace) code = sabotageWS(code);

                await writeFile(out, code, 'utf8');
            });
        }
    };
}

/* ---------- helpers ---------- */

// Encode plain string literals to __B64("…"), but if the string is
// an object-literal key (before a ':' and preceded by '{' or ','),
// emit a computed key: [__B64("…")]: ...
function encodeStrings(js) {
    let out = '', i = 0, n = js.length;
    let q = null, esc = false, sl = false, ml = false, buf = '';

    // track the last non-whitespace char we've emitted, to spot '{' or ','
    let lastSig = null;

    const push = (s) => {
        out += s;
        // update last significant char
        for (let k = 0; k < s.length; k++) {
            const ch = s[k];
            if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') lastSig = ch;
        }
    };

    const emitString = (rawContent, quoteChar, isObjKey) => {
        // leave template literals with ${} untouched
        if (quoteChar === '`' && rawContent.includes('${')) return quoteChar + rawContent + quoteChar;

        // unescape basic escapes to get the real content length
        const plain = rawContent
            .replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t')
            .replace(/\\`/g, '`').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

        if (plain.length < MIN_B64_LENGTH) {
            return quoteChar + rawContent + quoteChar; // too short, keep literal
        }

        const b64 = Buffer.from(plain, 'utf8').toString('base64');
        const call = `__B64("${b64}")`;
        return isObjKey ? `[${call}]` : call;
    };

    const peekNonWS = (from) => {
        let j = from;
        while (j < n) {
            const ch = js[j];
            if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') return ch;
            j++;
        }
        return '';
    };

    while (i < n) {
        const ch = js[i], nx = js[i + 1];

        // single-line comment
        if (sl) { push(ch); if (ch === '\n') sl = false; i++; continue; }

        // multi-line comment
        if (ml) { push(ch); if (ch === '*' && nx === '/') { push(nx); i += 2; ml = false; continue; } i++; continue; }

        // inside a string
        if (q) {
            if (esc) { buf += ch; esc = false; i++; continue; }
            if (ch === '\\') { buf += ch; esc = true; i++; continue; }
            if (ch === q) {
                // We are closing the string; decide if it's an object key.
                // Object key if: next non-WS char is ':' AND lastSig was '{' or ','
                const nextSig = peekNonWS(i + 1);
                const isObjKey = nextSig === ':' && (lastSig === '{' || lastSig === ',');
                push(emitString(buf, q, isObjKey));
                q = null; buf = ''; i++;

                // If it was an object key, we still need to emit the following ':' later;
                // main loop will handle it normally. lastSig will update when ':' is pushed.
                continue;
            }
            buf += ch; i++; continue;
        }

        // start of a string
        if (ch === '"' || ch === "'" || ch === '`') { q = ch; buf = ''; i++; continue; }

        // start of comments
        if (ch === '/' && nx === '/') { push(ch); sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { push(ch); ml = true; i++; continue; }

        push(ch);
        i++;
    }

    return `function __B64(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return atob(s)}}\n` + out;
}

// Optional eval(Function) wrapper (CSP-hostile)
function wrapWithEval(code) {
    return `eval(Function("return (function(){"+JSON.stringify(${JSON.stringify(code)})+"}).call(this)")());`;
}

// Replace spaces/newlines outside strings/comments (copy/paste hostile)
function sabotageWS(js) {
    let out = '', i = 0, n = js.length;
    let q=null, esc=false, sl=false, ml=false;
    while (i < n) {
        const ch = js[i], nx = js[i+1];
        if (sl) { out += ch; if (ch === '\n') sl = false; i++; continue; }
        if (ml) { out += ch; if (ch==='*'&&nx=== '/') { out+=nx; i+=2; ml=false; continue; } i++; continue; }
        if (q)  { out += ch; if (esc){esc=false;i++;continue;} if(ch==='\\'){esc=true;i++;continue;} if(ch===q) q=null; i++; continue; }
        if (ch === '"' || ch === "'" || ch === '`') { q=ch; out+=ch; i++; continue; }
        if (ch === '/' && nx === '/') { out += ch; sl=true; i++; continue; }
        if (ch === '/' && nx === '*') { out += ch; ml=true; i++; continue; }
        if (ch === ' ')  { out += '\u00A0'; i++; continue; }   // NBSP
        if (ch === '\n') { out += '\u2028'; i++; continue; }   // Unicode LS
        out += ch; i++;
    }
    return out;
}
