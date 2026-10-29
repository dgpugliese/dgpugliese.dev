import { ContributionRail } from './ContributionRail.jsx';
import { Highlight } from './Highlight.jsx';
import { TerminalAtmosphere } from './TerminalAtmosphere.jsx';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';

export function Hero() {
  return (
    <section className="hero hero-poster">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-copy">
        <div className="hero-eyebrow">IT Director · Solutions Architect · MSP Founder</div>
        <h1>I build systems<br /><span className="hero-outline">end to end<span className="hero-period">.</span></span></h1>
        <div className="hero-row">
          <div>
            <p className="hero-statement">The ones vendors quote <Highlight>six figures</Highlight> for.</p>
            <p className="hero-sub">16+ years across enterprise infrastructure, security, and software. From the architecture to the last line of code.</p>
            <div className="hero-actions hero-text-actions"><a className="hero-cta" href={CAL_URL} target="_blank" rel="noreferrer">Book a 30-min call <span aria-hidden="true">→</span></a><a className="hero-secondary" href="#work">Explore the work ↓</a></div>
            <ContributionRail />
          </div>
          <TerminalAtmosphere />
        </div>
      </div>
      <div className="hero-bottom"><span className="mono">I ship in production, not slides.</span><a href="#work" className="mono">Explore selected work ↓</a></div>
    </section>
  );
}
