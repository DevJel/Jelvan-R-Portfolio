import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../../../utils/seo';

import PortfolioLayout from '../../../components/PortfolioLayout/PortfolioLayout';
import HighlightedProjects from '../../../components/HighlightedProjects/HighlightedProjects';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.projects}>
      <HighlightedProjects />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
