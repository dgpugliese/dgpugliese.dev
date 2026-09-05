import { Link } from 'react-router-dom';
import { channels } from '../data/channels.js';

export function Contact() {
  return (
    <section className="sect" id="contact" style={{ paddingBottom: 40 }}>
      <div className="sect-head">
        <span className="sect-num">// </span>
        <h2 className="sect-title">Contact</h2>
      </div>
      <div className="contact-block">
        <h2>Let's build something fast and reliable.</h2>
        <p>
          Recruiters, engineers, fractional advisory, and build clients — all welcome. Best
          response window: weekday mornings ET.
        </p>
        <div className="contact-actions">
          <a className="btn" href="mailto:dp@dgpugliese.dev">dp@dgpugliese.dev</a>
          <Link className="btn btn-ghost" to="/build">Build services</Link>
          <a className="btn btn-ghost" href="https://davidguypugliese.com" target="_blank" rel="noreferrer">Resume ↗</a>
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 460 }}>
          {channels.map(c => (
            <div key={c.key} className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 12, padding: '8px 0', borderTop: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--fg-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.label}</span>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ color: c.pending ? 'var(--amber)' : 'var(--cyan)', textDecoration: 'none' }}>
                  {c.value}
                </a>
              ) : (
                <span style={{ color: 'var(--cyan)' }}>{c.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
