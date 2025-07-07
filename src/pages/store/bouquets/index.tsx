import { ProductCard } from '../../../components/productCard';
import { bouquets } from '../../../utils/pages';
import { Wrapper, Image } from './style';

const Bouquets = () => (
  <Wrapper>
    {bouquets.map((bouquet) => (
      <ProductCard
        key={bouquet.id}
        product={bouquet}
        cover={<Image alt={bouquet.title} src={bouquet.image} />}
      />
    ))}
  </Wrapper>
);

export default Bouquets;
