// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials } from './authSlice';
// import { userAPI } from './userAPI';
// const baseQuery = fetchBaseQuery({
//   baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/users',
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.accessToken;
//     // console.log('header', token);

//     if (token) {
//       // console.log('token', token);
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   // console.log(result);
//   if (result.error && result.error.status === 401) {
//     // try to get a new token
//     const refreshResult = await baseQuery(
//       {
//         url: `/refresh`,
//         method: 'POST',
//       },
//       api,
//       extraOptions,
//     );
//     if (refreshResult.data) {
//       // store the new token
//       api.dispatch(setCredentials(refreshResult.data));
//       // retry the initial query
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(userAPI.logout());
//     }
//   }
//   return result;
// };

// export const currentUserAPI = createApi({
//   reducerPath: 'currentUserAPI',
//   tagTypes: ['CurrentUser, User'],
//   baseQuery: baseQueryWithReauth,

//   endpoints: builder => ({
//     getCurrentUser: builder.query({
//       query: () => ({
//         url: `current`,
//       }),
//       providesTags: ['CurrentUser', 'User'],
//     }),

//     updateAvatar: builder.mutation({
//       query: body => ({
//         url: '/avatar',
//         method: 'PATCH',
//         body,
//       }),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     updateDataUser: builder.mutation({
//       query: body => ({
//         url: '/update',
//         method: 'PATCH',
//         body,
//       }),
//       providesTags: ['CurrentUser', 'User'],
//     }),

//     inviteFriend: builder.mutation({
//       query: body => ({
//         url: '/invite',
//         method: 'POST',
//         body,
//       }),
//       invalidatesTags: ['CurrentUser'],
//     }),
//   }),
// });

// export const {
//   useGetCurrentUserQuery,
//   useUpdateAvatarMutation,
//   useInviteFriendMutation,
//   useUpdateDataUserMutation,
// } = currentUserAPI;
