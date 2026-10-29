import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { keyHighlights } from '../Resume/Resume.config';

const Section = styled.section`
  background: linear-gradient(150deg, #fffaf4 0%, #ffffff 62%, #fff0e2 100%);
  color: #17181d;
  padding: clamp(4rem, 9vw, 8rem) clamp(1.4rem, 6vw, 7rem);
  border-top: 1px solid rgba(244, 129, 32, 0.12);
`;
const Inner = styled.div`
  max-width: 1140px;
  margin: 0 auto;
`;
const Eyebrow = styled.p`
  color: #d96514;
  font: 700 0.8rem/1.5 'Poppins', sans-serif;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
const Heading = styled.h2`
  margin: 0;
  max-width: 820px;
  font: 700 clamp(2.25rem, 5.6vw, 5rem)/1.1 'Poppins', sans-serif;
  letter-spacing: -0.055em;
  em { color: #f48120; font-style: normal; }
`;
const Summary = styled.p`
  max-width: 800px;
  font-size: clamp(1.1rem, 2vw, 1.55rem);
  line-height: 1.7;
  margin: 2rem 0 0;
  color: #293447;
`;
const Context = styled.p`
  max-width: 760px;
  margin: 0.9rem 0 0;
  font-size: 1rem;
  line-height: 1.85;
  color: #545c6a;
`;
const Metrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 3.2rem 0;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;
const Metric = styled.div`
  padding: 1.5rem;
  border: 1px solid #e9ddcf;
  border-radius: 16px;
  background: rgba(255,255,255,0.8);
  strong { display: block; color: #172b4d; font-size: clamp(1.8rem, 3vw, 2.6rem); line-height: 1.1; }
  span { display: block; color: #657084; font-size: 0.85rem; margin-top: 0.5rem; }
`;
const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 46px;
    padding: 0.75rem 1.2rem;
    border: 1px solid #172b4d;
    border-radius: 999px;
    color: #172b4d;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background .2s, color .2s;
  }
  a:first-child, a:hover, a:focus-visible { background: #172b4d; color: white; }
  a:focus-visible { outline: 3px solid #f48120; outline-offset: 3px; }
`;

/** Home-only summary. Detailed content belongs on dedicated portfolio routes. */
const HomeOverview = (): JSX.Element => (
  <Section aria-labelledby="home-overview-title">
    <Inner>
      <Eyebrow>Portfolio / at a glance</Eyebrow>
      <Heading id="home-overview-title">
        People strategy meets <em>technology.</em>
      </Heading>
      <Summary>
        Building people systems, AI agents and digital operations that help
        organizations scale is my calling.
      </Summary>
      <Context>
        I work across strategic Human Resources, full-stack development and
        digital transformation, connecting practical people operations with
        dependable software and automation.
      </Context>
      <Metrics aria-label="Portfolio highlights">
        {keyHighlights.slice(0, 3).map((item) => (
          <Metric key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </Metric>
        ))}
      </Metrics>
      <Links aria-label="Explore portfolio sections">
        <Link href="/portfolio/about">About me ↗</Link>
        <Link href="/portfolio/projects">Explore projects ↗</Link>
        <Link href="/portfolio/resume">View resume ↗</Link>
        <Link href="/portfolio/contact">Get in touch ↗</Link>
      </Links>
    </Inner>
  </Section>
);

export default HomeOverview;
