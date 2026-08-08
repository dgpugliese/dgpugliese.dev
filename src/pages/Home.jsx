import { useEffect, useState } from 'react';
import { Starfield, Clock } from '../components/fx.jsx';
import { Hero } from '../components/Hero.jsx';
import { About, Skills, Projects } from '../components/sections1.jsx';
import { Resume, Press, GitHub, Certs, Contact } from '../components/sections2.jsx';
import { useSeo } from '../lib/seo';
import { posts } from '../data/posts.js';

const STATS = [
  ['LAST_DEPLOY', __BUILD_DATE__],
  ['COMMIT', __COMMIT_SHA__],
  ['POSTS', `${posts.length} · PROJECTS 10`],
  ['ROUTES', '5 · UPLINK OK'],
];

function StatTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % STATS.length), 4000);
    return () => clearInterval(id);
  }, []);
  const [k, v] = STATS[i];
  return (
    <span key={i} className="stat-ticker">
      <span className="stat-key">{k}</span>
      <span className="stat-sep">·</span>
      <span className="stat-val">{v}</span>
    </span>
  );
}

export default function Home({ booted }) {
  useSeo({
    title: 'David Pugliese · IT Director · Solutions Architect · MSP Founder',
    description:
      'David Pugliese — IT Director, Lead Solutions Architect, and MSP founder with 16+ years across enterprise infrastructure, cybersecurity, cloud platforms, software development, and automation.',
    path: '/',
    image: 'https://dgpugliese.dev/og.svg',
  });
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (!booted) return;
    const ids = ['home', 'about', 'stack', 'projects', 'resume', 'press', 'github', 'certs', 'contact'];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [booted]);

  const navItems = [
    ['home', '01', 'HOME'], ['about', '02', 'ABOUT'], ['stack', '03', 'STACK'],
    ['projects', '04', 'OPS'], ['resume', '05', 'LOG'], ['press', '06', 'PRESS'],
    ['github', '07', 'GIT'], ['certs', '08', 'CERT'], ['contact', '09', 'TX'],
  ];

  return (
    <>
      <Starfield />
      <div className="grid-bg" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="scanline" />

      <div className="statusbar">
        <span><span className="dot">●</span> ONLINE</span>
        <span className="sep">/</span>
        <StatTicker />
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
    </>
  );
}
