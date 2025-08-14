export default function frictionPack() {
    const decoyBanner = {
        name: 'decoy-banner',
        setup(build) {
            build.onStart(() => {
                build.initialOptions.banner ||= {};
                build.initialOptions.banner.js =
                    `/* build:${Date.now().toString(36)} */
(function decoyMain(){var App={init:function(){console.log("init app")},run:function(){console.log("running…")}};setTimeout(function(){try{console.clear()}catch(_){}},20)})();\n`
                    + (build.initialOptions.banner.js || '');
            });
        }
    };
    return [decoyBanner];
}

// whitespace sabotage (outside strings/comments)
export function sabotageWhitespace(js) {
    let out = '', i = 0, n = js.length;
    let quote = null, esc = false, sl = false, ml = false;
    while (i < n) {
        const ch = js[i], nx = js[i+1];
        if (sl) { out += ch; if (ch === '\n') sl = false; i++; continue; }
        if (ml) { out += ch; if (ch==='*'&&nx=== '/') { out+=nx; i+=2; ml=false; continue; } i++; continue; }
        if (quote) { out += ch; if (esc) { esc=false; i++; continue; } if (ch==='\\') { esc=true; i++; continue; } if (ch===quote) quote=null; i++; continue; }
        if (ch === '"' || ch === "'" || ch === '`') { quote = ch; out += ch; i++; continue; }
        if (ch === '/' && nx === '/') { out += ch; sl = true; i++; continue; }
        if (ch === '/' && nx === '*') { out += ch; ml = true; i++; continue; }
        if (ch === ' ') { out += '\u00A0'; i++; continue; }
        if (ch === '\n') { out += '\u2028'; i++; continue; }
        out += ch; i++;
    }
    return out;
}