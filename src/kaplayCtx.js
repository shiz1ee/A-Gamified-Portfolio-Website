import kaplay from "kaplay";

export default function makeKaplayCtx() {
    return kaplay({
        global: false,
        pixelDensity: window.innerWidth < 1000 ? 1 : 2,
        touchToMouse: true,
        debug: import.meta.env.DEV,
        debugKey: "f1",
        canvas: document.getElementById("game"),

    });
}