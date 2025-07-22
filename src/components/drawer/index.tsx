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
import { useSelector, useDispatch } from 'react-redux';
import { CreateOrderModal } from '../createOrderModal';
import { useCreateOrderMutation } from '@/store/services/ordersApi';
import { UnauthorizedModal } from '../unauthorizedModal';
import { AppDispatch } from '@/store/store';
import {
  selectIsBasketOpen,
  selectTotalItems,
  selectTotalPrice,
  selectBasket,
  closeBasket,
  openBasket,
} from '@/store/slices/basketSlice';

const Drawer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isBasketOpen = useSelector(selectIsBasketOpen);
  const basket = useSelector(selectBasket);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

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
        <Basket onClick={() => dispatch(openBasket())} />
        {totalItems > 0 && <Badge>{totalItems}</Badge>}
      </BasketWrapper>

      <AntDrawer
        title={t('basket.title')}
        onClose={() => dispatch(closeBasket())}
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
