import { useLocation } from 'react-router-dom';

import { Footer } from '../footer';
import { Header } from '../header';

import { MainWrapper } from './style';
import type { LayoutProps } from '../../types';
import type { FC } from 'react';

const Layout: FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/authorization';

  return (
    <>
      {!isAuthPage && <Header />}
      <MainWrapper>{children}</MainWrapper>
      {!isAuthPage && <Footer />}
    </>
  );
};

export { Layout };
