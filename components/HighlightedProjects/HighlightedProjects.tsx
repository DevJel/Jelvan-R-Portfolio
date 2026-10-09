import React from 'react';
import * as Styled from './HighlightedProjects.styles';
import { useHighlightedProjectsData } from './HighlightedProjects.config';
import Navbar from '../Navbar/Navbar';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import Image from 'next/legacy/image';
import ScrollHint from '../ScrollHint/ScrollHint';
import ProjectDesktopSlide from '../ProjectDesktopSlide/ProjectDesktopSlide';
import ProjectDetailsSlide from '../ProjectDetailsSlide/ProjectDetailsSlide';
import WaveDivider from '../WaveDivider/WaveDivider';
import {
  opticsProjectDetailQuotes,
  projectDetailsQuotes,
} from '../ProjectDetailsSlide/ProjectDetailsSlide.config';

const WHITE = '#ffffff';

/** Picks the wave image that blends the background above into the one below */
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

/**
 *Renders sections with some of my projects
 *@function HighlightedProjects
 *@returns {JSX.Element} - Rendered HighlightedProjects component
 */
const HighlightedProjects = ({ withNavbar = true }: Props): JSX.Element => {
  const { highlightedProjects } = useHighlightedProjectsData();
  // The last two projects keep their extra detail slides
  const featuredProjects = highlightedProjects.slice(0, -2);
  const [projectThree, projectFour] = highlightedProjects.slice(-2);

  return (
    <Styled.Container>
      {/* NAVIGATION */}
      {withNavbar && <Navbar isLogoExpanded={true} />}
      {/* HERO */}
      <Styled.ProjectsHero>
        <Styled.HeroLeftColumn>
          <SectionHeader
            variant={'medium'}
            headerText={`Selected list of projects`}
            margin={'0'}
            color={'#f48120'}
          />

          <PortfolioParagraph
            margin={'1rem 0'}
            paragraphText={`Due to NDA agreements, I am limited to personal projects and already shipped products that I've build and worked on in the past`}
            withDarkColor={false}
            variant={'large'}
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
                alt={'Laptop showing the Jelvan LMS dashboard'}
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
                alt={'Phone showing a project'}
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
                alt={'Smartwatch showing a project'}
                priority
                className={'watch'}
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
        </Styled.HeroRightColumn>

        <ScrollHint />
      </Styled.ProjectsHero>

      {/* PROJECTS - a wave between every slide, matched to the colours either side */}
      {featuredProjects.map((project, index) => {
        const previousBg =
          index === 0 ? '#ffffff' : featuredProjects[index - 1].slideBgColor;
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

      {/* SNEAKER MANIACS */}
      <WaveDivider
        waveImg={waveBetween(
          featuredProjects[featuredProjects.length - 1].slideBgColor,
          projectThree.slideBgColor
        )}
        dividerHeight={'200px'}
      />
      <ProjectDesktopSlide {...projectThree} />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-band-white.svg'}
        dividerHeight={'200px'}
      />

      <ProjectDetailsSlide
        slideHeight={'100vh'}
        slideBgColor={'#ffffff'}
        projectName={projectThree.projectTitle}
        projectMobileImg={projectThree.projectMobileImg}
        projectQuotes={projectDetailsQuotes}
      />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-1.svg'}
        dividerHeight={'150px'}
      />
      {/* Project Three */}
      <ProjectDesktopSlide {...projectFour} />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-band-cream.svg'}
        dividerHeight={'200px'}
      />
      <ProjectDetailsSlide
        slideHeight={'100vh'}
        slideBgColor={'#fff7f0'}
        projectName={projectFour.projectTitle}
        projectMobileImg={projectFour.projectMobileImg}
        projectQuotes={opticsProjectDetailQuotes}
      />
    </Styled.Container>
  );
};

export default HighlightedProjects;
