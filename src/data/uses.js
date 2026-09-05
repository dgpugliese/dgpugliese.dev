// /uses — grouped stack + certifications. Content consolidated from the
// former Skills chip list and Certs badge grid; nothing invented.

export const groups = [
  {
    name: 'Identity & Access',
    blurb: 'Every login should survive an audit, not just a login screen.',
    items: ['Entra ID', 'Conditional Access', 'SSO', 'MFA', 'WebAuthn', 'OAuth 2.0', 'Active Directory'],
  },
  {
    name: 'AI & Agent Tooling',
    blurb: 'Agents get the same access discipline as any other identity — nothing more.',
    items: ['Claude Sonnet/Opus', 'Claude Code', 'MCP Servers', 'n8n', 'Agentic Workflows', 'Prompt Engineering'],
  },
  {
    name: 'Cloud & SaaS',
    blurb: 'Cloudflare and Supabase by default; Azure, AWS, and M365 where the org already lives there.',
    items: ['Azure', 'AWS', 'Microsoft 365', 'Google Workspace', 'Cloudflare Workers', 'Supabase', 'Vercel'],
  },
  {
    name: 'Virtualization & Infra',
    blurb: 'Infrastructure that survives being rebuilt from scratch, because eventually it has to be.',
    items: ['VMware ESXi', 'Hyper-V', 'Proxmox', 'XCP-ng', 'Docker', 'Terraform', 'Ansible', 'GitHub Actions'],
  },
  {
    name: 'Networking',
    blurb: 'Segment first, trust nothing by default.',
    items: ['FortiGate', 'SonicWall', 'Cisco Catalyst', 'Cisco Meraki', 'UniFi', '802.1Q VLAN', 'IPsec VPN', 'SD-WAN'],
  },
  {
    name: 'Security, Compliance & Observability',
    blurb: "A control that isn't monitored isn't a control.",
    items: ['NIST 800-53', 'CIS Controls', 'SOC 2', 'SIEM', 'Grafana', 'Prometheus', 'Uptime Kuma', 'Defender', 'SentinelOne', 'Bitdefender', 'ESET', 'Webroot', 'Huntress', 'Automox', 'Intune'],
  },
  {
    name: 'MSP & Backup Tooling',
    blurb: "Backups are worthless until you've actually run the restore.",
    items: ['NinjaRMM', 'Datto RMM', 'N-able', 'ConnectWise Manage', 'IT Glue', 'Liongard', 'Passportal', 'Veeam', 'Acronis Cyber Backup', 'Datto', 'Dropsuite', 'Unitrends', 'Synology'],
  },
  {
    name: 'Engineering Stack',
    blurb: "Boring, production-grade defaults over whatever's trending this month.",
    items: ['TypeScript', 'Python', 'SQL', 'PowerShell', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node/Express', 'Web Crypto API', 'Stripe', 'Salesforce/Fonteva'],
  },
  {
    name: 'Design Tooling',
    blurb: 'Functional design in-house; brand-level visual design goes to a designer.',
    items: ['Figma', 'Claude Design', 'Stitch'],
  },
];

// Certification counts by domain — real Credly-verified totals plus one
// explicitly marked in-progress item. Full list/badges: credly.com/users/dpugliese.
export const certGroups = [
  { name: 'Security', count: 5 },
  { name: 'Cloud', count: 6, inProgress: 1 },
  { name: 'Networking', count: 4 },
  { name: 'Virtualization & Infra', count: 4 },
  { name: 'Foundations & Ops', count: 7 },
];
