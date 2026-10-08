import styled from 'styled-components';

export const Container = styled.section`
  min-height: 100vh;
  background-color: #ffffff;
  color: ${({ theme }) => theme.portfolio.resumeColors.darkText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: initial;
  padding: 5rem 1rem;

  @media ${({ theme }) => theme.media.tablet} {
    display: block;
    padding: 6rem 0.75rem 2rem;
  }
`;

export const ResumeWrapper = styled.div`
  background-color: ${({ theme }) => theme.portfolio.resumeColors.bgColor};
  padding: 2rem;
  max-width: 90%;
  display: flex;
  gap: 1rem;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: column;
    gap: 0;
    max-width: 100%;
    padding: 1.5rem 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }
`;

/**
 * LEFT COLUMN
 */

export const LeftColumn = styled.aside`
  width: 25%;
  padding: 3rem 0;

  h3 {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  }

  @media ${({ theme }) => theme.media.tablet} {
    order: 2;
    width: 100%;
    padding: 0;
    margin-top: 1.5rem;

    ul {
      margin: 0 0 1rem;
      gap: 0.5rem;
    }

    /* Skill group titles match the full-width section titles */
    ul h3 {
      margin: 1rem -1.25rem 0.5rem;
      padding: 0 1.25rem 0.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 1.25rem;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 1.3;
    }
  }
`;

export const ContactInfo = styled.address`
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media ${({ theme }) => theme.media.tablet} {
    p {
      margin: 0 -1.25rem;
      padding: 0 1.25rem 0.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-weight: 600;
    }
  }
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};

  @media ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

/**
 * RIGHT COLUMN
 */

export const RightColumn = styled.section`
  width: 75%;

  @media ${({ theme }) => theme.media.tablet} {
    order: 1;
    width: 100%;
  }
`;
export const SummaryHeader = styled.header``;

export const Name = styled.h1`
  font-size: 3.5rem;
  letter-spacing: -3px;

  .reg {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 2.5rem;
    line-height: 1.4;
  }
`;
export const NameSparkles = styled.span`
  @media (min-width: 769px) {
    > span {
      display: inline;
    }
    div {
      display: none;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  letter-spacing: -1px;
  line-height: 1;

  @media ${({ theme }) => theme.media.tablet} {
    font-size: 1.35rem;
    letter-spacing: -0.5px;
    line-height: 1.3;
  }
`;

export const Summary = styled.div`
  margin: 1rem 0;
`;

export const SocialLinksWrapper = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;

  @media ${({ theme }) => theme.media.tablet} {
    gap: 0.25rem;
    flex-direction: column;
  }
`;
export const SocialMediaLink = styled.a<{ $hideOnMobile?: boolean }>`
  display: flex;
  align-items: center;
  cursor: default;
  color: #000;

  .social-media-icon {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
    margin-right: 0.25rem;
    font-size: 1.25rem;
  }

  @media ${({ theme }) => theme.media.tablet} {
    ${({ $hideOnMobile }) => ($hideOnMobile ? 'display: none;' : '')}
  }
`;

export const ResumeHeader = styled.h3`
  font-size: 1.25rem;
  text-transform: uppercase;
  margin: 1rem 0;
  color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};

  @media ${({ theme }) => theme.media.tablet} {
    margin: 1.5rem -1.25rem 0.75rem;
    padding: 0 1.25rem 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    line-height: 1.3;
  }
`;

export const EducationDetails = styled.div`
  h4 {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};

    @media ${({ theme }) => theme.media.tablet} {
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  span {
    color: ${({ theme }) => theme.portfolio.resumeColors.lightText};
    font-weight: bold;
  }
`;

export const Projects = styled.div`
  p {
    margin-bottom: 0.75rem;
  }

  strong {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  }

  a {
    color: ${({ theme }) => theme.portfolio.resumeColors.accentColor};
    font-weight: bold;
  }
`;

export const University = styled.p`
  color: ${({ theme }) => theme.gray.dark};
  margin-bottom: 1rem;
`;

export const HR = styled.hr`
  border-top: 3px solid
    ${({ theme }) => theme.portfolio.resumeColors.accentColor};
  border-bottom: 0;
  margin: 1rem 0;
`;
