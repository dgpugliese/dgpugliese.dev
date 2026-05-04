import { useEffect, useMemo, useState } from 'react';

export function Resume() {
  const jobs = [
    {
      title: 'Director of Information Technology', co: 'International Membership Organization (Nonprofit · ~150K constituents)', loc: 'Philadelphia, PA',
      range: 'Feb 2024 — Present', current: true,
      bullets: [
        'Lead IT strategy, engineering, and operations for a national nonprofit with ~150K constituents across 770 sites.',
        'Designed and run production MCP server infrastructure connecting Claude to M365, Google Workspace, Cloudflare, Supabase, and Granola.',
        'Lead architect on a headless React/Next.js membership portal — Cloudflare → Node middleware → Salesforce/Fonteva.',
        'Delivered org\'s first enterprise cybersecurity milestone — NIST 800-53 / CIS aligned. Panelist, Cybersecurity Summit Philadelphia 2026.',
        'Manage direct reports (Tech Support Engineer, Vuln/Patch Mgmt Lead), annual IT budget, and vendor contracts.',
      ],
    },
    {
      title: 'IT Manager', co: 'ERGOS Technology Partners', loc: 'Remote',
      range: 'Jul 2023 — Feb 2024',
      bullets: [
        'Managed team of six engineers delivering IT services to 50+ clients, maintaining 98% SLA compliance.',
        'Led modernization initiatives reducing client downtime by ~40%; cut operational overhead 15% via licensing + vendor renegotiation.',
      ],
    },
    {
      title: 'Lead Professional Service Engineer', co: 'SWK Technologies', loc: 'Remote',
      range: 'Apr 2022 — Jul 2023',
      bullets: [
        'Influenced strategic migration of company\'s RMM platform from N-central to NinjaRMM via technical evaluation + feasibility analysis.',
        'Senior escalation across M365, firewalls, backup/DR. Mentored helpdesk and junior engineers.',
      ],
    },
    {
      title: 'Network Engineer', co: 'Moving Forward IT', loc: 'Remote',
      range: 'Aug 2018 — Apr 2022',
      bullets: [
        'Led full lift-and-shift migration of Essex County Courthouse infrastructure with minimal downtime.',
        'Designed/deployed secure networks across Cisco, Ubiquiti, Fortinet. Tier-3 escalation for complex networking incidents.',
      ],
    },
    {
      title: 'Director of IT (Volunteer)', co: 'Bensalem Volunteer Fire Dept.', loc: 'Bensalem, PA',
      range: 'Aug 2018 — Present', volunteer: true,
      bullets: [
        'Own IT direction, public web presence, digital tooling for crew operations.',
        'Built bensalemvfd.org; prototyped First-Due-API auto-points engine.',
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

  const cells = useMemo(() => Array.from({ length: 52 * 7 }).map(() => Math.random()), []);

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
                : <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>connecting...</div>}
        </div>
        <div className="panel panel-corners" style={{ padding: '24px 28px' }}>
          <span className="panel-label">CONTRIB_MATRIX</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>last 365d · simulated heatmap</span>
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

export function Certs() {
  const certs = [
    { n: 'CompTIA Security+ (ce)', t: 'SEC' },
    { n: 'CompTIA Network+ (ce)', t: 'NET' },
    { n: 'CompTIA Cloud+ (ce)', t: 'CLD' },
    { n: 'CompTIA Server+ (ce)', t: 'SRV' },
    { n: 'CompTIA A+', t: 'A+' },
    { n: 'CompTIA ITF+', t: 'ITF' },
    { n: 'AWS Cloud Practitioner', t: 'AWS' },
    { n: 'VMware VCP — DCV', t: 'VCP' },
    { n: '(ISC)² Certified in Cybersecurity', t: 'CC' },
    { n: 'MS Azure Fundamentals (AZ-900)', t: 'AZ' },
    { n: 'MS SC&I Fundamentals (SC-900)', t: 'SC' },
    { n: 'MS 365 Fundamentals (MS-900)', t: 'M365' },
    { n: 'LPI Linux Essentials', t: 'LPI' },
    { n: 'GitHub Foundations', t: 'GH' },
    { n: 'ITIL Foundation v5', t: 'ITIL' },
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
            <div className="mono" style={{ width: 44, height: 44, border: '1px solid var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--cyan)', flexShrink: 0, fontWeight: 700, letterSpacing: '0.05em' }}>
              {c.t}
            </div>
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
          <a className="btn" href="mailto:dgpugliese@icloud.com">→ dgpugliese@icloud.com</a>
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
