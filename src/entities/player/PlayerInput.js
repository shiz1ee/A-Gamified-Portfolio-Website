
export default function createPlayerInput(k) {
    let lastAxis = "vertical";
    ["a", "d","left", "right"].forEach((key) => {
        k.onKeyPress(key, () => {
            lastAxis = "horizontal";
        });
    });

    ["w", "s", "up", "down"].forEach((key) => {
        k.onKeyPress(key, () => {
            lastAxis = "vertical";
        });
    });

    return function getDirection(player) {
    let dir = k.vec2(0, 0);

        if (k.isKeyDown("left") || k.isKeyDown("a")) dir.x -= 1;
        if (k.isKeyDown("right") || k.isKeyDown("d")) dir.x += 1;
        if (k.isKeyDown("up") || k.isKeyDown("w")) dir.y -= 1;
        if (k.isKeyDown("down") || k.isKeyDown("s")) dir.y += 1;

        //tap to move
        if (dir.len() === 0 && k.isMouseDown("left")) {
            const toMouse = k.toWorld(k.mousePos()).sub(player.pos);
            if (toMouse.len() > 40) dir = toMouse;
        }
        
        if (dir.len() === 0) return dir;
        if (
            Math.abs(dir.x) > Math.abs(dir.y) ||
            (Math.abs(dir.x) === Math.abs(dir.y) &&
                lastAxis === "horizontal")
        )   {
                dir = k.vec2(Math.sign(dir.x), 0);
        } else {
            dir = k.vec2(0, Math.sign(dir.y));
        }
        return dir;
    };
}


