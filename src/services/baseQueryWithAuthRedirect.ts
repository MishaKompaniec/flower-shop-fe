import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4200/api';

export const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
