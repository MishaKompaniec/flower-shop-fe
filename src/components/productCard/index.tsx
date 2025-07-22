import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Description, CardTitle, CardInfo, Price, Star } from './style';
import type { ReactNode } from 'react';
import { BasketItem } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
  addToBasket,
  toggleBasket,
  selectBasket,
} from '@/store/slices/basketSlice';

const ProductCard = ({
  product,
  cover,
}: {
  product: BasketItem;
  cover?: ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const basket = useSelector(selectBasket);
  const { t } = useTranslation();

  const isInCart = basket.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(toggleBasket());
    } else {
      dispatch(addToBasket(product));
    }
  };

  return (
    <Card hoverable cover={cover}>
      <CardInfo>
        {product.isBestSellers && <Star />}
        <CardTitle>{product.title}</CardTitle>
        <Description>{product.description}</Description>
        <Price>{product.price} ₴</Price>
        <Button type={isInCart ? 'default' : 'primary'} onClick={handleClick}>
          {isInCart
            ? t('bestSellersBlock.viewCart')
            : t('bestSellersBlock.addToCart')}
        </Button>
      </CardInfo>
    </Card>
  );
};

export { ProductCard };
