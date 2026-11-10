import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './ProjectDesktopSlide.styles';
import { IHighlightedProject } from '../../types/portfolio';
import Image from 'next/legacy/image';
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

/**
 * A visual-first project cover. Each project uses its own supplied artwork,
 * with the project title and a single route action beneath it. Descriptive
 * project details remain available on the dedicated project guide page.
 */
const ProjectDesktopSlide = ({
  projectImg, projectArt, projectTitle, slideBgColor, slideHeight,
}: IHighlightedProject): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isElementVisible] = useIntersectionObserver(containerRef, { threshold: 0.12 });
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    if (isElementVisible && !isOnScreen) setIsOnScreen(true);
  }, [isElementVisible, isOnScreen]);

  return (
    <Styled.Container
      slideHeight={slideHeight}
      slideBgColor={slideBgColor}
      ref={containerRef}
      aria-label={projectTitle}
    >
      {isOnScreen && (
        <Styled.CoverCard>
          <Styled.ImageWrapper>
            {projectArt ?? (
              <Image
                src={projectImg}
                alt={`${projectTitle} application cover`}
                layout="fill"
                objectFit="cover"
                quality={95}
                sizes="(max-width: 700px) 94vw, 82vw"
              />
            )}
          </Styled.ImageWrapper>
          <Styled.CoverFooter>
            <Styled.ProjectTitle>{projectTitle}</Styled.ProjectTitle>
            <Styled.SampleLink
              href={getProjectRoute(projectTitle)}
              aria-label={`Open ${projectTitle} project guide`}
            >
              View Project
            </Styled.SampleLink>
          </Styled.CoverFooter>
        </Styled.CoverCard>
      )}
    </Styled.Container>
  );
};

export default ProjectDesktopSlide;
