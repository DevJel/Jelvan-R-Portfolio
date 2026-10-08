import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import Contact from '../components/Contact/Contact';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.contact}>
      <Contact />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
