import { useTranslation } from 'react-i18next';

import { Wrapper, Image } from './style';
import { plants } from '../../../utils/pages';
import { ProductCard } from '../../../components/productCard';

const Plants = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {plants.map((plant) => (
        <ProductCard
          key={plant.id}
          product={plant}
          cover={<Image alt={t('plant.title')} src={plant.image} />}
        />
      ))}
    </Wrapper>
  );
};

export default Plants;
