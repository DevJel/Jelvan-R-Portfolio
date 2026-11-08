import React from 'react';
import * as Styled from './Navbar.styles';
import Logo from '../Logo/Logo';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

export interface Props {
  isLogoExpanded: boolean;
  menuFooter?: React.ReactNode;
}

/**
 *@function Navbar
 *@param {number} prop -
 *@returns {JSX.Element} - Rendered Navbar component
 */
const Navbar = ({ isLogoExpanded, menuFooter }: Props): JSX.Element => {
  return (
    <Styled.Container>
      <Logo isExpanded={isLogoExpanded} />
      <NavigationMenu footer={menuFooter} />
    </Styled.Container>
  );
};

export default Navbar;
