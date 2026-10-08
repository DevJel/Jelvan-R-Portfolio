import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/PortfolioLanding/PortfolioLanding';
import About from '../components/About/About';
import HighlightedProjects from '../components/HighlightedProjects/HighlightedProjects';
import Contact from '../components/Contact/Contact';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.home}>
      <PortfolioLanding />
      <About withNavbar={true} />
      <HighlightedProjects withNavbar={false} />
      <Contact withNavbar={false} />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
