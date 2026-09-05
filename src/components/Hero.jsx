import { useEffect, useState } from 'react';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';

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
      <a href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">@dgpugliese</a>
      {user ? (
        <span>{user.public_repos} public repos · {user.followers} followers</span>
      ) : err ? (
        <span className="github-strip-note">rate-limited or offline — see github.com/dgpugliese</span>
      ) : (
        <span className="pulse">fetching GitHub activity…</span>
      )}
      <span className="github-strip-note">real, live from the GitHub API — not a synthetic heatmap</span>
    </div>
  );
}
