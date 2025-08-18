// plugins/friction.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const MIN_B64_LENGTH = 2;

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

                const root = build.initialOptions.outdir || dirname(build.initialOptions.outfile || '');
                const outputs = Object.entries(result.metafile.outputs)
                    .filter(([file, meta]) => file.endsWith('.js') && meta.bytes > 0);

                for (const [outPath] of outputs) {
                    const abs = join(root, outPath.replace(root + '/', '').replace(/^\.?\/*/, ''));
                    let code = await safeRead(abs);
                    if (code == null) continue;

                    if (base64Strings) code = encodeStrings(code);
                    if (wrapEval)      code = wrapWithEval(code);
                    if (sabotageWhitespace) code = sabotageWS(code);

                    await writeFile(abs, code, 'utf8');
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
    const MIN_B64_LENGTH = 2; // or import from outer scope
    let out = '', i = 0, n = js.length;

    // modes
    let q = null, esc = false, sl = false, ml = false, buf = '';

    // context
    let lastSig = null;                 // last significant char already emitted
    let afterImport = false;            // we saw the keyword 'import' (possible bare import)
    let afterFrom = false;              // we saw the keyword 'from' (next string is a module specifier)

    const push = (s) => {
        out += s;
        for (let k = 0; k < s.length; k++) {
            const ch = s[k];
            if (!/\s/.test(ch)) lastSig = ch;
        }
    };

    const peekNonWS = (from) => {
        for (let j = from; j < n; j++) if (!/\s/.test(js[j])) return js[j];
        return '';
    };

    const emitString = (rawContent, quoteChar, isObjKey, isModuleSpecifier) => {
        // Never transform ESM module specifiers: import "x"; export … from "x"; import … from "x"
        if (isModuleSpecifier) return quoteChar + rawContent + quoteChar;

        // Leave template literals with interpolation untouched
        if (quoteChar === '`' && rawContent.includes('${')) return quoteChar + rawContent + quoteChar;

        // Decode the literal safely to true string
        let plain;
        try { plain = JSON.parse(quoteChar + rawContent + quoteChar); }
        catch { return quoteChar + rawContent + quoteChar; }

        if (plain.length < MIN_B64_LENGTH) return quoteChar + rawContent + quoteChar;

        const b64 = Buffer.from(plain, 'utf8').toString('base64');
        const call = `__B64("${b64}")`;
        return isObjKey ? `[${call}]` : call;
    };

    const readIdent = () => {
        let j = i, id = '';
        while (j < n) {
            const ch = js[j];
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' || ch === '$' || (id && ch >= '0' && ch <= '9')) {
                id += ch; j++;
            } else break;
        }
        if (id) { push(id); i = j; }
        return id;
    };

    while (i < n) {
        const ch = js[i], nx = js[i + 1];

        // single-line comment
        if (sl) { push(ch); if (ch === '\n') sl = false; i++; continue; }
        // multi-line comment
        if (ml) { push(ch); if (ch === '*' && nx === '/') { push(nx); i += 2; ml = false; continue; } i++; continue; }

        // inside string
        if (q) {
            if (esc) { buf += ch; esc = false; i++; continue; }
            if (ch === '\\') { buf += ch; esc = true; i++; continue; }
            if (ch === q) {
                const nextSig = peekNonWS(i + 1);
                const isObjKey = nextSig === ':' && (lastSig === '{' || lastSig === ',');
                const isModuleSpecifier = afterFrom || (afterImport && !afterFrom); // bare import OR after 'from'

                push(emitString(buf, q, isObjKey, isModuleSpecifier));

                // reset module-specifier state after consuming the string
                afterImport = false; afterFrom = false;

                q = null; buf = ''; i++;
                continue;
            }
            buf += ch; i++; continue;
        }

        // start of string
        if (ch === '"' || ch === "'" || ch === '`') { q = ch; buf = ''; i++; continue; }

        // comments
        if (ch === '/' && nx === '/') { push(ch); sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { push(ch); ml = true; i++; continue; }

        // identifiers: track 'import' / 'from'
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' || ch === '$') {
            const id = readIdent();
            if (id === 'import') { afterImport = true; afterFrom = false; }
            else if (id === 'from') { afterFrom = true; } // 'export * from "x"' or 'import … from "x"'
            continue;
        }

        // Any non-ws token that isn't a string may appear between 'import' and the specifier.
        // We keep afterImport=true until we actually consume the next string or hit a ';'.
        if (ch === ';') { afterImport = false; afterFrom = false; }

        push(ch);
        i++;
    }

    // inject helper
    return `function __B64(s){try{return decodeURIComponent(escape(atob(s)))}catch(e){return atob(s)}}\n` + out;
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
