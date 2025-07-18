import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '@/services/productsApi';

export interface IROUTE_MODEL<T> {
  path: string;
  element: T;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AdvantageItemProps {
  title: string;
  text: string;
}

export interface DrawerItemProps {
  product: BasketItem;
}

export interface BasketItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description: string;
  category: 'bouquets' | 'plants' | 'fruitBouquets';
  image?: string;
  isBestSellers: boolean;
}

export interface BasketContextType {
  basket: BasketItem[];
  totalPrice: number;
  isBasketOpen: boolean;
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  openBasket: () => void;
  closeBasket: () => void;
  toggleBasket: () => void;
  clearBasket: () => void;
  totalItems: number;
}

export interface Advantage {
  title: string;
  text: string;
}

export interface ColumnsProps {
  onEdit: (item: BasketItem) => void;
  deleteProduct: ReturnType<typeof useDeleteProductMutation>[0];
  updateProduct: ReturnType<typeof useUpdateProductMutation>[0];
  uploadProductImage: ReturnType<typeof useUploadProductImageMutation>[0];
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'user' | 'admin';
}

export interface UpdateUserRequest {
  email: string;
  fullName: string;
  phoneNumber: string;
}

export interface ProfileFormValues {
  email?: string;
  name?: string;
  phone?: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
  title: string;
}

export interface Order {
  id: string;
  phone: string;
  address: string;
  userId: string;
  products: OrderProduct[];
  totalPrice: number;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface OrderCreateRequest {
  products: OrderProduct[];
}
