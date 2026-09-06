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

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div
        className="overlay-panel panel panel-corners"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="overlay-close" aria-label="Close" onClick={onClose}>×</button>
        <span className="panel-label">{p.kind}</span>
        <span className={`chip chip-${p.tagC}`} style={{ position: 'absolute', top: 20, right: 56 }}>
          ● {p.tag}
        </span>

        <h3 id="overlay-title" className="overlay-title">{p.title}</h3>
        <p className="overlay-sub">{p.sub}</p>
        <p className="overlay-detail">{p.detail || p.sub}</p>

        <div className="overlay-links">
          {p.live && <a className="btn" href={p.live} target="_blank" rel="noreferrer">→ Visit site</a>}
          {p.href && <a className="btn" href={p.href} target="_blank" rel="noreferrer">→ Visit site</a>}
          {p.repo && <a className="btn btn-ghost" href={p.repo} target="_blank" rel="noreferrer">↗ Source</a>}
          {p.caseStudy && <Link className="btn btn-ghost" to={p.caseStudy}>Full case study →</Link>}
        </div>

        <div className="overlay-stack">
          {p.stack.map(s => <StackIcon key={s} label={s} />)}
        </div>
      </div>
    </div>
  );
}
