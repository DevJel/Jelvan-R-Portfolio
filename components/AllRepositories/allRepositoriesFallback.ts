/**
 * Built-in list shown when /api/repos is unavailable (local dev, or GitHub
 * is unreachable). The live list from the Worker replaces it when it loads.
 *
 * Private repositories appear by name only: no link, code or metadata.
 * Snapshot taken 2026-11-08.
 */

export type RepoVisibility = 'public' | 'private';

export type PortfolioRepo = {
  name: string;
  owner: string;
  visibility: RepoVisibility;
  description: string;
  url?: string;
  homepage?: string;
  language?: string;
  stars?: number;
  fork?: boolean;
  updatedAt?: string;
};

const pub = (owner: string, name: string, updatedAt: string, fork = false): PortfolioRepo => ({
  name,
  owner,
  visibility: 'public',
  description: '',
  url: `https://github.com/${owner}/${name}`,
  fork,
  updatedAt,
});

const priv = (owner: string, name: string): PortfolioRepo => ({
  name,
  owner,
  visibility: 'private',
  description: '',
});

export const fallbackRepositories: PortfolioRepo[] = [
  pub('DevJel', 'Jelvan-R-Portfolio', '2026-11-07T21:31:47Z'),
  pub('DevJel', 'jelsketchenwares', '2026-11-07T20:46:50Z'),
  pub('DevJel', 'jelhr-system', '2026-11-07T03:53:46Z'),
  pub('DevJel', 'Proctify', '2026-11-07T03:24:40Z'),
  pub('Operava-Global', 'Operava-Website-V2', '2026-11-07T01:08:52Z'),
  priv('DevJel', 'Email-LEADer'),
  priv('DevJel', 'Muse-V3'),
  priv('DevJel', 'xCoder-V2'),
  priv('Dev-Jel-Works', 'master-CEO-ai-'),
  pub('DevJel', 'ai-api-store-hub', '2026-11-05T03:46:21Z'),
  priv('Dev-Jel-Works', 'jelvan-development-mcp'),
  priv('Dev-Jel-Works', 'operava-maildesk-api'),
  pub('DevJel', 'knowledge-center-system', '2026-11-02T20:09:17Z'),
  pub('DevJel', 'mermaid', '2026-11-02T15:05:29Z', true),
  priv('Dev-Jel-Works', 'Identity-Verification'),
  priv('Dev-Jel-Works', 'Dev-ai-Controller'),
  priv('Dev-Jel-Works', 'Bolekpad'),
  priv('Dev-Jel-Works', 'xCoder-Multi-Ai-Agent'),
  priv('DevJel', 'Bolekpad'),
  priv('DevJel', 'Virtual-Desktop'),
  priv('Dev-Jel-Works', 'Operava-Payment-Portal'),
  priv('Dev-Jel-Works', 'MailDesk-iOS'),
  priv('Dev-Jel-Works', 'MailDesk-Android'),
  priv('Dev-Jel-Works', 'iTicket-'),
  priv('DevJel', 'ISO-IEC'),
  priv('Dev-Jel-Works', 'Dev-Ai-Controller-iOS'),
  priv('Dev-Jel-Works', 'Dev-Ai-Controller-Android'),
  pub('DevJel', 'verified-profile', '2026-10-28T20:18:09Z'),
  priv('Dev-Jel-Works', 'global-MIS'),
  priv('Dev-Jel-Works', 'operava-response-agents'),
  priv('Dev-Jel-Works', 'demo-repository'),
  priv('Dev-Jel-Works', 'Management-Information-System'),
  priv('Dev-Jel-Works', 'ISO-IEC'),
  pub('DevJel', 'app-watchtower', '2026-10-25T19:59:29Z'),
  priv('Dev-Jel-Works', 'Operava-Social-Hub'),
  priv('Dev-Jel-Works', 'xCoder-V1'),
  priv('Dev-Jel-Works', 'Website'),
  priv('Dev-Jel-Works', 'Virtual-Desktop'),
  pub('Dev-Jel-Works', 'authentik', '2026-10-07T12:17:04Z', true),
  priv('Dev-Jel-Works', 'bolek-ai'),
  priv('Dev-Jel-Works', 'Cloudflare-AI'),
  priv('Dev-Jel-Works', 'Operava-Website-Updates'),
  priv('Dev-Jel-Works', 'Bolek-AI-Studio'),
  priv('Dev-Jel-Works', 'AVA_Character'),
  priv('Dev-Jel-Works', 'OPERAVA-VIDEO-GEN-BIBLE'),
  priv('Dev-Jel-Works', 'Wise'),
  priv('Dev-Jel-Works', 'operavanotev2'),
  priv('Dev-Jel-Works', 'MD-documents'),
  priv('Dev-Jel-Works', 'notepad'),
];
