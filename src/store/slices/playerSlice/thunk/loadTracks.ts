import { createAsyncThunk } from "@reduxjs/toolkit";
import MusicFiles from '@yajanarao/react-native-get-music-files';
import Track from "../../../../types/Track";

export default createAsyncThunk(
    'player/loadTracks/',
    async (_, thunkApi) => {
        try {
            const tracks: Track[] = [];
            const songs = await MusicFiles.getAll(options);
            songs.forEach(song => {
                tracks.push(song as Track);
            });

            return tracks;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
);

const options = {
    title: true,
    duration: true, 
    artist: true,
    genre: true,
    cover: true,
    album: true,
    fields : ['title','albumTitle','genre','lyrics','artwork','duration'] // for iOs Version
};