import {
    activeCabinetAtom,
    isEmailModalVisibleAtom,
    isProjectModalVisibleAtom,
    isSocialModelVisibleAtom,
    store,
} from "../store";

export default function makePlayer(k, posVec2, speed) {
    const player = k.add([
        k.sprite("player", { anim: "walk-down-idle"}),
        k.scale(8),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 5, 10) }),
        k.body(),
        k.pos(posVec2),
        k.z(10),
        "player",
        { direction: k.vec2(0, 0), facing: "down"},
    ]);

    const isUiOpen = () => 
        store.get(activeCabinetAtom) ||
        store.get(isSocialModelVisibleAtom) ||
        store.get(isEmailModalVisibleAtom) ||
        store.get(isProjectModalVisibleAtom);
    
    player.onUpdate(() => {
        // smooth like butter cam flow
        k.camPos(k.camPos().lerp(player.pos, 0.12));

        let dir = k.vec2(0, 0);

        if (!isUiOpen()) {
            if (k.isKeyDown("left") || k.isKeyDown("a")) dir.x -= 1;
            if (k.isKeyDown("right") || k.isKeyDown("d")) dir.x += 1;
            if (k.isKeyDown("up") || k.isKeyDown("w")) dir.y -= 1;
            if (k.isKeyDown("down") || k.isKeyDown("s")) dir.y += 1;

            //tap to move
            if (dir.len() === 0 && k.isMouseDown("left")) {
                const toMouse = k.toWorld(k.mousePos()).sub(player.pos);
                if (toMouse.len() > 40) dir = toMouse;
            }
        }

        if (dir.len() > 0) {
            dir = dir.unit();
            player.facing = 
                Math.abs(dir.x) > Math.abs(dir.y)
                    ? dir.x > 0 ? "right" : "left"
                    : dir.y > 0 ? "down" : "up";
            player.move(dir.scale(speed));
        }
        player.direction = dir;

        const animName = 
            dir.len() > 0 ? `walk-${player.facing}` : `walk-${player.facing}-idle`;
        if (player.getCurAnim()?.name !== animName) player.play(animName);
    });

    return player;
}