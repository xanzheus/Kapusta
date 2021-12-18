import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './authSlice';
export const currentUserAPI = createApi({
  reducerPath: 'currentUserAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['CurrentUser'],

  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => '/current',
      providesTags: ['CurrentUser'],
    }),

    updateAvatar: builder.mutation({
      query: body => ({
        url: '/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['CurrentUser'],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateAvatarMutation } = currentUserAPI;
