import { useRef, useState } from 'react';
import { Avatar, Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      console.log('Sending data to backend:', { ...values, avatarUrl });
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setAvatarUrl(fakeUrl);
      message.success('Avatar uploaded successfully!');
    }
  };

  return (
    <Wrapper>
      <Title>My Profile</Title>

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
                Click to upload
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
            initialValues={{
              name: '',
              email: '',
              phone: '',
            }}
          >
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, type: 'email' }]}
            >
              <Input placeholder='Enter your email' />
            </Form.Item>

            <Form.Item label='Full Name' name='name'>
              <Input placeholder='Enter your name' />
            </Form.Item>

            <Form.Item label='Phone Number' name='phone'>
              <Input placeholder='Enter your phone number' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' loading={loading} block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </FlexBox>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
