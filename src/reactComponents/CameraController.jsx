import { ZOOM_MAX_BOUND, ZOOM_MIN_BOUND } from "../constants";
import { cameraZoomValueAtom } from "../store";
import { useAtom } from "jotai";

export default function CameraController() {
    const [camZoomValue, setCamZoomValue] =
        useAtom(cameraZoomValueAtom);

    const changeZoom = (amount) => {
        setCamZoomValue((current) =>
            Math.min(
                ZOOM_MAX_BOUND,
                Math.max(ZOOM_MIN_BOUND, current + amount)
            )
        );

        document.getElementById("game")?.focus();
    };

    return (
        <div className="camera-controller">
            <button
                className="camera-controller-btn"
                onClick={() => changeZoom(0.1)}
            >
                +
            </button>

            <button
                className="camera-controller-btn"
                onClick={() => changeZoom(-0.1)}
            >
                -
            </button>
        </div>
    );
}