import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const novaPoshtaBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.novaposhta.ua/v2.0/json/',
  headers: {
    'Content-Type': 'application/json',
  },
});
