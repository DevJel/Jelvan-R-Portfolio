import type { NextPage } from 'next';
import PortfolioLayout from '../components/PortfolioLayout/PortfolioLayout';
import DevTools from '../components/DevTools/DevTools';
import { PAGES } from '../utils/seo';

const ToolsPage: NextPage = () => (
  <PortfolioLayout seo={PAGES.tools}>
    <DevTools />
  </PortfolioLayout>
);

export default ToolsPage;
