import { Table, Modal, Form, Input, InputNumber, Select, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNotificationContext } from '@/context/notificationContext';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '@/store/services/productsApi';
import { BasketItem } from '@/types';
import { Spinner } from '@/components';
import { getColumns } from './getColumns';
import { Btn, Wrapper } from './style';

const { Option } = Select;

const Products = () => {
  const { t } = useTranslation();
  const api = useNotificationContext();

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
  const [addProduct] = useCreateProductMutation();
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

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingItem) {
        await updateProduct({ id: editingItem.id, data: values }).unwrap();
        api.success({
          message: t('adminPanel.updateSuccess'),
          placement: 'topRight',
          duration: 3,
        });
      } else {
        await addProduct(values).unwrap();
        api.success({
          message: t('adminPanel.addSuccess'),
          placement: 'topRight',
          duration: 3,
        });
      }

      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error: any) {
      console.log(error);
      api.error({
        message: error.data.error || t('adminPanel.submitError'),
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingItem(null);
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

      <Modal
        title={
          editingItem ? t('adminPanel.editTitle') : t('adminPanel.createTitle')
        }
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={t('adminPanel.save')}
        cancelText={t('adminPanel.cancel')}
      >
        <Form
          initialValues={{
            category: 'bouquets',
            isBestSellers: false,
          }}
          form={form}
          layout='vertical'
        >
          <Form.Item
            label={t('adminPanel.title')}
            name='title'
            rules={[
              { required: true, message: t('adminPanel.required') },
              { max: 30, message: t('adminPanel.titleTooLong') },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('adminPanel.price')}
            name='price'
            rules={[
              { required: true, message: t('adminPanel.required') },
              {
                type: 'number',
                max: 100000,
                message: t('adminPanel.priceTooHigh'),
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            label={t('adminPanel.description')}
            name='description'
            rules={[
              { required: true, message: t('adminPanel.required') },
              { max: 80, message: t('adminPanel.descriptionTooLong') },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label={t('adminPanel.category')}
            name='category'
            rules={[{ required: true, message: t('adminPanel.required') }]}
          >
            <Select>
              <Option value='bouquets'>{t('adminPanel.bouquets')}</Option>
              <Option value='plants'>{t('adminPanel.plants')}</Option>
              <Option value='fruitBouquets'>
                {t('adminPanel.fruitBouquets')}
              </Option>
            </Select>
          </Form.Item>

          {!editingItem && (
            <Form.Item name='isBestSellers' valuePropName='checked'>
              <Checkbox>{t('adminPanel.isBestSellers')}</Checkbox>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default Products;
