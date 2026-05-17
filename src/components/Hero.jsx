import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typer } from './fx.jsx';
import { channels } from '../data/channels.js';
import { useAudio } from '../lib/audio.jsx';

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
            ◢ SECURE_CHANNEL OPEN · INBOUND OK ◣
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(72px, 9vw, 132px)', fontWeight: 700, lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
            DAVID<br /><span style={{ position: 'relative' }}>PUGLIESE<span style={{ color: 'var(--cyan)' }}>.</span></span>
          </h1>
          <div className="mono" style={{ fontSize: 18, marginTop: 24, color: 'var(--fg-dim)', minHeight: 32 }}>
            <span style={{ color: 'var(--cyan)' }}>&gt; </span>
            <Typer phrases={[
              'ai agent infrastructure // forward-deployed engineer',
              'ships production MCP servers for claude in the enterprise',
              'designs non-human identity & access scoping for agents',
              'full-stack platforms · zero-trust · cloud identity',
              'engineer who ships in production, not slides',
            ]} />
          </div>
          <div style={{ marginTop: 28, maxWidth: 600, fontSize: 16, lineHeight: 1.6, color: 'var(--fg-dim)' }}>
            10+ years building and operating AI agent infrastructure, identity systems, and full-stack platforms in
            production. Currently runs MCP servers connecting Claude to Microsoft 365, Google Workspace, Cloudflare,
            and Supabase for a ~150K-user organization — and authored the non-human identity model the org now
            defaults to for any new agent integration. Comfortable shipping end-to-end, briefing a CISO Friday
            afternoon, and debugging OAuth at 2 a.m. Saturday.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 40, flexWrap: 'wrap' }}>
          <Link className="btn" to="/build">→ AVAILABLE FOR BUILDS</Link>
          <a className="btn btn-ghost" href="mailto:dp@dgpugliese.dev">→ TRANSMIT_MSG</a>
          <Link className="btn btn-ghost" to="/log">→ SIGNAL_LOG</Link>
          <a className="btn btn-ghost" href="https://linkedin.com/in/dgpugliese" target="_blank" rel="noreferrer">↗ LINKEDIN</a>
          <a className="btn btn-ghost" href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">↗ GITHUB</a>
          <a className="btn btn-ghost" href="https://davidguypugliese.com" target="_blank" rel="noreferrer">↗ DAVID PUGLIESE · RESUME</a>
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

function FingerprintWatermark() {
  return (
    <svg viewBox="0 0 64 80" className="vid-fingerprint" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 50 C 6 22, 26 6, 32 6 C 38 6, 58 22, 58 50" />
        <path d="M10 56 C 10 26, 26 12, 32 12 C 38 12, 54 26, 54 56" />
        <path d="M14 60 C 14 30, 26 18, 32 18 C 38 18, 50 30, 50 58" />
        <path d="M18 60 C 18 34, 28 24, 32 24 C 36 24, 46 34, 46 58" />
        <path d="M22 58 C 22 40, 28 30, 32 30 C 36 30, 42 40, 42 58" />
        <path d="M26 56 C 26 46, 30 38, 32 38 C 34 38, 38 46, 38 56" />
        <circle cx="32" cy="46" r="2" fill="currentColor" stroke="none" />
        <path d="M20 50 L 24 50" />
        <path d="M40 52 L 44 52" />
        <path d="M16 44 L 20 44" />
        <path d="M44 44 L 48 44" />
      </g>
    </svg>
  );
}

function DuotoneFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <filter id="duotone-cyan" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            0.30 0.59 0.11 0 0
            0.30 0.59 0.11 0 0
            0.30 0.59 0.11 0 0
            0    0    0    1 0" />
          <feComponentTransfer>
            <feFuncR tableValues="0.03 0.32" />
            <feFuncG tableValues="0.05 0.62" />
            <feFuncB tableValues="0.08 0.74" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}

function Avatar() {
  // Deterministic-but-irregular barcode pattern. 40 bars, widths 1–3px.
  const bars = [2,1,3,1,2,2,1,3,2,1,1,2,3,1,2,1,3,2,1,2,2,1,1,3,1,2,2,3,1,1,2,3,1,2,1,2,3,1,2,1];
  const [scanned, setScanned] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  const timersRef = useRef([]);

  const onScan = () => {
    if (scanned) return;
    setScanned(true);
    if (typeof window !== 'undefined' && 'console' in window) {
      console.log(
        '%c> BARCODE_DECODED\n%c» SECURE_CHANNEL_OPEN · dp@dgpugliese.dev',
        'color:#ffa657;font-family:JetBrains Mono,monospace;font-size:12px;letter-spacing:0.15em;',
        'color:#7ee787;font-family:JetBrains Mono,monospace;font-size:12px;'
      );
    }
    timersRef.current.push(setTimeout(() => setRevealed(true), 600));
    timersRef.current.push(setTimeout(() => setRevealed(false), 12000));
    timersRef.current.push(setTimeout(() => setScanned(false), 12400));
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  return (
    <div className="panel panel-corners visual-id" style={{ padding: 20, position: 'relative' }}>
      <span className="panel-label">VISUAL_ID</span>

      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div className={'vid-portrait' + (hasPhoto ? ' vid-portrait-has-photo' : '')} aria-hidden>
          <DuotoneFilter />
          <span className="vid-tick vid-tick-tl" />
          <span className="vid-tick vid-tick-tr" />
          <span className="vid-tick vid-tick-bl" />
          <span className="vid-tick vid-tick-br" />
          <FingerprintWatermark />
          {hasPhoto && (
            <>
              <img
                src="/me.jpg"
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="vid-photo"
                onError={() => setHasPhoto(false)}
              />
              <span className="vid-photo-vignette" aria-hidden />
            </>
          )}
          <div className="vid-initials">DP</div>
          <div className="vid-id">ID-04 · 2026</div>
          <span className="vid-glitch-noise" aria-hidden />
        </div>

        <div className="mono vid-rows" style={{ fontSize: 11, lineHeight: 1.65, flex: 1, minWidth: 0 }}>
          <div style={{ color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>HANDLE</div>
          <div style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>dgpugliese</div>

          <div className="vid-row"><span className="vid-key">ROLE</span><span className="vid-val">director_of_it</span></div>
          <div className="vid-row"><span className="vid-key">DOMAIN</span><span className="vid-val">ai_infra · platforms · zero-trust</span></div>
          <div className="vid-row"><span className="vid-key">KEY</span><span className="vid-val vid-key-hex">4ec9 · e07f · a3d2 · 1c84</span></div>
          <div className="vid-row"><span className="vid-key">NODE</span><span className="vid-val">phl // et</span></div>

          <div style={{ color: 'var(--green)', marginTop: 8, letterSpacing: '0.04em' }}>
            ● channel open — inbound transmissions ok
          </div>
        </div>
      </div>

      <div className="vid-footer">
        <button
          type="button"
          onClick={onScan}
          aria-label="Scan credential barcode"
          title={scanned ? 'scanning…' : 'scan'}
          className={'vid-barcode' + (scanned ? ' vid-barcode-scanning' : '')}
        >
          {bars.map((w, i) => (
            <span key={i} style={{ width: w, height: '100%', background: 'var(--fg)', opacity: 0.85 }} />
          ))}
          <span className="vid-scanline" aria-hidden />
        </button>
        {scanned ? (
          <div className="vid-stamp vid-stamp-decoded">[ DECODING… ]</div>
        ) : (
          <a
            href="https://credly.com/users/dpugliese"
            target="_blank"
            rel="noreferrer"
            className="vid-stamp vid-stamp-link"
            title="verify on Credly"
          >
            [ SEC+ · CC · VERIFIED ↗ ]
          </a>
        )}
      </div>

      {revealed && (
        <div className="vid-decoded" role="status">
          <div className="mono vid-decoded-head">
            <span style={{ color: 'var(--amber)', letterSpacing: '0.18em' }}>&gt; DECODED</span>
            <span style={{ color: 'var(--fg-faint)', letterSpacing: '0.1em' }}>// TX_CHANNELS</span>
          </div>
          <ul className="vid-channels mono">
            {channels.map((c, i) => (
              <li key={c.key} className="vid-channel" style={{ animationDelay: `${i * 90}ms` }}>
                <span className="vid-channel-key">{c.label}</span>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={'vid-channel-val' + (c.pending ? ' vid-channel-pending' : '')}>
                    {c.value}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="vid-channel-val vid-channel-copy"
                    onClick={() => { try { navigator.clipboard?.writeText(c.value); } catch {} }}
                    title="copy"
                  >
                    {c.value}
                  </button>
                )}
                <span className="vid-channel-note">{c.note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--line)', paddingTop: 10, gap: 10, flexWrap: 'wrap' }}>
        <span>OPERATOR_HB</span>
        <span onClick={onHbClick} title="don't push it"
              style={{ color: flatline ? 'var(--amber)' : 'var(--green)', cursor: 'pointer', userSelect: 'none' }}>
          {flatline ? '0 bpm ─── flatline ───' : `${hb} bpm ●`}
        </span>
        <AudioToggle />
      </div>
    </div>
  );
}

function AudioToggle() {
  const { playing, toggle, track } = useAudio();
  return (
    <span className="audio-toggle-row">
      <button
        type="button"
        onClick={toggle}
        className={'audio-toggle' + (playing ? ' audio-toggle-on' : '')}
        title={playing ? 'pause score' : 'play score'}
        aria-pressed={playing}
        aria-label={playing ? 'pause background score' : 'play background score'}
      >
        <span className="audio-toggle-glyph">{playing ? '◼' : '▶'}</span>
        <span className="audio-toggle-label">{playing ? 'SCORE · ON' : 'SCORE'}</span>
      </button>
      {playing && (
        <a
          href={track.href}
          target="_blank"
          rel="noreferrer"
          className="audio-credit"
          title={`${track.title} — Music by ${track.artist} ${track.artistHandle}`}
        >
          ♪ {track.artist} <span className="audio-credit-handle">{track.artistHandle}</span> ↗
        </a>
      )}
    </span>
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
