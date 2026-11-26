const SPRITE_PATH = "./sprites/adam/";

export default function loadPlayerAssets(k) {
    k.loadSprite(
        "adam-idle",
        SPRITE_PATH + "Adam_idle_16x16.png",
        {
            sliceX: 4,
            sliceY: 1,
            anims: {
                right: 0,
                up: 1,
                left: 2,
                down: 3,
            },
        }
    );

    k.loadSprite(
        "adam-idle-animated",
        SPRITE_PATH + "Adam_idle_anim_16x16.png",
        {
            sliceX: 24,
            sliceY: 1,
            anims: {
                right: { from: 0, to: 5, speed: 6, loop: true },
                up: { from: 6, to: 11, speed: 6, loop: true },
                left: { from: 12, to: 17, speed: 6, loop: true },
                down: { from: 18, to: 23, speed: 6, loop: true },
            },
        }
    );

    k.loadSprite(
        "adam-run",
        SPRITE_PATH + "Adam_run_16x16.png",
        {
            sliceX: 24,
            sliceY: 1,
            anims: {
                right: { from: 0, to: 5, speed: 10, loop: true },
                up: { from: 6, to: 11, speed: 10, loop: true },
                left: { from: 12, to: 17, speed: 10, loop: true },
                down: { from: 18, to: 23, speed: 10, loop: true },
            },
        }
    );

    k.loadSprite(
        "adam-phone",
        SPRITE_PATH + "Adam_phone_16x16.png",
        {
            sliceX: 9,
            sliceY: 1,
            anims: {
                phone: {
                    from: 0,
                    to: 8,
                    speed: 6,
                    loop: false,
                },
            },
        }
    );
}
