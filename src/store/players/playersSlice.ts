import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firestore";

type Player = {
  id: string;
  name: string;
  selectedCard: number;
};

type PlayersState = {
  myId: string;
  players: Player[];
  isOpen: boolean;
};

const unsub = onSnapshot(doc(db, "poker", "m9AgAGLLhz9t7bd5lWnQ"), (doc) => {
  console.log("Current data: ", doc.data());
});

const initialState: PlayersState = {
  myId: "id003",
  players: [
    {
      id: "id001",
      name: "John",
      selectedCard: 3,
    },
    {
      id: "id002",
      name: "Tom",
      selectedCard: 1,
    },
    {
      id: "id003",
      name: "Ken",
      selectedCard: -1,
    },
  ],
  isOpen: false,
};

export const selectPlayers = (state: RootState) => state.players;

const getMyIndex = (state: PlayersState) => {
  return state.players.findIndex((player) => player.id === state.myId);
};

export const hasSelectedAllUsers = createSelector([selectPlayers], (state) => {
  return state.players.every((player) => player.selectedCard > 0);
});

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setMyCard: (state, { payload }: PayloadAction<number>) => {
      const idx = getMyIndex(state);
      if (idx > -1) {
        state.players[idx].selectedCard = payload;
      }
    },
    openCard: (state) => {
      state.isOpen = true;
    },
  },
});

export const playersReducer = playersSlice.reducer;
export const playersActions = playersSlice.actions;
