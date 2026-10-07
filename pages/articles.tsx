import type { NextPage } from 'next';
import React from 'react';

import PortfolioLayout from '../components/Portfolio/PortfolioLayout/PortfolioLayout';
import AllDevToArticles from '../components/Portfolio/AllDevToArticles/AllDevToArticles';

const ArticlesPage: NextPage = () => {
  return (
    <PortfolioLayout title={'Jelvan® | Articles'}>
      <AllDevToArticles />
    </PortfolioLayout>
  );
};

export default ArticlesPage;
