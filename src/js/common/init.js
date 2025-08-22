import {wireFavicon} from "./cameraFavicon.js";

export const DEV_FLAGS = {
    devFavicon: true,
    stainHuds: true
}

if (__DEV__) {
    globalThis.log = msg => console.log(msg);
    log("VIEWING IN DEV MODE");
}
else {
    globalThis.log = () => {};
}
const rec = wireFavicon();

