export type ProjectShowcaseMeta = {
  cover: string;
  languages: string[];
  features: string[];
};

export const projectShowcaseBySlug: Record<string, ProjectShowcaseMeta> = {
  'master-ai-multi-agent-workspace': {
    cover: '/assets/portfolio/automation-cover.png',
    languages: ['JavaScript (ES modules)', 'SQL', 'HTML', 'CSS', 'JSON', 'Markdown'],
    features: [
      'Separate administrator, member and demonstration workspaces',
      'Specialist assistants coordinated around a shared request workflow',
      'Knowledge-supported drafting and source-aware context retrieval',
      'Human review checkpoints before consequential actions',
      'Organization and department access boundaries',
      'Operational reports, notifications and traceable work items',
      'Managed AI, email and storage integrations through server-side adapters',
      'Automated validation and repeatable test coverage'
    ]
  },
  'knowledge-center-system': {
    cover: '/assets/portfolio/laptop-lms.png',
    languages: ['HTML', 'CSS', 'JavaScript', 'Python', 'Markdown', 'JSON'],
    features: [
      'Standalone, shareable HTML chapter pages',
      'Consistent topic structure for description, architecture and implementation',
      'Mermaid diagrams with readable source files',
      'Search index and chapter registry',
      'Official references and related learning paths',
      'Chapter authoring and documentation validation scripts',
      'Scheduled reference-update Worker',
      'Static delivery through Cloudflare Pages'
    ]
  },
  'internal-email-system': {
    cover: '/assets/portfolio/email-platform.png',
    languages: ['JavaScript', 'SQL', 'HTML', 'CSS', 'Python', 'XML', 'Gradle', 'Markdown'],
    features: [
      'Lead and contact organization',
      'Reusable message templates and campaign preparation',
      'Role-separated administrator and regular-user workflows',
      'Provider-based email delivery integration with Amazon SES',
      'Recipient eligibility, suppression and opt-out controls',
      'Delivery, bounce and complaint event handling',
      'Reply and activity organization',
      'Android administrator companion project'
    ]
  },
  'hr-information-system': {
    cover: '/assets/portfolio/projects/mis-desktop.svg',
    languages: ['JavaScript', 'HTML', 'CSS', 'SQL', 'Python', 'Markdown'],
    features: [
      'Workforce planning, position control and headcount requests',
      'Recruitment, applicant tracking and interview workflows',
      'Candidate screening, consent and offer preparation',
      'Onboarding plans, policy acknowledgements and preboarding tasks',
      'Employee directory, records and manager self-service',
      'Time, attendance, shifts and leave workflows',
      'Performance, learning and employee-relations foundations',
      'Offboarding, asset return and access-revocation workflows',
      'Cloudflare Pages Functions API and D1 schema foundation',
      'Role-based access, audit and reporting foundations'
    ]
  },
  'bolekpad-personal-workspace': {
    cover: '/assets/portfolio/automation-cover.png',
    languages: ['TypeScript', 'TSX / React', 'JavaScript', 'Dart', 'SQL', 'HTML', 'CSS'],
    features: [
      'Sticky-note boards with tags, search and organization',
      'Nested pages and structured note blocks',
      'Rich documents and document templates',
      'Canvas, sketching and diagram workflows',
      'Slides and presentation workspace',
      'Calendar and scheduled reminders',
      'AI-assisted writing and workspace support',
      'Email utilities and BolekSend workflows',
      'File attachments and cloud-backed persistence',
      'Browser utilities, calculator and integrations launcher'
    ]
  },
  'online-printing-store': {
    cover: '/assets/portfolio/laptop-lms.png',
    languages: ['Not verified — source repository not linked'],
    features: [
      'Print product catalogue and configurable specifications',
      'Product options for dimensions, materials, finishes and quantities',
      'Artwork upload, validation and proof approval',
      'Quotation and customer approval workflow',
      'Shopping cart and hosted payment checkout',
      'Order status, production scheduling and fulfilment',
      'Inventory, materials and pricing administration',
      'Customer support and order-history experience'
    ]
  },
  'developers-playground-devai': {
    cover: '/assets/portfolio/projects/devai-desktop.svg',
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL', 'Markdown', 'Shell'],
    features: [
      'Conversational AI workspace and coding assistance',
      'Developer operator console with approval-gated tools',
      'Agent and scheduled automation workflows',
      'Knowledge base and retrieval-supported assistance',
      'Connector catalogue and standardized MCP access',
      'Browser automation and site-monitoring workflows',
      'GitHub repository review and proposed code changes',
      'Deployment, status and operational visibility',
      'Private media and workspace resource handling',
      'Usage, access and integration controls'
    ]
  }
};
