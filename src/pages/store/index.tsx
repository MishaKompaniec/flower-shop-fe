import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Bouquets from './bouquets';
import FruitBouquets from './fruitBouquets';
import Plants from './plants';
import { Wrapper } from './style';
import { useGetProductsQuery } from '../../services/productsApi';
import type { BasketItem } from '../../types';

const Store = () => {
  const { data: products } = useGetProductsQuery();
  const [bouquets, setBouquets] = useState<BasketItem[]>([]);
  const [plants, setPlants] = useState<BasketItem[]>([]);
  const [fruitBouquets, setFruitBouquets] = useState<BasketItem[]>([]);

  useEffect(() => {
    if (products?.length) {
      setBouquets(products.filter((p) => p.category === 'bouquets'));
      setPlants(products.filter((p) => p.category === 'plants'));
      setFruitBouquets(products.filter((p) => p.category === 'fruitBouquets'));
    }
  }, [products]);

  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

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
            children: <Bouquets bouquets={bouquets} />,
          },
          {
            label: t('store.plants'),
            key: 'plants',
            children: <Plants plants={plants} />,
          },
          {
            label: t('store.fruitBouquets'),
            key: 'fruit',
            children: <FruitBouquets fruitBouquets={fruitBouquets} />,
          },
        ]}
      />
    </Wrapper>
  );
};

export default Store;
