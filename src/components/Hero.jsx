import { useEffect, useRef, useState } from 'react';
import { Typer } from './fx.jsx';

export function Hero() {
  const heroRef = useRef(null);
  const onMove = (e) => {
    const r = heroRef.current?.getBoundingClientRect(); if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroRef.current.style.setProperty('--mx', x);
    heroRef.current.style.setProperty('--my', y);
  };
  return (
    <section className="sect" id="home" data-screen-label="01 Home" ref={heroRef} onMouseMove={onMove}
             style={{ minHeight: 'calc(100vh - 36px)', padding: '60px 60px 40px', display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 24 }}>
      <div className="panel panel-corners" style={{ padding: '48px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'translate3d(calc(var(--mx, 0) * -8px), calc(var(--my, 0) * -6px), 0)', transition: 'transform 0.3s cubic-bezier(.2,.8,.2,1)' }}>
        <span className="panel-label">OPERATOR_PROFILE</span>
        <div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 16 }}>
            ◢ INITIALIZED · CLASS-A CLEARANCE ◣
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(72px, 9vw, 132px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
            DAVID<br /><span style={{ position: 'relative' }}>PUGLIESE<span style={{ color: 'var(--cyan)' }}>.</span></span>
          </h1>
          <div className="mono" style={{ fontSize: 18, marginTop: 24, color: 'var(--fg-dim)', minHeight: 32 }}>
            <span style={{ color: 'var(--cyan)' }}>&gt; </span>
            <Typer phrases={[
              'director of IT // ai agent infrastructure',
              'ships full-stack platforms end-to-end',
              'runs production MCP servers for claude',
              'cloud identity, security, zero-trust ops',
              'mentor · architect · operator',
            ]} />
          </div>
          <div style={{ marginTop: 28, maxWidth: 580, fontSize: 16, lineHeight: 1.6, color: 'var(--fg-dim)' }}>
            10+ years across hybrid infrastructure, cybersecurity, and full-stack engineering. Currently leading
            an AI-integrated IT function for a large nonprofit. Comfortable architecting platforms end-to-end,
            mentoring engineers, briefing executives, and debugging OAuth flows at 2 a.m.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
          <a className="btn" href="mailto:dp@dgpugliese.dev">→ TRANSMIT_MSG</a>
          <a className="btn btn-ghost" href="https://linkedin.com/in/dgpugliese" target="_blank" rel="noreferrer">↗ LINKEDIN</a>
          <a className="btn btn-ghost" href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">↗ GITHUB</a>
          <a className="btn btn-ghost" href="https://credly.com/users/dpugliese" target="_blank" rel="noreferrer">↗ CREDLY</a>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, transform: 'translate3d(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 8px), 0)', transition: 'transform 0.3s cubic-bezier(.2,.8,.2,1)' }}>
        <Avatar />
        <Telemetry />
        <NowPlaying />
      </div>
    </section>
  );
}

function Avatar() {
  return (
    <div className="panel panel-corners" style={{ padding: 20, position: 'relative' }}>
      <span className="panel-label">VISUAL_ID</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 88, height: 88, position: 'relative', flexShrink: 0 }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <defs>
              <radialGradient id="orb" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#7fdfff" />
                <stop offset="55%" stopColor="#4ec9e0" />
                <stop offset="100%" stopColor="#1a3a4a" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#orb)" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#7fdfff" strokeWidth="0.6" opacity="0.5" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#7fdfff" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="22s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#4ec9e0" strokeWidth="0.5" strokeDasharray="1 8" opacity="0.7">
              <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="40s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <div className="mono" style={{ fontSize: 11, lineHeight: 1.7 }}>
          <div style={{ color: 'var(--fg-faint)' }}>HANDLE</div>
          <div style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 600 }}>dgpugliese</div>
          <div style={{ color: 'var(--fg-faint)', marginTop: 4 }}>LOC // PHL</div>
          <div style={{ color: 'var(--green)', marginTop: 4 }}>● avail. for collab</div>
        </div>
      </div>
    </div>
  );
}

function Telemetry() {
  const [hb, setHb] = useState(72);
  const [flatline, setFlatline] = useState(false);
  const clicksRef = useRef([]);
  useEffect(() => {
    if (flatline) return;
    const id = setInterval(() => setHb(70 + Math.floor(Math.random() * 6)), 1100);
    return () => clearInterval(id);
  }, [flatline]);
  const onHbClick = () => {
    if (flatline) return;
    const now = Date.now();
    clicksRef.current = [...clicksRef.current.filter(t => now - t < 1500), now];
    if (clicksRef.current.length >= 5) {
      clicksRef.current = [];
      setFlatline(true);
      setTimeout(() => setFlatline(false), 1600);
    }
  };
  return (
    <div className="panel panel-corners" style={{ padding: 20 }}>
      <span className="panel-label">TELEMETRY</span>
      <div className="telemetry-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
        {[
          ['YRS_EXP', '10+', 'var(--cyan)'],
          ['MCP_SERVERS', '5+', 'var(--violet)'],
          ['UPTIME_SLA', '98%+', 'var(--green)'],
          ['CERTS', '25', 'var(--amber)'],
        ].map(([k, v, c]) => (
          <div key={k} className="telemetry-cell" style={{ borderLeft: `2px solid ${c}`, paddingLeft: 10 }}>
            <div className="mono telemetry-label" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.1em' }}>{k}</div>
            <div className="mono telemetry-value" style={{ fontSize: 22, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', marginTop: 14, display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--line)', paddingTop: 10 }}>
        <span>OPERATOR_HB</span>
        <span onClick={onHbClick} title="don't push it"
              style={{ color: flatline ? 'var(--amber)' : 'var(--green)', cursor: 'pointer', userSelect: 'none' }}>
          {flatline ? '0 bpm ─── flatline ───' : `${hb} bpm ●`}
        </span>
      </div>
    </div>
  );
}

function NowPlaying() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    fetch('/now.json', { cache: 'no-cache' })
      .then(r => r.ok ? r.json() : null)
      .then(setNow)
      .catch(() => setNow(null));
  }, []);

  const data = now || {
    shipping: { title: 'kapsi-connect v2.4 → cloudflare.pages', detail: 'webauthn flow + dues processor patch · eta 0:42' },
  };
  const rows = [
    data.shipping && { key: 'shipping', glyph: '●', glyphColor: 'var(--green)', ...data.shipping },
    data.studying && { key: 'studying', glyph: '◆', glyphColor: 'var(--violet)', ...data.studying },
    data.next && { key: 'next', glyph: '▶', glyphColor: 'var(--amber)', ...data.next },
  ].filter(Boolean);

  return (
    <div className="panel" style={{ padding: '14px 18px' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.18em', marginBottom: 8 }}>// NOW</div>
      {rows.map((r, i) => (
        <div key={r.key} style={{ marginTop: i === 0 ? 0 : 8 }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--cyan)', display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ color: r.glyphColor, flexShrink: 0 }}>{r.glyph}</span>
            <span style={{ color: 'var(--fg-faint)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 10, width: 56, flexShrink: 0 }}>{r.key}</span>
            <span style={{ color: 'var(--fg)' }}>{r.title}</span>
          </div>
          {r.detail && (
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', marginTop: 2, marginLeft: 80 }}>
              {r.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
