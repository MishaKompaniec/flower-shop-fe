import {
  Button,
  Checkbox,
  Popconfirm,
  Upload,
  message,
  notification,
} from 'antd';
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

  const [api, contextHolder] = notification.useNotification();

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
              api.success({
                message: t('adminPanel.uploadSuccess'),
                placement: 'topRight',
                duration: 3,
              });
              onSuccess?.({}, new XMLHttpRequest());
            } catch (error: any) {
              console.error(error);
              api.error({
                message: error.data.error,
                placement: 'topRight',
                duration: 3,
              });
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
            {contextHolder}
          </UploadWrapper>
        );
      },
    },
  ];
};
