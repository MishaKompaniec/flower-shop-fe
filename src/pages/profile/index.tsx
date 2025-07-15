import { useRef } from 'react';
import { Avatar, Button, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  AvatarUploadLabel,
  HiddenFileInput,
  AvatarWrapper,
  FormWrapper,
  FlexBox,
  Wrapper,
  Title,
} from './style';
import { useNotificationContext } from '@/context/notificationContext';
import { useUploadAvatarMutation } from '@/services/userApi';
import { useUser } from '@/context/userContext';
import { largeIconStyle } from '@/utils';
import { TabPassword } from './tabPassword';
import { TabUserData } from './tabUserData';

const Profile = () => {
  const api = useNotificationContext();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const { avatarUrl } = useUser();

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
          <Tabs
            defaultActiveKey='profile'
            items={[
              {
                key: 'profile',
                label: t('profile.userDataTab'),
                children: <TabUserData />,
              },
              {
                key: 'password',
                label: t('profile.passwordTab'),
                children: <TabPassword />,
              },
            ]}
          />
        </FlexBox>
      </FormWrapper>
    </Wrapper>
  );
};

export default Profile;
