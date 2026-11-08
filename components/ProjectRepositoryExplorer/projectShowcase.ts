export type ProjectShowcaseMeta = {
  cover: string;
  backgroundColor: string;
  description: string;
  purpose: string;
  languages: string[];
  features: string[];
  advantages: string[];
};

export const projectShowcaseBySlug: Record<string, ProjectShowcaseMeta> = {
  'master-ai-multi-agent-workspace': {
    cover: '/assets/portfolio/projects/01-master-ai-dashboard.webp',
    backgroundColor: '#fff7f0',
    description: 'An organizational AI enablement layer that can support HR, finance, procurement, customer service, IT and operations through specialist assistants, knowledge retrieval and governed workflow automation. People remain accountable for decisions and approve consequential actions.',
    purpose: 'Help organizations improve service delivery and productivity by connecting approved knowledge, departmental workflows and human-reviewed AI assistance.',
    languages: ['JavaScript (ES modules)', 'SQL', 'HTML', 'CSS', 'JSON', 'Markdown'],
    features: [
      'Specialist AI assistants for distinct task categories',
      'Guided request and response workflows',
      'Knowledge-supported drafting and summaries',
      'Human review before consequential actions',
      'Separate user experiences for different access needs'
    ],
    advantages: [
      'Reduces repetitive preparation work',
      'Creates a consistent place to work with AI',
      'Keeps human approval and accountability visible',
      'Can be adapted to different team workflows'
    ]
  },
  'proctorava-learning-management-system': {
    cover: '/assets/portfolio/projects/desktopview-proctorava.png',
    backgroundColor: '#ffffff',
    description: 'PROCTORAVA is a learning and assessment management platform focused on secure candidate and learner assessment journeys, combining registration, profile completion, identity verification, assessment delivery and proctoring workflows.',
    purpose: 'Provide a consistent, auditable assessment journey from registration and identity checks through assessment completion and authorized review, while protecting candidate privacy and restricting sensitive verification data.',
    languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'SQL', 'JSON'],
    features: [
      'Applicant and learner registration with structured profiles',
      'Email one-time-password verification',
      'Phone-based identity capture and liveness workflow',
      'Assessment instructions, readiness checks and session delivery',
      'Microphone and screen permission checks before monitored sessions',
      'Browser focus-change signals and configurable review handling',
      'Separate applicant and recruitment administrator experiences',
      'Assessment status, reviewer workflow and outcome organization',
      'Server-side email notifications and candidate communications'
    ],
    advantages: [
      'Connects registration, verification and assessment in one guided journey',
      'Improves consistency of candidate readiness checks',
      'Helps reviewers organize sessions and assessment evidence',
      'Supports remote assessment with transparent candidate instructions',
      'Keeps sensitive identity and assessment records behind restricted access'
    ]
  },
  'knowledge-center-system': {
    cover: '/assets/portfolio/projects/02-knowledge-center-dashboard.webp',
    backgroundColor: '#ffffff',
    description: 'An organizational knowledge and learning platform for policies, SOPs, process maps, role-based learning paths, technical references, onboarding materials and operational playbooks.',
    purpose: 'Give employees and managers one trusted place to find current policies, procedures, training and operational knowledge, reducing repeated questions and inconsistent practices.',
    languages: ['HTML', 'CSS', 'JavaScript', 'Python', 'Markdown', 'JSON'],
    features: [
      'Standalone topic and chapter pages',
      'Searchable and shareable learning content',
      'Step-by-step implementation guidance',
      'Architecture and process diagrams',
      'Examples, checklists and official references',
      'Reference update and page maintenance guides'
    ],
    advantages: [
      'Makes technical knowledge easier to discover',
      'Supports self-paced learning',
      'Connects related topics into learning paths',
      'Encourages verification against official sources'
    ]
  },
  'internal-email-system': {
    cover: '/assets/portfolio/projects/03-internal-email-dashboard.webp',
    backgroundColor: '#fff7f0',
    description: 'A communications operations system for internal announcements, employee lifecycle notifications, recruitment correspondence, service updates, customer communications and approved outreach. Delivery is designed around provider integrations such as Amazon SES, with consent, security and audit controls.',
    purpose: 'Centralize organization-wide communications while ensuring messages are authorized, traceable, accessible and appropriate to each recipient group.',
    languages: ['JavaScript', 'SQL', 'HTML', 'CSS', 'Python', 'XML', 'Gradle', 'Markdown'],
    features: [
      'Contact and lead organization',
      'Reusable email templates and campaign drafts',
      'Sending workflow with delivery status tracking',
      'Reply and activity organization',
      'Domain and sender configuration guidance',
      'Opt-out and responsible-sending controls'
    ],
    advantages: [
      'Reduces scattered manual email work',
      'Encourages consistent communication',
      'Makes campaign activity easier to review',
      'Separates demo activity from real sending'
    ]
  },
  'hr-information-system': {
    cover: '/assets/portfolio/projects/04-hris-dashboard.webp',
    backgroundColor: '#ffffff',
    description: 'A modular Human Resources Information System designed around the complete employee lifecycle: workforce planning, requisition, recruitment, candidate assessment, pre-employment checks, offers, onboarding, employee records, time and attendance, leave, performance, learning, employee relations, compensation and benefits integrations, offboarding and alumni records. The current repository is a prototype foundation; production readiness must be assessed module by module.',
    purpose: 'Help HR teams and managers operate a connected, auditable employee journey from the first workforce request through the final day and controlled records retention, with clear ownership and employee self-service.',
    languages: ['JavaScript', 'HTML', 'CSS', 'SQL', 'Python', 'Markdown'],
    features: [
      'Workforce planning, position control and headcount requests',
      'Job requisitions, careers pages, applicant tracking and interview scorecards',
      'Candidate consent, screening and pre-employment document collection',
      'Offer approval, e-signature and preboarding task orchestration',
      'Onboarding plans, policy acknowledgements, equipment and account provisioning',
      'Employee master data, org chart, document vault and employee self-service',
      'Time, attendance, leave, shifts and payroll/benefits integrations',
      'Performance reviews, goals, learning, skills and succession planning',
      'Employee relations cases, grievances and confidential case permissions',
      'Offboarding approvals, exit checklist, asset return, access revocation and final-pay coordination',
      'Retention schedules, audit trails, role-based access and reporting',
      'Cloudflare Pages Functions API and D1 schema foundation'
    ],
    advantages: [
      'Connects the employee lifecycle instead of fragmenting HR administration',
      'Makes approvals, ownership, deadlines and exceptions visible',
      'Supports employee and manager self-service with role-based access',
      'Creates a foundation for HR analytics and process improvement',
      'Can integrate with finance, IT service management, identity and payroll systems'
    ]
  },
  'bolekpad-personal-workspace': {
    cover: '/assets/portfolio/projects/05-bolekpad-dashboard.webp',
    backgroundColor: '#fff7f0',
    description: 'A configurable digital workplace concept for knowledge capture, team documentation, task coordination, calendars, document collaboration and AI-assisted productivity. It can support cross-functional teams when paired with organizational identity, retention and access policies.',
    purpose: 'Give teams a shared, governed workspace for work instructions, project notes, operational handovers, meeting outcomes and everyday collaboration.',
    languages: ['TypeScript', 'TSX / React', 'JavaScript', 'Dart', 'SQL', 'HTML', 'CSS'],
    features: [
      'Sticky notes and nested pages',
      'Rich documents, slide decks and canvas',
      'Calendar and scheduled reminders',
      'File attachments and private storage',
      'AI writing and workspace assistance',
      'Email utilities and browser-based tools'
    ],
    advantages: [
      'Reduces context switching between tools',
      'Keeps related notes and work materials together',
      'Supports persistent storage and file attachments',
      'Offers modular tools in one responsive workspace'
    ]
  },
  'online-printing-store': {
    cover: '/assets/portfolio/projects/06-printing-store-dashboard.webp',
    backgroundColor: '#ffffff',
    description: 'A digital commerce and service-ordering system that can support organizations offering physical products or print services, from catalogue discovery and configuration to quotation, payment, production, delivery and after-sales support.',
    purpose: 'Digitize customer-facing order journeys and connect sales, inventory, production, finance and delivery operations through traceable order records.',
    languages: ['Not verified — source repository not linked'],
    features: [
      'Print product catalogue concept',
      'Product and finish selection flow',
      'Artwork or design submission concept',
      'Order details and quantity capture',
      'Request confirmation and order-status concept'
    ],
    advantages: [
      'Makes product options easier to compare',
      'Reduces incomplete order enquiries',
      'Creates a clearer customer request journey',
      'Can be extended with payment and order tracking integrations'
    ]
  },
  'developers-playground-devai': {
    cover: '/assets/portfolio/projects/07-devai-dashboard.webp',
    backgroundColor: '#fff7f0',
    description: 'An AI-assisted developer workspace designed to combine conversational coding support, project resources, connectors, media handling and development workflow tools in one browser-based environment.',
    purpose: 'Help technology teams standardize development workflows, improve delivery visibility and safely adopt AI-assisted engineering with approval gates, access controls and usage monitoring.',
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'SQL', 'Markdown', 'Shell'],
    features: [
      'Guest question and authenticated workspace flows',
      'AI chat and conversation history',
      'Connector and plugin management concepts',
      'Private media and resource handling',
      'Model and usage controls',
      'Review-before-send automation concepts'
    ],
    advantages: [
      'Brings common developer utilities together',
      'Supports AI-assisted exploration and drafting',
      'Provides a structured place for integrations',
      'Designed with review and access boundaries in mind'
    ]
  }
};
