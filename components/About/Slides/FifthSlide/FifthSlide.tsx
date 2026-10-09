import React from 'react';
import * as Styled from './FifthSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';

/**
 *Renders fifth slide in About Portfolio presentation
 *@function FifthSlide
 *@returns {JSX.Element} - Rendered FifthSlide component
 */
const FifthSlide = (): JSX.Element => {
  return (
    <Slide bgColor={'#ffffff'} height={'100vh'} anchorID={'fifth-slide'}>
      <Styled.FifthSlide>
        <SectionHeader
          variant={'small'}
          headerText={'Highlighted milestones'}
          margin={'0'}
          color={'#f48120'}
        />
        <Styled.Milestone variant={'first'}>
          <Styled.MilestoneHeader>
            <h3>Cloudflare-native Systems</h3>
            <time>Present</time>
          </Styled.MilestoneHeader>
          <h4>Cloudflare Platform</h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'I build full applications on Cloudflare: Workers for APIs, D1 databases, Email Routing, Turnstile sign-in and Workers AI. That covers hosting, data, email and AI with no separate servers.'
            }
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence={true}
          />
        </Styled.Milestone>

        <Styled.Milestone variant={'second'}>
          <Styled.MilestoneHeader>
            <h3>API Gateway & Control Plane</h3>
            <time>2026</time>
          </Styled.MilestoneHeader>
          <h4>Cloudflare Workers</h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={`A secure API gateway on Cloudflare Workers, with human verification, emailed sign-in codes and admin-level access control.`}
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence={true}
          />
        </Styled.Milestone>

        <Styled.Milestone variant={'third'}>
          <Styled.MilestoneHeader>
            <h3>Shared Services HR Specialist</h3>
            <time>2022-2024</time>
          </Styled.MilestoneHeader>
          <h4>Teleperformance USA | Remote</h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'I managed the end-to-end employee lifecycle for a 30,000+ global workforce, onboarding 70+ agents every week and processing critical compliance documentation with a perfect 100% audit record.'
            }
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence={true}
          />
        </Styled.Milestone>

        <Styled.Milestone variant={'fourth'}>
          <Styled.MilestoneHeader>
            <h3>Dual Master&apos;s Degree</h3>
            <time>2024-2025</time>
          </Styled.MilestoneHeader>
          <h4>
            Universidad Isabel I | AI for Business, HR & Talent Management
          </h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'I completed dual graduate studies in Artificial Intelligence for Business and in Human Resource and Talent Management, covering talent pipelines, performance and international labor compliance, alongside Python, machine learning and automated SaaS pipelines.'
            }
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence={true}
          />
        </Styled.Milestone>
      </Styled.FifthSlide>
    </Slide>
  );
};

export default FifthSlide;
