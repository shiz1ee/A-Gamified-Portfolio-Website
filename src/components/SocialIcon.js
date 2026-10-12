import { PALETTE } from "../constants";
import makeIcon from "./Icon";
import {isSocialModelVisibleAtom, selectedLinkAtom, selectedLinkDescriptionAtom, store} from "../store"
import { opacityTrickDopwn } from "../utils";

export default function makeSocialIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
    link,
    description,
) {
    const [socialIcon, subtitleText] = makeIcon(
        k,
        parent,
        posVec2,
        imageData,
        subtitle
    );

    const linkSwitch = socialIcon.add([
        k.circle(30),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.anchor("center"),
        k.area(),
        k.pos(0, 150),
        k.opacity(0),
    ]);

    linkSwitch.onCollide("player", () => {
        store.set(isSocialModelVisibleAtom, true);
        store.set(selectedLinkAtom, link);
        store.set(selectedLinkDescriptionAtom, description);
    });

     opacityTrickDopwn(parent, [subtitleText, linkSwitch]);

    return socialIcon;
}