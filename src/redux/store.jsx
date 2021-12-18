import { configureStore } from '@reduxjs/toolkit';
import { exchangeRates } from './service/exchangeAPI';
import authReducer from '../redux/service/authSlice';
import { userAPI } from './service/userAPI';

const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    auth: authReducer,
    [exchangeRates.reducerPath]: exchangeRates.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    userAPI.middleware,
    exchangeRates.middleware,
  ],
});

export default store;
