import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import Resume from '../components/Resume/Resume';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.resume}>
      <Resume />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
