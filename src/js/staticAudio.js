let ctx, gain, filter;
const BASE_GAIN = 0.05;

function ensureCtx() {
    if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        gain = ctx.createGain(); gain.gain.value = 0;
        filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 6000;
        filter.connect(gain); gain.connect(ctx.destination);
    }
}

function playStatic({ duration=2.5, fadeOut=1.0, level=BASE_GAIN } = {}) {
    ensureCtx();
    const frames = ctx.sampleRate * duration;
    const buf = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i=0; i<frames; i++) data[i] = Math.random()*2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(filter);

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(level, now);
    gain.gain.setValueAtTime(level, now + (duration - fadeOut));
    gain.gain.linearRampToValueAtTime(0, now + duration);

    src.start();
    src.stop(now + duration);
}

export function mountStaticOnClick(el, opts) {
    el.addEventListener('click', () => playStatic(opts));
}
