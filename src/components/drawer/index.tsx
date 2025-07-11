import { Drawer as AntDrawer, Modal } from 'antd';
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

const Drawer = () => {
  const { t } = useTranslation();
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

  const handleOk = () => {
    clearBasket();
    closeBasket();
    setIsModalOpen(false);
  };

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
                <DrawerItem product={product} />
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
        onCancel={() => setIsModalOpen(false)}
        okText={t('basket.ok')}
        cancelText={t('basket.cancel')}
      >
        <p>{t('basket.modal')}</p>
      </Modal>
    </>
  );
};

export { Drawer };
