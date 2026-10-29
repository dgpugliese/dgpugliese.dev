import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App.jsx';

// Used only at build time by scripts/postbuild-seo.mjs to bake each route's
// markup into its HTML file; the browser then hydrates it (see main.jsx).
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
}
