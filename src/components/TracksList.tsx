import { ScrollView, StyleSheet, View } from "react-native";
import Track from "../types/Track";
import TracksListItem from "./TracksListItem";

export type TracksListProps = {
    tracks: Track[]
}

const TracksList = ({tracks}: TracksListProps) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.list}>
                {tracks.map((track) => 
                    <TracksListItem key={track.id} track={track}/>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 6
    },
    list: {
        
    }
});
 
export default TracksList;