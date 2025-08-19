import {wireRecordingFavicon} from "./cameraFavicon.js";

export const DEV_FLAGS = {
    devFavicon: true,
    stainHuds: false,
}
globalThis.log = __DEV__ ? (msg => console.log(msg)) : (() => {});
log("VIEWING IN DEV MODE");

const rec = wireRecordingFavicon();

