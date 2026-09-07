import { PageIntro } from '../components/PageIntro.jsx';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';
import { jobs } from '../data/experience.js';

export default function Experience() {
  useSeo({
    title: 'Career · dgpugliese.dev',
    description: '16+ years across enterprise IT, MSP leadership, and network engineering — the roles, what shipped, and the outcome each one left behind.',
    path: '/experience',
    image: 'https://dgpugliese.dev/og.png',
  });

  return (
    <>
      <Nav />
      <main className="editorial-page career-page" id="main-content">
        <section className="sect">
          <PageIntro label="Career" title="Built it." accent="Owned it. Ran it." aside={<p>David Pugliese<br />Philadelphia, PA</p>}>
            <p>16+ years across enterprise IT, MSP leadership, and network engineering. The roles, the responsibility, and the work that stayed in production.</p>
            <a className="hero-secondary" href="https://davidguypugliese.com" target="_blank" rel="noreferrer">View professional resume ↗</a>
          </PageIntro>
          <div className="exp-list">
            {jobs.map((j, i) => (
              <article key={i} className={`exp-row ${j.current ? 'exp-current' : ''}`}>
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
                  <div className="career-details"><h3 className="career-responsibilities-title">Responsibilities and contributions</h3>
                  <ul style={{ margin: '10px 0 0', padding: 0, listStyle: 'none' }}>
                    {j.bullets.map((b, k) => (
                      <li key={k} style={{ fontSize: 13, color: 'var(--fg-faint)', lineHeight: 1.6, marginBottom: 5, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>{b}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
