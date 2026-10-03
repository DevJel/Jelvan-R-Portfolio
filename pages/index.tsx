import PortfolioLayout from '../components/Portfolio/PortfolioLayout/PortfolioLayout';
import PortfolioLanding from '../components/Portfolio/PortfolioLanding/PortfolioLanding';

export default function HomePage() {
  return (
    <PortfolioLayout title={'Jelvan Baloaloa Ricolcol | Full-Stack Developer'}>
      <PortfolioLanding />
    </PortfolioLayout>
  );
}
