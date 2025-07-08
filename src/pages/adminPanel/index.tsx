import {
  Table,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { Btn, Wrapper } from './style';
import type { BasketItem } from '../../types';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../services/productsApi';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const { Option } = Select;

const AdminPanel = () => {
  const { t } = useTranslation();
  const { data: products } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useCreateProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const newProduct = await form.validateFields();
      addProduct(newProduct);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

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

      <Modal
        title={t('adminPanel.modalTitle')}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={t('adminPanel.save')}
        cancelText={t('adminPanel.cancel')}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            label={t('adminPanel.title')}
            name='title'
            rules={[
              { required: true, message: t('adminPanel.required') },
              { max: 30, message: t('adminPanel.titleTooLong') }, // добавить перевод
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
                message: t('adminPanel.priceTooHigh'), // добавить перевод
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
              { max: 50, message: t('adminPanel.descriptionTooLong') }, // добавить перевод
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
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default AdminPanel;
