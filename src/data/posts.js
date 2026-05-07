// dgpugliese.dev — Signal Log / Blog posts
// Add new entries to the TOP of the array (latest first).

export const posts = [
  {
    slug: 'building-production-mcp-servers',
    date: '2026-04-22',
    category: 'AI',
    categoryColor: 'violet',
    title: 'Building Production MCP Servers: Access, Scoping, and the Non-Human Identity Problem',
    summary:
      'What it actually takes to run Claude agent infrastructure in an enterprise — the identity model, scoping decisions, and audit posture I built for non-human access to M365, Google Workspace, and Cloudflare.',
    readTime: '6 min',
    body: [
      {
        heading: 'The Problem with Agent Identity',
        text: `Most orgs think about identity for humans. An agent connecting to your M365 tenant on behalf of a user — or autonomously — doesn't fit neatly into that model. It's not a service account, not a user, not quite a managed identity. It's something new, and if you treat it like any of those things, you're going to leave gaps in your audit trail or over-permission something that shouldn't have it.`,
      },
      {
        heading: 'The Model I Built',
        text: `For our production MCP server stack, I settled on a per-connector, least-privilege model: each MCP server has exactly the scopes it needs, scoped to a dedicated Entra ID service principal, with Conditional Access policies blocking token issuance outside expected network ranges. Audit logs route to a SIEM. Access is reviewed quarterly — same as any privileged identity.`,
      },
      {
        heading: 'Scoping Is the Hard Part',
        text: `Graph API scopes for M365 are broad by default. Mail.ReadWrite on a service principal means it can read every mailbox in the tenant. I spent a week mapping minimum necessary scopes per tool, then fought with the permissions model to get them applied correctly to the right principal without breaking delegated flows for human users. This is the part nobody talks about in the MCP tutorials.`,
      },
      {
        heading: 'What This Changes for Claude',
        text: `Claude Code and the Agent SDK don't do anything magic here — they call MCP tools, which call APIs, which hit your IdP. The intelligence is in how you scope those APIs. Narrow scopes + structured audit = a non-human identity you can actually defend in a compliance review. The agent is only as trustworthy as the access model underneath it.`,
      },
    ],
  },
  {
    slug: 'zero-knowledge-file-transfer',
    date: '2026-03-10',
    category: 'SECURITY',
    categoryColor: 'green',
    title: 'How Obscura Works: Browser-Side AES-256-GCM Without Compromise',
    summary:
      'A technical walkthrough of building a zero-knowledge file transfer tool — all encryption runs in the browser using the Web Crypto API. The server only ever sees ciphertext.',
    readTime: '8 min',
    body: [
      {
        heading: 'The Constraint',
        text: `The design goal was simple to state and hard to execute: the server should be provably unable to decrypt a file, even if subpoenaed or compromised. That means no server-side key derivation, no key escrow, no "client-side encryption" that actually phones home with the key. If you can't prove the guarantee holds, it's not a guarantee.`,
      },
      {
        heading: 'The Crypto Stack',
        text: `Obscura uses AES-256-GCM for file encryption. The key is derived from a user passphrase using Argon2id (via a WASM build) — memory-hard, resistant to GPU cracking. The IV is randomly generated per file. The derived key never leaves the browser; what gets uploaded is the encrypted blob and a hash of the metadata for integrity verification. That's it.`,
      },
      {
        heading: 'Why Web Crypto API',
        text: `The Web Crypto API is implemented natively in every modern browser. No dependencies, no supply-chain attack surface. SubtleCrypto.encrypt() and .decrypt() are async, non-blocking, and hardware-accelerated on most devices. The only external dependency is the Argon2id WASM module — and you can audit the source yourself. I didn't want a library between me and the primitive.`,
      },
      {
        heading: 'The Threat Model',
        text: `Obscura is designed for the case where you don't trust the infrastructure — not the hosting provider, not the CDN, not the storage backend. If any of those are compromised, the attacker gets encrypted blobs they can't use without the passphrase. The threat model breaks down if the passphrase is weak or shared insecurely, but that's a user problem, not a cryptography problem.`,
      },
    ],
  },
  {
    slug: 'nist-for-nonprofits',
    date: '2026-02-18',
    category: 'COMPLIANCE',
    categoryColor: 'amber',
    title: 'NIST 800-53 for Nonprofits: What Actually Moves the Needle',
    summary:
      "What I learned standing up the org's first real security posture — the controls that mattered, the ones that didn't, and how to scope for a team of one.",
    readTime: '5 min',
    body: [
      {
        heading: 'Where Most Orgs Start Wrong',
        text: `They start with the full control catalog and freeze. NIST 800-53 has over 1,000 controls across 20 families. For a 150K-member nonprofit with a lean IT function, trying to satisfy everything is how you end up with a compliance theater exercise that protects nothing and costs everything. The catalog is a menu, not a checklist.`,
      },
      {
        heading: 'What I Actually Prioritized',
        text: `AC (Access Control), IA (Identification and Authentication), SC (System and Communications Protection), and SI (System and Information Integrity). These four families cover the attack surface that actually gets exploited: credential abuse, lateral movement, unencrypted data in transit, and unpatched endpoints. Get these right before you touch anything else.`,
      },
      {
        heading: 'Passwordless First',
        text: `The biggest single reduction in identity risk came from rolling out WebAuthn/passkeys as the primary auth factor and eliminating shared credentials entirely. Phishing-resistant MFA sounds like a checkbox, but it's genuinely hard to operationalize across an org where most users aren't technically sophisticated. The enrollment UX matters more than the crypto.`,
      },
      {
        heading: 'The Pen Test Was the Best Investment',
        text: `Commissioning the org's first third-party penetration test surfaced two things the internal review missed. I'm not publishing what they were, but the lesson is: read your own controls, then pay someone to break them. The delta between what you think is hardened and what actually holds is where your real risk lives. Budget for it.`,
      },
    ],
  },
];
