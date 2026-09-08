import { PageIntro } from '../components/PageIntro.jsx';
import { Link, useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

// ─── Individual Post Page ──────────────────────────────────────────────────
export function LogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useSeo(post ? {
    title: `${post.title} · Field Notes · dgpugliese.dev`,
    description: post.summary,
    path: `/log/${post.slug}`,
    image: 'https://dgpugliese.dev/og-v2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: 'David Pugliese', url: 'https://dgpugliese.dev/' },
      publisher: { '@type': 'Person', name: 'David Pugliese' },
      mainEntityOfPage: `https://dgpugliese.dev/log/${post.slug}`,
      articleSection: post.category,
      url: `https://dgpugliese.dev/log/${post.slug}`,
    },
  } : {
    title: 'Not found · Field Notes · dgpugliese.dev',
    description: 'Post not found.',
    path: `/log/${slug || ''}`,
  });

  if (!post) {
    return (
      <div className="log-shell">
        <Nav />
        <main className="article-page" id="main-content">
          <Link to="/log" className="log-back">← Field Notes</Link>
          <div style={{ marginTop: 32 }}>
            <span className="mono" style={{ color: 'var(--amber)', fontSize: 12, letterSpacing: '0.14em' }}>404</span>
            <h1 style={{ margin: '10px 0 14px', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Post not found
            </h1>
            <p style={{ color: 'var(--fg-dim)', fontSize: 16, lineHeight: 1.7 }}>
              No post at <code style={{ color: 'var(--cyan)' }}>/log/{slug}</code>.
              It may have moved or never existed.
            </p>
            <Link to="/log" className="btn" style={{ marginTop: 24, display: 'inline-flex' }}>← Return to Field Notes</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="log-shell">
      <Nav />
      <main className="article-page" id="main-content">
        {/* Back nav */}
        <Link to="/log" className="log-back">← Field Notes</Link>

        {/* Post header */}
        <header className="article-header">
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{post.category}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>{post.date}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)' }}>{post.readTime} read</span>
          </div>
          <h1>
            {post.title}
          </h1>
          <p style={{ margin: 0, fontSize: 17, color: 'var(--fg-dim)', lineHeight: 1.7, borderLeft: '2px solid var(--cyan)', paddingLeft: 18 }}>
            {post.summary}
          </p>
        </header>

        {/* Post body */}
        <div className="article-body">
          {post.body.map((section, i) => (
            <div key={i} style={{ padding: '28px 0', borderTop: '1px solid var(--line)' }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 600, color: 'var(--fg)' }}>
                {section.heading}
              </h2>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--fg-dim)', lineHeight: 1.75 }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        {post.cta && (
          <div style={{ marginTop: 8, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.14em', marginBottom: 12, textTransform: 'uppercase' }}>
              {post.cta.label || 'Next'}
            </div>
            <p style={{ fontSize: 16, color: 'var(--fg-dim)', maxWidth: 560, margin: '0 0 20px', lineHeight: 1.6 }}>
              {post.cta.text}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {post.cta.href.startsWith('/')
                ? <Link to={post.cta.href} className="btn" style={{ textDecoration: 'none' }}>{post.cta.button}</Link>
                : <a className="btn" href={post.cta.href} target="_blank" rel="noreferrer">{post.cta.button}</a>}
              {post.cta.secondary && (
                <a className="btn btn-ghost" href={post.cta.secondary.href}>{post.cta.secondary.button}</a>
              )}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, borderTop: '1px solid var(--line)', paddingTop: 24 }}>
          <Link to="/log" className="btn btn-ghost">← All posts</Link>
          <Link to="/" className="btn btn-ghost">Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Writing Index Page ────────────────────────────────────────────────────
export default function Log() {
  useSeo({
    title: 'Field Notes · dgpugliese.dev',
    description:
      'Notes from the field on AI agent infrastructure, zero-knowledge crypto, NIST 800-53 / SOC 2 compliance, and shipping platforms end-to-end.',
    path: '/log',
    image: 'https://dgpugliese.dev/og-v2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Field Notes',
      description: 'Engineering notes by David Pugliese.',
      url: 'https://dgpugliese.dev/log',
      author: { '@type': 'Person', name: 'David Pugliese' },
      blogPost: posts.map(p => ({
        '@type': 'BlogPosting',
        headline: p.title,
        datePublished: p.date,
        url: `https://dgpugliese.dev/log/${p.slug}`,
      })),
    },
  });

  return (
    <div className="log-shell">
      <Nav />

      <main className="editorial-page notes-page" id="main-content">
        <PageIntro label="Field Notes" title="From the field." accent="Into the details." aside={<p>Engineering notes.<br />Lessons from shipping.</p>}>
          <p>Notes on building secure software, running infrastructure, and the decisions that only get interesting in production.</p>
        </PageIntro>
        <div className="notes-grid">
          {posts.map(p => (
            <Link key={p.slug} to={`/log/${p.slug}`} className="note-card">
              <span className="log-row-meta">{p.date}</span>
              <div>
                <h2 className="work-title">{p.title}</h2>
                <p className="work-desc">{p.summary}</p>
                <div className="work-tags">
                  <span className="chip">{p.category}</span>
                  <span className="chip">{p.readTime}</span>
                </div>
              </div>
              <span className="work-arrow">↗</span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
