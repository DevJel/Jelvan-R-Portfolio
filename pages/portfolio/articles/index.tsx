import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../../../utils/seo';

import PortfolioLayout from '../../../components/Portfolio/PortfolioLayout/PortfolioLayout';
import AllDevToArticles from '../../../components/Portfolio/AllDevToArticles/AllDevToArticles';

const ArticlesPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.articles}>
      <AllDevToArticles />
    </PortfolioLayout>
  );
};

export default ArticlesPage;
