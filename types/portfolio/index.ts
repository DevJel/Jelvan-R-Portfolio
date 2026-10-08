import { ReactNode } from 'react';

export interface IHighlightedProject {
  slideNumberImg?: string;
  projectTitle: string;
  projectDescription: string;
  projectImg: string;
  projectMobileImg: string;
  /** Optional artwork shown instead of projectImg (e.g. a platform brand card) */
  projectArt?: ReactNode;
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
