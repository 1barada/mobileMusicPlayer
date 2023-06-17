import { useDispatch, useSelector } from "react-redux";
import { Button, StyleSheet, Text, View } from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { PlayerSliceType } from "../store/slices/playerSlice";
import Sound from "react-native-sound";
import { useEffect, useState } from "react";

const Player = () => {
    const [currentSound, setCurrentSound] = useState<Sound>();
    const {tracksQueue, currentTrack} = useSelector<RootState, PlayerSliceType>(state => state.player);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (currentSound) {
            currentSound.release();
        }

        if (currentTrack) {
            const sound = new Sound(currentTrack.url, '', (error) => {
                if (error) {
                    console.log(error);
                    return;
                }

                sound.play((succses) => {
                    if (succses)
                        console.log('track: ' + currentTrack.title);
                    else    
                        console.error('Error: something went wrong while track is played');
                });
            });

            setCurrentSound(sound);
        }
    }, [currentTrack]);

    const playTrack = () => {
        if (currentSound && currentSound.isLoaded()) {
            currentSound.play();
        }
    };

    const pauseTrack = () => {
        if (currentSound && currentSound.isPlaying()) {
            currentSound.pause();
        }
    };

    if (!currentTrack)
    return (
        <View style={styles.container}>
            <Text>Error: Not chosen track</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text>{currentTrack.title}</Text>
            <Button title="play" onPress={playTrack}/>
            <Button title="pause" onPress={pauseTrack}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'yellow'     
    }
});
 
export default Player;