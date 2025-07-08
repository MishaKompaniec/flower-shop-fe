import type { FC } from 'react';
import { ProductCard } from '../../../components/productCard';
import { Wrapper, Image } from './style';
import type { BasketItem } from '../../../types';

interface BouquetsProps {
  bouquets: BasketItem[];
}

const Bouquets: FC<BouquetsProps> = ({ bouquets }) => (
  <Wrapper>
    {bouquets.map((bouquet) => (
      <ProductCard
        key={bouquet.id}
        product={bouquet}
        cover={<Image alt={bouquet.title} src='/images/image3.jpg' />}
      />
    ))}
  </Wrapper>
);

export default Bouquets;
