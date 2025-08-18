// SETUP DEV FLAG

globalThis['__DEV__'] ??= false;

globalThis.log = __DEV__ ? (msg => console.log(msg)) : (() => {});
log("VIEWING IN DEV MODE");

import {mountStaticOnClick} from './staticAudio.js';
import {spawnStains} from './stain.js';
import {wireObjet} from './objet.js';
import {wireAsciiFlip} from './tableHover.js';
import {startEntropyTimer} from './entropyTimer.js';
import {wireRecordingFavicon} from "./cameraFavicon.js";
import {initWhispers} from './whisper/init.js';
import {wireBSOD} from "./bsod.js";
import {createWheel} from "./wheel.js";
import {mountMasonry} from "./masonry.js";
import {slantCards} from "./cardSlanter.js";

const qs = (sel, el=document) => el.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
    const masonry = mountMasonry('.stack');
    slantCards('.card');
    const rec = wireRecordingFavicon({blinkMs: 600});

    startEntropyTimer(qs('#timer'), qs('#ghost'));
    wireAsciiFlip(qs('#tableFlip'));
    wireObjet(qs('#objet'));
    spawnStains(3, {dev: __DEV__});
    wireBSOD();

    const wheel = createWheel('#wheel', {
        speed: 180,
        padding: 1.5,
        gap: [4000, 10000],
        bothDirections: true
    });
    wheel.start();

    mountStaticOnClick(qs('#static'),{duration: 2.5, fadeOut: 1.0, level: 0.05})

    const whispersContainer = qs('#whispers');
    if (whispersContainer) initWhispers(whispersContainer);

    console.warn("you are the error you came to inspect");
});
