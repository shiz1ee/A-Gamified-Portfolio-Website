import { PALETTE } from "../constants";
import { isSocialModelVisibleAtom, store } from "../store";

const ICON_SCALE = 0.7;
export default function makeIcon(k, parent, posVec2, imageData, subtitle, labelSide = "below") {
    const icon = parent.add([
        k.sprite(imageData.name, {
            width: imageData.width * ICON_SCALE,
            height: imageData.height * ICON_SCALE,
        }),
        k.anchor("center"),
        k.pos(posVec2),
        k.z(5),
        k.opacity(0),
        k.offscreen({hide: true, distance: 300}),
    ]);

    const baseY = posVec2.y;
    const baseX = posVec2.x;
    const phase = Math.random() * Math.PI * 2;

    const isHorizontal = labelSide === "right" || labelSide === "left";

    icon.onUpdate(() => {
        const offset = Math.sin(k.time() * 2 + phase) * 6;

        if (isHorizontal) {
            icon.pos.x = baseX + offset;
        } else {
            icon.pos.y = baseY + offset;
        }
    });

    const iconW = imageData.width * ICON_SCALE;
    const iconH = imageData.height * ICON_SCALE;
    const labels = {
        below: { anchor: "center", pos: k.vec2(0, iconH / 2 + 40), angle: 0,  },
        above: { anchor: "center", pos: k.vec2(0, -iconH / 2 - 60), angle: 0, },
        right: { anchor: "left", pos:   k.vec2(120, 35), angle: -90, },
        left:  { anchor: "right", pos:  k.vec2(-iconW / 2 - 20, 0), angle: 90, },
    }
    const label = labels[labelSide] ?? labels.below;

    const subtitleText = icon.add([
        k.text(subtitle, { font: "ibm-bold", size: 32 }),
        k.color(0, 0, 0),
        k.opacity(0.855),
        k.anchor(label.anchor),
        k.pos(label.pos),
        k.rotate(label.angle),
        k.opacity(0),
    ]);

    return [icon, subtitleText];
}