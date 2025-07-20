import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer } from '../drawer';
import { Pages } from '@/utils/pages';
import {
  HeaderWrapper,
  MenuItemLink,
  BurgerButton,
  LogoWrapper,
  MenuItem,
  FlexBox,
  Logo,
  Menu,
  AvatarWrapper,
} from './style';
import { Avatar } from 'antd';
import { useAuth } from '@/context/authContext';
import { useUser } from '@/context/userContext';
import { smallIconStyle } from '@/utils';
import { LanguageSelect } from '../select';
import { MobileMenuDrawer } from '../mobileMenuDrawer';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token } = useAuth();
  const { avatarUrl } = useUser();

  useEffect(() => {
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        setIsAdmin(payload.role === 'admin');
      } catch (e) {
        console.error('Failed to parse token', e);
        setIsAdmin(false);
      }
    }
  }, [token]);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => scrollToElement(sectionId), 100);
    } else {
      scrollToElement(sectionId);
    }
  };

  const scrollToElement = (sectionId: string) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <HeaderWrapper>
      <LogoWrapper to='/'>
        <Logo src='/images/logo.png' alt='flower' />
      </LogoWrapper>
      {!isMobile && (
        <Menu>
          <MenuItemLink to={Pages.HOME}>{t('header.main')}</MenuItemLink>
          <MenuItemLink to={Pages.STORE}>{t('header.store')}</MenuItemLink>
          <MenuItem onClick={() => scrollToSection('contacts')}>
            {t('header.contacts')}
          </MenuItem>
          {!token && (
            <MenuItemLink to={Pages.AUTHORIZATION}>
              {t('header.login')}
            </MenuItemLink>
          )}
          {isAdmin && (
            <MenuItemLink to={Pages.ADMIN}>{t('header.admin')}</MenuItemLink>
          )}
        </Menu>
      )}

      <FlexBox>
        {token && (
          <AvatarWrapper
            onClick={() => navigate(Pages.PROFILE)}
            $active={location.pathname === Pages.PROFILE}
          >
            <Avatar
              size={32}
              src={avatarUrl}
              icon={!avatarUrl && <UserOutlined />}
              style={smallIconStyle}
            />
          </AvatarWrapper>
        )}

        <Drawer />
        {!isMobile && <LanguageSelect />}
      </FlexBox>

      {isMobile && (
        <BurgerButton onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
          <MenuOutlined />
        </BurgerButton>
      )}

      <MobileMenuDrawer
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        isAdmin={isAdmin}
        token={token}
      />
    </HeaderWrapper>
  );
};

export { Header };
