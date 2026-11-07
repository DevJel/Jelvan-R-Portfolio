import React, { ReactNode } from 'react';
import * as Styled from './SocialMediaContact.styles';

export interface Props {
  icon: ReactNode;
  href: string;
  label: string;
}

/** Accessible external social-profile link. */
const SocialMediaContact = ({ icon, href, label }: Props): JSX.Element => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label} profile`}>
      <Styled.Container as="span">
        <div className="hovicon effect-1 sub-b">{icon}</div>
      </Styled.Container>
    </a>
  );
};

export default SocialMediaContact;
