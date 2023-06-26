import { createSlice } from "@reduxjs/toolkit";
import Track from "../../../types/Track";
import loadTracks from "./thunk/loadTracks";
import shuffleTracks from "../../../utils/shuffleTracks";

export type PlayerSliceType = {
    isLoading: boolean,
    isMiniPlayerOpen: boolean,
    isBigPlayerOpen: boolean,
    isControllable: boolean,
    tracks: Track[],
    tracksQueue: Track[],
    currentTrack: Track | null | undefined,
    repeat: Repeat,
    shuffle: boolean
};

export enum Repeat {
    NoRepeat,
    RepeatCurrent,
    RepeatQueue
}

export const initialState: PlayerSliceType = {
    isLoading: true,
    isMiniPlayerOpen: false,
    isBigPlayerOpen: false,
    isControllable: true,
    tracks: [],
    tracksQueue: [],
    currentTrack: null,
    repeat: Repeat.NoRepeat,
    shuffle: false
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setIsControllable(state, {payload}: {payload: boolean}) {
            state.isControllable = payload;
        },
        openMiniPlayer(state, {payload}: {payload: string}) {
            state.tracksQueue = state.tracks;
            state.currentTrack = state.tracks.find((track) => track.path === payload);
            state.isMiniPlayerOpen = true;
        },
        openBigPlayer(state) {
            state.isBigPlayerOpen = true;
        },
        closeBigPlayer(state) {
            state.isBigPlayerOpen = false;
        },
        setCurrentTrackHandler(state, {payload}: {payload: string}) {
            state.currentTrack = undefined;
            state.currentTrack = state.tracks.find((track) => track.path === payload);
        },
        setShuffle(state) {
            if (state.shuffle) {
                state.tracksQueue = state.tracks;
                state.shuffle = false;
            } else {
                state.tracksQueue = shuffleTracks(state.tracks);
                state.shuffle = true;
            }
        },
        nextTrack(state) {
            const currentTrack = state.currentTrack;
            if (state.isControllable && currentTrack) {
                const index = state.tracksQueue.findIndex((track) => track.path === currentTrack.path)
                if (state.tracksQueue.length - 1 === index) {
                    if (state.repeat === Repeat.RepeatQueue) {
                        if (state.shuffle) {
                            state.tracksQueue = shuffleTracks(state.tracks);
                            state.currentTrack = state.tracksQueue[0];
                        } else {
                            state.currentTrack = state.tracksQueue[0];
                        }
                    }
                } else {
                    state.currentTrack = state.tracksQueue[index + 1];
                }
            }
        },
        previousTrack(state) {
            const currentTrack = state.currentTrack;
            if (state.isControllable && currentTrack) {
                const index = state.tracksQueue.findIndex((track) => track.path === currentTrack.path)
                if (index !== 0) {
                    state.currentTrack = state.tracksQueue[index - 1];
                }
            }
        },
        setRepeat(state) {
            switch(state.repeat) {
                case Repeat.NoRepeat:
                    state.repeat = Repeat.RepeatCurrent;
                    break;
                case Repeat.RepeatCurrent:
                    state.repeat = Repeat.RepeatQueue;
                    break;
                case Repeat.RepeatQueue:
                    state.repeat = Repeat.NoRepeat;
                    break;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(loadTracks.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loadTracks.fulfilled, (state, action) => {
            const payload: Track[] = action.payload!;
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
    setIsControllable,
    openMiniPlayer,
    openBigPlayer,
    closeBigPlayer,
    setCurrentTrackHandler,
    setShuffle, 
    nextTrack,
    previousTrack,
    setRepeat
} = playerSlice.actions;
export default playerSlice.reducer;