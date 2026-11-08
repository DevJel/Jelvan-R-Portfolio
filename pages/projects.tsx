import type { NextPage } from 'next';
import React from 'react';
import { PAGES } from '../utils/seo';

import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import HighlightedProjects from '../components/HighlightedProjects/HighlightedProjects';
import ResumeSamples from '../components/ResumeSamples/ResumeSamples';
import AllRepositories from '../components/AllRepositories/AllRepositories';

const ProjectsPage: NextPage = () => (
  <PortfolioLayout seo={PAGES.projects}>
    <HighlightedProjects />
    <AllRepositories />
    <ResumeSamples />
  </PortfolioLayout>
);

export default ProjectsPage;
