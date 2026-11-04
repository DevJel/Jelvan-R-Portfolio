import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import PortfolioLayout from '../../../components/PortfolioLayout/PortfolioLayout';
import { PAGES } from '../../../utils/seo';

type Project = {
  slug: string; number: string; title: string; summary: string; maturity: string;
  stack: string[]; folders: { name: string; purpose: string; access: string }[];
  setup: string[]; platforms: { name: string; steps: string[] }[];
  practices: string[]; links: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    slug: 'master-ai-multi-agent-workspace', number: '01', title: 'Master AI — Multi-Agent Workspace',
    summary: 'A human-reviewed AI workspace pattern for coordinating specialist assistants, preparing drafts and organizing repeatable tasks.',
    maturity: 'Private product showcase. Operational code, prompts, credentials, model routing and internal integrations are not published.',
    stack: ['Cloudflare Workers', 'Workers AI', 'D1', 'TypeScript / JavaScript', 'AI orchestration'],
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
    slug: 'knowledge-center-system', number: '02', title: 'Knowledge Center System',
    summary: 'A structured technical learning library with topic pages, implementation walkthroughs, diagrams, examples and references.',
    maturity: 'Public source repository and live demonstration are available. Verify current dependencies and deployment configuration before production use.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Pages', 'Markdown'],
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
    stack: ['Cloudflare Workers', 'D1', 'Amazon SES', 'JavaScript', 'HTML / CSS'],
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
    stack: ['Cloudflare Pages', 'Pages Functions', 'D1', 'JavaScript', 'HTML / CSS'],
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
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Cloudflare Workers', 'D1 / KV / R2'],
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
    slug: 'developers-playground-devai', number: '07', title: 'Developers Playground — DevAI',
    summary: 'A developer-focused AI workspace concept for assisted coding, project resources, integrations and repeatable development workflows.',
    maturity: 'Private application. Live feature availability and provider integrations can change; no private code, API keys or internal connector configuration is published.',
    stack: ['Cloudflare Workers', 'Workers AI', 'D1', 'R2', 'Durable Objects', 'Turnstile'],
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

const ProjectDetailPage: NextPage<{ project: Project }> = ({ project }) => (
  <PortfolioLayout seo={PAGES.projects}>
    <main className="detail-shell">
      <Link href="/projects" className="back-link">← Back to all projects</Link>
      <header className="hero">
        <span className="eyebrow">PROJECT {project.number} / IMPLEMENTATION GUIDE</span>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="status">{project.maturity}</div>
        <div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
      </header>
      <section><h2>Source folders and resources</h2><p className="intro">Use this directory as a map when exploring or preparing a safe download. Only repositories explicitly marked public are linked. Private application code is not copied into this public portfolio.</p>
        <div className="folder-grid">{project.folders.map(folder => <article className="panel" key={folder.name}><h3><code>{folder.name}</code></h3><p>{folder.purpose}</p><small>{folder.access}</small></article>)}</div>
        {project.links.length > 0 && <div className="actions">{project.links.map(link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div>}
      </section>
      <section><h2>Local installation and preparation</h2><ol className="steps">{project.setup.map(step => <li key={step}>{step}</li>)}</ol></section>
      <section><h2>Deployment options</h2><p className="intro">Choose the platform that matches the project architecture. Build commands, output folders, bindings and runtime compatibility must be taken from the actual repository configuration rather than copied blindly.</p>
        <div className="platform-grid">{[...project.platforms, ...commonPlatforms].map(platform => <article className="panel" key={platform.name}><h3>{platform.name}</h3><ol>{platform.steps.map(step => <li key={step}>{step}</li>)}</ol></article>)}</div>
      </section>
      <section><h2>Engineering and security best practices</h2><ul className="practice-list">{project.practices.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="release"><h2>Before production release</h2><p>Confirm ownership, licensing, environment separation, authentication, authorization, backups, monitoring, accessibility, performance and incident-response readiness. Run a clean install and a complete test/build on the exact commit intended for deployment. Publish only sanitized assets and synthetic data.</p></section>
      <footer><Link href="/projects">Explore another project →</Link></footer>
    </main>
    <style jsx>{`
      .detail-shell{max-width:1180px;margin:0 auto;padding:7rem 5vw 5rem;color:#252525}
      .back-link,footer a{color:#b9570b;text-decoration:none;font-weight:700}.hero{padding:3rem 0 2.5rem;border-bottom:1px solid #eadfd5}
      .eyebrow{color:#c9671c;font-size:.78rem;font-weight:800;letter-spacing:.14em}.hero h1{font-size:clamp(2.2rem,5vw,4.3rem);line-height:1.05;margin:1rem 0;color:#242424}
      .hero>p,.intro{font-size:1.08rem;line-height:1.7;max-width:850px;color:#5d5a57}.status{margin:1.5rem 0;padding:1rem 1.2rem;background:#fff4e9;border-left:3px solid #f48120;border-radius:8px;line-height:1.55}
      .tags{display:flex;flex-wrap:wrap;gap:.55rem}.tags span{background:#f3f1ef;border:1px solid #e7e1dc;border-radius:99px;padding:.45rem .75rem;font-size:.82rem}
      section{padding:2.4rem 0;border-bottom:1px solid #eee7e1}h2{font-size:clamp(1.5rem,3vw,2.1rem);margin:0 0 1rem}h3{margin:.1rem 0 .7rem}p{line-height:1.65}
      .folder-grid,.platform-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:1rem}.panel{background:#fff;border:1px solid #e9e2dc;border-radius:14px;padding:1.2rem;box-shadow:0 8px 28px #3b24100a}
      .panel p{color:#5e5a56}.panel small{color:#a65313;font-weight:700}.panel ol{padding-left:1.2rem}.panel li,.steps li,.practice-list li{line-height:1.65;margin:.65rem 0}
      .steps{padding-left:1.5rem;max-width:900px}.practice-list{padding-left:1.4rem;columns:2;column-gap:3rem}.practice-list li{break-inside:avoid}
      .actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:1.2rem}.actions a{display:inline-block;background:#262626;color:white;padding:.8rem 1rem;border-radius:8px;text-decoration:none;font-weight:700}
      .release{background:#fff8f2;padding:1.5rem;border:1px solid #f2dfcf;border-radius:14px;margin-top:2rem}footer{padding:2rem 0}
      @media(max-width:650px){.detail-shell{padding-top:5.5rem}.practice-list{columns:1}.hero{padding-top:2rem}}
    `}</style>
  </PortfolioLayout>
);

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: projects.map(project => ({ params: { slug: project.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = projects.find(item => item.slug === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};

export default ProjectDetailPage;
