import { useAtom, useAtomValue } from "jotai";
import { emailAtom, isEmailModalVisibleAtom } from "../store";
import { useState } from "react";

export default function EmailModal() {
    const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
    const email = useAtomValue(emailAtom);
    
    const [onCopyMessage, setOnCopyMessage] = useState("");

    const buttons = [
        {
            id: 0,
            name: "Copy",
            handler: () => {
                navigator.clipboard.writeText(email);
                setOnCopyMessage("Email Copied to clipboard");
                setTimeout(() => {
                    setIsVisible(false);
                    setOnCopyMessage("");
                }, 1200);
            },
        },
        {
            id: 1,
            name: "Close",
            handler: () => {
                setOnCopyMessage("");
                setIsVisible(false);
            },
        },
    ];

    return (
        isVisible && (
            <div className="modal">
                <div className="modal-content">
                    <h1>Copy my email to your clipboard?</h1>
                    <span>{email}</span>
                    <p>{onCopyMessage}</p>
                    <div className="modal-btn-container">
                        {buttons.map((button) => (
                            <button
                                key={button.id}
                                className={"modal-btn"}
                                onClick={button.handler}
                            >
                                {button.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    )
}