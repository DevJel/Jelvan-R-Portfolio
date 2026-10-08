import React from 'react';
import * as Styled from './Resume.styles';
import TextList from '../TextList/TextList';

import {
  aiAutomationSkills,
  certifications,
  digitalStrategySkills,
  education,
  keyHighlights,
  professionalExperience,
  strategicHrSkills,
} from './Resume.config';
import {
  FiDownload,
  FiGlobe,
  FiMail,
  FiPhoneOutgoing,
} from 'react-icons/fi';
import { SiLinkedin } from 'react-icons/si';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import ProfessionalExperience from '../ProfessionalExperience/ProfessionalExperience';
import Navbar from '../Navbar/Navbar';

const PHONE_DISPLAY = '+60 11-2561 1502';
const EMAIL = 'hello@work.jelvan.pro';
const CV_PDF = '/assets/jelvan-ricolcol-resume.pdf';

/**
 *Renders resume component
 *@function Resume
 *@returns {JSX.Element} - Rendered CardContent component
 */
const Resume = (): JSX.Element => {
  return (
    <Styled.Container>
      <Navbar isLogoExpanded={true} />
      <Styled.ResumeWrapper>
        <Styled.LeftColumn>
          <Styled.ContactInfo>
            <Styled.ContactLink as="span">
              <FiGlobe />
              portfolio.jelvan.pro
            </Styled.ContactLink>

            <Styled.ContactLink as="span">
              <FiMail />
              {EMAIL}
            </Styled.ContactLink>

            <Styled.ContactLink as="span">
              <FiPhoneOutgoing />
              {PHONE_DISPLAY}
            </Styled.ContactLink>
            <p>Philippines / Malaysia</p>
          </Styled.ContactInfo>

          <TextList
            variant={'withHeader'}
            textBulletPoints={strategicHrSkills}
            headerText={'Strategic HR'}
          />

          <TextList
            variant={'withHeader'}
            textBulletPoints={digitalStrategySkills}
            headerText={'Digital Strategy & Branding Systems'}
          />

          <TextList
            variant={'withHeader'}
            textBulletPoints={aiAutomationSkills}
            headerText={'AI & Automation'}
          />
        </Styled.LeftColumn>

        <Styled.RightColumn>
          {/*HEADER WITH NAME*/}
          <Styled.SummaryHeader>
            <Styled.Name>
              Jelvan<span>®</span> Ricolcol
            </Styled.Name>
            <Styled.Title>
              Strategic HR Professional | Full Stack Software Developer |
              Certified AI & Digital Transformation Practitioner
            </Styled.Title>

            {/*SOCIAL MEDIA LINKS*/}
            <Styled.SocialLinksWrapper>
              <Styled.SocialMediaLink as="span">
                <SiLinkedin className={'social-media-icon'} />
                linkedin.com/in/jelvanricolcol
              </Styled.SocialMediaLink>
              <Styled.SocialMediaLink as="span">
                <FiGlobe className={'social-media-icon'} />
                portfolio.jelvan.pro
              </Styled.SocialMediaLink>
              <Styled.SocialMediaLink as="span">
                <FiMail className={'social-media-icon'} />
                {EMAIL}
              </Styled.SocialMediaLink>
              <Styled.SocialMediaLink as="span">
                <FiPhoneOutgoing className={'social-media-icon'} />
                {PHONE_DISPLAY}
              </Styled.SocialMediaLink>

              <Styled.SocialMediaLink
                href={CV_PDF}
                download="Jelvan-Ricolcol-Resume.pdf"
              >
                <FiDownload className={'social-media-icon'} />
                Download CV
              </Styled.SocialMediaLink>
            </Styled.SocialLinksWrapper>

            <Styled.HR />
            {/*SUMMARY*/}
            <Styled.Summary>
              <Styled.ResumeHeader>Profile Summary</Styled.ResumeHeader>
              <PortfolioParagraph
                margin={'0'}
                paragraphText={`A results-driven HR Generalist and Digital Transformation Specialist with a dual Master's background, dedicated to empowering organizations through strategic Human Resources Management, AI-driven Business Systems, and Modern Digital Operations. Proven ability to support over 30,000 employees internationally and deliver a 100% compliance rate across HR operations, in help and coordination with leaders and offshore teams globally. Expertise in bridging the gap between people strategy and technology implementation to enhance efficiency and organizational scaling.`}
                withDarkColor={true}
                variant={'medium'}
                withAnimatedPresence={false}
              />
            </Styled.Summary>
          </Styled.SummaryHeader>

          {/*KEY HIGHLIGHTS*/}
          <Styled.ResumeHeader>Key Highlights</Styled.ResumeHeader>
          <Styled.Projects>
            {keyHighlights.map((highlight) => (
              <p key={highlight.label}>
                <strong>{highlight.value}</strong> {highlight.label}
              </p>
            ))}
          </Styled.Projects>

          {/*EXPERIENCE*/}

          <Styled.ResumeHeader>Professional Experience</Styled.ResumeHeader>
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              'HR operations, digital advertising, web development and customer experience roles across Malaysia, the Philippines, the USA and remote global teams.'
            }
            withDarkColor={true}
            variant={'medium'}
            withAnimatedPresence={false}
          />

          {professionalExperience.map((experience, id) => (
            <ProfessionalExperience key={id} {...experience} />
          ))}

          {/* EDUCATION */}
          <Styled.ResumeHeader>
            Education & Professional Development
          </Styled.ResumeHeader>

          {education.map((item) => (
            <Styled.EducationDetails key={item.school}>
              <h4>
                {item.degree}
                <span>{item.timeFrame}</span>
              </h4>
              <Styled.University>{item.school}</Styled.University>
              <PortfolioParagraph
                margin={'0 0 1rem 0'}
                paragraphText={item.description}
                withDarkColor={true}
                variant={'medium'}
                withAnimatedPresence={false}
              />
            </Styled.EducationDetails>
          ))}

          {/* CERTIFICATIONS */}
          <Styled.ResumeHeader>Professional Certifications</Styled.ResumeHeader>
          <Styled.Projects>
            {certifications.map((certification) => (
              <p key={certification.title}>
                <strong>{certification.title}:</strong> {certification.issuer}
              </p>
            ))}
          </Styled.Projects>

          <Styled.HR />
          <Styled.Projects>
            <p>
              For strategic client advisory cases, continuous workspace
              operations and professional portfolios, or any verification
              documentation needed, email me at <strong>{EMAIL}</strong>
            </p>
          </Styled.Projects>
        </Styled.RightColumn>
      </Styled.ResumeWrapper>
    </Styled.Container>
  );
};

export default Resume;
