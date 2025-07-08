import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BasketItem } from '../types';

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200/api';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<BasketItem[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<BasketItem, Partial<BasketItem>>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApi;
