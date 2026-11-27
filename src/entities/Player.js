import {
    activeCabinetAtom,
    isEmailModalVisibleAtom,
    isProjectModalVisibleAtom,
    isSocialModelVisibleAtom,
    store,
} from "../store";
import updatePlayerAnimation from "./player/PlayerAnimations";
import { PlayerState, updatePlayerState } from "./player/PlayerState";
import createPlayerInput from "./player/PlayerInput";

export default function makePlayer(k, posVec2, speed) {
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


    const isUiOpen = () => 
        store.get(activeCabinetAtom) ||
        store.get(isSocialModelVisibleAtom) ||
        store.get(isEmailModalVisibleAtom) ||
        store.get(isProjectModalVisibleAtom);

    k.setCamPos(player.pos);
    const getDirection = createPlayerInput(k);

    


    player.onUpdate(() => {
        // smooth like butter cam flow
        k.setCamPos(
            k.getCamPos().lerp(player.pos, 1 - Math.exp(-6 * k.dt()))
        );

        const dir = isUiOpen()
            ? k.vec2(0, 0)
            : getDirection(player);

        if (dir.len() > 0) {

            player.facing = 
                dir.x !== 0
                    ? dir.x > 0 ? "right" : "left"
                    : dir.y > 0 ? "down"  : "up";
            player.move(dir.scale(speed));
        }
        player.direction = dir

        updatePlayerState(player, dir.len() > 0, k.dt());
        updatePlayerAnimation(k, player);
    });
}