import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Wrapper } from './style';
import { useGetProductsQuery } from '@/services/productsApi';
import { BasketItem } from '@/types';
import ProductList from './productList';

const Store = () => {
  const { data: products } = useGetProductsQuery();
  const { t } = useTranslation();

  const [bouquets, setBouquets] = useState<BasketItem[]>([]);
  const [plants, setPlants] = useState<BasketItem[]>([]);
  const [fruitBouquets, setFruitBouquets] = useState<BasketItem[]>([]);
  const [priceSortOrder, setPriceSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (products?.length) {
      const sortByPrice = (arr: BasketItem[]) =>
        [...arr].sort((a, b) =>
          priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

      setBouquets(
        sortByPrice(products.filter((p) => p.category === 'bouquets'))
      );
      setPlants(sortByPrice(products.filter((p) => p.category === 'plants')));
      setFruitBouquets(
        sortByPrice(products.filter((p) => p.category === 'fruitBouquets'))
      );
    }
  }, [products, priceSortOrder]);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <Wrapper>
      <Tabs
        defaultActiveKey='bouquets'
        tabPosition={isMobile ? 'top' : 'left'}
        items={[
          {
            label: t('store.bouquets'),
            key: 'bouquets',
            children: (
              <ProductList
                products={bouquets}
                priceSortOrder={priceSortOrder}
                setPriceSortOrder={setPriceSortOrder}
              />
            ),
          },
          {
            label: t('store.plants'),
            key: 'plants',
            children: (
              <ProductList
                products={plants}
                priceSortOrder={priceSortOrder}
                setPriceSortOrder={setPriceSortOrder}
              />
            ),
          },
          {
            label: t('store.fruitBouquets'),
            key: 'fruit',
            children: (
              <ProductList
                products={fruitBouquets}
                priceSortOrder={priceSortOrder}
                setPriceSortOrder={setPriceSortOrder}
              />
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default Store;
