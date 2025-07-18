import { Container } from './style';
import { useGetOrdersQuery } from '@/services/ordersApi';
import { OrderCard, Spinner } from '@/components';
import { useTranslation } from 'react-i18next';

const NewOrders = () => {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  const newOrders = orders?.filter((order) => order.status === 'pending') || [];

  return (
    <Container>
      {newOrders.length > 0 ? (
        newOrders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <p>{t('adminPanel.noNewOrders')}</p>
      )}
    </Container>
  );
};

export { NewOrders };
