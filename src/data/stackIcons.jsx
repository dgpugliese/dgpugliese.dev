// Maps a subset of Selected Work stack labels to a recognizable brand/tech
// icon. Deliberately incomplete — algorithms, protocols, and internal/vendor
// names with no real logo (Argon2id, OAuth Client-Credentials, Salesforce,
// M365, NIST 800-53...) are left unmapped and render as plain text chips
// instead of a made-up icon. Prefer Tabler (thin stroke, matches the nav
// icons); fall back to Simple Icons only where Tabler has no equivalent.
import {
  TbBrandReact, TbBrandVite, TbBrandTailwind, TbBrandSupabase, TbBrandPython,
  TbBrandCloudflare, TbBrandGit, TbBrandNodejs, TbBrandHtml5, TbBrandGoogle,
  TbDatabase,
} from 'react-icons/tb';
import { SiGithubactions, SiClaude, SiClaudecode, SiObsidian, SiMarkdown, SiUbiquiti } from 'react-icons/si';

export const STACK_ICON = {
  'React': TbBrandReact,
  'Vite': TbBrandVite,
  'Tailwind': TbBrandTailwind,
  'Supabase': TbBrandSupabase,
  'Python (stdlib only)': TbBrandPython,
  'Cloudflare Workers': TbBrandCloudflare,
  'Cloudflare Pages': TbBrandCloudflare,
  'D1': TbDatabase,
  'Git': TbBrandGit,
  'Node': TbBrandNodejs,
  'HTML/JS': TbBrandHtml5,
  'Google Workspace': TbBrandGoogle,
  'GitHub Actions': SiGithubactions,
  'Claude API': SiClaude,
  'Anthropic Claude': SiClaude,
  'Claude Code': SiClaudecode,
  'Obsidian': SiObsidian,
  'Markdown': SiMarkdown,
  'UniFi': SiUbiquiti,
};

export function StackIcon({ label }) {
  const Icon = STACK_ICON[label];
  if (!Icon) return <span className="chip stack-chip">{label}</span>;
  return (
    <span className="stack-icon" title={label} aria-label={label}>
      <Icon aria-hidden="true" />
    </span>
  );
}
