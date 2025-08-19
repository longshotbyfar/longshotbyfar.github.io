// plugins/friction.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const B64_HELPER = `;globalThis.__B64||(globalThis.__B64=function(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return atob(s)}});\n`;

function injectHelperAfterImports(js) {
    // grab leading run of import/export declarations (semi-terminated)
    const m = js.match(/^(?:\s*(?:import|export)(?:(?!\n\s*(?:import|export)).)*;\s*)+/s);
    if (m) return m[0] + B64_HELPER + js.slice(m[0].length);
    return B64_HELPER + js;
}

export default function frictionPlugin({
                                           base64Strings = true,
                                           injectDecoy = true,
                                           wrapEval = false,
                                           sabotageWhitespace = true
                                       } = {}) {
    return {
        name: 'friction',
        setup(build) {
            if (injectDecoy) {
                build.onStart(() => {
                    build.initialOptions.banner ||= {};
                    build.initialOptions.banner.js =
                        `/* build:${Date.now().toString(36)} */
(function(){var App={init:function(){},run:function(){}};try{console.clear()}catch(_){}})();\n` +
                        (build.initialOptions.banner.js || '');
                });
            }

            // Ensure we can see outputs
            build.initialOptions.metafile = true;

            build.onEnd(async (result) => {
                if (!result?.metafile) return;

                const outRoot =
                    build.initialOptions.outdir ??
                    (build.initialOptions.outfile ? dirname(build.initialOptions.outfile) : process.cwd());

                // Collect JS outputs (skip sourcemaps and non-JS assets)
                const jsOutputs = Object.keys(result.metafile.outputs)
                    .filter(p => p.endsWith('.js'));

                for (const rel of jsOutputs) {
                    const abs = join(outRoot, rel);

                    try {
                        let code = await safeRead(abs);
                        if (code == null) continue;

                        // ---- transforms (order matters) ----
                        if (base64Strings)       code = encodeStrings(code);      // no helper prepend here
                        if (wrapEval)            code = wrapWithEval(code);
                        if (sabotageWhitespace)  code = sabotageWS(code);

                        // Inject __B64 helper *after* top-level import/export block, once
                        if (!/\bglobalThis\.__B64\b/.test(code)) {
                            code = injectHelperAfterImports(code);
                        }

                        await writeFile(abs, code, 'utf8');
                    } catch (e) {
                        console.error(`[friction] failed on ${rel}: ${e?.message || e}`);
                        // Re-throw if you want the whole build to stop:
                        // throw e;
                    }
                }
            });
        }
    };
}

async function safeRead(p) {
    try { return await readFile(p, 'utf8'); } catch { return null; }
}

/* ---------- helpers ---------- */

function encodeStrings(js) {
    const MIN_B64_LENGTH = 2;
    let out = '', i = 0, n = js.length;

    let q = null, esc = false, sl = false, ml = false, buf = '';
    let lastSig = null;
    let afterImport = false;     // saw 'import'
    let afterFrom = false;       // saw 'from'
    let sawAssert = false;       // just saw 'assert'
    let sawWith = false;         // just saw 'with'
    let inImportAttrs = false;   // inside {...} following assert/with
    let attrDepth = 0;

    const push = s => { out += s; for (let k=0;k<s.length;k++) if (!/\s/.test(s[k])) lastSig = s[k]; };
    const peekNonWS = from => { for (let j=from;j<n;j++) if (!/\s/.test(js[j])) return js[j]; return ''; };

    const emitString = (raw, quote, isObjKey, isModuleSpecifier, inAttrs) => {
        if (isModuleSpecifier || inAttrs) return quote + raw + quote;                 // skip in specifier & in import attrs
        if (quote === '`' && raw.includes('${')) return quote + raw + quote;          // skip template with interp
        let plain; try { plain = JSON.parse(quote + raw + quote); } catch { return quote + raw + quote; }
        if (plain.length < MIN_B64_LENGTH) return quote + raw + quote;
        const b64 = Buffer.from(plain, 'utf8').toString('base64');
        const call = `__B64("${b64}")`;
        return isObjKey ? `[${call}]` : call;
    };

    const readIdent = () => {
        let j = i, id = '';
        while (j < n) {
            const ch = js[j];
            if ((ch>='a'&&ch<='z')||(ch>='A'&&ch<='Z')||ch==='_'||ch==='$', id && ch>='0'&&ch<='9') { id += ch; j++; }
            else break;
        }
        if (id) { push(id); i = j; }
        return id;
    };

    while (i < n) {
        const ch = js[i], nx = js[i+1];

        if (sl) { push(ch); if (ch === '\n') sl = false; i++; continue; }
        if (ml) { push(ch); if (ch === '*' && nx === '/') { push(nx); i+=2; ml=false; continue; } i++; continue; }

        if (q) {
            if (esc) { buf += ch; esc=false; i++; continue; }
            if (ch === '\\') { buf += ch; esc=true; i++; continue; }
            if (ch === q) {
                const nextSig = peekNonWS(i + 1);
                const isObjKey = !inImportAttrs && nextSig === ':' && (lastSig === '{' || lastSig === ',');
                const isModuleSpecifier = afterFrom || (afterImport && !afterFrom);
                push(emitString(buf, q, isObjKey, isModuleSpecifier, inImportAttrs));
                // reset import specifier markers after the spec string
                if (isModuleSpecifier) { afterImport = false; afterFrom = false; }
                q = null; buf=''; i++; continue;
            }
            buf += ch; i++; continue;
        }

        if (ch === '"' || ch === "'" || ch === '`') { q = ch; buf=''; i++; continue; }

        if (ch === '/' && nx === '/') { push(ch); sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { push(ch); ml = true; i++; continue; }

        // identifiers
        if ((ch>='a'&&ch<='z')||(ch>='A'&&ch<='Z')||ch==='_'||ch==='$') {
            const id = readIdent();
            if (id === 'import') { afterImport = true; afterFrom = false; }
            else if (id === 'from') { afterFrom = true; }
            else if (id === 'assert') { sawAssert = true; }
            else if (id === 'with') { sawWith = true; }
            continue;
        }

        // entering import attributes: 'assert { ... }' or 'with { ... }'
        if ((sawAssert || sawWith) && ch === '{') {
            inImportAttrs = true; attrDepth = 1; sawAssert = sawWith = false; push(ch); i++; continue;
        }
        if (inImportAttrs) {
            push(ch);
            if (ch === '{') attrDepth++;
            else if (ch === '}') { attrDepth--; if (attrDepth === 0) inImportAttrs = false; }
            i++; continue;
        }

        if (ch === ';') { afterImport = false; afterFrom = false; sawAssert = false; sawWith = false; }

        push(ch); i++;
    }

    return out; // helper is injected later
}

function wrapWithEval(code) {
    return `eval(Function("return (function(){"+JSON.stringify(${JSON.stringify(code)})+"}).call(this)")());`;
}

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
        if (ch === ' ')  { out += '\u00A0'; i++; continue; }
        if (ch === '\n') { out += '\u2028'; i++; continue; }
        out += ch; i++;
    }
    return out;
}
