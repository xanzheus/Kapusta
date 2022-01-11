import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { userAPI } from './userAPI';
import { setCredentials } from './authSlice';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://adamants-wallet-project-back.herokuapp.com/api/',
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
      api.dispatch(userAPI.logout());
    }
  }
  if (result.error && result.error.status === 400) {
    const { data } = result.error;
    toast.error(data.message);
  }
  return result;
};

//////////////////////////////////////////////////////////////////
export const developerAPI = createApi({
  reducerPath: 'developersAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Developer'],
  endpoints: builder => ({
    getDataDevelopers: builder.query({
      query: () => ({
        url: `/developers`,
      }),
      providesTags: ['Developer'],
    }),
  }),
});

export const { useGetDataDevelopersQuery } = developerAPI;
