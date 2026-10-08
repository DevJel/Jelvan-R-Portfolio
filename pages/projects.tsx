import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/Portfolio/PortfolioLayout/PortfolioLayout';
import HighlightedProjects from '../components/Portfolio/HighlightedProjects/HighlightedProjects';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.projects}>
      <HighlightedProjects />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
