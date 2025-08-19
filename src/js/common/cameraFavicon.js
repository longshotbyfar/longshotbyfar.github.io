import {DEV_FLAGS} from "./init.js";

function setFaviconFromCanvas(draw, size = 32) {
    const c = document.createElement('canvas');
    const s = (window.devicePixelRatio > 1 ? size * 2 : size);
    c.width = c.height = s;
    const ctx = c.getContext('2d');
    draw(ctx, s);
    let link = document.getElementById('live-favicon');
    if (!link) {
        link = document.createElement('link');
        link.id = 'live-favicon';
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = c.toDataURL('image/png') + '#' + Date.now().toString(36);
}

function drawNormal(ctx, S) {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#eee';
    ctx.font = `${S * 1}px serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText('∴', S * 0.2, S * 0.5);
}

function drawREC(ctx, S, {on = true} = {}) {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, S, S);
    ctx.fillStyle = '#eee';
    ctx.font = `${S * 0.32}px sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.fillText('REC', S * 0.1, S * 0.55);
    ctx.beginPath();
    ctx.fillStyle = on ? '#e33' : 'rgba(227,51,51,.25)';  // blink
    ctx.arc(S * 0.82, S * 0.22, S * 0.12, 0, Math.PI * 2);
    ctx.fill();
}

export function wireRecordingFavicon({blinkMs = 600} = {}) {
    let timer = null;
    let on = false;
    let forced = false;

    if (__DEV__ && DEV_FLAGS.devFavicon) {
        setFaviconFromCanvas((ctx) => {
            const S = 64;
            ctx.fillStyle = '#0f0';
            ctx.fillRect(0, 0, S, S);
            ctx.fillStyle = '#000';
            ctx.font = `64px monospace`;
            ctx.textBaseline = 'middle';
            ctx.fillText("D", S * 0.2, S * 0.6);
        });
        return;
    }

    function render() {
        if (forced || document.hidden) {
            setFaviconFromCanvas((ctx, S) => drawREC(ctx, S, {on}));
        } else {
            setFaviconFromCanvas(drawNormal);
        }
    }

    function startBlink() {
        if (timer) return;
        on = true;
        render();
        timer = setInterval(() => {
            on = !on;
            render();
        }, blinkMs);
    }

    function stopBlink() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        on = false;
        forced = false;
        render();
    }

    // Auto: blink when the tab is hidden; stop when visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) startBlink(); else stopBlink();
    });

    // initial paint
    render();

    // External control (e.g., during static hiss)
    return {
        enable() {
            forced = true;
            startBlink();
        },
        disable() {
            forced = false;
            if (!document.hidden) stopBlink();
        },
        pulse(ms = 2000) {
            this.enable();
            setTimeout(() => this.disable(), ms);
        }
    };
}