import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../../../utils/seo';

import PortfolioLayout from '../../../components/PortfolioLayout/PortfolioLayout';
import AllDevToArticles from '../../../components/AllDevToArticles/AllDevToArticles';

const ArticlesPage: NextPage = () => {
  return (
    <PortfolioLayout seo={PAGES.articles}>
      <AllDevToArticles />
    </PortfolioLayout>
  );
};

export default ArticlesPage;
