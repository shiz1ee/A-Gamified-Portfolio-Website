import {atom, createStore} from "jotai";
import { atomWithStorage } from "jotai/utils";
export const isSocialModelVisibleAtom =atom(false);
export const selectedLinkAtom = atom(null);
export const selectedLinkDescriptionAtom = atom(null);
export const isEmailModalVisibleAtom = atom(false);
export const emailAtom = atom("");
export const activeCabinetAtom = atom(null);
export const isProjectModalVisibleAtom = atom(false);
export const chosenProjectDataAtom = atom({
    title: "",
    links: [{ id: 0, name: "", link: ""}],
});

export const cameraZoomValueAtom = atom(0.75);
export const musicVolumeAtom = atomWithStorage(
    "portfolio-music-volume", 0.3, undefined,
    {getOnInit: true}
);
export const musicMutedAtom = atomWithStorage(
    "portfolio-music-muted", false, undefined,
    {getOnInit: true}
);
export const store = createStore();