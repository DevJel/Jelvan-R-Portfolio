import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';
import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import About from '../components/About/About';

const PortfolioAboutPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.about}>
      <About />
    </PortfolioLayout>
  );
};

export default PortfolioAboutPage;
