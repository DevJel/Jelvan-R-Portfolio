import React from 'react';
import * as Styled from '../ThirdSlide/ThirdSlide.styles';
import SectionHeader from '../../../Typography/SectionHeader/SectionHeader';
import PortfolioParagraph from '../../../Typography/PortfolioParagraph/PortfolioParagraph';
import Slide from '../../../Slide/Slide';
import SkillIcon from '../../../SkillIcon/SkillIcon';
import SkillListItem from '../../../SkillListItem/SkillListItem';
import { ISkill, ITechSkill } from '../../About.config';

export interface IGlassCard {
  title: string;
  icons: ISkill[];
  rows: ITechSkill[];
}

export interface Props {
  anchorID: string;
  bgColor: string;
  headerText: string;
  paragraphText: string;
  cards: IGlassCard[];
  /** Optional cover illustration shown above the heading, floating like the other slide illustrations */
  cover?: { src: string; alt: string; width: number; height: number };
}

/**
 *Renders a slide with glass cards of icons and labelled rows.
 *Shares the exact layout, styles and animations of the original Skills slide.
 *@function GlassSkillsSlide
 *@returns {JSX.Element} - Rendered GlassSkillsSlide component
 */
const GlassSkillsSlide = ({
  anchorID,
  bgColor,
  headerText,
  paragraphText,
  cards,
  cover,
}: Props): JSX.Element => {
  return (
    <Slide bgColor={bgColor} height={'100vh'} anchorID={anchorID}>
      <Styled.ThirdSlide>
        <div className="skills-wrapper">
          {cover && (
            <figure className="cover">
              <img
                src={cover.src}
                alt={cover.alt}
                width={cover.width}
                height={cover.height}
              />
            </figure>
          )}
          <SectionHeader
            variant={'small'}
            headerText={headerText}
            margin={'0'}
            color={'#f48120'}
          />
          <PortfolioParagraph
            margin={'0'}
            paragraphText={paragraphText}
            withDarkColor={false}
            variant={'large'}
            withAnimatedPresence={true}
          />
          <div className="glass-wrapper">
            {cards.map((card) => (
              <div className="glass-content" key={card.title}>
                <SectionHeader
                  variant={'extraSmall'}
                  headerText={card.title}
                  margin={'0'}
                  color={'#f48120'}
                />
                <ul className={'icon-skills'}>
                  {card.icons.map((skill) => (
                    <li key={skill.id}>
                      <SkillIcon
                        iconSrc={skill.iconSrc}
                        text={skill.text}
                        iconSize={skill.iconSize}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="tech-skills">
                  {card.rows.map((row) => (
                    <SkillListItem
                      key={row.id}
                      skillSection={row.skillSection}
                      skillValue={row.skillValue}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Styled.ThirdSlide>
    </Slide>
  );
};

export default GlassSkillsSlide;
