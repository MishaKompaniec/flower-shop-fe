import { MenuOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Drawer } from '../drawer';
import { MobileMenuDrawer } from '../mobileMenuDrawer';
import { LanguageSelect } from '../select';

import {
  HeaderWrapper,
  MenuItemLink,
  BurgerButton,
  LogoWrapper,
  MenuItem,
  FlexBox,
  Logo,
  Menu,
} from './style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <LogoWrapper to="/">
        <Logo src="/images/logo.png" alt="flower" />
      </LogoWrapper>
      {!isMobile && (
        <Menu>
          <MenuItemLink to="/">{t('header.main')}</MenuItemLink>
          <MenuItemLink to="/store">{t('header.store')}</MenuItemLink>
          <MenuItem onClick={() => scrollToSection('about-us')}>
            {t('header.about')}
          </MenuItem>
          <MenuItem onClick={() => scrollToSection('contacts')}>
            {t('header.contacts')}
          </MenuItem>
        </Menu>
      )}

      <FlexBox>
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
      />
    </HeaderWrapper>
  );
};

export { Header };
