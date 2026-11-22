import CameraContrtoller from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";
import GameModal from "./reactComponents/GameModal";


export default function ReactUI() {
    return (
        <>
            <p className="controls-message">WSAD / arrows or click to move</p>
            <CameraContrtoller />
            <SocialModal />
            <EmailModal/>
            <ProjectModal/>
            <GameModal/>
        </>
    );
}