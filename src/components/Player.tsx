import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Sound from "react-native-sound";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { PlayerSliceType, openBigPlayer, closeBigPlayer, Repeat, nextTrack, setRepeat, setShuffle, previousTrack, setIsControllable } from "../store/slices/playerSlice";
import MiniPlayer from "./MiniPlayer";
import BigPlayer from "./BigPlayer";

const Player = () => {
    const [currentSound, setCurrentSound] = useState<Sound | undefined>(undefined);
    const [isMiniPlayerOpen, setIsMiniPlayerOpen] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const {currentTrack, shuffle, repeat, isControllable} = useSelector<RootState, PlayerSliceType>(state => state.player); 
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        if (currentSound) {
            currentSound.release();
        }

        if (currentTrack) {
            dispatch(setIsControllable(false));
            const sound = new Sound(currentTrack.path, '', (error) => {
                if (error) {
                    console.error(error);
                    return;
                }

                dispatch(setIsControllable(true));
                sound.play(endTrackHandler);
                setIsPlaying(true);
            });

            setCurrentSound(sound);
        }
    }, [currentTrack]);

    useEffect(() => {
        return () => {
            currentSound?.release();
        }
    }, []);

    useEffect(() => {
        switch(repeat) {
            case Repeat.NoRepeat:
                currentSound?.setNumberOfLoops(0).play();
                break;
            case Repeat.RepeatCurrent:
                currentSound?.setNumberOfLoops(-1).play();
                break;
            case Repeat.RepeatQueue:
                currentSound?.setNumberOfLoops(0).play();
                break;
        }
    }, [repeat]);

    const endTrackHandler = (succses: boolean) => {
        if (succses) {
            if (repeat === Repeat.RepeatCurrent) {
                currentSound?.setNumberOfLoops(-1).play();
            } else {
                currentSound?.setNumberOfLoops(0).play();
                dispatch(nextTrack());
            }
        }
        else {
            console.error('Error: something went wrong while track is played');
        }
    }

    const playPauseHandler = () => {
        if (isPlaying) {
            currentSound?.pause();
        } else {
            currentSound?.play(endTrackHandler);
        }
        setIsPlaying(!isPlaying);
    };

    const openBigPlayerHandler = () => {
        dispatch(openBigPlayer());
        setIsMiniPlayerOpen(false);
    }

    const closeBigPlayerHandler = () => {
        dispatch(closeBigPlayer());
        setIsMiniPlayerOpen(true);
    }

    const setRepeatHandler = () => {
        dispatch(setRepeat());
    }

    const setShuffleHandler = () => {
        dispatch(setShuffle());
    }

    const nextTrackHandler = () => {
        dispatch(nextTrack());
    }

    const previousTrackHandler = () => {
        dispatch(previousTrack());
    }

    if (!currentTrack) 
    return (
        <View style={styles.container}>
            <Text>Error: no track chosen</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            {isMiniPlayerOpen
                ?   <MiniPlayer 
                        currentSound={currentSound} 
                        currentTrack={currentTrack} 
                        isPlaying={isPlaying} 
                        playPauseHandler={playPauseHandler}
                        openBigPlayer={openBigPlayerHandler}
                    />
                :   <BigPlayer
                        currentSound={currentSound} 
                        currentTrack={currentTrack} 
                        isPlaying={isPlaying} 
                        isControllable={isControllable}
                        repeat={repeat}
                        shuffle={shuffle}
                        playPauseHandler={playPauseHandler}
                        closeBigPlayer={closeBigPlayerHandler}
                        nextTrackHandler={nextTrackHandler}
                        previousTrackHandler={previousTrackHandler}
                        setRepeatHandler={setRepeatHandler}
                        setShuffleHandler={setShuffleHandler}
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
});
 
export default Player;