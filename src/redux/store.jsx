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
import { googleAPI } from './service/googleAuth';
// import { currentUserAPI } from './service/currentUserAPI';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    // [currentUserAPI.reducerPath]: currentUserAPI.reducer,
    auth: persistReducer(authPersistConfig, authReducer),
    [googleAPI.reducerPath]: googleAPI.reducer,
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
    // currentUserAPI.middleware,
    googleAPI.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
