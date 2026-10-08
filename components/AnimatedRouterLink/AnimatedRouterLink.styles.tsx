import styled, { css } from 'styled-components';
import { Props } from './AnimatedRouterLink';
import { trackingInExpand } from '../../design-system/reusableCss';

type LinkProps = Pick<Props, 'variant' | 'animationTimeout'>;

const standardStyles = css`
  color: ${({ theme }) => theme.portfolio.text.dark};
`;
const highlightStyles = css`
  color: #f48120;

  :hover {
    background-image: linear-gradient(
      45deg,
      #d96514 0%,
      #f48120 52%,
      #faad3f 92%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const A = styled.a<LinkProps>`
  display: flex;
  white-space: nowrap;
  font-size: 8rem;
  line-height: 9rem;
  letter-spacing: -5px;
  font-weight: 700;

  transition: all 0.7s cubic-bezier(0.2, 0.6, 0.2, 1);

  :hover {
    transform: translateX(50px);
    letter-spacing: -2px;
    background-image: linear-gradient(
      45deg,
      #d96514 0%,
      #f48120 52%,
      #faad3f 90%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ${({ variant }) =>
    variant === 'highlight' ? highlightStyles : standardStyles};

  animation: ${trackingInExpand} 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) both;

  animation-delay: ${({ animationTimeout }) => `${animationTimeout}ms`};

  @media ${({ theme }) => theme.media.phone} {
    font-size: 5rem;
    line-height: 6.5rem;
  }
`;
