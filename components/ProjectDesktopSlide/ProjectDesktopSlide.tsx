import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './ProjectDesktopSlide.styles';
import { IHighlightedProject } from '../../types/portfolio';
import Image from 'next/legacy/image';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const ProjectDesktopSlide = ({
  slideNumberImg, projectDescription, projectPurpose, projectAdvantages, projectFeatures,
  projectImg, projectArt, projectLinks, projectLinkNote, projectTechnologies, projectTitle,
  slideBgColor, technologyIcons, slideHeight,
}: IHighlightedProject): JSX.Element | null => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isElementVisible] = useIntersectionObserver(containerRef, { threshold: 0.2 });
  const [isOnScreen, setIsOnScreen] = useState(false);
  useEffect(() => { if (isElementVisible && !isOnScreen) setIsOnScreen(true); }, [isElementVisible, isOnScreen]);

  return <Styled.Container slideHeight={slideHeight} slideBgColor={slideBgColor} ref={containerRef}>
    {isOnScreen && <>
      <Styled.LeftColumn><Styled.Figure>
        <Styled.SlideNumber>{slideNumberImg && <Image src={slideNumberImg} height={200} width={200} quality={90} objectFit="contain" alt="Project number" />}</Styled.SlideNumber>
        <Styled.Figcaption><h3>{projectTechnologies.join(' · ')}</h3></Styled.Figcaption>
        <Styled.ImageWrapper>{projectArt ?? <Image src={projectImg} height={800} width={800} quality={92} objectFit="contain" alt={projectTitle} />}</Styled.ImageWrapper>
      </Styled.Figure></Styled.LeftColumn>
      <Styled.RightColumn>
        <SectionHeader variant="small" headerText={projectTitle} margin="0" color="#f48120" withGradient />
        <Styled.IconWrapper>{technologyIcons.map((icon,id)=><Styled.Icon key={id}>{icon}</Styled.Icon>)}</Styled.IconWrapper>
        <PortfolioParagraph margin="1.25rem 0" paragraphText={projectDescription} withDarkColor={false} variant="large" withAnimatedPresence />
        <Styled.DetailGrid>
          <Styled.DetailPanel><h4>Purpose</h4><p>{projectPurpose}</p></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Key features</h4><ul>{projectFeatures.map(x=><li key={x}>{x}</li>)}</ul></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Advantages</h4><ul>{projectAdvantages.map(x=><li key={x}>{x}</li>)}</ul></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Technology stack</h4><div>{projectTechnologies.map(x=><span key={x}>{x}</span>)}</div></Styled.DetailPanel>
        </Styled.DetailGrid>
        {projectLinks && <Styled.ButtonsWrapper>{projectLinks.map(({label,url})=><Styled.SampleLink key={url} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} for ${projectTitle} (opens in a new tab)`}>{label}</Styled.SampleLink>)}</Styled.ButtonsWrapper>}
        {projectLinkNote && <Styled.ProjectLinkNote>{projectLinkNote}</Styled.ProjectLinkNote>}
      </Styled.RightColumn>
    </>}
  </Styled.Container>;
};
export default ProjectDesktopSlide;
