import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import loadTracks from "../store/slices/playerSlice/thunk/loadTracks";
import { PlayerSliceType } from "../store/slices/playerSlice";
import TracksList from "./TracksList";
import Player from "./Player";



const AppBody = () => {
    const {isLoading, tracks, isMiniPlayerOpen} = useSelector<RootState, PlayerSliceType>(state => state.player);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isLoading)
            dispatch(loadTracks());
    }, []);

    if (isLoading)
    return (
        <View style={[styles.container, styles.loadScreen]}>
            <ActivityIndicator size='large'/>
        </View>
    );

    return (
        <View style={styles.container}>
            <TracksList tracks={tracks}/>
            {isMiniPlayerOpen && <Player/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadScreen: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
 
export default AppBody;