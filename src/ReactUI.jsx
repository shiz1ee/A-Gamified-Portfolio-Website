import CameraContrtoller from "./reactComponents/CameraController";

export default function ReactUI() {
    return (
        <>
            <p className="controls-message">Tap/click around to move</p>
            <CameraContrtoller />
        </>
    );
}