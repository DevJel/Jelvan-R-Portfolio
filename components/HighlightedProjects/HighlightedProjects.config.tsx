import React from 'react';
import { SiAmazonaws, SiCloudflare, SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';
import { IHighlightedProject } from '../../types/portfolio';

const PHONE_IMG = '/assets/portfolio/landing-mobile.png';
const LAPTOP_IMG = '/assets/portfolio/laptop-lms.png';

export const useHighlightedProjectsData = (): { highlightedProjects: IHighlightedProject[] } => {
  const highlightedProjects: IHighlightedProject[] = [
    {
      slideNumberImg:'/assets/portfolio/1.svg', projectTitle:'Master AI | Multi-Agent Workspace',
      projectLinks:[], projectLinkNote:'Product demonstration. Private operational configuration and organization-specific information are intentionally excluded.',
      projectDescription:'A coordinated AI workspace that brings specialist assistants together to help people organize requests, prepare useful drafts, summarize information and support repeatable team workflows. People remain responsible for reviewing decisions and approving consequential actions.',
      projectPurpose:'Make AI assistance easier to use across different work areas while keeping tasks understandable, reviewable and under human control.',
      projectFeatures:['Specialist AI assistants for distinct task categories','Guided request and response workflows','Knowledge-supported drafting and summaries','Human review before consequential actions','Separate user experiences for different access needs'],
      projectAdvantages:['Reduces repetitive preparation work','Creates a consistent place to work with AI','Keeps human approval and accountability visible','Can be adapted to different team workflows'],
      slideHeight:'100vh', projectImg:LAPTOP_IMG, projectMobileImg:PHONE_IMG,
      projectArt:<BrandCard brands={['cloudflare']} subtitle="Master AI · Multi-Agent Workspace" />,
      projectTechnologies:['Cloudflare Workers','Workers AI','D1 Database','JavaScript','AI orchestration'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/2.svg', projectTitle:'Knowledge Center System',
      projectLinks:[{label:'Open Knowledge Center',url:'https://app-bible.jelvan.pro/'},{label:'Public source repository',url:'https://github.com/DevJel/knowledge-center-system'}],
      projectDescription:'A chapter-based learning and technical reference library. It organizes complex subjects into standalone guides with practical explanations, examples, diagrams, implementation steps and links to authoritative documentation.',
      projectPurpose:'Help developers, technical teams and learners find clear, structured guidance for planning, building, securing, testing and operating digital systems.',
      projectFeatures:['Standalone topic and chapter pages','Searchable and shareable learning content','Step-by-step implementation guidance','Architecture and process diagrams','Examples, checklists and official references','Reference update and page maintenance guides'],
      projectAdvantages:['Makes technical knowledge easier to discover','Supports self-paced learning','Connects related topics into learning paths','Encourages verification against official sources'],
      slideHeight:'100vh', projectImg:LAPTOP_IMG, projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/laptop-lms.png',
      projectTechnologies:['HTML','CSS','JavaScript','Cloudflare Pages','Markdown documentation'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/3.svg', projectTitle:'Internal Email System',
      projectLinks:[], projectLinkNote:'Private workspace. Internal account details, sending configuration and operational endpoints are not published.',
      projectDescription:'A streamlined email outreach and communications workspace for organizing contacts, preparing campaigns, managing templates and handling replies. Email delivery is designed around Amazon Simple Email Service (SES), with safeguards for responsible sending.',
      projectPurpose:'Bring contact organization and email workflow management into one focused interface while supporting consent-aware, accountable communication.',
      projectFeatures:['Contact and lead organization','Reusable email templates and campaign drafts','Sending workflow with delivery status tracking','Reply and activity organization','Domain and sender configuration guidance','Opt-out and responsible-sending controls'],
      projectAdvantages:['Reduces scattered manual email work','Encourages consistent communication','Makes campaign activity easier to review','Separates demo activity from real sending'],
      slideHeight:'100vh', projectImg:'/assets/portfolio/email-platform.png', projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/email-platform.png',
      projectTechnologies:['Cloudflare Workers','D1 Database','Amazon SES','JavaScript','HTML & CSS'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiAmazonaws key="aws" className="tech-icon"/>,<SiCloudflare key="cf" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/4.svg', projectTitle:'HR Information System',
      projectLinks:[{label:'Public source repository',url:'https://github.com/DevJel/jelhr-system'}],
      projectLinkNote:'Development prototype. Do not use for real employee or payroll records until production security and operational checks are complete.',
      projectDescription:'A modular human-resources workspace covering employee lifecycle processes, workforce records and administrative workflows. The current repository includes an interface, API functions and a database-backed foundation, with several modules still at prototype or demo maturity.',
      projectPurpose:'Provide a structured starting point for managing common HR processes through role-aware workspaces and consistent records.',
      projectFeatures:['Administrator, HR, employee and demo access concepts','Employee directory and profile views','Onboarding and offboarding checklists','Time and attendance interface','Security and session management flows','Cloudflare Pages Functions API and D1 schema'],
      projectAdvantages:['Connects related HR workflows in one interface','Makes task ownership and process stages clearer','Supports role-based access design','Can evolve module by module as integrations mature'],
      slideHeight:'100vh', projectImg:'/assets/portfolio/projects/mis-desktop.svg', projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/projects/mis-desktop.svg',
      projectTechnologies:['Cloudflare Pages','Pages Functions','D1 Database','JavaScript','HTML & CSS'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/5.svg', projectTitle:'BOLEKpad | Personal Workspace',
      projectLinks:[], projectLinkNote:'Private application repository. Public description focuses on product capabilities; account-specific setup is not included.',
      projectDescription:'A personal digital workspace that brings notes, pages, documents, slides, a calendar, email utilities and AI-assisted tools into one application. The browser interface connects to a server-side API for protected data and service operations.',
      projectPurpose:'Give an individual a single place to capture ideas, organize knowledge, work on documents and manage lightweight productivity tasks.',
      projectFeatures:['Sticky notes and nested pages','Rich documents, slide decks and canvas','Calendar and scheduled reminders','File attachments and private storage','AI writing and workspace assistance','Email utilities and browser-based tools'],
      projectAdvantages:['Reduces context switching between tools','Keeps related notes and work materials together','Supports persistent storage and file attachments','Offers modular tools in one responsive workspace'],
      slideHeight:'100vh', projectImg:'/assets/portfolio/projects/finance-desktop.svg', projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/automation-cover.png',
      projectTechnologies:['React 19','TypeScript','Vite','Tailwind CSS','Cloudflare Workers','D1 · KV · R2','Workers AI'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiReact key="react" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/6.svg', projectTitle:'Online Printing Store',
      projectLinks:[], projectLinkNote:'Concept showcase. A verified source repository and confirmed implementation stack have not yet been identified; technologies are intentionally not assumed.',
      projectDescription:'An online storefront concept for browsing print products, reviewing customization choices and submitting print orders. The intended experience connects product discovery with a clear order-request process.',
      projectPurpose:'Make it easier for customers to explore print options and submit complete, well-organized print requests online.',
      projectFeatures:['Print product catalogue concept','Product and finish selection flow','Artwork or design submission concept','Order details and quantity capture','Request confirmation and order-status concept'],
      projectAdvantages:['Makes product options easier to compare','Reduces incomplete order enquiries','Creates a clearer customer request journey','Can be extended with payment and order tracking integrations'],
      slideHeight:'100vh', projectImg:LAPTOP_IMG, projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/laptop-lms.png',
      projectTechnologies:['E-commerce concept','Product catalogue','Order workflow','Stack verification pending'],
      slideBgColor:'#ffffff', technologyIcons:[<SiReact key="react" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/7.svg', projectTitle:'Developers Playground | DevAI',
      projectLinks:[{label:'Open xCoder',url:'https://app.xcoder.jelvan.pro/'}],
      projectLinkNote:'Development status varies by feature. Live payment, email, model and connector integrations require independent verification.',
      projectDescription:'An AI-assisted developer workspace designed to combine conversational coding support, project resources, connectors, media handling and development workflow tools in one browser-based environment.',
      projectPurpose:'Help developers explore ideas, work with AI assistance and organize selected development resources without moving between disconnected tools.',
      projectFeatures:['Guest question and authenticated workspace flows','AI chat and conversation history','Connector and plugin management concepts','Private media and resource handling','Model and usage controls','Review-before-send automation concepts'],
      projectAdvantages:['Brings common developer utilities together','Supports AI-assisted exploration and drafting','Provides a structured place for integrations','Designed with review and access boundaries in mind'],
      slideHeight:'100vh', projectImg:'/assets/portfolio/projects/devai-desktop.svg', projectMobileImg:PHONE_IMG,
      projectImg:'/assets/portfolio/projects/devai-desktop.svg',
      projectTechnologies:['Cloudflare Workers','Workers AI','D1 Database','R2 Storage','Durable Objects','Turnstile','Amazon SES'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>,<SiNextdotjs key="next" className="tech-icon"/>],
    },
  ];
  return { highlightedProjects };
};
