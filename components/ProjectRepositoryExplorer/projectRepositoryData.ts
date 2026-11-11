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
    '# MASTER AI — Multi-Agent Workspace public showcase',
    '',
    'This page is a sanitized portfolio sample for Jelvan xCoder, a conversational multi-agent AI workspace powered by Muse AI.',
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

const privateTreeSnapshots: Record<string, RepositoryTreeEntry[]> = {
  "DevJel/xCoder-V2": [
    {
      "path": ".github",
      "type": "tree"
    },
    {
      "path": ".github/workflows",
      "type": "tree"
    },
    {
      "path": ".github/workflows/app-checks.yml",
      "type": "blob",
      "size": 478
    },
    {
      "path": ".github/workflows/deploy-cloudflare.yml",
      "type": "blob",
      "size": 5080
    },
    {
      "path": ".github/workflows/deploy-code-reviewer.yml",
      "type": "blob",
      "size": 1801
    },
    {
      "path": ".github/workflows/deploy-v01.yml",
      "type": "blob",
      "size": 3250
    },
    {
      "path": ".github/workflows/pages-preview.yml",
      "type": "blob",
      "size": 2639
    },
    {
      "path": ".github/workflows/repository-preflight.yml",
      "type": "blob",
      "size": 455
    },
    {
      "path": ".github/workflows/ui-screenshots.yml",
      "type": "blob",
      "size": 1896
    },
    {
      "path": ".gitignore",
      "type": "blob",
      "size": 155
    },
    {
      "path": "DISCLAIMER.md",
      "type": "blob",
      "size": 2229
    },
    {
      "path": "LICENSE",
      "type": "blob",
      "size": 1086
    },
    {
      "path": "NOTICE.md",
      "type": "blob",
      "size": 536
    },
    {
      "path": "README.md",
      "type": "blob",
      "size": 14009
    },
    {
      "path": "docs",
      "type": "tree"
    },
    {
      "path": "docs/ADMIN_LOGIN_JWT.md",
      "type": "blob",
      "size": 3497
    },
    {
      "path": "docs/ADMIN_LOGIN_LIVE_SYNC_2026-11-01.md",
      "type": "blob",
      "size": 2065
    },
    {
      "path": "docs/ADMIN_OPERATIONS.md",
      "type": "blob",
      "size": 3263
    },
    {
      "path": "docs/ARCHITECTURE.md",
      "type": "blob",
      "size": 7326
    },
    {
      "path": "docs/DEPLOYMENT_AND_TESTING.md",
      "type": "blob",
      "size": 8566
    },
    {
      "path": "docs/FEATURE_TABS_GUIDE.md",
      "type": "blob",
      "size": 18746
    },
    {
      "path": "docs/GITHUB_PAGES_RELEASE.md",
      "type": "blob",
      "size": 7019
    },
    {
      "path": "docs/IMPLEMENTATION_GUIDE.md",
      "type": "blob",
      "size": 8046
    },
    {
      "path": "docs/ISO_CONNECTOR_AND_ASSURANCE.md",
      "type": "blob",
      "size": 8902
    },
    {
      "path": "docs/LEADER_AVA_MIGRATION_GUIDE.md",
      "type": "blob",
      "size": 10001
    },
    {
      "path": "docs/MCP_AND_ISO_RULES.md",
      "type": "blob",
      "size": 1714
    },
    {
      "path": "docs/MUSE_RELEASE_CHECKLIST.md",
      "type": "blob",
      "size": 7913
    },
    {
      "path": "docs/PAYMONGO_SES_OTP_2026-10-29.md",
      "type": "blob",
      "size": 6678
    },
    {
      "path": "docs/PERSONAL_PROJECTS_CUSTOM_DOMAIN.md",
      "type": "blob",
      "size": 5735
    },
    {
      "path": "docs/PROVIDER_ICONS.md",
      "type": "blob",
      "size": 1770
    },
    {
      "path": "docs/RELEASE_PLAN_LEADER_AVA_2026-10-31.txt",
      "type": "blob",
      "size": 6417
    },
    {
      "path": "docs/SECURITY_HARDENING_2026-10-28.md",
      "type": "blob",
      "size": 8300
    },
    {
      "path": "docs/SOURCE_IMPORT_AND_RELEASE.md",
      "type": "blob",
      "size": 4479
    },
    {
      "path": "docs/SYDNEY_SES_SMTP_587_REPAIR_2026-10-29.md",
      "type": "blob",
      "size": 5323
    },
    {
      "path": "docs/UI_SCREENSHOTS_AND_FLOWS.md",
      "type": "blob",
      "size": 13154
    },
    {
      "path": "docs/V01_DEPLOYMENT.md",
      "type": "blob",
      "size": 5663
    },
    {
      "path": "docs/XCODER_REVIEW_ORCHESTRATION.md",
      "type": "blob",
      "size": 6571
    },
    {
      "path": "docs/diagrams",
      "type": "tree"
    },
    {
      "path": "docs/diagrams/architecture.mmd",
      "type": "blob",
      "size": 667
    },
    {
      "path": "docs/diagrams/data-ownership.mmd",
      "type": "blob",
      "size": 819
    },
    {
      "path": "docs/diagrams/guest-to-auth.mmd",
      "type": "blob",
      "size": 765
    },
    {
      "path": "docs/diagrams/iso-connector.mmd",
      "type": "blob",
      "size": 341
    },
    {
      "path": "docs/diagrams/ui-ai-flow.mmd",
      "type": "blob",
      "size": 783
    },
    {
      "path": "docs/diagrams/ui-auth-otp-flow.mmd",
      "type": "blob",
      "size": 798
    },
    {
      "path": "docs/diagrams/ui-connectors-flow.mmd",
      "type": "blob",
      "size": 494
    },
    {
      "path": "docs/diagrams/ui-mcp-flow.mmd",
      "type": "blob",
      "size": 520
    },
    {
      "path": "docs/diagrams/ui-media-flow.mmd",
      "type": "blob",
      "size": 670
    },
    {
      "path": "docs/diagrams/ui-overview-end-to-end.mmd",
      "type": "blob",
      "size": 673
    },
    {
      "path": "docs/diagrams/ui-profile-flow.mmd",
      "type": "blob",
      "size": 524
    },
    {
      "path": "docs/screenshots",
      "type": "tree"
    },
    {
      "path": "docs/screenshots/ui-ai-desktop.png",
      "type": "blob",
      "size": 55705
    },
    {
      "path": "docs/screenshots/ui-ai-mobile.png",
      "type": "blob",
      "size": 45443
    },
    {
      "path": "docs/screenshots/ui-connectors-desktop.png",
      "type": "blob",
      "size": 54907
    },
    {
      "path": "docs/screenshots/ui-email-sign-in.png",
      "type": "blob",
      "size": 82718
    },
    {
      "path": "docs/screenshots/ui-guest-landing.png",
      "type": "blob",
      "size": 33571
    },
    {
      "path": "docs/screenshots/ui-mcp-desktop.png",
      "type": "blob",
      "size": 50974
    },
    {
      "path": "docs/screenshots/ui-media-desktop.png",
      "type": "blob",
      "size": 48169
    },
    {
      "path": "docs/screenshots/ui-media-mobile.png",
      "type": "blob",
      "size": 38352
    },
    {
      "path": "docs/screenshots/ui-profile-desktop.png",
      "type": "blob",
      "size": 29150
    },
    {
      "path": "migrations",
      "type": "tree"
    },
    {
      "path": "migrations/0001_foundation.sql",
      "type": "blob",
      "size": 1865
    },
    {
      "path": "migrations/0002_billing.sql",
      "type": "blob",
      "size": 1954
    },
    {
      "path": "migrations/0003_automation.sql",
      "type": "blob",
      "size": 1023
    },
    {
      "path": "migrations/0004_mcp_keys.sql",
      "type": "blob",
      "size": 614
    },
    {
      "path": "migrations/0005_auth_rate.sql",
      "type": "blob",
      "size": 371
    },
    {
      "path": "migrations/0006_admin_operations.sql",
      "type": "blob",
      "size": 2131
    },
    {
      "path": "migrations/0015_workspace_hub.sql",
      "type": "blob",
      "size": 3259
    },
    {
      "path": "monitor",
      "type": "tree"
    },
    {
      "path": "monitor/README.md",
      "type": "blob",
      "size": 5612
    },
    {
      "path": "monitor/package.json",
      "type": "blob",
      "size": 332
    },
    {
      "path": "monitor/src",
      "type": "tree"
    },
    {
      "path": "monitor/src/monitor.mjs",
      "type": "blob",
      "size": 26143
    },
    {
      "path": "monitor/src/worker.mjs",
      "type": "blob",
      "size": 3060
    },
    {
      "path": "monitor/test",
      "type": "tree"
    },
    {
      "path": "monitor/test/monitor.test.mjs",
      "type": "blob",
      "size": 14116
    },
    {
      "path": "monitor/wrangler.jsonc",
      "type": "blob",
      "size": 1482
    },
    {
      "path": "package.json",
      "type": "blob",
      "size": 1584
    },
    {
      "path": "pages-preview",
      "type": "tree"
    },
    {
      "path": "pages-preview/index.html",
      "type": "blob",
      "size": 7105
    },
    {
      "path": "pages-preview/main.js",
      "type": "blob",
      "size": 1248
    },
    {
      "path": "pages-preview/style.css",
      "type": "blob",
      "size": 4529
    },
    {
      "path": "public",
      "type": "tree"
    },
    {
      "path": "public/activity-ui.js",
      "type": "blob",
      "size": 2732
    },
    {
      "path": "public/admin-login.css",
      "type": "blob",
      "size": 1313
    },
    {
      "path": "public/admin-login.html",
      "type": "blob",
      "size": 2104
    },
    {
      "path": "public/admin-login.js",
      "type": "blob",
      "size": 3278
    },
    {
      "path": "public/admin.css",
      "type": "blob",
      "size": 6340
    },
    {
      "path": "public/admin.html",
      "type": "blob",
      "size": 8932
    },
    {
      "path": "public/admin.js",
      "type": "blob",
      "size": 13006
    },
    {
      "path": "public/ai-thinking.svg",
      "type": "blob",
      "size": 1413
    },
    {
      "path": "public/app.js",
      "type": "blob",
      "size": 31758
    },
    {
      "path": "public/feature-guide-page.js",
      "type": "blob",
      "size": 325
    },
    {
      "path": "public/feature-guide.html",
      "type": "blob",
      "size": 1385
    },
    {
      "path": "public/feature-guides.css",
      "type": "blob",
      "size": 3118
    },
    {
      "path": "public/feature-guides.js",
      "type": "blob",
      "size": 12625
    },
    {
      "path": "public/icons",
      "type": "tree"
    },
    {
      "path": "public/icons/cloudflare.svg",
      "type": "blob",
      "size": 1178
    },
    {
      "path": "public/icons/github.svg",
      "type": "blob",
      "size": 822
    },
    {
      "path": "public/icons/google.svg",
      "type": "blob",
      "size": 457
    },
    {
      "path": "public/icons/notion.svg",
      "type": "blob",
      "size": 978
    },
    {
      "path": "public/icons/resend.svg",
      "type": "blob",
      "size": 344
    },
    {
      "path": "public/icons/wise.svg",
      "type": "blob",
      "size": 237
    },
    {
      "path": "public/images",
      "type": "tree"
    },
    {
      "path": "public/images/muse-workspace.webp",
      "type": "blob",
      "size": 55958
    },
    {
      "path": "public/images/prepaid-credits.webp",
      "type": "blob",
      "size": 55282
    },
    {
      "path": "public/images/xcoder-icon.svg",
      "type": "blob",
      "size": 566
    },
    {
      "path": "public/images/xcoder-icon.webp",
      "type": "blob",
      "size": 1066
    },
    {
      "path": "public/images/xcoder-logo.svg",
      "type": "blob",
      "size": 811
    },
    {
      "path": "public/index.html",
      "type": "blob",
      "size": 17814
    },
    {
      "path": "public/landing.css",
      "type": "blob",
      "size": 6298
    },
    {
      "path": "public/landing.html",
      "type": "blob",
      "size": 5199
    },
    {
      "path": "public/leader-ava.js",
      "type": "blob",
      "size": 4233
    },
    {
      "path": "public/llms.txt",
      "type": "blob",
      "size": 2239
    },
    {
      "path": "public/login.css",
      "type": "blob",
      "size": 5843
    },
    {
      "path": "public/login.html",
      "type": "blob",
      "size": 3570
    },
    {
      "path": "public/login.js",
      "type": "blob",
      "size": 8671
    },
    {
      "path": "public/privacy.html",
      "type": "blob",
      "size": 954
    },
    {
      "path": "public/robots.txt",
      "type": "blob",
      "size": 473
    },
    {
      "path": "public/style.css",
      "type": "blob",
      "size": 14977
    },
    {
      "path": "public/v1-login.css",
      "type": "blob",
      "size": 1890
    },
    {
      "path": "public/v1-workspace.css",
      "type": "blob",
      "size": 5704
    },
    {
      "path": "releases",
      "type": "tree"
    },
    {
      "path": "releases/v01",
      "type": "tree"
    },
    {
      "path": "releases/v01/review-migrations",
      "type": "tree"
    },
    {
      "path": "releases/v01/review-migrations/0001_review_runs.sql",
      "type": "blob",
      "size": 321
    },
    {
      "path": "releases/v01/worker.js",
      "type": "blob",
      "size": 1047
    },
    {
      "path": "scripts",
      "type": "tree"
    },
    {
      "path": "scripts/build-pages.mjs",
      "type": "blob",
      "size": 2814
    },
    {
      "path": "scripts/build-v01.mjs",
      "type": "blob",
      "size": 1009
    },
    {
      "path": "scripts/capture-ui-screenshots.mjs",
      "type": "blob",
      "size": 11581
    },
    {
      "path": "scripts/guard-v01.mjs",
      "type": "blob",
      "size": 3005
    },
    {
      "path": "scripts/pages-chromium.json",
      "type": "blob",
      "size": 104
    },
    {
      "path": "scripts/repository-audit.mjs",
      "type": "blob",
      "size": 2900
    },
    {
      "path": "scripts/smoke-v01.mjs",
      "type": "blob",
      "size": 2564
    },
    {
      "path": "scripts/test-admin-ui.mjs",
      "type": "blob",
      "size": 2686
    },
    {
      "path": "scripts/verify-pages-build.mjs",
      "type": "blob",
      "size": 1872
    },
    {
      "path": "scripts/verify-worker-bundle.mjs",
      "type": "blob",
      "size": 1574
    },
    {
      "path": "src",
      "type": "tree"
    },
    {
      "path": "src/admin-auth.js",
      "type": "blob",
      "size": 6874
    },
    {
      "path": "src/admin-chat.js",
      "type": "blob",
      "size": 341
    },
    {
      "path": "src/admin-operations.js",
      "type": "blob",
      "size": 6629
    },
    {
      "path": "src/admin.js",
      "type": "blob",
      "size": 6445
    },
    {
      "path": "src/agent-mail.js",
      "type": "blob",
      "size": 3169
    },
    {
      "path": "src/automation.js",
      "type": "blob",
      "size": 11122
    },
    {
      "path": "src/billing.js",
      "type": "blob",
      "size": 10061
    },
    {
      "path": "src/controller.js",
      "type": "blob",
      "size": 3239
    },
    {
      "path": "src/guest-abuse.js",
      "type": "blob",
      "size": 755
    },
    {
      "path": "src/guest-verification.js",
      "type": "blob",
      "size": 1480
    },
    {
      "path": "src/iso.js",
      "type": "blob",
      "size": 2329
    },
    {
      "path": "src/leader-ava.js",
      "type": "blob",
      "size": 4807
    },
    {
      "path": "src/mcp-catalog.js",
      "type": "blob",
      "size": 1038
    },
    {
      "path": "src/mcp-client.js",
      "type": "blob",
      "size": 2712
    },
    {
      "path": "src/mcp-server.js",
      "type": "blob",
      "size": 6412
    },
    {
      "path": "src/otp-email.js",
      "type": "blob",
      "size": 7821
    },
    {
      "path": "src/otp.js",
      "type": "blob",
      "size": 3457
    },
    {
      "path": "src/professional-profile.js",
      "type": "blob",
      "size": 16884
    },
    {
      "path": "src/security.js",
      "type": "blob",
      "size": 10667
    },
    {
      "path": "src/ses-config.js",
      "type": "blob",
      "size": 470
    },
    {
      "path": "src/smtp.js",
      "type": "blob",
      "size": 4278
    },
    {
      "path": "src/worker.js",
      "type": "blob",
      "size": 26901
    },
    {
      "path": "src/workspace-hub.js",
      "type": "blob",
      "size": 15875
    },
    {
      "path": "tests",
      "type": "tree"
    },
    {
      "path": "tests/admin-auth.test.mjs",
      "type": "blob",
      "size": 1413
    },
    {
      "path": "tests/admin-integration.test.mjs",
      "type": "blob",
      "size": 5804
    },
    {
      "path": "tests/admin.test.mjs",
      "type": "blob",
      "size": 4660
    },
    {
      "path": "tests/auth-review-policy.test.mjs",
      "type": "blob",
      "size": 2550
    },
    {
      "path": "tests/billing.test.mjs",
      "type": "blob",
      "size": 1497
    },
    {
      "path": "tests/domain-gateway.test.mjs",
      "type": "blob",
      "size": 2381
    },
    {
      "path": "tests/feature-guides-leader-ava.test.mjs",
      "type": "blob",
      "size": 4219
    },
    {
      "path": "tests/iso.test.mjs",
      "type": "blob",
      "size": 1166
    },
    {
      "path": "tests/login-turnstile.test.mjs",
      "type": "blob",
      "size": 2977
    },
    {
      "path": "tests/mcp.test.mjs",
      "type": "blob",
      "size": 1742
    },
    {
      "path": "tests/muse-ui-automation.test.mjs",
      "type": "blob",
      "size": 1797
    },
    {
      "path": "tests/otp-challenge.test.mjs",
      "type": "blob",
      "size": 4899
    },
    {
      "path": "tests/otp-email.test.mjs",
      "type": "blob",
      "size": 1631
    },
    {
      "path": "tests/pages-preview.test.mjs",
      "type": "blob",
      "size": 2238
    },
    {
      "path": "tests/payment-integration.test.mjs",
      "type": "blob",
      "size": 4879
    },
    {
      "path": "tests/provider-activity.test.mjs",
      "type": "blob",
      "size": 3521
    },
    {
      "path": "tests/public-admin-link.test.mjs",
      "type": "blob",
      "size": 750
    },
    {
      "path": "tests/public-assets.test.mjs",
      "type": "blob",
      "size": 2264
    },
    {
      "path": "tests/reviewer-proposed-prs.test.mjs",
      "type": "blob",
      "size": 2974
    },
    {
      "path": "tests/reviewer.test.mjs",
      "type": "blob",
      "size": 6624
    },
    {
      "path": "tests/security-hardening.test.mjs",
      "type": "blob",
      "size": 3780
    },
    {
      "path": "tests/ses-config.test.mjs",
      "type": "blob",
      "size": 909
    },
    {
      "path": "tests/smtp-starttls.test.mjs",
      "type": "blob",
      "size": 2048
    },
    {
      "path": "tests/turnstile-placement.test.mjs",
      "type": "blob",
      "size": 3057
    },
    {
      "path": "tests/ui-privacy.test.mjs",
      "type": "blob",
      "size": 1192
    },
    {
      "path": "tests/v01-isolation.test.mjs",
      "type": "blob",
      "size": 1139
    },
    {
      "path": "tests/worker-chat.test.mjs",
      "type": "blob",
      "size": 4564
    },
    {
      "path": "tests/workspace-hub.test.mjs",
      "type": "blob",
      "size": 9763
    },
    {
      "path": "workers",
      "type": "tree"
    },
    {
      "path": "workers/reviewer-logic.js",
      "type": "blob",
      "size": 5576
    },
    {
      "path": "workers/reviewer.js",
      "type": "blob",
      "size": 8719
    },
    {
      "path": "workers/reviewer.wrangler.jsonc",
      "type": "blob",
      "size": 1030
    },
    {
      "path": "workers/xcoder-domain-gateway.js",
      "type": "blob",
      "size": 3815
    },
    {
      "path": "wrangler.jsonc",
      "type": "blob",
      "size": 2781
    },
    {
      "path": "wrangler.v01.jsonc",
      "type": "blob",
      "size": 3641
    }
  ],
  "DevJel/Email-LEADer": [
    {
      "path": ".github",
      "type": "tree"
    },
    {
      "path": ".github/workflows",
      "type": "tree"
    },
    {
      "path": ".github/workflows/android-admin-apk.yml",
      "type": "blob",
      "size": 951
    },
    {
      "path": ".github/workflows/outreach-deploy.yml",
      "type": "blob",
      "size": 8688
    },
    {
      "path": ".gitignore",
      "type": "blob",
      "size": 145
    },
    {
      "path": ".grok",
      "type": "tree"
    },
    {
      "path": ".grok/skills",
      "type": "tree"
    },
    {
      "path": ".grok/skills/email-leader",
      "type": "tree"
    },
    {
      "path": ".grok/skills/email-leader/CHANGELOG.md",
      "type": "blob",
      "size": 166
    },
    {
      "path": ".grok/skills/email-leader/SKILL.md",
      "type": "blob",
      "size": 2883
    },
    {
      "path": ".grok/skills/email-leader/evals",
      "type": "tree"
    },
    {
      "path": ".grok/skills/email-leader/evals/evals.json",
      "type": "blob",
      "size": 803
    },
    {
      "path": ".grok/skills/email-leader/evals/triggers.json",
      "type": "blob",
      "size": 350
    },
    {
      "path": "README.md",
      "type": "blob",
      "size": 13423
    },
    {
      "path": "android-admin",
      "type": "tree"
    },
    {
      "path": "android-admin/README.md",
      "type": "blob",
      "size": 858
    },
    {
      "path": "android-admin/app",
      "type": "tree"
    },
    {
      "path": "android-admin/app/build.gradle",
      "type": "blob",
      "size": 287
    },
    {
      "path": "android-admin/app/src",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/AndroidManifest.xml",
      "type": "blob",
      "size": 879
    },
    {
      "path": "android-admin/app/src/main/java",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/java/pro",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/java/pro/operava",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/java/pro/operava/emailleader",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/java/pro/operava/emailleader/admin",
      "type": "tree"
    },
    {
      "path": "android-admin/app/src/main/java/pro/operava/emailleader/admin/MainActivity.java",
      "type": "blob",
      "size": 2371
    },
    {
      "path": "android-admin/build.gradle",
      "type": "blob",
      "size": 73
    },
    {
      "path": "android-admin/gradle.properties",
      "type": "blob",
      "size": 76
    },
    {
      "path": "android-admin/settings.gradle",
      "type": "blob",
      "size": 278
    },
    {
      "path": "architecture.md",
      "type": "blob",
      "size": 12075
    },
    {
      "path": "deployment.md",
      "type": "blob",
      "size": 25854
    },
    {
      "path": "manual.md",
      "type": "blob",
      "size": 13461
    },
    {
      "path": "outreach",
      "type": "tree"
    },
    {
      "path": "outreach/.gitignore",
      "type": "blob",
      "size": 122
    },
    {
      "path": "outreach/LEAD_FINDER.md",
      "type": "blob",
      "size": 3693
    },
    {
      "path": "outreach/README.md",
      "type": "blob",
      "size": 5747
    },
    {
      "path": "outreach/docs",
      "type": "tree"
    },
    {
      "path": "outreach/docs/ASSETS.md",
      "type": "blob",
      "size": 2443
    },
    {
      "path": "outreach/docs/assets",
      "type": "tree"
    },
    {
      "path": "outreach/docs/assets/approved-logo-concept.png",
      "type": "blob",
      "size": 1066335
    },
    {
      "path": "outreach/docs/assets/icon-set.webp",
      "type": "blob",
      "size": 51692
    },
    {
      "path": "outreach/docs/screenshots",
      "type": "tree"
    },
    {
      "path": "outreach/docs/screenshots/admin-activity.webp",
      "type": "blob",
      "size": 39204
    },
    {
      "path": "outreach/docs/screenshots/admin-businesses.webp",
      "type": "blob",
      "size": 35544
    },
    {
      "path": "outreach/docs/screenshots/admin-dashboard.webp",
      "type": "blob",
      "size": 53734
    },
    {
      "path": "outreach/docs/screenshots/admin-leader.webp",
      "type": "blob",
      "size": 34418
    },
    {
      "path": "outreach/docs/screenshots/admin-leads.webp",
      "type": "blob",
      "size": 53738
    },
    {
      "path": "outreach/docs/screenshots/admin-mobile.webp",
      "type": "blob",
      "size": 37804
    },
    {
      "path": "outreach/docs/screenshots/admin-replies.webp",
      "type": "blob",
      "size": 29764
    },
    {
      "path": "outreach/docs/screenshots/admin-settings-admins.webp",
      "type": "blob",
      "size": 29436
    },
    {
      "path": "outreach/docs/screenshots/admin-settings-integrations.webp",
      "type": "blob",
      "size": 39434
    },
    {
      "path": "outreach/docs/screenshots/admin-settings-platform.webp",
      "type": "blob",
      "size": 35488
    },
    {
      "path": "outreach/docs/screenshots/admin-tablet.webp",
      "type": "blob",
      "size": 83602
    },
    {
      "path": "outreach/docs/screenshots/business-business.webp",
      "type": "blob",
      "size": 23326
    },
    {
      "path": "outreach/docs/screenshots/business-dashboard.webp",
      "type": "blob",
      "size": 43814
    },
    {
      "path": "outreach/docs/screenshots/business-domains.webp",
      "type": "blob",
      "size": 42972
    },
    {
      "path": "outreach/docs/screenshots/business-email.webp",
      "type": "blob",
      "size": 30370
    },
    {
      "path": "outreach/docs/screenshots/business-sending.webp",
      "type": "blob",
      "size": 27134
    },
    {
      "path": "outreach/docs/screenshots/business-team.webp",
      "type": "blob",
      "size": 24306
    },
    {
      "path": "outreach/docs/screenshots/confirm-delete.webp",
      "type": "blob",
      "size": 15270
    },
    {
      "path": "outreach/docs/screenshots/confirm-yesno.webp",
      "type": "blob",
      "size": 12040
    },
    {
      "path": "outreach/docs/screenshots/importer.webp",
      "type": "blob",
      "size": 20158
    },
    {
      "path": "outreach/docs/screenshots/login-desktop.webp",
      "type": "blob",
      "size": 36434
    },
    {
      "path": "outreach/docs/screenshots/login-mobile.webp",
      "type": "blob",
      "size": 42662
    },
    {
      "path": "outreach/docs/screenshots/not-found.webp",
      "type": "blob",
      "size": 9500
    },
    {
      "path": "outreach/docs/screenshots/readme-dashboard-desktop.webp",
      "type": "blob",
      "size": 48510
    },
    {
      "path": "outreach/docs/screenshots/readme-dashboard-mobile.webp",
      "type": "blob",
      "size": 33052
    },
    {
      "path": "outreach/docs/screenshots/readme-login-desktop.webp",
      "type": "blob",
      "size": 32092
    },
    {
      "path": "outreach/docs/screenshots/readme-login-mobile.webp",
      "type": "blob",
      "size": 36732
    },
    {
      "path": "outreach/docs/screenshots/signup-desktop.webp",
      "type": "blob",
      "size": 41712
    },
    {
      "path": "outreach/docs/screenshots/totp.webp",
      "type": "blob",
      "size": 33324
    },
    {
      "path": "outreach/docs/screenshots/unsubscribe.webp",
      "type": "blob",
      "size": 10824
    },
    {
      "path": "outreach/email",
      "type": "tree"
    },
    {
      "path": "outreach/email/services-offer.html",
      "type": "blob",
      "size": 52661
    },
    {
      "path": "outreach/migrations",
      "type": "tree"
    },
    {
      "path": "outreach/migrations/0001_init.sql",
      "type": "blob",
      "size": 5465
    },
    {
      "path": "outreach/migrations/0002_auth_and_replies.sql",
      "type": "blob",
      "size": 1001
    },
    {
      "path": "outreach/migrations/0003_import_and_fuse.sql",
      "type": "blob",
      "size": 1819
    },
    {
      "path": "outreach/migrations/0004_domains_and_sender.sql",
      "type": "blob",
      "size": 1150
    },
    {
      "path": "outreach/migrations/0005_businesses.sql",
      "type": "blob",
      "size": 6150
    },
    {
      "path": "outreach/migrations/0006_email_workspace.sql",
      "type": "blob",
      "size": 1513
    },
    {
      "path": "outreach/package.json",
      "type": "blob",
      "size": 539
    },
    {
      "path": "outreach/public",
      "type": "tree"
    },
    {
      "path": "outreach/public/brand",
      "type": "tree"
    },
    {
      "path": "outreach/public/brand/favicon.svg",
      "type": "blob",
      "size": 675
    },
    {
      "path": "outreach/public/brand/leader-ava.svg",
      "type": "blob",
      "size": 2323
    },
    {
      "path": "outreach/public/brand/logo-white.svg",
      "type": "blob",
      "size": 6142
    },
    {
      "path": "outreach/public/brand/logo.svg",
      "type": "blob",
      "size": 6142
    },
    {
      "path": "outreach/public/brand/mark-white.svg",
      "type": "blob",
      "size": 727
    },
    {
      "path": "outreach/public/brand/mark.svg",
      "type": "blob",
      "size": 685
    },
    {
      "path": "outreach/public/icons",
      "type": "tree"
    },
    {
      "path": "outreach/public/icons/activity.svg",
      "type": "blob",
      "size": 285
    },
    {
      "path": "outreach/public/icons/alert.svg",
      "type": "blob",
      "size": 401
    },
    {
      "path": "outreach/public/icons/arrow-right.svg",
      "type": "blob",
      "size": 302
    },
    {
      "path": "outreach/public/icons/bell.svg",
      "type": "blob",
      "size": 331
    },
    {
      "path": "outreach/public/icons/bounce.svg",
      "type": "blob",
      "size": 365
    },
    {
      "path": "outreach/public/icons/business.svg",
      "type": "blob",
      "size": 377
    },
    {
      "path": "outreach/public/icons/calendar.svg",
      "type": "blob",
      "size": 337
    },
    {
      "path": "outreach/public/icons/chart.svg",
      "type": "blob",
      "size": 413
    },
    {
      "path": "outreach/public/icons/check.svg",
      "type": "blob",
      "size": 275
    },
    {
      "path": "outreach/public/icons/clock.svg",
      "type": "blob",
      "size": 297
    },
    {
      "path": "outreach/public/icons/close.svg",
      "type": "blob",
      "size": 273
    },
    {
      "path": "outreach/public/icons/dashboard.svg",
      "type": "blob",
      "size": 454
    },
    {
      "path": "outreach/public/icons/domain.svg",
      "type": "blob",
      "size": 385
    },
    {
      "path": "outreach/public/icons/export.svg",
      "type": "blob",
      "size": 366
    },
    {
      "path": "outreach/public/icons/eye.svg",
      "type": "blob",
      "size": 347
    },
    {
      "path": "outreach/public/icons/file.svg",
      "type": "blob",
      "size": 361
    },
    {
      "path": "outreach/public/icons/filter.svg",
      "type": "blob",
      "size": 290
    },
    {
      "path": "outreach/public/icons/followup.svg",
      "type": "blob",
      "size": 411
    },
    {
      "path": "outreach/public/icons/import.svg",
      "type": "blob",
      "size": 369
    },
    {
      "path": "outreach/public/icons/inbox.svg",
      "type": "blob",
      "size": 394
    },
    {
      "path": "outreach/public/icons/info.svg",
      "type": "blob",
      "size": 334
    },
    {
      "path": "outreach/public/icons/key.svg",
      "type": "blob",
      "size": 339
    },
    {
      "path": "outreach/public/icons/leader-ava.svg",
      "type": "blob",
      "size": 393
    },
    {
      "path": "outreach/public/icons/leads.svg",
      "type": "blob",
      "size": 411
    },
    {
      "path": "outreach/public/icons/link.svg",
      "type": "blob",
      "size": 377
    },
    {
      "path": "outreach/public/icons/lock.svg",
      "type": "blob",
      "size": 360
    },
    {
      "path": "outreach/public/icons/logout.svg",
      "type": "blob",
      "size": 357
    },
    {
      "path": "outreach/public/icons/mail.svg",
      "type": "blob",
      "size": 312
    },
    {
      "path": "outreach/public/icons/pause.svg",
      "type": "blob",
      "size": 346
    },
    {
      "path": "outreach/public/icons/phone.svg",
      "type": "blob",
      "size": 320
    },
    {
      "path": "outreach/public/icons/play.svg",
      "type": "blob",
      "size": 328
    },
    {
      "path": "outreach/public/icons/plug.svg",
      "type": "blob",
      "size": 341
    },
    {
      "path": "outreach/public/icons/plus.svg",
      "type": "blob",
      "size": 267
    },
    {
      "path": "outreach/public/icons/qr.svg",
      "type": "blob",
      "size": 472
    },
    {
      "path": "outreach/public/icons/refresh.svg",
      "type": "blob",
      "size": 380
    },
    {
      "path": "outreach/public/icons/reply.svg",
      "type": "blob",
      "size": 312
    },
    {
      "path": "outreach/public/icons/search.svg",
      "type": "blob",
      "size": 302
    },
    {
      "path": "outreach/public/icons/send.svg",
      "type": "blob",
      "size": 310
    },
    {
      "path": "outreach/public/icons/settings.svg",
      "type": "blob",
      "size": 394
    },
    {
      "path": "outreach/public/icons/shield.svg",
      "type": "blob",
      "size": 359
    },
    {
      "path": "outreach/public/icons/sparkle.svg",
      "type": "blob",
      "size": 464
    },
    {
      "path": "outreach/public/icons/sprite.svg",
      "type": "blob",
      "size": 13521
    },
    {
      "path": "outreach/public/icons/team.svg",
      "type": "blob",
      "size": 418
    },
    {
      "path": "outreach/public/icons/template.svg",
      "type": "blob",
      "size": 338
    },
    {
      "path": "outreach/public/icons/tile",
      "type": "tree"
    },
    {
      "path": "outreach/public/icons/tile/bell.svg",
      "type": "blob",
      "size": 846
    },
    {
      "path": "outreach/public/icons/tile/business.svg",
      "type": "blob",
      "size": 892
    },
    {
      "path": "outreach/public/icons/tile/calendar.svg",
      "type": "blob",
      "size": 852
    },
    {
      "path": "outreach/public/icons/tile/chart.svg",
      "type": "blob",
      "size": 928
    },
    {
      "path": "outreach/public/icons/tile/domain.svg",
      "type": "blob",
      "size": 900
    },
    {
      "path": "outreach/public/icons/tile/import.svg",
      "type": "blob",
      "size": 884
    },
    {
      "path": "outreach/public/icons/tile/leader-ava.svg",
      "type": "blob",
      "size": 900
    },
    {
      "path": "outreach/public/icons/tile/leads.svg",
      "type": "blob",
      "size": 926
    },
    {
      "path": "outreach/public/icons/tile/mail.svg",
      "type": "blob",
      "size": 827
    },
    {
      "path": "outreach/public/icons/tile/reply.svg",
      "type": "blob",
      "size": 827
    },
    {
      "path": "outreach/public/icons/tile/send.svg",
      "type": "blob",
      "size": 825
    },
    {
      "path": "outreach/public/icons/tile/shield.svg",
      "type": "blob",
      "size": 874
    },
    {
      "path": "outreach/public/icons/tile/sparkle.svg",
      "type": "blob",
      "size": 979
    },
    {
      "path": "outreach/public/icons/tile/webhook.svg",
      "type": "blob",
      "size": 915
    },
    {
      "path": "outreach/public/icons/trash.svg",
      "type": "blob",
      "size": 362
    },
    {
      "path": "outreach/public/icons/unsubscribe.svg",
      "type": "blob",
      "size": 395
    },
    {
      "path": "outreach/public/icons/user.svg",
      "type": "blob",
      "size": 319
    },
    {
      "path": "outreach/public/icons/webhook.svg",
      "type": "blob",
      "size": 400
    },
    {
      "path": "outreach/public/img",
      "type": "tree"
    },
    {
      "path": "outreach/public/img/apple-touch-icon.png",
      "type": "blob",
      "size": 3790
    },
    {
      "path": "outreach/public/img/icon-192.webp",
      "type": "blob",
      "size": 2942
    },
    {
      "path": "outreach/public/img/icon-512.webp",
      "type": "blob",
      "size": 7844
    },
    {
      "path": "outreach/public/img/icon-maskable-512.webp",
      "type": "blob",
      "size": 6022
    },
    {
      "path": "outreach/public/img/leader-ava-hero.webp",
      "type": "blob",
      "size": 46176
    },
    {
      "path": "outreach/public/img/leader-ava.webp",
      "type": "blob",
      "size": 6550
    },
    {
      "path": "outreach/public/img/logo-white.webp",
      "type": "blob",
      "size": 7292
    },
    {
      "path": "outreach/public/img/logo.webp",
      "type": "blob",
      "size": 7794
    },
    {
      "path": "outreach/public/img/mark.webp",
      "type": "blob",
      "size": 5974
    },
    {
      "path": "outreach/public/img/og-card.webp",
      "type": "blob",
      "size": 30016
    },
    {
      "path": "outreach/public/manifest.webmanifest",
      "type": "blob",
      "size": 543
    },
    {
      "path": "outreach/scripts",
      "type": "tree"
    },
    {
      "path": "outreach/scripts/build-brand.py",
      "type": "blob",
      "size": 3858
    },
    {
      "path": "outreach/scripts/build-icons.py",
      "type": "blob",
      "size": 10058
    },
    {
      "path": "outreach/scripts/build-images.py",
      "type": "blob",
      "size": 9841
    },
    {
      "path": "outreach/scripts/build-static-fallback.py",
      "type": "blob",
      "size": 2057
    },
    {
      "path": "outreach/scripts/build-template.mjs",
      "type": "blob",
      "size": 763
    },
    {
      "path": "outreach/scripts/setup-aws.sh",
      "type": "blob",
      "size": 5721
    },
    {
      "path": "outreach/src",
      "type": "tree"
    },
    {
      "path": "outreach/src/email",
      "type": "tree"
    },
    {
      "path": "outreach/src/email/render.js",
      "type": "blob",
      "size": 5792
    },
    {
      "path": "outreach/src/email/template.js",
      "type": "blob",
      "size": 54744
    },
    {
      "path": "outreach/src/index.js",
      "type": "blob",
      "size": 10514
    },
    {
      "path": "outreach/src/lib",
      "type": "tree"
    },
    {
      "path": "outreach/src/lib/api.js",
      "type": "blob",
      "size": 44641
    },
    {
      "path": "outreach/src/lib/auth.js",
      "type": "blob",
      "size": 25979
    },
    {
      "path": "outreach/src/lib/config.js",
      "type": "blob",
      "size": 5764
    },
    {
      "path": "outreach/src/lib/db.js",
      "type": "blob",
      "size": 7338
    },
    {
      "path": "outreach/src/lib/demo-seed.js",
      "type": "blob",
      "size": 11624
    },
    {
      "path": "outreach/src/lib/demo.js",
      "type": "blob",
      "size": 7735
    },
    {
      "path": "outreach/src/lib/domains.js",
      "type": "blob",
      "size": 11537
    },
    {
      "path": "outreach/src/lib/email-otp.js",
      "type": "blob",
      "size": 3656
    },
    {
      "path": "outreach/src/lib/fuse.js",
      "type": "blob",
      "size": 10871
    },
    {
      "path": "outreach/src/lib/inbound.js",
      "type": "blob",
      "size": 13343
    },
    {
      "path": "outreach/src/lib/leads.js",
      "type": "blob",
      "size": 3645
    },
    {
      "path": "outreach/src/lib/mime.js",
      "type": "blob",
      "size": 5907
    },
    {
      "path": "outreach/src/lib/sender.js",
      "type": "blob",
      "size": 17562
    },
    {
      "path": "outreach/src/lib/ses.js",
      "type": "blob",
      "size": 7256
    },
    {
      "path": "outreach/src/lib/sns.js",
      "type": "blob",
      "size": 10458
    },
    {
      "path": "outreach/src/lib/totp.js",
      "type": "blob",
      "size": 2554
    },
    {
      "path": "outreach/src/lib/util.js",
      "type": "blob",
      "size": 5710
    },
    {
      "path": "outreach/src/shared",
      "type": "tree"
    },
    {
      "path": "outreach/src/shared/extract.js",
      "type": "blob",
      "size": 33781
    },
    {
      "path": "outreach/src/shared/qr.js",
      "type": "blob",
      "size": 8224
    },
    {
      "path": "outreach/src/ui",
      "type": "tree"
    },
    {
      "path": "outreach/src/ui/brand.js",
      "type": "blob",
      "size": 17367
    },
    {
      "path": "outreach/src/ui/dashboard.js",
      "type": "blob",
      "size": 112802
    },
    {
      "path": "outreach/src/ui/icons.js",
      "type": "blob",
      "size": 47875
    },
    {
      "path": "outreach/src/ui/login.js",
      "type": "blob",
      "size": 34210
    },
    {
      "path": "outreach/src/ui/pages.js",
      "type": "blob",
      "size": 2327
    },
    {
      "path": "outreach/src/ui/static-assets.js",
      "type": "blob",
      "size": 313368
    },
    {
      "path": "outreach/src/ui/theme.js",
      "type": "blob",
      "size": 5311
    },
    {
      "path": "outreach/src/ui/user-portal.js",
      "type": "blob",
      "size": 6504
    },
    {
      "path": "outreach/src/ui/workspace.js",
      "type": "blob",
      "size": 6697
    },
    {
      "path": "outreach/test",
      "type": "tree"
    },
    {
      "path": "outreach/test/d1shim.mjs",
      "type": "blob",
      "size": 1696
    },
    {
      "path": "outreach/test/fixtures",
      "type": "tree"
    },
    {
      "path": "outreach/test/fixtures/card.vcf",
      "type": "blob",
      "size": 160
    },
    {
      "path": "outreach/test/fixtures/clinics.doc",
      "type": "blob",
      "size": 19968
    },
    {
      "path": "outreach/test/fixtures/clinics.docx",
      "type": "blob",
      "size": 36727
    },
    {
      "path": "outreach/test/fixtures/clinics.pdf",
      "type": "blob",
      "size": 16301
    },
    {
      "path": "outreach/test/fixtures/contacts.csv",
      "type": "blob",
      "size": 516
    },
    {
      "path": "outreach/test/fixtures/leads.xlsx",
      "type": "blob",
      "size": 5558
    },
    {
      "path": "outreach/test/fixtures/list.txt",
      "type": "blob",
      "size": 384
    },
    {
      "path": "outreach/test/run.mjs",
      "type": "blob",
      "size": 74179
    },
    {
      "path": "outreach/test/serve.mjs",
      "type": "blob",
      "size": 3018
    },
    {
      "path": "outreach/wrangler.jsonc",
      "type": "blob",
      "size": 5238
    }
  ],
  "Dev-Jel-Works/Bolekpad": [
    {
      "path": ".github",
      "type": "tree"
    },
    {
      "path": ".github/workflows",
      "type": "tree"
    },
    {
      "path": ".github/workflows/deployment-validation.yml",
      "type": "blob",
      "size": 3138
    },
    {
      "path": ".gitignore",
      "type": "blob",
      "size": 60
    },
    {
      "path": "Ai-Agents_strictly_follow_ISO_IEC_22989_2022.llms.txt",
      "type": "blob",
      "size": 160337
    },
    {
      "path": "README.md",
      "type": "blob",
      "size": 30611
    },
    {
      "path": "auth-worker",
      "type": "tree"
    },
    {
      "path": "auth-worker/README.md",
      "type": "blob",
      "size": 18688
    },
    {
      "path": "auth-worker/knowledge",
      "type": "tree"
    },
    {
      "path": "auth-worker/knowledge/reference-library.json",
      "type": "blob",
      "size": 26357
    },
    {
      "path": "auth-worker/migrations",
      "type": "tree"
    },
    {
      "path": "auth-worker/migrations/20261025_ai_reference_tags.sql",
      "type": "blob",
      "size": 296
    },
    {
      "path": "auth-worker/migrations/20261027_ai_provider.sql",
      "type": "blob",
      "size": 162
    },
    {
      "path": "auth-worker/package.json",
      "type": "blob",
      "size": 360
    },
    {
      "path": "auth-worker/schema.sql",
      "type": "blob",
      "size": 4117
    },
    {
      "path": "auth-worker/src",
      "type": "tree"
    },
    {
      "path": "auth-worker/src/ai-actions.js",
      "type": "blob",
      "size": 3016
    },
    {
      "path": "auth-worker/src/ai-coding-workflow.js",
      "type": "blob",
      "size": 3674
    },
    {
      "path": "auth-worker/src/ai-controller.js",
      "type": "blob",
      "size": 7916
    },
    {
      "path": "auth-worker/src/ai-orchestrator.js",
      "type": "blob",
      "size": 7342
    },
    {
      "path": "auth-worker/src/ai-provider.js",
      "type": "blob",
      "size": 1548
    },
    {
      "path": "auth-worker/src/ai-response-style.js",
      "type": "blob",
      "size": 2673
    },
    {
      "path": "auth-worker/src/ai-retrieval.js",
      "type": "blob",
      "size": 4074
    },
    {
      "path": "auth-worker/src/ai-runtime.js",
      "type": "blob",
      "size": 4462
    },
    {
      "path": "auth-worker/src/ai-skills.js",
      "type": "blob",
      "size": 14071
    },
    {
      "path": "auth-worker/src/attachments.js",
      "type": "blob",
      "size": 4274
    },
    {
      "path": "auth-worker/src/browse.js",
      "type": "blob",
      "size": 7267
    },
    {
      "path": "auth-worker/src/index.js",
      "type": "blob",
      "size": 29582
    },
    {
      "path": "auth-worker/src/public-pages.js",
      "type": "blob",
      "size": 5559
    },
    {
      "path": "auth-worker/src/schedule-validation.js",
      "type": "blob",
      "size": 1252
    },
    {
      "path": "auth-worker/src/scheduled-mail.js",
      "type": "blob",
      "size": 5180
    },
    {
      "path": "auth-worker/src/smtp.js",
      "type": "blob",
      "size": 7402
    },
    {
      "path": "auth-worker/src/workspace.js",
      "type": "blob",
      "size": 4971
    },
    {
      "path": "auth-worker/test",
      "type": "tree"
    },
    {
      "path": "auth-worker/test/ai-knowledge.test.mjs",
      "type": "blob",
      "size": 2577
    },
    {
      "path": "auth-worker/test/ai-runtime.test.mjs",
      "type": "blob",
      "size": 16712
    },
    {
      "path": "auth-worker/test/attachments.test.mjs",
      "type": "blob",
      "size": 3568
    },
    {
      "path": "auth-worker/test/browse.test.mjs",
      "type": "blob",
      "size": 5588
    },
    {
      "path": "auth-worker/test/origins.test.mjs",
      "type": "blob",
      "size": 2998
    },
    {
      "path": "auth-worker/test/scheduled-mail.test.mjs",
      "type": "blob",
      "size": 2067
    },
    {
      "path": "auth-worker/test/smtp.test.mjs",
      "type": "blob",
      "size": 9838
    },
    {
      "path": "auth-worker/wrangler.toml",
      "type": "blob",
      "size": 3876
    },
    {
      "path": "backend",
      "type": "tree"
    },
    {
      "path": "backend/bolekpad-auth-enterprise-addon.js",
      "type": "blob",
      "size": 15162
    },
    {
      "path": "backend/package-lock.json",
      "type": "blob",
      "size": 54408
    },
    {
      "path": "backend/package.json",
      "type": "blob",
      "size": 406
    },
    {
      "path": "backend/schema.sql",
      "type": "blob",
      "size": 1805
    },
    {
      "path": "backend/src",
      "type": "tree"
    },
    {
      "path": "backend/src/durable_objects.ts",
      "type": "blob",
      "size": 1043
    },
    {
      "path": "backend/src/index.ts",
      "type": "blob",
      "size": 2161
    },
    {
      "path": "backend/tsconfig.json",
      "type": "blob",
      "size": 309
    },
    {
      "path": "backend/wrangler.toml",
      "type": "blob",
      "size": 2132
    },
    {
      "path": "docs",
      "type": "tree"
    },
    {
      "path": "docs/ai-production-connection.md",
      "type": "blob",
      "size": 4786
    },
    {
      "path": "docs/attachments-and-sync.md",
      "type": "blob",
      "size": 8197
    },
    {
      "path": "docs/screenshots",
      "type": "tree"
    },
    {
      "path": "docs/screenshots/dashboard-demo-2026-10-26.png",
      "type": "blob",
      "size": 123450
    },
    {
      "path": "docs/screenshots/feature-ai-workspace-demo.png",
      "type": "blob",
      "size": 156764
    },
    {
      "path": "docs/screenshots/feature-app-launcher-demo.png",
      "type": "blob",
      "size": 136856
    },
    {
      "path": "docs/screenshots/feature-boleksend-demo.png",
      "type": "blob",
      "size": 96157
    },
    {
      "path": "docs/screenshots/feature-browser-demo.png",
      "type": "blob",
      "size": 60802
    },
    {
      "path": "docs/screenshots/feature-calculator-demo.png",
      "type": "blob",
      "size": 100879
    },
    {
      "path": "docs/screenshots/feature-calendar-demo.png",
      "type": "blob",
      "size": 112056
    },
    {
      "path": "docs/screenshots/feature-canvas-demo.png",
      "type": "blob",
      "size": 100837
    },
    {
      "path": "docs/screenshots/feature-connections-demo.png",
      "type": "blob",
      "size": 119821
    },
    {
      "path": "docs/screenshots/feature-documents-demo.png",
      "type": "blob",
      "size": 127275
    },
    {
      "path": "docs/screenshots/feature-notes-board-demo.png",
      "type": "blob",
      "size": 124263
    },
    {
      "path": "docs/screenshots/feature-notes-pages-demo.png",
      "type": "blob",
      "size": 125693
    },
    {
      "path": "docs/screenshots/feature-settings-demo.png",
      "type": "blob",
      "size": 118607
    },
    {
      "path": "docs/screenshots/feature-slides-demo.png",
      "type": "blob",
      "size": 123279
    },
    {
      "path": "docs/screenshots/login-live-2026-10-26.jpg",
      "type": "blob",
      "size": 13374
    },
    {
      "path": "docs/security-architecture.md",
      "type": "blob",
      "size": 7990
    },
    {
      "path": "docs/workspace-design.md",
      "type": "blob",
      "size": 7257
    },
    {
      "path": "frontend",
      "type": "tree"
    },
    {
      "path": "frontend/lib",
      "type": "tree"
    },
    {
      "path": "frontend/lib/main.dart",
      "type": "blob",
      "size": 667
    },
    {
      "path": "frontend/lib/router",
      "type": "tree"
    },
    {
      "path": "frontend/lib/router/app_router.dart",
      "type": "blob",
      "size": 406
    },
    {
      "path": "frontend/lib/screens",
      "type": "tree"
    },
    {
      "path": "frontend/lib/screens/ai",
      "type": "tree"
    },
    {
      "path": "frontend/lib/screens/ai/right_ai_panel.dart",
      "type": "blob",
      "size": 2082
    },
    {
      "path": "frontend/lib/screens/editor",
      "type": "tree"
    },
    {
      "path": "frontend/lib/screens/editor/block_editor.dart",
      "type": "blob",
      "size": 1204
    },
    {
      "path": "frontend/lib/screens/home_screen.dart",
      "type": "blob",
      "size": 619
    },
    {
      "path": "frontend/lib/theme",
      "type": "tree"
    },
    {
      "path": "frontend/lib/theme/bolek_colors.dart",
      "type": "blob",
      "size": 373
    },
    {
      "path": "frontend/lib/theme/bolek_shadows.dart",
      "type": "blob",
      "size": 380
    },
    {
      "path": "frontend/lib/theme/bolek_spacing.dart",
      "type": "blob",
      "size": 220
    },
    {
      "path": "frontend/lib/theme/bolek_typography.dart",
      "type": "blob",
      "size": 361
    },
    {
      "path": "frontend/pubspec.yaml",
      "type": "blob",
      "size": 465
    },
    {
      "path": "functions",
      "type": "tree"
    },
    {
      "path": "functions/p",
      "type": "tree"
    },
    {
      "path": "functions/p/[slug].ts",
      "type": "blob",
      "size": 1374
    },
    {
      "path": "legacy",
      "type": "tree"
    },
    {
      "path": "legacy/DEPLOYMENT.md",
      "type": "blob",
      "size": 8048
    },
    {
      "path": "legacy/README.md",
      "type": "blob",
      "size": 5387
    },
    {
      "path": "legacy/bun.lock",
      "type": "blob",
      "size": 80857
    },
    {
      "path": "legacy/firebase-applet-config.json",
      "type": "blob",
      "size": 472
    },
    {
      "path": "legacy/index.html",
      "type": "blob",
      "size": 904
    },
    {
      "path": "legacy/metadata.json",
      "type": "blob",
      "size": 343
    },
    {
      "path": "legacy/package-lock.json",
      "type": "blob",
      "size": 162918
    },
    {
      "path": "legacy/package.json",
      "type": "blob",
      "size": 1197
    },
    {
      "path": "legacy/public",
      "type": "tree"
    },
    {
      "path": "legacy/public/_headers",
      "type": "blob",
      "size": 450
    },
    {
      "path": "legacy/public/app-icons",
      "type": "tree"
    },
    {
      "path": "legacy/public/app-icons/board.svg",
      "type": "blob",
      "size": 346
    },
    {
      "path": "legacy/public/app-icons/bolekpanel.svg",
      "type": "blob",
      "size": 253
    },
    {
      "path": "legacy/public/app-icons/browser.svg",
      "type": "blob",
      "size": 298
    },
    {
      "path": "legacy/public/app-icons/calc.svg",
      "type": "blob",
      "size": 443
    },
    {
      "path": "legacy/public/app-icons/calendar.svg",
      "type": "blob",
      "size": 506
    },
    {
      "path": "legacy/public/app-icons/canvas.svg",
      "type": "blob",
      "size": 324
    },
    {
      "path": "legacy/public/app-icons/docs.svg",
      "type": "blob",
      "size": 287
    },
    {
      "path": "legacy/public/app-icons/integrations.svg",
      "type": "blob",
      "size": 351
    },
    {
      "path": "legacy/public/app-icons/presentation.svg",
      "type": "blob",
      "size": 375
    },
    {
      "path": "legacy/public/app-icons/profile.svg",
      "type": "blob",
      "size": 250
    },
    {
      "path": "legacy/public/app-icons/send.svg",
      "type": "blob",
      "size": 322
    },
    {
      "path": "legacy/public/bolekpad-wordmark.svg",
      "type": "blob",
      "size": 426
    },
    {
      "path": "legacy/public/favicon.svg",
      "type": "blob",
      "size": 249
    },
    {
      "path": "legacy/public/login-bg.svg",
      "type": "blob",
      "size": 61846
    },
    {
      "path": "legacy/server.ts",
      "type": "blob",
      "size": 15234
    },
    {
      "path": "legacy/src",
      "type": "tree"
    },
    {
      "path": "legacy/src/App.tsx",
      "type": "blob",
      "size": 362677
    },
    {
      "path": "legacy/src/components",
      "type": "tree"
    },
    {
      "path": "legacy/src/components/AIActionPanel.tsx",
      "type": "blob",
      "size": 3389
    },
    {
      "path": "legacy/src/components/AIProbeModal.tsx",
      "type": "blob",
      "size": 4953
    },
    {
      "path": "legacy/src/components/AboutBolekpad.tsx",
      "type": "blob",
      "size": 4335
    },
    {
      "path": "legacy/src/components/BolekBrowser.tsx",
      "type": "blob",
      "size": 13921
    },
    {
      "path": "legacy/src/components/BolekCalendar.tsx",
      "type": "blob",
      "size": 3495
    },
    {
      "path": "legacy/src/components/BolekCanvas.tsx",
      "type": "blob",
      "size": 167302
    },
    {
      "path": "legacy/src/components/BolekCreativeBoard.tsx",
      "type": "blob",
      "size": 11885
    },
    {
      "path": "legacy/src/components/BolekDocs.tsx",
      "type": "blob",
      "size": 111217
    },
    {
      "path": "legacy/src/components/BolekPageWebStudio.tsx",
      "type": "blob",
      "size": 17244
    },
    {
      "path": "legacy/src/components/BolekPages.tsx",
      "type": "blob",
      "size": 59045
    },
    {
      "path": "legacy/src/components/BolekSlides.tsx",
      "type": "blob",
      "size": 70444
    },
    {
      "path": "legacy/src/components/Bolekpanel.tsx",
      "type": "blob",
      "size": 23337
    },
    {
      "path": "legacy/src/components/LegacyCalendarImport.tsx",
      "type": "blob",
      "size": 3563
    },
    {
      "path": "legacy/src/components/LoginLiveWallpaper.tsx",
      "type": "blob",
      "size": 5093
    },
    {
      "path": "legacy/src/components/MobilePanel.tsx",
      "type": "blob",
      "size": 631
    },
    {
      "path": "legacy/src/components/MobileWorkspaceNav.tsx",
      "type": "blob",
      "size": 4128
    },
    {
      "path": "legacy/src/components/Modal.tsx",
      "type": "blob",
      "size": 874
    },
    {
      "path": "legacy/src/components/NoteAttachments.tsx",
      "type": "blob",
      "size": 7903
    },
    {
      "path": "legacy/src/components/ScheduledMail.tsx",
      "type": "blob",
      "size": 6955
    },
    {
      "path": "legacy/src/components/SendingDomains.tsx",
      "type": "blob",
      "size": 3275
    },
    {
      "path": "legacy/src/components/ToolBoundary.tsx",
      "type": "blob",
      "size": 855
    },
    {
      "path": "legacy/src/components/TurnstileWidget.tsx",
      "type": "blob",
      "size": 1853
    },
    {
      "path": "legacy/src/components/WorkspaceShell.tsx",
      "type": "blob",
      "size": 9952
    },
    {
      "path": "legacy/src/components/ai",
      "type": "tree"
    },
    {
      "path": "legacy/src/components/ai/AIConnectionStatus.tsx",
      "type": "blob",
      "size": 3825
    },
    {
      "path": "legacy/src/components/ai/AnswerContent.tsx",
      "type": "blob",
      "size": 5544
    },
    {
      "path": "legacy/src/components/login-water-fallback.ts",
      "type": "blob",
      "size": 4322
    },
    {
      "path": "legacy/src/index.css",
      "type": "blob",
      "size": 25902
    },
    {
      "path": "legacy/src/lib",
      "type": "tree"
    },
    {
      "path": "legacy/src/lib/api.ts",
      "type": "blob",
      "size": 1664
    },
    {
      "path": "legacy/src/lib/docUtils.ts",
      "type": "blob",
      "size": 7997
    },
    {
      "path": "legacy/src/lib/pagePublishing.ts",
      "type": "blob",
      "size": 6305
    },
    {
      "path": "legacy/src/lib/uiSounds.ts",
      "type": "blob",
      "size": 4712
    },
    {
      "path": "legacy/src/lib/useCloudCollection.ts",
      "type": "blob",
      "size": 7365
    },
    {
      "path": "legacy/src/main.tsx",
      "type": "blob",
      "size": 265
    },
    {
      "path": "legacy/src/styles",
      "type": "tree"
    },
    {
      "path": "legacy/src/styles/workspace.css",
      "type": "blob",
      "size": 34446
    },
    {
      "path": "legacy/src/types.ts",
      "type": "blob",
      "size": 1718
    },
    {
      "path": "legacy/test",
      "type": "tree"
    },
    {
      "path": "legacy/test/aiReplyFormatting.test.tsx",
      "type": "blob",
      "size": 1951
    },
    {
      "path": "legacy/test/workspace.test.tsx",
      "type": "blob",
      "size": 15837
    },
    {
      "path": "legacy/tsconfig.json",
      "type": "blob",
      "size": 508
    },
    {
      "path": "legacy/vite.config.ts",
      "type": "blob",
      "size": 708
    },
    {
      "path": "package-lock.json",
      "type": "blob",
      "size": 235158
    },
    {
      "path": "package.json",
      "type": "blob",
      "size": 669
    },
    {
      "path": "scripts",
      "type": "tree"
    },
    {
      "path": "scripts/generate-readme-dashboard.mjs",
      "type": "blob",
      "size": 4878
    },
    {
      "path": "scripts/generate-readme-features.mjs",
      "type": "blob",
      "size": 7323
    }
  ],
  "Dev-Jel-Works/Dev-ai-Controller": [
    {
      "path": ".github",
      "type": "tree"
    },
    {
      "path": ".github/workflows",
      "type": "tree"
    },
    {
      "path": ".github/workflows/ci.yml",
      "type": "blob",
      "size": 1052
    },
    {
      "path": ".github/workflows/codeql.yml",
      "type": "blob",
      "size": 5120
    },
    {
      "path": ".gitignore",
      "type": "blob",
      "size": 105
    },
    {
      "path": "DISCLAIMER.md",
      "type": "blob",
      "size": 2388
    },
    {
      "path": "LICENSE",
      "type": "blob",
      "size": 1086
    },
    {
      "path": "MANUAL.md",
      "type": "blob",
      "size": 18423
    },
    {
      "path": "NOTICE.md",
      "type": "blob",
      "size": 555
    },
    {
      "path": "README.md",
      "type": "blob",
      "size": 21212
    },
    {
      "path": "SECURITY.md",
      "type": "blob",
      "size": 10433
    },
    {
      "path": "docs",
      "type": "tree"
    },
    {
      "path": "docs/AI_MEMORY_INTELLIGENCE.md",
      "type": "blob",
      "size": 3755
    },
    {
      "path": "docs/AI_SECURITY_USAGE.md",
      "type": "blob",
      "size": 6645
    },
    {
      "path": "docs/AMAZON_SES.md",
      "type": "blob",
      "size": 12724
    },
    {
      "path": "docs/ARCHITECTURE.md",
      "type": "blob",
      "size": 9751
    },
    {
      "path": "docs/ASSISTANT_USAGE_AND_LEGAL.md",
      "type": "blob",
      "size": 3995
    },
    {
      "path": "docs/BROWSER_AUTOMATION_SESSIONS.md",
      "type": "blob",
      "size": 6620
    },
    {
      "path": "docs/CODING_AGENT_REPOSITORY_REVIEW.md",
      "type": "blob",
      "size": 5768
    },
    {
      "path": "docs/DEPLOYMENT.md",
      "type": "blob",
      "size": 8638
    },
    {
      "path": "docs/DEPLOYMENT_CHECKLIST.md",
      "type": "blob",
      "size": 6632
    },
    {
      "path": "docs/GLM_FLASH_AI_GATEWAY.md",
      "type": "blob",
      "size": 7894
    },
    {
      "path": "docs/MAILDESK_INBOUND_WORKER.md",
      "type": "blob",
      "size": 3997
    },
    {
      "path": "docs/PASSKEY_REGISTRATION.md",
      "type": "blob",
      "size": 4335
    },
    {
      "path": "docs/README.md",
      "type": "blob",
      "size": 2230
    },
    {
      "path": "docs/SECURITY_THREAT_MODEL_2026-10-17.md",
      "type": "blob",
      "size": 9200
    },
    {
      "path": "docs/SELF_HOSTING.md",
      "type": "blob",
      "size": 3371
    },
    {
      "path": "docs/deployment-prompts",
      "type": "tree"
    },
    {
      "path": "docs/deployment-prompts/cloudflare-integration-ai.md",
      "type": "blob",
      "size": 9248
    },
    {
      "path": "docs/deployment-prompts/cloudflare-worker-prompt.txt",
      "type": "blob",
      "size": 6287
    },
    {
      "path": "docs/design-reference",
      "type": "tree"
    },
    {
      "path": "docs/design-reference/Dasboard_mandatory_design.html",
      "type": "blob",
      "size": 650083
    },
    {
      "path": "docs/design-reference/Loginpage_mandatory_design.html",
      "type": "blob",
      "size": 634252
    },
    {
      "path": "docs/llms.txt",
      "type": "blob",
      "size": 8867
    },
    {
      "path": "functions",
      "type": "tree"
    },
    {
      "path": "functions/api",
      "type": "tree"
    },
    {
      "path": "functions/api/[[path]].ts",
      "type": "blob",
      "size": 331
    },
    {
      "path": "functions/v1",
      "type": "tree"
    },
    {
      "path": "functions/v1/[[path]].ts",
      "type": "blob",
      "size": 330
    },
    {
      "path": "index.html",
      "type": "blob",
      "size": 1685
    },
    {
      "path": "metadata.json",
      "type": "blob",
      "size": 402
    },
    {
      "path": "migrations-assistant",
      "type": "tree"
    },
    {
      "path": "migrations-assistant/0001_assistant.sql",
      "type": "blob",
      "size": 2054
    },
    {
      "path": "migrations",
      "type": "tree"
    },
    {
      "path": "migrations/0001_amazon_ses.sql",
      "type": "blob",
      "size": 2318
    },
    {
      "path": "migrations/0002_knowledge.sql",
      "type": "blob",
      "size": 1578
    },
    {
      "path": "migrations/0003_automations.sql",
      "type": "blob",
      "size": 1290
    },
    {
      "path": "migrations/0004_platform.sql",
      "type": "blob",
      "size": 4550
    },
    {
      "path": "migrations/0005_assistant_memory.sql",
      "type": "blob",
      "size": 796
    },
    {
      "path": "migrations/0005_invited_users.sql",
      "type": "blob",
      "size": 1081
    },
    {
      "path": "migrations/0007_knowledge_title_rename.sql",
      "type": "blob",
      "size": 451
    },
    {
      "path": "migrations/0008_operator_passkeys.sql",
      "type": "blob",
      "size": 422
    },
    {
      "path": "monitor",
      "type": "tree"
    },
    {
      "path": "monitor/README.md",
      "type": "blob",
      "size": 5670
    },
    {
      "path": "monitor/package.json",
      "type": "blob",
      "size": 355
    },
    {
      "path": "monitor/src",
      "type": "tree"
    },
    {
      "path": "monitor/src/monitor.mjs",
      "type": "blob",
      "size": 26143
    },
    {
      "path": "monitor/src/worker.mjs",
      "type": "blob",
      "size": 3060
    },
    {
      "path": "monitor/test",
      "type": "tree"
    },
    {
      "path": "monitor/test/monitor.test.mjs",
      "type": "blob",
      "size": 14116
    },
    {
      "path": "monitor/wrangler.jsonc",
      "type": "blob",
      "size": 1528
    },
    {
      "path": "package.json",
      "type": "blob",
      "size": 1631
    },
    {
      "path": "public",
      "type": "tree"
    },
    {
      "path": "public/.well-known",
      "type": "tree"
    },
    {
      "path": "public/.well-known/assetlinks.json",
      "type": "blob",
      "size": 334
    },
    {
      "path": "public/Ai_thinking.svg",
      "type": "blob",
      "size": 2415
    },
    {
      "path": "public/Dev’ai Controller Logo .svg",
      "type": "blob",
      "size": 525
    },
    {
      "path": "public/_headers",
      "type": "blob",
      "size": 1363
    },
    {
      "path": "public/brand",
      "type": "tree"
    },
    {
      "path": "public/brand/apple-touch-icon.png",
      "type": "blob",
      "size": 2726
    },
    {
      "path": "public/brand/favicon-32.png",
      "type": "blob",
      "size": 654
    },
    {
      "path": "public/brand/favicon-64.png",
      "type": "blob",
      "size": 1291
    },
    {
      "path": "public/brand/logo-512.png",
      "type": "blob",
      "size": 11167
    },
    {
      "path": "public/favicon.svg",
      "type": "blob",
      "size": 620
    },
    {
      "path": "public/widget.js",
      "type": "blob",
      "size": 7204
    },
    {
      "path": "scripts",
      "type": "tree"
    },
    {
      "path": "scripts/create-assistant-db.sh",
      "type": "blob",
      "size": 2060
    },
    {
      "path": "scripts/migrate-operava.sh",
      "type": "blob",
      "size": 948
    },
    {
      "path": "scripts/migrate.sh",
      "type": "blob",
      "size": 474
    },
    {
      "path": "server",
      "type": "tree"
    },
    {
      "path": "server/app.ts",
      "type": "blob",
      "size": 5876
    },
    {
      "path": "server/assist",
      "type": "tree"
    },
    {
      "path": "server/assist/routes.ts",
      "type": "blob",
      "size": 28430
    },
    {
      "path": "server/auth",
      "type": "tree"
    },
    {
      "path": "server/auth/access.ts",
      "type": "blob",
      "size": 2706
    },
    {
      "path": "server/auth/passkeys.ts",
      "type": "blob",
      "size": 14549
    },
    {
      "path": "server/auth/routes.ts",
      "type": "blob",
      "size": 10696
    },
    {
      "path": "server/auth/session.ts",
      "type": "blob",
      "size": 8716
    },
    {
      "path": "server/auth/turnstile.ts",
      "type": "blob",
      "size": 5381
    },
    {
      "path": "server/auth/users.ts",
      "type": "blob",
      "size": 8127
    },
    {
      "path": "server/auth/webauthn.ts",
      "type": "blob",
      "size": 12502
    },
    {
      "path": "server/db",
      "type": "tree"
    },
    {
      "path": "server/db/sqlite.ts",
      "type": "blob",
      "size": 3667
    },
    {
      "path": "server/email",
      "type": "tree"
    },
    {
      "path": "server/email/cloudflareInbound.ts",
      "type": "blob",
      "size": 5737
    },
    {
      "path": "server/email/index.ts",
      "type": "blob",
      "size": 984
    },
    {
      "path": "server/email/otpChallenge.ts",
      "type": "blob",
      "size": 3417
    },
    {
      "path": "server/email/routes.ts",
      "type": "blob",
      "size": 34967
    },
    {
      "path": "server/email/sesClient.ts",
      "type": "blob",
      "size": 20013
    },
    {
      "path": "server/email/sigv4.ts",
      "type": "blob",
      "size": 5704
    },
    {
      "path": "server/email/smtp.ts",
      "type": "blob",
      "size": 16438
    },
    {
      "path": "server/email/snsVerify.ts",
      "type": "blob",
      "size": 5122
    },
    {
      "path": "server/email/store.ts",
      "type": "blob",
      "size": 23667
    },
    {
      "path": "server/email/templates.ts",
      "type": "blob",
      "size": 8045
    },
    {
      "path": "server/http",
      "type": "tree"
    },
    {
      "path": "server/http/index.ts",
      "type": "blob",
      "size": 5347
    },
    {
      "path": "server/http/stripMarkup.ts",
      "type": "blob",
      "size": 783
    },
    {
      "path": "server/knowledge",
      "type": "tree"
    },
    {
      "path": "server/knowledge/catalog.ts",
      "type": "blob",
      "size": 18800
    },
    {
      "path": "server/knowledge/routes.ts",
      "type": "blob",
      "size": 6489
    },
    {
      "path": "server/knowledge/service.ts",
      "type": "blob",
      "size": 18337
    },
    {
      "path": "server/pages",
      "type": "tree"
    },
    {
      "path": "server/pages/proxy.ts",
      "type": "blob",
      "size": 1683
    },
    {
      "path": "server/platform",
      "type": "tree"
    },
    {
      "path": "server/platform/agentCatalog.ts",
      "type": "blob",
      "size": 106902
    },
    {
      "path": "server/platform/aiUsage.ts",
      "type": "blob",
      "size": 7876
    },
    {
      "path": "server/platform/assistant.ts",
      "type": "blob",
      "size": 22494
    },
    {
      "path": "server/platform/assistantRoutes.ts",
      "type": "blob",
      "size": 48971
    },
    {
      "path": "server/platform/automations.ts",
      "type": "blob",
      "size": 31830
    },
    {
      "path": "server/platform/billing.ts",
      "type": "blob",
      "size": 14484
    },
    {
      "path": "server/platform/browser.ts",
      "type": "blob",
      "size": 38885
    },
    {
      "path": "server/platform/browserAgent.ts",
      "type": "blob",
      "size": 39492
    },
    {
      "path": "server/platform/browserDom.ts",
      "type": "blob",
      "size": 5523
    },
    {
      "path": "server/platform/browserPublish.ts",
      "type": "blob",
      "size": 6533
    },
    {
      "path": "server/platform/browserRunner.ts",
      "type": "blob",
      "size": 26485
    },
    {
      "path": "server/platform/browserStore.ts",
      "type": "blob",
      "size": 18022
    },
    {
      "path": "server/platform/chatStore.ts",
      "type": "blob",
      "size": 15369
    },
    {
      "path": "server/platform/coding.ts",
      "type": "blob",
      "size": 4912
    },
    {
      "path": "server/platform/codingJobs.ts",
      "type": "blob",
      "size": 5073
    },
    {
      "path": "server/platform/codingPublish.ts",
      "type": "blob",
      "size": 13404
    },
    {
      "path": "server/platform/codingReview.ts",
      "type": "blob",
      "size": 14615
    },
    {
      "path": "server/platform/codingRunner.ts",
      "type": "blob",
      "size": 6126
    },
    {
      "path": "server/platform/images.ts",
      "type": "blob",
      "size": 5436
    },
    {
      "path": "server/platform/llm.ts",
      "type": "blob",
      "size": 9328
    },
    {
      "path": "server/platform/memory.ts",
      "type": "blob",
      "size": 12939
    },
    {
      "path": "server/platform/publicBrowserUrl.ts",
      "type": "blob",
      "size": 1890
    },
    {
      "path": "server/platform/readiness.ts",
      "type": "blob",
      "size": 7036
    },
    {
      "path": "server/platform/routes.ts",
      "type": "blob",
      "size": 51633
    },
    {
      "path": "server/platform/status.ts",
      "type": "blob",
      "size": 5768
    },
    {
      "path": "server/platform/text.ts",
      "type": "blob",
      "size": 1805
    },
    {
      "path": "server/platform/tools.ts",
      "type": "blob",
      "size": 67055
    },
    {
      "path": "server/platform/widget.ts",
      "type": "blob",
      "size": 2486
    },
    {
      "path": "server/platform/workerAgent.ts",
      "type": "blob",
      "size": 8764
    },
    {
      "path": "server/runtime",
      "type": "tree"
    },
    {
      "path": "server/runtime/node.ts",
      "type": "blob",
      "size": 6022
    },
    {
      "path": "server/runtime/nodeAi.ts",
      "type": "blob",
      "size": 5064
    },
    {
      "path": "server/runtime/worker.ts",
      "type": "blob",
      "size": 6162
    },
    {
      "path": "shared",
      "type": "tree"
    },
    {
      "path": "shared/featureDocs.ts",
      "type": "blob",
      "size": 67420
    },
    {
      "path": "shared/types.ts",
      "type": "blob",
      "size": 13471
    },
    {
      "path": "src",
      "type": "tree"
    },
    {
      "path": "src/App.tsx",
      "type": "blob",
      "size": 14222
    },
    {
      "path": "src/components",
      "type": "tree"
    },
    {
      "path": "src/components/agents",
      "type": "tree"
    },
    {
      "path": "src/components/agents/AgentKnowledgeFlows.tsx",
      "type": "blob",
      "size": 48695
    },
    {
      "path": "src/components/agents/AgentsPlatform.tsx",
      "type": "blob",
      "size": 85923
    },
    {
      "path": "src/components/assist",
      "type": "tree"
    },
    {
      "path": "src/components/assist/AiReview.tsx",
      "type": "blob",
      "size": 9673
    },
    {
      "path": "src/components/assistant",
      "type": "tree"
    },
    {
      "path": "src/components/assistant/AiUsagePanel.tsx",
      "type": "blob",
      "size": 7760
    },
    {
      "path": "src/components/assistant/AssistantChat.tsx",
      "type": "blob",
      "size": 37734
    },
    {
      "path": "src/components/assistant/AssistantSettings.tsx",
      "type": "blob",
      "size": 31135
    },
    {
      "path": "src/components/assistant/CodeBlock.tsx",
      "type": "blob",
      "size": 5104
    },
    {
      "path": "src/components/assistant/EmailActionCard.tsx",
      "type": "blob",
      "size": 10429
    },
    {
      "path": "src/components/assistant/GeneratedImages.tsx",
      "type": "blob",
      "size": 3646
    },
    {
      "path": "src/components/assistant/ToolCards.tsx",
      "type": "blob",
      "size": 18020
    },
    {
      "path": "src/components/assistant/types.ts",
      "type": "blob",
      "size": 4534
    },
    {
      "path": "src/components/auth",
      "type": "tree"
    },
    {
      "path": "src/components/auth/AdminAuthContext.tsx",
      "type": "blob",
      "size": 749
    },
    {
      "path": "src/components/auth/AdminProtectiveWrapper.tsx",
      "type": "blob",
      "size": 4022
    },
    {
      "path": "src/components/auth/LoginScreen.tsx",
      "type": "blob",
      "size": 22143
    },
    {
      "path": "src/components/auth/PasskeysDialog.tsx",
      "type": "blob",
      "size": 7630
    },
    {
      "path": "src/components/auth/Turnstile.tsx",
      "type": "blob",
      "size": 4640
    },
    {
      "path": "src/components/auth/UserManagement.tsx",
      "type": "blob",
      "size": 4519
    },
    {
      "path": "src/components/billing",
      "type": "tree"
    },
    {
      "path": "src/components/billing/BillingPage.tsx",
      "type": "blob",
      "size": 15908
    },
    {
      "path": "src/components/brand",
      "type": "tree"
    },
    {
      "path": "src/components/brand/Logo.tsx",
      "type": "blob",
      "size": 2130
    },
    {
      "path": "src/components/browser",
      "type": "tree"
    },
    {
      "path": "src/components/browser/AntCursor.tsx",
      "type": "blob",
      "size": 3425
    },
    {
      "path": "src/components/browser/AutomatePanel.tsx",
      "type": "blob",
      "size": 29073
    },
    {
      "path": "src/components/browser/BrowserPage.tsx",
      "type": "blob",
      "size": 30188
    },
    {
      "path": "src/components/browser/LiveScreen.tsx",
      "type": "blob",
      "size": 5173
    },
    {
      "path": "src/components/browser/VaultPanel.tsx",
      "type": "blob",
      "size": 13689
    },
    {
      "path": "src/components/browser/liveRun.ts",
      "type": "blob",
      "size": 9205
    },
    {
      "path": "src/components/browser/recipes.ts",
      "type": "blob",
      "size": 9908
    },
    {
      "path": "src/components/docs",
      "type": "tree"
    },
    {
      "path": "src/components/docs/DocsCenter.tsx",
      "type": "blob",
      "size": 13643
    },
    {
      "path": "src/components/knowledge",
      "type": "tree"
    },
    {
      "path": "src/components/knowledge/KnowledgeBase.tsx",
      "type": "blob",
      "size": 28094
    },
    {
      "path": "src/components/legal",
      "type": "tree"
    },
    {
      "path": "src/components/legal/LegalPages.tsx",
      "type": "blob",
      "size": 14806
    },
    {
      "path": "src/components/mail",
      "type": "tree"
    },
    {
      "path": "src/components/mail/MailDesk.tsx",
      "type": "blob",
      "size": 35214
    },
    {
      "path": "src/components/mail/SesTemplates.tsx",
      "type": "blob",
      "size": 7905
    },
    {
      "path": "src/components/operations",
      "type": "tree"
    },
    {
      "path": "src/components/operations/ApiTokenVault.tsx",
      "type": "blob",
      "size": 2284
    },
    {
      "path": "src/components/operations/AuditLogs.tsx",
      "type": "blob",
      "size": 10031
    },
    {
      "path": "src/components/operations/CodingAgent.tsx",
      "type": "blob",
      "size": 25926
    },
    {
      "path": "src/components/operations/DeploymentsMonitor.tsx",
      "type": "blob",
      "size": 8660
    },
    {
      "path": "src/components/operations/NotificationsFeed.tsx",
      "type": "blob",
      "size": 6355
    },
    {
      "path": "src/components/operations/SecurityReadinessPanel.tsx",
      "type": "blob",
      "size": 4469
    },
    {
      "path": "src/components/operations/StatusDashboard.tsx",
      "type": "blob",
      "size": 8831
    },
    {
      "path": "src/components/ses",
      "type": "tree"
    },
    {
      "path": "src/components/ses/SesMonitor.tsx",
      "type": "blob",
      "size": 49095
    },
    {
      "path": "src/components/ses/charts.tsx",
      "type": "blob",
      "size": 9321
    },
    {
      "path": "src/components/shell",
      "type": "tree"
    },
    {
      "path": "src/components/shell/AppShell.tsx",
      "type": "blob",
      "size": 8455
    },
    {
      "path": "src/components/shell/PageBoundary.tsx",
      "type": "blob",
      "size": 2308
    },
    {
      "path": "src/components/ui",
      "type": "tree"
    },
    {
      "path": "src/components/ui/index.tsx",
      "type": "blob",
      "size": 22566
    },
    {
      "path": "src/components/worker-agent",
      "type": "tree"
    },
    {
      "path": "src/components/worker-agent/WorkerAgent.tsx",
      "type": "blob",
      "size": 49138
    },
    {
      "path": "src/index.css",
      "type": "blob",
      "size": 18120
    },
    {
      "path": "src/lib",
      "type": "tree"
    },
    {
      "path": "src/lib/api.ts",
      "type": "blob",
      "size": 5589
    },
    {
      "path": "src/lib/format.ts",
      "type": "blob",
      "size": 2170
    },
    {
      "path": "src/lib/mailSound.ts",
      "type": "blob",
      "size": 1755
    },
    {
      "path": "src/lib/markdown.tsx",
      "type": "blob",
      "size": 7391
    },
    {
      "path": "src/lib/noZoom.ts",
      "type": "blob",
      "size": 1766
    },
    {
      "path": "src/lib/passkey.ts",
      "type": "blob",
      "size": 7456
    },
    {
      "path": "src/lib/theme.tsx",
      "type": "blob",
      "size": 1134
    },
    {
      "path": "src/main.tsx",
      "type": "blob",
      "size": 689
    },
    {
      "path": "src/navigation.ts",
      "type": "blob",
      "size": 3651
    },
    {
      "path": "tests",
      "type": "tree"
    },
    {
      "path": "tests/ai-usage.test.ts",
      "type": "blob",
      "size": 4614
    },
    {
      "path": "tests/approval-security.test.ts",
      "type": "blob",
      "size": 1902
    },
    {
      "path": "tests/assistant-notices.test.ts",
      "type": "blob",
      "size": 3352
    },
    {
      "path": "tests/assistant-quality.test.ts",
      "type": "blob",
      "size": 4836
    },
    {
      "path": "tests/assistant.test.ts",
      "type": "blob",
      "size": 31503
    },
    {
      "path": "tests/billing.test.ts",
      "type": "blob",
      "size": 6651
    },
    {
      "path": "tests/browser-dom.test.ts",
      "type": "blob",
      "size": 5052
    },
    {
      "path": "tests/browser-publish.test.ts",
      "type": "blob",
      "size": 3299
    },
    {
      "path": "tests/browser-url-and-markup-security.test.ts",
      "type": "blob",
      "size": 1710
    },
    {
      "path": "tests/browser.test.ts",
      "type": "blob",
      "size": 36614
    },
    {
      "path": "tests/cloudflare-inbound.test.ts",
      "type": "blob",
      "size": 5161
    },
    {
      "path": "tests/coding-jobs.test.ts",
      "type": "blob",
      "size": 2492
    },
    {
      "path": "tests/coding-publish.test.ts",
      "type": "blob",
      "size": 6143
    },
    {
      "path": "tests/codingReview.test.ts",
      "type": "blob",
      "size": 5129
    },
    {
      "path": "tests/email-routes.test.ts",
      "type": "blob",
      "size": 21313
    },
    {
      "path": "tests/glm-flash.test.ts",
      "type": "blob",
      "size": 3566
    },
    {
      "path": "tests/intelligence-knowledge.test.ts",
      "type": "blob",
      "size": 1742
    },
    {
      "path": "tests/intelligence-memory.test.ts",
      "type": "blob",
      "size": 4245
    },
    {
      "path": "tests/invited-auth.test.ts",
      "type": "blob",
      "size": 3638
    },
    {
      "path": "tests/ios-input-zoom.test.ts",
      "type": "blob",
      "size": 809
    },
    {
      "path": "tests/knowledge-assist.test.ts",
      "type": "blob",
      "size": 9127
    },
    {
      "path": "tests/pages-proxy.test.ts",
      "type": "blob",
      "size": 2027
    },
    {
      "path": "tests/passkey-browser.test.ts",
      "type": "blob",
      "size": 5284
    },
    {
      "path": "tests/passkeys.test.ts",
      "type": "blob",
      "size": 13797
    },
    {
      "path": "tests/platform.test.ts",
      "type": "blob",
      "size": 29744
    },
    {
      "path": "tests/readiness-security.test.ts",
      "type": "blob",
      "size": 3030
    },
    {
      "path": "tests/responsive-ui.test.ts",
      "type": "blob",
      "size": 3113
    },
    {
      "path": "tests/security.test.ts",
      "type": "blob",
      "size": 7858
    },
    {
      "path": "tests/sigv4.test.ts",
      "type": "blob",
      "size": 2061
    },
    {
      "path": "tests/smtp.test.ts",
      "type": "blob",
      "size": 15270
    },
    {
      "path": "tests/worker.test.ts",
      "type": "blob",
      "size": 10916
    },
    {
      "path": "tsconfig.json",
      "type": "blob",
      "size": 538
    },
    {
      "path": "vite.config.ts",
      "type": "blob",
      "size": 601
    },
    {
      "path": "wrangler.toml",
      "type": "blob",
      "size": 8530
    }
  ]
};

const createPrivateRepository = (
  id: string,
  label: string,
  fullName: string,
  note: string,
  files: Record<string, string>,
  extraPaths: string[],
  treeSnapshot?: RepositoryTreeEntry[]
): ProjectRepository => ({
  id,
  label,
  fullName,
  branch: 'main',
  visibility: 'private',
  repoUrl: 'https://github.com/' + fullName,
  note,
  treeLabel: treeSnapshot?.length ? 'Private GitHub tree snapshot · main' : 'Sanitized showcase structure',
  treeSource: treeSnapshot?.length ? 'github' : 'sanitized',
  tree: treeSnapshot?.length ? treeSnapshot : makeTree([...Object.keys(files), ...extraPaths]),
  showcaseFiles: files
});

const repositoriesByProject: Record<string, ProjectRepository[]> = {
  'master-ai-multi-agent-workspace': [
    createPrivateRepository(
      'master-ai',
      'MASTER AI',
      'DevJel/xCoder-V2',
      'Folder and file names are captured from the private GitHub main branch during the portfolio build. File previews are sanitized examples only; original private source contents, credentials, internal records and sensitive configuration are not embedded in this public site. The linked repository remains access-controlled.',
      masterFiles,
      [
        'docs/FEATURE_TABS_GUIDE.md',
        'docs/RELEASE_PLAN_PUBLIC_SHOWCASE.txt',
        'docs/architecture/overview.md',
        'docs/diagrams/agent-workflow.mmd',
        'public/landing.html',
        'public/login.html',
        'public/index.html',
        'public/feature-guide-page.example.js',
        'scripts/repository-audit.example.mjs',
        'scripts/capture-ui-screenshots.example.mjs',
        'src/worker.example.js',
        'src/otp.example.js',
        'src/mcp-client.example.js',
        'src/automation.example.js',
        'workers/reviewer.example.js',
        'tests/agent-workflow.example.test.mjs',
        'package.example.json',
        'wrangler.example.jsonc'
      ],
      privateTreeSnapshots['DevJel/xCoder-V2']
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
  'leadmaster-email-campaign-platform': [
    {
      id: 'leadmaster',
      label: 'LeadMASTER',
      fullName: 'DevJel/LeadMASTER',
      branch: 'main',
      visibility: 'public',
      repoUrl: 'https://github.com/DevJel/LeadMASTER',
      note: 'Public LeadMASTER source repository. Review the README, SMTP transport, queue workflow and migrations. Production credentials, recipient records and account-specific bindings are not included in the portfolio.',
      treeLabel: 'Public GitHub repository · main',
      treeSource: 'github',
      tree: makeTree([
        'README.md',
        'SES_TRANSPORT.md',
        'docs/QUEUE_DESIGN.md',
        'docs/QUEUE_RATE_REVIEW.md',
        'docs/HTML_PREVIEW.md',
        'src/Mandatory LeadMASTER Dashboard.html',
        'src/ses-smtp.mjs',
        'src/ses-event-correlation.mjs',
        'src/email-queue-core.mjs',
        'src/email-queue-worker.mjs',
        'src/mail-consumer-core.mjs',
        'src/email-coordinator.mjs',
        'src/queue-submission.mjs',
        'migrations/0006_mail_processing_and_activity.sql',
        'test/ses-smtp.test.mjs',
        'test/ses-event-correlation.test.mjs',
        'test/email-queue-core.test.mjs'
      ]),
      previewPaths: [
        'README.md',
        'SES_TRANSPORT.md',
        'docs/QUEUE_DESIGN.md',
        'docs/QUEUE_RATE_REVIEW.md',
        'docs/HTML_PREVIEW.md',
        'src/ses-smtp.mjs',
        'src/ses-event-correlation.mjs',
        'src/email-queue-core.mjs',
        'src/email-queue-worker.mjs',
        'src/mail-consumer-core.mjs',
        'test/ses-event-correlation.test.mjs'
      ]
    }
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
      'Folder and file names are captured from the private GitHub main branch during the portfolio build. File previews are sanitized examples only; original private source contents, credentials, internal records and sensitive configuration are not embedded in this public site. The linked repository remains access-controlled.',
      bolekpadFiles,
      [
        'auth-worker/src/auth.example.js',
        'backend/src/api.example.ts',
        'frontend/pubspec.yaml',
        'legacy/src/App.example.tsx',
        'docs/screenshots/README.md',
        'scripts/build.example.mjs',
        'tests/workspace.example.test.ts'
      ],
      privateTreeSnapshots['Dev-Jel-Works/Bolekpad']
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
      'devai-controller',
      'DevAI Controller',
      'Dev-Jel-Works/Dev-ai-Controller',
      'Folder and file names are captured from the private GitHub main branch during the portfolio build. File previews are sanitized examples only; original private source contents, credentials, internal records and sensitive configuration are not embedded in this public site. The linked repository remains access-controlled.',
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
      ],
      privateTreeSnapshots['Dev-Jel-Works/Dev-ai-Controller']
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
        .map((entry) => {
          const mapped: RepositoryTreeEntry = {
            path: entry.path,
            type: entry.type === 'tree' ? 'tree' : 'blob'
          };
          if (typeof entry.size === 'number') mapped.size = entry.size;
          if (typeof entry.sha === 'string') mapped.sha = entry.sha;
          return mapped;
        });
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
