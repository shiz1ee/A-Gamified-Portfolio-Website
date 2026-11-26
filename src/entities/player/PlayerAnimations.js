
import { PlayerState } from "./PlayerState";

const STATE_SPRITES = {
    [PlayerState.IDLE]: "adam-idle-animated",
    [PlayerState.MOVING]: "adam-run",
};

export default function updatePlayerAnimation(player) {
    const targetSprite = STATE_SPRITES[player.state];
    const targetAnimation = player.facing;

    const animationKey = `${targetSprite}:${targetAnimation}`;

    if (player.currentAnimation === animationKey) return;

    player.stop();
    player.sprite = targetSprite;
    player.play(targetAnimation);

    player.currentAnimation = animationKey;
}
