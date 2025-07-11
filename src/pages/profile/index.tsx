import { useRef, useState } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd';
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

const Profile = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log('Sending data to backend:', { ...values, avatarUrl });
      message.success(t('profile.success'));
    } catch (error) {
      message.error(t('profile.error'));
    } finally {
      setLoading(false);
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
          <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            initialValues={{ name: '', email: '', phone: '' }}
          >
            <Form.Item
              label={t('profile.email')}
              name='email'
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder={t('profile.emailPlaceholder')} />
            </Form.Item>

            <Form.Item label={t('profile.name')} name='name'>
              <Input placeholder={t('profile.namePlaceholder')} />
            </Form.Item>

            <Form.Item label={t('profile.phone')} name='phone'>
              <Input placeholder={t('profile.phonePlaceholder')} />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading} block>
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
