import { useEffect, useState } from 'react';
import { Boot, Starfield, Clock } from './components/fx.jsx';
import { Hero } from './components/Hero.jsx';
import { About, Skills, Projects } from './components/sections1.jsx';
import { Resume, Press, GitHub, Certs, Contact } from './components/sections2.jsx';
import { CLI } from './components/CLI.jsx';

export default function App() {
  // Skip boot if user already saw it this session
  const [booted, setBooted] = useState(() => sessionStorage.getItem('booted') === '1');
  const [soundOn, setSoundOn] = useState(false);
  const [active, setActive] = useState('home');
  const [showTop, setShowTop] = useState(false);

  const finishBoot = () => {
    sessionStorage.setItem('booted', '1');
    setBooted(true);
  };

  // Console signature — for the engineers who actually open DevTools.
  useEffect(() => {
    if (sessionStorage.getItem('greeted') === '1') return;
    sessionStorage.setItem('greeted', '1');
    const hdr = 'color:#7fdfff;font-weight:700;font-family:JetBrains Mono,monospace;font-size:13px;line-height:1.6;';
    const body = 'color:#d8e8f4;font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.6;';
    const accent = 'color:#7ee787;font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.6;';
    const dim = 'color:rgba(216,232,244,0.5);font-family:JetBrains Mono,monospace;font-size:11px;';
    console.log('%c> _', hdr);
    console.log('%c◆ DGPUGLIESE.DEV  // operator console', hdr);
    console.log(
      '%cif you got this far, you\'re probably my kind of person.\n' +
      'source: %chttps://github.com/dgpugliese/dgpugliese.dev\n' +
      '%cif you\'re hiring or want to build something:\n' +
      '  ↳ %cdp@dgpugliese.dev',
      body, accent, body, accent
    );
    console.log('%cps. press ` (backtick) anywhere on the page.', dim);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const ids = ['home', 'about', 'stack', 'projects', 'resume', 'press', 'github', 'certs', 'contact'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [booted]);

  useEffect(() => {
    if (!soundOn) return;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const beep = (freq = 880, dur = 0.04) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.value = freq;
      g.gain.value = 0.04;
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    };
    const click = () => beep(1200, 0.025);
    document.addEventListener('click', click);
    return () => { document.removeEventListener('click', click); ctx.close(); };
  }, [soundOn]);

  const navItems = [
    ['home', '01', 'HOME'], ['about', '02', 'ABOUT'], ['stack', '03', 'STACK'],
    ['projects', '04', 'OPS'], ['resume', '05', 'LOG'], ['press', '06', 'PRESS'],
    ['github', '07', 'GIT'], ['certs', '08', 'CERT'], ['contact', '09', 'TX'],
  ];

  return (
    <>
      {!booted && <Boot onDone={finishBoot} />}
      <Starfield />
      <div className="grid-bg" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="scanline" />

      <div className="statusbar">
        <span><span className="dot">●</span> ONLINE</span>
        <span className="sep">/</span>
        <span>SYS / DGPUGLIESE.DEV / v2.6.0</span>
        <div className="right">
          <span><Clock /></span>
          <span>LAT 39.95°N · LON 75.16°W</span>
          <span style={{ color: 'var(--green)' }}>● MFA OK</span>
        </div>
      </div>

      <nav className="rail">
        {navItems.map(([id, n, t]) => (
          <a key={id} href={`#${id}`} className={'rail-btn' + (active === id ? ' active' : '')}>
            {n}<span className="tip">{t}</span>
          </a>
        ))}
        <div className="rail-spacer" />
        <a className="rail-btn" href="https://github.com/dgpugliese" target="_blank" rel="noreferrer">↗<span className="tip">GitHub</span></a>
      </nav>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Press />
        <GitHub />
        <Certs />
        <Contact />
      </main>

      <button className="sound-toggle" onClick={() => setSoundOn(s => !s)} title={soundOn ? 'Mute' : 'Enable sounds'}>
        {soundOn ? '♪' : '×'}
      </button>

      {showTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          aria-label="Back to top"
        >↑</button>
      )}

      <CLI />
    </>
  );
}
