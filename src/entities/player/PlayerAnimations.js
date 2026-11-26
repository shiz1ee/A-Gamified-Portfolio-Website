export default function updatePlayerAnimation(player, isMoving) {
    const targetSprite = isMoving
        ? "adam-run"
        : "adam-idle-animated";
    const targetAnimation = player.facing;

    if (player.sprite !== targetSprite) {
        player.sprite = targetSprite;
        player.play(targetAnimation);
        return;
    }

    if (player.getCurAnim()?.name !== targetAnimation) {
        player.play(targetAnimation);
    }
}