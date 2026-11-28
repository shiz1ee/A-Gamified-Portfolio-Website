import { useAtom } from "jotai";
import { musicVolumeAtom, musicMutedAtom } from "../store";

export default function AudioController() {
    const [volume, setVolume] = useAtom(musicVolumeAtom);
    const [muted, setMuted] = useAtom(musicMutedAtom);

    const toggleMute = () => {
        setMuted(!muted);
        document.getElementById("game")?.focus();
    };

    return (
        <div className="audio-controller">
            <button onClick={toggleMute}>
                {muted ? "Unmute" : "Mute"}
            </button>

            <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            aria-label="Music volume"
            onChange={(e) => setVolume(Number(e.target.value))}
            onPointerUp={() => document.getElementById("game")?.focus()}
            />

            <span>{Math.round(volume * 100)}%</span>
        </div>
    );
}