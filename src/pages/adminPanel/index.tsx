import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Products from './products';
import { Wrapper } from './style';

const AdminPanel = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Tabs
        defaultActiveKey='orders'
        items={[
          {
            key: 'orders',
            label: t('adminPanel.orders'),
            children: <>test</>,
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
