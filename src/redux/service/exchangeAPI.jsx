import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exchangeRates = createApi({
  reducerPath: 'exchangeRates',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
  }),
  endpoints: builder => ({
    exchangeRates: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useExchangeRatesQuery } = exchangeRates;
