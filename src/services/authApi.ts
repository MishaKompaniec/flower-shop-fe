import { createApi } from '@reduxjs/toolkit/query/react';
import { rawBaseQuery } from './baseQueryWithAuthRedirect';

interface RegisterRequest {
  email: string;
  password: string;
  role: string;
}

interface RegisterResponse {
  message: string;
  userId: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  email: string;
  role: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: rawBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
