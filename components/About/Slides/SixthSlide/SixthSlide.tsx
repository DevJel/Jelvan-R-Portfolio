import React from 'react';
import * as Styled from './SixthSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import ActionButton from '../../../ActionButton/ActionButton';
import { FiChevronsRight, FiFileText } from 'react-icons/fi';
import { useRouter } from 'next/router';

/**
 *Renders fifth slide in About Portfolio presentation
 *@function SixthSlide
 *@returns {JSX.Element} - Rendered SixthSlide component
 */
const SixthSlide = (): JSX.Element => {
  const router = useRouter();
  const redirectToProjects = () => {
    router.push('/portfolio/projects');
  };
  const redirectToResume = () => {
    router.push('/portfolio/resume');
  };
  return (
    <Slide bgColor={'#ffffff'} height={'100vh'} anchorID={'sixth-slide'}>
      <Styled.SixthSlide>
        <div className="left-column">
          <div className="content-wrapper">
            <SectionHeader
              variant={'small'}
              headerText={'I build & automate'}
              margin={'0'}
              color={'#f48120'}
            />
            <PortfolioParagraph
              margin={'2rem 0 4rem 0'}
              paragraphText={`Websites, HR systems and automated workflows for businesses and teams`}
              withDarkColor={false}
              variant={'large'}
              withAnimatedPresence={true}
            />
            <ActionButton
              buttonText={'See my projects'}
              icon={<FiChevronsRight className="action-icon" />}
              onClick={redirectToProjects}
            />
          </div>
        </div>
        <div className="right-column">
          <div className="content-wrapper">
            <SectionHeader
              variant={'small'}
              headerText={'I advise & support'}
              margin={'0'}
              color={'#f48120'}
            />
            <PortfolioParagraph
              margin={'2rem 0 4rem 0'}
              paragraphText={
                'On HR operations, compliance, digital branding and AI adoption for growing organizations'
              }
              withDarkColor={false}
              variant={'large'}
              withAnimatedPresence={true}
            />
            <ActionButton
              buttonText={'View my resume'}
              icon={<FiFileText className="action-icon" />}
              onClick={redirectToResume}
            />
          </div>
        </div>
      </Styled.SixthSlide>
    </Slide>
  );
};

export default SixthSlide;
