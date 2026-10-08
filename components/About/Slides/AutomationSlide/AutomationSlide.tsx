import React from 'react';
import GlassSkillsSlide from '../GlassSkillsSlide/GlassSkillsSlide';
import { automationCards } from '../../About.content';

/**
 *Renders the Automation & AI Agents slide in About Portfolio presentation
 *@function AutomationSlide
 *@returns {JSX.Element} - Rendered AutomationSlide component
 */
const AutomationSlide = (): JSX.Element => (
  <GlassSkillsSlide
    anchorID={'automation-slide'}
    bgColor={'#ffffff'}
    headerText={'Automation'}
    paragraphText={
      'I design AI agents and automations that do the repetitive work, so your team can focus on people'
    }
    cards={automationCards}
  />
);

export default AutomationSlide;
