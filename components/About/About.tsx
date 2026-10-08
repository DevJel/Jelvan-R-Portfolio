import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './About.styles';
import WaveDivider from '../WaveDivider/WaveDivider';
import Navbar from '../Navbar/Navbar';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import SecondSlide from './Slides/SecondSlide/SecondSlide';
import ThirdSlide from './Slides/ThirdSlide/ThirdSlide';
import FourthSlide from './Slides/FourthSlide/FourthSlide';
import FifthSlide from './Slides/FifthSlide/FifthSlide';
import SixthSlide from './Slides/SixthSlide/SixthSlide';
import FirstSlide from './Slides/FirstSlide/FirstSlide';

export interface Props {
  withNavbar?: boolean;
}

/**
 *Renders About section in resume
 *@function About
 *@returns {JSX.Element} - Rendered CardContent component
 */
const About = ({ withNavbar = true }: Props): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLogoExpanded, setIsLogoExpanded] = useState(true);
  const [isFirstSlideVisible] = useIntersectionObserver(ref, {
    threshold: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => {
      const thresholdY = window.innerHeight * 0.8;
      setIsLogoExpanded(window.scrollY <= thresholdY || isFirstSlideVisible);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFirstSlideVisible]);

  return (
    <Styled.Container>
      {/*   NAVIGATION    */}
      {withNavbar && <Navbar isLogoExpanded={isLogoExpanded} />}
      {/*   FIRST SLIDE   */}
      <div ref={ref}>
        <FirstSlide />
      </div>
      <WaveDivider
        waveImg={'/assets/portfolio/blob-1.svg'}
        dividerHeight={'150px'}
      />
      {/*   SECOND SLIDE   */}
      <SecondSlide />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-2.svg'}
        dividerHeight={'200px'}
      />

      {/*   THIRD SLIDE   */}
      <ThirdSlide />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-1.svg'}
        dividerHeight={'200px'}
      />
      {/*   FOURTH SLIDE   */}
      <FourthSlide />
      <WaveDivider
        waveImg={'/assets/portfolio/blob-2.svg'}
        dividerHeight={'200px'}
      />
      {/*   FIFTH SLIDE   */}
      <FifthSlide />
      {/*   SIXTH SLIDE   */}
      <SixthSlide />
    </Styled.Container>
  );
};

export default About;
