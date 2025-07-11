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
