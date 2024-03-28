import { configureStore } from '@reduxjs/toolkit';
import appslice from './app/appslice';
import userSlice from './user/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';

const commonConfig = {
  key: 'shop/user',
  storage
}
const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn','token']
}

export const store = configureStore({
  reducer: {
    app: appslice,
    user: persistReducer(userConfig, userSlice)
  },
});

export const persistor = persistStore(store)