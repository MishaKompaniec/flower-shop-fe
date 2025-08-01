import { useNotificationContext } from '@/context/notificationContext';
import { useUserData } from '@/hooks/useUserData';
import { useCreateOrderMutation } from '@/store/services/ordersApi';
import { clearBasket, closeBasket } from '@/store/slices/basketSlice';
import { AppDispatch, RootState } from '@/store/store';
import { formatPhoneNumber } from '@/utils';
import { parseApiError } from '@/utils/parseApiError';
import { Form, Input, Modal } from 'antd';
import { Dispatch, FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

interface CreateOrderModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setIsUnauthorizedModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateOrderModal: FC<CreateOrderModalProps> = ({
  setIsUnauthorizedModalOpen,
  setIsModalOpen,
  isModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const api = useNotificationContext();
  const [form] = Form.useForm();
  const { user } = useUserData();
  const basket = useSelector((state: RootState) => state.basket.basket);
  const handleCloseBasket = () => dispatch(closeBasket());
  const handleClearBasket = () => dispatch(clearBasket());
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (isModalOpen && user?.phoneNumber) {
      form.setFieldsValue({ phone: formatPhoneNumber(user.phoneNumber) });
    }

    if (isModalOpen && user?.fullName) {
      form.setFieldsValue({ fullName: user?.fullName });
    }
  }, [isModalOpen, user, form]);

  const handleOk = async () => {
    try {
      const formData = await form.validateFields();

      const orderPayload = {
        products: basket.map(({ id: productId, quantity, price, title }) => ({
          productId,
          quantity,
          price,
          title,
        })),
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      };

      await createOrder(orderPayload).unwrap();

      api.success({
        message: t('basket.orderSuccessfully'),
        placement: 'topRight',
        duration: 3,
      });

      handleClearBasket();
      handleCloseBasket();
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      const { message, status } = parseApiError(error);

      if (status === 401) {
        setIsUnauthorizedModalOpen(true);
      } else {
        api.error({
          message: message || t('basket.error'),
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
          label={t('basket.fullName')}
          name='fullName'
          rules={[
            { required: true, message: t('basket.required') },
            { max: 50, message: t('basket.fullNameTooLong') },
          ]}
        >
          <Input placeholder={t('basket.fullNamePlaceholder')} maxLength={50} />
        </Form.Item>
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
