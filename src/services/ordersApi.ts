import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuthRedirect } from './baseQueryWithAuthRedirect';
import { Order, OrderCreateRequest } from '@/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),

    getMyOrders: builder.query<Order[], void>({
      query: () => '/orders/my',
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation<Order, OrderCreateRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    completeOrder: builder.mutation<Order, string>({
      query: (orderId) => ({
        url: `/orders/${orderId}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Order'],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useCompleteOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
