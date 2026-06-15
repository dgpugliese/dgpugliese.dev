// dgpugliese.dev — Signal Log / Blog posts
// Add new entries to the TOP of the array (latest first).

export const posts = [
  {
    slug: 'taking-on-build-work',
    date: '2026-05-17',
    category: 'OPS',
    categoryColor: 'cyan',
    title: 'I\'m Taking On Build Work for Clients',
    summary:
      'Fixed-price product builds. 4–8 weeks. Concept to shipped. For founders, nonprofits, and small organizations that need real software — not a Gantt chart. Here\'s what I build, who it\'s for, and how it works.',
    readTime: '4 min',
    cta: {
      label: 'HAVE A PRODUCT IN MIND?',
      text: 'Book a free 30-minute scoping call. We\'ll figure out together whether it\'s the right fit — no pressure, no sales pitch.',
      button: '→ SEE BUILD SERVICES',
      href: '/build',
      secondary: { button: '✉ dp@dgpugliese.dev', href: 'mailto:dp@dgpugliese.dev' },
    },
    body: [
      {
        heading: 'Why I\'m Doing This',
        text: `For a decade I\'ve built and operated infrastructure, identity systems, and full-stack platforms — most recently as Director of IT for an international fraternity with members across North America. I\'ve also been shipping things on the side: a zero-knowledge file transfer tool (Obscura), a split-key dead-man\'s switch (SilentBeat), a compliance dashboard tracking 702 active nonprofit chapters\' IRS 990 filings. The through-line is privacy, security, and products that have to actually work — not demos. I\'m formalizing all of that into a build service: fixed scope, fixed price, fixed timeline, one builder, one accountable name.`,
      },
      {
        heading: 'What I Build',
        text: `The lane is products where doing it right matters — where "ship fast" and "don\'t leak data" both have to be true. Compliance dashboards and reporting tools for nonprofits, associations, and regulated organizations. Internal tools handling sensitive data — member portals, case management, financial workflows. Privacy- and security-forward web apps, consumer or B2B, built with the right defaults from day one. Replacements for spreadsheets-that-became-a-business — when the workflow outgrew Excel and you need real software. If you\'re looking at agency quotes in the $50–100k range for something a single builder could ship in two months, I\'m the alternative.`,
      },
      {
        heading: 'How It Works',
        text: `One free 30-minute scoping call. If we\'re a fit, you get a written proposal within 48 hours: fixed scope, fixed price, fixed timeline. Sign the contract, pay 50% deposit, and your build slot is locked. The deposit secures the engagement and is non-refundable if you cancel — fair to both of us. Then we build. Weekly demos every Friday, so you see real software growing week by week. Scope changes get re-quoted in writing before any work happens — no creep, no surprises. On delivery, you pay the remaining 50% and receive the code, the deployment, the documentation, and 30 days of bug-fix support. Full ownership transferred to you, no licensing tricks. Starter builds are 3–4 weeks from $12,000. Standard builds are 6–8 weeks from $25,000. Larger or unusual scopes get quoted after the call.`,
      },
      {
        heading: 'Why a Solo Builder vs. an Agency',
        text: `Agencies have to charge agency rates because they have agency overhead — account managers, project managers, designers, multiple ICs, executive layers. For products in the $50–100k range you\'re paying mostly for coordination, not code. A solo builder who can actually ship end-to-end produces the same software for a third the cost in less time, because the coordination cost is zero. The tradeoff: you get me, not a team. If you need a five-person engagement, hire an agency. If you need one experienced person to take your idea and ship it without a status meeting in sight, that\'s what this is. The day job stays — this is a parallel contract practice, deliberately sized to the work I can do well alongside it.`,
      },
      {
        heading: 'How to Start',
        text: `If you have a product in mind, book a scoping call at dgpugliese.dev/build. It\'s free, it\'s 30 minutes, and the worst case is I tell you it\'s not a fit and point you toward someone better. If you don\'t have a project yourself but know someone who might — a founder friend, a nonprofit you serve on the board of, an association struggling with spreadsheets — forward the link. The first few engagements will come through warm introductions; that\'s how it always works for this kind of business. dp@dgpugliese.dev for everything else.`,
      },
    ],
  },
  {
    slug: 'reverse-engineering-irs-teos',
    date: '2026-05-13',
    category: 'DATA',
    categoryColor: 'amber',
    title: 'The IRS Has a JSON API. Most People Don\'t Know It Exists.',
    summary:
      "The IRS publishes 990-N e-Postcard filings as a single 'latest-per-EIN' bulk file — no public feed for year-by-year history. That history lives in TEOS, the search UI. Here's how a 30-second devtools inspection revealed it's actually a clean JSON API, and how I pulled every available year of nonprofit filings (back to 2008) without scraping a single HTML page.",
    readTime: '5 min',
    body: [
      {
        heading: 'The Bulk-Data Problem',
        text: `The IRS publishes a generous amount of nonprofit data. The Exempt Organizations Business Master File. The Auto-Revocation List. An AWS public dataset with full 990 returns at s3://irs-form-990/. But for 990-N e-Postcard filings — the form roughly 70% of small nonprofits file — the bulk feed contains exactly one row per organization: the most recent filing. No year-by-year history, no chronological view. If you want to know whether a particular nonprofit filed in 2018 and 2019 and 2020, the bulk feed will not tell you. That's the data gap I hit building a compliance dashboard for 702 active fraternity chapters.`,
      },
      {
        heading: 'The Network Tab Tells the Truth',
        text: `I needed historical 990-N per chapter, back to 2008, with no obvious bulk source. The IRS's Tax Exempt Organization Search (TEOS) at apps.irs.gov/teos has the data — type in an EIN, get the full history rendered as a table. So I opened DevTools, pulled up the Network tab, and submitted a single EIN. The page made exactly one XHR: a GET to apps.irs.gov/teos/details/ePostSearch/{EIN}. No API key. No auth header. JSON response. Clean shape: an array of filings, one per row, each with tax_year, filing_date, form_type. Exactly the data I needed, served by the IRS's own backend in the cleanest format possible. The HTML page was a thin wrapper around it.`,
      },
      {
        heading: 'Building the Scraper That Doesn\'t Scrape',
        text: `The proof-of-concept was a 30-line Node script: read the EIN list from Supabase, throttle to one request per second to be a good citizen, hit the TEOS endpoint for each EIN, parse the JSON, upsert into a filings table. No HTML parsing, no headless browser, no Cheerio or Playwright. Critically: no fragile DOM selectors to break when the IRS updates its UI. The JSON shape is the surface I'm coupling to, not the markup. After one full pass: 3,672 filings imported across 434 chapters, going back to 2008. Since then the script has hardened — it now handles Akamai bot mitigation, retry/backoff, and a dry-run flag — but the shape is the same: hit the JSON API, upsert, write an audit row. The fetcher runs weekly on a GitHub Actions schedule for free; the data lands in Supabase free tier; the IRS serves the JSON at no cost to me. The whole pipeline runs at roughly $0/yr.`,
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
        text: `The Web Crypto API is implemented natively in every modern browser. SubtleCrypto.encrypt() and .decrypt() are async, non-blocking, and hardware-accelerated on most devices. Default link-fragment mode keeps the file-encryption path on browser-native primitives; optional passphrase mode adds the Argon2id WASM module for memory-hard key wrapping.`,
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
