import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link to="/" className="site-nav-brand">DGPUGLIESE</Link>
        <nav className="site-nav-links">
          <Link to="/experience">Experience</Link>
          <Link to="/uses">Uses</Link>
          <Link to="/build">Build</Link>
          <Link to="/log">Writing</Link>
        </nav>
        <div className="site-nav-actions">
          <a className="site-nav-icon" href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">GitHub</a>
          <a className="site-nav-icon" href="https://linkedin.com/in/dgpugliese" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">Book a call →</a>
        </div>
        <button
          type="button"
          className="site-nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <div className="site-nav-mobile">
          <Link to="/experience">Experience</Link>
          <Link to="/uses">Uses</Link>
          <Link to="/build">Build</Link>
          <Link to="/log">Writing</Link>
          <div className="site-nav-mobile-actions">
            <a href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/dgpugliese" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">Book a call →</a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <span>dgpugliese.dev · philadelphia, pa</span>
      <a href="mailto:dp@dgpugliese.dev">dp@dgpugliese.dev</a>
      <span>© {new Date().getFullYear()} David Pugliese</span>
    </footer>
  );
}
