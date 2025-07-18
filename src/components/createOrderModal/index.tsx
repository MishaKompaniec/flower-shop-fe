import { useCart } from '@/context/basketContext';
import { useNotificationContext } from '@/context/notificationContext';
import { useUser } from '@/context/userContext';
import { useCreateOrderMutation } from '@/services/ordersApi';
import { formatPhoneNumber } from '@/utils';
import { Form, Input, Modal } from 'antd';
import { Dispatch, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateOrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setIsUnauthorizedModalOpen: Dispatch<React.SetStateAction<boolean>>;
  createOrder: ReturnType<typeof useCreateOrderMutation>[0];
  isLoading: boolean;
}

const CreateOrderModal: FC<CreateOrderModalProps> = ({
  setIsUnauthorizedModalOpen,
  setIsModalOpen,
  createOrder,
  isModalOpen,
  isLoading,
}) => {
  const { t } = useTranslation();
  const api = useNotificationContext();
  const [form] = Form.useForm();
  const { user } = useUser();

  useEffect(() => {
    if (isModalOpen && user?.phoneNumber) {
      form.setFieldsValue({ phone: formatPhoneNumber(user.phoneNumber) });
    }
  }, [isModalOpen, user, form]);

  const { closeBasket, clearBasket, basket } = useCart();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const orderPayload = {
        products: basket.map(({ id: productId, quantity, price, title }) => ({
          productId,
          quantity,
          price,
          title,
        })),
        phone: values.phone,
        address: values.address,
      };

      await createOrder(orderPayload).unwrap();

      api.success({
        message: t('basket.orderSuccessfully'),
        placement: 'topRight',
        duration: 3,
      });

      clearBasket();
      closeBasket();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error: any) {
      if (error?.status === 401) {
        setIsUnauthorizedModalOpen(true);
      } else if (!error?.errorFields) {
        console.error('Failed to create order:', error);
        api.error({
          message: error.data?.error || t('basket.error'),
          placement: 'topRight',
          duration: 3,
        });
      }
    }
  };

  return (
    <Modal
      title={t('basket.modalTitle')}
      open={isModalOpen}
      onOk={handleOk}
      confirmLoading={isLoading}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
      }}
      okText={t('basket.ok')}
      cancelText={t('basket.cancel')}
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{ phone: '', address: '' }}
        preserve={false}
      >
        <Form.Item
          label={t('basket.phone')}
          name='phone'
          rules={[
            { required: true, message: t('basket.required') },
            {
              pattern: /^\+380 \d{2} \d{3} \d{2} \d{2}$/,
              message: t('basket.phoneInvalid'),
            },
          ]}
        >
          <Input
            placeholder={t('basket.phonePlaceholder')}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              form.setFieldsValue({ phone: formatted });
            }}
          />
        </Form.Item>

        <Form.Item
          label={t('basket.address')}
          name='address'
          rules={[
            { required: true, message: t('basket.required') },
            { max: 70, message: t('basket.addressTooLong') },
          ]}
        >
          <Input placeholder={t('basket.addressPlaceholder')} maxLength={100} />
        </Form.Item>

        <p>{t('basket.modal')}</p>
      </Form>
    </Modal>
  );
};

export { CreateOrderModal };
