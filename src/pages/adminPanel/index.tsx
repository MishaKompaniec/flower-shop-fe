import { Table, Modal, Form, Input, InputNumber, Select } from 'antd';
import { Btn, Wrapper } from './style';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../services/productsApi';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Columns } from './column';

const { Option } = Select;

const AdminPanel = () => {
  const { t } = useTranslation();
  const { data: products } = useGetProductsQuery();

  const [addProduct] = useCreateProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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

  return (
    <Wrapper>
      <Btn type='primary' onClick={handleAdd}>
        {t('adminPanel.addProduct')}
      </Btn>

      <Table
        dataSource={products}
        columns={Columns()}
        rowKey='id'
        pagination={false}
        scroll={{ y: 400 }}
      />

      <Modal
        title={t('adminPanel.modalTitle')}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={t('adminPanel.save')}
        cancelText={t('adminPanel.cancel')}
      >
        <Form
          initialValues={{
            category: 'flowers',
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
              { max: 50, message: t('adminPanel.descriptionTooLong') },
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
