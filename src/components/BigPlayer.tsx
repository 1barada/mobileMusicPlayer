import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import Sound from "react-native-sound";
import Track from "../types/Track";
import BackButtonIcon from '../assets/images/icons/icons8-return-100.png';
import noTrackImage from '../assets/images/icons/images.jpg';
import ProgressBar from "./ProgressBar";
import { Repeat } from "../store/slices/playerSlice";
import SliderProgressBar from "./SliderProgressBar";
import repeatButtonIcon from '../assets/images/icons/repeatButton.jpg';
import previousButtonIcon from '../assets/images/icons/previousButton.jpg';
import playButtonIcon from '../assets/images/icons/playButton.jpg';
import pauseButtonIcon from '../assets/images/icons/pauseButton.jpg';
import nextButtonIcon from '../assets/images/icons/nextButton.jpg';
import shuffleButtonIcon from '../assets/images/icons/shuffleButton.jpg';

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
                <Pressable style={styles.side} onPress={setRepeatHandler}>
                    <Image style={styles.sideButton} source={repeatButtonIcon}/>
                    {repeat === Repeat.NoRepeat ? <></>
                        :   repeat === Repeat.RepeatCurrent
                            ?   <Text style={styles.repeatText}>curr</Text>
                            :   <Text style={styles.repeatText}>queue</Text>
                    }
                </Pressable>
                <Pressable style={styles.previousNextButton} onPress={previousTrackHandler} disabled={!isControllable}>
                    <Image style={styles.previousNextButtonIcon} source={previousButtonIcon}/>
                </Pressable>
                <Pressable onPress={playPauseHandler}>
                    <Image source={isPlaying ? pauseButtonIcon : playButtonIcon}/>
                </Pressable>
                <Pressable style={styles.previousNextButton} onPress={nextTrackHandler}>
                    <Image style={styles.previousNextButtonIcon} source={nextButtonIcon}/>
                </Pressable>
                <Pressable style={styles.side} onPress={setShuffleHandler}>
                    <Image style={styles.sideButton} source={shuffleButtonIcon}/>
                    {shuffle && <Text style={styles.repeatText}>shuffle</Text>}
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
        backgroundColor: '#000000',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        gap: 20
    },
    progress: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controllerText: {
        color: 'white',
    },
    previousNextButton: {
        
    },
    previousNextButtonIcon: {
        width: 30,
        height: 30,
    },
    sideButton: {
        width: 30,
        height: 30
    },
    repeatText: {
        color: 'white'
    },
    side: {
        alignItems: 'center'
    }
});
 
export default BigPlayer;