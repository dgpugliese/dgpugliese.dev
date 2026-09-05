import { Link, useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

// ─── Individual Post Page ──────────────────────────────────────────────────
export function LogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useSeo(post ? {
    title: `${post.title} · Signal Log · dgpugliese.dev`,
    description: post.summary,
    path: `/log/${post.slug}`,
    image: 'https://dgpugliese.dev/og.svg',
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
    title: 'Not found · Signal Log · dgpugliese.dev',
    description: 'Transmission not found.',
    path: `/log/${slug || ''}`,
  });

  if (!post) {
    return (
      <div className="log-shell">
        <Nav />
        <div style={{ padding: '80px 60px', maxWidth: 860, margin: '0 auto' }}>
          <Link to="/log" className="log-back">← SIGNAL_LOG</Link>
          <div className="panel panel-corners" style={{ padding: '48px', marginTop: 32, textAlign: 'center' }}>
            <span className="panel-label">404</span>
            <div className="mono" style={{ color: 'var(--amber)', fontSize: 14, marginTop: 16 }}>// transmission not found</div>
            <p style={{ color: 'var(--fg-dim)', marginTop: 16 }}>
              No post at <code style={{ color: 'var(--cyan)' }}>/log/{slug}</code>.
              It may have moved or never existed.
            </p>
            <Link to="/log" className="btn" style={{ marginTop: 24, display: 'inline-flex' }}>→ RETURN TO LOG</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="log-shell">
      <Nav />
      <div style={{ padding: '60px 60px 120px', maxWidth: 860, margin: '0 auto' }}>
        {/* Back nav */}
        <Link to="/log" className="log-back">← SIGNAL_LOG</Link>

        {/* Post header */}
        <div className="panel panel-corners" style={{ padding: '36px 40px', marginTop: 28 }}>
          <span className="panel-label">TRANSMISSION</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
            <span className={`chip chip-${post.categoryColor}`}>● {post.category}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>{post.date}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.08em' }}>// {post.readTime} read</span>
          </div>
          <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {post.title}
          </h1>
          <p style={{ margin: 0, fontSize: 16, color: 'var(--fg-dim)', lineHeight: 1.7, borderLeft: '2px solid var(--cyan)', paddingLeft: 16 }}>
            {post.summary}
          </p>
        </div>

        {/* Post body */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {post.body.map((section, i) => (
            <div key={i} className="panel" style={{ padding: '28px 32px' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--cyan)', letterSpacing: '0.2em', marginBottom: 10, opacity: 0.7 }}>
                // {String(i + 1).padStart(2, '0')}
              </div>
              <h2 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 600, color: 'var(--fg)' }}>
                {section.heading}
              </h2>
              <p style={{ margin: 0, fontSize: 15, color: 'var(--fg-dim)', lineHeight: 1.75 }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA panel */}
        {post.cta && (
          <div className="panel panel-corners" style={{ marginTop: 32, padding: '32px 36px', textAlign: 'center' }}>
            <span className="panel-label">CTA</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>◆ {post.cta.label || 'NEXT'} ◆</div>
            <p style={{ fontSize: 16, color: 'var(--fg-dim)', maxWidth: 560, margin: '0 auto 22px', lineHeight: 1.6 }}>
              {post.cta.text}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, borderTop: '1px dashed var(--line)', paddingTop: 24 }}>
          <Link to="/log" className="btn btn-ghost">← ALL POSTS</Link>
          <Link to="/" className="btn btn-ghost">↩ HOME</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── Log Index Page ────────────────────────────────────────────────────────
export default function Log() {
  useSeo({
    title: 'Signal Log · dgpugliese.dev',
    description:
      'Notes from the field on AI agent infrastructure, zero-knowledge crypto, NIST 800-53 / SOC 2 compliance, and shipping platforms end-to-end.',
    path: '/log',
    image: 'https://dgpugliese.dev/og.svg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Signal Log',
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
  const categories = ['ALL', ...Array.from(new Set(posts.map(p => p.category)))];

  return (
    <div className="log-shell">
      <Nav />

      <div style={{ padding: '80px 60px 120px', maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div className="sect-head" style={{ marginBottom: 40 }}>
          <span className="sect-num">// </span>
          <h1 style={{ margin: 0, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--fg)' }}>
            Signal Log
          </h1>
          <span className="sect-sub">{posts.length} transmissions</span>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          {categories.map(cat => (
            <span key={cat} className={cat === 'ALL' ? 'chip chip-cyan' : 'chip'} style={{ cursor: 'default' }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Post list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              to={`/log/${p.slug}`}
              className="panel panel-corners log-card"
              style={{ display: 'block', padding: '28px 32px', textDecoration: 'none', color: 'inherit' }}
            >
              <span className="panel-label">TX_{String(i + 1).padStart(2, '0')}</span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <span className={`chip chip-${p.categoryColor}`}>● {p.category}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.12em' }}>{p.date}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)' }}>// {p.readTime}</span>
              </div>
              <h2 style={{ margin: '0 0 10px', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)' }}>
                {p.title} <span style={{ color: 'var(--cyan)', fontSize: 15 }}>↗</span>
              </h2>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>
                {p.summary}
              </p>
            </Link>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
}
