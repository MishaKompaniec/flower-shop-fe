import { Button, Checkbox, Popconfirm, Upload } from 'antd';
import {
  DeleteOutlined,
  UploadOutlined,
  FormOutlined,
} from '@ant-design/icons';

import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';
import { useNotificationContext } from '@/context/notificationContext';
import { BasketItem, ColumnsProps } from '@/types';
import { CheckOutlinedAnt, UploadWrapper, WrapperCheckOutlined } from './style';
import { parseApiError } from '@/utils/parseApiError';

export const getColumns = ({
  onEdit,
  deleteProduct,
  uploadProductImage,
  updateProduct,
  currentSortBy,
  currentOrder,
}: ColumnsProps): ColumnsType<BasketItem> => {
  const { t } = useTranslation();
  const api = useNotificationContext();

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
      sorter: true,
      sortOrder: currentSortBy === 'title' ? currentOrder : null,
    },
    {
      title: t('adminPanel.price'),
      dataIndex: 'price',
      key: 'price',
      width: 120,
      sorter: true,
      sortOrder: currentSortBy === 'price' ? currentOrder : null,
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
      sorter: true,
      sortOrder: currentSortBy === 'category' ? currentOrder : null,
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
              api.success({
                message: t('adminPanel.updateSuccess'),
                placement: 'topRight',
                duration: 3,
              });
            } catch (error) {
              const { message } = parseApiError(error);
              api.error({
                message: message || t('adminPanel.updateError'),
                placement: 'topRight',
                duration: 3,
              });
            }
          }}
        />
      ),
    },
    {
      title: ' ',
      key: 'actions',
      width: 140,
      render: (_, record: BasketItem) => {
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
            } catch (error) {
              const { message } = parseApiError(error);
              api.error({
                message: message,
                placement: 'topRight',
                duration: 3,
              });
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
