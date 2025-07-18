import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Description, CardTitle, CardInfo, Price, Star } from './style';
import type { ReactNode } from 'react';
import { BasketItem } from '@/types';
import { useCart } from '@/context/basketContext';

const ProductCard = ({
  product,
  cover,
}: {
  product: BasketItem;
  cover?: ReactNode;
}) => {
  const { basket, addToBasket, toggleBasket } = useCart();
  const isInCart = basket.some((item) => item.id === product.id);
  const { t } = useTranslation();

  return (
    <Card hoverable cover={cover}>
      <CardInfo>
        {product.isBestSellers && <Star />}
        <CardTitle>{product.title}</CardTitle>
        <Description>{product.description}</Description>
        <Price>{product.price} ₴</Price>
        <Button
          type={isInCart ? 'default' : 'primary'}
          onClick={() => {
            if (isInCart) {
              toggleBasket();
            } else {
              addToBasket(product);
            }
          }}
        >
          {isInCart
            ? t('bestSellersBlock.viewCart')
            : t('bestSellersBlock.addToCart')}
        </Button>
      </CardInfo>
    </Card>
  );
};

export { ProductCard };
