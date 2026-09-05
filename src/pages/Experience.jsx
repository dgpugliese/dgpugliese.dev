import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';
import { jobs } from '../data/experience.js';

export default function Experience() {
  useSeo({
    title: 'Experience · dgpugliese.dev',
    description: '16+ years across enterprise IT, MSP leadership, and network engineering — the roles, what shipped, and the outcome each one left behind.',
    path: '/experience',
    image: 'https://dgpugliese.dev/og.png',
  });

  return (
    <>
      <Nav />
      <main>
        <section className="sect">
          <div className="sect-head">
            <span className="sect-num">// </span>
            <h1 className="sect-title" style={{ margin: 0 }}>Experience</h1>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', maxWidth: 700, marginBottom: 40 }}>
            16+ years across enterprise IT, MSP leadership, and network engineering. Paid work,
            what I owned, and the outcome that stuck.
          </p>
          <div className="exp-list">
            {jobs.map((j, i) => (
              <div key={i} className="exp-row">
                <span className="exp-range">{j.range}</span>
                <div>
                  <div className="exp-title-row">
                    <h2 className="exp-title">{j.title}</h2>
                    {j.current && <span className="chip chip-green">Current</span>}
                    {j.volunteer && <span className="chip chip-violet">Volunteer</span>}
                    {j.award && <span className="chip chip-amber">Award</span>}
                  </div>
                  <div className="exp-org">{j.co} <span style={{ color: 'var(--fg-faint)' }}>· {j.loc}</span></div>
                  <p className="exp-outcome"><strong>Outcome — </strong>{j.outcome}</p>
                  <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none' }}>
                    {j.bullets.map((b, k) => (
                      <li key={k} style={{ fontSize: 13, color: 'var(--fg-faint)', lineHeight: 1.6, marginBottom: 5, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
