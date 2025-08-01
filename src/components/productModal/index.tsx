import { useNotificationContext } from '@/context/notificationContext';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/store/services/productsApi';
import { BasketItem } from '@/types';
import { parseApiError } from '@/utils/parseApiError';
import { Checkbox, Form, Input, InputNumber, Modal, Select } from 'antd';
import { Dispatch, FC } from 'react';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface ProductModalProps {
  isModalOpen: boolean;
  editingItem: BasketItem | null;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setEditingItem: Dispatch<React.SetStateAction<BasketItem | null>>;
}

const ProductModal: FC<ProductModalProps> = ({
  isModalOpen,
  editingItem,
  setIsModalOpen,
  setEditingItem,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const api = useNotificationContext();
  const [addProduct] = useCreateProductMutation();

  const [updateProduct] = useUpdateProductMutation();

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
    } catch (error) {
      const { message } = parseApiError(error);
      api.error({
        message: message || t('adminPanel.submitError'),
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };
  return (
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
            { max: 1000, message: t('adminPanel.descriptionTooLong') },
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
  );
};

export { ProductModal };
