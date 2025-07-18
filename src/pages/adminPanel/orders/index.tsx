import {
  ProductList,
  Container,
  OrderCard,
  DateText,
  Details,
  Product,
  Header,
  Status,
  Title,
  Total,
  ButtonContainer,
} from './style';
import {
  useGetOrdersQuery,
  useCompleteOrderMutation,
  useDeleteOrderMutation,
} from '@/services/ordersApi';
import { Spinner } from '@/components';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [completeOrder, { isLoading: isCompleting }] =
    useCompleteOrderMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const pendingOrders =
    orders?.filter((order) => order.status === 'pending') || [];

  return (
    <Container>
      {pendingOrders.map((order) => (
        <OrderCard key={order.id}>
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
        </OrderCard>
      ))}
    </Container>
  );
};

export { Orders };
