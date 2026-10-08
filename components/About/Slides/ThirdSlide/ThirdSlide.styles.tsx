import styled from 'styled-components';
import {
  rollInLeft,
  rollInRight,
  slideTop,
} from '../../../../design-system/reusableCss';

export const ThirdSlide = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;

  .skills-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .glass-wrapper {
    display: flex;
    gap: 4rem;
    margin-top: 2rem;
  }

  .glass-content {
    z-index: 5;
    display: flex;
    flex-direction: column;
    min-width: 40%;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 15px 35px rgba(244, 129, 32, 0.12);
    background-color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(244, 129, 32, 0.22);
    backdrop-filter: blur(10px);
    animation: ${slideTop} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

    .icon-skills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 1rem 0;
    }

    .tech-skills {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  :after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 55%;
    width: 700px;
    height: 700px;
    background: #fff7f0;
    background: linear-gradient(40deg, #ffffff 33%, #ffe0bb 69%);
    border-radius: 50%;
    animation: ${rollInLeft} 2s cubic-bezier(0.23, 1, 0.32, 1) both;
  }

  :before {
    content: '';
    position: absolute;
    top: 10px;
    left: 55%;
    width: 700px;
    height: 700px;
    background: #f48120;
    background: linear-gradient(40deg, #f48120 22%, #ffaf5f 70%, #fff7f0 89%);
    border-radius: 50%;
    animation: ${rollInRight} 2s cubic-bezier(0.23, 1, 0.32, 1) both;
  }

  @media ${({ theme }) => theme.media.tablet} {
    .skills-wrapper {
      h1 {
        font-size: 2.5rem;
      }
    }

    .glass-wrapper {
      gap: 1rem;
      flex-direction: column;
      margin-top: 1rem;
      width: 100%;
    }

    .glass-content {
      width: 95%;
      margin: 0 auto;
      padding: 1rem;

      h1 {
        font-size: 1.5rem;
        margin: 0;
      }

      p {
        margin: 0;
      }

      .icon-skills {
        margin: 0;
      }

      .tech-skills {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }
  }
`;
