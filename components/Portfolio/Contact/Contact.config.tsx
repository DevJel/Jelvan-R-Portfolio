import React, { ReactNode } from 'react';
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

/**
 * Custom hook to get contact info data
 *@function useContactConfig
 *@returns {IMyContact[]} myContacts - the hook returns array of social contacts with id, icon and text of social platform
 */
export const useContactConfig = (): { myContacts: IMyContact[] } => {
  const myContacts: IMyContact[] = [
    {
      id: 1,
      icon: <FiTwitter className={'contact-icon'} />,
      text: 'Twitter',
    },
    {
      id: 2,
      icon: <FiGithub className={'contact-icon'} />,
      text: 'GitHub',
    },
    {
      id: 3,
      icon: <FiLinkedin className={'contact-icon'} />,
      text: 'LinkedIn',
    },
    {
      id: 4,
      icon: <FiInstagram className={'contact-icon'} />,
      text: 'Instagram',
    },
  ];

  return { myContacts };
};

export interface IMyContact {
  id: number;
  icon: ReactNode;
  text: string;
}
