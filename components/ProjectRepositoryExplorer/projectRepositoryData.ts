export type RepositoryVisibility = 'public' | 'private' | 'concept';
export type RepositoryTreeEntry = {
  path: string;
  type: 'tree' | 'blob';
  size?: number;
  sha?: string;
};
export type ProjectRepository = {
  id: string;
  label: string;
  fullName?: string;
  branch: string;
  visibility: RepositoryVisibility;
  repoUrl?: string;
  note: string;
  treeLabel: string;
  treeSource: 'github' | 'fallback' | 'sanitized' | 'blueprint';
  tree: RepositoryTreeEntry[];
  previewPaths?: string[];
  showcaseFiles?: Record<string, string>;
};

const makeTree = (paths: string[]): RepositoryTreeEntry[] => {
  const entries = new Map<string, RepositoryTreeEntry>();
  paths.forEach((path) => {
    const parts = path.split('/');
    for (let index = 1; index <= parts.length; index += 1) {
      const currentPath = parts.slice(0, index).join('/');
      const isFile = index === parts.length;
      if (!entries.has(currentPath)) {
        entries.set(currentPath, { path: currentPath, type: isFile ? 'blob' : 'tree' });
      }
    }
  });
  return Array.from(entries.values()).sort((a, b) => a.path.localeCompare(b.path));
};

const masterFiles: Record<string, string> = {
  'README.md': [
    '# MASTER AI — public showcase',
    '',
    'This page is a sanitized portfolio sample for an organization-wide AI operations workspace.',
    'The private application repository remains access-controlled. This example contains no',
    'production prompts, credentials, organization records, internal endpoints or live settings.',
    '',
    '## Demonstrated capabilities',
    '- Specialist assistant patterns and coordinated task preparation.',
    '- Knowledge-supported drafting with source-aware context.',
    '- Human review before consequential actions.',
    '- Separate experiences for administrators, members and demonstrations.',
    '- Auditable work items and controlled service adapters.'
  ].join('\n'),
  'docs/architecture/overview.md': [
    '# Architecture overview',
    '',
    'The public-safe reference separates the browser experience, request coordinator, specialist',
    'workers, approved knowledge, persistence and human approval. Provider credentials remain',
    'server-side and are never included in a browser bundle.',
    '',
    'A request is validated, assigned to an appropriate specialist, enriched with approved context,',
    'prepared as a draft and returned for a person to review before an external action.'
  ].join('\n'),
  'docs/diagrams/overview.mmd': [
    'flowchart TD',
    '  A[User request] --> B[Access and policy checks]',
    '  B --> C[Coordinator]',
    '  C --> D[Specialist assistant]',
    '  D --> E[Approved knowledge]',
    '  E --> F[Draft work item]',
    '  F --> G{Human approval}',
    '  G -->|Approved| H[Controlled action adapter]',
    '  G -->|Changes needed| C',
    '  H --> I[Audit event]'
  ].join('\n'),
  'src/agent-example.js': [
    'export function prepareWorkItem(input) {',
    '  const title = String(input?.title ?? "Untitled request").trim();',
    '  const context = Array.isArray(input?.approvedContext) ? input.approvedContext : [];',
    '',
    '  return {',
    '    title,',
    '    context,',
    '    status: "draft",',
    '    requiresHumanReview: true',
    '  };',
    '}'
  ].join('\n'),
  'migrations/example-schema.sql': [
    '-- Synthetic example only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_work_items (',
    '  id TEXT PRIMARY KEY,',
    '  title TEXT NOT NULL,',
    '  status TEXT NOT NULL DEFAULT "draft",',
    '  requires_human_review INTEGER NOT NULL DEFAULT 1,',
    '  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP',
    ');'
  ].join('\n'),
  'docs/screenshots/README.md': [
    '# Showcase screenshots',
    '',
    'Place approved, sanitized interface screenshots in this folder.',
    'Use synthetic records and remove account names, email addresses, tenant identifiers and',
    'environment details before publishing.'
  ].join('\n')
};

const emailFiles: Record<string, string> = {
  'README.md': [
    '# Internal Email System — public showcase',
    '',
    'A sanitized overview of an email operations workspace for contact organization, message',
    'templates, campaign preparation, delivery events and reply handling.',
    'The original repository is private. The examples below do not send mail and contain no',
    'real recipients, sender identities, provider credentials or production configuration.'
  ].join('\n'),
  'outreach/docs/architecture.md': [
    '# Email workflow architecture',
    '',
    'The browser submits a validated request to a server-side worker. The worker checks role access,',
    'recipient eligibility, suppression rules and sending limits before handing an approved message',
    'to a mail-provider adapter. Delivery and reply events are normalized for the activity timeline.',
    '',
    'Demo mode uses a mock adapter and synthetic contacts.'
  ].join('\n'),
  'outreach/docs/diagrams/delivery-flow.mmd': [
    'flowchart TD',
    '  A[Draft message] --> B[Validate audience]',
    '  B --> C[Check consent and suppression]',
    '  C --> D[Review and approve]',
    '  D --> E[Provider adapter]',
    '  E --> F[Delivery event]',
    '  F --> G[Activity timeline]',
    '  F --> H[Reply or unsubscribe event]'
  ].join('\n'),
  'outreach/src/email-workflow.example.js': [
    'export function validateCampaign(campaign, audience) {',
    '  const recipients = Array.isArray(audience) ? audience : [];',
    '  const eligible = recipients.filter((recipient) =>',
    '    recipient?.consented === true && recipient?.suppressed !== true',
    '  );',
    '',
    '  return {',
    '    campaignId: String(campaign?.id ?? "demo-campaign"),',
    '    eligibleCount: eligible.length,',
    '    requiresApproval: true',
    '  };',
    '}'
  ].join('\n'),
  'outreach/migrations/example-schema.sql': [
    '-- Synthetic example only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_contacts (',
    '  id TEXT PRIMARY KEY,',
    '  display_name TEXT NOT NULL,',
    '  consented INTEGER NOT NULL DEFAULT 0,',
    '  suppressed INTEGER NOT NULL DEFAULT 0',
    ');'
  ].join('\n'),
  'android-admin/README.md': [
    '# Android administrator companion',
    '',
    'This showcase entry describes a companion interface for authorized administration.',
    'It is not a distributable build and contains no signing keys, service URLs or account data.'
  ].join('\n')
};

const bolekpadFiles: Record<string, string> = {
  'README.md': [
    '# BOLEKpad — public showcase',
    '',
    'A modular workspace concept for notes, pages, documents, canvas, slides, calendar, reminders,',
    'attachments and AI-assisted productivity. The private repository is not mirrored here.',
    'All examples use synthetic content and placeholder adapters.'
  ].join('\n'),
  'docs/architecture.md': [
    '# Workspace architecture',
    '',
    'The browser workspace presents modular tools through a shared application shell. A protected',
    'API handles ownership checks and persistence. Structured records are stored separately from',
    'private file objects. AI and email integrations are accessed only through server-side adapters.'
  ].join('\n'),
  'docs/diagrams/workspace-flow.mmd': [
    'flowchart LR',
    '  A[Workspace shell] --> B[Notes and pages]',
    '  A --> C[Documents and canvas]',
    '  A --> D[Calendar and reminders]',
    '  B --> E[Authenticated API]',
    '  C --> E',
    '  D --> E',
    '  E --> F[Database]',
    '  E --> G[Private file storage]'
  ].join('\n'),
  'frontend/src/workspace.example.dart': [
    'class WorkspaceModule {',
    '  const WorkspaceModule({required this.id, required this.title});',
    '',
    '  final String id;',
    '  final String title;',
    '}',
    '',
    'const modules = <WorkspaceModule>[',
    '  WorkspaceModule(id: "notes", title: "Notes"),',
    '  WorkspaceModule(id: "documents", title: "Documents"),',
    '  WorkspaceModule(id: "calendar", title: "Calendar"),',
    '];'
  ].join('\n'),
  'backend/src/api.example.ts': [
    'export type WorkspaceRecord = {',
    '  id: string;',
    '  ownerId: string;',
    '  title: string;',
    '  updatedAt: string;',
    '};',
    '',
    'export function canReadRecord(userId: string, record: WorkspaceRecord) {',
    '  return record.ownerId === userId;',
    '}'
  ].join('\n'),
  'migrations/example-schema.sql': [
    '-- Synthetic example only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_workspace_items (',
    '  id TEXT PRIMARY KEY,',
    '  owner_id TEXT NOT NULL,',
    '  title TEXT NOT NULL,',
    '  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP',
    ');'
  ].join('\n')
};

const xcoderFiles: Record<string, string> = {
  'README.md': [
    '# xCoder — public showcase',
    '',
    'A conversational AI workspace concept with knowledge, connectors, coding assistance, media',
    'and review-before-action workflows. The source repository is private; this tree contains',
    'sanitized examples rather than production code or deployment configuration.'
  ].join('\n'),
  'docs/architecture.md': [
    '# Workspace architecture',
    '',
    'The interface sends user requests to a Worker API. Policy checks and orchestration select an',
    'approved capability, retrieve authorized context and prepare a response. External changes are',
    'represented as proposals and require an explicit review step.'
  ].join('\n'),
  'docs/diagrams/agent-flow.mmd': [
    'flowchart TD',
    '  A[Prompt] --> B[Session and policy check]',
    '  B --> C[Assistant coordinator]',
    '  C --> D[Knowledge and tools]',
    '  D --> E[Proposed result]',
    '  E --> F{Approval required?}',
    '  F -->|Yes| G[Human review]',
    '  F -->|No| H[Return response]',
    '  G --> H'
  ].join('\n'),
  'src/workflow-example.js': [
    'export function createProposal(action, input) {',
    '  return {',
    '    action: String(action),',
    '    input: input ?? {},',
    '    state: "pending-review",',
    '    createdAt: new Date().toISOString()',
    '  };',
    '}'
  ].join('\n'),
  'migrations/example-schema.sql': [
    '-- Synthetic example only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_proposals (',
    '  id TEXT PRIMARY KEY,',
    '  action TEXT NOT NULL,',
    '  state TEXT NOT NULL DEFAULT "pending-review",',
    '  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP',
    ');'
  ].join('\n')
};

const devaiFiles: Record<string, string> = {
  'README.md': [
    '# DevAI Controller — public showcase',
    '',
    'A developer operations console concept combining an assistant, agents, a knowledge base,',
    'browser automation, coding workflows and deployment visibility. The private repository is',
    'not mirrored here; the displayed examples are synthetic and approval-focused.'
  ].join('\n'),
  'docs/architecture.md': [
    '# Developer operations architecture',
    '',
    'The React interface calls a typed server API. The server enforces access policy, routes requests',
    'to bounded tools and records activity. Coding changes are prepared as reviewable proposals;',
    'deployment and external actions require an authorized approval.'
  ].join('\n'),
  'docs/diagrams/approval-flow.mmd': [
    'flowchart TD',
    '  A[Developer request] --> B[Authenticate and authorize]',
    '  B --> C[Select approved tool]',
    '  C --> D[Run in isolated context]',
    '  D --> E[Proposed diff or action]',
    '  E --> F[Human review]',
    '  F -->|Approved| G[Execute or open draft PR]',
    '  F -->|Rejected| H[Close proposal]',
    '  G --> I[Audit record]'
  ].join('\n'),
  'src/App.example.tsx': [
    'type WorkspaceTab = "assistant" | "projects" | "operations";',
    '',
    'export function getVisibleTabs(canOperate: boolean): WorkspaceTab[] {',
    '  return canOperate',
    '    ? ["assistant", "projects", "operations"]',
    '    : ["assistant", "projects"];',
    '}'
  ].join('\n'),
  'server/platform/approval-example.ts': [
    'export type ActionProposal = {',
    '  id: string;',
    '  summary: string;',
    '  status: "pending" | "approved" | "rejected";',
    '};',
    '',
    'export function canExecute(proposal: ActionProposal) {',
    '  return proposal.status === "approved";',
    '}'
  ].join('\n'),
  'shared/types-example.ts': [
    'export type ToolResult<T> = {',
    '  ok: boolean;',
    '  data?: T;',
    '  message?: string;',
    '};'
  ].join('\n'),
  'migrations/example-schema.sql': [
    '-- Synthetic example only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_action_proposals (',
    '  id TEXT PRIMARY KEY,',
    '  summary TEXT NOT NULL,',
    '  status TEXT NOT NULL DEFAULT "pending",',
    '  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP',
    ');'
  ].join('\n')
};

const printingFiles: Record<string, string> = {
  'README.md': [
    '# Online Printing Store — reference blueprint',
    '',
    'No verified source repository is currently linked to this portfolio project.',
    'This explorer is a proposed reference structure for a print-commerce journey, not a claim',
    'that these files or modules already exist in a deployed application.'
  ].join('\n'),
  'docs/architecture.md': [
    '# Reference architecture',
    '',
    'A customer configures a product, submits artwork, receives a proof or quotation, checks out',
    'through a hosted payment provider and follows an order through production and delivery.',
    'Administrative tools manage catalogue data, pricing, production stages and customer support.'
  ].join('\n'),
  'docs/diagrams/order-lifecycle.mmd': [
    'flowchart TD',
    '  A[Product catalogue] --> B[Configure print options]',
    '  B --> C[Upload artwork]',
    '  C --> D[Proof and quotation]',
    '  D --> E[Checkout and payment]',
    '  E --> F[Production queue]',
    '  F --> G[Quality check]',
    '  G --> H[Dispatch and tracking]'
  ].join('\n'),
  'services/orders/order-state.md': [
    '# Example order states',
    '',
    'draft → awaiting-artwork → proof-review → awaiting-payment → queued → in-production →',
    'quality-check → dispatched → completed',
    '',
    'Every transition should be validated server-side and recorded with an audit event.'
  ].join('\n'),
  'services/uploads/artwork-validation.md': [
    '# Artwork upload controls',
    '',
    '- Allow only documented file types and enforce size limits.',
    '- Validate file signatures instead of trusting browser MIME values.',
    '- Store uploads privately and use short-lived access links.',
    '- Keep proof versions separate from customer originals.',
    '- Require an authorized review before production.'
  ].join('\n'),
  'database/example-schema.sql': [
    '-- Concept schema only; not a production migration.',
    'CREATE TABLE IF NOT EXISTS demo_orders (',
    '  id TEXT PRIMARY KEY,',
    '  status TEXT NOT NULL DEFAULT "draft",',
    '  total_minor_units INTEGER NOT NULL DEFAULT 0,',
    '  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP',
    ');'
  ].join('\n')
};

const createPrivateRepository = (
  id: string,
  label: string,
  fullName: string,
  note: string,
  files: Record<string, string>,
  extraPaths: string[]
): ProjectRepository => ({
  id,
  label,
  fullName,
  branch: 'main',
  visibility: 'private',
  repoUrl: 'https://github.com/' + fullName,
  note,
  treeLabel: 'Sanitized showcase structure',
  treeSource: 'sanitized',
  tree: makeTree([...Object.keys(files), ...extraPaths]),
  showcaseFiles: files
});

const repositoriesByProject: Record<string, ProjectRepository[]> = {
  'master-ai-multi-agent-workspace': [
    createPrivateRepository(
      'master-ai',
      'MASTER AI',
      'Dev-Jel-Works/master-CEO-ai-',
      'This is a public-safe structure preview based on the private repository layout. File samples are sanitized examples; original prompts, internal documentation, operational configuration and production source are not published.',
      masterFiles,
      [
        '.github/workflows/validation.yml',
        'docs/screenshots/README.md',
        'examples/sample-request.example.json',
        'public/admin/index.html',
        'public/user/index.html',
        'public/demo/index.html',
        'scripts/build-assets.example.mjs',
        'src/coordinator.example.js',
        'src/knowledge.example.js',
        'src/workflow.example.js',
        'tests/workflow-example.test.mjs',
        'package.example.json',
        'wrangler.example.jsonc'
      ]
    )
  ],
  'knowledge-center-system': [
    {
      id: 'knowledge-center',
      label: 'Knowledge Center System',
      fullName: 'DevJel/knowledge-center-system',
      branch: 'main',
      visibility: 'public',
      repoUrl: 'https://github.com/DevJel/knowledge-center-system',
      note: 'Public repository tree is captured from GitHub during the portfolio build. Inline preview is enabled for selected public-safe documentation and application files.',
      treeLabel: 'Public GitHub repository',
      treeSource: 'github',
      tree: makeTree([
        'README.md',
        'index.html',
        'overview.html',
        'assets/chapters.css',
        'assets/chapters.js',
        'config/chapters.json',
        'docs/CHAPTER_PATTERN.md',
        'docs/HTML_PAGES.md',
        'workers/knowledge-center-updates/worker.mjs'
      ]),
      previewPaths: [
        'README.md',
        'index.html',
        'overview.html',
        'chapter-01-production-ai-architecture.html',
        'ai-security.html',
        'mermaid-diagrams.html',
        'assets/chapters.css',
        'assets/chapters.js',
        'config/chapters.json',
        'docs/CHAPTER_PATTERN.md',
        'docs/HTML_PAGES.md',
        'docs/DIAGRAMS.md',
        'workers/knowledge-center-updates/worker.mjs'
      ]
    }
  ],
  'internal-email-system': [
    createPrivateRepository(
      'email-leader',
      'Email-LEADer',
      'DevJel/Email-LEADer',
      'This is a sanitized showcase structure based on the private Email-LEADer repository. The viewer uses synthetic examples only; real contacts, sender identities, mail settings, delivery records and operational files remain private.',
      emailFiles,
      [
        '.github/workflows/validation.yml',
        'outreach/public/index.html',
        'outreach/src/template.example.js',
        'outreach/scripts/build-template.example.mjs',
        'outreach/test/email-flow.example.mjs',
        'outreach/docs/screenshots/README.md',
        'outreach/email/README.md'
      ]
    )
  ],
  'hr-information-system': [
    {
      id: 'jelhr-system',
      label: 'JelHR System',
      fullName: 'DevJel/jelhr-system',
      branch: 'main',
      visibility: 'public',
      repoUrl: 'https://github.com/DevJel/jelhr-system',
      note: 'Public repository tree is captured from GitHub during the portfolio build. Inline preview is enabled for selected interface, API and schema examples; other files link to GitHub.',
      treeLabel: 'Public GitHub repository',
      treeSource: 'github',
      tree: makeTree([
        'README.md',
        'frontend/index.html',
        'frontend/onboarding.html',
        'frontend/offboarding.html',
        'frontend/css/app.css',
        'frontend/js/app.js',
        'functions/api/health.js',
        'migrations/0001_init.sql'
      ]),
      previewPaths: [
        'frontend/index.html',
        'frontend/onboarding.html',
        'frontend/offboarding.html',
        'frontend/employee.html',
        'frontend/employees.html',
        'frontend/css/app.css',
        'frontend/js/app.js',
        'frontend/js/dashboard.js',
        'frontend/js/login.js',
        'functions/api/health.js',
        'migrations/0001_init.sql'
      ]
    }
  ],
  'bolekpad-personal-workspace': [
    createPrivateRepository(
      'bolekpad',
      'BOLEKpad',
      'Dev-Jel-Works/Bolekpad',
      'This is a sanitized showcase structure based on the private BOLEKpad monorepo. The samples use synthetic data and placeholder adapters; private workspace records, authentication details and service configuration are not exposed.',
      bolekpadFiles,
      [
        'auth-worker/src/auth.example.js',
        'backend/src/api.example.ts',
        'frontend/pubspec.yaml',
        'legacy/src/App.example.tsx',
        'docs/screenshots/README.md',
        'scripts/build.example.mjs',
        'tests/workspace.example.test.ts'
      ]
    )
  ],
  'online-printing-store': [
    {
      id: 'printing-blueprint',
      label: 'Reference blueprint',
      branch: 'reference',
      visibility: 'concept',
      note: 'Blueprint explorer only. No verified GitHub source repository is linked to this project yet. These are proposed example folders and reference files, not existing implementation files.',
      treeLabel: 'Concept architecture',
      treeSource: 'blueprint',
      tree: makeTree([
        ...Object.keys(printingFiles),
        'apps/storefront/README.md',
        'apps/admin/README.md',
        'tests/checkout-scenarios.md',
        'docs/screenshots/README.md'
      ]),
      showcaseFiles: printingFiles
    }
  ],
  'developers-playground-devai': [
    createPrivateRepository(
      'xcoder-v2',
      'xCoder V2',
      'DevJel/xCoder-V2',
      'Sanitized public showcase structure for the private xCoder workspace. The examples illustrate request orchestration and review boundaries without exposing private source, connector settings, account details or production configuration.',
      xcoderFiles,
      [
        'docs/screenshots/README.md',
        'monitor/README.md',
        'pages-preview/index.html',
        'public/index.html',
        'public/app.example.js',
        'releases/README.md',
        'scripts/build.example.mjs',
        'src/automation.example.js',
        'src/mcp.example.js',
        'tests/workspace-example.test.mjs',
        'workers/README.md'
      ]
    ),
    createPrivateRepository(
      'devai-controller',
      'DevAI Controller',
      'Dev-Jel-Works/Dev-ai-Controller',
      'Sanitized public showcase structure for the private DevAI Controller. Code samples are illustrative only; the original operator console, integrations, deployment settings and private records remain access-controlled.',
      devaiFiles,
      [
        'functions/api/route.example.ts',
        'migrations-assistant/example.sql',
        'monitor/README.md',
        'public/index.html',
        'scripts/validate.example.sh',
        'server/app.example.ts',
        'server/auth/routes.example.ts',
        'server/platform/coding.example.ts',
        'src/components/assistant/AssistantPanel.example.tsx',
        'tests/assistant.example.test.ts'
      ]
    )
  ]
};

const ignoredPath = (path: string): boolean =>
  path.split('/').some((segment) => ['node_modules', '.git', 'dist', 'build', 'coverage', '.next'].includes(segment));

export const getProjectRepositories = async (slug: string): Promise<ProjectRepository[]> => {
  const repositories = repositoriesByProject[slug] ?? [];
  return Promise.all(repositories.map(async (repository) => {
    if (repository.visibility !== 'public' || !repository.fullName) return repository;
    try {
      const response = await fetch(
        'https://api.github.com/repos/' + repository.fullName + '/git/trees/' + repository.branch + '?recursive=1',
        { headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } }
      );
      if (!response.ok) return { ...repository, treeSource: 'fallback' as const };
      const payload = await response.json() as {
        truncated?: boolean;
        tree?: Array<{ path: string; type: string; size?: number; sha?: string }>;
      };
      const tree = (payload.tree ?? [])
        .filter((entry) => !ignoredPath(entry.path) && (entry.type === 'tree' || entry.type === 'blob'))
        .map((entry) => ({
          path: entry.path,
          type: entry.type === 'tree' ? 'tree' as const : 'blob' as const,
          size: entry.size,
          sha: entry.sha
        }));
      return {
        ...repository,
        tree: tree.length > 0 ? tree : repository.tree,
        treeSource: tree.length > 0 ? 'github' as const : 'fallback' as const,
        note: payload.truncated
          ? repository.note + ' GitHub marked the recursive tree as truncated.'
          : repository.note
      };
    } catch {
      return { ...repository, treeSource: 'fallback' as const };
    }
  }));
};
