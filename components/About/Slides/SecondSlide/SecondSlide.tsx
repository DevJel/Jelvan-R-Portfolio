import React from 'react';
import * as Styled from './SecondSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import WithSparkles from '../../../WithSparkles/WithSparkles';

/**
 *Renders second slide in About Portfolio presentation
 *@function SecondSlide
 *@returns {JSX.Element} - Rendered SecondSlide component
 */
const SecondSlide = (): JSX.Element => {
  return (
    <Slide bgColor={'#fff7f0'} height={'100vh'} anchorID={'second-slide'}>
      <Styled.SecondSlide className="page second-page">
        <div className="left-column">
          <SectionHeader
            variant={'medium'}
            headerText={'People'}
            margin={'0'}
            color={'#f48120'}
          />

          <PortfolioParagraph
            margin={'0'}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          >
            I am a{' '}
            <WithSparkles color={'#f48120'}>
              multifaceted professional
            </WithSparkles>{' '}
            who bridges people strategy and technology. HR generalist, web
            developer and AI practitioner, I help organizations hire, manage and
            grow their workforce with clear, compliant and modern systems.
          </PortfolioParagraph>
        </div>
        <div className="right-column">
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              'With IBM Full Stack and AWS AI certifications, I design and build web systems, AI agents and automated workflows that make HR and business operations faster, smarter and easier to run.'
            }
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          />
          <SectionHeader
            variant={'medium'}
            headerText={'Technology'}
            margin={'0'}
            color={'#f48120'}
          />
        </div>
      </Styled.SecondSlide>
    </Slide>
  );
};

export default SecondSlide;
