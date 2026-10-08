import React from 'react';
import {
  SiAmazonaws,
  SiCloudflare,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiStorybook,
  SiTypescript,
} from 'react-icons/si';
import { IHighlightedProject } from '../../types/portfolio';

export const useHighlightedProjectsData = (): {
  highlightedProjects: IHighlightedProject[];
} => {
  const highlightedProjects: IHighlightedProject[] = [
    {
      slideNumberImg: '/assets/portfolio/1.svg',
      projectTitle: 'Learning Management System',
      projectDescription: `A platform for creating, assigning and tracking training, where learners follow structured courses and admins see progress and completion at a glance.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/lms-desktop.svg',
      projectMobileImg: '/assets/portfolio/projects/lms-mobile.svg',
      projectTechnologies: ['Cloudflare Workers', 'D1', 'TypeScript', 'React'],

      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key={1} className={'tech-icon'} />,
        <SiTypescript key={2} className={'tech-icon'} />,
        <SiReact key={3} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/2.svg',
      projectTitle: "Dev'Ai Controller",
      projectDescription: `A control centre for AI-assisted development that manages models, prompts and automated tasks from one secure dashboard, built on Cloudflare.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/devai-desktop.svg',
      projectMobileImg: '/assets/portfolio/projects/devai-mobile.svg',
      projectTechnologies: ['Cloudflare Workers', 'Workers AI', 'TypeScript'],

      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiCloudflare key={1} className={'tech-icon'} />,
        <SiTypescript key={2} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/3.svg',
      projectTitle: 'Customized Email Platform',
      projectDescription: `A branded email platform powered by AI and AWS SES that writes, personalises and sends email, fully authenticated with SPF, DKIM, DMARC and BIMI.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/email-desktop.svg',
      projectMobileImg: '/assets/portfolio/projects/email-mobile.svg',
      projectTechnologies: ['Cloudflare Workers', 'AWS SES', 'Workers AI', 'Email Routing'],

      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key={1} className={'tech-icon'} />,
        <SiAmazonaws key={2} className={'tech-icon'} />,
        <SiTypescript key={3} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/4.svg',
      projectTitle: 'Management Information System',
      projectDescription: `A central system that brings people, operations and performance data together into clear dashboards and reports for faster decisions.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/mis-desktop.svg',
      projectMobileImg: '/assets/portfolio/projects/mis-mobile.svg',
      projectTechnologies: ['Cloudflare Workers', 'D1', 'TypeScript', 'React'],

      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiCloudflare key={1} className={'tech-icon'} />,
        <SiTypescript key={2} className={'tech-icon'} />,
        <SiReact key={3} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/5.svg',
      projectTitle: 'Finance Management & Invoicing System',
      projectDescription: `A finance console for invoices, payments and records, with UI and API on Cloudflare and admin-controlled access, so each user sees only what they should.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projects/finance-desktop.svg',
      projectMobileImg: '/assets/portfolio/projects/finance-mobile.svg',
      projectTechnologies: ['Cloudflare Workers', 'D1', 'Turnstile', 'TypeScript'],

      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiCloudflare key={1} className={'tech-icon'} />,
        <SiTypescript key={2} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/6.svg',
      projectTitle: 'Sneaker Maniacs',
      projectDescription:
        'Sneaker-maniacs is a custom e-commerce platform powered by Next.js, Redux and MongoDB. My main goal was to build a web app that employs the best latest practices and on mobile feels like a rich native application. Try it out!',
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectOne/SneakerManiacs.png',
      projectMobileImg: '/assets/portfolio/projectOne/sneakerManiacsPhone.png',
      projectTechnologies: [
        'Next.js',
        'React',
        'Redux',
        'Mongo DB',
        'Styled Components',
      ],

      slideBgColor: '#ffffff',
      technologyIcons: [
        <SiTypescript key={1} className={'tech-icon'} />,
        <SiReact key={2} className={'tech-icon'} />,
        <SiNextdotjs key={3} className={'tech-icon'} />,
        <SiRedux key={4} className={'tech-icon'} />,
        <SiMongodb key={5} className={'tech-icon'} />,
        <SiStorybook key={6} className={'tech-icon'} />,
      ],
    },
    {
      slideNumberImg: '/assets/portfolio/7.svg',
      projectTitle: 'Department of Optics | Web-portal',
      projectDescription: `A sneak peak of a project that I'm currently building. This is a full-stack portal with 70+ pages designed and built for the department of Optics (Chernivtsi National University). It is powered by Next.js and Node.js on backend.`,
      slideHeight: '100vh',
      projectImg: '/assets/portfolio/projectTwo/vpsFullHd.png',
      projectMobileImg: '/assets/portfolio/projectTwo/vpsMobile.png',
      projectTechnologies: ['Next.js', 'React', 'Redux', 'Mongo DB', 'Express'],

      slideBgColor: '#fff7f0',
      technologyIcons: [
        <SiTypescript key={1} className={'tech-icon'} />,
        <SiReact key={2} className={'tech-icon'} />,
        <SiNextdotjs key={3} className={'tech-icon'} />,
        <SiRedux key={4} className={'tech-icon'} />,
        <SiNodedotjs key={5} className={'tech-icon'} />,
        <SiMongodb key={6} className={'tech-icon'} />,
      ],
    },
  ];
  return {
    highlightedProjects,
  };
};
