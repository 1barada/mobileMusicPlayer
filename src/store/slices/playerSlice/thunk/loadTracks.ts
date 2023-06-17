import { createAsyncThunk } from "@reduxjs/toolkit";
import fs from 'react-native-fs';
import Track from "../../../../types/Track";

export default createAsyncThunk(
    'player/loadTracks/',
    async (_, thunkApi) => {
        try {
            const files = await fs.readDir(fs.DownloadDirectoryPath);
            const tracks: Track[] = [];
            let counter = 0;
            files.forEach(async (file) => {
                const i = file.name.lastIndexOf('.');
                const extension = file.name.substring(i + 1, file.name.length);
                const fileName = file.name.substring(0, i);
                if (extension === 'mp3') {
                    tracks.push({
                        id: counter++,
                        url: file.path,
                        title: fileName,
                    });
                }
            });

            return tracks;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
);