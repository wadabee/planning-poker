import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

type PokerCardState = {
  selectedCard: number;
};

const initialState: PokerCardState = {
  selectedCard: -1,
};

export const pokerCardSlice = createSlice({
  name: "pokerCard",
  initialState,
  reducers: {
    selectCard: (state, { payload }: PayloadAction<number>) => {
      if (state.selectedCard === payload) {
        state.selectedCard = -1;
      } else {
        state.selectedCard = payload;
      }
    },
  },
});

export const selectPokerCard = (state: RootState) => state.pokerCard;
export const pokerCardReducer = pokerCardSlice.reducer;
export const { selectCard } = pokerCardSlice.actions;
