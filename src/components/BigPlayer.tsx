import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import Sound from "react-native-sound";
import Track from "../types/Track";
import BackButtonIcon from '../assets/images/icons/icons8-return-100.png';
import noTrackImage from '../assets/images/icons/images.jpg';
import ProgressBar from "./ProgressBar";
import { Repeat } from "../store/slices/playerSlice";
import SliderProgressBar from "./SliderProgressBar";

type BigPlayerProps = {
    currentSound: Sound | undefined,
    currentTrack: Track,
    isPlaying: boolean,
    isControllable: boolean,
    shuffle: boolean,
    repeat: Repeat,
    playPauseHandler: () => void,
    closeBigPlayer: () => void,
    setRepeatHandler: () => void,
    setShuffleHandler: () => void,
    nextTrackHandler: () => void,
    previousTrackHandler: () => void
}

const BigPlayer = ({
    currentSound,
    currentTrack, 
    isPlaying,
    isControllable,
    shuffle,
    repeat,
    playPauseHandler,
    closeBigPlayer,
    setRepeatHandler,
    setShuffleHandler,
    nextTrackHandler,
    previousTrackHandler
}: BigPlayerProps) => {
    return (
        <View style={styles.container}>
            <ProgressBar sound={currentSound}/>
            <View style={styles.top}>
                <Pressable style={styles.back} onPress={closeBigPlayer}>
                    <Image source={BackButtonIcon} style={styles.backButton}/>
                </Pressable>
                <View style={styles.info}>
                    <Text numberOfLines={2} style={styles.title}>{currentTrack.title}</Text>
                    <Text numberOfLines={1} style={styles.author}>{currentTrack.author}</Text>
                </View>
            </View>
            <View style={styles.coverContainer}>
                <Image source={currentTrack.cover ? {uri: currentTrack.cover} : noTrackImage} style={styles.cover}/>
            </View>
            <SliderProgressBar sound={currentSound}/>
            <View style={styles.controllers}>
                <Pressable onPress={setRepeatHandler}>
                    <Text style={styles.controllerText}>
                        {Repeat.NoRepeat === repeat ? 'NOREPEAT' : 
                        Repeat.RepeatCurrent === repeat ? 'REPEATCURRENT' : 
                        'REPEATQUEUE'}
                    </Text>
                </Pressable>
                <Pressable onPress={previousTrackHandler} disabled={!isControllable}>
                    <Text style={styles.controllerText}>PREVIOS</Text>
                </Pressable>
                <Pressable onPress={playPauseHandler}>
                    <Text style={styles.controllerText}>{isPlaying ? 'PAUSE' : 'PLAY'}</Text>
                </Pressable>
                <Pressable onPress={nextTrackHandler}>
                    <Text style={styles.controllerText} disabled={!isControllable}>NEXT</Text>
                </Pressable>
                <Pressable onPress={setShuffleHandler}>
                    <Text style={styles.controllerText}>{shuffle ? 'SHUFFLE' : 'NOSHUFFLE'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    back: {
        paddingHorizontal: 20
    },
    backButton: {
        width: 50,
        height: 50
    },
    coverContainer: {
        flex: 5,
        paddingHorizontal: 10,
        width: '100%',
    },
    cover: {
        borderRadius: 15,
        width: '100%',
        height: '100%'
    },
    info: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 18
    },
    author: {
        color: 'grey',
        fontSize: 12
    },
    controllers: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 20
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controllerText: {
        color: 'white'
    }
});
 
export default BigPlayer;