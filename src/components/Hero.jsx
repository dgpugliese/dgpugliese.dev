import { useEffect, useState } from 'react';
import { Highlight } from './Highlight.jsx';

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
      <div className="hero-topline mono"><span>David Pugliese / Independent builder</span><span>Philadelphia, PA ↗</span></div>
      <div className="hero-composition">
        <div className="hero-copy">
          <div className="hero-eyebrow">IT Director · Solutions Architect · MSP Founder</div>
          <h1>I build the<br />systems.<br /><span className="hero-outline">End to end.</span></h1>
          <p className="hero-statement">The ones vendors quote <Highlight>six figures</Highlight> for.</p>
          <p className="hero-sub">16+ years across enterprise infrastructure, security, and software. From the architecture to the last line of code.</p>
          <div className="hero-actions">
            <a className="btn" href="#work">Explore the work <span aria-hidden="true">↘</span></a>
            <a className="hero-secondary" href={CAL_URL} target="_blank" rel="noreferrer">Let's talk ↗</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-grid" />
          <svg className="architecture-mark" viewBox="0 0 520 560" fill="none">
            <defs>
              <linearGradient id="red-face" x1="100" y1="80" x2="450" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#ff6b54"/><stop offset=".48" stopColor="#b91c1c"/><stop offset="1" stopColor="#590b10"/></linearGradient>
              <linearGradient id="red-edge" x1="350" y1="100" x2="150" y2="480" gradientUnits="userSpaceOnUse"><stop stopColor="#dc493b"/><stop offset="1" stopColor="#32080c"/></linearGradient>
            </defs>
            <g className="architecture-layers">
              {[0, 1, 2].map(i => <g key={i} transform={`translate(0 ${i * 104})`}>
                <path d="M60 160 260 48 460 160 260 277Z" fill="url(#red-face)" stroke="#ed7461" strokeWidth=".8"/>
                <path d="M60 160 260 277 460 160V207L260 324 60 207Z" fill="url(#red-edge)" stroke="#a72a28" strokeWidth=".8"/>
                <path d="m260 107 99 56-99 58-99-58Z" fill="#190c0e" stroke="#e35243"/>
                <path d="M260 107v45l59 34 40-23Z" fill="#570e15"/>
                <path d="M260 152 200 186 161 163 260 107Z" fill="#8c1c22"/>
              </g>)}
            </g>
          </svg>
          <div className="art-caption mono"><span>Architecture</span><span>Engineering</span><span>Operations</span></div>
        </div>
      </div>
      <div className="hero-bottom"><span className="mono">I ship in production, not slides.</span><a href="#work" className="mono">Explore selected work ↓</a></div>
    </section>
  );
}

const ACTIVITY_WINDOW_DAYS = 60;

export function GitHubStrip() {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityErr, setActivityErr] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/dgpugliese')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setUser)
      .catch(() => setErr(true));
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const pages = await Promise.all(
          [1, 2, 3].map((p) =>
            fetch(`https://api.github.com/users/dgpugliese/events/public?per_page=100&page=${p}`)
              .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
          )
        );
        const cutoff = new Date();
        cutoff.setUTCDate(cutoff.getUTCDate() - (ACTIVITY_WINDOW_DAYS - 1));
        cutoff.setUTCHours(0, 0, 0, 0);
        const pushEvents = pages.flat().filter((e) => e && e.type === 'PushEvent' && new Date(e.created_at) >= cutoff);

        const byDay = {};
        pushEvents.forEach((e) => {
          const day = e.created_at.slice(0, 10);
          byDay[day] = (byDay[day] || 0) + 1;
        });

        const days = [];
        const now = new Date();
        for (let i = ACTIVITY_WINDOW_DAYS - 1; i >= 0; i--) {
          const d = new Date(now);
          d.setUTCDate(d.getUTCDate() - i);
          const key = d.toISOString().slice(0, 10);
          days.push({ date: key, count: byDay[key] || 0 });
        }

        setActivity({ days, totalPushes: pushEvents.length });
      } catch {
        setActivityErr(true);
      }
    }
    load();
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
      <GitHubActivity activity={activity} err={activityErr} />
      <div className="github-strip-row github-strip-row-note">
        <span className="github-strip-note">Real, live from the GitHub API.</span>
        <span className="github-strip-note">{user ? 'Updated just now' : err ? '' : 'Loading…'}</span>
      </div>
    </div>
  );
}

function activityLevel(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  return 3;
}

function GitHubActivity({ activity, err }) {
  if (err) return <p className="github-strip-note">Push activity unavailable. View the profile on GitHub.</p>;
  if (!activity) {
    return <div className="github-activity github-strip-note pulse">fetching push activity…</div>;
  }
  return (
    <div className="github-activity">
      <div className="github-activity-row">
        <span className="github-strip-note">
          {activity.totalPushes} public pushes returned · last {ACTIVITY_WINDOW_DAYS} days
        </span>
        <span className="github-strip-note">GitHub API history may be incomplete</span>
      </div>
      <div className="github-activity-dots" title={`${activity.totalPushes} public pushes in the last ${ACTIVITY_WINDOW_DAYS} days`}>
        {activity.days.map((d) => (
          <span key={d.date} className="github-activity-dot" data-level={activityLevel(d.count)} title={`${d.date}: ${d.count} public pushes returned`} />
        ))}
      </div>
    </div>
  );
}
