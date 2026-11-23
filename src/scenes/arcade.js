import makePlayer from "../entities/Player";
import makeCabinet from "../components/Cabinet";
import buildPrizeCounter from "./prizeCounter";
import buildSkillsFloor from "./skillsFloor";

export const ROOM = { w: 2400, h: 1600, wall: 120};

export default function buildArcade(k, cabinets, socials, skills) {
    const { w, h, wall } = ROOM;

    //floor
    k.add([
        k.rect(w, h),
        k.pos(0, 0),
        k.color(k.Color.fromHex("#14141f")),
        k.z(0),
    ]);

    // walls
    const walls = [
        [0, 0, w, wall],
        [0, h - wall, w, wall],
        [0, 0, wall, h],
        [w - wall, 0, wall, h],
    ];

    for (const [x, y, ww, hh] of walls) {
        k.add([
            k.rect(ww, hh),
            k.pos(x, y),
            k.color(k.Color.fromHex("#2a2a45")),
            k.area(),
            k.body({ isStatic: true}),
            k.z(5),
            "wall",
        ]);
    }

    //sign
    k.add([
        k.text("DEAN'S ARCADE", { font: "ibm-bold", size: 72}),
        k.pos(w / 2, wall / 2),
        k.anchor("center"),
        k.color(k.Color.fromHex("#ff4ecd")),
        k.z(6),
    ]);

    cabinets.forEach((c, i) => makeCabinet(k, c, i, cabinets.length));
    buildSkillsFloor(k, skills);
    buildPrizeCounter(k, socials, k.vec2(1750, 1150));
    makePlayer(k, k.vec2(w / 2, h -wall - 300), 700);
}