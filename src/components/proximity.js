import {
    activeCabinetAtom,
    isEmailModalVisibleAtom,
    isSocialModelVisibleAtom,
    store,
} from "../store";

const TRIGGER_RADIUS = 170;
const RESET_RADIUS = 230;
const registry = [];

export default function addProximityTrigger(k, owner, home, onEnter) {
    const entry = { home, armed: true };
    registry.push(entry);
    console.log("registered trigger, total:", registry.length);

    owner.onUpdate(() => {
        const player = k.get("player")[0];
        if (!player) return;

        const dist = player.pos.dist(home);
         if (dist < 300) console.log("near", Math.round(home.x), Math.round(home.y), "dist", Math.round(dist), "armed", entry.armed);

        if (dist > RESET_RADIUS) {
            entry.armed = true;
            return;
        }
        if (!entry.armed || dist > TRIGGER_RADIUS) return;

        if (
            store.get(isSocialModelVisibleAtom) ||
            store.get(isEmailModalVisibleAtom) ||
            store.get(activeCabinetAtom)
        ) return;

        const closer = registry.some(
            (e) => e !== entry && player.pos.dist(e.home) < dist
        );
        if (closer) return;

        entry.armed = false;
        onEnter();
    });
}