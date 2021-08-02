import { createContext, ReactNode, useState } from "react";

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
}

type PlayerContextType = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
}

type PlayerContextProps = {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextType);

export function PlayerContextProvider({ children }: PlayerContextProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShufling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setcurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setcurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;


    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() + episodeList.length);
            setcurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setcurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {

        if (currentEpisodeIndex > 0) setcurrentEpisodeIndex(currentEpisodeIndex - 1);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShufling(!isShuffling);
    }

    return (
        <PlayerContext.Provider value={{
            episodeList, currentEpisodeIndex, play, isPlaying,
            togglePlay, setPlayingState, playList, playNext,
            playPrevious, isLooping, toggleLoop, isShuffling,
            toggleShuffle
        }}>
            {children}
        </PlayerContext.Provider>

    )
}