import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import {
  DrawerItemWrapper,
  QuantityControls,
  Counter,
  Title,
  Price,
  Btn,
  CloseBtn,
} from './style';

import type { FC } from 'react';
import { DrawerItemProps } from '@/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { removeFromBasket, updateQuantity } from '@/store/slices/basketSlice';

const DrawerItem: FC<DrawerItemProps> = ({
  product: { id, price, quantity, title },
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromBasket(id));
  };

  return (
    <DrawerItemWrapper>
      <Title>{title}</Title>
      <Price>{price} ₴</Price>
      <QuantityControls>
        <Button
          size='small'
          icon={<MinusOutlined />}
          onClick={handleDecrease}
        />
        <Counter>{quantity}</Counter>
        <Button size='small' icon={<PlusOutlined />} onClick={handleIncrease} />
      </QuantityControls>
      <Btn type='text' icon={<CloseBtn />} onClick={handleRemove} />
    </DrawerItemWrapper>
  );
};

export { DrawerItem };
