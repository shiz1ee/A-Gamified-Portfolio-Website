const COLLISION_LAYERS = [
    "collision-walls",
    "collision-furniture",
];

export default function addCollisions(k, map, scale) {
    let total = 0;
    let debugCollisions = false;

    if (import.meta.env.DEV) {
        k.onKeyPress("f2", () => {
            debugCollisions = !debugCollisions;
        });
    }
    for (const layerName of COLLISION_LAYERS) {
        const layer = map.layers.find(
            (l) =>
                l.type === "objectgroup" &&
                l.name === layerName
        );

        if (!layer) {
            throw new Error(`Missing collision layer: $(layerName)`);
        }

        for (const obj of layer.objects) {
            if (!obj.width || !obj.height) continue;

            const x = obj.x * scale;
            const y = obj.y * scale;
            const width = obj.width * scale;
            const height = obj.height * scale;

            k.add([
                k.pos(x, y),
                k.area({
                    shape: new k.Rect(
                        k.vec2(0),
                        width,
                        height
                    ),
                }),
                k.body({ isStatic: true }),
                "wall",
                layerName,
                k.z(100),
                {
                    draw() {
                        if (!debugCollisions) return;

                        const color = layerName === "collision-walls"
                            ? k.rgb(255, 70, 70)
                            : k.rgb(70, 200, 255);
                        
                        k.drawRect({
                            width,
                            height,
                            color,
                            opacity: 0.25,
                            outline: {
                                width: 2,
                                color,
                            },
                        });
                    },
                },
            ]);

            total++
        }

    }

}