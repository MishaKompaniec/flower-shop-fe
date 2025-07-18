import { Order } from '@/types';
import {
  ProductList,
  OrderCardWrapper,
  DateText,
  Details,
  Product,
  Header,
  Status,
  Title,
  Total,
  ButtonContainer,
} from './style';
import { FC } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import {
  useCompleteOrderMutation,
  useDeleteOrderMutation,
} from '@/services/ordersApi';

interface OrderCardProps {
  order: Order;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  const { t } = useTranslation();

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();

  return (
    <OrderCardWrapper key={order.id}>
      <Header>
        <DateText>
          {dayjs(order.createdAt).format('MMM D, YYYY [at] HH:mm')}
        </DateText>
        <Status status={order.status}>
          {t(`adminPanel.status.${order.status}`)}
        </Status>
      </Header>

      <Details>
        <b>{t('adminPanel.phone')}:</b> {order.phone}
      </Details>
      <Details>
        <b>{t('adminPanel.address')}:</b> {order.address}
      </Details>

      <ProductList>
        {order.products.map((product, idx) => (
          <Product key={idx}>
            <Title>{product.title}</Title>
            <Details>
              {product.quantity} x {product.price} ₴
            </Details>
          </Product>
        ))}
      </ProductList>

      <Total>
        {t('adminPanel.total')}: <b>{order.totalPrice} ₴</b>
      </Total>

      {order.status === 'pending' && (
        <ButtonContainer>
          <Button
            type='primary'
            onClick={() => completeOrder(order.id)}
            loading={isCompleting}
            style={{ marginTop: '12px', float: 'right' }}
          >
            {t('adminPanel.markAsCompleted')}
          </Button>
          <Button
            danger
            onClick={() => deleteOrder(order.id)}
            loading={isDeleting}
          >
            {t('adminPanel.deleteOrder')}
          </Button>
        </ButtonContainer>
      )}
    </OrderCardWrapper>
  );
};

export { OrderCard };
