import { Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Description, CardTitle, CardInfo, Price, Star } from './style';
import { useState, type ReactNode } from 'react';
import { BasketItem } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
  addToBasket,
  toggleBasket,
  selectBasket,
} from '@/store/slices/basketSlice';
import { CardModal } from '../cardModal';

const ProductCard = ({
  product,
  cover,
}: {
  product: BasketItem;
  cover?: ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const basket = useSelector(selectBasket);
  const { t } = useTranslation();

  const isInCart = basket.some((item) => item.id === product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      dispatch(toggleBasket());
    } else {
      dispatch(addToBasket(product));
    }
  };

  return (
    <>
      <Card
        hoverable
        cover={cover}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <CardInfo>
          {product.isBestSellers && <Star />}
          <CardTitle>{product.title}</CardTitle>
          <Price>{product.price} ₴</Price>
          <Button type={isInCart ? 'default' : 'primary'} onClick={handleClick}>
            {isInCart
              ? t('bestSellersBlock.viewCart')
              : t('bestSellersBlock.addToCart')}
          </Button>
        </CardInfo>
      </Card>
      <CardModal
        product={product}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export { ProductCard };
