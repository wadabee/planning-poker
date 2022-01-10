import { combineReducers } from "@reduxjs/toolkit";
import { pokerCardReducer } from "./pokerCard/pokerCardSlice";

export const rootReducer = combineReducers({
  pokerCard: pokerCardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
