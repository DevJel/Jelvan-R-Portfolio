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
  />
);

export default EmailBrandingSlide;
