import { ScrollView, StyleSheet, View } from "react-native";
import Track from "../types/Track";
import TracksListItem from "./TracksListItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export type TracksListProps = {
    tracks: Track[]
}

const TracksList = ({tracks}: TracksListProps) => {
    const isBigPlayerOpen = useSelector<RootState, boolean>(state => state.player.isBigPlayerOpen);
    
    return (
        <View style={isBigPlayerOpen ? styles.hiddenContainer : styles.baseContainer}>
            <ScrollView style={styles.list}>
                {tracks.map((track) => 
                    <TracksListItem key={track.path} track={track}/>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    baseContainer: {
        flex: 6,
        flexBasis: 'auto'
    },
    hiddenContainer: {
        flex: 0,
        flexBasis: 0
    },
    list: {
        
    }
});

export default TracksList;