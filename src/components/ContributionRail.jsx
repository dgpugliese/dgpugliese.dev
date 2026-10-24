import { useCallback, useEffect, useRef, useState } from 'react';

const USER = 'dgpugliese';
const WINDOW_DAYS = 60;
const ROWS = 8;
const TICK_MS = 110;
const BEST_KEY = 'rail-snake-best';

function GitHubMark(props) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function lastNDays(n) {
  const days = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// Contribution calendar (public + any private counts shown on the profile).
// Falls back to public PushEvents if that service is down.
async function loadDays() {
  const keys = lastNDays(WINDOW_DAYS);
  try {
    const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
    if (!r.ok) throw r.status;
    const { contributions } = await r.json();
    const byDay = Object.fromEntries(contributions.map((c) => [c.date, c.count]));
    return { days: keys.map((date) => ({ date, count: byDay[date] || 0 })), unit: 'contributions' };
  } catch {
    const pages = await Promise.all(
      [1, 2, 3].map((p) =>
        fetch(`https://api.github.com/users/${USER}/events/public?per_page=100&page=${p}`).then((r) => (r.ok ? r.json() : []))
      )
    );
    const byDay = {};
    pages.flat().forEach((e) => {
      if (e?.type === 'PushEvent') byDay[e.created_at.slice(0, 10)] = (byDay[e.created_at.slice(0, 10)] || 0) + 1;
    });
    return { days: keys.map((date) => ({ date, count: byDay[date] || 0 })), unit: 'public pushes' };
  }
}

function cellOpacity(count, max) {
  if (!count) return 0.12;
  return 0.35 + 0.65 * Math.sqrt(count / max);
}

export function ContributionRail() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const clicks = useRef({ n: 0, t: 0 });

  useEffect(() => {
    loadDays().then(setData).catch(() => setFailed(true));
  }, []);

  // Own triple-click counter: `detail` resets when the rail re-renders mid-sequence.
  const onRailClick = () => {
    const now = Date.now();
    clicks.current = now - clicks.current.t < 450 ? { n: clicks.current.n + 1, t: now } : { n: 1, t: now };
    if (clicks.current.n >= 3) {
      clicks.current = { n: 0, t: 0 };
      setPlaying(true);
    }
  };

  const total = data?.days.reduce((s, d) => s + d.count, 0);
  const max = data ? Math.max(1, ...data.days.map((d) => d.count)) : 1;

  return (
    <figure className="rail" aria-label="GitHub contribution activity">
      <figcaption className="rail-caption mono">
        <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer"><GitHubMark /> @{USER}</a>
        <span>
          {data ? `${total.toLocaleString()} ${data.unit} · ${WINDOW_DAYS} days` : failed ? 'activity offline' : 'fetching…'}
        </span>
      </figcaption>
      {playing ? (
        <Snake cols={WINDOW_DAYS} onExit={() => setPlaying(false)} />
      ) : (
        <div className="rail-cells" onClick={onRailClick}>
          {(data?.days || lastNDays(WINDOW_DAYS).map((date) => ({ date, count: 0 }))).map((d, i) => (
            <span
              key={d.date}
              className={`rail-cell${data ? ' rail-cell-live' : ''}`}
              style={{ opacity: data ? cellOpacity(d.count, max) : 0.12, animationDelay: `${i * 12}ms` }}
              title={data ? `${d.date}: ${d.count} ${data.unit}` : undefined}
            />
          ))}
        </div>
      )}
      <div className="rail-note mono">
        <span>{playing ? '← → ↑ ↓ · P pause · Esc leave' : 'Live from GitHub · tip: triple-click the rail'}</span>
      </div>
    </figure>
  );
}

function randomFood(snake, cols) {
  for (;;) {
    const f = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

function freshGame(cols) {
  const snake = [{ x: 6, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 4 }];
  return { snake, dir: { x: 1, y: 0 }, queue: [], food: randomFood(snake, cols), score: 0, over: false, paused: false };
}

const KEY_DIRS = {
  ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
};

function Snake({ cols, onExit }) {
  const game = useRef(freshGame(cols));
  const [, force] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem(BEST_KEY)) || 0);
  const boardRef = useRef(null);

  const restart = useCallback(() => {
    game.current = freshGame(cols);
    force((n) => n + 1);
  }, [cols]);

  useEffect(() => {
    boardRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      const g = game.current;
      if (e.key === 'Escape') return onExit();
      if (e.key === ' ' && g.over) { e.preventDefault(); return restart(); }
      if (e.key === 'p' || e.key === 'P') { g.paused = !g.paused; return force((n) => n + 1); }
      const next = KEY_DIRS[e.key];
      if (!next) return;
      e.preventDefault();
      const last = g.queue[g.queue.length - 1] || g.dir;
      if (next.x !== -last.x || next.y !== -last.y) g.queue.push(next);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit, restart]);

  useEffect(() => {
    const id = setInterval(() => {
      const g = game.current;
      if (g.over || g.paused) return;
      if (g.queue.length) g.dir = g.queue.shift();
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
      const hitWall = head.x < 0 || head.y < 0 || head.x >= cols || head.y >= ROWS;
      if (hitWall || g.snake.some((s) => s.x === head.x && s.y === head.y)) {
        g.over = hitWall ? 'wall.' : 'tail.';
        if (g.score > best) {
          setBest(g.score);
          localStorage.setItem(BEST_KEY, String(g.score));
        }
      } else {
        g.snake.unshift(head);
        if (head.x === g.food.x && head.y === g.food.y) {
          g.score += 1;
          g.food = randomFood(g.snake, cols);
        } else {
          g.snake.pop();
        }
      }
      force((n) => n + 1);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [cols, best]);

  const g = game.current;
  const body = new Map(g.snake.map((s, i) => [s.y * cols + s.x, i]));

  return (
    <div className="snake" ref={boardRef} tabIndex={-1} aria-label="Snake game. Arrow keys to move, Escape to leave.">
      <div className="snake-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols * ROWS }, (_, i) => {
          const seg = body.get(i);
          const isFood = i === g.food.y * cols + g.food.x;
          return (
            <span
              key={i}
              className={`snake-cell${seg !== undefined ? ' snake-body' : ''}${isFood ? ' snake-food' : ''}`}
              style={seg !== undefined ? { opacity: Math.max(0.45, 1 - seg * 0.06) } : undefined}
            />
          );
        })}
      </div>
      {(g.over || g.paused) && (
        <div className="snake-overlay">
          <strong>{g.over || 'paused.'}</strong>
          <span className="mono">{g.over ? 'space to retry · esc to leave' : 'p to resume · esc to leave'}</span>
        </div>
      )}
      <div className="snake-score mono">score {g.score} · best {Math.max(best, g.score)}</div>
    </div>
  );
}
