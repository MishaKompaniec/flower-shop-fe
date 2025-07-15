import { useLocation } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import { MainWrapper } from './style';
import type { FC } from 'react';
import { LayoutProps } from '@/types';

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/authorization';
  const isProfilePage = location.pathname === '/profile';
  const isAdminPage = location.pathname === '/admin';

  const hideFooter = isAuthPage || isAdminPage || isProfilePage;

  return (
    <>
      {!isAuthPage && <Header />}
      <MainWrapper>{children}</MainWrapper>
      {!hideFooter && <Footer />}
    </>
  );
};

export { Layout };
