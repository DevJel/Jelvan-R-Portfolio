import type { AppProps } from 'next/app';
import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { PortfolioStateProvider } from '../hooks/PortfolioStateContext';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { GlobalStyles } from '../design-system/globalStyle';
import '../design-system/index.css';
import { useSystemDesign } from '../design-system/useSystemDesign';

const InnerApp: FC<AppProps> = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const { theme } = useTypedSelector((state) => state.ui);
  const { darkTheme, lightTheme } = useSystemDesign();

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

const WrappedApp: FC<AppProps> = (props: AppProps): JSX.Element => {
  return (
    <PortfolioStateProvider>
      <InnerApp {...props} />
    </PortfolioStateProvider>
  );
};

export default WrappedApp;
