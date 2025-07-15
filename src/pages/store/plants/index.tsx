import { useTranslation } from 'react-i18next';

import { Wrapper, Image } from './style';
import type { FC } from 'react';
import { BasketItem } from '@/types';
import { ProductCard } from '@/components';

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
          cover={
            <Image
              alt={t('plant.title')}
              src={plant.image ? plant.image : '/images/no-img.jpeg'}
            />
          }
        />
      ))}
    </Wrapper>
  );
};

export default Plants;
