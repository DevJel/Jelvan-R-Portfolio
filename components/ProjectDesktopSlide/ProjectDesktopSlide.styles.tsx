import styled from 'styled-components';
import { IHighlightedProject } from '../../types/portfolio';

type ContainerProps = Pick<IHighlightedProject, 'slideBgColor' | 'slideHeight'>;

export const Container = styled.section<ContainerProps>`
  display: flex;
  width: 100%;
  min-height: min(100vh, 980px);
  min-height: max(680px, min(100vh, 980px));
  padding: clamp(4rem, 8vh, 6.5rem) clamp(1rem, 5vw, 4rem);
  align-items: center;
  justify-content: center;
  background-color: ${({ slideBgColor }) => slideBgColor};
  position: relative;
  scroll-snap-align: center;

  @media (max-width: 700px) {
    min-height: auto;
    padding: 5rem .85rem 3.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

export const CoverCard = styled.div`
  width: min(100%, 1120px);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(1rem, 2.4vw, 1.8rem);
  animation: cover-enter .55s cubic-bezier(.2,.75,.25,1) both;

  @keyframes cover-enter {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  isolation: isolate;
  border-radius: clamp(14px, 2vw, 26px);
  background: #ece9e5;
  box-shadow: 0 24px 70px rgba(20, 24, 32, .16), 0 3px 12px rgba(20, 24, 32, .08);
  transition: transform .35s ease, box-shadow .35s ease;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 82px rgba(20, 24, 32, .2), 0 5px 16px rgba(20, 24, 32, .1);
  }

  @media (max-width: 700px) {
    aspect-ratio: 4 / 3;
    border-radius: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;

export const CoverFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 clamp(.15rem, 1vw, .75rem);

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ProjectTitle = styled.h2`
  margin: 0;
  color: #242328;
  font-size: clamp(1.25rem, 2.4vw, 2rem);
  line-height: 1.15;
  font-weight: 780;
  letter-spacing: -.035em;
  text-wrap: balance;

  @media (max-width: 560px) {
    font-size: clamp(1.2rem, 5vw, 1.55rem);
  }
`;

export const SampleLink = styled.a`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-height: 2.65rem;
  padding: .65rem 1.15rem;
  border: 1px solid #f48120;
  border-radius: 999px;
  background: #f48120;
  color: #17181d;
  font-size: .92rem;
  font-weight: 750;
  letter-spacing: .015em;
  text-decoration: none;
  transition: background .2s ease, box-shadow .2s ease, transform .2s ease;

  &:hover {
    background: #df6f14;
    box-shadow: 0 8px 22px rgba(244, 129, 32, .24);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(244, 129, 32, .35);
    outline-offset: 3px;
  }
`;
