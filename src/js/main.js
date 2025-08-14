import { qs } from './dom.js';
import { playStatic } from './staticAudio.js';
import { spawnStains } from './stains.js';
import { wireObjet } from './objet.js';
import { wireAsciiFlip } from './tableHover.js';
import { startEntropyTimer } from './entropyTimer.js';
import {wireRecordingFavicon} from "./cameraFavicon.js";
import {wireBSOD} from "./bsod.js";
import { initWhispers } from './whisper/init.js';


document.addEventListener('DOMContentLoaded', () => {
    // Memory easter egg
    if (localStorage.getItem("nachträglichkeit") === "true") {
        qs('#ghost').textContent = "Welcome. You were here. You don't remember, but I do.";
    }
    localStorage.setItem("nachträglichkeit", "true");

    wireAsciiFlip(qs('#table'));
    startEntropyTimer(qs('#timer'));
    wireObjet(qs('#objet'));
    spawnStains(5);
    wireBSOD({ oncePerVisit: true });
    const rec = wireRecordingFavicon({ blinkMs: 600 });

    qs('#static').addEventListener('click', () =>
            playStatic({ duration: 2.5, fadeOut: 1.0, level: 0.05 })
    );

    const whispersContainer = qs('#whispers');
    if (whispersContainer) initWhispers(whispersContainer);

    console.error("you are the error you came to inspect");
});
