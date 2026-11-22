import {atom, createStore} from "jotai";
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

export const cameraZoomValueAtom = atom({ value: 1 });

export const store = createStore();