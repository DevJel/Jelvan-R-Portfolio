import { createGlobalStyle } from 'styled-components';
/*
 * Styled components global style configuration
 * used to globally inject configurable variables in styling
 * Main part of our styling is atomic and governed by themes configured in "system-design-variables.ts"
 * */
export const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    color: ${({ theme }) => theme.primary.text};
    background: ${({ theme }) => theme.primary.background};
    overflow-x: hidden;
    overflow-y: auto;
  }

  html,
  body {
    min-height: 100%;
  }

  .icon {
    color: ${({ theme }) => theme.primary.text};
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(244, 129, 32, 0.45);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #f48120;
  }
`;
