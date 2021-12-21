import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials } from './authSlice';
export const googleAPI = createApi({
  reducerPath: 'googleAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['googleAuth'],
  endpoints: builder => ({
    googleAuth: builder.mutation({
      query: () => ({
        url: '/google',
        method: 'GET',
        providesTags: ['googleAuth'],
      }),
    }),
  }),
});

export const { useGoogleAuthMutation } = googleAPI;
