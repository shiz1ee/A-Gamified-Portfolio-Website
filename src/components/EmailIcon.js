import { PALETTE } from "../constants";
import { isEmailModalVisibleAtom, emailAtom, store } from "../store";
import makeIcon from "./Icon";
import { opacityTrickDopwn } from "../utils";

export default function makeEmailIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle,
    email
) {
    const [emailIcon, subtitleText] = makeIcon(
        k,
        parent,
        posVec2,
        imageData,
        subtitle
    );

    const emailSwitch = emailIcon.add([
        k.circle(30),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.anchor("center"),
        k.area(),
        k.pos(0, 150),
        k.opacity(0),
    ]);

    emailSwitch.onCollide("player", () => {
        store.set(isEmailModalVisibleAtom, true);
        store.set(emailAtom, email);
    });

     opacityTrickDopwn(parent, [subtitleText, emailSwitch]);

    return emailIcon;
}