import { store, musicMutedAtom, musicVolumeAtom, activeCabinetAtom } from "../store";

const TRACKS = Array.from(
    { length: 7 },
    (_, i) => `./audio/music/music-0${i + 1}.mp3`
);

const MIN_DELAY = 15000;
const MAX_DELAY = 30000;
const FADE_DURATION = 3;

export default function initMusic() {
    const audio = new Audio();
    audio.volume = 0;

    let previousTrack = null;
    let started = false;
    let nextTrackPending = false;

    function playNextTrack() {

        if (store.get(activeCabinetAtom)) {
            nextTrackPending = true;
            return;
        }
        nextTrackPending = false;

        const availableTracks = TRACKS.filter(
            (track) => track !== previousTrack
        );

        const track = availableTracks[
            Math.floor(Math.random() * availableTracks.length)
        ];

        previousTrack = track;
        audio.src = track;
        audio.volume = 0;

        audio.play().catch((error) => {
            if (error.name === "AbortError") return;
            started = false;
            console.warn("Music playback failed:", error);
        });
    }

    function updateVolume() {
        audio.muted = store.get(musicMutedAtom);

        if (!Number.isFinite(audio.duration)) return;

        const fadeIn = audio.currentTime / FADE_DURATION;

        const fadeOut = (audio.duration - audio.currentTime) / FADE_DURATION;

        const fadeFactor = Math.max(0, Math.min(1, fadeIn, fadeOut));

        audio.volume = store.get(musicVolumeAtom) * fadeFactor;
    }
    audio.addEventListener("timeupdate", updateVolume);
    store.sub(musicVolumeAtom, updateVolume);
    store.sub(musicMutedAtom, updateVolume);
    store.sub(activeCabinetAtom, () => {
        if (store.get(activeCabinetAtom)) {
            audio.pause();
            return;
        }

        if (!started) return;
        if (nextTrackPending) {
            playNextTrack();
        } else if (audio.src && !audio.ended) {
            audio.play().catch((error) => {
                if (error.name === "AbortError") return;

                started = false;
                console.warn("Music resume failed:", error);
            });
        }
    });


    audio.addEventListener("ended", () => {
        const delay = MIN_DELAY + Math.random() * (MAX_DELAY = MIN_DELAY);

        setTimeout(playNextTrack, delay);
    });

    function startMusic() {
        if (started) return;

        started = true;
        playNextTrack();
    }

    document.addEventListener("pointerup", startMusic, true);
    document.addEventListener("keydown", startMusic, true);
}