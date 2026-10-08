import type { NextPage } from 'next';
import React from 'react';

import PortfolioLayout from '../components/Portfolio/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/Portfolio/PortfolioLanding/PortfolioLanding';
import About from '../components/Portfolio/About/About';
import HighlightedProjects from '../components/Portfolio/HighlightedProjects/HighlightedProjects';
import Contact from '../components/Portfolio/Contact/Contact';

const PortfolioLandingPage: NextPage = () => {
  return (
    <PortfolioLayout title={'Jelvan® | Full-Stack Web Developer'}>
      <PortfolioLanding />
      <About withNavbar={true} />
      <HighlightedProjects withNavbar={false} />
      <Contact withNavbar={false} />
    </PortfolioLayout>
  );
};

export default PortfolioLandingPage;
