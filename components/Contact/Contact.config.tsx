import React, { ReactNode } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

/**
 * Custom hook to get contact info data
 *@function useContactConfig
 *@returns {IMyContact[]} myContacts - the hook returns array of social contacts with id, icon and text of social platform
 */
export const useContactConfig = (): { myContacts: IMyContact[] } => {
  const myContacts: IMyContact[] = [
    {
      id: 1,
      icon: <FiGithub className={'contact-icon'} />,
      text: 'GitHub',
      href: 'https://github.com/DevJel',
    },
    {
      id: 2,
      icon: <FiLinkedin className={'contact-icon'} />,
      text: 'LinkedIn',
      href: 'https://my.linkedin.com/in/jelvanricolcol',
    },
  ];

  return { myContacts };
};

export interface IMyContact {
  id: number;
  icon: ReactNode;
  text: string;
  href: string;
}
