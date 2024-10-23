import { configureStore } from '@reduxjs/toolkit';
import countrySlice from './sliceCountries';

const store = configureStore({
  reducer: {
    countries: countrySlice.reducer,
  },
});

export default store;
