import { useAtom, useAtomValue } from "jotai";
import {
    isSocialModelVisibleAtom,
    selectedLinkAtom,
    selectedLinkDescriptionAtom,
} from "../store";

export default function SocialModal() {
    const [isVisible, setIsVisible] = useAtom(isSocialModelVisibleAtom);
    const selectedLink = useAtomValue(selectedLinkAtom);
    const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);

    const buttons = [
        {
            id: 0,
            name: "Redeem",
            handler: () => {
                window.open(selectedLink, "_blank");
                setIsVisible(false);
                document.getElementById("game")?.focus();
            },
        },
        {
            id: 1,
            name: "Not now",
            handler: () => {
                setIsVisible(false);
                document.getElementById("game")?.focus();
            },
        },
    ];

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
                    <h1>Redeem this prize?</h1>
                    <span>{selectedLink}</span>
                    <p>{selectedLinkDescription}</p>
                    <div className="modal-btn-container">
                        {buttons.map((button) => (
                            <button
                                key={button.id}
                                className="modal-btn"
                                onClick={button.handler}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}