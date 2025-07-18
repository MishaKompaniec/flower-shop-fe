import { Drawer as AntDrawer } from 'antd';
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
import { CreateOrderModal } from '../createOrderModal';
import { useCreateOrderMutation } from '@/services/ordersApi';
import { UnauthorizedModal } from '../unauthorizedModal';

const Drawer = () => {
  const { t } = useTranslation();
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {
    isBasketOpen,
    closeBasket,
    totalPrice,
    openBasket,
    totalItems,
    basket,
  } = useCart();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

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
      <CreateOrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIsUnauthorizedModalOpen={setIsUnauthorizedModalOpen}
        createOrder={createOrder}
        isLoading={isLoading}
      />
      <UnauthorizedModal
        setIsModalOpen={setIsModalOpen}
        setIsUnauthorizedModalOpen={setIsUnauthorizedModalOpen}
        isUnauthorizedModalOpen={isUnauthorizedModalOpen}
      />
    </>
  );
};

export { Drawer };
