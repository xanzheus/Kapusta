import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
// import { toast } from 'react-toastify';
import { setCredentials } from './authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    console.log('header', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // const refreshToken = api.getState().auth.refreshToken;
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: `/refresh`,
        method: 'POST',
        // body: { refreshToken },
      },
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
  if (result.error && result.error.status === 400) {
    const { data } = result.error;
    toast.error(data.message);
  }

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
      query: ({ email, password }) => ({
        url: `/registration`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      providesTags: ['Auth'],
    }),
    login: builder.mutation({
      query: ({ email, password, refreshToken }) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password,
          refreshToken,
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
        headers: {
          authorization: '',
        },
        invalidatesTags: ['Auth'],
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
        method: 'POST',
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
