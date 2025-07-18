import { Drawer as AntDrawer, Modal, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DrawerItem } from '../drawerItem';
import {
  DrawerContent,
  BasketWrapper,
  Basket,
  Total,
  Badge,
  List,
  Btn,
} from './style';
import { useCart } from '../../context/basketContext';
import { useCreateOrderMutation } from '@/services/ordersApi';
import { useNotificationContext } from '@/context/notificationContext';
import { formatPhoneNumber } from '@/utils';
import { useUser } from '@/context/userContext';

const Drawer = () => {
  const { t } = useTranslation();
  const api = useNotificationContext();
  const { user } = useUser();
  const {
    isBasketOpen,
    closeBasket,
    clearBasket,
    totalPrice,
    openBasket,
    totalItems,
    basket,
  } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [form] = Form.useForm();

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
      if (error.errorFields) {
      } else {
        console.error('Failed to create order:', error);
        api.error({
          message: error.data?.error || t('basket.error'),
          placement: 'topRight',
          duration: 3,
        });
      }
    }
  };

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (isModalOpen && user?.phoneNumber) {
      form.setFieldsValue({ phone: formatPhoneNumber(user.phoneNumber) });
    }
  }, [isModalOpen, user, form]);

  return (
    <>
      <BasketWrapper>
        <Basket onClick={openBasket} />
        {totalItems > 0 && <Badge>{totalItems}</Badge>}
      </BasketWrapper>
      <AntDrawer
        title={t('basket.title')}
        onClose={closeBasket}
        open={isBasketOpen}
        width={isMobile ? '100%' : 500}
      >
        <DrawerContent>
          {basket.length === 0 ? (
            <p>{t('basket.empty')}</p>
          ) : (
            <List>
              {basket.map((product) => (
                <DrawerItem key={product.id} product={product} />
              ))}
            </List>
          )}
          <Total>
            {t('basket.total')} {totalPrice} ₴
          </Total>
          {basket.length > 0 && (
            <Btn
              type='primary'
              size='large'
              onClick={() => setIsModalOpen(true)}
              loading={isLoading}
            >
              {t('basket.btn')}
            </Btn>
          )}
        </DrawerContent>
      </AntDrawer>
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
            <Input
              placeholder={t('basket.addressPlaceholder')}
              maxLength={100}
            />
          </Form.Item>

          <p>{t('basket.modal')}</p>
        </Form>
      </Modal>
    </>
  );
};

export { Drawer };
