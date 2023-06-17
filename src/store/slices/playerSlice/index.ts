import { createSlice } from "@reduxjs/toolkit";
import Track from "../../../types/Track";
import loadTracks from "./thunk/loadTracks";
import Sound from "react-native-sound";

export type PlayerSliceType = {
    isLoading: boolean,
    isPlayerOpen: boolean,
    tracks: Track[],
    tracksQueue: Track[],
    currentTrack: Track | null,
};

export const initialState: PlayerSliceType = {
    isLoading: true,
    isPlayerOpen: false,
    tracks: [],
    tracksQueue: [],
    currentTrack: null,
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        openPlayer(state, {payload}: {payload: number}) {
            state.tracksQueue = state.tracks;
            state.currentTrack = state.tracksQueue[payload];
            state.isPlayerOpen = true;
        },
    },
    extraReducers: builder => {
        builder.addCase(loadTracks.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loadTracks.fulfilled, (state, action) => {
            const payload = action.payload as Track[];
            state.tracks = payload;
            state.isLoading = false;
        });
        builder.addCase(loadTracks.rejected, (state, action) => {
            const payload = action.payload;
            console.error(payload);
            state.isLoading = false;
        });
    }
});

export const {
    openPlayer,
} = playerSlice.actions;
export default playerSlice.reducer;