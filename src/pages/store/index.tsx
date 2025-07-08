import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Bouquets from './bouquets';
import EdibleBouquets from './edibleBouquets';
import Plants from './plants';
import { Wrapper } from './style';
import { useGetProductsQuery } from '../../services/productsApi';

const Store = () => {
  const { data: products } = useGetProductsQuery();
  console.log(products, products);

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
            children: <Bouquets />,
          },
          {
            label: t('store.plants'),
            key: 'plants',
            children: <Plants />,
          },
          {
            label: t('store.fruitBouquets'),
            key: 'fruit',
            children: <EdibleBouquets />,
          },
        ]}
      />
    </Wrapper>
  );
};

export default Store;
