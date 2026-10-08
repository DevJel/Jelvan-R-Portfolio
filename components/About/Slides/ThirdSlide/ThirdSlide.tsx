import React from 'react';
import GlassSkillsSlide from '../GlassSkillsSlide/GlassSkillsSlide';
import { skillCards } from '../../About.content';

/**
 *Renders the Skills slide in About Portfolio presentation (based on the resume)
 *@function ThirdSlide
 *@returns {JSX.Element} - Rendered ThirdSlide component
 */
const ThirdSlide = (): JSX.Element => (
  <GlassSkillsSlide
    anchorID={'third-slide'}
    bgColor={'#ffffff'}
    headerText={'Skills'}
    paragraphText={'The areas I work in, and the tools I use every day'}
    cards={skillCards}
  />
);

export default ThirdSlide;
