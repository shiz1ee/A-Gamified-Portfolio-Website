export const PlayerState = Object.freeze({
    IDLE: "idle",
    MOVING: "moving",
    PHONE: "phone",
});

export function setPlayerState(player, nextState) {
    if (player.state === nextState) return;
    console.log(`${player.state} -> ${nextState}`);

    player.previousState = player.state;
    player.state = nextState;
    player.stateTime = 0;
}

const PHONE_IDLE_DELAY = 11;
const PHONE_DURATION = 5;

export function updatePlayerState(player, isMoving, dt) {
    player.stateTime += dt;

    if (isMoving) {
        setPlayerState(player, PlayerState.MOVING);
        return;
    }

    switch (player.state) {
        case PlayerState.MOVING:
            setPlayerState(player, PlayerState.IDLE);
            break;
        
        case PlayerState.IDLE:
            if (player.stateTime >= PHONE_IDLE_DELAY) {
                setPlayerState(player, PlayerState.PHONE);
            }
            break;
        
        case PlayerState.PHONE:
            if (player.stateTime >= PHONE_DURATION) {
                setPlayerState(player, PlayerState.IDLE);
            }
            break;
    }
}