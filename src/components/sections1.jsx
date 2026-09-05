import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';

export function About() {
  return (
    <section className="sect" id="about">
      <div className="sect-head">
        <span className="sect-num">// </span>
        <h2 className="sect-title">About</h2>
      </div>
      <div className="about-block">
        {/* Condensed from the Aug 2026 LinkedIn-anchored rewrite (see git log) — review before finalizing */}
        <p>
          IT Director, Solutions Architect, and MSP founder. 16+ years bridging enterprise IT
          infrastructure, security, and modern cloud development — three things that are usually
          three separate careers. Doing all of them is the point: I design the system, secure it,
          and write the code that runs it.
        </p>
        <p>
          Day to day that's running IT for a national membership organization, operating a solo
          MSP, and shipping production software alongside both — AI agent infrastructure,
          full-stack platforms on Cloudflare and Supabase, and applied security tools like{' '}
          <a href="https://obscr.app" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)' }}>Obscura</a>.
          On the side, I speak on cybersecurity posture for member-driven nonprofits.
        </p>
        <div className="about-links">
          <Link to="/experience">Experience →</Link>
          <Link to="/uses">Uses →</Link>
          <Link to="/log">Writing →</Link>
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section className="sect" id="work">
      <div className="sect-head">
        <span className="sect-num">// </span>
        <h2 className="sect-title">Selected Work</h2>
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
