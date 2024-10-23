import { countryList } from '../countries/countriesList';
import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: countryList,
  },
  reducers: {},
});

export default countrySlice;
export const selectCountries = (state) => state.countries.countries;
