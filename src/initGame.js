import makeEmailIcon from "./components/EmailIcon";
import makeSection from "./components/Section";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import makeKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";
import makeSocialIcon from "./components/SocialIcon";
import { makeAppear } from "./utils";
import makeSkillIcon from "./components/SkillIcon";


export default async function initGame() {

    const generalData = await (await fetch('./configs/generalData.json')).json();
    const socialsData = await (await fetch("./configs/socialsData.json")).json();
    const skillData = await (await fetch("./configs/skillsData.json")).json();

    const k = makeKaplayCtx();
    k.setBackground(k.Color.fromHex("#1a1a2e"))
    k.loadSprite("player", "./sprites/player.png", {
        sliceX: 4,
        sliceY: 8,
        anims: {
            "walk-down-idle": 0,
            "walk-down": {from: 0, to: 3, loop: true },
            "walk-left-down": { from: 4, to: 7, loop: true },
            "walk-left-down-idle": 4,
            "walk-left": {from: 8, to: 11, loop: true },
            "walk-left-idle": 8,
            "walk-left-up": { from: 12, to: 19, loop: true },
            "walk-left-up-idle": 12,
            "walk-up": { from: 16, to: 19, loop: true},
            "walk-up-idle": 16,
            "walk-right-up": { from: 20, to: 23, loop: true},
            "walk-right-up-idle": 20,
            "walk-right": { from: 24, to: 27, loop: true},
            "walk-right-idle": 24,
            "walk-right-down": { from: 28, to: 31, loop: true},
            "walk-right-down-idle": 28,
        }
    });
    k.loadSprite("ground", "./tiles/ground.png", {sliceX: 11, sliceY: 9});
    const TILE_SCALE = 4;
    const GRID_W = 20;
    const GRID_H = 20;
    const originX = k.center().x - (GRID_W * 16 * TILE_SCALE) / 2;
    const originY = k.center().y - (GRID_H * 16 * TILE_SCALE) / 2;

    for (let y=0; y < GRID_H; y++) {
        for (let x = 0; x < GRID_W; x++) {
            k.add([
                k.sprite("ground", {frame: 12}),
                k.pos(originX + x * 16 * TILE_SCALE, originY + y * 16 * TILE_SCALE),
                k.scale(TILE_SCALE),
                k.z(0),
            ]);
        }
    }

    const grassFrames = [12];
    for (let y = 0; y<GRID_H; y++) {
        for (let x = 0; x < GRID_W; x++) {
            const frame = grassFrames[Math.floor(Math.random() * grassFrames.length)];
            k.add([
                k.sprite("ground", { frame }),
                k.pos(originX + x * 16 * TILE_SCALE, originY + y * 16 * TILE_SCALE),
                k.scale(TILE_SCALE),
                k.z(0),
            ]);
        }
    }

    k.loadSprite("dirt", "./tiles/dirt.png", { sliceX: 10, sliceY: 5});
    const DIRT_FRAME = 11; //the only full plain dirt
    const HUB_X = 10;
    const HUB_Y = 10;
    const HUB_RADIUS = 2.2;
    const PATH_length = 5;

    const dirtCells = new Set();

    //cirle middle dirk
    for (let dy= -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
            if (Math.hypot(dx, dy) <= HUB_RADIUS) {
                dirtCells.add(`${HUB_X + dx}, ${HUB_Y + dy }`);
            }
        }
    }

    //single path going in each direc
    for (let s = 1; s <= PATH_length; s++) {
        dirtCells.add(`${HUB_X}, ${HUB_Y- s}`); // upp about
        dirtCells.add(`${HUB_X- s}, ${HUB_Y}`); // left skill
        dirtCells.add(`${HUB_X + s}, ${HUB_Y}`); // right exp
        dirtCells.add(`${HUB_X}, ${HUB_Y + s}`); // down project
    }

    k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
    k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
    k.loadSprite("github-logo", "./logos/github-logo.png");
    k.loadSprite("linkdin-logo", "./logos/linkedin-logo.png");
    k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
    k.loadSprite("x-logo", "./logos/x-logo.png");
    k.loadSprite("substack-logo", "./logos/substack-logo.png");
    k.loadSprite("javascript-logo", "./logos/js-logo.png");
    k.loadSprite("typescript-logo", "./logos/ts-logo.png");
    k.loadSprite("react-logo", "./logos/react-logo.png");
    k.loadSprite("nextjs-logo", "./logos/nextjs-logo.png");
    k.loadSprite("postgres-logo", "./logos/postgres-logo.png");
    k.loadSprite("html-logo", "./logos/html-logo.png");
    k.loadSprite("css-logo", "./logos/css-logo.png");
    k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
    k.loadSprite("python-logo", "./logos/python-logo.png");
    k.loadSprite("email-logo", "./logos/email-logo.png");
    k.loadSprite("sonic-js", "./projects/sonic-js.png");
    k.loadSprite("kirby-ts", "./projects/kirby-ts.png");
    k.loadSprite("platformer-ts", "./projects/platformer-js.png");
    
const setInitCamZoomValue = () => {
    if (k.width() < 1000) {
        k.setCamScale(k.vec2(0.5));
        store.set(cameraZoomValueAtom, 0.5);
        return;
    }
    k.setCamScale(k.vec2(0.5)); // Standard zoom for desktop
    store.set(cameraZoomValueAtom, 0.5); 
};

k.onUpdate(() => {
    const camZoomValue = store.get(cameraZoomValueAtom);
    if (camZoomValue !== k.getCamScale().x) {
        k.setCamScale(k.vec2(camZoomValue));
    }
});

console.log("width:", k.width());
setInitCamZoomValue();

    makeSection(
        k,
        k.vec2(k.center().x, k.center().y - 400),
        generalData.section1Name,
        (parent) => {
            const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

            container.add([
                k.text(generalData.header.title, {font: "ibm-bold", size: 88 }),
            k.color(k.Color.fromHex(PALETTE.color1)),
            k.pos(395, 0),
            k.opacity(0),
            ]);

            container.add([
                k.text(generalData.header.subtitle, {
                    font: "ibm-bold",
                    size: 48,
                }),
                k.color(k.Color.fromHex(PALETTE.color1)),
                k.pos(485, 100),
                k.opacity(0),
            ]);

            const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

            for (const socialData of socialsData) {
                if (socialData.name == "Email") {
                    makeEmailIcon(k, socialContainer, k.vec2(socialData.pos.x, socialData.pos.y), socialData.imageData, socialData.name, socialData.email);
                    continue;
                }

                makeSocialIcon(k, socialContainer, k.vec2(socialData.pos.x, socialData.pos.y), socialData.imageData, socialData.name, socialData.link, socialData.description);

            }

            makeAppear(k, container);
            makeAppear(k, socialContainer);
        }
    );

    makeSection(
        k,
        k.vec2(k.center().x - 400, k.center().y),
        generalData.section2Name,
        (parent) => {
            const container = parent.add([
                k.opacity(0),
                k.pos(-300, 0)
            ])
        }
    );

    makeSection(
        k,
        k.vec2(k.center().x + 400, k.center().y),
        "Experience",
        (parent) => {}
    );

    makeSection(
        k,
        k.vec2(k.center().x, k.center().y + 400),
        "Projects",
        (parent) => {}
    );

    makePlayer(k, k.vec2(k.center()), 700)

    makeSection(
        k,
        k.vec2(k.center().x - 400, k.center().y),
        generalData.section2Name,
        (parent) => {
            const container = parent.add([k.pos(0, 0), k.opacity(0)]);

            for (const skill of skillData) {
                makeSkillIcon(
                    k,
                    container,
                    k.vec2(skill.pos.x, skill.pos.y),
                    skill.imageData,
                    skill.name
                )
            }

            makeAppear(k, container);
        }
    )
}