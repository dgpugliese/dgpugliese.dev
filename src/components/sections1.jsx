import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { Highlight } from './Highlight.jsx';
import { ProjectOverlay } from './ProjectOverlay.jsx';

export function About() {
  return (
    <section className="sect" id="about">
      <div className="sect-head">
        <span className="sect-mark" />
        <h2 className="sect-title">The person<br />behind the systems.</h2>
      </div>
      <div className="about-block">
        <div className="about-identity"><span>David Pugliese<small>Builder. Operator. Problem solver.</small></span></div>
        <p>
          IT Director, Solutions Architect, MSP founder — I run all three at once. Day to day:
          IT for a national membership organization, a solo MSP on the side, and production
          software for both — AI agent infrastructure, full-stack platforms on Cloudflare and
          Supabase, and security tools like{' '}
          <a href="https://obscr.app" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)' }}>Obscura</a>,
          a zero-knowledge file-transfer app I built and shipped myself.
        </p>
        <p>
          Equally comfortable briefing a CISO on a Friday and debugging an OAuth callback at
          2 a.m. Saturday. On the side, I speak on cybersecurity posture for member-driven
          nonprofits.
        </p>
        <div className="about-links">
          <Link to="/experience">Career →</Link>
          <Link to="/uses">Stack →</Link>
          <Link to="/log">Field Notes →</Link>
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  const [activeId, setActiveId] = useState(null);
  const active = projects.find(p => p.id === activeId) || null;

  return (
    <section className="sect" id="work">
      <div className="sect-head">
        <span className="sect-mark" />
        <h2 className="sect-title">Selected <Highlight>Work</Highlight></h2>
        <p className="work-intro">Built from scratch.<br />Running in the real world.</p>
      </div>
      <div className="featured-work">
        {projects.slice(0, 2).map((p) => (
          <button key={p.id} type="button" className={`feature-card feature-${p.id.toLowerCase()}`} onClick={() => setActiveId(p.id)}>
            <div className="feature-visual"><span className="feature-number mono">{p.kind}</span><img src={`/screenshots/${p.id.toLowerCase()}.jpg`} alt={`${p.title} application preview`} loading="lazy" width="1440" height="900" /><span className="feature-open" aria-hidden="true">↗</span></div>
            <div className="feature-meta"><h3>{p.title}</h3><span className="work-status">● {p.tag}</span></div>
            <p>{p.sub}</p>
            <div className="work-tags">{p.stack.slice(0, 3).map(s => <span key={s} className="chip">{s}</span>)}</div>
          </button>
        ))}
      </div>
      <div className="work-list">
        {projects.slice(2).map((p) => (
          <button key={p.id} type="button" className="work-row" onClick={() => setActiveId(p.id)}>
            <span className="work-category mono">{p.kind}</span>
            <div>
              <h3 className="work-title">{p.title}</h3>
              <p className="work-desc">{p.sub}</p>
              <div className="work-tags">
                {p.stack.slice(0, 4).map(s => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
            <span className="work-arrow">↗</span>
          </button>
        ))}
      </div>
      <ProjectOverlay project={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
