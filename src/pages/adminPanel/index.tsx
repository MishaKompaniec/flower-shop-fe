import { Table, Button, Popconfirm } from 'antd';
import { Btn, Wrapper } from './style';
import type { BasketItem } from '../../types';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../services/productsApi';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
  const { t } = useTranslation();
  const { data: products } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleAdd = () => {};

  const columns = [
    {
      title: t('adminPanel.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('adminPanel.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price} €`,
    },
    {
      title: t('adminPanel.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('adminPanel.category'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: ' ',
      key: 'actions',
      width: 50,
      render: (_: any, record: BasketItem) => (
        <Popconfirm
          title={t('adminPanel.confirmDelete')}
          onConfirm={() => handleDelete(record.id)}
          okText={t('adminPanel.yes')}
          cancelText={t('adminPanel.no')}
        >
          <Button type='text' danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Wrapper>
      <Btn type='primary' size='large' onClick={handleAdd}>
        {t('adminPanel.addProduct')}
      </Btn>
      <Table
        dataSource={products}
        columns={columns}
        rowKey='id'
        pagination={false}
      />
    </Wrapper>
  );
};

export default AdminPanel;
