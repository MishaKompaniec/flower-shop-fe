import { useTranslation } from 'react-i18next';

import { Wrapper, Image } from './style';
import { ProductCard } from '../../../components/productCard';
import type { BasketItem } from '../../../types';
import type { FC } from 'react';

interface PlantsProps {
  plants: BasketItem[];
}

const Plants: FC<PlantsProps> = ({ plants }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {plants.map((plant) => (
        <ProductCard
          key={plant.id}
          product={plant}
          cover={<Image alt={t('plant.title')} src='/images/image3.jpg' />}
        />
      ))}
    </Wrapper>
  );
};

export default Plants;
