import type { FC } from 'react';
import { ProductCard } from '../../../components/productCard';
import { Wrapper, Image } from './style';
import type { BasketItem } from '../../../types';

interface EdibleBouquetsProps {
  fruitBouquets: BasketItem[];
}

const FruitBouquets: FC<EdibleBouquetsProps> = ({ fruitBouquets }) => (
  <Wrapper>
    {fruitBouquets.map((fruitBouquet) => (
      <ProductCard
        key={fruitBouquet.id}
        product={fruitBouquet}
        cover={<Image alt={fruitBouquet.title} src='/images/image3.jpg' />}
      />
    ))}
  </Wrapper>
);

export default FruitBouquets;
