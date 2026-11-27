import makeCabinet from "../components/Cabinet";
import makePlayer from "../entities/Player";
import makeSocialIcon from "../components/SocialIcon";
import makeEmailIcon from "../components/EmailIcon";
import { makeAppear } from "../utils";
import addCollisions from "../systems/MapCollisions";

const MAP_SCALE = 3;
const FLIP_MASK = 0x1fffffff;
const CABINET_H = 260;

function addTIleLayers(k, map) {
    const TILE = map.tilewidth * MAP_SCALE;

    const tilesets = map.tilesets
        .map((ts, i) => {
            if (!ts.image) throw new Error("Tileset" + (ts.name ?? i) + "is external. embet it in tiled n re-export");
            const name = "tileset-" + i;
            k.loadSprite(name, "./maps/" + ts.image.split("/").pop(), {
                sliceX: ts.columns,
                sliceY: Math.ceil(ts.tilecount / ts.columns),
            });
            return { name, firstgid: ts.firstgid };
        })
        .sort((a, b) => b.firstgid - a.firstgid);
    
    let ready = false;
    k.onLoad(() => { ready = true });

    let z = 0;
    for (const layer of map.layers) {
        if (layer.type !== "tilelayer") continue;
        if (!Array.isArray(layer.data)) throw new Error("layer" + layer.name + ": set tile layer format to csv in tiled.");

        const tiles = [];
        layer.data.forEach((raw, i) => {
            const gid = raw & FLIP_MASK;
            if (gid === 0) return;
            const ts = tilesets.find((t) => gid >= t.firstgid);
            const h = (raw & 0x80000000) !== 0;
            const v = (raw & 0x40000000) !== 0;
            const d = (raw & 0x20000000) !== 0;

            let angle = 0;
            let flipX = h;
            let flipY = v;
            if (d) {
                if (!h && !v) { angle = -90; flipX = true;  flipY = false; }
                else if (h && !v) { angle = 90;  flipX = false; flipY = false; }
                else if (!h && v) { angle = -90; flipX = false; flipY = false; }
                else              { angle = 90;  flipX = true;  flipY = false; }
            }

            tiles.push({
                sprite: ts.name,
                frame: gid - ts.firstgid,
                pos: k.vec2(
                    (i % map.width) * TILE + TILE / 2,
                    Math.floor(i / map.width) * TILE + TILE / 2
                ),
                angle,
                flipX,
                flipY,
            });
        });

        k.add([
            k.pos(0, 0),
            k.z(layer.name === "foreground" ? 20 : z++),
            {
                draw() {
                    if (!ready) return;
                    for (const t of tiles) {
                        k.drawSprite({ sprite: t.sprite, frame: t.frame, pos: t.pos, scale: MAP_SCALE, anchor: "center", angle: t.angle, flipX: t.flipX, flipY: t.flipY, });
                    }
                },
            },
        ]);
    }
}



//reading the point locations 
function readPoints(k, map) {
    const layer = map.layers.find((l) => l.type === "objectgroup" && l.name === "points");
    if (!layer) throw new Error('No object layer named points in arcade.json');

    const points = {};
    for (const o of layer.objects) {
        points[o.name] = k.vec2(o.x * MAP_SCALE, o.y * MAP_SCALE);
    }
    return (name) => {
        if (!points[name]) throw new Error('missing point "' + name + '" in the points layer.');
        return points[name];
    };
}

export default function buildMap(k, map, cabinets, socials, skills) {
    console.log("socials:", socials);
    addTIleLayers(k, map);
    addCollisions(k, map, MAP_SCALE);
    const point = readPoints(k, map);

    cabinets.forEach((c, i) => {
        const p = point ("arcade_" + (i + 1));
        makeCabinet(k, { ...c, x: p.x, y: p.y - CABINET_H / 2}, i, cabinets.length);
    });

    const container = k.add([k.pos(0, 0), k.opacity(0), k.z(5)]);
    socials.forEach((s, i) => {
        const pos = point("social_" + (i + 1));
        if (s.name === "Email") {
            makeEmailIcon(k, container, pos, s.imageData, s.name, s.email, s.labelSide);
        } else {
            makeSocialIcon(k, container, pos, s.imageData, s.name, s.link, s.description, s.labelSide);
        }
    });
    makeAppear(k, container);

    skills.forEach((s, i) => {
        const pos = point("skill_" + (i + 1));
        k.add([
            k.sprite(s.imageData.name, { width: 64, height: 64 }),
            k.pos(pos),
            k.anchor("center"),
            k.z(6),
        ]);
        k.add([
            k.text(s.name, { font: "ibm-bold", size: 18 }),
            k.pos(pos.x, pos.y + 48),
            k.anchor("center"),
            k.color(255, 255, 255),
            k.z(6),
        ]);
    });


    makePlayer(k, point("spawn"), 700);
}