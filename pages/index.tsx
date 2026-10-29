import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/PortfolioLanding/PortfolioLanding';
import Navbar from '../components/Navbar/Navbar';
import HomeOverview from '../components/HomeOverview/HomeOverview';

const PortfolioLandingPage: NextPage = () => (
  <PortfolioLayout seo={PAGES.home}>
    <Navbar isLogoExpanded={true} />
    <PortfolioLanding />
    <HomeOverview />
  </PortfolioLayout>
);

export default PortfolioLandingPage;
