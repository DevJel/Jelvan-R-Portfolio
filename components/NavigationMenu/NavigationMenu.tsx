import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './NavigationMenu.styles';
import Link from 'next/link';
import { useContactConfig } from '../Contact/Contact.config';
import SocialMediaContact from '../SocialMediaContact/SocialMediaContact';
import { navMenuLinks } from './NavigationMenu.config';

const navigationGroups = [
  { id: 'explore', title: 'Explore' },
  { id: 'resources', title: 'Resources & Tools' },
  { id: 'profile', title: 'Profile' },
] as const;

const NavigationMenu = (): JSX.Element => {
  const { myContacts } = useContactConfig();
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setIsActive(false);

  useEffect(() => {
    if (!isActive) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return (
    <Styled.Container ref={containerRef}>
      <Styled.ToggleButton
        type="button"
        aria-label={isActive ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isActive}
        aria-controls="portfolio-navigation"
        onClick={() => setIsActive((current) => !current)}
      >
        <span className={`icon-one ${isActive ? 'active-one' : ''}`}>
          <span className="hamburger hamburger-one" />
        </span>
        <span className="toggle-label">Menu</span>
      </Styled.ToggleButton>

      <Styled.Menu id="portfolio-navigation" aria-label="Main navigation" isOpen={isActive}>
        <Styled.MenuIntro>
          <span>PORTFOLIO</span>
          <strong>Explore the work</strong>
          <p>Projects, practical resources and professional background.</p>
        </Styled.MenuIntro>

        {navigationGroups.map((group) => (
          <Styled.NavigationSection key={group.id}>
            <Styled.GroupHeading>{group.title}</Styled.GroupHeading>
            <Styled.RouterLinksList>
              {navMenuLinks.filter((link) => link.group === group.id).map((link) => (
                <li key={link.id}>
                  {link.external ? (
                    <Styled.NavLink href={link.href} onClick={closeMenu}>
                      {link.linkText}
                      <span aria-hidden="true">↗</span>
                    </Styled.NavLink>
                  ) : (
                    <Link href={link.href} passHref legacyBehavior>
                      <Styled.NavLink onClick={closeMenu}>{link.linkText}</Styled.NavLink>
                    </Link>
                  )}
                </li>
              ))}
            </Styled.RouterLinksList>
          </Styled.NavigationSection>
        ))}

        <Styled.SocialMediaWrapper>
          <h4>Find me online</h4>
          <Styled.SocialMediaContactsList>
            {myContacts.map((contact) => (
              <li key={contact.id}>
                <SocialMediaContact icon={contact.icon} href={contact.href} label={contact.text} />
              </li>
            ))}
          </Styled.SocialMediaContactsList>
        </Styled.SocialMediaWrapper>
      </Styled.Menu>
    </Styled.Container>
  );
};

export default NavigationMenu;
