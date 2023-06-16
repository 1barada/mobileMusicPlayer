import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { RootState } from "../store/store";
import { PlayerSliceType } from "../store/slices/playerSlice";

const Player = () => {
    const {tracksQueue, currentTrack} = useSelector<RootState, PlayerSliceType>(state => state.player);

    if (!currentTrack)
    return (
        <View style={styles.container}>
            <Text>Error: Not chosen track</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text>{currentTrack.title}</Text>
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