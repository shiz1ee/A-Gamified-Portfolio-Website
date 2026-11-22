import { activeCabinetAtom, store } from "../store"

const W = 180;
const H = 260;

export default function makeCabinet(k, data) {
    const accent = k.Color.fromHex(data.color);
    
    const cab = k.add([
        k.rect(W, H, { radius: 8 }),
        k.pos(data.x, data.y),
        k.anchor("center"),
        k.color(k.Color.fromHex("#1d1d33")),
        k.outline(6, accent),
        k.area(),
        k.body({ isStatic: true }),
        k.z(4),
        "cabinet",
    ]);

    cab.add([
        k.rect(W - 20, 50, { radius: 4 }),
        k.anchor("center"),
        k.pos(0, -H / 2 + 35),
        k.color(accent),
    ]);
    cab.add([
        k.text(data.title, { font: "ibm-bold", size: 18, width: W - 30, align: "center" }),
        k.anchor("center"),
        k.pos(0, -H / 2 + 35),
        k.color(10, 10, 25),
    ]);

    //screen
    cab.add([
        k.rect(W - 40, 110, { radius: 4 }),
        k.anchor("center"),
        k.pos(0, -10),
        k.color(k.Color.fromHex("#0b0b14")),
        k.outline(3, accent),
    ]);
    const screenText = cab.add([
        k.text("PLAY", { font: "ibm-bold", size: 28 }),
        k.anchor("center"),
        k.pos(0, -10),
        k.color(accent),
    ]);

    //ctrl pannal
    cab.add([
        k.rect(W - 40, 30, { radius: 4 }),
        k.anchor("center"),
        k.pos(0, 80),
        k.color(k.Color.fromHex("#2a2a45")),
    ]);
    cab.add([k.circle(8), k.anchor("center"), k.pos(-30, 80), k.color(accent)]);
    cab.add([k.circle(8), k.anchor("center"), k.pos(10, 80), k.color(255, 255, 255)]);

    const prompt = cab.add([
        k.text("PRESS E TO PLAY", { font: "ibm-bold", size: 28 }),
        k.anchor("center"),
        k.pos(0, H / 2 + 30),
        k.color(255, 255, 255),
        k.opacity(0),
    ]);

    // proximity zone infront of the arcade to detect the press of E 
    const zoneCenter = k.vec2(data.x, data.y + H / 2 + 70);
    const ZONE_HALF_W = (W + 40) / 2;
    const ZONE_HALF_H = 70;
    let near = false;

    const open = () => {
        if (near && !store.get(activeCabinetAtom)) {
            store.set(activeCabinetAtom, data);
            console.log("after set:", store.get(activeCabinetAtom)?.id);
        }
    };

    cab.onClick(open);

    cab.onUpdate(() => {
        const player = k.get("player")[0];
        near = 
            !!player &&
            Math.abs(player.pos.x - zoneCenter.x) <= ZONE_HALF_W &&
            Math.abs(player.pos.y - zoneCenter.y) <= ZONE_HALF_H;

        prompt.opacity = near && !store.get(activeCabinetAtom) ? 1: 0;

        if (near && k.isKeyPressed("e")) open();

        screenText.opacity = Math.floor(k.time() * 2) % 2 ? 1 : 0.3;
    });

    return cab;
}