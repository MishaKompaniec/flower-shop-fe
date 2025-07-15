import type { FC } from 'react';
import { Wrapper, Image } from './style';
import { BasketItem } from '@/types';
import { ProductCard } from '@/components';

interface EdibleBouquetsProps {
  fruitBouquets: BasketItem[];
}

const FruitBouquets: FC<EdibleBouquetsProps> = ({ fruitBouquets }) => (
  <Wrapper>
    {fruitBouquets.map((fruitBouquet) => (
      <ProductCard
        key={fruitBouquet.id}
        product={fruitBouquet}
        cover={
          <Image
            alt={fruitBouquet.title}
            src={
              fruitBouquet.image ? fruitBouquet.image : '/images/no-img.jpeg'
            }
          />
        }
      />
    ))}
  </Wrapper>
);

export default FruitBouquets;
