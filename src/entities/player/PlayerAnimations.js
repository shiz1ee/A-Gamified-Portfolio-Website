
import { PlayerState } from "./PlayerState";

const STATE_SPRITES = {
    [PlayerState.IDLE]: "adam-idle-animated",
    [PlayerState.MOVING]: "adam-run",
    [PlayerState.PHONE]: "adam-phone",
};

export default function updatePlayerAnimation(k, player) {
    const targetSprite = STATE_SPRITES[player.state];

    const targetAnimation =
    player.state === PlayerState.PHONE
        ? "phone"
        : player.facing;

    const animationKey = `${targetSprite}:${targetAnimation}`;

    if (player.currentAnimation === animationKey) return;

    player.stop();

    player.use(k.sprite(targetSprite, {
        anim: targetAnimation,
    }));

    player.currentAnimation = animationKey;
}
