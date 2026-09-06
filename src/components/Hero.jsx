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

function BrushStroke() {
  return (
    <svg className="brush-stroke" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 16 C 30 4, 55 22, 85 12 S 140 4, 170 14 S 210 18, 216 10" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">IT Director · Solutions Architect · MSP Founder</div>
      <h1>
        I build the systems<br />
        vendors quote{' '}
        <span className="hero-highlight">
          six figures
          <BrushStroke />
        </span>{' '}
        for.
      </h1>
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

const ACTIVITY_WINDOW_DAYS = 60;

function GitHubStrip() {
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
              .then((r) => (r.ok ? r.json() : []))
              .catch(() => [])
          )
        );
        const pushEvents = pages.flat().filter((e) => e && e.type === 'PushEvent');

        const byDay = {};
        pushEvents.forEach((e) => {
          const day = e.created_at.slice(0, 10);
          const commits = e.payload?.commits?.length || 1;
          byDay[day] = (byDay[day] || 0) + commits;
        });

        const days = [];
        const now = new Date();
        for (let i = ACTIVITY_WINDOW_DAYS - 1; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          days.push({ date: key, count: byDay[key] || 0 });
        }

        const totalCommits = pushEvents.reduce((sum, e) => sum + (e.payload?.commits?.length || 1), 0);
        setActivity({ days, totalCommits, totalPushes: pushEvents.length });
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
  if (err) return null;
  if (!activity) {
    return <div className="github-activity github-strip-note pulse">fetching push activity…</div>;
  }
  return (
    <div className="github-activity">
      <div className="github-activity-row">
        <span className="github-strip-note">
          {activity.totalPushes} pushes · {activity.totalCommits} commits · last {ACTIVITY_WINDOW_DAYS} days
        </span>
        <span className="github-strip-note">public activity only</span>
      </div>
      <div className="github-activity-dots" title={`${activity.totalPushes} public pushes in the last ${ACTIVITY_WINDOW_DAYS} days`}>
        {activity.days.map((d) => (
          <span key={d.date} className="github-activity-dot" data-level={activityLevel(d.count)} />
        ))}
      </div>
    </div>
  );
}
