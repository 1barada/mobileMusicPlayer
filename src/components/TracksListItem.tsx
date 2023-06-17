import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Track from "../types/Track";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { AppDispatch } from "../store/store";
import { openPlayer } from "../store/slices/playerSlice";

export type TracksListItemProps = {
    track: Track
}

const TracksListItem = ({track}: TracksListItemProps) => {
    const [isPress, setIsPress] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <View style={styles.container}>
            <TouchableHighlight 
                underlayColor='#DDDDDD'
                style={isPress ? styles.normal : styles.pressed}
                onHideUnderlay={() => setIsPress(false)}
                onShowUnderlay={() => setIsPress(true)}
                onPress={() => {dispatch(openPlayer(track.id))}}
            >
                <View style={styles.item}>
                    <Text>{track.title}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderColor: 'grey',
        borderWidth: 1,
        height: 60,
    },
    normal: {

    },
    pressed: {

    }
});
 
export default TracksListItem;