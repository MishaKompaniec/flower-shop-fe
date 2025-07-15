import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input } from 'antd';
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
  useGetMeQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from '../../services/userApi';
import type { ProfileFormValues } from '../../types';
import { Spinner } from '../../components';
import { useNotificationContext } from '../../context/notificationContext';
import { useUser } from '../../context/userContext';

const Profile = () => {
  const api = useNotificationContext();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [initialValues, setInitialValues] = useState<ProfileFormValues | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: user, isLoading: isUserLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const { avatarUrl } = useUser();

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
    } catch (error: any) {
      api.error({
        message: error.data.error || t('profile.error'),
        placement: 'topRight',
        duration: 3,
      });
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

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '').slice(0, 12);
    let formatted = '+380';

    if (digits.length > 3) {
      const phoneDigits = digits.slice(3);
      const parts = [
        phoneDigits.slice(0, 2),
        phoneDigits.slice(2, 5),
        phoneDigits.slice(5, 7),
        phoneDigits.slice(7, 9),
      ].filter(Boolean);

      formatted += ' ' + parts.join(' ');
    } else {
      formatted += ' ' + digits.slice(3);
    }

    return formatted;
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
                src={avatarUrl}
                icon={!avatarUrl && <UserOutlined />}
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
                value={form.getFieldValue('phone')}
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
        </FlexBox>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
