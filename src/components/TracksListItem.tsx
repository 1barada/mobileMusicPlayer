import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Track from "../types/Track";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import { PlayerSliceType, openMiniPlayer, setCurrentTrack } from "../store/slices/playerSlice";
import noTrackImage from '../assets/images/icons/images.jpg';
import durationToString from "../utils/durationToString";

export type TracksListItemProps = {
    track: Track
}

const TracksListItem = ({track}: TracksListItemProps) => {
    const [isPress, setIsPress] = useState<boolean>(false);
    const {currentTrack, isMiniPlayerOpen} = useSelector<RootState, PlayerSliceType>(state => state.player);
    const dispatch = useDispatch<AppDispatch>();

    const onPress = () => {
        if (isMiniPlayerOpen) {
            dispatch(setCurrentTrack(track.path));
        } else {
            dispatch(openMiniPlayer(track.path))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight 
                underlayColor='#8c4343'
                style={isPress ? styles.pressed : styles.normal}
                onHideUnderlay={() => setIsPress(false)}
                onShowUnderlay={() => setIsPress(true)}
                onPress={onPress}
            >
                <View style={styles.item}>
                    <Image source={track.cover ? {uri: track.cover} : noTrackImage} style={styles.cover}/>
                    <View style={styles.info}>
                        <Text numberOfLines={2} style={styles.title}>{track.title}</Text>
                        {track.author &&  
                        <Text numberOfLines={1} style={styles.author}>{track.author}</Text>
                        }
                    </View>
                    {currentTrack?.path === track.path
                        ?   <Text style={styles.selected}>▶</Text>
                        :   <Text style={styles.duration}>{durationToString(track.duration)}</Text>
                    }
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        height: 60,
    },
    normal: {

    },
    pressed: {
        
    },
    info: {
        flex: 5,
        paddingHorizontal: 10
    },
    title: {
        color: '#d8f3dc'
    },
    author: {
        fontSize: 12,
        color: '#808a81'
    },
    cover: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: 'black',
        width: 50,
        height: 50
    }, 
    duration: {
        flex: 1,
        color: 'white'
    },
    selected: {
        flex: 1,
        color: '#fcbb90',
        fontSize: 30,
    }
});
 
export default TracksListItem;