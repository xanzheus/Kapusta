import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportsDataApi = createApi({
  reducerPath: 'reportsDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3004/',
  }),
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => `categories`,
    }),
  }),
});

export const { useGetCategoriesQuery } = reportsDataApi;
