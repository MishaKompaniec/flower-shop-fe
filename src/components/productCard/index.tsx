import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Description, CardTitle, CardInfo, Price } from './style';
import type { BasketItem } from '../../types';
import type { ReactNode } from 'react';
import { useCart } from '../../context/basketContext';

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
        <CardTitle>{t(`${product.category}.${product.id}.title`)}</CardTitle>
        <Description>
          {t(`${product.category}.${product.id}.description`)}
        </Description>
        <Price>
          {product.price} {t('currency.uah')}
        </Price>
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
