import type { FC } from 'react';
import { Wrapper, Image } from './style';
import { BasketItem } from '@/types';
import { ProductCard } from '@/components';

interface BouquetsProps {
  bouquets: BasketItem[];
}

const Bouquets: FC<BouquetsProps> = ({ bouquets }) => (
  <Wrapper>
    {bouquets.map((bouquet) => (
      <ProductCard
        key={bouquet.id}
        product={bouquet}
        cover={
          <Image
            alt={bouquet.title}
            src={bouquet.image ? bouquet.image : '/images/no-img.jpeg'}
          />
        }
      />
    ))}
  </Wrapper>
);

export default Bouquets;
