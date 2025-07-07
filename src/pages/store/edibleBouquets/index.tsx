import { ProductCard } from '../../../components/productCard';
import { fruitBouquets } from '../../../utils/pages';
import { Wrapper, Image } from './style';

const EdibleBouquets = () => (
  <Wrapper>
    {fruitBouquets.map((fruitBouquet) => (
      <ProductCard
        key={fruitBouquet.id}
        product={fruitBouquet}
        cover={<Image alt={fruitBouquet.title} src={fruitBouquet.image} />}
      />
    ))}
  </Wrapper>
);

export default EdibleBouquets;
