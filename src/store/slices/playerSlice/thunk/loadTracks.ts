import { createAsyncThunk } from "@reduxjs/toolkit";
import RNFS from 'react-native-fs';
import Track from "../../../../types/Track";

export default createAsyncThunk(
    'player/loadTracks/',
    async (_, thunkApi) => {
        try {
            const files = await RNFS.readDir(RNFS.DownloadDirectoryPath);
            const tracks: Track[] = [];
            let counter = 0;
            files.forEach((file) => {
                const i = file.name.lastIndexOf('.');
                const fileName = file.name.substring(0, i);
                const extension = file.name.substring(i + 1, file.name.length);
                if (extension === 'mp3') {
                    tracks.push({
                        id: counter++,
                        url: file.path,
                        title: fileName
                    });
                }
            });
    
            return tracks;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
);