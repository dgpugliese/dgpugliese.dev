// dgpugliese.dev — Signal Log / Blog posts
// Add new entries to the TOP of the array (latest first).

export const posts = [
  {
    slug: 'reverse-engineering-irs-teos',
    date: '2026-05-13',
    category: 'DATA',
    categoryColor: 'amber',
    title: 'The IRS Has a JSON API. Most People Don\'t Know It Exists.',
    summary:
      "The IRS publishes 990-N e-Postcard filings as a single 'latest-per-EIN' bulk file — no public feed for year-by-year history. That history lives in TEOS, the search UI. Here's how a 30-second devtools inspection revealed it's actually a clean JSON API, and how I pulled 16 years of nonprofit filings without scraping a single HTML page.",
    readTime: '5 min',
    body: [
      {
        heading: 'The Bulk-Data Problem',
        text: `The IRS publishes a generous amount of nonprofit data. The Exempt Organizations Business Master File. The Auto-Revocation List. An AWS public dataset with full 990 returns at s3://irs-form-990/. But for 990-N e-Postcard filings — the form roughly 70% of small nonprofits file — the bulk feed contains exactly one row per organization: the most recent filing. No year-by-year history, no chronological view. If you want to know whether a particular nonprofit filed in 2018 and 2019 and 2020, the bulk feed will not tell you. That's the data gap I hit building a compliance dashboard for 858 fraternity chapters.`,
      },
      {
        heading: 'The Network Tab Tells the Truth',
        text: `I needed historical 990-N per chapter, 16 years back, with no obvious bulk source. The IRS's Tax Exempt Organization Search (TEOS) at apps.irs.gov/teos has the data — type in an EIN, get the full history rendered as a table. So I opened DevTools, pulled up the Network tab, and submitted a single EIN. The page made exactly one XHR: a GET to apps.irs.gov/teos/details/ePostSearch/{EIN}. No API key. No auth header. JSON response. Clean shape: an array of filings, one per row, each with tax_year, filing_date, form_type. Exactly the data I needed, served by the IRS's own backend in the cleanest format possible. The HTML page was a thin wrapper around it.`,
      },
      {
        heading: 'Building the Scraper That Doesn\'t Scrape',
        text: `A 30-line Node script: read the EIN list from Supabase, throttle to one request per second to be a good citizen, hit the TEOS endpoint for each EIN, parse the JSON, upsert into a filings table. No HTML parsing, no headless browser, no Cheerio or Playwright. Critically: no fragile DOM selectors to break when the IRS updates its UI. The JSON shape is the surface I'm coupling to, not the markup. After one full pass: 3,672 filings imported across 434 chapters, going back to 2008. The fetcher runs on a GitHub Actions schedule for free; the data lands in Supabase free tier; the IRS serves the JSON at no cost to me. The whole pipeline runs at roughly $0/yr.`,
      },
      {
        heading: 'The Lesson',
        text: `Before you build a scraper, read the network tab. The public web is full of search UIs that are actually thin frontends over clean JSON APIs the operator never officially exposed. Government data sites, university portals, vendor dashboards, internal-feeling enterprise tools — most of them serve JSON to a JavaScript client somewhere, and that JSON is your fastest path to the data. If you're writing a scraper that fights with HTML, you've probably skipped a step. The IRS isn't hiding TEOS's API. They just didn't document it as one. That distinction matters a lot less than people think — and a lot more than it should.`,
      },
    ],
  },
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
        text: `Obscura uses AES-256-GCM for file encryption. In default mode the data key is a random 256-bit WebCrypto key carried in the URL fragment — browsers don't transmit fragments, so the server never sees the key. Optional passphrase mode wraps that key under an Argon2id-derived KEK (memory-hard, GPU-resistant) so the link alone isn't enough; the recipient enters a passphrase out-of-band. The IV is randomly generated per file, and AES-GCM's built-in authentication tag catches any tampered ciphertext at decrypt time — no separate metadata hash needed. That's it.`,
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
