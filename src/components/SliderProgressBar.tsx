import {Slider} from "@miblanchard/react-native-slider";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Sound from "react-native-sound";
import durationToString from "../utils/durationToString";

type SliderProgressBarProps = {
    sound: Sound | undefined
}

const SliderProgressBar = ({sound}: SliderProgressBarProps) => {
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [currentDuration, setCurrentDuration] = useState<number>(0);

    useEffect(() => {
        let intervalId: number;
        if (sound?.isLoaded()) {
            intervalId = setInterval(() => {
                sound.getCurrentTime((seconds) => {
                    setCurrentDuration(seconds * 1000)
                    setCurrentPosition(seconds / sound.getDuration())
                });
            }, 200);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        }
    }, [sound?.isLoaded()]);

    const trackDuration = useMemo<string>(() => {
        if (sound?.isLoaded()) {
            const durationSec = sound.getDuration() || 0;
            const duratinoMiliSec = durationSec * 1000;
            return durationToString(duratinoMiliSec);
        } else {
            return '0:00'
        }
    }, [sound?.isLoaded()]);

    const onSlidingCompleteHandler = (value: Array<number>) => {
        sound?.setCurrentTime(sound.getDuration() * value[0]);
    }
    
    return (
        <View style={styles.container}>
            <Slider
                value={currentPosition}
                onSlidingComplete={onSlidingCompleteHandler}
                minimumTrackTintColor='#87E4D8'
                maximumTrackTintColor='#617d72'
                thumbTintColor="#87E4D8"
            />
            <View style={styles.timings}>
                <Text style={styles.timingsText}>{durationToString(currentDuration)}</Text>
                <Text style={styles.timingsText}>{trackDuration}</Text>
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    timings: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timingsText: {
        color: 'white'
    }
});
export default SliderProgressBar;