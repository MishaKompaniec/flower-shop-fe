import { Modal } from 'antd';
import { Dispatch, FC } from 'react';
import {
  Description,
  UpdateDate,
  CardTitle,
  CardInfo,
  Price,
  Image,
} from './style';
import { BasketItem } from '@/types';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface CardModalProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  product: BasketItem;
}

const CardModal: FC<CardModalProps> = ({
  setIsModalOpen,
  isModalOpen,
  product,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      width='50%'
      open={isModalOpen}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
      style={{ top: 20 }}
    >
      <CardInfo>
        <CardTitle>{product.title}</CardTitle>
        <Image
          alt={product.title}
          src={product.image ?? '/images/no-img.jpeg'}
        />
        <Description>{product.description}</Description>
        <Price>
          {t('CardModal.price')} {product.price} ₴
        </Price>
        <UpdateDate>
          {t('CardModal.updatedAt')}{' '}
          {dayjs(product.updatedAt).format('DD.MM.YYYY')}
        </UpdateDate>
      </CardInfo>
    </Modal>
  );
};

export { CardModal };
