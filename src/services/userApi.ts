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

    uploadAvatar: builder.mutation<{ avatarUrl: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('avatar', file);

        return {
          url: '/user/me/avatar',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['User'],
    }),

    getAvatar: builder.query<{ avatarUrl: string | null }, void>({
      query: () => '/user/me/avatar',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
  useGetAvatarQuery,
} = userApi;
