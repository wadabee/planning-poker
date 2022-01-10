import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

type PokerCardState = {
  value: number;
};

const initialState: PokerCardState = {
  value: 0,
};

export const pokerCardSlice = createSlice({
  name: "pokerCard",
  initialState,
  reducers: {
    selectCard: (state, { payload }: PayloadAction<number>) => {
      state.value = payload;
    },
  },
});

export const selectPokerCard = (state: RootState) => state.pokerCard;
export const pokerCardReducer = pokerCardSlice.reducer;
export const { selectCard } = pokerCardSlice.actions;
