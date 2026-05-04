import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const reduced = prefersReducedMotion();
    let raf, stars = [];
    const resize = () => {
      c.width = window.innerWidth * devicePixelRatio;
      c.height = window.innerHeight * devicePixelRatio;
      c.style.width = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      stars = Array.from({ length: 140 }).map(() => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        z: Math.random(),
        s: Math.random() * 1.4 + 0.2,
      }));
      if (reduced) drawStatic();
    };
    const drawStatic = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        ctx.fillStyle = `rgba(127, 223, 255, ${s.z * 0.5})`;
        ctx.fillRect(s.x, s.y, s.s * devicePixelRatio, s.s * devicePixelRatio);
      });
    };
    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      return () => window.removeEventListener('resize', resize);
    }
    let t = 0;
    const tick = () => {
      t += 0.003;
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        const a = 0.3 + 0.7 * Math.abs(Math.sin(t * (s.z + 0.3) * 4 + s.x * 0.001));
        ctx.fillStyle = `rgba(127, 223, 255, ${a * s.z * 0.7})`;
        ctx.fillRect(s.x, s.y, s.s * devicePixelRatio, s.s * devicePixelRatio);
        s.x += s.z * 0.15;
        if (s.x > c.width) s.x = 0;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <div className="starfield"><canvas ref={ref} /></div>;
}

export function Boot({ onDone }) {
  // Reduced motion → skip the animation entirely
  useEffect(() => {
    if (prefersReducedMotion()) onDone?.();
  }, [onDone]);
  const lines = [
    { t: '[ 0.001 ]', l: 'COLD START / CPU=APPLE_M-CLASS / MEM=OK', c: 'ok' },
    { t: '[ 0.014 ]', l: 'mounting /dev/dgpugliese.dev', c: 'ok' },
    { t: '[ 0.082 ]', l: 'verifying TLS chain ........ valid', c: 'ok' },
    { t: '[ 0.143 ]', l: 'auth: entra_id // mfa=true // cond_access=enforced', c: 'ok' },
    { t: '[ 0.221 ]', l: 'spawning mcp_runtime [claude.sonnet]', c: 'ok' },
    { t: '[ 0.298 ]', l: 'github.api: rate=60/h handshake → ok', c: 'ok' },
    { t: '[ 0.401 ]', l: 'loading operator_profile.dpugliese', c: 'ok' },
    { t: '[ 0.512 ]', l: 'READY — handing off to operator', c: 'ok' },
  ];
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (shown < lines.length) {
      const id = setTimeout(() => setShown(shown + 1), 90 + Math.random() * 120);
      return () => clearTimeout(id);
    }
    const t1 = setTimeout(() => setDone(true), 350);
    const t2 = setTimeout(onDone, 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [shown]);
  return (
    <div className={'boot' + (done ? ' done' : '')}>
      <div className="boot-inner">
        <div style={{ marginBottom: 12, color: 'var(--cyan-bright)', letterSpacing: '0.2em' }}>
          ◆ DGPUGLIESE.DEV — MISSION CONTROL v2.6.0
        </div>
        {lines.slice(0, shown).map((ln, i) => (
          <div key={i} className="boot-line">
            <span className="label">{ln.t}</span>{' '}
            <span className={ln.c}>›</span> {ln.l}
          </div>
        ))}
        {shown < lines.length && <span className="cursor" />}
        {shown >= lines.length && (
          <div className="boot-line" style={{ marginTop: 8 }}>
            <span className="ok">▶</span> press any key... <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

export function Typer({ phrases, speed = 55, hold = 1800 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(phrases[0]);
      return;
    }
    const cur = phrases[i];
    if (!del && text === cur) {
      const t = setTimeout(() => setDel(true), hold);
      return () => clearTimeout(t);
    }
    if (del && text === '') {
      setDel(false);
      setI((i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i]);
  return <>{text}<span className="cursor" /></>;
}

export function Clock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return <span>UTC {pad(t.getUTCHours())}:{pad(t.getUTCMinutes())}:{pad(t.getUTCSeconds())}</span>;
}
