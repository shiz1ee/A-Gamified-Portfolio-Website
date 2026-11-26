export const PlayerState = Object.freeze({
    IDLE: "idle",
    MOVING: "moving",
});

export function setPlayerState(player, nextState) {
    if (player.state === nextState) return;
    console.log(`${player.state} -> ${nextState}`);

    player.previousState = player.state;
    player.state = nextState;
    player.stateTime = 0;
}