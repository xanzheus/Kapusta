import { configureStore } from '@reduxjs/toolkit';
import { exchangeRates } from './service/exchangeAPI';
import authReducer from '../redux/service/authSlice';
import { user } from './service/userAPI';
const store = configureStore({
  reducer: {
    [user.reducerPath]: user.reducer,
    auth: authReducer,
    [exchangeRates.reducerPath]: exchangeRates.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    user.middleware,
    exchangeRates.middleware,
  ],
});
export default store;
