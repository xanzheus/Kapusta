// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials } from './authSlice';

// export const user = createApi({
//   reducerPath: 'userAPI',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:4000/api/users/',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.accessToken;
//       console.log('header', token);

//       if (token) {
//         console.log('token', token);
//         headers.set('Authorization', `Bearer ${token}`);
//       }

//       return headers;
//     },
//     baseQueryWithReauth: async (args, api, extraOptions) => {
//       let result = await user.baseQuery(args, api, extraOptions);
//       if (result.error && result.error.status === 401) {
//         // try to get a new token
//         const refreshResult = await user.baseQuery(
//           {
//             url: `/refresh`,
//             method: 'POST',
//           },
//           api,
//           extraOptions,
//         );
//         if (refreshResult.data) {
//           // store the new token
//           api.dispatch(setCredentials(refreshResult.data));
//           // retry the initial query
//           result = await user.baseQuery(args, api, extraOptions);
//         } else {
//           api.dispatch(user.logout());
//         }
//       }
//       return result;
//     },
//   }),

//   tagTypes: ['userAPI'],
//   endpoints: builder => ({
//     createUser: builder.mutation({
//       query: ({ email, password }) => ({
//         url: `/registration`,
//         method: 'POST',
//         body: {
//           email,
//           password,
//         },
//       }),
//     }),
//     login: builder.mutation({
//       query: ({ email, password }) => ({
//         url: '/login',
//         method: 'POST',
//         body: {
//           email,
//           password,
//         },
//       }),
//     }),

//     logout: builder.mutation({
//       query: () => ({
//         url: '/logout',
//         method: 'POST',
//         headers: {
//           Authorization: '',
//         },
//       }),
//     }),
//   }),
// });

// export const { useCreateUserMutation, useLoginMutation, useLogoutMutation } = user;
