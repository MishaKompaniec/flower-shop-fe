import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Products from './products';
import { Wrapper } from './style';
import { NewOrders } from './newOrders';
import { CompletedOrders } from './completedOrders';

const AdminPanel = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Tabs
        defaultActiveKey='newOrders'
        items={[
          {
            key: 'newOrders',
            label: t('adminPanel.newOrders'),
            children: <NewOrders />,
          },
          {
            key: 'completedOrders',
            label: t('adminPanel.completedOrders'),
            children: <CompletedOrders />,
          },
          {
            key: 'products',
            label: t('adminPanel.products'),
            children: <Products />,
          },
        ]}
      />
    </Wrapper>
  );
};

export default AdminPanel;
