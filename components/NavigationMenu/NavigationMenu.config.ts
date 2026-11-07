/**
 * Main portfolio navigation.
 * Group names are short, task-oriented labels that remain clear on desktop and mobile.
 */
export type NavigationGroup = 'explore' | 'resources' | 'profile';

export const navMenuLinks: {
  id: number;
  linkText: string;
  href: string;
  group: NavigationGroup;
  external?: boolean;
}[] = [
  { id: 1, href: '/portfolio/projects', linkText: 'Projects & Case Studies', group: 'explore' },
  { id: 8, href: 'https://app-bible.jelvan.pro/', linkText: 'Knowledge Library', group: 'resources', external: true },
  { id: 2, href: '/tools', linkText: 'Developer Toolkit', group: 'resources' },
  { id: 9, href: '/ai-web-dev-cheat-sheet', linkText: 'AI Engineering Guide', group: 'resources' },
  { id: 7, href: '/svg-library', linkText: 'SVG Asset Library', group: 'resources' },
  { id: 3, href: '/portfolio/about', linkText: 'Profile & Experience', group: 'profile' },
  { id: 4, href: '/portfolio/contact', linkText: 'Contact', group: 'profile' },
  { id: 5, href: '/portfolio/resume', linkText: 'Résumé', group: 'profile' },
  { id: 6, href: '/', linkText: 'Portfolio Home', group: 'profile' },
];
