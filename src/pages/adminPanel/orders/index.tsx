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
} from './style';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { Spinner } from '@/components';
import dayjs from 'dayjs';

const Orders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      {orders?.map((order) => (
        <OrderCard key={order.id}>
          <Header>
            <DateText>
              {dayjs(order.createdAt).format('MMM D, YYYY [at] HH:mm')}
            </DateText>
            <Status status={order.status}>{order.status}</Status>
          </Header>

          <Details>
            <b>Phone:</b> {order.phone}
          </Details>
          <Details>
            <b>Address:</b> {order.address}
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
            Total: <b>{order.totalPrice} ₴</b>
          </Total>
        </OrderCard>
      ))}
    </Container>
  );
};

export { Orders };
