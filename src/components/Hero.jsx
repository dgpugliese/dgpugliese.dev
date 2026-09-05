import { useEffect, useState } from 'react';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';

function GitHubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">IT Director · Solutions Architect · MSP Founder</div>
      <h1>I build the systems<br />vendors quote six figures for.</h1>
      <p className="hero-sub">
        16+ years bridging enterprise IT infrastructure, security, and modern cloud development —
        usually three separate careers. I ship in production, not slides.
      </p>
      <div className="hero-actions">
        <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">Book a 30-min call →</a>
        <a className="hero-secondary" href="mailto:dp@dgpugliese.dev">Prefer email? Get in touch</a>
      </div>
      <GitHubStrip />
    </section>
  );
}

function GitHubStrip() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/dgpugliese')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setUser)
      .catch(() => setErr(true));
  }, []);

  return (
    <div className="github-strip mono">
      <div className="github-strip-row">
        <a href="https://github.com/dgpugliese" target="_blank" rel="noreferrer" className="github-strip-handle">
          <GitHubMark /> @dgpugliese
        </a>
        {user ? (
          <span className="github-strip-stat">
            {user.public_repos} public repos · building since {new Date(user.created_at).getFullYear()}
          </span>
        ) : err ? (
          <span className="github-strip-stat github-strip-note">offline — see github.com/dgpugliese</span>
        ) : (
          <span className="github-strip-stat pulse">fetching…</span>
        )}
      </div>
      <div className="github-strip-row github-strip-row-note">
        <span className="github-strip-note">Real, live from the GitHub API.</span>
        <span className="github-strip-note">{user ? 'Updated just now' : err ? '' : 'Loading…'}</span>
      </div>
    </div>
  );
}
