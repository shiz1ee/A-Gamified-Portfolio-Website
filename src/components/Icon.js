import { PALETTE } from "../constants";
import { isSocialModelVisibleAtom, store } from "../store";

export default function makeIcon(k, parent, posVec2, imageData, subtitle) {
    const icon = parent.add([
        k.sprite(imageData.name, {
            width: imageData.width,
            height: imageData.height,
        }),
        k.anchor("center"),
        k.pos(posVec2),
        k.z(5),
        k.opacity(0),
        k.offscreen({hide: true, distance: 300}),
    ]);

    const baseY = posVec2.y;
    const phase = Math.random() * Math.PI * 2;
    icon.onUpdate(() => {
        icon.pos.y = baseY + Math.sin(k.time() * 2 + phase) * 6;
    });

    const subtitleText = icon.add([
        k.text(subtitle, { font: "ibm-bold", size: 32 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.anchor("center"),
        k.pos(0, 100),
        k.opacity(0),
    ]);

    return [icon, subtitleText];
}