import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuthRedirect } from './baseQueryWithAuthRedirect';
import type { UpdateUserRequest, UserProfile } from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuthRedirect,
  tagTypes: ['User'],

  endpoints: (builder) => ({
    getMe: builder.query<UserProfile, void>({
      query: () => '/user/me',
      providesTags: ['User'],
    }),

    updateUser: builder.mutation<UserProfile, Partial<UpdateUserRequest>>({
      query: (body) => ({
        url: '/user/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetMeQuery, useUpdateUserMutation } = userApi;
