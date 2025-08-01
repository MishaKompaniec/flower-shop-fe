import { Spinner } from '@/components';
import { useNotificationContext } from '@/context/notificationContext';
import { useGetMeQuery, useUpdateUserMutation } from '@/store/services/userApi';
import { ProfileFormValues } from '@/types';
import { formatPhoneNumber } from '@/utils';
import { parseApiError } from '@/utils/parseApiError';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TabUserData = () => {
  const { t } = useTranslation();
  const api = useNotificationContext();
  const [form] = Form.useForm();
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialValues, setInitialValues] = useState<ProfileFormValues | null>(
    null
  );
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      const initial = {
        email: user.email,
        name: user.fullName,
        phone: user.phoneNumber,
      };
      setInitialValues(initial);
      form.setFieldsValue(initial);
      setHasChanges(false);
      setIsEditing(false);
    }
  }, [user, form]);

  const checkChanges = () => {
    if (!initialValues) {
      setHasChanges(false);
      return;
    }
    const currentValues = form.getFieldsValue();
    const changed =
      currentValues.email !== initialValues.email ||
      currentValues.name !== initialValues.name ||
      currentValues.phone !== initialValues.phone;
    setHasChanges(changed);
  };

  const onFieldsChange = () => {
    checkChanges();
  };

  const onFinish = async (values: any) => {
    if (!hasChanges) {
      api.success({
        message: t('profile.noChanges'),
        placement: 'topRight',
        duration: 3,
      });
      return;
    }

    try {
      await updateUser({
        email: values.email,
        fullName: values.name,
        phoneNumber: values.phone,
      }).unwrap();

      api.success({
        message: t('profile.success'),
        placement: 'topRight',
        duration: 3,
      });

      setInitialValues({
        email: values.email,
        name: values.name,
        phone: values.phone,
      });
      setHasChanges(false);
      setIsEditing(false);
    } catch (error) {
      const { message } = parseApiError(error);
      api.error({
        message: message || t('profile.error'),
        placement: 'topRight',
        duration: 3,
      });
    }
  };

  if (isUserLoading) {
    return <Spinner />;
  }

  return (
    <Form
      style={{ width: '200px' }}
      layout='vertical'
      form={form}
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
    >
      <Form.Item
        label={t('profile.email')}
        name='email'
        rules={[{ required: true, type: 'email' }]}
      >
        <Input
          placeholder={t('profile.emailPlaceholder')}
          disabled={!isEditing}
        />
      </Form.Item>

      <Form.Item
        label={t('profile.name')}
        name='name'
        rules={[
          {
            max: 50,
            message: t('profile.nameMaxLengthError'),
          },
        ]}
      >
        <Input
          placeholder={t('profile.namePlaceholder')}
          disabled={!isEditing}
        />
      </Form.Item>

      <Form.Item
        label={t('profile.phone')}
        name='phone'
        rules={[
          {
            pattern: /^\+380 \d{2} \d{3} \d{2} \d{2}$/,
            message: t('profile.phoneInvalid'),
          },
        ]}
      >
        <Input
          placeholder={t('profile.phonePlaceholder')}
          disabled={!isEditing}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setFieldsValue({ phone: formatted });
          }}
        />
      </Form.Item>

      <Form.Item>
        {!isEditing ? (
          <Button type='default' onClick={() => setIsEditing(true)} block>
            {t('profile.edit')}
          </Button>
        ) : (
          <>
            <Button
              type='primary'
              htmlType='submit'
              loading={isUpdating}
              disabled={!hasChanges}
              block
              style={{ marginBottom: 8 }}
            >
              {t('profile.save')}
            </Button>
            <Button
              type='default'
              onClick={() => {
                form.setFieldsValue(initialValues ?? {});
                setHasChanges(false);
                setIsEditing(false);
              }}
              block
            >
              {t('profile.cancel')}
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export { TabUserData };
