import { PageIntro } from '../components/PageIntro.jsx';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';
import { groups, certGroups } from '../data/uses.js';

export default function Uses() {
  useSeo({
    title: 'Stack · dgpugliese.dev',
    description: 'The stack David Pugliese reaches for across identity, cloud, infrastructure, security, and engineering — plus verified certifications.',
    path: '/uses',
    image: 'https://dgpugliese.dev/og-v2.png',
  });

  const verifiedCount = certGroups.reduce((n, g) => n + (g.count - (g.inProgress || 0)), 0);

  return (
    <>
      <Nav />
      <main className="editorial-page stack-page" id="main-content">
        <section className="sect">
          <PageIntro label="Stack" title="The tools." accent="The judgment." aside={<p>From identity to deployment.<br />Chosen for the work.</p>}>
            <p>What I reach for across identity, cloud, infrastructure, security, and engineering — on the job, on contract, and running a solo MSP.</p>
          </PageIntro>
          <div className="stack-grid">
          {groups.map(g => (
            <div key={g.name} className="uses-group">
              <div className="uses-group-head">
                <h2 className="uses-group-label">{g.name}</h2>
              </div>
              <p style={{ fontSize: 14, color: 'var(--fg-dim)', margin: '0 0 14px', maxWidth: 640 }}>{g.blurb}</p>
              <div className="uses-chip-row">
                {g.items.map(i => <span key={i} className="chip">{i}</span>)}
              </div>
            </div>
          ))}

          </div>
          <div className="uses-group certifications">
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
