import { useEffect } from "react";
import { useAtom } from "jotai";
import { activeCabinetAtom } from "../store";

export default function GameModal() {
    const [cabinet, setCabinet] = useAtom(activeCabinetAtom);

    const close = () => {
        setCabinet(null);
        document.getElementById("game")?.focus();
    };

    useEffect(() => {
        if (!cabinet) return;
        const onKey = (e) => {
            if (e.key === "Escape") {
                setCabinet(null);
                document.getElementById("game")?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [cabinet, setCabinet]);

    if (!cabinet) return null;

    return (
        <div className="game-modal">
            <div className="game-modal-frame" style={{ borderColor: cabinet.color }}>
                <div className="game-modal-bar">
                    <span>{cabinet.title}</span>
                    <div>
                        {cabinet.url && (
                            <button className="modal-btn" onClick={() => window.open(cabinet.url, "_blank")}>
                                New tab
                            </button>
                        )}
                        <button className="modal-btn" onClick={close}>Close (esc)</button>
                    </div>
                </div>
                {cabinet.url ? (
                    <iframe
                        className="game-modal-iframe"
                        src={cabinet.url} 
                        title={cabinet.title}
                        allow="fullscreen; gamepad; autoplay"
                    />
                ) : (
                    <div className="game-modal-soon">
                        <p>{cabinet.tagline}</p>
                        <p>Coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}