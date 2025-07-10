import { createApi } from '@reduxjs/toolkit/query/react';
import type { BasketItem } from '../types';
import { baseQueryWithAuthRedirect } from './baseQueryWithAuthRedirect';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithAuthRedirect,
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

    uploadProductImage: builder.mutation<
      { message: string; imagePath: string },
      { id: string; image: File }
    >({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append('image', image);

        return {
          url: `/products/${id}/image`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation<
      BasketItem,
      { id: string; data: Partial<BasketItem> }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
} = productsApi;
