import { useNotificationContext } from '@/context/notificationContext';
import { useChangePasswordMutation } from '@/store/services/userApi';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const TabPassword = () => {
  const { t } = useTranslation();
  const api = useNotificationContext();
  const [passwordForm] = Form.useForm();

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const onChangePassword = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      await changePassword(values).unwrap();
      api.success({
        message: t('profile.passwordSuccess'),
        placement: 'topRight',
        duration: 3,
      });
      passwordForm.resetFields();
    } catch (error: any) {
      api.error({
        message: error.data?.error || t('profile.passwordError'),
        placement: 'topRight',
        duration: 3,
      });
    }
  };
  return (
    <Form
      layout='vertical'
      form={passwordForm}
      onFinish={onChangePassword}
      style={{ width: '200px' }}
    >
      <Form.Item
        label={t('profile.currentPassword')}
        name='currentPassword'
        rules={[{ required: true, message: t('profile.requiredField') }]}
      >
        <Input.Password placeholder={t('profile.currentPasswordPlaceholder')} />
      </Form.Item>

      <Form.Item
        label={t('profile.newPassword')}
        name='newPassword'
        rules={[
          { required: true, message: t('profile.requiredField') },
          { min: 6, message: t('profile.passwordMinLength') },
        ]}
      >
        <Input.Password placeholder={t('profile.newPasswordPlaceholder')} />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={isChangingPassword}
          block
        >
          {t('profile.changePassword')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export { TabPassword };
