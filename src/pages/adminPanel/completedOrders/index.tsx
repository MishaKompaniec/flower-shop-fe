import { Container } from './style';
import { useGetOrdersQuery } from '@/store/services/ordersApi';
import { OrderCard, Spinner } from '@/components';
import { useTranslation } from 'react-i18next';

const CompletedOrders = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  const completedOrders =
    orders?.filter((order) => order.status === 'completed') || [];

  return (
    <Container>
      {completedOrders.length > 0 ? (
        completedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))
      ) : (
        <p>{t('adminPanel.noCompletedOrders')}</p>
      )}
    </Container>
  );
};

export { CompletedOrders };
