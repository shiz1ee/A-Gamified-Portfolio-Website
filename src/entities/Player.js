import {
    activeCabinetAtom,
    isEmailModalVisibleAtom,
    isProjectModalVisibleAtom,
    isSocialModelVisibleAtom,
    store,
} from "../store";
import {
    findNearestSeat,
    createSeatPrompt,
} from "./player/PlayerInteraction";
import updatePlayerAnimation from "./player/PlayerAnimations";
import { PlayerState, updatePlayerState } from "./player/PlayerState";

export default function makePlayer(k, posVec2, speed, seats = []) {
    const player = k.add([
        k.sprite("adam-idle-animated", { anim: "down"}),
        k.scale(4),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 10, 5), offset: k.vec2(0, 13), }),
        k.body(),
        k.pos(posVec2),
        k.z(10),
        "player",
        { direction: k.vec2(0, 0),
            facing: "down",
            currentAnimation: "adam-idle-animated:down",
            state: PlayerState.IDLE,
            previousState: null,
            stateTime: 0,
            },

    ]);
    const seatPrompt = createSeatPrompt(k);
    let nearestSeat = null;

    const isUiOpen = () => 
        store.get(activeCabinetAtom) ||
        store.get(isSocialModelVisibleAtom) ||
        store.get(isEmailModalVisibleAtom) ||
        store.get(isProjectModalVisibleAtom);

    k.camPos(player.pos);


    player.onUpdate(() => {
        // smooth like butter cam flow
        k.camPos(
            k.camPos().lerp(player.pos, 1 - Math.exp(-6 * k.dt()))
        );

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
            
            if (Math.abs(dir.x) > Math.abs(dir.y)) {
                dir = k.vec2(Math.sign(dir.x), 0);
            } else {
                dir = k.vec2(0, Math.sign(dir.y));
            }

            player.facing = 
                Math.abs(dir.x) > Math.abs(dir.y)
                    ? dir.x > 0 ? "right" : "left"
                    : dir.y > 0 ? "down" : "up";
            player.move(dir.scale(speed));
        }
        player.direction = dir

        updatePlayerState(player, dir.len() > 0, k.dt());

        updatePlayerAnimation(k, player);
        nearestSeat = isUiOpen()
            ? null
            : findNearestSeat(player, seats);
        seatPrompt.opacity = nearestSeat ? 1 : 0;

        if (nearestSeat) {
            seatPrompt.pos = player.pos.add(0, -85);
        }
    });

    k.onKeyPress("f", () => {
        if (isUiOpen() || !nearestSeat) return;

        console.log("selected seat:", nearestSeat);
    })

    return player;
}