/**
 * Single source of truth for SEO: site identity, per-page metadata and
 * structured data (schema.org JSON-LD). Content mirrors the résumé.
 */

export const SITE = {
  url: 'https://portfolio.jelvan.pro',
  name: 'Jelvan Ricolcol',
  brand: 'Jelvan®',
  fullName: 'Jelvan Baloaloa Ricolcol',
  headline:
    'Strategic HR Professional | Full Stack Software Developer | Certified AI & Digital Transformation Practitioner',
  email: 'hello@work.jelvan.pro',
  telephone: '+60-11-2561-1502',
  linkedin: 'https://www.linkedin.com/in/jelvanricolcol/',
  locations: ['Philippines', 'Malaysia'],
  // Social share image (Open Graph / Twitter / Google)
  image: 'https://res.cloudinary.com/mxazzuct/image/upload/portfolio_cover.webp',
  logo: 'https://portfolio.jelvan.pro/logo.png',
  locale: 'en_US',
  owner: 'Mr. Jelvan B. Ricolcol, CHRA, MHR, MBAI',
  credit:
    'This website is owned, customized and maintained by Mr. Jelvan B. Ricolcol, CHRA, MHR, MBAI.',
  themeColor: '#f48120',
  keywords: [
    'Jelvan Ricolcol',
    'Jelvan Baloaloa Ricolcol',
    'Jelvan',
    'Strategic HR Professional',
    'HR Generalist',
    'Shared Services HR Specialist',
    'Full Stack Software Developer',
    'Web Developer',
    'AI and Digital Transformation',
    'HR Technology',
    'HRIS',
    'Talent Acquisition',
    'HR Compliance',
    'Business Automation',
    'Lean Six Sigma',
    'Meta Advertising',
    'Philippines',
    'Malaysia',
    'Kuala Lumpur',
  ],
};

export const DEFAULT_DESCRIPTION =
  "Jelvan Ricolcol is a Strategic HR Professional, Full Stack Software Developer and Certified AI & Digital Transformation Practitioner based in the Philippines and Malaysia. Dual-specialization Master's in AI for Business and HR & Talent Management, 6+ years of international experience, 30,000+ employees supported and a 100% compliance rate.";

export interface PageSeo {
  title: string;
  description: string;
  /** Canonical path, e.g. "/portfolio/resume" */
  path: string;
  /** Keep the page out of search results */
  noindex?: boolean;
}

export const PAGES: Record<
  'home' | 'about' | 'projects' | 'contact' | 'resume' | 'articles' | 'tools' | 'svgLibrary',
  PageSeo
> = {
  svgLibrary: {
    title: 'SVG Library | Original Jelvan Elements by Jelvan Ricolcol',
    description: 'Browse 108 original SVG elements by Jelvan Ricolcol. Copy, recolor and download the editable vector designs with creator attribution.',
    path: '/svg-library',
  },
  home: {
    title:
      'Jelvan Ricolcol | Strategic HR Professional & Full Stack Software Developer',
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  about: {
    title: 'About Jelvan Ricolcol | HR, Software Development & AI',
    description:
      'About Jelvan Ricolcol: strategic HR professional and full stack software developer bridging people strategy and technology, with expertise in HR operations, digital branding systems, AI and business automation.',
    path: '/portfolio/about',
  },
  projects: {
    title: 'Projects | Jelvan Ricolcol',
    description:
      'Selected web development and digital transformation projects by Jelvan Ricolcol, full stack software developer and AI & digital transformation practitioner.',
    path: '/portfolio/projects',
  },
  contact: {
    title: 'Contact Jelvan Ricolcol | HR, Web Development & AI Advisory',
    description:
      'Contact Jelvan Ricolcol for strategic HR advisory, web development, AI and business automation projects, or verification documents. Email hello@work.jelvan.pro.',
    path: '/portfolio/contact',
  },
  resume: {
    title: 'Résumé | Jelvan Ricolcol, Strategic HR & Full Stack Developer',
    description:
      "Résumé of Jelvan Ricolcol: HR operations at Teleperformance (30,000+ employees, 100% audit record), Meta advertising expert at Concentrix Malaysia, freelance web developer, dual-specialization Master's in AI for Business and HR & Talent Management, IBM, AWS, Wharton and SHRM certifications.",
    path: '/portfolio/resume',
  },
  tools: {
    title: 'Dev Tools | Jelvan Ricolcol',
    description: 'Browser-based HTML viewer, OTP and password generators, random keys, Base32 and Base64 converters, and local notes.',
    path: '/tools',
    noindex: true,
  },
  articles: {
    title: 'Dev Tools | Jelvan Ricolcol',
    description: 'Browser-based HTML viewer, OTP and password generators, random keys, Base32 and Base64 converters, and local notes.',
    path: '/tools',
    // Preserve the existing indexing policy for legacy article URLs.
    noindex: true,
  },
};

export const absoluteUrl = (path: string): string =>
  `${SITE.url}${path === '/' ? '/' : path}`;

/**
 * schema.org structured data describing the person and the website.
 * Lets Google and AI assistants understand who the site is about.
 */
export const structuredData = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#person`,
      name: SITE.name,
      alternateName: [SITE.fullName, SITE.brand],
      honorificPrefix: 'Mr.',
      honorificSuffix: 'CHRA, MHR, MBAI',
      givenName: 'Jelvan',
      additionalName: 'Baloaloa',
      familyName: 'Ricolcol',
      url: SITE.url,
      image: SITE.image,
      email: `mailto:${SITE.email}`,
      telephone: SITE.telephone,
      jobTitle: [
        'Strategic HR Professional',
        'Full Stack Software Developer',
        'Certified AI & Digital Transformation Practitioner',
      ],
      description: DEFAULT_DESCRIPTION,
      homeLocation: SITE.locations.map((country) => ({
        '@type': 'Country',
        name: country,
      })),
      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'English Global Advertising Expert / Meta Pro',
          occupationLocation: { '@type': 'City', name: 'Kuala Lumpur' },
        },
        {
          '@type': 'Occupation',
          name: 'Web Developer (Contractual / Project Base)',
        },
        {
          '@type': 'Occupation',
          name: 'Offshore, Shared Services HR Specialist',
        },
      ],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad Isabel I',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'University of Northern Philippines',
        },
      ],
      hasCredential: [
        "Master in Artificial Intelligence for Business & in Human Resource and Talent Management (Universidad Isabel I)",
        'BS in Business Administration, Major in Human Resources & Development Management (University of Northern Philippines)',
        'IBM Full Stack Software Developer Professional Certificate',
        'AWS Certified Artificial Intelligence Practitioner',
        'Certified Human Resource Associate (CHRA)',
        'Corporate Recruiting Professional Certificate (American Staffing Association)',
        'Six Sigma: Black Belt Certification',
        'Certified Lean Six Sigma White Belt',
      ].map((name) => ({
        '@type': 'EducationalOccupationalCredential',
        name,
      })),
      knowsAbout: [
        'Strategic Workforce Planning',
        'Recruitment & Talent Acquisition',
        'Employee Relations & Engagement',
        'HR Compliance',
        'HRIS & CRM Administration',
        'Full Stack Web Development',
        'Web Layout & Design',
        'Digital Branding',
        'Digital Campaign Strategy',
        'Meta Advertising',
        'Artificial Intelligence for Business',
        'Business Automation',
        'Process Mapping (Lean Six Sigma)',
        'Business Intelligence',
        'Organizational Scaling',
      ],
      knowsLanguage: ['English'],
      sameAs: [SITE.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: `${SITE.name} | Portfolio`,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': `${SITE.url}/#person` },
      copyrightHolder: { '@id': `${SITE.url}/#person` },
      maintainer: { '@id': `${SITE.url}/#person` },
      creditText: SITE.credit,
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE.url}/#profilepage`,
      url: SITE.url,
      name: PAGES.home.title,
      mainEntity: { '@id': `${SITE.url}/#person` },
      isPartOf: { '@id': `${SITE.url}/#website` },
    },
  ],
});

