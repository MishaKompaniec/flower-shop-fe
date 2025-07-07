import { ConfigProvider } from 'antd';
import React, { type PropsWithChildren } from 'react';

import { colors } from './colors';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
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
