import { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Form, Input, message, Spin } from 'antd';
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
import { useGetMeQuery, useUpdateUserMutation } from '../../services/userApi';

const Profile = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: user, isLoading: isUserLoading } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        name: user.fullName,
        phone: user.phoneNumber,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    try {
      await updateUser({
        email: values.email,
        fullName: values.name,
        phoneNumber: values.phone,
      }).unwrap();

      message.success(t('profile.success'));
    } catch (error) {
      console.error(error);
      message.error(t('profile.error'));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setAvatarUrl(fakeUrl);
      message.success(t('profile.avatarSuccess'));
    }
  };

  if (isUserLoading) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
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
              <Button type='text' size='small'>
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
          <Form layout='vertical' form={form} onFinish={onFinish}>
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
                block
              >
                {t('profile.save')}
              </Button>
            </Form.Item>
          </Form>
        </FlexBox>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
