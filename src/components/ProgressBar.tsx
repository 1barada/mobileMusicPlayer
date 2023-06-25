import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Track from "../types/Track";
import Sound from "react-native-sound";

type ProgressBarProps = {
    sound: Sound | undefined
}

const ProgressBar = ({sound}: ProgressBarProps) => {
    const [currentPosition, setCurrentPosition] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (sound) sound.getCurrentTime((seconds) => setCurrentPosition(seconds / sound.getDuration()));
        }, 200);


        return () => {
            if (intervalId !== -1) clearInterval(intervalId);
        }
    }, [sound]);

    return (
        <View style={styles.container}>
            <View style={[styles.bar, {width: `${currentPosition * 100}%`}]}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#617d72',
        width: '100%',
        height: 5
    },
    bar: {
        backgroundColor: '#87E4D8',
        height: '100%'
    }
});
 
export default ProgressBar;