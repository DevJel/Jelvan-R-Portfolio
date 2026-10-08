import React from 'react';
import styled from 'styled-components';
import { SiAmazonaws, SiCloudflare } from 'react-icons/si';

export type Brand = 'cloudflare' | 'aws';

const BRANDS: Record<Brand, { name: string; color: string; Icon: typeof SiCloudflare }> = {
  cloudflare: { name: 'Cloudflare', color: '#f38020', Icon: SiCloudflare },
  aws: { name: 'AWS', color: '#232f3e', Icon: SiAmazonaws },
};

interface Props {
  brands: Brand[];
  subtitle: string;
}

/**
 *Renders a brand card for a project (platform mark, rule and project name),
 *used in place of a screenshot, in the same style as the original brand images.
 *@function BrandCard
 *@returns {JSX.Element} - Rendered BrandCard component
 */
const BrandCard = ({ brands, subtitle }: Props): JSX.Element => {
  return (
    <Card role="img" aria-label={`${subtitle} built on ${brands.map((b) => BRANDS[b].name).join(' and ')}`}>
      <Marks>
        {brands.map((brand) => {
          const { Icon, color } = BRANDS[brand];
          return <Icon key={brand} style={{ color }} className="brand-mark" />;
        })}
      </Marks>
      <Name>{brands.map((b) => BRANDS[b].name).join(' + ')}</Name>
      <Rule />
      <Subtitle>{subtitle}</Subtitle>
    </Card>
  );
};

export default BrandCard;

const Card = styled.div`
  width: min(32rem, 78vw);
  aspect-ratio: 16 / 10;
  background: #ffffff;
  border-radius: 1.25rem;
  border: 1px solid rgba(244, 129, 32, 0.22);
  box-shadow: 0 15px 35px rgba(244, 129, 32, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;

  @media ${({ theme }) => theme.media.tablet} {
    width: min(22rem, 70vw);
    padding: 1rem;
  }
`;

const Marks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  .brand-mark {
    font-size: 6.5rem;
  }

  @media ${({ theme }) => theme.media.tablet} {
    .brand-mark {
      font-size: 4rem;
    }
  }
`;

const Name = styled.p`
  margin: 0.5rem 0 0;
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #17181d;

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 1.4rem;
  }
`;

const Rule = styled.hr`
  width: 70%;
  border: 0;
  border-top: 2px solid #17181d;
  margin: 0.75rem 0;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #545c6a;

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
`;
