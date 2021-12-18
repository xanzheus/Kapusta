import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from './authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users',
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
        url: `refresh`,
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
      api.dispatch(userAPI.logout());
    }
  }
  return result;
};

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userAPI'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: ({ email, password }) => ({
        url: `registration`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        headers: {
          Authorization: '',
        },
      }),
    }),

    getCurrentUser: builder.query({
      query: () => 'current',
    }),

    updateAvatar: builder.mutation({
      query: body => ({
        url: 'avatar',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateAvatarMutation,
} = userAPI;
