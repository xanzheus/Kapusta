import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const user = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['userAPI'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `/registration`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),

    logout: builder.mutation({
      query: {},
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = user;
