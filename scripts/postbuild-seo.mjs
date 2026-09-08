#!/usr/bin/env node
/**
 * Postbuild: emit per-route HTML files with per-route OG/meta tags baked in,
 * so social-media scrapers (which don't run JS) see the right preview image
 * and description for each page.
 *
 * Reads dist/index.html, clones it per route, and rewrites the meta tags.
 * The SPA still mounts as normal from each cloned file — React Router takes
 * over once main.jsx executes.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const SITE = 'https://dgpugliese.dev';

const { posts } = await import(pathToFileURL(join(__dirname, '..', 'src', 'data', 'posts.js')).href);

const blogRoutes = posts.map(p => ({
  path: `/log/${p.slug}`,
  title: `${p.title} · Writing · dgpugliese.dev`,
  description: p.summary,
  image: `${SITE}/og-v2.png`,
}));

const routes = [
  {
    path: '/experience',
    title: 'Experience · dgpugliese.dev',
    description:
      '16+ years across enterprise IT, MSP leadership, and network engineering — the roles, what shipped, and the outcome each one left behind.',
    image: `${SITE}/og-v2.png`,
  },
  {
    path: '/uses',
    title: 'Uses · dgpugliese.dev',
    description:
      'The stack David Pugliese reaches for across identity, cloud, infrastructure, security, and engineering — plus verified certifications.',
    image: `${SITE}/og-v2.png`,
  },
  {
    path: '/log',
    title: 'Writing · dgpugliese.dev',
    description:
      'Notes from the field on AI agent infrastructure, zero-knowledge crypto, NIST 800-53 / SOC 2 compliance, and shipping platforms end-to-end.',
    image: `${SITE}/og-v2.png`,
  },
  {
    path: '/build',
    title: 'Build Services · dgpugliese.dev',
    description:
      'Fixed-price product builds in 4–8 weeks. Privacy-minded internal tools, compliance products, and B2B web apps. Concept to shipped, by one experienced builder.',
    image: `${SITE}/build-og-v2.png`,
  },
  {
    path: '/obscura',
    title: 'Obscura · Zero-Knowledge File Transfer — Case Study · dgpugliese.dev',
    description:
      'Case study: Obscura, a browser-side zero-knowledge file transfer tool. AES-256-GCM, Argon2id, Web Crypto API. The server only ever sees ciphertext.',
    image: `${SITE}/og-v2.png`,
  },
  {
    path: '/silentbeat',
    title: "SilentBeat · Honest Dead Man's Switch — Case Study · dgpugliese.dev",
    description:
      "Case study: SilentBeat, a zero-knowledge dead man's switch dispatcher built on Cloudflare Workers, Durable Objects, D1, split-key ECIES, and Argon2id.",
    image: `${SITE}/og-v2.png`,
  },
  {
    path: '/dorothy',
    title: 'DOROTHY · Salesforce Monitoring Bot — Case Study · dgpugliese.dev',
    description:
      'Case study: DOROTHY, a zero-dependency Salesforce/Fonteva monitoring bot that emails a daily storm forecast. Python stdlib, GitHub Actions, an LLM analyst layer, and a design rule that silence itself is an alarm.',
    image: `${SITE}/dorothy-og-v2.png`,
  },
  {
    path: '/compliance',
    title: 'Compliance Dashboard · Case Study · dgpugliese.dev',
    description:
      'Case study: compliance operations dashboard for IRS Form 990 oversight across a distributed nonprofit network. GitHub Actions cron, in production.',
    image: `${SITE}/og-v2.png`,
  },
];

function replaceMeta(html, { title, description, image, url }) {
  let out = html;
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = out.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`
  );
  out = out.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`
  );
  out = out.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );
  out = out.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`
  );
  out = out.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`
  );
  out = out.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${image}" />`
  );
  out = out.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`
  );
  out = out.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`
  );
  out = out.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${image}" />`
  );
  return out;
}

const allRoutes = [...routes, ...blogRoutes];

const indexHtml = await readFile(join(distDir, 'index.html'), 'utf8');

for (const route of allRoutes) {
  const url = `${SITE}${route.path}`;
  const html = replaceMeta(indexHtml, { ...route, url });
  const outDir = join(distDir, route.path.replace(/^\//, ''));
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, 'index.html'), html);
  console.log(`  → ${route.path}/index.html`);
}

console.log(`✓ Emitted ${allRoutes.length} per-route HTML files`);
