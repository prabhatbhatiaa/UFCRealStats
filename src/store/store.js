import { configureStore } from '@reduxjs/toolkit';
import fighterReducer from './fighterSlice';

export const store = configureStore({
  reducer: {
    fighters: fighterReducer,
  },
});