import React from 'react';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import ScrollHint from '../../../ScrollHint/ScrollHint';
import * as Styled from './FirstSlide.styles';
import Slide from '../../../Slide/Slide';
import WithSparkles from '../../../WithSparkles/WithSparkles';

/**
 *Renders first slide in About Portfolio presentation
 *@function FirstSlide
 *@returns {JSX.Element} - Rendered CardContent component
 */
const FirstSlide = (): JSX.Element => {
  return (
    <Slide bgColor={'#ffffff'} height={`100vh`} anchorID={'first-slide'}>
      <Styled.FirstSlide className="page first-page">
        <SectionHeader
          variant={'medium'}
          headerText={'Strategic HR & Digital Transformation'}
          margin={'0'}
          color={'#f48120'}
        />

        <PortfolioParagraph
          margin={'1rem 0'}
          withDarkColor={false}
          variant={'large'}
          withAnimatedPresence={true}
        >
          Building people systems, AI agents and digital operations that help
          organizations scale is my <WithSparkles color={'#f48120'}>calling.</WithSparkles>
        </PortfolioParagraph>

        <ScrollHint />
      </Styled.FirstSlide>
    </Slide>
  );
};

export default FirstSlide;
