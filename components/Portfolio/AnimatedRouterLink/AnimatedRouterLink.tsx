import React, { useState } from 'react';
import * as Styled from './AnimatedRouterLink.styles';
import Link from 'next/link';

export interface Props {
  variant: 'standard' | 'highlight';
  text: string;
  hoverText: string;
  href: string;
  animationTimeout: number;
}

/**
 *Renders animated router link
 *@function AnimatedRouterLink
 *@param {number} prop -
 *@returns {JSX.Element} - Rendered CardContent component
 */
const AnimatedRouterLink = ({
  variant,
  href,
  text,
  hoverText,
  animationTimeout,
}: Props): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Link href={href} passHref legacyBehavior>
      <Styled.A
        variant={variant}
        animationTimeout={animationTimeout}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? hoverText : text}
      </Styled.A>
    </Link>
  );
};

export default AnimatedRouterLink;
