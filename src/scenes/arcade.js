import makePlayer from "../entities/Player";
import makeCabinet from "../components/Cabinet";
import buildPrizeCounter from "./prizeCounter";
import buildSkillsFloor from "./skillsFloor";

export const ROOM = { w: 2400, h: 1600, wall: 120};

export default function buildArcade(k, cabinets, socials, skills) {
    const { w, h, wall } = ROOM;

    //floor
    const floors = [
        [0, 0, w, h, "#14141f"],
        [-1000, 300, 1000, 1000, "#181624"],
        [-w, 300, 1000, 1000, "#141c24"],
    ];

    for (const [x, y, fw, fh, col] of floors) {
        k.add([
            k.rect(fw, fh),
            k.pos(x, y),
            k.color(k.Color.fromHex(col)),
            k.z(0),
        ]);
    }

    // walls
    const DOOR_TOP = 600;
    const DOOR_BOTTOM = 920;
    const walls = [
        //main
        [0, 0, w, wall],
        [0, h - wall, w, wall],
        [0, 0, wall, DOOR_TOP],
        [0, DOOR_BOTTOM, wall, h - DOOR_BOTTOM],
        [w - wall, 0, wall, DOOR_TOP],
        [w - wall, DOOR_BOTTOM, wall, h - DOOR_BOTTOM],
        [-1000, 300, 1000, wall],
        [-1000, 1180, 1000, wall],
        [-1000, 300, wall, 1000],
        [w, 300, 1000, wall],
        [w, 1180, 1000, wall],
        [w + 1000 - wall, 300, wall, 1000],
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

    //door label
    for (const [label, lx] of [["SKILLS ROOM", 260], ["SOCIALS ROOM", 2120]]) {
        k.add([
            k.text(label, { font: "ibm-bold", size: 32 }),
            k.pos(lx, 620),
            k.anchor("center"),
            k.color(k.Color.fromHex("#ff4ecd")),
            k.z(6),
        ]);
    }

    cabinets.forEach((c, i) => makeCabinet(k, c, i, cabinets.length));
    //buildSkillsFloor(k, skills);
    //buildPrizeCounter(k, socials, k.vec2(1750, 1150));
    makePlayer(k, k.vec2(w / 2, h -wall - 300), 700);
}