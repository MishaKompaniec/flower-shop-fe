import { createApi } from '@reduxjs/toolkit/query/react';
import { novaPoshtaBaseQuery } from './novaPoshtaBaseQuery';

const NOVA_POSHTA_API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY;

interface NovaPoshtaRequest<T> {
  apiKey: string;
  modelName: string;
  calledMethod: string;
  methodProperties?: T;
}

interface Area {
  Ref: string;
  Description: string;
}

interface City {
  Ref: string;
  Description: string;
  Area: string;
}

interface Street {
  Ref: string;
  StreetsType: string;
  Description: string;
}

export const novaPoshtaApi = createApi({
  reducerPath: 'novaPoshtaApi',
  baseQuery: novaPoshtaBaseQuery,
  endpoints: (builder) => ({
    getAreas: builder.query<Area[], void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          apiKey: NOVA_POSHTA_API_KEY,
          modelName: 'Address',
          calledMethod: 'getAreas',
        } satisfies NovaPoshtaRequest<undefined>,
      }),
      transformResponse: (response: { data: Area[] }) => response.data,
    }),

    getCities: builder.query<City[], { areaRef?: string }>({
      query: ({ areaRef }) => ({
        url: '',
        method: 'POST',
        body: {
          apiKey: NOVA_POSHTA_API_KEY,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: areaRef ? { AreaRef: areaRef } : {},
        } satisfies NovaPoshtaRequest<{ AreaRef?: string }>,
      }),
      transformResponse: (response: { data: City[] }) => response.data,
    }),

    getStreets: builder.query<
      Street[],
      { cityRef: string; streetName: string }
    >({
      query: ({ cityRef, streetName }) => ({
        url: '',
        method: 'POST',
        body: {
          apiKey: NOVA_POSHTA_API_KEY,
          modelName: 'Address',
          calledMethod: 'getStreet',
          methodProperties: {
            CityRef: cityRef,
            FindByString: streetName,
          },
        } satisfies NovaPoshtaRequest<{
          CityRef: string;
          FindByString: string;
        }>,
      }),
      transformResponse: (response: { data: Street[] }) => response.data,
    }),
  }),
});

export const {
  useGetAreasQuery,
  useGetCitiesQuery,
  useGetStreetsQuery,
  useLazyGetAreasQuery,
  useLazyGetCitiesQuery,
  useLazyGetStreetsQuery,
} = novaPoshtaApi;
