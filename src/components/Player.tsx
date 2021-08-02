import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import Image from "next/image";
import Slider from "rc-slider";


import styles from "../styles/player.module.scss";
import "rc-slider/assets/index.css"
import { convertDurationToTimeString } from "../services/convertDurationToTimeString";

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const { episodeList, currentEpisodeIndex, isPlaying,
        togglePlay, setPlayingState, playNext, playPrevious,
        isLooping, toggleLoop, isShuffling, toggleShuffle } = useContext(PlayerContext)

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

    }, [isPlaying])

    const episode = episodeList[currentEpisodeIndex];

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {

            setProgress(Math.floor(audioRef.current.currentTime));

        });
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded() {

    }

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="playing.svg" alt="Tocando agora" />
                <strong>Tocando agora  </strong>
            </header>

            {episode ? (
                <div className={styles.currentEpisode} >
                    <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </div>
            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>

                    <div className={styles.slyder}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#04d36' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ backgroundColor: '#04d36', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={styles.emptySlyder} />
                        )}
                    </div>
                    <span>{episode?.duration ?? '00:00'}</span>
                </div>

                {episode && (
                    <audio src={episode.url}
                        autoPlay ref={audioRef}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        loop={isLooping}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisodeEnded}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" onClick={toggleShuffle}
                        className={isShuffling ? styles.isActive : ''} disabled={!episode || episodeList.length == 1}>
                        <img src="shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || episodeList.length == 1}>
                        <img src="play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type="button" onClick={togglePlay} className={styles.playButton} disabled={!episode}>
                        {isPlaying ? (
                            <img src="pause.svg" alt="Tocar" />
                        ) : (
                            <img src="play.svg" alt="Tocar" />
                        )}
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode || episodeList.length == 1}>
                        <img src="play-next.svg" alt="Tocar proxima" />
                    </button>
                    <button type="button" onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''} disabled={!episode}>
                        <img src="repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}