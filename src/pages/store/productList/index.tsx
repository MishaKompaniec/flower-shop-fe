import type { FC } from 'react';
import { Wrapper, Image, SelectWrapper } from './style';
import { BasketItem } from '@/types';
import { ProductCard } from '@/components';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface ProductListProps {
  products: BasketItem[];
  priceSortOrder: 'asc' | 'desc';
  setPriceSortOrder: (order: 'asc' | 'desc') => void;
}

const { Option } = Select;

const ProductList: FC<ProductListProps> = ({
  products,
  priceSortOrder,
  setPriceSortOrder,
}) => {
  const { t } = useTranslation();

  const sortedProducts = [...products].sort((a, b) =>
    priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price
  );

  return (
    <>
      <SelectWrapper>
        <Select
          value={priceSortOrder}
          onChange={(value) => setPriceSortOrder(value)}
          aria-label={t('store.sortByPrice')}
        >
          <Option value='asc'>{t('store.sortByPriceAsc')}</Option>
          <Option value='desc'>{t('store.sortByPriceDesc')}</Option>
        </Select>
      </SelectWrapper>

      <Wrapper>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cover={
              <Image
                alt={product.title}
                src={product.image ?? '/images/no-img.jpeg'}
              />
            }
          />
        ))}
      </Wrapper>
    </>
  );
};

export default ProductList;
