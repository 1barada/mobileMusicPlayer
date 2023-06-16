import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Player from "./Player";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import loadTracks from "../store/slices/playerSlice/thunk/loadTracks";
import TracksList from "./TracksList";
import { PlayerSliceType } from "../store/slices/playerSlice";

const AppBody = () => {
    const {isLoading, isPlayerOpen, tracks} = useSelector<RootState, PlayerSliceType>(state => state.player);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(loadTracks());
    }, []);

    if (isLoading)
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
        </View>
    );

    return (
        <View style={styles.container}>
            <TracksList tracks={tracks}/>
            {isPlayerOpen && <Player/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
 
export default AppBody;