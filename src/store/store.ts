import { configureStore } from "@reduxjs/toolkit";
import combinedReducers from './combinedReducers';

export const store = configureStore({
    reducer: combinedReducers
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducers>;