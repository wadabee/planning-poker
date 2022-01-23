import { combineReducers } from "@reduxjs/toolkit";
import { playersReducer } from "./players/playersSlice";

export const rootReducer = combineReducers({
  players: playersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
