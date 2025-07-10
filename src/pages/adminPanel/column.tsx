import { Button, Popconfirm, Upload, message } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import {
  useDeleteProductMutation,
  useUploadProductImageMutation,
} from '../../services/productsApi';
import type { BasketItem } from '../../types';
import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlinedAnt, UploadWrapper, WrapperCheckOutlined } from './style';

export const Columns = () => {
  const { t } = useTranslation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return [
    {
      title: t('adminPanel.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('adminPanel.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price} ₴`,
    },
    {
      title: t('adminPanel.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('adminPanel.category'),
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: t('adminPanel.image'),
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string | undefined) =>
        image ? (
          <WrapperCheckOutlined>
            <CheckOutlinedAnt />
          </WrapperCheckOutlined>
        ) : null,
    },
    {
      title: t('adminPanel.isBestSellers'),
      dataIndex: 'isBestSellers',
      key: 'isBestSellers',
      width: 100,
      render: (isBestSellers: boolean) =>
        isBestSellers ? (
          <WrapperCheckOutlined>
            <CheckOutlinedAnt />
          </WrapperCheckOutlined>
        ) : null,
    },
    {
      title: ' ',
      key: 'actions',
      width: 100,
      render: (_: any, record: BasketItem) => {
        const uploadProps: UploadProps = {
          name: 'image',
          showUploadList: false,
          customRequest: async ({ file, onSuccess, onError }) => {
            try {
              await uploadProductImage({
                id: record.id,
                image: file as File,
              }).unwrap();
              message.success(t('adminPanel.uploadSuccess'));
              onSuccess?.({}, new XMLHttpRequest());
            } catch (error) {
              console.error(error);
              message.error(t('adminPanel.uploadError'));
              onError?.(error as any);
            }
          },
        };

        return (
          <UploadWrapper>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />} />
            </Upload>
            <Popconfirm
              title={t('adminPanel.confirmDelete')}
              onConfirm={() => handleDelete(record.id)}
              okText={t('adminPanel.yes')}
              cancelText={t('adminPanel.no')}
            >
              <Button type='text' danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </UploadWrapper>
        );
      },
    },
  ];
};
