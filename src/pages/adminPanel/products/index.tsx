import { Table, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '@/store/services/productsApi';
import { BasketItem } from '@/types';
import { ProductModal, Spinner } from '@/components';
import { getColumns } from './getColumns';
import { Btn, Wrapper } from './style';

const Products = () => {
  const { t } = useTranslation();

  const [sortBy, setSortBy] = useState<string | null>('title');
  const [order, setOrder] = useState<'ascend' | 'descend' | null>('ascend');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState<BasketItem | null>(null);
  const apiOrder =
    order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : 'asc';

  const { data: products, isLoading: productsIsLoading } = useGetProductsQuery({
    sortBy: sortBy ?? 'title',
    order: apiOrder,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (item: BasketItem) => {
    setEditingItem(item);
    form.setFieldsValue({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
    });
    setIsModalOpen(true);
  };

  const columns = getColumns({
    onEdit: handleEdit,
    deleteProduct,
    uploadProductImage,
    updateProduct,
    currentSortBy: sortBy,
    currentOrder: order,
  });

  if (productsIsLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Btn type='primary' onClick={handleAdd}>
        {t('adminPanel.addProduct')}
      </Btn>
      <Table
        dataSource={products}
        columns={columns}
        rowKey='id'
        pagination={false}
        scroll={{ x: 'fit-content' }}
        onChange={(pagination, filters, sorter) => {
          if (!Array.isArray(sorter)) {
            setSortBy(sorter.field as string);
            setOrder(sorter.order ?? null);
          }
        }}
        sortDirections={['ascend', 'descend']}
      />
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />
    </Wrapper>
  );
};

export default Products;
