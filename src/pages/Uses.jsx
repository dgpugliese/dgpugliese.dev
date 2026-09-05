import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';
import { groups, certGroups } from '../data/uses.js';

export default function Uses() {
  useSeo({
    title: 'Uses · dgpugliese.dev',
    description: 'The stack David Pugliese reaches for across identity, cloud, infrastructure, security, and engineering — plus verified certifications.',
    path: '/uses',
    image: 'https://dgpugliese.dev/og.svg',
  });

  const verifiedCount = certGroups.reduce((n, g) => n + (g.count - (g.inProgress || 0)), 0);

  return (
    <>
      <Nav />
      <main>
        <section className="sect">
          <div className="sect-head">
            <span className="sect-num">// </span>
            <h1 className="sect-title" style={{ margin: 0 }}>Uses</h1>
          </div>
          <p className="uses-intro">
            What I reach for across identity, cloud, infrastructure, security, and engineering —
            on the job, on contract, and running a solo MSP.
          </p>

          {groups.map(g => (
            <div key={g.name} className="uses-group">
              <div className="uses-group-head">
                <span className="uses-group-label">{g.name}</span>
                <span className="uses-group-count">{g.items.length}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--fg-dim)', margin: '0 0 14px', maxWidth: 640 }}>{g.blurb}</p>
              <div className="uses-chip-row">
                {g.items.map(i => <span key={i} className="chip">{i}</span>)}
              </div>
            </div>
          ))}

          <div className="uses-group">
            <div className="uses-group-head">
              <span className="uses-group-label">Certifications</span>
              <a
                className="uses-group-count"
                href="https://credly.com/users/dpugliese"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--cyan)', textDecoration: 'none' }}
              >
                {verifiedCount} verified ↗
              </a>
            </div>
            <div className="uses-cert-list">
              {certGroups.map(g => (
                <div key={g.name} className="uses-cert-line">
                  <span>{g.name}</span>
                  <span className="mono" style={{ color: 'var(--fg-faint)' }}>
                    {g.count}{g.inProgress ? ` (${g.inProgress} in progress)` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
