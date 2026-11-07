import styled, { css } from 'styled-components';
import { slideTop } from '../../design-system/reusableCss';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.navigation};
`;

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: .75rem;
  min-height: 2.75rem;
  padding: .55rem .9rem;
  border: 1px solid rgba(244, 129, 32, .35);
  border-radius: 999px;
  background: rgba(255, 255, 255, .82);
  color: ${({ theme }) => theme.portfolio.text.dark};
  cursor: pointer;
  box-shadow: 0 5px 18px rgba(24, 24, 32, .08);
  transition: background .2s ease, border-color .2s ease, transform .2s ease;

  &:hover {
    background: #fff7f0;
    border-color: #f48120;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(244, 129, 32, .35);
    outline-offset: 3px;
  }

  .icon-one {
    width: 22px;
    height: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .hamburger {
    position: relative;
    display: block;
    width: 21px;
    height: 2px;
    border-radius: 2px;
    background: #34343a;
    transition: background .2s ease;
  }

  .hamburger:before,
  .hamburger:after {
    position: absolute;
    right: 0;
    content: '';
    width: 21px;
    height: 2px;
    border-radius: 2px;
    background: #f48120;
    transition: top .2s ease, transform .2s ease;
  }

  .hamburger:before { top: -7px; }
  .hamburger:after { top: 7px; }

  .active-one .hamburger { background: transparent; }
  .active-one .hamburger:before { top: 0; transform: rotate(45deg); }
  .active-one .hamburger:after { top: 0; transform: rotate(-45deg); }

  .toggle-label {
    font-size: .9rem;
    line-height: 1;
    font-weight: 750;
    letter-spacing: .035em;
  }
`;
 
interface MenuProps { isOpen: boolean; }

const closedStyle = css`
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px) scale(.985);
`;

const openStyle = css`
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
`;

export const Menu = styled.nav<MenuProps>`
  position: absolute;
  top: calc(100% + .8rem);
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navigation + 2};
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: min(390px, calc(100vw - 2rem));
  max-height: min(82vh, 760px);
  overflow-y: auto;
  padding: 1.35rem;
  border: 1px solid rgba(244, 129, 32, .24);
  border-radius: 20px;
  background: ${({ theme }) => theme.gradients.lightGrayGradient};
  box-shadow: 0 22px 60px rgba(22, 24, 30, .2);
  backdrop-filter: blur(18px);
  transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
  ${({ isOpen }) => (isOpen ? openStyle : closedStyle)};

  @media ${({ theme }) => theme.media.phone} {
    right: -.5rem;
    width: min(370px, calc(100vw - 1.25rem));
    padding: 1.1rem;
  }
`;

export const MenuIntro = styled.div`
  padding: .35rem .35rem .9rem;
  border-bottom: 1px solid rgba(70, 70, 80, .12);

  span {
    display: block;
    margin-bottom: .45rem;
    color: #c56517;
    font-size: .68rem;
    font-weight: 800;
    letter-spacing: .16em;
  }

  strong {
    display: block;
    color: ${({ theme }) => theme.portfolio.text.dark};
    font-size: 1.25rem;
    line-height: 1.2;
  }

  p {
    margin: .4rem 0 0;
    color: #66636a;
    font-size: .83rem;
    line-height: 1.45;
  }
`;

export const NavigationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: .45rem;
`;

export const GroupHeading = styled.h3`
  margin: 0 .45rem;
  color: #9a5a2b;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
`;

export const RouterLinksList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: .2rem;
  margin: 0;
  padding: 0;
  list-style: none;
  animation: ${slideTop} .35s ease both;

  li { width: 100%; }
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  width: 100%;
  min-height: 2.55rem;
  padding: .6rem .75rem;
  border-radius: 10px;
  color: ${({ theme }) => theme.portfolio.text.dark};
  font-size: .98rem;
  font-weight: 650;
  line-height: 1.3;
  text-decoration: none;
  transition: color .18s ease, background .18s ease, transform .18s ease;

  span {
    color: #c56517;
    font-size: .9rem;
    opacity: .75;
  }

  &:hover {
    color: #a9510d;
    background: rgba(244, 129, 32, .1);
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid rgba(244, 129, 32, .55);
    outline-offset: 2px;
  }
`;

export const SocialMediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .7rem;
  padding: .9rem .35rem .2rem;
  border-top: 1px solid rgba(70, 70, 80, .12);

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.portfolio.text.dark};
    font-size: .82rem;
    font-weight: 750;
    letter-spacing: .02em;
  }
`;

export const SocialMediaContactsList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: .65rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;
