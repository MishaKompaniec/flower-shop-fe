import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200/api';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
