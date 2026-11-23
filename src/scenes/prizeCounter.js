import makeSocialIcon from "../components/SocialIcon";
import makeEmailIcon from "../components/EmailIcon";
import { makeAppear } from "../utils";
import { PALETTE } from "../constants";

const SPACING = 250;

export default function buildPrizeCounter(k, socials, origin) {
    const rowWidth = (socials.length - 1) * SPACING;

    const shelf = k.add([
        k.rect(rowWidth + 360, 60, { radius: 8 }),
        k.pos(origin.x, origin.y - 140),
        k.anchor("center"),
        k.color(k.Color.fromHex("#ff4ecd")),
        k.area(),
        k.body({ isStatic: true }),
        k.z(4),
    ]);

    shelf.add([
        k.rect(rowWidth + 352, 52, { radius: 5 }),
        k.anchor("center"),
        k.color(k.Color.fromHex("#2a2a45")),
    ]);

    shelf.add([
        k.text("PRIZE COUNTER", { font: "ibm-bold", size: 32 }),
        k.anchor("center"),
        k.color(k.Color.fromHex(PALETTE.color1)),
    ]);

    const container = k.add([k.pos(origin), k.opacity(0)]);

    socials.forEach((s, i) => {
        const pos = k.vec2(i * SPACING - rowWidth / 2, 0);
        if (s.name === "Email") {
            makeEmailIcon(k, container, pos, s.imageData, s.name, s.email);
        } else {
            makeSocialIcon(k, container, pos, s.imageData, s.name, s.link, s.description);
        }
    });

    makeAppear(k, container);
}