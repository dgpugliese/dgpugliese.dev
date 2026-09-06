import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { Highlight } from './Highlight.jsx';

export function About() {
  return (
    <section className="sect" id="about">
      <div className="sect-head">
        <span className="sect-mark" />
        <h2 className="sect-title">About</h2>
      </div>
      <div className="about-block">
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
  return (
    <section className="sect" id="work">
      <div className="sect-head">
        <span className="sect-mark" />
        <h2 className="sect-title">Selected <Highlight>Work</Highlight></h2>
      </div>
      <div className="work-list">
        {projects.map(p => {
          const isInternal = !!p.caseStudy;
          const isExternal = !p.caseStudy && !!p.href;
          const Tag = isInternal ? Link : isExternal ? 'a' : 'div';
          const wrapperProps = isInternal
            ? { to: p.caseStudy }
            : isExternal
              ? { href: p.href, target: '_blank', rel: 'noreferrer' }
              : {};
          const isClickable = isInternal || isExternal;
          return (
            <Tag key={p.id} {...wrapperProps} className="work-row">
              <span className="work-status">● {p.tag}</span>
              <div>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-desc">{p.sub}</p>
                <div className="work-tags">
                  {p.stack.slice(0, 4).map(s => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
              {isClickable && <span className="work-arrow">↗</span>}
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
