import { ConfigProvider } from 'antd';
import { FC, type PropsWithChildren } from 'react';
import { colors } from './colors';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
