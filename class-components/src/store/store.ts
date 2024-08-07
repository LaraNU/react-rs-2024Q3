import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardStatusReducer from "./cardStatusSlice";
import apiSlice from "./apiSlice";
import { createWrapper } from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: {
      cardStatus: cardStatusReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<RootStore>(makeStore);
