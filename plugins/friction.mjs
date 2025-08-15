// plugins/friction.mjs
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

// Encode plain string literals to __B64("…") in already-bundled code
function encodeStrings(js) {
    let out = '', i = 0, n = js.length;
    let q = null, esc = false, sl=false, ml=false, buf = '';
    const emit = (s, quote) => {
        if (quote === '`' && s.includes('${')) return quote + s + quote;
        const plain = s
            .replace(/\\n/g,'\n').replace(/\\r/g,'\r').replace(/\\t/g,'\t')
            .replace(/\\`/g,'`').replace(/\\"/g,'"').replace(/\\\\/g,'\\');
        if (plain.length < MIN_B64_LENGTH) return quote + s + quote;
        const b64 = Buffer.from(plain, 'utf8').toString('base64');
        return `__B64("${b64}")`;
    };
    while (i < n) {
        const ch = js[i], nx = js[i+1];
        if (sl) { out += ch; if (ch === '\n') sl = false; i++; continue; }
        if (ml) { out += ch; if (ch==='*'&&nx=== '/') { out+=nx; i+=2; ml=false; continue; } i++; continue; }
        if (q) {
            if (esc) { buf += ch; esc=false; i++; continue; }
            if (ch === '\\') { buf += ch; esc=true; i++; continue; }
            if (ch === q) { out += emit(buf, q); q=null; buf=''; i++; continue; }
            buf += ch; i++; continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { q=ch; buf=''; i++; continue; }
        if (ch === '/' && nx === '/') { out += ch; sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { out += ch; ml = true; i++; continue; }
        out += ch; i++;
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
