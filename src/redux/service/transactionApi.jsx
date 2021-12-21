import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './authSlice';
const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/transactions',
  baseUrl: 'http://localhost:3004/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    console.log('header', token);

    if (token) {
      // console.log('token', token);
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: `/refresh`,
        method: 'POST',
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(transactionApi.logout());
    }
  }
  return result;
};

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: 'http://localhost:3004/',
  // }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transaction'],
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => ({ url: `categories?startDate=2021-12-01&endDate=2021-12-31` }),
    }),
  }),
});

export const { useGetCategoriesQuery } = transactionApi;
