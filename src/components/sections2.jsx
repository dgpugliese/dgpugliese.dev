import { Link } from 'react-router-dom';
import { channels } from '../data/channels.js';

export function Contact() {
  return (
    <section className="sect" id="contact" style={{ paddingBottom: 40 }}>
      <div className="sect-head">
        <span className="sect-mark" />
        <h2 className="sect-title">Contact</h2>
      </div>
      <div className="contact-invitation">
        <h2><a href="mailto:dp@dgpugliese.dev">Let's talk<span className="hero-period">.</span><span className="invitation-arrow" aria-hidden="true">↗</span></a></h2>
        <div className="contact-context">
          <p>Have a hard problem?<br />Let's build the answer.</p>
          <p>Recruiters, engineers, fractional advisory, and build clients — all welcome.</p>
        </div>
      </div>
      <div className="contact-details">
        <div className="contact-direct">
          {channels.map(channel => (
            <div key={channel.key}>
              <span className="contact-label mono">{channel.label}</span>
              {channel.href ? <a href={channel.href}>{channel.value}</a> : <span>{channel.value}</span>}
            </div>
          ))}
        </div>
        <div className="contact-resources">
          <Link to="/build">Build services <span aria-hidden="true">↗</span></Link>
          <a href="https://davidguypugliese.com" target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <p className="contact-response mono">Best response window: weekday mornings ET</p>
    </section>
  );
}
