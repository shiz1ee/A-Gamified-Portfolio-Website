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
    const previewUrl = cabinet.type === "itch"
        ? cabinet.embedUrl
        : cabinet.url;

    return (
        <div className="game-modal">
            <div
                className="game-modal-frame"
                style={{ "--accent": cabinet.color }}>
                <div className="game-modal-bar">
                    <div className="game-modal-heading">
                        <span className="game-modal-label">ARCADE / PROJECT</span>
                        <h2>{cabinet.title}</h2>
                    </div>
                    <div className="game-modal-actions">
                        {cabinet.url && (
                            <button className="game-modal-btn" onClick={() => window.open(cabinet.url, "_blank")}>
                                New tab
                            </button>
                        )}
                        <button className="game-modal-btn" onClick={close}>Close (esc)</button>
                    </div>
                </div>
                <details className="game-modal-info">
                    <summary>Project information</summary>

                    <p>{cabinet.tagline}</p>

                    <div className="game-modal-techno">
                        {cabinet.technologies?.map((tech) => (
                            <span key={tech}>{tech}</span>
                        ))}
                    </div>

                    {cabinet.githubUrl && (
                        <a
                            className="game-modal-btn"
                            href={cabinet.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View source code
                        </a>
                    )}
                </details>
                {previewUrl ? (
                    <div className={`game-modal-viewport ${
                        cabinet.id === "cafe" ? "scaled-preview" : ""
                    }`}>
                        <iframe
                            className="game-modal-iframe"
                            src={previewUrl} 
                            title={cabinet.title}
                            allow="fullscreen; gamepad; autoplay"
                            allowFullScreen
                        />
                    </div>
                ) : (
                    <div className="game-modal-soon">
                        <p>{cabinet.tagline}</p>
                        <p>
                            {cabinet.type === "itch" && cabinet.url
                                ? "To play this game, download it from itch.io using the New tab button above."
                                : "coming soon..."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}