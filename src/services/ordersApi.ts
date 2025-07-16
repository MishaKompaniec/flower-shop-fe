import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuthRedirect } from './baseQueryWithAuthRedirect';
import { Order, OrderCreateRequest } from '@/types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    // Получить все заказы (для админа)
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),

    // Получить свои заказы (для пользователя)
    getMyOrders: builder.query<Order[], void>({
      query: () => '/orders/my',
      providesTags: ['Order'],
    }),

    // Создать заказ
    createOrder: builder.mutation<Order, OrderCreateRequest>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
