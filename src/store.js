import {atom, createStore} from "jotai";
export const isSocialModelVisibleAtom =atom(false);
export const selectedLinkAtom = atom(null);

export const isEmailModalVisibleAtom = atom("");
export const emailAtom = atom("");

export const isProjectModalVisibleAtom = atom(false);
export const chosenProjectDataAtom = atom({
    title: "",
    links: [{ id: 0, name: "", link: ""}],
});

export const cameraZoomValueAtom = atom({ value: 1 });

export const store = createStore();