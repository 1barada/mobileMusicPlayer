import { combineReducers } from "redux";
import playerSlice from "./slices/playerSlice";

export default combineReducers({
    player: playerSlice
});