import { ReactNode } from 'react';
export interface IHighlightedProject {
  slideNumberImg?: string;
  projectTitle: string;
  projectDescription: string;
  projectPurpose: string;
  projectAdvantages: string[];
  projectFeatures: string[];
  projectImg: string;
  projectMobileImg: string;
  projectArt?: ReactNode;
  projectLinks?: { label: string; url: string }[];
  projectLinkNote?: string;
  projectTechnologies: string[];
  technologyIcons: ReactNode[];
  slideBgColor: string;
  slideHeight: string;
}
export interface ICarouselQuote { id: number; title: string; quote: string; }
