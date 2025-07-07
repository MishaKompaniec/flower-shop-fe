import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

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
import type { DrawerItemProps } from '../../types';
import { useCart } from '../../context/basketContext';

const DrawerItem: FC<DrawerItemProps> = ({
  product: { id, category, price, quantity },
}) => {
  const { removeFromBasket, updateQuantity } = useCart();
  const { t } = useTranslation();

  return (
    <DrawerItemWrapper>
      <Title>{t(`${category}.${id}.title`)}</Title>
      <Price>
        {price} {t('currency.uah')}
      </Price>
      <QuantityControls>
        <Button
          size='small'
          icon={<MinusOutlined />}
          onClick={() => updateQuantity(id, quantity - 1)}
        />
        <Counter>{quantity}</Counter>
        <Button
          size='small'
          icon={<PlusOutlined />}
          onClick={() => updateQuantity(id, quantity + 1)}
        />
      </QuantityControls>
      <Btn
        type='text'
        icon={<CloseBtn />}
        onClick={() => removeFromBasket(id)}
      />
    </DrawerItemWrapper>
  );
};

export { DrawerItem };
