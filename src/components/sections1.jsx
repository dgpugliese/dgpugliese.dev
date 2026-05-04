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
            Director of IT with <span style={{ color: 'var(--cyan)' }}>10+ years</span> spanning physical and cloud infrastructure,
            cybersecurity, and full-stack engineering. Currently leading an AI-integrated IT function for a
            <span style={{ color: 'var(--violet)' }}> large nonprofit</span> with a national footprint.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', marginTop: 18 }}>
            I run production <span style={{ color: 'var(--cyan)' }}>MCP server infrastructure</span> with identity patterns
            for both human and agent users, and ship platforms end-to-end on React/Next.js, Node/Express,
            Cloudflare, and Supabase against Salesforce/Fonteva.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', marginTop: 18 }}>
            Hands-on across Entra ID (Conditional Access, SSO, MFA), endpoint security (Defender, Intune), and
            NIST 800-53 / CIS Controls compliance — equally comfortable mentoring engineers, briefing executives,
            and debugging OAuth flows.
          </p>
        </div>
        <div className="panel panel-corners" style={{ padding: '24px 28px' }}>
          <span className="panel-label">CORE_COMPETENCIES</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            {[
              ['AI Agent Infrastructure', 'cyan'],
              ['Cloud IAM (Entra ID, SSO, MFA)', 'cyan'],
              ['Zero-Trust Architecture', 'cyan'],
              ['MCP Servers & LLM Tooling', 'violet'],
              ['Hybrid Infra (VMware/Hyper-V)', 'amber'],
              ['SaaS Orchestration & Automation', 'amber'],
              ['Endpoint Security (Intune/Defender)', 'green'],
              ['IT Strategy & Vendor Mgmt', 'green'],
              ['NIST 800-53 / CIS / SOC 2', 'green'],
              ['Incident Response & RCA', 'green'],
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
    { name: 'Cloud & Platforms', items: ['Azure', 'AWS', 'Cloudflare Workers', 'Supabase', 'Vercel'], c: 'cyan' },
    { name: 'Virtualization', items: ['VMware ESXi', 'Hyper-V', 'Proxmox', 'XCP-ng'], c: 'cyan' },
    { name: 'Containers & IaC', items: ['Docker', 'Terraform', 'Ansible', 'GitHub Actions'], c: 'amber' },
    { name: 'Observability', items: ['Grafana', 'Prometheus', 'Uptime Kuma'], c: 'green' },
    { name: 'Security & Compliance', items: ['NIST 800-53', 'CIS Controls', 'SOC 2', 'SIEM', 'Defender', 'Intune', 'Huntress', 'Automox'], c: 'green' },
    { name: 'Backup & Storage', items: ['Veeam', 'Acronis Cyber Backup', 'Datto', 'Synology'], c: 'green' },
    { name: 'MSP / RMM Tooling', items: ['NinjaRMM', 'Datto RMM', 'N-able', 'ITGlue'], c: 'amber' },
    { name: 'Engineering Stack', items: ['TypeScript', 'Python', 'SQL', 'PowerShell', 'React', 'Next.js', 'Node/Express', 'Stripe', 'Salesforce/Fonteva'], c: 'amber' },
    { name: 'Networking', items: ['FortiGate', 'Cisco Catalyst', 'Cisco Meraki', 'UniFi', '802.1Q VLAN', 'IPsec VPN', 'SD-WAN'], c: 'cyan' },
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
      id: 'MEMBERSHIP-PORTAL', tag: 'PRODUCTION', tagC: 'green',
      title: 'Headless Membership Portal',
      sub: 'Constituent platform · ~150K users',
      stack: ['React', 'Next.js', 'Cloudflare Pages', 'Node/Express', 'Salesforce/Fonteva', 'Stripe', 'WebAuthn'],
      detail: 'Lead architect. Designed and shipped a headless portal with Stripe-based subscription/dues processing, passkey auth, role-based JWT, and webhook-driven document signing. Talks to Salesforce/Fonteva REST under a Node/Express middleware layer.',
    },
    {
      id: 'MCP-OPS', tag: 'PRODUCTION', tagC: 'green',
      title: 'MCP Server Infrastructure',
      sub: 'AI agent ↔ enterprise SaaS bridge',
      stack: ['Anthropic Claude', 'MCP', 'M365', 'Google Workspace', 'Cloudflare', 'Supabase'],
      detail: 'Designed and run production MCP servers connecting Claude to Microsoft 365, Google Workspace, Cloudflare, Supabase, and Granola. Established access patterns, scoping, and audit posture for non-human (agent) identities.',
    },
    {
      id: 'INFRA-REBUILD', tag: 'SHIPPED', tagC: 'cyan',
      title: 'Greenfield Hybrid Infra',
      sub: 'Physical + cloud, built from scratch',
      stack: ['Hyper-V', 'UniFi', 'Entra ID', 'Active Directory', 'Intune'],
      detail: 'Built physical + cloud infra from the ground up. Deployed hypervisor environment, replaced legacy networking with enterprise switching + UniFi, remediated neglected AD in tandem with Entra ID consolidation.',
    },
    {
      id: 'BVFD-POINTS', tag: 'PROTOTYPE', tagC: 'amber',
      title: 'BVFD Auto-Points',
      sub: 'API-driven crew points engine',
      stack: ['Node', 'First Due API', 'Google Sheets'],
      detail: 'Polls First Due API to cross-reference on-scene roster data and auto-credit crew members for fire calls — replacing manual tracking.',
    },
    {
      id: 'BVFD-SITE', tag: 'LIVE', tagC: 'green',
      title: 'bensalemvfd.org',
      sub: 'Public web presence + crew tooling',
      stack: ['Next.js', 'Firestore→CSV', 'Cloudflare'],
      detail: 'Built and maintain public-facing site for Bensalem Volunteer Fire Department. Migrated roster from Firestore to a Google Sheets CSV pipeline.',
    },
    {
      id: 'COMPLIANCE', tag: 'IN PROGRESS', tagC: 'amber',
      title: 'NIST 800-53 / SOC 2 Posture',
      sub: 'Org-first cybersecurity milestone',
      stack: ['NIST 800-53', 'CIS', 'Defender', 'Intune', 'Pen Test'],
      detail: 'Aligned endpoint hardening + identity posture to NIST 800-53 / CIS. Commissioned org\'s first annual third-party pen test. Standing up SOC 2-aligned controls. Panelist, Cybersecurity Summit Philadelphia 2026.',
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
        {projects.map(p => (
          <div key={p.id} className="panel panel-corners reveal" style={{ padding: '24px 28px' }}>
            <span className="panel-label">{p.id}</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</h3>
                <div className="mono" style={{ fontSize: 12, color: 'var(--fg-dim)', marginTop: 4 }}>// {p.sub}</div>
              </div>
              <span className={`chip chip-${p.tagC}`}>● {p.tag}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
              {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
            </div>
            <div className="reveal-detail" style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.6, borderLeft: '2px solid var(--cyan)', paddingLeft: 12 }}>
              {p.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
