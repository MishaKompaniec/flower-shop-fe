import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/authApi';
import { userApi } from './services/userApi';
import { productsApi } from './services/productsApi';
import { ordersApi } from './services/ordersApi';
import basketReducer from './slices/basketSlice';
import authReducer from './slices/authSlice';
import { novaPoshtaApi } from './services/adressApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [novaPoshtaApi.reducerPath]: novaPoshtaApi.reducer,
    basket: basketReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      userApi.middleware,
      ordersApi.middleware,
      novaPoshtaApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
