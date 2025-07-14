import { Button, Checkbox, Popconfirm, Upload, message } from 'antd';
import {
  DeleteOutlined,
  UploadOutlined,
  FormOutlined,
} from '@ant-design/icons';

import type { BasketItem, ColumnsProps } from '../../types';
import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlinedAnt, UploadWrapper, WrapperCheckOutlined } from './style';
import type { ColumnsType } from 'antd/es/table';

export const getColumns = ({
  onEdit,
  deleteProduct,
  uploadProductImage,
  updateProduct,
}: ColumnsProps): ColumnsType<BasketItem> => {
  const { t } = useTranslation();

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
      width: 120,
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
      width: 120,
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
      width: 120,
      render: (isBestSellers: boolean, record: BasketItem) => (
        <Checkbox
          checked={isBestSellers}
          onChange={async (e) => {
            try {
              await updateProduct({
                id: record.id,
                data: { isBestSellers: e.target.checked },
              }).unwrap();
              message.success(t('adminPanel.updateSuccess'));
            } catch (err) {
              console.error(err);
              message.error(t('adminPanel.updateError'));
            }
          }}
        />
      ),
    },
    {
      title: ' ',
      key: 'actions',
      width: 140,
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
            <Button
              type='text'
              icon={<FormOutlined />}
              onClick={() => onEdit(record)}
            />
            <Upload {...uploadProps}>
              <Button type='text' icon={<UploadOutlined />} />
            </Upload>
            <Popconfirm
              title={t('adminPanel.confirmDelete')}
              onConfirm={() => handleDelete(record.id)}
              okText={t('adminPanel.yes')}
              cancelText={t('adminPanel.no')}
            >
              <Button type='text' icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </UploadWrapper>
        );
      },
    },
  ];
};
