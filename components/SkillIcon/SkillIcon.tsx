import React, { useState } from 'react';
import * as Styled from './SkillIcon.styles';
import Image from 'next/legacy/image';

export interface Props {
  iconSrc: string;
  text: string;
  iconSize: { height: number; width: number };
}

/**
 *@function SkillIcon
 *@param {string} iconSrc - skill icon image source
 *@param {string} text - skill description
 *@param {object} iconSize - icon width and height
 *@returns {JSX.Element} - Rendered SkillIcon component
 */
const Component = ({ iconSrc, text, iconSize }: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Styled.Container
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={iconSrc}
        height={iconSize.height}
        width={iconSize.width}
        alt={`Icon of ${text} tool`}
        objectFit={'contain'}
        className={'icon-img'}
      />
      <Styled.SkillText>
        <Styled.IconText isHovering={isHovering}>{text}</Styled.IconText>
      </Styled.SkillText>
    </Styled.Container>
  );
};

export default Component;
