import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { userAPI } from './userAPI';
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
  const refreshToken = api.getState().auth.refreshToken;
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: `/refresh`,
        method: 'POST',
        body: { refreshToken },
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

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transaction'],
  endpoints: builder => ({
    getCategories: builder.query({
      query: arg => {
        const { startDate, endDate } = arg;
        console.log(startDate);
        console.log(endDate);
        return {
          url: `transactions/categories`,
          params: { startDate, endDate },
        };
      },
      // query: () => ({
      //   url: `categories?startDate=2021-12-01&endDate=2021-12-31`,
      //   // url: `categories`,
      // }),
    }),
    getTransactions: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `transactions?startDate=${startDate}&endDate=${endDate}`,
      }),
      providesTags: ['Transaction'],
    }),

    createTransaction: builder.mutation({
      query: ({ date, category, comment, amount, type }) => ({
        url: `transactions`,
        method: 'POST',
        body: {
          date,
          category,
          comment,
          amount,
          type,
        },
      }),
      invalidatesTags: ['Transaction'],
    }),

    deleteTransaction: builder.mutation({
      query: id => ({
        url: `transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),
    
    updateTransaction: builder.mutation({
      query: ({ id, date, category, comment, amount, type }) => ({
        url: `transactions/${id}`,
        method: 'PATCH',
        body: {
          date,
          category,
          comment,
          amount,
          type,
        },
      }),
      invalidatesTags: ['Transaction'],
    }),
    updateBalanse: builder.mutation({
      query: ({ balance }) => ({
        url: `users/update`,
        method: 'PATCH',
        body: {
          balance,
        },
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useUpdateBalanseMutation,
} = transactionApi;
