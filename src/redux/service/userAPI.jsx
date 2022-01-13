import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import toast from 'react-hot-toast';
import { setCredentials, logOut } from './authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = api.getState().auth.refreshToken;
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: `/refresh`,
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      console.log('refreshDATA', refreshResult.data.data);
      const { data } = refreshResult.data;
      // store the new token
      api.dispatch(setCredentials(data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery(
        {
          url: `/logout`,
          method: 'POST',
          body: { refreshToken },
        },
        // clean state
        api.dispatch(logOut()),
        extraOptions,
      );
    }
  }
  // if (result.error && result.error.status === 400) {
  //   const { data } = result.error;
  //   toast.error(data.message);
  // }

  // if (result.error && result.error.status === 403) {
  //   const { data } = result.error;
  //   toast.error(data.message);
  // }
  return result;
};
//////////////////////////////////////////////////////////////////
export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({
    createUser: builder.mutation({
      query: newUser => ({
        url: `/registration`,
        method: 'POST',
        body: newUser,
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
      query: refreshToken => ({
        url: '/logout',
        method: 'POST',
        headers: {
          authorization: '',
        },
        body: {
          refreshToken,
        },
      }),
    }),

    getDataUser: builder.query({
      query: () => ({
        url: `/current`,
      }),
      providesTags: ['User'],
    }),

    updateAvatar: builder.mutation({
      query: body => ({
        url: '/avatar',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updateDataUser: builder.mutation({
      query: body => ({
        url: '/update',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    inviteFriend: builder.mutation({
      query: body => ({
        url: '/invite',
        method: 'POST',
        body,
      }),
    }),

    sendRequestAccept: builder.mutation({
      query: body => ({
        url: '/phone-verify',
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
  useGetDataUserQuery,
  useUpdateAvatarMutation,
  useInviteFriendMutation,
  useUpdateDataUserMutation,
  useSendRequestAcceptMutation,
} = userAPI;
