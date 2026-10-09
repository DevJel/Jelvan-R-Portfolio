const CHECK = '/assets/portfolio/check.svg';
const COMPANY_ICON = '/assets/portfolio/briefcase.svg';

/**
 * CORE COMPETENCIES & TECHNICAL SKILLS (left column)
 */
export const strategicHrSkills: { text: string; iconUrl: string }[] = [
  { text: 'Strategic Workforce Planning', iconUrl: CHECK },
  { text: 'Recruitment & Talent Acquisition', iconUrl: CHECK },
  { text: 'Employee Relations & Engagement', iconUrl: CHECK },
  { text: 'Policy & Documentation Drafting', iconUrl: CHECK },
  { text: 'Performance & Offboarding Management', iconUrl: CHECK },
  { text: 'HR Compliance (Global & Local)', iconUrl: CHECK },
];

export const digitalStrategySkills: { text: string; iconUrl: string }[] = [
  { text: 'Web Layout & Design', iconUrl: CHECK },
  { text: 'Digital Branding', iconUrl: CHECK },
  { text: 'Domain Administration', iconUrl: CHECK },
  { text: 'Internal Communications Styling', iconUrl: CHECK },
  { text: 'Digital Campaign Strategy', iconUrl: CHECK },
  { text: 'HRIS & CRM Administration', iconUrl: CHECK },
];

export const aiAutomationSkills: { text: string; iconUrl: string }[] = [
  { text: 'Automated Workflows', iconUrl: CHECK },
  { text: 'Business Automation', iconUrl: CHECK },
  { text: 'Process Mapping (Lean Six Sigma)', iconUrl: CHECK },
  { text: 'Business Intelligence', iconUrl: CHECK },
  { text: 'Strategic Planning Models', iconUrl: CHECK },
  { text: 'Organizational Scaling', iconUrl: CHECK },
];

/**
 * KEY HIGHLIGHTS
 */
export const keyHighlights: { value: string; label: string }[] = [
  { value: '30K+', label: 'Employees Supported' },
  { value: '6+ Years', label: 'International Experience' },
  { value: '30+', label: 'Projects Completed' },
  { value: '100%', label: 'Compliance Rate' },
];

/**
 * PROFESSIONAL EXPERIENCE
 */
export const professionalExperience: IProfessionalExperience[] = [
  {
    variant: 'withResponsibilities',
    company: 'Concentrix Malaysia | Kuala Lumpur, Malaysia',
    companyImg: COMPANY_ICON,
    role: 'English Global Advertising Expert / Meta Pro',
    shortSummary:
      'Optimized Meta advertising campaigns across Facebook and Instagram for global brands by refining audience targeting, ad creatives, and bidding strategies to maximize ROI and maintain compliance.',
    timeFrame: 'July 2024 - October 7, 2026',
    responsibilities: [
      {
        text: 'Provided expert consulting and troubleshooting for a worldwide client base.',
        iconUrl: CHECK,
      },
      {
        text: 'Resolved restricted accounts, billing disputes, and campaign delivery issues.',
        iconUrl: CHECK,
      },
      {
        text: 'Analyzed performance datasets to generate actionable strategic insights.',
        iconUrl: CHECK,
      },
    ],
  },
  {
    variant: 'withResponsibilities',
    company: 'Freelance & Consulting | Remote Globally',
    companyImg: COMPANY_ICON,
    role: 'Web Developer (Contractual / Project Base)',
    shortSummary:
      'Delivered bespoke, responsive web systems and high-performing client portfolios to an international customer base on contractual terms.',
    timeFrame: 'November 2021 - Present',
    responsibilities: [
      {
        text: 'Engineered secure, cross-client HTML email marketing landscapes.',
        iconUrl: CHECK,
      },
      {
        text: 'Implemented responsive interactive UI features, including smart floating communication widgets, live chat trigger panels, and high-conversion navigation flows.',
        iconUrl: CHECK,
      },
      {
        text: 'Integrated IBM Full Stack Software Developer certifications to ensure technical excellence.',
        iconUrl: CHECK,
      },
    ],
  },
  {
    variant: 'withResponsibilities',
    company: 'Teleperformance USA | Remote',
    companyImg: COMPANY_ICON,
    role: 'Offshore, Shared Services HR Specialist',
    shortSummary:
      'Managed the end-to-end employee lifecycle for a 30,000+ global workforce.',
    timeFrame: 'January 10, 2022 - May 20, 2024',
    responsibilities: [
      {
        text: 'Executed high-volume onboarding of 70+ agents weekly.',
        iconUrl: CHECK,
      },
      {
        text: 'Processed critical compliance documentation with a perfect 100% audit record.',
        iconUrl: CHECK,
      },
      {
        text: 'Administered cross-functional tickets for payroll, recruiting, and operations.',
        iconUrl: CHECK,
      },
      {
        text: 'Streamlined ticketing system workflows and onboarding protocols to substantially improve service quality.',
        iconUrl: CHECK,
      },
    ],
  },
  {
    variant: 'withResponsibilities',
    company: 'Alorica Philippines (Amazon US/UK Account) | Manila, Philippines',
    companyImg: COMPANY_ICON,
    role: 'Customer Experience Agent',
    shortSummary:
      'Resolved a wide range of customer issues, order placements, modifications, billing, and cancellations for Amazon US/UK campaigns under strict SLA limits.',
    timeFrame: 'July 29, 2019 - October 18, 2021',
    responsibilities: [
      {
        text: 'Handled complex disputes and tracked fulfillment delays across multiple live channels.',
        iconUrl: CHECK,
      },
      {
        text: 'Consistently maintained high satisfaction metrics.',
        iconUrl: CHECK,
      },
    ],
  },
];

/**
 * EDUCATION & PROFESSIONAL DEVELOPMENT
 */
export const education: {
  degree: string;
  timeFrame: string;
  school: string;
  description: string;
}[] = [
  {
    degree:
      'Master in Artificial Intelligence for Business & in Human Resource and Talent Management',
    timeFrame: '2024 - 2025',
    school: 'Universidad Isabel I',
    description:
      'Completed dual-specialization graduate program studies; mastering strategic talent recruitment pipelines, corporate performance matrices, and international labor compliance for HR operations, paired with Python software scripting, predictive machine learning models, and automated SaaS pipelines in Artificial Intelligence.',
  },
  {
    degree:
      'BS in Business Administration, Major in Human Resources & Development Management',
    timeFrame: '2014 - 2018',
    school: 'University of Northern Philippines',
    description:
      'Completed a comprehensive program covering core business operations, organizational behavior, HR planning, recruitment, labor relations, compensation, and performance management. Developed strong foundational skills in people management, policy implementation, and administrative leadership essential for modern business environments.',
  },
];

/**
 * PROFESSIONAL CERTIFICATIONS
 */
export const certifications: { title: string; issuer: string }[] = [
  {
    title: 'Full Stack Software Developer Professional Certificate',
    issuer: 'IBM Course Series | 18 ACE US Semester Credits',
  },
  {
    title: 'Full Stack Application Development Capstone V2',
    issuer: 'IBM Certification Platform',
  },
  {
    title: 'Full Stack Software Developer Assessment V2',
    issuer: 'IBM Verified Practical Excellence',
  },
  {
    title: 'Getting Started as a Full-Stack Web Developer',
    issuer: 'LinkedIn Learning Hub',
  },
  {
    title: 'Corporate Recruiting Professional Certificate',
    issuer: 'American Staffing Association (ASA)',
  },
  {
    title: 'Plan & Prepare to Build AI Solutions on Azure',
    issuer: 'Microsoft Certified Core System',
  },
  {
    title: 'AWS Certified Artificial Intelligence Practitioner',
    issuer: 'Amazon Web Services (AWS)',
  },
  { title: 'Generative AI Primer', issuer: 'Vanderbilt University Program' },
  {
    title: 'AI Applications in Marketing & Finance',
    issuer: 'The Wharton School (Wharton Online)',
  },
  {
    title: 'AI Fundamentals for Non-Data Scientists',
    issuer: 'The Wharton School (Wharton Online)',
  },
  {
    title: 'Generative AI for HR Professionals',
    issuer: 'Vanderbilt University Program',
  },
  {
    title: 'Responsible AI in a Global Context',
    issuer: 'United Nations System Staff College (UNSSC)',
  },
  {
    title: 'Certified Human Resource Associate (CHRA)',
    issuer: 'Human Resources Educators Association of the Philippines',
  },
  {
    title: 'Six Sigma: Black Belt Certification',
    issuer: 'NASBA CPE Accredited License',
  },
  {
    title: 'Certified Lean Six Sigma White Belt',
    issuer: 'International Society of Six Sigma Professionals',
  },
  {
    title: 'Program Management for IT Professionals',
    issuer: 'SHRM Verified Practitioner',
  },
  {
    title: 'Strategy and Operations Expert',
    issuer: 'International Business Management Institute (IBMI)',
  },
  {
    title: 'Succeeding as a First-Time Tech Manager',
    issuer: 'Project Management Institute (PMI)',
  },
  {
    title: 'Innovative Customer Service Techniques',
    issuer: 'Project Management Institute (PMI)',
  },
  {
    title: 'Master Class on Leadership Excellence',
    issuer: 'World Academy for Research & Development (WARD)',
  },
  {
    title: 'Master Class on Essentials of Kaizen',
    issuer: 'World Academy for Research & Development (WARD)',
  },
  {
    title: 'Creating an Employee Handbook',
    issuer: 'SHRM Verified Practitioner',
  },
  {
    title: 'Certificate in Teaching English to Speakers of Other Languages',
    issuer: 'HAIENGLISH | TESOL Pedagogy | 120 hr',
  },
  {
    title: 'Certificate in Teaching English as a Foreign Language',
    issuer: 'HAIENGLISH | TEFL Applied Linguistics | 120 hr',
  },
];

export type IProfessionalExperience =
  | {
      variant: 'withResponsibilities';
      company: string;
      companyImg: string;
      role: string;
      timeFrame: string;
      shortSummary: string;
      responsibilities: { text: string; iconUrl: string; url?: string }[];
    }
  | {
      variant: 'simple';
      role: string;
      company: string;
      companyImg: string;
      timeFrame: string;
      shortSummary: string;
    };
