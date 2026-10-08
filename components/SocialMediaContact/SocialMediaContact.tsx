import React, { ReactNode } from 'react';
import * as Styled from './SocialMediaContact.styles';

export interface Props {
  icon: ReactNode;
}

/**
 *Renders social medial link with icon
 *@function SocialMediaContact
 *@param {ReactNode} icon - icon to be rendered in contact
 *@param {string} text - link text
 *@returns {JSX.Element} - Rendered SocialMediaContact component
 */
const SocialMediaContact = ({ icon }: Props): JSX.Element => {
  return (
    <Styled.Container as="span">
      <div className="hovicon effect-1 sub-b">{icon}</div>
    </Styled.Container>
  );
};

export default SocialMediaContact;
