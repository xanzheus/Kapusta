import { configureStore } from '@reduxjs/toolkit';
import { exchangeRates } from './service/exchangeAPI';
import authReducer from '../redux/service/authSlice';
import { user } from './service/userAPI';
const store = configureStore({
  reducer: {
    [exchangeRates.reducerPath]: exchangeRates.reducer,
    [user.reducerPath]: user.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    user.middleware,
    exchangeRates.middleware,
  ],
});
export default store;
