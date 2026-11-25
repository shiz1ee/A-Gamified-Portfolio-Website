import { PALETTE } from "../constants";
import { isEmailModalVisibleAtom, emailAtom, store } from "../store";
import makeIcon from "./Icon";
import { opacityTrickDopwn } from "../utils";
import addProximityTrigger from "./proximity";

export default function makeEmailIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
    email,
    labelSide
) {
    const [emailIcon, subtitleText] = makeIcon(
        k,
        parent,
        posVec2,
        imageData,
        subtitle,
        labelSide
    );

    const home = posVec2.clone();
    
    addProximityTrigger(k, emailIcon, home, () => {

        store.get(isEmailModalVisibleAtom, true);
        store.get(emailAtom, email);
    });

    opacityTrickDopwn(parent, [subtitleText]);

    return emailIcon;
}