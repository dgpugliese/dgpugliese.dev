import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Uses from './pages/Uses.jsx';
import ObscuraCaseStudy from './pages/ObscuraCaseStudy.jsx';
import SilentBeatCaseStudy from './pages/SilentBeatCaseStudy.jsx';
import ComplianceDashboardCaseStudy from './pages/ComplianceDashboardCaseStudy.jsx';
import DorothyCaseStudy from './pages/DorothyCaseStudy.jsx';
import Build from './pages/Build.jsx';
import Log, { LogPost } from './pages/Log.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [showTop, setShowTop] = useState(false);

  // Console signature — for the engineers who actually open DevTools.
  useEffect(() => {
    if (sessionStorage.getItem('greeted') === '1') return;
    sessionStorage.setItem('greeted', '1');
    const hdr = 'color:#ef4444;font-weight:700;font-family:JetBrains Mono,monospace;font-size:13px;line-height:1.6;';
    const body = 'color:#e8eaed;font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.6;';
    const accent = 'color:#84a06b;font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.6;';
    console.log('%c> _', hdr);
    console.log('%cdgpugliese.dev', hdr);
    console.log(
      '%cif you got this far, you\'re probably my kind of person.\n' +
      'source: %chttps://github.com/dgpugliese/dgpugliese.dev\n' +
      '%cif you\'re hiring or want to build something:\n' +
      '  ↳ %cdp@dgpugliese.dev',
      body, accent, body, accent
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="/obscura" element={<ObscuraCaseStudy />} />
        <Route path="/silentbeat" element={<SilentBeatCaseStudy />} />
        <Route path="/compliance" element={<ComplianceDashboardCaseStudy />} />
        <Route path="/dorothy" element={<DorothyCaseStudy />} />
        <Route path="/build" element={<Build />} />
        <Route path="/log" element={<Log />} />
        <Route path="/log/:slug" element={<LogPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showTop && (
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          aria-label="Back to top"
        >↑</button>
      )}
    </BrowserRouter>
  );
}
