import React from 'react';
import * as Styled from './HighlightedProjects.styles';
import { useHighlightedProjectsData } from './HighlightedProjects.config';
import Navbar from '../Navbar/Navbar';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import Image from 'next/legacy/image';
import ScrollHint from '../ScrollHint/ScrollHint';
import ProjectDesktopSlide from '../ProjectDesktopSlide/ProjectDesktopSlide';
import WaveDivider from '../WaveDivider/WaveDivider';

const WHITE = '#ffffff';

const waveBetween = (above: string, below: string): string => {
  if (above === below) {
    return above === WHITE
      ? '/assets/portfolio/blob-band-white.svg'
      : '/assets/portfolio/blob-band-cream.svg';
  }
  return above === WHITE
    ? '/assets/portfolio/blob-1.svg'
    : '/assets/portfolio/blob-2.svg';
};

export interface Props {
  withNavbar?: boolean;
}

/** Presents the selected projects in a consistent, responsive sequence. */
const HighlightedProjects = ({ withNavbar = true }: Props): JSX.Element => {
  const { highlightedProjects } = useHighlightedProjectsData();

  return (
    <Styled.Container>
      {withNavbar && <Navbar isLogoExpanded={true} />}

      <Styled.ProjectsHero>
        <Styled.HeroLeftColumn>
          <SectionHeader
            variant={'medium'}
            headerText={'Selected Projects'}
            margin={'0'}
            color={'#f48120'}
          />
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'A selection of digital products and systems spanning AI automation, knowledge management, business operations, productivity, e-commerce, and developer tooling.'
            }
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence
          />
          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={
              'Some project details and visuals are presented as demonstrations. Client-specific information and confidential implementation details are not displayed.'
            }
            withDarkColor={false}
            variant={'medium'}
            withAnimatedPresence
          />
        </Styled.HeroLeftColumn>
        <Styled.HeroRightColumn>
          <Styled.ImageContainer
            position={{ top: '0', right: '0' }}
            className={'laptop-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'laptop'}>
              <Image
                src={'/assets/portfolio/laptop-lms.png'}
                quality={95}
                height={800}
                width={800}
                objectFit={'contain'}
                alt={'Laptop showing a portfolio project'}
                priority
                className={'laptop'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          <Styled.ImageContainer
            position={{ top: '35%', right: '10px' }}
            className={'mobile-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'phone'}>
              <Image
                src={'/assets/portfolio/landing-mobile.png'}
                quality={95}
                height={450}
                width={350}
                alt={'Phone showing a portfolio project'}
                layout={'fixed'}
                objectFit={'contain'}
                priority
                className={'mobile'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          <Styled.ImageContainer
            position={{ bottom: '6rem', left: '0' }}
            className={'watch-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'watch'}>
              <Image
                src={'/assets/portfolio/landing-watch.png'}
                layout={'fixed'}
                quality={95}
                height={200}
                width={200}
                objectFit={'contain'}
                alt={'Smartwatch showing a portfolio project'}
                priority
                className={'watch'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
        </Styled.HeroRightColumn>
        <ScrollHint />
      </Styled.ProjectsHero>

      {highlightedProjects.map((project, index) => {
        const previousBg =
          index === 0 ? WHITE : highlightedProjects[index - 1].slideBgColor;
        return (
          <React.Fragment key={project.projectTitle}>
            <WaveDivider
              waveImg={waveBetween(previousBg, project.slideBgColor)}
              dividerHeight={'200px'}
            />
            <ProjectDesktopSlide {...project} />
          </React.Fragment>
        );
      })}
    </Styled.Container>
  );
};

export default HighlightedProjects;
