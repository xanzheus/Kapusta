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
import { setupListeners } from '@reduxjs/toolkit/query';
import storage from 'redux-persist/lib/storage';
import { exchangeRates } from './service/exchangeAPI';
import authReducer from '../redux/service/authSlice';
import { userAPI } from './service/userAPI';
import { developerAPI } from './service/developerAPI';
import { transactionApi } from './service/transactionApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken'],
};

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    [exchangeRates.reducerPath]: exchangeRates.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [developerAPI.reducerPath]: developerAPI.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

    userAPI.middleware,
    exchangeRates.middleware,
    transactionApi.middleware,
    developerAPI.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
