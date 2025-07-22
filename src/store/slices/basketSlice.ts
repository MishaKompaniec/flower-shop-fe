import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BasketItem } from '@/types';
import { LOCAL_STORAGE_KEY } from '@/utils';
import { RootState } from '../store';

const getInitialBasket = (): BasketItem[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

interface BasketState {
  basket: BasketItem[];
  isBasketOpen: boolean;
}

const initialState: BasketState = {
  basket: getInitialBasket(),
  isBasketOpen: false,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<BasketItem>) {
      const existing = state.basket.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket(state, action: PayloadAction<string>) {
      state.basket = state.basket.filter((i) => i.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.basket.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearBasket(state) {
      state.basket = [];
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
    toggleBasket(state) {
      state.isBasketOpen = !state.isBasketOpen;
    },
    openBasket(state) {
      state.isBasketOpen = true;
    },
    closeBasket(state) {
      state.isBasketOpen = false;
    },
  },
});

export const selectBasket = (state: RootState) => state.basket.basket;
export const selectIsBasketOpen = (state: RootState) =>
  state.basket.isBasketOpen;

export const selectTotalItems = (state: RootState) =>
  state.basket.basket.reduce((acc, item) => acc + (item.quantity || 1), 0);

export const selectTotalPrice = (state: RootState) =>
  state.basket.basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  clearBasket,
  toggleBasket,
  openBasket,
  closeBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
