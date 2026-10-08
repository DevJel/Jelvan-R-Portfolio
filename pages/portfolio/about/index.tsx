import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../../../utils/seo';
import PortfolioLayout from '../../../components/Portfolio/PortfolioLayout/PortfolioLayout';
import About from '../../../components/Portfolio/About/About';

const PortfolioAboutPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.about}>
      <About />
    </PortfolioLayout>
  );
};

export default PortfolioAboutPage;
