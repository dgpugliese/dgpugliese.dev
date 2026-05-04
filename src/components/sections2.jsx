import { useEffect, useMemo, useState } from 'react';

export function Resume() {
  const jobs = [
    {
      title: 'Director of Information Technology', co: 'International Membership Organization (Nonprofit · ~150K constituents)', loc: 'Philadelphia, PA',
      range: 'Feb 2024 — Present', current: true,
      bullets: [
        'Lead IT strategy, engineering, and operations for a national nonprofit with ~150K constituents across 770 sites.',
        'Designed and run production MCP server infrastructure connecting Claude to M365, Google Workspace, Cloudflare, Supabase, and Granola; established access patterns, scoping, and audit posture for non-human (agent) identities.',
        'Built physical + cloud infrastructure from the ground up — hypervisor environment, enterprise switching + UniFi access, AD remediation in tandem with Entra ID consolidation.',
        'Lead architect on a headless React/Next.js membership portal — Cloudflare Pages → Node/Express middleware → Salesforce/Fonteva REST. Stripe dues processing, WebAuthn/passkey auth, role-based JWT, webhook-driven document signing.',
        'Delivered org\'s first enterprise cybersecurity milestone — NIST 800-53 / CIS aligned. Commissioned org\'s first annual third-party pen test. Panelist, Cybersecurity Summit Philadelphia 2026.',
        'Driving zero-touch employee lifecycle — modernized M365 / Entra ID provisioning, shared-mailbox permissioning via PowerShell across 12+ mailboxes, standardized onboarding/offboarding SOPs. Stood up internal ticketing, runbooks, and call-flow routing.',
        'Manage direct reports (Tech Support Engineer, Vuln/Patch Mgmt Lead), annual IT budget, and vendor contracts; primary escalation owner for incident response with blameless post-mortem discipline.',
      ],
    },
    {
      title: 'IT Manager', co: 'ERGOS Technology Partners', loc: 'Remote',
      range: 'Jul 2023 — Feb 2024',
      bullets: [
        'Managed team of six engineers delivering IT services to 50+ clients, maintaining 98% SLA compliance across ticket, project, and escalation queues.',
        'Led infrastructure modernization initiatives that reduced client downtime by ~40%.',
        'Optimized licensing and renegotiated vendor contracts, cutting operational overhead by 15%.',
        'Owned staff coaching, performance feedback, and workload balancing; senior technical escalation point for the team.',
        'Standardized client onboarding workflows and documentation, accelerating ramp time for new accounts.',
        'Owned vendor relationships and renewal cycles for core MSP tooling — RMM, PSA, backup, and EDR stacks.',
        'Established weekly service-review and capacity-planning cadence with technical and sales leadership.',
      ],
    },
    {
      title: 'Lead Professional Service Engineer', co: 'SWK Technologies', loc: 'Remote',
      range: 'Apr 2022 — Jul 2023',
      bullets: [
        'Influenced strategic migration of the company\'s RMM platform from N-central to NinjaRMM — contributed technical evaluation, feature comparison, and feasibility analysis that shaped the executive decision.',
        'Senior technical escalation point across Microsoft 365, firewalls, and backup/DR.',
        'Mentored helpdesk and junior engineers; partnered with sales on scoping and technical discovery for new client engagements.',
        'Owned end-to-end delivery of M365 tenant migrations, hypervisor refreshes, and SonicWall/FortiGate cutovers.',
        'Authored technical runbooks and post-implementation documentation consumed by the broader services team.',
        'Triaged Sev-1 incidents in production environments, driving root-cause analysis and corrective-action follow-through.',
      ],
    },
    {
      title: 'Network Engineer', co: 'Moving Forward IT', loc: 'Remote',
      range: 'Aug 2018 — Apr 2022',
      bullets: [
        'Led full lift-and-shift migration of Essex County Courthouse infrastructure — planned and executed relocation of production systems from legacy on-prem to a modernized data center footprint with minimal downtime for a mission-critical government client.',
        'Designed, deployed, and maintained secure network infrastructures across Cisco, Ubiquiti, and Fortinet stacks.',
        'Led firewall rule audits and IPS tuning across client network estates.',
        'Tier-3 escalation owner for complex networking incidents.',
        'Designed VLAN segmentation, 802.1Q trunking, and IPsec site-to-site tunnels for multi-site SMB clients.',
        'Maintained backup/DR posture across client environments — verified restore drills, RTO/RPO tracking, and offsite replication.',
        'Stood up monitoring and alerting for client networks; reduced mean-time-to-acknowledge for critical events.',
      ],
    },
    {
      title: 'Director of IT (Volunteer)', co: 'Bensalem Volunteer Fire Dept.', loc: 'Bensalem, PA',
      range: 'Aug 2018 — Present', volunteer: true,
      bullets: [
        'Own IT direction, public-facing web presence, and digital tooling for crew operations.',
        'Built and maintain bensalemvfd.org; migrated crew roster from Firestore to a Google Sheets CSV pipeline.',
        'Prototyped an API-driven points auto-award app — polls the First Due API to cross-reference on-scene roster data and automatically credit crew members for fire calls, replacing manual tracking.',
        'Manage station IT, dispatch integrations, and vendor relationships on a volunteer basis.',
        'Advise leadership on technology budgeting, grant-funded equipment refreshes, and member-facing communications.',
      ],
    },
  ];
  return (
    <section className="sect" id="resume" data-screen-label="05 Resume">
      <div className="sect-head">
        <span className="sect-num">05 //</span>
        <h2 className="sect-title">Resume / Mission Log</h2>
        <span className="sect-sub">git log --author=dpugliese</span>
      </div>
      <div className="panel panel-corners" style={{ padding: '32px 36px' }}>
        <span className="panel-label">EXPERIENCE</span>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 1, background: 'var(--line)' }} />
          {jobs.map((j, i) => (
            <div key={i} style={{ position: 'relative', paddingLeft: 36, marginBottom: i === jobs.length - 1 ? 0 : 32 }}>
              <div style={{ position: 'absolute', left: 4, top: 6, width: 9, height: 9, background: j.current ? 'var(--green)' : (j.volunteer ? 'var(--violet)' : 'var(--cyan)'), boxShadow: j.current ? '0 0 10px var(--green)' : 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                  {j.title}
                  {j.current && <span style={{ marginLeft: 12, fontSize: 10, color: 'var(--green)', background: 'rgba(126, 231, 135, 0.1)', border: '1px solid var(--green)', padding: '2px 8px', letterSpacing: '0.15em', verticalAlign: 'middle' }} className="mono">CURRENT</span>}
                  {j.volunteer && <span style={{ marginLeft: 12, fontSize: 10, color: 'var(--violet)', background: 'rgba(210, 168, 255, 0.1)', border: '1px solid var(--violet)', padding: '2px 8px', letterSpacing: '0.15em', verticalAlign: 'middle' }} className="mono">VOLUNTEER</span>}
                </h3>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>{j.range}</span>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)', marginTop: 4, marginBottom: 12 }}>
                {j.co} <span style={{ color: 'var(--fg-faint)' }}>· {j.loc}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {j.bullets.map((b, k) => (
                  <li key={k} style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.6, marginBottom: 6, paddingLeft: 18, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--cyan)', opacity: 0.6 }}>▸</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GitHub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [err, setErr] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const u = await fetch('https://api.github.com/users/dgpugliese').then(r => r.ok ? r.json() : Promise.reject(r.status));
        setUser(u);
        const rs = await fetch('https://api.github.com/users/dgpugliese/repos?sort=updated&per_page=6').then(r => r.ok ? r.json() : []);
        setRepos(Array.isArray(rs) ? rs : []);
      } catch (e) { setErr(String(e)); }
    })();
  }, []);

  // Deterministic PRNG (mulberry32) so the concept heatmap stays stable across reloads
  const cells = useMemo(() => {
    let s = 0x9e3779b1;
    return Array.from({ length: 52 * 7 }).map(() => {
      s = (s + 0x6d2b79f5) | 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    });
  }, []);

  return (
    <section className="sect" id="github" data-screen-label="06 GitHub">
      <div className="sect-head">
        <span className="sect-num">06 //</span>
        <h2 className="sect-title">GitHub / Live Feed</h2>
        <span className="sect-sub">api.github.com/users/dgpugliese</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
        <div className="panel panel-corners" style={{ padding: '24px 28px' }}>
          <span className="panel-label">PROFILE</span>
          {user ? (
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <img src={user.avatar_url} alt="" style={{ width: 90, height: 90, border: '1px solid var(--line-strong)', filter: 'saturate(0.7) hue-rotate(180deg)' }} />
              <div className="mono" style={{ fontSize: 12, lineHeight: 1.7 }}>
                <div style={{ color: 'var(--fg)', fontSize: 16, fontWeight: 600 }}>@{user.login}</div>
                <div style={{ color: 'var(--cyan)' }}>● {user.public_repos} repos</div>
                <div style={{ color: 'var(--violet)' }}>◆ {user.followers} followers</div>
                <div style={{ color: 'var(--fg-faint)', marginTop: 4 }}>since {user.created_at?.slice(0, 7)}</div>
              </div>
            </div>
          ) : err ? <div className="mono" style={{ fontSize: 12, color: 'var(--amber)' }}>// rate-limited or offline · check: github.com/dgpugliese</div>
                : <div className="mono pulse" style={{ fontSize: 12, color: 'var(--cyan)' }}>● handshaking with api.github.com...</div>}
        </div>
        <div className="panel panel-corners" style={{ padding: '24px 28px' }}>
          <span className="panel-label">CONTRIB_MATRIX</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>last 365d · concept matrix</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--green)' }}>● synced</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 2 }}>
            {cells.map((v, i) => {
              const c = v > 0.85 ? 'var(--green)' : v > 0.65 ? 'var(--cyan)' : v > 0.4 ? 'rgba(78, 201, 224, 0.4)' : 'rgba(78, 201, 224, 0.1)';
              return <div key={i} style={{ aspectRatio: '1', background: c }} title={`${Math.floor(v*8)} contributions`} />;
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {(repos.length ? repos : Array.from({ length: 6 })).slice(0, 6).map((r, i) => (
          <a key={i} href={r?.html_url || 'https://github.com/dgpugliese'} target="_blank" rel="noreferrer" className="panel" style={{ padding: '18px 20px', textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)' }}>● {r?.language || '—'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', marginTop: 4 }}>{r?.name || `repo-${i+1}`}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', marginTop: 6, lineHeight: 1.5, minHeight: 32 }}>
              {r?.description || '// no description'}
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', marginTop: 10, display: 'flex', gap: 14 }}>
              <span>★ {r?.stargazers_count ?? 0}</span><span>⑂ {r?.forks_count ?? 0}</span>
              <span style={{ marginLeft: 'auto' }}>{r?.updated_at?.slice(0, 10) || ''}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function CertBadge({ img, t }) {
  const [broken, setBroken] = useState(false);
  if (img && !broken) {
    return <img src={img} alt="" loading="lazy" onError={() => setBroken(true)}
                style={{ width: 48, height: 48, flexShrink: 0, objectFit: 'contain' }} />;
  }
  return (
    <div className="mono" style={{ width: 44, height: 44, border: '1px solid var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--cyan)', flexShrink: 0, fontWeight: 700, letterSpacing: '0.05em' }}>
      {t}
    </div>
  );
}

export function Certs() {
  // Badge image URLs are real Credly badge images, served via their /size/ CDN path.
  const credly = (id, file) => `https://images.credly.com/size/110x110/images/${id}/${file}`;
  const certs = [
    { n: 'CompTIA Security+ (ce)', t: 'SEC', img: credly('80d8a06a-c384-42bf-ad36-db81bce5adce', 'blob') },
    { n: 'CompTIA Network+ (ce)', t: 'NET', img: credly('c70ba73e-3c8a-46fa-9d60-4a9af94ad662', 'blob') },
    { n: 'CompTIA Cloud+ (ce)', t: 'CLD', img: credly('b2e3c623-cc4a-4f0c-8a3b-aa6231e138fe', 'blob') },
    { n: 'CompTIA Server+ (ce)', t: 'SRV', img: credly('07378420-4407-4f09-a4d7-9301d87dec34', 'blob') },
    { n: 'CompTIA A+', t: 'A+', img: credly('2d9ba442-a3ce-4105-9d69-57f478540f70', 'CompTIA_A_2B.png') },
    { n: 'CompTIA ITF+', t: 'ITF', img: credly('a49be93a-34ff-4224-996c-b2c976a5dc9d', 'blob') },
    { n: 'AWS Cloud Practitioner', t: 'AWS', img: credly('00634f82-b07f-4bbd-a6bb-53de397fc3a6', 'image.png') },
    { n: 'VMware VCP — DCV', t: 'VCP', img: credly('5287aa23-f179-46a9-9683-678077d3aa45', 'image.png') },
    { n: '(ISC)² Certified in Cybersecurity', t: 'CC', img: credly('2030e43f-8003-4d4b-9630-847add403c87', 'image.png') },
    { n: 'MS Azure Fundamentals (AZ-900)', t: 'AZ', img: credly('be8fcaeb-c769-4858-b567-ffaaa73ce8cf', 'image.png') },
    { n: 'MS SC&I Fundamentals (SC-900)', t: 'SC', img: credly('fc1352af-87fa-4947-ba54-398a0e63322e', 'security-compliance-and-identity-fundamentals-600x600.png') },
    { n: 'MS 365 Fundamentals (MS-900)', t: 'M365', img: credly('0c6d9839-f468-4adc-987d-5cfae4a9ee67', 'image.png') },
    { n: 'LPI Linux Essentials', t: 'LPI', img: credly('1d36cb36-20fc-4961-8d70-6307c015d1aa', 'blob') },
    { n: 'CompTIA IT Operations Specialist (CIOS)', t: 'CIOS', img: credly('7f7657b9-4d1b-4b8d-b5ee-5fdf6d7ccd71', '04294_CompTIA_Cert_Badges_Specialist_-_CIOS.png') },
    { n: 'CompTIA Secure Infrastructure Specialist (CSIS)', t: 'CSIS', img: credly('8090280a-311f-425f-a1cd-a32770b5a444', 'CompTIA_CSIS.png') },
    { n: 'CompTIA Network Infrastructure Professional (CNIP)', t: 'CNIP', img: credly('f308a5b0-18e3-4e93-ae15-9f27dd0a94cc', 'CompTIA_CNIP.png') },
    { n: 'CompTIA Secure Cloud Professional (CSCP)', t: 'CSCP', img: credly('9f54bf46-dc18-408c-a74e-2637facd1856', 'CompTIA_CSCP.png') },
    { n: 'CompTIA Cloud Admin Professional (CCAP)', t: 'CCAP', img: credly('18218ce6-e7d4-4479-9500-b7499645b763', 'CompTIA_CCAP.png') },
    { n: 'Parallels RAS Technical Professional', t: 'RAS', img: credly('a0b0cb85-45a0-4aa9-8184-408e72fe092c', 'blob') },
    { n: 'Parallels RAS Technical Professional Advanced', t: 'RAS+', img: credly('0c751535-2db1-4204-8ab0-3ccccea0f985', 'blob') },
    { n: 'IT Glue Certified Professional', t: 'ITG' },
    { n: 'UniFi Wireless Administrator', t: 'UWA' },
    { n: 'UniFi Full Stack Professional', t: 'UFS' },
    { n: 'GitHub Foundations', t: 'GH' },
    { n: 'ITIL Foundation v5', t: 'ITIL', img: 'https://badges.peoplecert.org/Badges/Template/en/180/a40e5baa-5391-4ea9-bf2a-1cc471286c3e' },
  ];
  return (
    <section className="sect" id="certs" data-screen-label="07 Certifications">
      <div className="sect-head">
        <span className="sect-num">07 //</span>
        <h2 className="sect-title">Certifications / Credentials</h2>
        <a className="sect-sub" href="https://credly.com/users/dpugliese" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--cyan)' }}>↗ credly.com/users/dpugliese</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
        {certs.map(c => (
          <div key={c.n} className="panel" style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.15s' }}
               onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.boxShadow = '0 0 14px rgba(78, 201, 224, 0.25)'; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = ''; }}>
            <CertBadge img={c.img} t={c.t} />
            <div className="mono" style={{ fontSize: 11, lineHeight: 1.4, color: 'var(--fg)' }}>{c.n}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="sect" id="contact" data-screen-label="08 Contact" style={{ paddingBottom: 120 }}>
      <div className="sect-head">
        <span className="sect-num">08 //</span>
        <h2 className="sect-title">Contact / Open Channel</h2>
        <span className="sect-sub">end of transmission</span>
      </div>
      <div className="panel panel-corners" style={{ padding: '48px 56px', textAlign: 'center' }}>
        <span className="panel-label">HAILING_FREQUENCIES_OPEN</span>
        <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 20 }}>◆ READY TO RECEIVE ◆</div>
        <h3 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
          Let's build something <span style={{ color: 'var(--cyan)' }}>fast</span> and <span style={{ color: 'var(--violet)' }}>reliable</span>.
        </h3>
        <div style={{ fontSize: 16, color: 'var(--fg-dim)', marginTop: 18, maxWidth: 560, margin: '18px auto 0' }}>
          Recruiters, engineers, fractional advisory — all welcome. Best response window: weekday mornings ET.
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          <a className="btn" href="mailto:dp@dgpugliese.dev">→ dp@dgpugliese.dev</a>
          <a className="btn btn-ghost" href="https://linkedin.com/in/dgpugliese" target="_blank" rel="noreferrer">↗ LINKEDIN/DGPUGLIESE</a>
        </div>
        <div className="mono" style={{ marginTop: 40, fontSize: 11, color: 'var(--fg-faint)', display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--line)', paddingTop: 16 }}>
          <span>// dgpugliese.dev — built {new Date().getFullYear()}</span>
          <span>// philadelphia, pa</span>
          <span>// powered by curiosity + caffeine</span>
        </div>
      </div>
    </section>
  );
}
