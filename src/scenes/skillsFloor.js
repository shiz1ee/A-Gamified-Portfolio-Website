import makeSkillIcon from "../components/SkillIcon";
import { makeAppear } from "../utils";
import { PALETTE } from "../constants";

export default function buildSkillsFloor(k, skills) {
    k.add([
        k.text("PUSH THE PRIZES", { font: "ibm-bold", size: 40 }),
        k.pos(1000, 640),
        k.anchor("center"),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.opacity(0.5),
        k.z(1),
    ]);

    const container = k.add([k.pos(0, 0), k.opacity(0)]);

    for (const skill of skills) {
        makeSkillIcon(
            k,
            container,
            k.vec2(skill.pos.x, skill.pos.y),
            skill.imageData,
            skill.name
        );
    }

    makeAppear(k, container);
}