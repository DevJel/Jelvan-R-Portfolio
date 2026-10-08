import React from 'react';
import * as Styled from './FourthSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import Image from 'next/legacy/image';
import WithSparkles from '../../../WithSparkles/WithSparkles';
import { SiAmazonaws, SiCloudflare, SiPython } from 'react-icons/si';

/**
 *Renders fourth slide in About Portfolio presentation
 *@function SecondSlide
 *@returns {JSX.Element} - Rendered FourthSlide component
 */
const FourthSlide = (): JSX.Element => {
  return (
    <Slide bgColor={'#fff7f0'} height={'100vh'} anchorID={'fourth-slide'}>
      <Styled.FourthSlide>
        <div className="left-column">
          <SectionHeader
            variant={'small'}
            headerText={'Over the past six years'}
            margin={'0'}
            color={'#f48120'}
          />
          <PortfolioParagraph
            margin={'1rem 0'}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          >
            I’ve supported a workforce of 30,000+ employees across Malaysia, the
            Philippines, the USA and remote global teams, keeping a 100%
            compliance record in HR operations.
          </PortfolioParagraph>
          <PortfolioParagraph
            margin={'1rem 0'}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          >
            I’ve led high-volume onboarding, managed the full employee lifecycle
            and delivered 30+ web and digital projects for international
            clients. I’m an HR professional, but{' '}
            <WithSparkles color={'#f48120'}>not a typical one</WithSparkles>.
          </PortfolioParagraph>
          <PortfolioParagraph
            margin={'1rem 0'}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          >
            Currently, I work at Concentrix Malaysia as an English Global
            Advertising Expert (Meta Pro), and I take on freelance web
            development projects alongside.
          </PortfolioParagraph>
        </div>
        {/*  PERSON */}
        <div className="right-column">
          <Styled.ImageContainer
            position={{ left: '0', right: '0' }}
            className={'person-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'person'}>
              <Image
                src={'/assets/portfolio/work-from-home.svg'}
                alt={'Jelvan® is working from home'}
                height={500}
                width={500}
                objectFit={'contain'}
                className={'person'}
                priority
              />
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          {/* CLOUDFLARE */}
          <Styled.ImageContainer
            position={{ top: '30%', right: '4rem' }}
            className={'react-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'tech'}>
              <Styled.TechBadge className={'react'} aria-label={'Cloudflare'}>
                <SiCloudflare style={{ color: '#f38020' }} />
              </Styled.TechBadge>
            </Styled.FloatingImgContainer>
            {/* AWS */}
          </Styled.ImageContainer>
          <Styled.ImageContainer
            position={{ bottom: '3rem', right: '6rem' }}
            className={'redux-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'tech'}>
              <Styled.TechBadge className={'redux'} aria-label={'AWS'}>
                <SiAmazonaws style={{ color: '#232f3e' }} />
              </Styled.TechBadge>
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
          {/* PYTHON */}
          <Styled.ImageContainer
            position={{ bottom: '6rem', left: '5rem' }}
            className={'node-wrapper'}
          >
            <Styled.FloatingImgContainer variant={'tech'}>
              <Styled.TechBadge className={'node'} aria-label={'Python'}>
                <SiPython style={{ color: '#3776ab' }} />
              </Styled.TechBadge>
            </Styled.FloatingImgContainer>
          </Styled.ImageContainer>
        </div>
      </Styled.FourthSlide>
    </Slide>
  );
};

export default FourthSlide;
