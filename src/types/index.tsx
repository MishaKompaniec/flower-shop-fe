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
  category: string;
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
