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
            name: "Yes",
            handler: () => {
                window.open(selectedLink, "_blank");
                setIsVisible(false);
            },
        },
        {
            id: 1,
            name: "Nuh huh",
            handler: () => {
                setIsVisible(false);
            },
        },
    ];

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
                    <h1>Do you Want to Open this Link?</h1>
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