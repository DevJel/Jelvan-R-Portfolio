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
  height: auto;
  min-height: ${({ slideHeight }) => slideHeight || '100vh'};
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
  width: 54%;
  min-width: 0;
  padding: 5.5rem 1.25rem 3rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slidInCenter} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  @media ${({ theme }) => theme.media.tablet} {
    width: 100%;
    padding: 1.25rem 1rem .5rem;
    min-height: 0;
  }
  @media ${({ theme }) => theme.media.phone} {
    padding: .75rem .65rem .25rem;
  }
`;
export const ImageWrapper = styled.div`
  width: 100%;
  max-width: 820px;
  aspect-ratio: 8 / 5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  filter: drop-shadow(0 22px 34px rgba(20, 24, 32, .16));
  transition: filter .25s ease, transform .25s ease;

  img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    object-fit: contain;
  }
  &.device-preview {
    aspect-ratio: 8 / 5;
    overflow: visible;
    filter: none;
    perspective: 1200px;
  }

  .device-preview-stage {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    isolation: isolate;
  }

  .device-preview-laptop {
    position: relative;
    z-index: 1;
    width: 100%;
    transform: translate3d(0, 0, 0) rotateY(-5deg) rotateX(1deg);
    transform-origin: center;
    filter: drop-shadow(0 20px 24px rgba(16, 24, 40, .18));
    transition: transform .55s cubic-bezier(.2,.8,.2,1), filter .55s ease;
  }

  .device-preview-phone {
    position: absolute;
    z-index: 2;
    right: 1%;
    bottom: -7%;
    width: clamp(90px, 17%, 175px);
    transform: translate3d(0, 0, 0) rotate(5deg);
    transform-origin: bottom center;
    filter: drop-shadow(0 18px 22px rgba(16, 24, 40, .24));
    transition: transform .55s cubic-bezier(.2,.8,.2,1), filter .55s ease;
  }

  &.device-preview:hover .device-preview-laptop {
    transform: translate3d(-1%, -2%, 0) rotateY(0deg) rotateX(0deg) scale(1.025);
    filter: drop-shadow(0 28px 30px rgba(16, 24, 40, .22));
  }

  &.device-preview:hover .device-preview-phone {
    transform: translate3d(-12%, -8%, 0) rotate(-2deg) scale(1.08);
    filter: drop-shadow(0 24px 26px rgba(16, 24, 40, .3));
  }

  @media (max-width: 700px) {
    &.device-preview { aspect-ratio: 4 / 3; }
    .device-preview-stage { min-height: 220px; }
    .device-preview-phone { width: clamp(78px, 23%, 125px); right: 0; bottom: -4%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .device-preview-laptop, .device-preview-phone { transition: none; }
  }


  :hover {
    transform: translateY(-3px);
    filter: drop-shadow(0 28px 38px rgba(20, 24, 32, .2));
  }
`;

export const Figure = styled.figure`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 850px;
  align-items: center;
  gap: .5rem;
  margin: 0;
`;
export const SlideNumber = styled.div`
  z-index: ${({ theme }) => theme.zIndex.lowPriority};
  position: absolute;
  top: -3.25rem;
  left: 0;
  right: auto;
  animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 250ms;

  img {
    display: block;
    width: 72px;
    height: 59px;
    object-fit: contain;
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
  width: 46%;
  min-width: 0;
  padding: 1.5rem 2.5rem 1.5rem 1rem;
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

export const DetailGrid = styled.div`
  display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; margin:.5rem 0 1rem;
  @media ${({theme})=>theme.media.phone}{grid-template-columns:1fr;}
`;
export const DetailPanel = styled.section`
  min-width:0; padding:.85rem 1rem; border:1px solid rgba(244,129,32,.2); border-radius:14px;
  background:rgba(255,255,255,.82); box-shadow:0 8px 24px rgba(24,24,32,.045);
  h4{margin:0 0 .45rem;color:#b95e13;font-size:.95rem;font-weight:750;}
  p,li{color:#35343a;font-size:.88rem;line-height:1.5;} p{margin:0;}
  ul{margin:0;padding-left:1.1rem;} li+li{margin-top:.2rem;}
  div{display:flex;flex-wrap:wrap;gap:.35rem;}
  span{display:inline-flex;padding:.25rem .55rem;border-radius:999px;background:#fff0e3;color:#713b13;font-size:.78rem;font-weight:650;}
`;

export const ProjectDeveloper = styled.p`
  margin: .35rem 0 .6rem;
  color: #7a4a2a;
  font-size: .82rem;
  font-weight: 650;
  letter-spacing: .025em;
  text-align: center;
`;
