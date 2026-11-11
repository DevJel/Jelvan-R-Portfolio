import React from 'react';
import { SiAmazonaws, SiCloudflare, SiNextdotjs, SiReact, SiTypescript } from 'react-icons/si';
import { IHighlightedProject } from '../../types/portfolio';

const PHONE_IMG = '/assets/portfolio/landing-mobile.png';
const LAPTOP_IMG = '/assets/portfolio/laptop-lms.png';

export const useHighlightedProjectsData = (): { highlightedProjects: IHighlightedProject[] } => {
  const highlightedProjects: IHighlightedProject[] = [
    {
      slideNumberImg:'/assets/portfolio/1.svg', projectImg:'/assets/portfolio/projects/internal-email-system-leadmaster-desktop.svg', projectTitle:'Internal Email System - LeadMASTER',
      projectLinks:[{label:'Open LeadMASTER',url:'https://leadmaster.jelvan.pro/'},{label:'Public source repository',url:'https://github.com/DevJel/LeadMASTER'}],
      projectDescription:'An integrated internal email and campaign operations system for managing contacts, preparing individual messages and bulk campaigns, validating recipients, composing HTML email, and tracking delivery from queue submission through recipient outcomes. Outbound delivery uses AWS SES SMTP.',
      projectPurpose:'Bring internal communications and controlled email campaigns into one workspace, with validated recipients, reviewed content, paced SMTP dispatch and traceable delivery outcomes.',
      projectFeatures:['Internal announcements and employee lifecycle communications','Recruitment, service and customer correspondence','Contact and lead organization','Bulk recipient parsing and validation','Reusable templates and HTML email composition with exact preview','Campaign review and queue management','AWS SES SMTP-only outbound delivery','Rate-limited sending with retry and dead-letter handling','Delivery, bounce, complaint and delay event tracking','Campaign activity and recipient-level status visibility','Responsible-sending, suppression and audit controls'],
      projectAdvantages:['Combines internal email workflows and campaign operations','Validates recipients before queue submission','Controls sending pace to protect sender reputation','Connects accepted messages with downstream delivery events','Makes communication activity and campaign outcomes easier to monitor'],
      slideHeight:'100vh', projectMobileImg:'/assets/portfolio/projects/internal-email-system-leadmaster-mobile.svg', projectMobilePreview:true,
      projectTechnologies:['Cloudflare Workers','Cloudflare Queues','Durable Objects','D1 Database','AWS SES SMTP','JavaScript'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiAmazonaws key="aws" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/2.svg', projectImg:'/assets/portfolio/projects/01-master-ai-dashboard.webp', projectTitle:'Master AI | Multi-Agent Workspace',
      projectLinks:[], projectLinkNote:'Product demonstration. Private operational configuration and organization-specific information are intentionally excluded.',
      projectDescription:'An organizational AI enablement layer that can support HR, finance, procurement, customer service, IT and operations through specialist assistants, knowledge retrieval and governed workflow automation. People remain accountable for decisions and approve consequential actions.',
      projectPurpose:'Help organizations improve service delivery and productivity by connecting approved knowledge, departmental workflows and human-reviewed AI assistance.',
      projectFeatures:['Specialist AI assistants for distinct task categories','Guided request and response workflows','Knowledge-supported drafting and summaries','Human review before consequential actions','Separate user experiences for different access needs'],
      projectAdvantages:['Reduces repetitive preparation work','Creates a consistent place to work with AI','Keeps human approval and accountability visible','Can be adapted to different team workflows'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
            projectTechnologies:['Cloudflare Workers','Workers AI','D1 Database','JavaScript','AI orchestration'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/3.svg', projectImg:'/assets/portfolio/projects/desktopview-proctorava.png', projectTitle:'LEARNING MANAGEMENT SYSTEM - PROCTORAVA', projectDeveloper:'Jelvan R · Developer',
      projectLinks:[], projectLinkNote:'Private product showcase. Applicant records, identity documents, verification results, assessment content and proctoring data are not public.',
      projectDescription:'PROCTORAVA is a learning and assessment management platform focused on secure candidate and learner assessment journeys. It brings applicant registration, profile completion, identity verification, assessment delivery and proctoring controls into one guided experience for recruitment, education and workforce development.',
      projectPurpose:'Provide a consistent, auditable assessment journey from registration and identity checks through assessment completion and authorized review, while protecting candidate privacy and restricting sensitive verification data.',
      projectFeatures:['Applicant registration and structured profile capture','Email one-time-password verification for account access','Guided identity verification using a live phone-based identity capture flow','Assessment portal with clear instructions and readiness checks','Browser-based assessment experience with proctoring signals and session controls','Microphone and screen-permission checks before a monitored session','Window or tab focus-change handling with configurable pause and review rules','Recruitment administrator access separated from applicant access','Assessment status, review workflow and outcome record organization','Email notifications through a server-side mail delivery integration'],
      projectAdvantages:['Creates one guided journey instead of disconnected registration and assessment steps','Improves consistency of identity and readiness checks','Helps reviewers organize assessment sessions and evidence','Supports remote assessment with transparent candidate instructions','Separates applicant-facing workflows from restricted recruitment administration'],
      slideHeight:'100vh', projectMobileImg:'/assets/portfolio/projects/mobileview-proctorava.png', projectMobilePreview:true,
      projectTechnologies:['Cloudflare Pages','Cloudflare Workers','D1 Database','Amazon SES','Cloudflare Turnstile','Identity verification integration','Browser media and screen APIs'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>,<SiAmazonaws key="aws" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/4.svg', projectImg:'/assets/portfolio/projects/02-knowledge-center-dashboard.webp', projectTitle:'Knowledge Center System',
      projectLinks:[{label:'Open Knowledge Center',url:'https://app-bible.jelvan.pro/'},{label:'Public source repository',url:'https://github.com/DevJel/knowledge-center-system'}],
      projectDescription:'An organizational knowledge and learning platform for policies, SOPs, process maps, role-based learning paths, technical references, onboarding materials and operational playbooks.',
      projectPurpose:'Give employees and managers one trusted place to find current policies, procedures, training and operational knowledge, reducing repeated questions and inconsistent practices.',
      projectFeatures:['Standalone topic and chapter pages','Searchable and shareable learning content','Step-by-step implementation guidance','Architecture and process diagrams','Examples, checklists and official references','Reference update and page maintenance guides'],
      projectAdvantages:['Makes technical knowledge easier to discover','Supports self-paced learning','Connects related topics into learning paths','Encourages verification against official sources'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
      projectTechnologies:['HTML','CSS','JavaScript','Cloudflare Pages','Markdown documentation'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>],
    },

    {
      slideNumberImg:'/assets/portfolio/5.svg', projectImg:'/assets/portfolio/projects/04-hris-dashboard.webp', projectTitle:'HR Information System',
      projectLinks:[{label:'Public source repository',url:'https://github.com/DevJel/jelhr-system'}],
      projectLinkNote:'Development prototype. Do not use for real employee or payroll records until production security and operational checks are complete.',
      projectDescription:'A modular Human Resources Information System designed around the complete employee lifecycle: workforce planning, requisition, recruitment, candidate assessment, pre-employment checks, offers, onboarding, employee records, time and attendance, leave, performance, learning, employee relations, compensation and benefits integrations, offboarding and alumni records. The current repository is a prototype foundation; production readiness must be assessed module by module.',
      projectPurpose:'Help HR teams and managers operate a connected, auditable employee journey from the first workforce request through the final day and controlled records retention, with clear ownership and employee self-service.',
      projectFeatures:['Workforce planning, position control and headcount requests','Job requisitions, careers pages, applicant tracking and interview scorecards','Candidate consent, screening and pre-employment document collection','Offer approval, e-signature and preboarding task orchestration','Onboarding plans, policy acknowledgements, equipment and account provisioning','Employee master data, org chart, document vault and employee self-service','Time, attendance, leave, shifts and payroll/benefits integrations','Performance reviews, goals, learning, skills and succession planning','Employee relations cases, grievances and confidential case permissions','Offboarding approvals, exit checklist, asset return, access revocation and final-pay coordination','Retention schedules, audit trails, role-based access and reporting','Cloudflare Pages Functions API and D1 schema foundation'],
      projectAdvantages:['Connects the employee lifecycle instead of fragmenting HR administration','Makes approvals, ownership, deadlines and exceptions visible','Supports employee and manager self-service with role-based access','Creates a foundation for HR analytics and process improvement','Can integrate with finance, IT service management, identity and payroll systems'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
      projectTechnologies:['Cloudflare Pages','Pages Functions','D1 Database','JavaScript','HTML & CSS'],
      slideBgColor:'#ffffff', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/6.svg', projectImg:'/assets/portfolio/projects/05-bolekpad-dashboard.webp', projectTitle:'BOLEKpad | Personal Workspace',
      projectLinks:[], projectLinkNote:'Private application repository. Public description focuses on product capabilities; account-specific setup is not included.',
      projectDescription:'A configurable digital workplace concept for knowledge capture, team documentation, task coordination, calendars, document collaboration and AI-assisted productivity. It can support cross-functional teams when paired with organizational identity, retention and access policies.',
      projectPurpose:'Give teams a shared, governed workspace for work instructions, project notes, operational handovers, meeting outcomes and everyday collaboration.',
      projectFeatures:['Sticky notes and nested pages','Rich documents, slide decks and canvas','Calendar and scheduled reminders','File attachments and private storage','AI writing and workspace assistance','Email utilities and browser-based tools'],
      projectAdvantages:['Reduces context switching between tools','Keeps related notes and work materials together','Supports persistent storage and file attachments','Offers modular tools in one responsive workspace'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
      projectTechnologies:['React 19','TypeScript','Vite','Tailwind CSS','Cloudflare Workers','D1 · KV · R2','Workers AI'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiReact key="react" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/7.svg', projectImg:'/assets/portfolio/projects/06-printing-store-dashboard.webp', projectTitle:'Online Printing Store',
      projectLinks:[], projectLinkNote:'Concept showcase. A verified source repository and confirmed implementation stack have not yet been identified; technologies are intentionally not assumed.',
      projectDescription:'A digital commerce and service-ordering system that can support organizations offering physical products or print services, from catalogue discovery and configuration to quotation, payment, production, delivery and after-sales support.',
      projectPurpose:'Digitize customer-facing order journeys and connect sales, inventory, production, finance and delivery operations through traceable order records.',
      projectFeatures:['Print product catalogue concept','Product and finish selection flow','Artwork or design submission concept','Order details and quantity capture','Request confirmation and order-status concept'],
      projectAdvantages:['Makes product options easier to compare','Reduces incomplete order enquiries','Creates a clearer customer request journey','Can be extended with payment and order tracking integrations'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
      projectTechnologies:['E-commerce concept','Product catalogue','Order workflow','Stack verification pending'],
      slideBgColor:'#ffffff', technologyIcons:[<SiReact key="react" className="tech-icon"/>],
    },
    {
      slideNumberImg:'/assets/portfolio/8.svg', projectImg:'/assets/portfolio/projects/07-devai-dashboard.webp', projectTitle:'Developers Playground | DevAI',
      projectLinks:[{label:'Open xCoder',url:'https://app.xcoder.jelvan.pro/'}],
      projectLinkNote:'Development status varies by feature. Live payment, email, model and connector integrations require independent verification.',
      projectDescription:'An AI-assisted developer workspace designed to combine conversational coding support, project resources, connectors, media handling and development workflow tools in one browser-based environment.',
      projectPurpose:'Help technology teams standardize development workflows, improve delivery visibility and safely adopt AI-assisted engineering with approval gates, access controls and usage monitoring.',
      projectFeatures:['Guest question and authenticated workspace flows','AI chat and conversation history','Connector and plugin management concepts','Private media and resource handling','Model and usage controls','Review-before-send automation concepts'],
      projectAdvantages:['Brings common developer utilities together','Supports AI-assisted exploration and drafting','Provides a structured place for integrations','Designed with review and access boundaries in mind'],
      slideHeight:'100vh', projectMobileImg:PHONE_IMG,
      projectTechnologies:['Cloudflare Workers','Workers AI','D1 Database','R2 Storage','Durable Objects','Turnstile','Amazon SES'],
      slideBgColor:'#fff7f0', technologyIcons:[<SiCloudflare key="cf" className="tech-icon"/>,<SiTypescript key="ts" className="tech-icon"/>,<SiNextdotjs key="next" className="tech-icon"/>],
    },
  ];
  return { highlightedProjects };
};
