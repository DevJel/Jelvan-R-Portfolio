import React, { FC } from 'react';
import * as Styled from './PortfolioLayout.styles';
import Head from 'next/head';
import { absoluteUrl, PageSeo, SITE } from '../../utils/seo';

export interface Props {
  seo: PageSeo;
  children?: React.ReactNode;
}

/**
 *Renders page wrapper and the page's SEO tags
 *@function PortfolioLayout
 *@param {PageSeo} seo - title, description and canonical path of the page
 *@param {ReactNode} children - content of layout
 *@returns {JSX.Element} - Rendered PortfolioLayout component
 */
const PortfolioLayout: FC<Props> = ({ children, seo }): JSX.Element => {
  const url = absoluteUrl(seo.path);
  const robots = seo.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1';

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content={SITE.themeColor} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} key="description" />
        <meta name="robots" content={robots} key="robots" />
        <link rel="canonical" href={url} key="canonical" />

        {/* Open Graph (LinkedIn, Facebook, WhatsApp, Slack…) */}
        <meta property="og:type" content="profile" key="og:type" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:title" content={seo.title} key="og:title" />
        <meta
          property="og:description"
          content={seo.description}
          key="og:description"
        />
        <meta property="og:image" content={SITE.image} key="og:image" />
        <meta
          property="og:image:alt"
          content={`${SITE.name}, ${SITE.headline}`}
          key="og:image:alt"
        />
        <meta property="profile:first_name" content="Jelvan" />
        <meta property="profile:last_name" content="Ricolcol" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={seo.description}
          key="twitter:description"
        />
        <meta name="twitter:image" content={SITE.image} key="twitter:image" />
      </Head>
      <Styled.Container>{children}</Styled.Container>
    </>
  );
};

export default PortfolioLayout;
