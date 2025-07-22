import { createApi } from '@reduxjs/toolkit/query/react';
import { rawBaseQuery } from './baseQueryWithAuthRedirect';
import { BasketItem } from '@/types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: rawBaseQuery,
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<
      BasketItem[],
      { sortBy?: string; order?: 'asc' | 'desc' } | void
    >({
      query: (params) => {
        const queryString = params
          ? `?sortBy=${params.sortBy ?? 'title'}&order=${params.order ?? 'asc'}`
          : '';

        return `/products${queryString}`;
      },
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
