import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LanguageSelect } from '../select';
import { Pages } from '@/utils/pages';
import type { FC } from 'react';
import {
  MobileMenuDrawerEl,
  CloseIconWrapper,
  MenuItemLink,
  MenuItem,
  Wrapper,
} from './style';

interface MobileMenuDrawerProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  token: string | null;
}

const MobileMenuDrawer: FC<MobileMenuDrawerProps> = ({
  setIsMobileMenuOpen,
  isMobileMenuOpen,
  isAdmin,
  token,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollToElement = (sectionId: string) => {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => scrollToElement(sectionId), 100);
    } else {
      scrollToElement(sectionId);
    }
  };

  return (
    <MobileMenuDrawerEl open={isMobileMenuOpen}>
      <Wrapper>
        <CloseIconWrapper onClick={() => setIsMobileMenuOpen(false)}>
          <CloseOutlined />
        </CloseIconWrapper>
        <MenuItemLink
          to={Pages.STORE}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {t('header.store')}
        </MenuItemLink>
        <MenuItem onClick={() => scrollToSection('about-us')}>
          {t('header.about')}
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('bestSellers')}>
          {t('header.top')}
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('contacts')}>
          {t('header.contacts')}
        </MenuItem>
        {!token && (
          <MenuItemLink
            to={Pages.AUTHORIZATION}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.login')}
          </MenuItemLink>
        )}
        {isAdmin && (
          <MenuItemLink
            to={Pages.ADMIN}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('header.admin')}
          </MenuItemLink>
        )}
        <LanguageSelect />
      </Wrapper>
    </MobileMenuDrawerEl>
  );
};

export { MobileMenuDrawer };
