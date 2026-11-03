import styled from 'styled-components';
import { IHighlightedProject } from '../../types/portfolio';
import {
  slidInCenter,
  slideTop,
  trackingInExpand,
} from '../../design-system/reusableCss';

type ContainerProps = Pick<IHighlightedProject, 'slideBgColor' | 'slideHeight'>;

export const Container = styled.section<ContainerProps>`
  display: flex;
  height: ${({ slideHeight }) => slideHeight || '100%'};
  background-color: ${({ slideBgColor }) => slideBgColor};
  position: relative;
  scroll-snap-align: center;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

/**
 * LEFT COLUMN
 */
export const LeftColumn = styled.div`
  width: 50%;
  padding: 6rem 0 3rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slidInCenter} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    padding: 1rem;
    height: auto;
    min-height: 32vh;
    align-items: flex-end;
  }
  @media ${({ theme }) => theme.media.phone} {
    min-height: 28vh;
    align-items: flex-end;
    justify-content: flex-end;
  }
`;
export const ImageWrapper = styled.div`
  transform: perspective(1500px) rotateY(20deg);
  transition: transform 1s ease 0s;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: perspective(3000px) rotateY(5deg);
  }

  @media ${({ theme }) => theme.media.tablet} {
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

export const Figure = styled.figure`
  position: relative;
  display: flex;
  height: 100%;
  gap: 1rem;
`;
export const SlideNumber = styled.div`
  z-index: ${({ theme }) => theme.zIndex.lowPriority};
  position: absolute;
  top: 5%;
  right: 0;
  animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 250ms;

  @media ${({ theme }) => theme.media.phone} {
    img {
      width: 150px;
      height: auto;
    }
  }
`;

export const Figcaption = styled.figcaption`
  gap: 1rem;
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 1rem;
    writing-mode: vertical-lr;
    color: ${({ theme }) => theme.portfolio.primaryColor.light};
    animation: ${trackingInExpand} 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  @media ${({ theme }) => theme.media.phone} {
    h3 {
      font-size: 0.55rem;
    }
  }
`;

/**
 * RIGHT COLUMN
 */
export const RightColumn = styled.div`
  width: 50%;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    line-height: 1;
    margin-bottom: 1rem;
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    height: auto;
    padding: 1rem;
    justify-content: flex-start;
    h1 {
      font-size: 2rem;
    }

    p {
      margin: 1rem 0;
    }
  }
  @media ${({ theme }) => theme.media.phone} {
  }
`;

export const IconWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;
export const Icon = styled.li`
  .tech-icon {
    font-size: 2rem;
    color: ${({ theme }) => theme.portfolio.primaryColor.light};
  }

  @media ${({ theme }) => theme.media.phone} {
    .tech-icon {
      font-size: 1.5rem;
    }
  }
`;

export const SampleLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.65rem 1rem;
  text-align: center;
  overflow-wrap: anywhere;
  border-radius: 999px;
  border: 1px solid #f48120;
  background: #f48120;
  color: #17181d;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  :hover {
    background: #df6f14;
    box-shadow: 0 8px 22px rgba(244, 129, 32, 0.24);
    transform: translateY(-2px);
  }

  :focus-visible {
    outline: 3px solid rgba(244, 129, 32, 0.35);
    outline-offset: 3px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  a {
    flex: 1 1 160px;
    max-width: 300px;
    animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation-delay: 250ms;
  }
`;

export const ProjectLinkNote = styled.p`
  text-align: center;
  font-size: 0.9rem;
  margin: 0.75rem 0 0;
`;
