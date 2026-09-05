import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function NotFound() {
  useSeo({
    title: 'Not found · dgpugliese.dev',
    description: 'That page does not exist, moved, or never shipped.',
    path: '/404',
  });

  return (
    <>
      <Nav />
      <main>
        <div className="notfound">
          <span className="notfound-code mono">ERROR 404</span>
          <h1>Off the map.</h1>
          <p>The page you're looking for doesn't exist, moved, or never made it past deployment.</p>
          <div className="notfound-links">
            <Link to="/">Home — the headline, the work, the conversation</Link>
            <Link to="/experience">Experience — the roles and what shipped</Link>
            <Link to="/build">Build — fixed-price product builds</Link>
            <Link to="/log">Writing — field notes and build logs</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
