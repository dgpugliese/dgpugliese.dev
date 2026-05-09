import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ObscuraCaseStudy from './pages/ObscuraCaseStudy.jsx';
import SilentBeatCaseStudy from './pages/SilentBeatCaseStudy.jsx';
import Log, { LogPost } from './pages/Log.jsx';
import { Boot } from './components/fx.jsx';
import { CLI } from './components/CLI.jsx';
import { AudioProvider } from './lib/audio.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  // Skip boot if user already saw it this session
  const [booted, setBooted] = useState(() => sessionStorage.getItem('booted') === '1');
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
    console.log('%c// rev 2026-05-07-r2', dim);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AudioProvider>
        {!booted && <Boot onDone={finishBoot} />}

        <Routes>
          <Route path="/" element={<Home booted={booted} />} />
          <Route path="/obscura" element={<ObscuraCaseStudy />} />
          <Route path="/silentbeat" element={<SilentBeatCaseStudy />} />
          <Route path="/log" element={<Log />} />
          <Route path="/log/:slug" element={<LogPost />} />
          <Route path="*" element={<Home booted={booted} />} />
        </Routes>

        {showTop && (
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Back to top"
            aria-label="Back to top"
          >↑</button>
        )}

        <CLI />
      </AudioProvider>
    </BrowserRouter>
  );
}
