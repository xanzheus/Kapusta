import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exchangeRates = createApi({
  reducerPath: 'exchangeRates',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api',
  }),
  endpoints: builder => ({
    exchangeRates: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useExchangeRatesQuery } = exchangeRates;
