import { View, Pressable, Text, Image, StyleSheet } from "react-native";
import ProgressBar from "./ProgressBar";
import Sound from "react-native-sound";
import Track from "../types/Track";
import pauseButtonIcon from '../assets/images/icons/pauseButton.png';
import playButtonIcon from '../assets/images/icons/playButton.png';

type MiniPlayerProps = {
    currentSound: Sound | undefined,
    currentTrack: Track,
    isPlaying: boolean,
    playPauseHandler: () => void,
    openBigPlayer: () => void
}

const MiniPlayer = ({
    currentSound,
    currentTrack,
    isPlaying,
    playPauseHandler,
    openBigPlayer
}: MiniPlayerProps) => {
    return (
        <View style={styles.container}>
            <ProgressBar sound={currentSound}/>
            <View style={styles.playerContainer}>
                <Pressable style={styles.titleContainer} onPress={openBigPlayer}>
                    <Text numberOfLines={2} style={styles.titleText}>{currentTrack.title}</Text>
                    {currentTrack.author &&  
                    <Text numberOfLines={1} style={styles.author}>{currentTrack.author}</Text>
                    }
                </Pressable>
                <Pressable style={styles.buttonContainer} onPress={playPauseHandler}>
                    {isPlaying 
                        ?   <Image style={styles.playPauseButtonIcon} source={pauseButtonIcon}/>
                        :   <Image style={styles.playPauseButtonIcon} source={playButtonIcon}/>
                    }
                </Pressable>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#16171A',
    },
    playerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    titleContainer:{
        flex: 3,
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 14,
        paddingVertical: 4
    },
    titleText: {
        fontSize: 16,
        color: 'white',
    }, 
    author: {
        color: 'grey'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playPauseButtonIcon: {
        height: 48,
        width: 48
    }
});

export default MiniPlayer;