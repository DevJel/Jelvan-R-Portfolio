import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import PortfolioLayout from '../../components/PortfolioLayout/PortfolioLayout';
import { PAGES } from '../../utils/seo';
import Image from 'next/legacy/image';
import Navbar from '../../components/Navbar/Navbar';
import ProjectRepositoryExplorer from '../../components/ProjectRepositoryExplorer/ProjectRepositoryExplorer';
import { getProjectRepositories } from '../../components/ProjectRepositoryExplorer/projectRepositoryData';
import type { ProjectRepository } from '../../components/ProjectRepositoryExplorer/projectRepositoryData';
import { projectShowcaseBySlug } from '../../components/ProjectRepositoryExplorer/projectShowcase';
import ProjectAgentCommand from '../../components/ProjectAgentCommand/ProjectAgentCommand';

type Project = {
  slug: string; number: string; title: string; summary: string; maturity: string;
  stack: string[]; systems?: string[]; folders: { name: string; purpose: string; access: string }[];
  setup: string[]; platforms: { name: string; steps: string[] }[];
  practices: string[]; links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    slug: 'master-ai-multi-agent-workspace', number: '01', title: 'Master AI — Multi-Agent Workspace',
    summary: 'A human-reviewed AI workspace pattern for coordinating specialist assistants, preparing drafts and organizing repeatable tasks.',
    maturity: 'Private product showcase. Operational code, prompts, credentials, model routing and internal integrations are not published.',
    stack: ['Cloudflare Workers', 'Workers AI', 'D1', 'Amazon SES SMTP', 'Turnstile', 'AI orchestration'],
    systems: ['HR service desk and employee help assistant','Finance and procurement request triage','Customer support knowledge assistant','IT incident classification and routing','Policy and SOP retrieval with source citations','Workflow orchestration with approval checkpoints','Management reporting and operational insights'],
    folders: [
      { name: 'src/ or app/', purpose: 'Application entry points, interface and user workflows.', access: 'Private source — not downloadable here' },
      { name: 'workers/ or functions/', purpose: 'Server-side request handling, model calls and policy enforcement.', access: 'Private source — sanitized example recommended' },
      { name: 'database/ or migrations/', purpose: 'Versioned schema and migration scripts. Never include real user records.', access: 'Private source — schema examples only' },
      { name: 'docs/', purpose: 'Architecture, prompt lifecycle, evaluation and operator runbooks.', access: 'Public-safe documentation can be shared' },
      { name: '.env.example', purpose: 'Names and descriptions of required variables with blank placeholder values.', access: 'Template only; never real secrets' }
    ],
    setup: ['Use a supported Node.js LTS release and the package manager declared by the project.', 'Copy the example environment file to a local environment file and supply your own development credentials.', 'Create a development database and apply only reviewed migrations.', 'Run linting, type checks, unit tests and model-evaluation fixtures before starting the application.', 'Start with mock model responses; enable a real model provider only after server-side secrets and usage limits are configured.'],
    platforms: [
      { name: 'Cloudflare Workers', steps: ['Create a Worker in your own Cloudflare account.', 'Configure compatibility date, bindings and non-secret variables in wrangler configuration.', 'Create a separate D1 database for development and production; apply migrations to the intended database.', 'Store API keys with Worker secrets, not in source control.', 'Deploy a preview, test authentication, rate limits, model errors and logs, then promote to production.'] },
      { name: 'Vercel', steps: ['Import the sanitized application repository and select the detected framework.', 'Set build and output settings from the project configuration.', 'Add environment variables separately for Preview and Production.', 'Use a protected server-side API route or external Worker for privileged model calls.', 'Deploy Preview, run smoke tests and promote only after review.'] }
    ],
    practices: ['Require human confirmation before external actions or irreversible changes.', 'Treat prompts, retrieved documents and tool outputs as untrusted input.', 'Use per-user authorization, rate limits, quotas and audit events.', 'Keep model credentials server-side and rotate them on a defined schedule.', 'Evaluate quality, refusal behavior, latency and cost using repeatable test sets.', 'Do not log secrets, private prompts or unnecessary personal data.'],
    links: []
  },
  {
    slug: 'proctorava-learning-management-system', number: '02', title: 'LEARNING MANAGEMENT SYSTEM — PROCTORAVA',
    summary: 'A secure learning, applicant assessment and remote proctoring experience designed to guide candidates from registration and identity checks through assessment and authorized review.',
    maturity: 'Private product showcase. This portfolio guide describes the intended product workflow and architecture; production availability, identity-provider coverage and proctoring controls must be verified against the current deployment before operational use.',
    stack: ['Cloudflare Pages', 'Cloudflare Workers / Pages Functions', 'D1 Database', 'Amazon SES SMTP', 'Cloudflare Turnstile', 'Identity verification integration', 'Browser MediaDevices and Screen Capture APIs'],
    systems: ['Applicant and learner registration','Candidate profile and assessment eligibility','Email OTP access and account verification','Phone-based identity capture and liveness workflow','Assessment scheduling and instruction delivery','Timed assessment sessions and response capture','Browser focus-change and session-integrity events','Recruitment administrator review and outcome management','Notification and candidate communication workflows'],
    folders: [
      { name: 'applicant-portal/', purpose: 'Registration, profile, email verification, assessment instructions and candidate session experience.', access: 'Private application — publish sanitized screenshots only' },
      { name: 'admin-portal/', purpose: 'Restricted recruitment administration, assessment configuration, candidate review and status management.', access: 'Private application — never publish administrator credentials or candidate records' },
      { name: 'functions/ or workers/', purpose: 'Server-side validation, authorization, assessment session handling and provider integrations.', access: 'Private source — share architecture examples only' },
      { name: 'identity-verification/', purpose: 'Phone handoff, identity capture, liveness and verification-provider adapter.', access: 'Sensitive workflow — no identity images or verification data in public examples' },
      { name: 'database/ or migrations/', purpose: 'Candidate, assessment, session and audit-event schema with strict access boundaries.', access: 'Private schema — use synthetic examples only' },
      { name: 'docs/', purpose: 'Candidate instructions, proctoring policy, architecture, operations and incident runbooks.', access: 'Public-safe documentation may be shared after privacy review' }
    ],
    setup: ['Use a supported Node.js LTS version and the package manager declared by the application.', 'Create isolated development and production Cloudflare resources; never reuse live candidate data in development.', 'Configure D1 migrations and test with synthetic applicant and assessment records.', 'Set email delivery and identity-provider credentials only as server-side secrets; do not put credentials in the browser bundle.', 'Configure Turnstile and allowed origins for the correct environment.', 'Test email OTP expiry, resend limits, session authorization, assessment timing and recovery behavior.', 'Test camera, microphone and screen-permission flows across supported browsers and mobile devices.', 'Run accessibility, privacy, security, load and end-to-end checks before any production assessment cohort.'],
    platforms: [
      { name: 'Cloudflare Pages and Workers', steps: ['Connect the authorized repository and configure a preview environment.', 'Create separate D1 databases and apply reviewed migrations independently for preview and production.', 'Bind only the required Worker services and environment-specific resources.', 'Store SES SMTP and identity-provider credentials as server-side secrets; never commit them.', 'Configure Turnstile hostnames, CORS and session protections.', 'Deploy a preview and test applicant, administrator, identity and assessment paths using synthetic records.', 'Promote only after security, privacy, proctoring policy and operational acceptance checks.'] },
      { name: 'Amazon SES', steps: ['Verify the sending domain and required sender identity in the intended AWS region.', 'Configure SMTP credentials as protected server-side secrets.', 'Set verified sender, reply handling, bounce and complaint processing.', 'Test OTP delivery, candidate notices and operational alerts using controlled test addresses.', 'Monitor sending reputation, suppression events and delivery failures.'] }
    ],
    practices: ['Collect only identity and assessment data required for a documented purpose; publish a clear privacy notice and retention schedule.', 'Obtain informed consent and explain camera, microphone, screen capture and focus-change behavior before a monitored session.', 'Request browser permissions only when needed and provide accessible fallback or support paths.', 'Treat focus changes and browser signals as review indicators, not automatic proof of misconduct.', 'Do not claim that browser-only monitoring can prevent all cheating or guarantee identity.', 'Separate applicant access from recruitment administration and enforce authorization on every server request.', 'Protect identity images, liveness results, assessment answers and recordings with encryption, least privilege and short retention.', 'Use audit trails for assessment configuration, reviewer decisions and access to sensitive evidence.', 'Provide reasonable accommodations and a documented process for technical interruptions and appeals.', 'Run cross-browser and mobile testing; do not assume desktop screen capture APIs are available on mobile.'],
    links: []
  },
  {
    slug: 'knowledge-center-system', number: '09', title: 'Knowledge Center System',
    summary: 'A structured technical learning library with topic pages, implementation walkthroughs, diagrams, examples and references.',
    maturity: 'Public source repository and live demonstration are available. Verify current dependencies and deployment configuration before production use.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Pages', 'Markdown'],
    systems: ['Enterprise policy and SOP library','Employee onboarding and role-based learning paths','Training and compliance knowledge hub','IT runbooks and service catalogue','Product and customer support knowledge base','Versioned document and records repository'],
    folders: [
      { name: 'index.html / pages/', purpose: 'Landing page and topic or chapter content.', access: 'Public repository' },
      { name: 'assets/', purpose: 'Stylesheets, scripts, diagrams, icons and images.', access: 'Public repository' },
      { name: 'content/ or docs/', purpose: 'Learning chapters, code samples and reference material.', access: 'Public repository if present' },
      { name: 'README.md', purpose: 'Project overview, prerequisites, local run and deployment instructions.', access: 'Public repository' },
      { name: '.gitignore', purpose: 'Excludes local dependencies, build output and local environment files.', access: 'Public repository' }
    ],
    setup: ['Download or clone the public repository.', 'Inspect package.json and README; install dependencies only if a package manifest exists.', 'For a static site, open the entry page locally or use a local static server.', 'Check every internal link, image path, code sample and responsive breakpoint.', 'Run the repository build command, if defined, before deploying.'],
    platforms: [
      { name: 'Cloudflare Pages', steps: ['Connect the public Git repository.', 'Choose the framework preset or None for a plain static site.', 'Set the build command and output directory to match the repository; do not guess these values.', 'Deploy a preview and check deep links, assets and 404 handling.', 'Attach a custom domain after the preview passes.'] },
      { name: 'Vercel', steps: ['Import the repository.', 'Choose the detected framework or Other for a static site.', 'Set the output directory based on the build configuration.', 'Deploy a preview and test direct navigation to nested chapter URLs.', 'Promote the verified deployment and configure the domain.'] },
      { name: 'Netlify', steps: ['Import the Git repository.', 'Set the build command and publish directory from the project structure.', 'Add redirects or SPA fallback only if the routing architecture requires them.', 'Review the deploy preview and link integrity.', 'Publish and configure the domain and HTTPS.'] }
    ],
    practices: ['Use semantic headings and accessible navigation.', 'Keep chapters focused, dated and independently linkable.', 'Cite official vendor documentation and mark version-sensitive guidance.', 'Validate code samples and links during content review.', 'Optimize images and avoid embedding credentials or private environment details.'],
    links: [{ label: 'Public source repository', url: 'https://github.com/DevJel/knowledge-center-system' }, { label: 'Open live demonstration', url: 'https://app-bible.jelvan.pro/' }]
  },
  {
    slug: 'internal-email-system', number: '03', title: 'Internal Email System',
    summary: 'An email operations workspace concept for contact organization, templates, campaign preparation, reply workflows and responsible sending.',
    maturity: 'Private application. Public page provides architecture guidance only; no private contact data, sender identity, domain settings or mail credentials are included.',
    stack: ['Cloudflare Workers', 'D1 Database', 'Amazon SES', 'JavaScript', 'HTML & CSS'],
    systems: ['Recruitment and candidate communications','Employee lifecycle notifications and announcements','Customer service and case correspondence','Vendor and procurement communications','Approved campaign and stakeholder updates','Bounce, complaint, unsubscribe and delivery event management'],
    folders: [
      { name: 'frontend/', purpose: 'Sanitized interface components, forms and campaign preview screens.', access: 'Private source — demo recreation only' },
      { name: 'worker/ or api/', purpose: 'Server-side validation, authorization and mail-provider integration.', access: 'Private source — never expose production handlers' },
      { name: 'database/migrations/', purpose: 'Contact, campaign, suppression and event schema examples.', access: 'Private source — use synthetic records' },
      { name: 'templates/', purpose: 'Reusable HTML and text email templates with placeholder data.', access: 'Share only generic templates' },
      { name: 'docs/', purpose: 'SES setup, domain authentication, bounce handling and operations guides.', access: 'Public-safe guide; omit real domains and account identifiers' }
    ],
    setup: ['Create a local demo using synthetic contacts and a mock email adapter.', 'Configure provider credentials only in server-side secret storage.', 'Implement authorization and verify the caller can access the requested audience.', 'Add suppression checks, unsubscribe handling and sending limits before enabling delivery.', 'Test rendering, links, bounce and complaint events in a sandbox or test environment.'],
    platforms: [
      { name: 'Cloudflare Workers + D1', steps: ['Deploy the API Worker from your own repository.', 'Create a D1 database and apply reviewed migrations.', 'Bind the database in the Worker configuration.', 'Store SES credentials or use an approved short-lived role strategy in server-side secrets.', 'Configure verified sending identities, region, SPF, DKIM and DMARC; test in the provider sandbox before production.'] },
      { name: 'AWS', steps: ['Create an isolated application environment and least-privilege IAM identity.', 'Verify the sending domain or address in SES in the intended region.', 'Publish and validate SPF, DKIM and DMARC DNS records.', 'Configure event destinations for bounces, complaints and delivery events.', 'Request production access, establish quotas and monitor reputation before ramping volume.'] }
    ],
    practices: ['Send only to contacts with a valid lawful basis and honor opt-outs promptly.', 'Use suppression lists and idempotency keys to prevent duplicate sends.', 'Validate sender identity and recipient input on the server.', 'Apply tenant isolation, role checks, audit logs and per-tenant quotas.', 'Protect templates against injection and escape all user-controlled content.', 'Monitor bounce and complaint rates; pause sending when thresholds are exceeded.'],
    links: []
  },
  {
    slug: 'hr-information-system', number: '04', title: 'HR Information System',
    summary: 'A modular HR application prototype for employee lifecycle workflows, directory views, onboarding, offboarding and administrative processes.',
    maturity: 'Public repository. Prototype or demo modules must not be treated as production HR, payroll or employee-record software without a full security and compliance review.',
    stack: ['Cloudflare Pages', 'Pages Functions', 'D1 Database', 'JavaScript', 'HTML & CSS'],
    systems: ['Workforce planning and position control','Applicant tracking and recruitment operations','Pre-employment screening and offer management','Onboarding and employee self-service','Employee records, org chart and document management','Time, attendance, shifts and leave management','Performance, learning and career development','Employee relations and case management','Compensation, benefits and payroll integrations','Offboarding, asset recovery and identity access revocation','HR analytics, audit and compliance reporting'],
    folders: [
      { name: 'public/ or assets/', purpose: 'Static interface assets, icons and styles.', access: 'Public repository' },
      { name: 'functions/ or api/', purpose: 'Server-side API routes and request validation.', access: 'Public repository' },
      { name: 'migrations/', purpose: 'Database schema changes and seed data.', access: 'Public repository; inspect for demo data' },
      { name: 'scripts/', purpose: 'Build, validation and maintenance scripts.', access: 'Public repository if present' },
      { name: 'README.md', purpose: 'Setup, configuration, architecture and known limitations.', access: 'Public repository' }
    ],
    setup: ['Clone the public repository and inspect its README and package manifest.', 'Install the declared dependencies and create a local development database.', 'Use synthetic employee records only; do not import real personnel data.', 'Apply migrations and configure local bindings from documented examples.', 'Run tests and manually verify role boundaries, session expiry and authorization failures.'],
    platforms: [
      { name: 'Cloudflare Pages + D1', steps: ['Connect the repository to Pages and select its actual build settings.', 'Create a separate D1 database for development and production.', 'Bind D1 to Pages Functions and apply migrations using the documented environment.', 'Configure authentication, session secrets and Turnstile only through protected settings.', 'Test direct API access, role permissions, data export, backup and restore before launch.'] },
      { name: 'Vercel', steps: ['Import the frontend and configure its framework build.', 'Move API routes to supported serverless functions or a separately hosted API.', 'Replace Cloudflare-specific D1 bindings with a supported database adapter.', 'Set environment variables separately for preview and production.', 'Test authorization and data residency requirements before production release.'] }
    ],
    practices: ['Use least-privilege role-based access and deny access by default.', 'Encrypt data in transit and at rest; protect backups and exports.', 'Keep employee data out of logs, analytics and demo fixtures.', 'Record access to sensitive records and administrative changes.', 'Define retention, correction, deletion and incident-response procedures.', 'Obtain legal and privacy review for the jurisdictions where the system operates.'],
    links: [{ label: 'Public source repository', url: 'https://github.com/DevJel/jelhr-system' }]
  },
  {
    slug: 'bolekpad-personal-workspace', number: '05', title: 'BOLEKpad — Personal Workspace',
    summary: 'A personal productivity workspace concept combining notes, documents, pages, calendar utilities, attachments and AI-assisted tools.',
    maturity: 'Private application. The public showcase does not expose private source, account data, service endpoints or production configuration.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Workers', 'D1 · KV · R2', 'Workers AI'],
    systems: ['Team knowledge and work instructions','Meeting notes and action tracking','Project and task coordination','Document collaboration and version history','Operational handover and shift notes','Personal productivity and reminders'],
    folders: [
      { name: 'src/', purpose: 'React application, routes, reusable UI and client state.', access: 'Private source — sanitized demo only' },
      { name: 'worker/ or api/', purpose: 'Authenticated server-side operations and service integrations.', access: 'Private source — sanitized interface contracts only' },
      { name: 'database/migrations/', purpose: 'Notes, pages, ownership and metadata schema examples.', access: 'Private source — synthetic data only' },
      { name: 'storage/', purpose: 'Attachment metadata and object-storage adapter examples.', access: 'Private source — never publish user files' },
      { name: 'docs/', purpose: 'Local setup, architecture, backup and recovery procedures.', access: 'Public-safe documentation only' }
    ],
    setup: ['Create a sanitized demo with local sample notes and placeholder attachments.', 'Install dependencies using the lockfile and declared package manager.', 'Configure local API and storage adapters; avoid production service credentials.', 'Run type checks, linting and tests for note ownership and file permissions.', 'Verify attachment size limits, content-type validation and safe download behavior.'],
    platforms: [
      { name: 'Cloudflare Pages + Workers', steps: ['Deploy the Vite frontend to Pages using the repository build output.', 'Deploy the API Worker separately and configure a restricted origin.', 'Create D1, KV and R2 resources in your own account and bind them explicitly.', 'Use migrations for D1 and server-side secrets for external providers.', 'Test CORS, authentication, ownership checks, storage limits and restore procedures.'] },
      { name: 'Vercel', steps: ['Import the Vite frontend and configure its build and output directory.', 'Host the API on Vercel Functions or a separately managed backend.', 'Select compatible database and object storage services; replace Cloudflare bindings.', 'Set secrets in the project environment settings, not in Vite client variables.', 'Deploy Preview and validate upload/download flows and authorization.'] }
    ],
    practices: ['Enforce ownership checks on every read, update, delete and download.', 'Validate file size, extension, MIME type and file content; scan uploads where appropriate.', 'Use signed, short-lived download URLs for private files.', 'Back up user data and test restoration regularly.', 'Keep private AI prompts and provider keys on the server.', 'Provide export and deletion controls and clear data-retention rules.'],
    links: []
  },
  {
    slug: 'online-printing-store', number: '06', title: 'Online Printing Store',
    summary: 'A digital commerce and order-management concept for print products and business services, connecting customers with quoting, customization, payment, production and delivery workflows.',
    maturity: 'Concept showcase. The source repository and production stack have not been verified. This guide describes a recommended reference architecture, not a claim of an existing implementation.',
    stack: ['E-commerce concept', 'Product catalogue', 'Order workflow', 'Stack verification pending'],
    systems: ['Product catalogue and configurable print specifications','Customer accounts and organization purchasing profiles','Quotation and approval workflow','Artwork upload, proofing and revision management','Shopping cart, checkout and payment reconciliation','Inventory, materials and production scheduling','Order tracking, delivery and fulfilment','Customer support, returns and service recovery','Sales, finance and operational reporting'],
    folders: [
      { name: 'apps/storefront/', purpose: 'Customer catalogue, product configuration, cart and checkout experience.', access: 'Reference folder structure only; source repo not yet identified' },
      { name: 'apps/admin/', purpose: 'Product, pricing, order, customer and production administration.', access: 'Recommended module; not verified as implemented' },
      { name: 'services/orders/', purpose: 'Order lifecycle, status transitions, quotations and payment reconciliation.', access: 'Recommended module; not verified as implemented' },
      { name: 'services/uploads/', purpose: 'Artwork validation, secure file storage, preview and proof workflow.', access: 'Recommended module; not verified as implemented' },
      { name: 'database/migrations/', purpose: 'Product, variant, inventory, order and audit schemas with synthetic seed data.', access: 'Recommended module; not verified as implemented' },
      { name: 'docs/ and tests/', purpose: 'Architecture, payment threat model, order-state tests and deployment runbooks.', access: 'Recommended documentation structure' }
    ],
    setup: ['Choose the commerce framework and database only after confirming catalogue complexity, tax, shipping and payment requirements.', 'Create a local demo with synthetic products, test artwork and sandbox payment credentials.', 'Define product variants, print dimensions, material, finish, quantity tiers and pricing rules.', 'Implement a server-side order state machine and payment webhook verification.', 'Test artwork upload limits, file scanning, proof approval, refunds and duplicate webhook handling.'],
    platforms: [
      { name: 'Vercel', steps: ['Deploy the storefront using the framework preset and verified build settings.', 'Host privileged order and payment routes server-side; never expose payment secrets to the browser.', 'Connect a managed relational database and private object storage.', 'Configure payment provider webhooks with signature verification and idempotency.', 'Test checkout, inventory reservation, order confirmation and refunds in sandbox mode before launch.'] },
      { name: 'AWS', steps: ['Choose a deployment pattern such as App Runner, ECS or serverless based on workload and team capability.', 'Use a managed database and private object storage with lifecycle policies.', 'Store payment and email credentials in a managed secret service.', 'Place the storefront behind a CDN and web application firewall.', 'Configure payment webhooks, queue-based order processing, monitoring and backups.'] }
    ],
    practices: ['Never store raw payment-card details; use a compliant hosted payment provider.', 'Verify payment webhooks, signatures, idempotency and order-state transitions.', 'Scan and validate customer artwork; restrict file type, size and access.', 'Separate customer, staff and administrator permissions.', 'Keep price calculations server-side and record pricing snapshots on each order.', 'Track inventory changes, refunds and manual overrides with audit events.'],
    links: []
  },
  {
    slug: 'developers-playground-devai', number: '07', title: 'Developers Playground — DevAI',
    summary: 'A developer-focused AI workspace concept for assisted coding, project resources, integrations and repeatable development workflows.',
    maturity: 'Private application. Live feature availability and provider integrations can change; no private code, API keys or internal connector configuration is published.',
    stack: ['Cloudflare Workers', 'Workers AI', 'D1 Database', 'R2 Storage', 'Durable Objects', 'Turnstile', 'Amazon SES'],
    systems: ['Developer portal and project workspace','Software development lifecycle and release tracking','Code review and secure coding assistance','Integration and API catalogue','Engineering knowledge base and runbooks','Environment and deployment management','AI usage governance and cost monitoring'],
    folders: [
      { name: 'web/ or src/', purpose: 'User interface, editor and project workspace screens.', access: 'Private source — sanitized demo only' },
      { name: 'api/ or workers/', purpose: 'Model orchestration, connector calls and server-side policy checks.', access: 'Private source — sanitized examples only' },
      { name: 'integrations/', purpose: 'Provider adapters with documented interfaces and mock implementations.', access: 'Public-safe mock adapters recommended' },
      { name: 'database/migrations/', purpose: 'Conversation, project and usage metadata schema examples.', access: 'Private source — synthetic records only' },
      { name: 'tests/ and docs/', purpose: 'Evaluation fixtures, threat model, setup and operational guides.', access: 'Public-safe documentation only' }
    ],
    setup: ['Start with the sanitized demo and mock provider adapters.', 'Install dependencies from the lockfile and configure local development variables.', 'Create local database and object-storage substitutes where possible.', 'Run unit, integration and prompt-injection tests.', 'Enable live provider connections only after permissions, budgets, quotas and secrets are configured.'],
    platforms: [
      { name: 'Cloudflare Workers', steps: ['Deploy the frontend to Pages or Workers Static Assets as appropriate.', 'Deploy API and orchestration Workers with explicit bindings.', 'Create D1, R2 and Durable Objects resources and apply migrations.', 'Store provider credentials as Worker secrets and configure rate limits.', 'Test connector authorization, tenant isolation, model timeouts and usage caps before promotion.'] },
      { name: 'Vercel', steps: ['Import the frontend and configure its framework build.', 'Deploy API routes as serverless functions or keep orchestration in a separate service.', 'Replace Cloudflare-specific storage and Durable Object dependencies with compatible services.', 'Set preview and production secrets independently.', 'Test streaming, function timeouts, provider failure handling and cost controls.'] }
    ],
    practices: ['Treat repository files, prompts, terminal output and tool responses as untrusted.', 'Require explicit approval for shell commands, file writes and external side effects.', 'Sandbox code execution and isolate each user or project workspace.', 'Use scoped tokens, short-lived credentials and audit logs.', 'Apply rate limits, usage budgets and timeouts to model and tool calls.', 'Never send private source code to external models without clear user consent.'],
    links: [{ label: 'Open xCoder demonstration', url: 'https://app.xcoder.jelvan.pro/' }]
  }
];

const commonPlatforms = [
  { name: 'Netlify', steps: ['Import the repository and select the correct framework preset.', 'Set the build command and publish directory from the project configuration.', 'Add environment variables in the Netlify UI; never commit secrets.', 'Test the deploy preview, redirects, headers and forms before publishing.'] },
  { name: 'Self-hosted / Docker', steps: ['Create a production build using the project’s documented command.', 'Build a minimal, non-root container image and pin dependency versions.', 'Inject secrets at runtime through the hosting platform’s secret manager.', 'Terminate TLS at a trusted proxy, configure health checks and resource limits.', 'Set up backups, centralized logs, monitoring and a tested rollback process.'] }
];

const ProjectDetailPage: NextPage<{
  project: Project;
  repositories: ProjectRepository[];
}> = ({ project, repositories }) => {
  const showcase = projectShowcaseBySlug[project.slug];
  const seo = {
    ...PAGES.projects,
    title: project.title + ' | Projects | Jelvan Ricolcol',
    description: project.summary,
    path: '/projects/' + project.slug
  };

  return (
    <PortfolioLayout seo={seo}>
      <Navbar isLogoExpanded={true} />
      <main className="project-detail-shell" style={{ backgroundColor: showcase.backgroundColor }}>
        <Link href="/projects" className="project-detail-back">← Back to all projects</Link>

        <header className="project-detail-hero">
          <div className="project-detail-hero__media">
            <Image
              src={showcase.cover}
              height={900}
              width={1440}
              layout="responsive"
              quality={95}
              objectFit="contain"
              alt={project.title + ' project preview'}
              priority
            />
          </div>
          <div className="project-detail-hero__content">
            <span className="project-detail-eyebrow">
              PROJECT {project.number} / DETAIL & ENGINEERING GUIDE
            </span>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-summary">{project.summary}</p>
            <div className="project-detail-status">{project.maturity}</div>

            <p className="project-detail-eyebrow">PLATFORM & INFRASTRUCTURE</p>
            <div className="project-detail-tags">
              {project.stack.map((item) => (
                <span className="project-detail-tag" key={item}>{item}</span>
              ))}
            </div>

            <p className="project-detail-eyebrow" style={{ marginTop: '1rem' }}>LANGUAGES & FORMATS</p>
            <div className="project-detail-tags">
              {showcase.languages.map((item) => (
                <span className="project-detail-tag project-detail-tag--orange" key={item}>{item}</span>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="project-detail-actions">
                {project.links.map((link) => (
                  <a
                    className="project-detail-action"
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">OVERVIEW</span>
          <h2>Project overview</h2>
          <p className="project-detail-intro">{showcase.description}</p>
          <div className="project-detail-status">
            <strong>Project status:</strong> {project.maturity}
          </div>
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">PURPOSE</span>
          <h2>Why this project exists</h2>
          <div className="project-detail-card">
            <p>{showcase.purpose}</p>
          </div>
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">CAPABILITIES</span>
          <h2>Key features</h2>
          <p className="project-detail-intro">
            The feature summary follows the project showcase description. Implementation status
            and production readiness should be checked against the linked release and repository.
          </p>
          <div className="project-detail-feature-grid">
            {showcase.features.map((feature, index) => (
              <article className="project-detail-card" key={feature}>
                <span className="project-detail-number">{String(index + 1).padStart(2, '0')}</span>
                <p>{feature}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">VALUE</span>
          <h2>Project advantages</h2>
          <div className="project-detail-feature-grid">
            {showcase.advantages.map((advantage, index) => (
              <article className="project-detail-card" key={advantage}>
                <span className="project-detail-number">{String(index + 1).padStart(2, '0')}</span>
                <p>{advantage}</p>
              </article>
            ))}
          </div>
        </section>

        {project.systems && (
          <section className="project-detail-section">
            <span className="project-detail-eyebrow">SOLUTION SCOPE</span>
            <h2>Related organizational systems and modules</h2>
            <p className="project-detail-intro">
              These are related capability areas and integration opportunities. They are not a
              claim that every listed module is already implemented in the current release.
            </p>
            <div className="project-detail-system-grid">
              {project.systems.map((item, index) => (
                <article className="project-detail-card" key={item}>
                  <span className="project-detail-number">{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">SOURCE CODE & STRUCTURE</span>
          <ProjectRepositoryExplorer repositories={repositories} projectTitle={project.title} />
        </section>

        <section className="project-detail-section">
          <ProjectAgentCommand
            projectTitle={project.title}
            repositoryUrl={repositories[0]?.repoUrl}
            repositoryVisibility={repositories[0]?.visibility ?? 'concept / unverified source'}
          />
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">DEVELOPMENT</span>
          <h2>Local installation and preparation</h2>
          <ol className="project-detail-list">
            {project.setup.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">DELIVERY</span>
          <h2>Deployment options</h2>
          <p className="project-detail-intro">
            Choose the platform that matches the project architecture. Build commands, output
            folders, bindings and runtime compatibility must be taken from the actual repository
            configuration rather than copied blindly.
          </p>
          <div className="project-detail-platform-grid">
            {[...project.platforms, ...commonPlatforms].map((platform) => (
              <article className="project-detail-card" key={platform.name}>
                <h3>{platform.name}</h3>
                <ol className="project-detail-list">
                  {platform.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </article>
            ))}
          </div>
        </section>

        {project.slug === 'hr-information-system' && (
          <section className="project-detail-section">
            <span className="project-detail-eyebrow">EMPLOYEE LIFECYCLE</span>
            <h2>End-to-end HR lifecycle blueprint</h2>
            <div className="project-detail-card">
              <ol className="project-detail-list">
                <li><strong>Plan:</strong> workforce plans, budgets, organization structure, job families and position approvals.</li>
                <li><strong>Attract:</strong> career site, requisitions, job publishing, candidate CRM and referral management.</li>
                <li><strong>Select:</strong> applicant tracking, screening consent, interview scheduling, scorecards and decision records.</li>
                <li><strong>Pre-employment:</strong> conditional offers, checks, references and document collection where lawful.</li>
                <li><strong>Onboard:</strong> e-signatures, policy acknowledgements, employee profile, equipment and identity provisioning.</li>
                <li><strong>Employ:</strong> employee self-service, HR case management, time, attendance, leave, payroll and benefits interfaces.</li>
                <li><strong>Develop:</strong> goals, performance reviews, learning, skills, certifications, succession and internal mobility.</li>
                <li><strong>Offboard:</strong> approvals, exit interview, knowledge transfer, asset return, access revocation and final-pay coordination.</li>
                <li><strong>Retain and learn:</strong> retention schedules, alumni options, audit evidence and workforce analytics.</li>
              </ol>
            </div>
          </section>
        )}

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">ENGINEERING PRACTICE</span>
          <h2>Engineering and security best practices</h2>
          <ul className="project-detail-list">
            {project.practices.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-detail-release">
            <h2>Before production release</h2>
            <p>
              Confirm ownership, licensing, environment separation, authentication, authorization,
              backups, monitoring, accessibility, performance and incident-response readiness.
              Run a clean install and a complete test/build on the exact commit intended for
              deployment. Publish only sanitized assets and synthetic data.
            </p>
          </div>
        </section>

        <section className="project-detail-section">
          <span className="project-detail-eyebrow">REFERENCE</span>
          <h2>Official platform documentation</h2>
          <p className="project-detail-intro">
            Use current vendor documentation for exact CLI syntax, build settings, supported
            runtimes, binding configuration and platform limits.
          </p>
          <div className="project-detail-actions">
            <a className="project-detail-action" href="https://developers.cloudflare.com/pages/" target="_blank" rel="noopener noreferrer">Cloudflare Pages ↗</a>
            <a className="project-detail-action" href="https://developers.cloudflare.com/workers/" target="_blank" rel="noopener noreferrer">Cloudflare Workers ↗</a>
            <a className="project-detail-action" href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer">Vercel ↗</a>
            <a className="project-detail-action" href="https://docs.aws.amazon.com/" target="_blank" rel="noopener noreferrer">AWS ↗</a>
            <a className="project-detail-action" href="https://docs.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify ↗</a>
            <a className="project-detail-action" href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker ↗</a>
          </div>
        </section>

        <footer className="project-detail-footer">
          <Link href="/projects">← All selected projects</Link>
          <Link href="/portfolio/contact">Discuss a project →</Link>
        </footer>
      </main>
    </PortfolioLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map(project => ({ params: { slug: project.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find((item) => item.slug === params?.slug);
  if (!project) return { notFound: true };
  const repositories = await getProjectRepositories(project.slug);
  return { props: { project, repositories } };
};

export default ProjectDetailPage;
