import { createSlice } from "@reduxjs/toolkit";

type State = {
  cardStatus: boolean;
};

const initialState: State = {
  cardStatus: true,
};

export const counterSlice = createSlice({
  name: "cardStatus",
  initialState,
  reducers: {
    openCardSlice(state, action) {
      state.cardStatus = true;
      action.payload;
    },
    closeCard(state, action) {
      state.cardStatus = false;
      action.payload;
    },
  },
});

export const { openCardSlice, closeCard } = counterSlice.actions;

export default counterSlice.reducer;
