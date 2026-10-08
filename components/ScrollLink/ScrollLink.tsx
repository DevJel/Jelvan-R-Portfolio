import React, { ReactNode, useState } from 'react';
import * as Styled from './ScrollLink.styles';
import { Link as LinkScroll } from 'react-scroll';

export interface Props {
  icon: ReactNode;
  hiddenText: string;
  anchorID: string;
}

/**
 *@function ScrollLink
 *@param {number} prop -
 *@returns {JSX.Element} - Rendered ScrollLink component
 */
const ScrollLink = ({ anchorID, icon, hiddenText }: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Styled.LIcontainer
      isHovering={isHovering}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <LinkScroll to={anchorID} smooth={true} duration={1000}>
        {isHovering ? <p>{hiddenText}</p> : <p>{icon}</p>}
      </LinkScroll>
    </Styled.LIcontainer>
  );
};

export default ScrollLink;
