import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input, message, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  AvatarUploadLabel,
  AvatarWrapper,
  FlexBox,
  FormWrapper,
  HiddenFileInput,
  Title,
  Wrapper,
} from './style';
import { largeIconStyle } from '../../utils';
import {
  useGetAvatarQuery,
  useGetMeQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from '../../services/userApi';
import type { ProfileFormValues } from '../../types';
import { Spinner } from '../../components';

const Profile = () => {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialValues, setInitialValues] = useState<ProfileFormValues | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const { data: userAvatarUrl } = useGetAvatarQuery();

  useEffect(() => {
    if (user) {
      const initial = {
        email: user.email,
        name: user.fullName,
        phone: user.phoneNumber,
      };
      setInitialValues(initial);
      form.setFieldsValue(initial);
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
      notification.info({
        message: t('profile.noChanges'),
        placement: 'topRight',
        duration: 2,
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
    } catch (error) {
      console.error(error);
      message.error(t('profile.error'));
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadAvatar(file).unwrap();
        api.success({
          message: t('profile.avatarSuccess'),
          placement: 'topRight',
          duration: 3,
        });
      } catch (error: any) {
        console.error('Upload avatar failed:', error);
        api.error({
          message: error.data.error,
          placement: 'topRight',
          duration: 3,
        });
      }
    }
  };

  if (isUserLoading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Title>{t('profile.title')}</Title>

      <FormWrapper>
        <FlexBox>
          <AvatarWrapper>
            <AvatarUploadLabel onClick={() => fileInputRef.current?.click()}>
              <Avatar
                size={128}
                src={userAvatarUrl && userAvatarUrl.avatarUrl}
                icon={!userAvatarUrl && <UserOutlined />}
                style={largeIconStyle}
              />
              <Button
                type='text'
                size='small'
                loading={isUploading}
                disabled={isUploading}
              >
                {t('profile.uploadButton')}
              </Button>
            </AvatarUploadLabel>
            <HiddenFileInput
              type='file'
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept='image/*'
            />
          </AvatarWrapper>
          <Form
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
              <Input placeholder={t('profile.emailPlaceholder')} />
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
              <Input placeholder={t('profile.namePlaceholder')} />
            </Form.Item>

            <Form.Item
              label={t('profile.phone')}
              name='phone'
              rules={[
                {
                  pattern: /^(\+380|0)\d{9}$/,
                  message: t('profile.phoneInvalid'),
                },
              ]}
            >
              <Input placeholder={t('profile.phonePlaceholder')} />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={isUpdating}
                disabled={!hasChanges}
                block
              >
                {t('profile.save')}
              </Button>
            </Form.Item>
          </Form>
        </FlexBox>
      </FormWrapper>
      {contextHolder}
    </Wrapper>
  );
};

export default Profile;
