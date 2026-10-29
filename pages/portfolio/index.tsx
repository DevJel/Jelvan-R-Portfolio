import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import { PAGES } from '../../utils/seo';

import PortfolioLayout from '../../components/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../../components/PortfolioLanding/PortfolioLanding';
import Navbar from '../../components/Navbar/Navbar';

/** The landing screen is the only Home section. All details live on their own routes. */
const FullscreenHome = styled.main`
  width: 100%;
  height: 100vh; /* fallback for older browsers */
  height: 100dvh;
  overflow: hidden;
  position: relative;
`;

const PortfolioLandingPage: NextPage = () => (
  <PortfolioLayout seo={PAGES.home}>
    <FullscreenHome>
      <Navbar isLogoExpanded={true} />
      <PortfolioLanding />
    </FullscreenHome>
  </PortfolioLayout>
);

export default PortfolioLandingPage;
