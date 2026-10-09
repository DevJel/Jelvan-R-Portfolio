import React from 'react';
import GlassSkillsSlide from '../GlassSkillsSlide/GlassSkillsSlide';
import { emailBrandingCards } from '../../About.content';

/**
 *Renders the Email Branding & Authentication slide in About Portfolio presentation
 *@function EmailBrandingSlide
 *@returns {JSX.Element} - Rendered EmailBrandingSlide component
 */
const EmailBrandingSlide = (): JSX.Element => (
  <GlassSkillsSlide
    anchorID={'email-branding-slide'}
    bgColor={'#fff7f0'}
    headerText={'Email Branding'}
    paragraphText={
      'Making sure your emails are trusted, delivered and recognized at a glance'
    }
    cards={emailBrandingCards}
    cover={{
      src: '/assets/portfolio/email-branding-cover.webp',
      alt: 'Illustration of email branding: SMTP, DMARC, S/MIME, ACME, CPaaS, AWS SES, Cloudflare Routing and subdomains',
      width: 1200,
      height: 731,
    }}
  />
);

export default EmailBrandingSlide;
