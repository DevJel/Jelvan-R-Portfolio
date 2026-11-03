import React from 'react';
import {
  SiAmazonaws,
  SiCloudflare,
  SiMongodb,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { IHighlightedProject } from '../../types/portfolio';
import BrandCard from '../BrandCard/BrandCard';

const PHONE_IMG = '/assets/portfolio/landing-mobile.png';
const LAPTOP_IMG = '/assets/portfolio/laptop-lms.png';

/** Curated project portfolio. Descriptions focus on product purpose and capabilities. */
export const useHighlightedProjectsData = (): {
  highlightedProjects: IHighlightedProject[];
} => {
  const highlightedProjects: IHighlightedProject[] = [
    {
      slideNumberImg: '/assets/portfolio/1.svg',
      projectTitle: 'Multi Agent Worker | Master AI',
      projectDescription:
        'An AI-powered workforce for small businesses. Master AI coordinates multiple specialized automated workers across business departments, helping teams handle repeatable tasks, organize operations, and support day-to-day workflows. Powered by Muse AI.',
      slideHeight: '100vh',
      projectImg: LAPTOP_IMG,
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'Master AI · Muse AI'} />,
      projectTechnologies: ['Multi-Agent AI', 'Automated Workers', 'Department Workflows', 'Muse AI'],
      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
        <SiTypescript key="typescript" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/2.svg',
      projectTitle: 'Knowledge Center System',
      projectDescription:
        'A structured digital knowledge platform for organizing, maintaining, and accessing reference materials. It brings learning resources and documentation into one searchable, easy-to-navigate experience.',
      slideHeight: '100vh',
      projectImg: LAPTOP_IMG,
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'Knowledge Center'} />,
      projectSampleUrl: 'https://app-bible.jelvan.pro/',
      projectTechnologies: ['Knowledge Management', 'Digital Library', 'Web Application'],
      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
        <SiReact key="react" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/3.svg',
      projectTitle: 'Internal Email System',
      projectDescription:
        'An internal email and communications platform powered by Amazon SES. It combines reliable email delivery with workflow automation and AI-assisted capabilities to support operational notifications, messaging, and repeatable business processes.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/email-platform.png',
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'Internal Email · AWS SES'} />,
      projectTechnologies: ['Amazon SES', 'Email Automation', 'AI Assistance', 'Cloudflare'],
      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiAmazonaws key="aws" className={'tech-icon'} />,
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/4.svg',
      projectTitle: 'HR Information System',
      projectDescription:
        'A centralized HR platform for managing employee information and workforce processes across the employee lifecycle, including recruitment, onboarding, employee records, access control, and operational reporting.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/mis-desktop.svg',
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'HR Information System'} />,
      projectTechnologies: ['HR Operations', 'Workforce Management', 'Access Control', 'Reporting'],
      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
        <SiTypescript key="typescript" className={'tech-icon'} />,
        <SiReact key="react" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/5.svg',
      projectTitle: 'Workspace Pad | BOLEKpad',
      projectDescription:
        'A personal productivity workspace that brings notes, documents, attachments, and communication tools together. Designed as a focused digital workspace with AI-assisted features and workflow reminders.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/finance-desktop.svg',
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'BOLEKpad · Workspace'} />,
      projectTechnologies: ['Productivity Workspace', 'Notes & Documents', 'AI Assistance', 'Cloudflare'],
      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
        <SiReact key="react" className={'tech-icon'} />,
        <SiTypescript key="typescript" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/6.svg',
      projectTitle: 'Online Printing Store',
      projectDescription:
        'An online storefront concept for ordering print products through a digital shopping experience. The project is focused on presenting products, collecting order details, and making the printing request process more convenient.',
      slideHeight: '100vh',
      projectImg: LAPTOP_IMG,
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'Online Printing Store'} />,
      projectTechnologies: ['E-Commerce', 'Online Ordering', 'Product Catalog', 'Web Application'],
      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiReact key="react" className={'tech-icon'} />,
        <SiTypescript key="typescript" className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/7.svg',
      projectTitle: 'Developers Playground | DevAI',
      projectDescription:
        'A developer-focused environment for web development, coding workflows, and project monitoring. DevAI brings development utilities and AI-assisted capabilities together to help organize work, inspect progress, and support the software delivery lifecycle.',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/devai-desktop.svg',
      projectMobileImg: PHONE_IMG,
      projectArt: <BrandCard brands={['cloudflare']} subtitle={'DevAI · Developers Playground'} />,
      projectTechnologies: ['Web Development', 'AI-Assisted Coding', 'Project Monitoring', 'Cloudflare'],
      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key="cloudflare" className={'tech-icon'} />,
        <SiTypescript key="typescript" className={'tech-icon'} />,
        <SiNextdotjs key="nextjs" className={'tech-icon'} />,
      ],
    },
  ];

  return { highlightedProjects };
};
