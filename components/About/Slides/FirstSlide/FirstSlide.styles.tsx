import styled from 'styled-components';

export const FirstSlide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  height: 100vh;

  /* Long headline must fit the phone width (no sideways scroll) */
  @media ${({ theme }) => theme.media.tablet} {
    padding: 2rem 1.25rem;

    h1 {
      font-size: clamp(1.75rem, 8.5vw, 3rem);
      line-height: 1.15;
      letter-spacing: -1px;
      text-align: center;
      overflow-wrap: anywhere;
    }
  }
`;

export const Message = styled.div`
  padding: 0 10rem;
`;
