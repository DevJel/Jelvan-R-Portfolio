import { IGlassCard } from './Slides/GlassSkillsSlide/GlassSkillsSlide';
import { ISkill, ITechSkill } from './About.config';

const SERVICES = '/assets/portfolio/services';
const SKILLS = '/assets/portfolio/skills';

const icon = (id: number, text: string, src: string, size = 50): ISkill => ({
  id,
  text,
  iconSrc: src,
  iconSize: { height: size, width: size },
});

const rows = (items: [string, string][]): ITechSkill[] =>
  items.map(([skillSection, skillValue], index) => ({
    id: index + 1,
    skillSection,
    skillValue,
  }));

/**
 * AUTOMATION & AI AGENTS (slide 3)
 */
export const automationCards: IGlassCard[] = [
  {
    title: 'AI Agents & Knowledge',
    icons: [
      icon(1, 'AI Agent', `${SERVICES}/ai-agent.svg`),
      icon(2, 'Knowledge Base', `${SERVICES}/knowledge-base.svg`),
      icon(3, 'Documentation', `${SERVICES}/documentation.svg`),
      icon(4, 'Workflow', `${SERVICES}/workflow.svg`),
    ],
    rows: rows([
      [
        'Custom AI Agents',
        'Your own agent, built around your policies, data and tone',
      ],
      [
        'Knowledge Architecture',
        'Structuring handbooks, SOPs and FAQs so people and AI can find answers',
      ],
      [
        'Documentation Plans',
        'Detailed, aligned documentation plans for HR, IT and operations',
      ],
    ]),
  },
  {
    title: 'Example Automations',
    icons: [
      icon(1, 'Onboarding', `${SERVICES}/onboarding.svg`),
      icon(2, 'Ticket Triage', `${SERVICES}/tickets.svg`),
      icon(3, 'Invoicing', `${SERVICES}/invoice.svg`),
      icon(4, 'Email Routing', `${SERVICES}/email-routing.svg`),
      icon(5, 'Scheduled Reports', `${SERVICES}/scheduled-reports.svg`),
    ],
    rows: rows([
      [
        'Onboarding',
        'New hire form to accounts, welcome email and checklist, automatically',
      ],
      [
        'Ticket Triage',
        'AI sorts HR, payroll and IT requests and routes them to the right team',
      ],
      ['Invoicing', 'Invoices generated, sent and followed up with reminders'],
      ['Email Routing', 'Incoming mail delivered to the right inbox by rule'],
      [
        'Scheduled Reports',
        'Weekly KPI and compliance summaries sent on time',
      ],
    ]),
  },
];

/**
 * SKILLS (slide 4) - based on the resume
 */
export const skillCards: IGlassCard[] = [
  {
    title: 'Strategic HR',
    icons: [
      icon(
        1,
        'Strategic Workforce Planning',
        `${SERVICES}/workforce-planning.svg`
      ),
      icon(
        2,
        'Recruitment & Talent Acquisition',
        `${SERVICES}/talent-acquisition.svg`
      ),
      icon(
        3,
        'Employee Relations & Engagement',
        `${SERVICES}/employee-relations.svg`
      ),
      icon(
        4,
        'Policy & Documentation Drafting',
        `${SERVICES}/policy-drafting.svg`
      ),
      icon(
        5,
        'Performance & Offboarding Management',
        `${SERVICES}/performance.svg`
      ),
      icon(6, 'HR Compliance (Global & Local)', `${SERVICES}/hr-compliance.svg`),
      icon(7, 'HRIS & CRM Administration', `${SERVICES}/hris-crm.svg`),
    ],
    rows: rows([
      [
        'People',
        'Recruitment & Talent Acquisition, Employee Relations & Engagement',
      ],
      [
        'Operations',
        'Strategic Workforce Planning, Performance & Offboarding Management',
      ],
      [
        'Compliance',
        'Policy & Documentation Drafting, HR Compliance (Global & Local)',
      ],
      ['Systems', 'HRIS & CRM Administration'],
    ]),
  },
  {
    title: 'Digital & AI',
    icons: [
      icon(1, 'Cloudflare', `${SERVICES}/cloudflare.svg`),
      icon(2, 'JavaScript', `${SKILLS}/javascript-original.svg`),
      icon(3, 'TypeScript', `${SKILLS}/typescript-original.svg`),
      icon(4, 'React', `${SKILLS}/react-original.svg`),
      icon(5, 'Next.js', `${SKILLS}/nextjs-original.svg`),
      icon(6, 'Python', `${SKILLS}/python-original.svg`),
      icon(7, 'HTML', `${SKILLS}/html5-original.svg`, 55),
      icon(8, 'CSS', `${SKILLS}/css3-original.svg`, 55),
    ],
    rows: rows([
      [
        'Digital Strategy',
        'Web Layout & Design, Digital Branding, Digital Campaign Strategy',
      ],
      [
        'Communications',
        'Internal Communications Styling, Domain Administration',
      ],
      [
        'AI & Automation',
        'Automated Workflows, Business Automation, Business Intelligence',
      ],
      [
        'Process',
        'Process Mapping (Lean Six Sigma), Strategic Planning Models, Organizational Scaling',
      ],
      ['Cloud', 'Cloudflare Workers, D1, Email Routing, Workers AI'],
    ]),
  },
];

/**
 * EMAIL BRANDING & AUTHENTICATION (new slide)
 */
export const emailBrandingCards: IGlassCard[] = [
  {
    title: 'Authentication',
    icons: [
      icon(1, 'SPF', `${SERVICES}/spf.svg`),
      icon(2, 'DKIM', `${SERVICES}/dkim.svg`),
      icon(3, 'DMARC', `${SERVICES}/dmarc.svg`),
    ],
    rows: rows([
      [
        'SPF',
        'Sender Policy Framework. Lists which servers are allowed to send email for your domain',
      ],
      [
        'DKIM',
        "DomainKeys Identified Mail. Signs every message so inboxes can verify it wasn't changed",
      ],
      [
        'DMARC',
        'Domain-based Message Authentication, Reporting, and Conformance. Tells inboxes what to do with failed messages, and reports back to you',
      ],
    ]),
  },
  {
    title: 'Brand & Trust',
    icons: [
      icon(1, 'BIMI', `${SERVICES}/bimi.svg`),
      icon(2, 'S/MIME', `${SERVICES}/smime.svg`),
      icon(3, 'ACME', `${SERVICES}/acme.svg`),
    ],
    rows: rows([
      [
        'BIMI',
        'Brand Indicators for Message Identification. Shows your verified logo beside your emails. Live on my own domain',
      ],
      [
        'S/MIME',
        'Secure/Multipurpose Internet Mail Extensions. Certificate-based signing and encryption for sensitive email',
      ],
      [
        'ACME',
        'Automated Certificate Management Environment. Automatic issuing and renewal of security certificates',
      ],
    ]),
  },
];
