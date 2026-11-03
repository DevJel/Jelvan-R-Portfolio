import styled, { css } from 'styled-components';
import {
  slideBottom,
  slideOutKeyframes,
} from '../../design-system/reusableCss';

interface Props {
  isHovering: boolean;
}

export const Container = styled.figure<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;

  :hover,
  :focus-within {
    .icon-img {
      filter: brightness(130%);
    }
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: 2rem;
    margin: 0 5px;
    img {
      height: 3rem;
      width: auto;
    }
  }
`;

export const IconLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  outline-offset: 4px;

  &:focus-visible {
    outline: 2px solid #f48120;
  }
`;

export const SkillText = styled.figcaption`
  text-align: center;
`;

export const ReferenceTextLink = styled.a`
  color: inherit;
  text-decoration: none;
  outline-offset: 3px;

  &:hover,
  &:focus-visible {
    color: #f48120;
    text-decoration: underline;
  }
`;

const isHoveredStyles = css`
  visibility: visible;
  opacity: 1;
`;

const isNotHoveredStyles = css`
  visibility: hidden;
  transition: visibility 0.5s,
    opacity 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  opacity: 0;
`;

const slideOutAnimation = css`
  animation: ${slideOutKeyframes} 0.5s ease-in both;
`;

export const IconText = styled.p<Props>`
  ({ isHovering }) => (isHovering ? isHoveredStyles : isNotHoveredStyles);
  font-size: 0.85rem;
  line-height: 1.35;
  animation: ${slideBottom} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  color: inherit;
  text-decoration: none;

  ({ isHovering }) => isHovering === false && slideOutAnimation;

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 0.7rem;
  }
`;
