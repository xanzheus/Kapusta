import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { exchangeRates } from './service/exchangeAPI';
import authReducer from '../redux/service/authSlice';

import { userAPI } from './service/userAPI';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};
export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    auth: persistReducer(authPersistConfig, authReducer),

    [exchangeRates.reducerPath]: exchangeRates.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

    userAPI.middleware,
    exchangeRates.middleware,
  ],
});
export const persistor = persistStore(store);
