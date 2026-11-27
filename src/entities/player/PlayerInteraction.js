export function loadSeats(k, map, scale) {
    const layer = map.layers.find(
        (l) => l.name === "seats"
    );

    if (!layer) return [];

    return layer.objects.map((obj) => {
        const props = Object.fromEntries(
            (obj.properties ?? []).map(
                (p) => [p.name, p.value]
            )
        );

        return {
            id: obj.id,
            name: obj.name,

            pos: k.vec2(
                obj.x * scale,
                obj.y * scale
            ),

            facing: props.facing ?? "down",

            exitOffset: k.vec2(
                (props.exitOffsetX ?? 0) * scale,
                (props.exitOffsetY ?? 32) * scale
            ),

            radius: (props.interactionRadius ?? 48) * scale,
        };
    });
}

export function findNearestSeat(player, seats) {
    let nearest = null;
    let nearestDistance = Infinity;

    const feetPos = player.pos.add(
        0, 13 * player.scale.y
    );

    for (const seat of seats) {
        const distance = feetPos.dist(seat.pos);

        if (
            distance <= seat.radius &&
            distance < nearestDistance
        ) {
            nearest = seat;
            nearestDistance = distance;
        }
    }

    return nearest;
}

export function createSeatPrompt(k) {
    return k.add([
        k.text("F Sit", {
            font: "ibm-bold",
            size: 24,
        }),
        k.pos(0, 0),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.opacity(0),
        k.z(30),
    ]);
}