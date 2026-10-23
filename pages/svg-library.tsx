import type { NextPage } from 'next';
import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import SvgLibraryPage from '../components/DevTools/SvgLibraryPage';
import { PAGES } from '../utils/seo';

const SvgLibraryRoute: NextPage = () => (
  <PortfolioLayout seo={PAGES.svgLibrary}>
    <SvgLibraryPage />
  </PortfolioLayout>
);

export default SvgLibraryRoute;
