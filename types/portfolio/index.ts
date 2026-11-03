import { ReactNode } from 'react';

export interface IHighlightedProject {
  slideNumberImg?: string;
  projectTitle: string;
  projectDescription: string;
  projectImg: string;
  projectMobileImg: string;
  /** Optional artwork shown instead of projectImg (e.g. a platform brand card) */
  projectArt?: ReactNode;
  /** Publicly shareable project links, with access and availability labels. */
  projectLinks?: { label: string; url: string }[];
  projectLinkNote?: string;
  projectTechnologies: string[];
  technologyIcons: ReactNode[];
  slideBgColor: string;
  slideHeight: string;
}

export interface ICarouselQuote {
  id: number;
  title: string;
  quote: string;
}
