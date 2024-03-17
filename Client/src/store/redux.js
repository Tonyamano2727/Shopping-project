import { configureStore } from '@reduxjs/toolkit';
import appslice from './appslice';

export const store = configureStore({
  reducer: {
    app: appslice
  },
});
