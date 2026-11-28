import CameraContrtoller from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";
import GameModal from "./reactComponents/GameModal";
import AudioController from "./reactComponents/AudioController";


export default function ReactUI() {
    return (
        <>
            <p className="controls-message">WSAD / arrows or click to move</p>
            <CameraContrtoller />
            <AudioController />
            <SocialModal />
            <EmailModal/>
            <ProjectModal/>
            <GameModal/>
            
        </>
    );
}