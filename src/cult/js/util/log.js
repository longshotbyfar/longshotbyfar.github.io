const RING = 10000;
export const events = [];
export function logEvent(type, payload) {
    if (events.length >= RING) events.shift();
    events.push({tick: world.tick, type, ...payload});
}