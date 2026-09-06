import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StackIcon } from '../data/stackIcons.jsx';

export function ProjectOverlay({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;
  const rows = [
    ['Context', p.context],
    ['Problem', p.problem],
    ['Ownership', p.ownership],
  ].filter(([, text]) => !!text);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="overlay-close" aria-label="Close" onClick={onClose}>×</button>

        <div className="overlay-head">
          <span className="overlay-avatar">{p.title.charAt(0)}</span>
          <div className="overlay-meta">
            <span className="overlay-meta-line">{p.id} · {p.period || p.tag}</span>
            <span className="overlay-kind">{p.kind}</span>
          </div>
        </div>

        <h3 id="overlay-title" className="overlay-title">{p.headline || p.title}</h3>
        <p className="overlay-sub">{p.sub}</p>

        {p.shipped && (
          <div className="overlay-block">
            <span className="overlay-label">What I Shipped</span>
            <ul className="overlay-bullets">
              {p.shipped.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}

        {p.result && (
          <div className="overlay-result">
            <span className="overlay-label">Result</span>
            <p>{p.result}</p>
          </div>
        )}

        {rows.length > 0 && (
          <div className="overlay-rows">
            {rows.map(([label, text]) => (
              <div className="overlay-row" key={label}>
                <span className="overlay-label">{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        )}

        {!p.shipped && !p.result && rows.length === 0 && (
          <p className="overlay-detail">{p.detail || p.sub}</p>
        )}

        <div className="overlay-stack">
          {p.stack.map(s => <StackIcon key={s} label={s} />)}
        </div>

        <div className="overlay-links">
          {p.live && <a className="btn" href={p.live} target="_blank" rel="noreferrer">→ Visit site</a>}
          {p.href && <a className="btn" href={p.href} target="_blank" rel="noreferrer">→ Visit site</a>}
          {p.repo && <a className="btn btn-ghost" href={p.repo} target="_blank" rel="noreferrer">↗ Source</a>}
          {p.caseStudy && <Link className="btn btn-ghost" to={p.caseStudy}>Full case study →</Link>}
        </div>
      </div>
    </div>
  );
}
