import { Link } from 'react-router-dom';

export function About() {
  return (
    <section className="sect" id="about" data-screen-label="02 About">
      <div className="sect-head">
        <span className="sect-num">02 //</span>
        <h2 className="sect-title">About / Mission</h2>
        <span className="sect-sub">~/about.md</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
        <div className="panel panel-corners" style={{ padding: '32px 36px' }}>
          <span className="panel-label">SUMMARY</span>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg)', margin: 0 }}>
            <span style={{ color: 'var(--cyan)' }}>Ten years in IT, infra-first.</span> Came up the hands-on way —
            racks, hypervisors, networking, backups &amp; DR, AD remediation. Grew into full-stack engineering and
            platform architecture in parallel — these days I do <span style={{ color: 'var(--cyan)' }}>both</span>,
            end to end.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', marginTop: 18 }}>
            Day to day I work three surfaces: <span style={{ color: 'var(--violet)' }}>AI agent infrastructure</span> (production
            MCP servers connecting Claude to enterprise SaaS), <span style={{ color: 'var(--cyan)' }}>full-stack platforms</span> (headless
            React/Node against Salesforce/Fonteva, Cloudflare, Supabase), and <span style={{ color: 'var(--cyan)' }}>applied security primitives</span> like
            {' '}<a href="https://obscr.app" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Obscura</a> — a
            zero-knowledge file transfer tool with browser-side AES-256-GCM and Argon2id. On the IT-leadership side:
            stood up the org's first NIST 800-53 / CIS aligned posture and SOC 2-aligned controls, and architected a
            passwordless membership portal end-to-end for 150K-member scale on Cloudflare.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', marginTop: 18 }}>
            I work best with teams that actually ship — recruiters with technical roles, operators who need fractional
            infra leadership, founders who want someone who can both architect the system and write the OAuth callback
            that fixes it at 2 a.m.
          </p>
        </div>
        <div className="panel panel-corners" style={{ padding: '24px 28px' }}>
          <span className="panel-label">CORE_COMPETENCIES</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {[
              ['AI Agent Infrastructure & MCP Servers', 'violet'],
              ['Cloud Identity & Zero-Trust', 'cyan'],
              ['Hybrid Virtualization at Scale', 'cyan'],
              ['Full-Stack Platform Engineering', 'amber'],
              ['Endpoint Hardening & EDR', 'green'],
              ['NIST 800-53 / CIS / SOC 2 Posture', 'green'],
              ['Incident Response & RCA', 'green'],
              ['IT Org Leadership', 'amber'],
              ['Mentorship & Executive Briefing', 'amber'],
            ].map(([t, c]) => (
              <div key={t} className="mono" style={{ fontSize: 12, padding: '6px 10px', borderLeft: `2px solid var(--${c})`, background: 'rgba(78, 201, 224, 0.04)', color: 'var(--fg)' }}>
                <span style={{ color: `var(--${c})`, opacity: 0.6, marginRight: 8 }}>▸</span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const groups = [
    { name: 'Identity & Access', items: ['Entra ID', 'Conditional Access', 'SSO', 'MFA', 'WebAuthn', 'OAuth 2.0', 'AD'], c: 'cyan' },
    { name: 'AI / Agent Tooling', items: ['Claude Sonnet/Opus', 'Claude Code', 'MCP Servers', 'n8n', 'Agentic Workflows', 'Prompt Eng.'], c: 'violet' },
    { name: 'Cloud & SaaS', items: ['Azure', 'AWS', 'Microsoft 365', 'Google Workspace', 'Cloudflare Workers', 'Supabase', 'Vercel'], c: 'cyan' },
    { name: 'Virtualization', items: ['VMware ESXi', 'Hyper-V', 'Proxmox', 'XCP-ng'], c: 'cyan' },
    { name: 'Containers & IaC', items: ['Docker', 'Terraform', 'Ansible', 'GitHub Actions'], c: 'amber' },
    { name: 'Observability', items: ['Grafana', 'Prometheus', 'Uptime Kuma'], c: 'green' },
    { name: 'Security & Compliance', items: ['NIST 800-53', 'CIS Controls', 'SOC 2', 'SIEM'], c: 'green' },
    { name: 'Endpoint Protection', items: ['Defender', 'SentinelOne', 'Bitdefender', 'ESET', 'Webroot', 'Huntress', 'Automox', 'Intune'], c: 'green' },
    { name: 'MSP / Backup Tooling', items: ['NinjaRMM', 'Datto RMM', 'N-able', 'ConnectWise Manage', 'ITGlue', 'Liongard', 'Passportal', 'Veeam', 'Acronis Cyber Backup', 'Datto', 'Dropsuite', 'Unitrends', 'Synology'], c: 'amber' },
    { name: 'Engineering Stack', items: ['TypeScript', 'Python', 'SQL', 'PowerShell', 'React', 'Next.js', 'Vite', 'Tailwind CSS', 'Node/Express', 'Web Crypto API', 'Stripe', 'Salesforce/Fonteva'], c: 'amber' },
    { name: 'Design Tooling', items: ['Figma', 'Claude Design', 'Stitch'], c: 'violet' },
    { name: 'Networking', items: ['FortiGate', 'SonicWall', 'Cisco Catalyst', 'Cisco Meraki', 'UniFi', '802.1Q VLAN', 'IPsec VPN', 'SD-WAN'], c: 'cyan' },
  ];
  return (
    <section className="sect" id="stack" data-screen-label="03 Stack">
      <div className="sect-head">
        <span className="sect-num">03 //</span>
        <h2 className="sect-title">Stack / Loadout</h2>
        <span className="sect-sub">~/stack/*</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {groups.map(g => (
          <div key={g.name} className="panel panel-corners" style={{ padding: '24px 26px' }}>
            <span className="panel-label">{g.name.toUpperCase().replace(/ /g, '_')}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {g.items.map(i => <span key={i} className={`chip chip-${g.c}`}>{i}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const projects = [
    {
      id: 'OBSCURA', kind: 'WEB APP', tag: 'LIVE', tagC: 'green',
      title: 'Obscura',
      sub: 'Zero-knowledge secure file transfer · obscr.app',
      stack: ['Web Crypto API', 'AES-256-GCM', 'Argon2id', 'Zero-Knowledge'],
      detail: "Browser-only file transfer with client-side AES-256-GCM. A random WebCrypto key lives in the URL fragment — never transmitted to the server. Optional passphrase mode wraps the key under an Argon2id-derived KEK. The server only ever sees ciphertext. Built solo end-to-end with a public transparency log, status page, and privacy policy.",
      caseStudy: '/obscura',
      live: 'https://obscr.app/',
      repo: 'https://github.com/dgpugliese/obscura',
    },
    {
      id: 'SILENTBEAT', kind: 'WEB APP', tag: 'LIVE', tagC: 'green',
      title: 'SilentBeat',
      sub: 'Honest dead man\'s switch · silentbeat.app',
      stack: ['Cloudflare Workers', 'Durable Objects', 'D1', 'Split-Key', 'ECIES', 'Argon2id'],
      detail: 'A check-in you keep. A message that ships if you don\'t. Split-key trust model — server holds share A, recipient holds share B (in a browser-generated rescue file). Neither half decrypts on its own; combined K never exists on a server.',
      caseStudy: '/silentbeat',
      live: 'https://silentbeat.app/',
      repo: 'https://github.com/dgpugliese/silentbeat',
    },
    {
      id: 'TRISKELE', kind: 'WEB APP', tag: 'IN DEVELOPMENT', tagC: 'amber',
      title: 'Triskele',
      sub: 'Quorum vault · k-of-n guardians',
      stack: ['Next.js', 'TypeScript', 'Shamir SSS', 'ECDH P-256', 'HKDF-SHA256', 'Supabase', 'Cloudflare Pages'],
      detail: 'Privacy-first encrypted vault that requires k of n trusted guardians to unseal. Three-layer control: AES-GCM-256 envelope on the payload, Shamir Secret Sharing of the data-encryption key, and per-guardian ECDH(P-256)→HKDF→AES-GCM wrapping of each fragment. To recover, guardians decrypt their fragment locally and re-wrap it to the requester\'s ephemeral pubkey — the server only ever sees ciphertext and cannot reconstruct the key or bypass the quorum.',
      live: 'https://triskele-6ct.pages.dev',
      repo: 'https://github.com/dgpugliese/triskele',
    },
    {
      id: 'CHAPTER-PATH', kind: 'WEB APP', tag: 'IN DEVELOPMENT', tagC: 'amber',
      title: 'Chapter Path',
      sub: 'White-label member portal platform · multi-tenant SaaS',
      stack: ['SvelteKit 2', 'Svelte 5', 'Tailwind 4', 'Supabase', 'Stripe', 'Cloudflare Pages'],
      detail: "Productized white-label of a portal I lead-architected for a fraternal organization with ~150K members. Each tenant gets an isolated Supabase project, Stripe account, and Cloudflare Pages deployment; per-deploy branding flows through env vars and CSS custom properties at runtime. Postgres schema spans ~25 tables with RLS enforced on every one — no permissive USING(true) writes — plus helper functions (is_admin(), has_grand_role(), current_member_id()) for role-based policies and a BEFORE-UPDATE trigger blocking self-elevation. Type-clean end-to-end against v1 schema; public marketing pages and email templates are next.",
    },
    {
      id: 'KINETIC-BRAIN', kind: 'KNOWLEDGE-OPS', tag: 'IN-USE', tagC: 'cyan',
      title: 'Kinetic Brain',
      sub: 'Structured memory vault for Claude Code · context-problem solver',
      stack: ['Claude Code', 'Obsidian', 'Markdown', 'Git', 'MCP'],
      detail: "A vault-as-memory architecture that fixes the 'every session starts cold' problem. Bootstrap reads, decision logs, append-only knowledge files, and session protocols give the agent stable context across projects. Not a second brain — Claude Code's brain.",
    },
    {
      id: 'KAPSI-990', kind: 'DATA TOOL', tag: 'IN-USE', tagC: 'cyan',
      title: 'Chapter Compliance Dashboard',
      sub: 'IRS Form 990 compliance · 858 chapters · compliance.kapsi1911.com',
      stack: ['React', 'Vite', 'Tailwind', 'Supabase', 'IRS TEOS API', 'Edge Functions', 'GitHub Actions', 'Cloudflare Pages'],
      detail: "Live IHQ tool tracking IRS Form 990 compliance across 858 Kappa Alpha Psi chapters at compliance.kapsi1911.com (staff login). Aggregates four IRS data sources — ProPublica Nonprofit Explorer (year-by-year 990 / 990-EZ / 990-PF), IRS e-Postcard bulk ZIP, IRS Auto-Revocation List, and a custom scraper against the IRS TEOS internal JSON API for full historical 990-N back to 2008 (3,672 filings imported on last run; data the IRS bulk feeds don't publish). Surfaces a 12-province heat grid, drill-into-chapter 990 history with timestamped activity logs, and one-click audit packets that bundle every PDF return on record. Refresh runs across Supabase Edge Functions, GitHub Actions, and pg_cron; every run writes an audit row. Built on infrastructure that scales for free at IHQ's volume — under $300/yr vs. vendor quotes of $110K–$246K.",
      caseStudy: '/compliance',
    },
    {
      id: 'MCP-OPS', kind: 'PLATFORM', tag: 'PRODUCTION', tagC: 'green',
      title: 'MCP Server Infrastructure',
      sub: 'AI agent ↔ enterprise SaaS bridge',
      stack: ['Anthropic Claude', 'MCP', 'M365', 'Google Workspace', 'Cloudflare', 'Supabase'],
      detail: 'Designed and run production MCP servers connecting Claude to Microsoft 365, Google Workspace, Cloudflare, Supabase, and Granola. Established access patterns, scoping, and audit posture for non-human (agent) identities.',
    },
    {
      id: 'INFRA-REBUILD', kind: 'INFRA', tag: 'SHIPPED', tagC: 'cyan',
      title: 'Greenfield Hybrid Infra',
      sub: 'Physical + cloud, built from scratch',
      stack: ['Hyper-V', 'UniFi', 'Entra ID', 'Active Directory', 'Intune'],
      detail: 'Built physical + cloud infra from the ground up. Deployed hypervisor environment, replaced legacy networking with enterprise switching + UniFi, remediated neglected AD in tandem with Entra ID consolidation.',
    },
    {
      id: 'BVFD', kind: 'WEB APP', tag: 'LIVE', tagC: 'green',
      title: 'bensalemvfd.org',
      sub: 'Public web presence + crew tooling',
      stack: ['HTML/JS', 'Tailwind', 'Supabase', 'Cloudflare', 'Node', 'First Due API'],
      detail: 'Direct IT for Bensalem Volunteer Fire Department. Built and maintain bensalemvfd.org — Tailwind frontend on a Supabase backend, deployed on Cloudflare. Also prototyped an API-driven crew-points engine that polls the First Due API to cross-reference on-scene roster data and auto-credit members for fire calls, replacing manual tracking.',
      href: 'https://bensalemvfd.org',
    },
    {
      id: 'COMPLIANCE', kind: 'PROGRAM', tag: 'COMPLETE', tagC: 'green',
      title: 'NIST 800-53 / SOC 2 Posture',
      sub: 'Org-first cybersecurity milestone',
      stack: ['NIST 800-53', 'CIS', 'Defender', 'Intune', 'Pen Test'],
      detail: 'Aligned endpoint hardening + identity posture to NIST 800-53 / CIS. Commissioned org\'s first annual third-party pen test. Stood up SOC 2-aligned controls. Panelist, Cybersecurity Summit Philadelphia 2026.',
    },
  ];
  return (
    <section className="sect" id="projects" data-screen-label="04 Projects">
      <div className="sect-head">
        <span className="sect-num">04 //</span>
        <h2 className="sect-title">Projects / Operations</h2>
        <span className="sect-sub">hover: expand briefing</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
        {projects.map(p => {
          // Click priority: internal case study > external href
          const isInternal = !!p.caseStudy;
          const isExternal = !p.caseStudy && !!p.href;
          let Tag = 'div';
          let wrapperProps = {};
          if (isInternal) {
            Tag = Link;
            wrapperProps = { to: p.caseStudy };
          } else if (isExternal) {
            Tag = 'a';
            wrapperProps = { href: p.href, target: '_blank', rel: 'noreferrer' };
          }
          const isClickable = isInternal || isExternal;
          return (
            <Tag key={p.id} {...wrapperProps} className="panel panel-corners reveal" style={{ padding: '24px 28px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <span className="panel-label">{p.kind || p.id}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>
                    {p.title}{isClickable && <span style={{ color: 'var(--cyan)', marginLeft: 8, fontSize: 16 }}>↗</span>}
                  </h3>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', marginTop: 4 }}>// {p.sub}</div>
                </div>
                <span className={`chip chip-${p.tagC}`}>● {p.tag}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
              <div className="reveal-detail" style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.6, borderLeft: '2px solid var(--cyan)', paddingLeft: 12 }}>
                {p.detail}
                {p.caseStudy && <> · <Link to={p.caseStudy} onClick={e => e.stopPropagation()} style={{ color: 'var(--cyan)' }}>case study ↗</Link></>}
                {p.live && <> · <a href={p.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--cyan)' }}>live demo ↗</a></>}
                {p.repo && <> · <a href={p.repo} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: 'var(--cyan)' }}>source ↗</a></>}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
