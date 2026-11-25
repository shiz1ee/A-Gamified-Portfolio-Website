import { PALETTE } from "../constants";
import makeIcon from "./Icon";
import {isSocialModelVisibleAtom, selectedLinkAtom, selectedLinkDescriptionAtom, store} from "../store"
import { opacityTrickDopwn } from "../utils";
import addProximityTrigger from "./proximity";


export default function makeSocialIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
    link,
    description,
    labelSide,
) {
    const [socialIcon, subtitleText] = makeIcon(
        k,
        parent,
        posVec2,
        imageData,
        subtitle,
        labelSide
    );

    const home = posVec2.clone();

    addProximityTrigger(k, socialIcon, home, () => {
        store.set(selectedLinkAtom, link);
        store.set(selectedLinkDescriptionAtom, description);
        store.set(isSocialModelVisibleAtom, true);
    });

    opacityTrickDopwn(parent, [subtitleText]);

    return socialIcon;
}