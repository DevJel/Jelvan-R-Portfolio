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
            <h3>Full-Stack Developer</h3>
            <time>2019-2021</time>
          </Styled.MilestoneHeader>
          <h4>Chernivtsi National University</h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'I worked at Chernivtsi National University on a number of educational and Web projects as a front and back end developer. I architected and constructed solutions daily used by tens of thousands of students and thousands of employees.'
            }
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence={true}
          />
        </Styled.Milestone>

        <Styled.Milestone variant={'fourth'}>
          <Styled.MilestoneHeader>
            <h3>PhD Student | Applied Scientist</h3>
            <time>2015-2019</time>
          </Styled.MilestoneHeader>
          <h4>
            University of Oulu | Taras Shevchenko National University of Kyiv
          </h4>
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'I worked in an interdisplinary international research team on the development of cutting-edge medical image processing techniques. I have published a number of papers in high-impact journals and conferences.'
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
