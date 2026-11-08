import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './ProjectDesktopSlide.styles';
import { IHighlightedProject } from '../../types/portfolio';
import Image from 'next/legacy/image';
import SectionHeader from '../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const projectRoutes: Array<{ match: string; slug: string }> = [
  { match: 'master ai', slug: 'master-ai-multi-agent-workspace' },
  { match: 'proctorava', slug: 'proctorava-learning-management-system' },
  { match: 'knowledge center', slug: 'knowledge-center-system' },
  { match: 'internal email', slug: 'internal-email-system' },
  { match: 'hr information', slug: 'hr-information-system' },
  { match: 'bolekpad', slug: 'bolekpad-personal-workspace' },
  { match: 'printing', slug: 'online-printing-store' },
  { match: 'devai', slug: 'developers-playground-devai' },
];

const getProjectRoute = (title: string): string => {
  const normalized = title.toLowerCase();
  const project = projectRoutes.find(({ match }) => normalized.includes(match));
  return '/projects/' + (project?.slug ?? normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
};

const ProjectDesktopSlide = ({
  slideNumberImg, projectDescription, projectPurpose, projectAdvantages, projectFeatures,
  projectImg, projectArt, projectMobileImg, projectMobilePreview, projectTechnologies, projectTitle, projectDeveloper,
  slideBgColor, technologyIcons, slideHeight,
}: IHighlightedProject): JSX.Element | null => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isElementVisible] = useIntersectionObserver(containerRef, { threshold: 0.2 });
  const [isOnScreen, setIsOnScreen] = useState(false);
  useEffect(() => { if (isElementVisible && !isOnScreen) setIsOnScreen(true); }, [isElementVisible, isOnScreen]);

  return <Styled.Container slideHeight={slideHeight} slideBgColor={slideBgColor} ref={containerRef}>
    {isOnScreen && <>
      <Styled.LeftColumn><Styled.Figure>
        <Styled.SlideNumber>{slideNumberImg && <Image src={slideNumberImg} height={59} width={72} quality={90} objectFit="contain" alt={`Project ${projectTitle}`} />}</Styled.SlideNumber>
        <Styled.ImageWrapper className={projectMobilePreview ? 'device-preview' : undefined}>{projectMobilePreview ? <div className="device-preview-stage"><div className="device-preview-laptop"><Image src={projectImg} height={900} width={1440} quality={95} objectFit="contain" layout="responsive" alt={`${projectTitle} desktop application preview`} /></div><div className="device-preview-phone"><Image src={projectMobileImg} height={900} width={520} quality={95} objectFit="contain" layout="responsive" alt={`${projectTitle} mobile application preview`} /></div></div> : projectArt ?? <Image src={projectImg} height={900} width={1440} quality={95} objectFit="contain" layout="responsive" alt={`${projectTitle} application dashboard preview`} />}</Styled.ImageWrapper>
      </Styled.Figure></Styled.LeftColumn>
      <Styled.RightColumn>
        <SectionHeader variant="small" headerText={projectTitle} margin="0" color="#f48120" withGradient />\n        {projectDeveloper && <Styled.ProjectDeveloper>Developed by {projectDeveloper}</Styled.ProjectDeveloper> }
        <Styled.IconWrapper>{technologyIcons.map((icon,id)=><Styled.Icon key={id}>{icon}</Styled.Icon>)}</Styled.IconWrapper>
        <PortfolioParagraph margin="1.25rem 0" paragraphText={projectDescription} withDarkColor={false} variant="large" withAnimatedPresence />
        <Styled.DetailGrid>
          <Styled.DetailPanel><h4>Purpose</h4><p>{projectPurpose}</p></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Key features</h4><ul>{projectFeatures.map(x=><li key={x}>{x}</li>)}</ul></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Advantages</h4><ul>{projectAdvantages.map(x=><li key={x}>{x}</li>)}</ul></Styled.DetailPanel>
          <Styled.DetailPanel><h4>Technology stack</h4><div>{projectTechnologies.map(x=><span key={x}>{x}</span>)}</div></Styled.DetailPanel>
        </Styled.DetailGrid>
        <Styled.ButtonsWrapper>
          <Styled.SampleLink href={getProjectRoute(projectTitle)} aria-label={`Explore ${projectTitle} project dashboard, repository and deployment guide`}>
            Explore Project &amp; Deployment
          </Styled.SampleLink>
        </Styled.ButtonsWrapper>
      </Styled.RightColumn>
    </>}
  </Styled.Container>;
};
export default ProjectDesktopSlide;
