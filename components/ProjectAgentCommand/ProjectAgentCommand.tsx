import React, { useMemo, useState } from 'react';

type Props = {
  projectTitle: string;
  repositoryUrl?: string;
  repositoryVisibility: string;
};

const ProjectAgentCommand = ({ projectTitle, repositoryUrl, repositoryVisibility }: Props): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => [
    `You are the implementation and deployment agent for the "${projectTitle}" project.`,
    repositoryUrl ? `Source repository: ${repositoryUrl}` : 'Source repository: locate the configured source repository from the project documentation; do not guess.',
    `Repository visibility: ${repositoryVisibility}.`,
    '',
    'TASK: Reconstruct and deploy this project manually from its authorized source repository.',
    '1. Inspect the repository README, manifests, lockfiles, folder tree, build scripts, framework configuration, environment examples, migrations, CI workflows and deployment configuration before changing anything.',
    '2. Confirm the default branch, latest commit, license, repository access and whether the current source is public, private or only a documented blueprint.',
    '3. If private, use only credentials and access already explicitly provided by the project owner in the approved environment. Never print, copy into chat, commit or expose tokens, passwords, private keys, .env files or production secrets.',
    '4. Create a clean working copy in the requested destination. Preserve Git history when requested; otherwise copy tracked project files while excluding .git, dependencies, caches, build output, local secrets and user data. Do not overwrite an existing destination without approval.',
    '5. Recreate the documented runtime and dependency versions from the lockfile. Install dependencies, apply only reviewed migrations to the intended environment, and use synthetic data for tests.',
    '6. Map every required environment variable and platform binding. Create a placeholder environment template, then ask the owner to configure secrets directly in the deployment provider. Never invent secret values or production identifiers.',
    '7. Run formatting, lint, type checks, unit/integration tests, security checks and a production build. Fix failures and report the exact commands and results.',
    '8. Select a deployment platform only after checking the actual framework, runtime, build command, output directory, routes, bindings, storage and background-job requirements. Do not assume Cloudflare, Vercel, Netlify or AWS compatibility.',
    '9. Deploy to an isolated preview/staging environment first. Verify deep links, API routes, authentication, authorization, storage, email, logs, rate limits, headers and mobile layouts.',
    '10. Request explicit owner approval before production deployment, DNS changes, destructive migrations, repository visibility changes, billing changes or external side effects.',
    '11. After approval, deploy the exact tested commit, run smoke tests, record the deployment URL and commit SHA, and document rollback steps.',
    '12. Update README and docs with architecture, Mermaid diagrams, exact folder structure, required bindings, setup, test commands, deployment steps, security controls and known limitations.',
    '',
    'DELIVERABLE: a change summary, source/destination repository details, commit SHA, verified build/test output, deployment target and URL (if deployed), configuration checklist, risks and rollback procedure. Clearly label anything not verified. Do not claim deployment succeeded unless the provider confirms it.'
  ].join('\n'), [projectTitle, repositoryUrl, repositoryVisibility]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="project-agent-command">
      <div className="project-agent-command__heading">
        <div>
          <span className="project-detail-eyebrow">AI CODING AGENT</span>
          <h2>Copy, rebuild and deploy with an AI agent</h2>
        </div>
        <button type="button" onClick={copyPrompt} className="project-agent-command__copy">
          {copied ? 'Copied' : 'Copy agent instructions'}
        </button>
      </div>
      <p className="project-detail-intro">
        A repository-aware instruction set for an authorized coding agent. It requires inspection
        of the real source and configuration before copying or deployment; it does not expose private
        credentials or assume that a deployment platform is compatible.
      </p>
      <pre className="project-agent-command__prompt">{prompt}</pre>
      <style jsx>{`
        .project-agent-command { border: 1px solid rgba(244,129,32,.28); border-radius: 18px; padding: 1.25rem; background: rgba(255,255,255,.86); }
        .project-agent-command__heading { display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap; }
        .project-agent-command__heading h2 { margin:.35rem 0 .5rem; color:#22232a; font-size:clamp(1.25rem,2vw,1.7rem); }
        .project-agent-command__copy { border:0; border-radius:999px; padding:.75rem 1.1rem; background:#f48120; color:#17181d; font-weight:750; cursor:pointer; }
        .project-agent-command__prompt { max-height:480px; overflow:auto; white-space:pre-wrap; overflow-wrap:anywhere; padding:1rem; border-radius:12px; background:#202127; color:#f5f5f5; font-size:.82rem; line-height:1.6; }
      `}</style>
    </section>
  );
};

export default ProjectAgentCommand;
