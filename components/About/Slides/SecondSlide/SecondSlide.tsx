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
            I bridge people strategy, process design and technology to help
            organizations modernize how work gets done. My focus is end-to-end
            Human Resources transformation: workforce planning, recruitment,
            selection, pre-employment, onboarding, employee records, time and
            attendance, performance, learning, employee relations and
            offboarding — connected through clear ownership, secure data and
            measurable workflows.
          </PortfolioParagraph>
        </div>
        <div className="right-column">
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              `I also design practical systems for finance, procurement, customer service,
              IT service management, knowledge, communications, document
              management, analytics and workflow automation. The objective is
              not technology for its own sake: it is simpler employee and
              customer experiences, stronger controls, reliable information
              and better operational decisions.`
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
