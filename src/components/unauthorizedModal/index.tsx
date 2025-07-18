import { Modal } from 'antd';
import { Dispatch, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedModalProps {
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isUnauthorizedModalOpen: boolean;
  setIsUnauthorizedModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const UnauthorizedModal: FC<UnauthorizedModalProps> = ({
  setIsUnauthorizedModalOpen,
  isUnauthorizedModalOpen,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Modal
      centered
      title={t('basket.unauthorizedTitle')}
      open={isUnauthorizedModalOpen}
      onOk={() => {
        setIsUnauthorizedModalOpen(false);
        setIsModalOpen(false);
        navigate('/authorization');
      }}
      onCancel={() => setIsUnauthorizedModalOpen(false)}
      okText={t('basket.goToLogin')}
      cancelText={t('basket.cancel')}
    >
      <p>{t('basket.unauthorizedMessage')}</p>
    </Modal>
  );
};

export { UnauthorizedModal };
