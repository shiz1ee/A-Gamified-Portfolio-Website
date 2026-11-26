export default function updatePlayerAnimation(player, isMoving) {
    const targetSprite = isMoving
        ? "adam-run"
        : "adam-idle-animated";

    const targetAnimation = player.facing;

    const animationKey = `${targetSprite}:${targetAnimation}`;

    if (player.currentAnimation === animationKey) return;

    player.stop();
    player.sprite = targetSprite;
    player.play(targetAnimation);

    player.currentAnimation = animationKey;
}