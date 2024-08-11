import { configureStore } from "@reduxjs/toolkit";
import cardStatusReducer from "./cardStatusSlice";
import apiSlice from "./apiSlice";

export default configureStore({
  reducer: {
    cardStatus: cardStatusReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});
