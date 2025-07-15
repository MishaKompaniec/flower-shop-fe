import { BasketContextType, BasketItem } from '@/types';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'basket';

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  useEffect(() => {
    const savedBasket = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (e) {
        console.error(
          'Error when reading a shopping cart from localStorage:',
          e
        );
        setBasket([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item: BasketItem) => {
    setBasket((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (id: string) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const totalPrice = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = useMemo(() => {
    return basket.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [basket]);

  const toggleBasket = () => setIsBasketOpen((prev) => !prev);
  const closeBasket = () => setIsBasketOpen(false);
  const openBasket = () => setIsBasketOpen(true);

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <BasketContext.Provider
      value={{
        removeFromBasket,
        updateQuantity,
        toggleBasket,
        isBasketOpen,
        closeBasket,
        addToBasket,
        clearBasket,
        totalPrice,
        openBasket,
        totalItems,
        basket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
