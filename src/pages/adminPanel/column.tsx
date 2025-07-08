import { useTranslation } from 'react-i18next';
import type { BasketItem } from '../../types';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteProductMutation } from '../../services/productsApi';

export const Columns = () => {
  const { t } = useTranslation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err: any) {
      console.error(err);
    }
  };

  return [
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
      width: 60,
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
};
