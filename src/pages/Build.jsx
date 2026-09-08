import { PageIntro } from '../components/PageIntro.jsx';
import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';
const EMAIL = 'dp@dgpugliese.dev';

export default function Build() {
  useSeo({
    title: 'Build Services · dgpugliese.dev',
    description:
      'Fixed-price product builds in 4–8 weeks. Privacy-minded internal tools, compliance products, and B2B web apps. Concept to shipped, by one experienced builder.',
    path: '/build',
    image: 'https://dgpugliese.dev/build-og-v2.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          '@id': 'https://dgpugliese.dev/build#service',
          name: 'David Pugliese — Fixed-Price Product Builds',
          description:
            'Fixed-price product builds in 4–8 weeks. Privacy-minded internal tools, compliance products, and B2B web apps. Concept to shipped, by one experienced builder.',
          url: 'https://dgpugliese.dev/build',
          image: 'https://dgpugliese.dev/build-og-v2.png',
          email: 'dp@dgpugliese.dev',
          areaServed: { '@type': 'Country', name: 'United States' },
          provider: {
            '@type': 'Person',
            name: 'David Pugliese',
            url: 'https://dgpugliese.dev/',
          },
          serviceType: 'Custom software development',
          offers: [
            {
              '@type': 'Offer',
              name: 'Starter build',
              description:
                'One focused product: a main feature set, authentication, database, deployment, and documentation. 3–4 weeks.',
              priceCurrency: 'USD',
              price: '12000',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '12000',
                priceCurrency: 'USD',
                valueAddedTaxIncluded: false,
                minPrice: '12000',
              },
            },
            {
              '@type': 'Offer',
              name: 'Standard build',
              description:
                'A real product: multiple features, billing where needed, integrations with existing systems, polish. 6–8 weeks.',
              priceCurrency: 'USD',
              price: '25000',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '25000',
                priceCurrency: 'USD',
                valueAddedTaxIncluded: false,
                minPrice: '25000',
              },
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://dgpugliese.dev/build#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What if I want to cancel mid-build?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'You can, anytime. The deposit is non-refundable; you owe nothing further. You keep whatever has been built and deployed up to that point.',
              },
            },
            {
              '@type': 'Question',
              name: 'What if the scope changes mid-project?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'Scope changes are re-quoted in writing before any new work begins. You approve the new quote, or we ship the original scope as agreed. No surprise invoices.',
              },
            },
            {
              '@type': 'Question',
              name: 'What tech stack do you build with?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'A modern, production-ready stack by default: Next.js with TypeScript, Postgres via Supabase, Stripe for payments, and Cloudflare or Vercel for deployment. Custom stacks discussed during scoping.',
              },
            },
            {
              '@type': 'Question',
              name: 'Do you handle design?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'Functional design — clean, usable, professional interfaces — is included. For brand-level visual design, I work with a designer or use yours.',
              },
            },
            {
              '@type': 'Question',
              name: 'Will you sign an NDA?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. A mutual NDA is available before the scoping call if your project requires it.',
              },
            },
            {
              '@type': 'Question',
              name: 'Who owns the code?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'You do, fully, on final payment. The repository, the deployment credentials, the documentation — all yours. No licensing tricks, no held-back components, no per-seat fees.',
              },
            },
            {
              '@type': 'Question',
              name: 'What happens after the 30-day support window?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'Bug fixes are covered for free during the 30-day window. After that, monthly retainers for ongoing work or hourly engagements for one-off changes are available on request.',
              },
            },
            {
              '@type': 'Question',
              name: 'Where are you based?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'United States. I work remotely with clients anywhere in the U.S.',
              },
            },
          ],
        },
      ],
    },
  });

  return (
    <>
      <Nav />
      <main className="editorial-page build-page" id="main-content">
        <PageIntro label="Hire Me · Build services" title="Your next product." accent="Built to run." aside={<div className="build-availability"><span className="mono">Accepting work</span><p>One builder.<br />From first conversation<br />to production.</p><a href={`mailto:${EMAIL}`}>{EMAIL} ↗</a></div>}>
          <p>I build the product you've been quoting at <Cyan>$80k</Cyan> from agencies — in <Cyan>4–8 weeks</Cyan>, fixed price. For founders, nonprofits, and small organizations that need working software.</p>
          <div className="hero-actions"><a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">Book a free scoping call ↗</a><a className="hero-secondary" href="#builds">Explore recent builds ↓</a></div>
        </PageIntro>

        {/* The offer */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">The offer</h2>
            <span className="sect-sub">what you get</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            <Tile label="Fixed scope · fixed price" body="No hourly billing. No surprise invoices. You know the number before the work starts." c="cyan" />
            <Tile label="4–8 weeks · concept to shipped" body="Weekly demos every Friday. You see real progress — not status reports." c="green" />
            <Tile label="50% deposit · 50% on delivery" body="Deposit secures your build slot. Non-refundable if you cancel — fair to both of us." c="amber" />
          </div>
        </section>

        {/* What I build best */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">What I build best</h2>
            <span className="sect-sub">the niche</span>
          </div>
          <p style={P}>
            Products where doing it right matters — where <Cyan>"ship fast"</Cyan> and <Cyan>"don't leak data"</Cyan> both
            have to be true.
          </p>
          <ul style={UL}>
            <li><Cyan>Compliance dashboards and reporting tools</Cyan> — for nonprofits, associations, and regulated organizations</li>
            <li><Cyan>Internal tools handling sensitive data</Cyan> — member portals, case management, financial workflows</li>
            <li><Cyan>Privacy- and security-forward web apps</Cyan> — consumer or B2B, built with the right defaults from day one</li>
            <li><Cyan>Replacements for spreadsheets-that-became-a-business</Cyan> — when the workflow outgrew Excel and you need real software</li>
          </ul>
          <p style={P}>
            <Dim>Have something adjacent? Book a scoping call — I take on general MVP work when the fit is right.</Dim>
          </p>
        </section>

        {/* How it works */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">How it works</h2>
            <span className="sect-sub">the process</span>
          </div>
          <div className="process-grid">
          <Step title="Scoping call · free, 30 minutes">
            We talk through what you want, what success looks like, and whether I'm the right builder for it. No pressure, no
            sales pitch. If we're not a fit, I'll often know someone who is.
          </Step>
          <Step title="Proposal + contract · within 48 hours">
            Fixed scope, fixed price, fixed timeline — delivered in writing. You sign, you pay 50%, and your build slot is locked.
          </Step>
          <Step title="Build · 4–8 weeks">
            Weekly demos every Friday. You see real software growing week by week. Scope changes get re-quoted in writing before
            any work happens — no creep, no surprises.
          </Step>
          <Step title="Delivery + handoff">
            Final 50% on delivery. You get the code, the deployment, the documentation, and 30 days of bug-fix support included.
          </Step>
          </div>
        </section>

        {/* Recent builds */}
        <section className="sect" id="builds">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">Recent builds</h2>
            <span className="sect-sub">proof of work</span>
          </div>
          <div className="work-list">
            <BuildRow
              name="Compliance Dashboard"
              tagline="IRS 990 compliance dashboard for a distributed nonprofit affiliate set"
              replaces="an annual scramble through spreadsheets to confirm filing status across dozens of entities"
              does="aggregates five sources (ProPublica, IRS e-Postcard, Auto-Revocation List, TEOS, Salesforce/Fonteva), nightly refresh, audit-packet export"
              stack="Supabase + Edge Functions + GH Actions · in production"
              href="/compliance"
              live={null}
            />
            <BuildRow
              name="Obscura"
              tagline="Zero-knowledge file transfer"
              replaces="WeTransfer, Dropbox links, Google Drive — anywhere the host can read your file"
              does="browser-side AES-256-GCM; server only ever sees ciphertext, the key never leaves the recipient's URL fragment"
              stack="Cloudflare Workers + R2 + KV · Web Crypto · Argon2id"
              href="/obscura"
              live="https://obscr.app/"
            />
            <BuildRow
              name="SilentBeat"
              tagline="Honest dead man's switch"
              replaces={'"zero-knowledge" dead-man\'s switches that quietly hold the encryption key on their server'}
              does="split-key delivery — the AES key is split between server and recipient; the full key never exists on a server"
              stack="Cloudflare Workers · Durable Objects · D1 · ECIES + Argon2id"
              href="/silentbeat"
              live="https://silentbeat.app/"
            />
          </div>
          <p style={{ ...P, marginTop: 20, marginBottom: 0 }}>
            <Dim>More projects on </Dim>
            <Link to="/" style={LINK}>dgpugliese.dev</Link>
          </p>
        </section>

        {/* Pricing */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">Pricing</h2>
            <span className="sect-sub">what it costs</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            <Tier
              name="Starter build"
              price="from $12,000"
              duration="3–4 weeks"
              body="One focused product. A main feature set, authentication, database, deployment, and documentation. The right size for a tightly scoped MVP or a single internal tool."
              c="green"
            />
            <Tier
              name="Standard build"
              price="from $25,000"
              duration="6–8 weeks"
              body="A real product. Multiple features, billing where needed, integrations with your existing systems, polish. The right size for software you intend to actually run a business on."
              c="cyan"
            />
          </div>
          <p style={{ ...P, marginTop: 24 }}>
            <Cyan>Larger or unusual scopes</Cyan> — quoted after the scoping call.
          </p>
          <p style={P}>
            All builds include: fixed scope and price, weekly demos, full code ownership transferred to you on final payment, and
            <Cyan> 30 days of bug-fix support</Cyan> after delivery.
          </p>
        </section>

        {/* About */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">About</h2>
            <span className="sect-sub">who's building this</span>
          </div>
          <p style={P}>
            I'm <Cyan>David Pugliese</Cyan>. By day, I run engineering leadership for distributed organizations, building and
            operating infrastructure, security, and software. On contract, I take on build work for clients
            who need real software shipped without the agency markup.
          </p>
          <p style={P}>
            I've shipped privacy tools, compliance software, and internal systems for real organizations with real constraints. I
            build things I'd be willing to put my name on — because I do.
          </p>
          <p style={P}>
            <Link to="/" style={LINK}>See the rest of my work →</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="sect">
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">Frequently asked</h2>
            <span className="sect-sub">the answers</span>
          </div>
          <Faq q="What if I want to cancel mid-build?">
            You can, anytime. The deposit is non-refundable; you owe nothing further. You keep whatever's been built and deployed
            up to that point.
          </Faq>
          <Faq q="What if the scope changes mid-project?">
            Re-quoted in writing before any new work begins. You approve the new quote, or we ship the original scope as agreed.
            No surprise invoices.
          </Faq>
          <Faq q="What tech stack do you build with?">
            I default to a modern, production-ready stack: <Cyan>Next.js with TypeScript</Cyan>, <Cyan>Postgres</Cyan> (via Supabase),
            <Cyan> Stripe</Cyan> for payments, and <Cyan>Cloudflare</Cyan> or <Cyan>Vercel</Cyan> for deployment. If you have an
            existing system or strong preferences, we discuss in scoping.
          </Faq>
          <Faq q="Do you handle design?">
            I handle functional design — clean, usable, professional interfaces. For brand-level visual design, I work with a
            designer or use yours.
          </Faq>
          <Faq q="Will you sign an NDA?">
            Yes. I'll send a mutual NDA before the scoping call if your project needs it — just ask.
          </Faq>
          <Faq q="Who owns the code?">
            You do, fully, on final payment. No licensing tricks, no held-back components, no per-seat fees. The repository, the
            deployment credentials, the documentation — all yours.
          </Faq>
          <Faq q="What happens after the 30-day support window?">
            Bug fixes covered for free during that window. After that, I offer monthly retainers for ongoing work and updates, or
            hourly engagements for one-off changes. Quoted on request.
          </Faq>
          <Faq q="Where are you based?">
            United States. I work remotely with clients anywhere in the U.S.
          </Faq>
        </section>

        {/* Closing CTA — same plain treatment as Home's Contact */}
        <section className="sect" id="contact" style={{ paddingBottom: 40 }}>
          <div className="sect-head">
            <span className="sect-mark" />
            <h2 className="sect-title">Contact</h2>
          </div>
          <div className="contact-block">
            <h2>Have a product in mind?</h2>
            <p>
              Book a free 30-minute scoping call. We'll figure out together whether it's the right fit — no pressure, no sales pitch.
            </p>
            <div className="contact-actions">
              <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">Book a scoping call →</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/* ─────────────────────── helpers ─────────────────────── */

const P = { fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', margin: '0 0 16px' };
const UL = { fontSize: 15, lineHeight: 1.85, color: 'var(--fg-dim)', paddingLeft: 22, margin: '0 0 16px', listStyle: '"▸  "' };
const LINK = { color: 'var(--cyan)', textDecoration: 'underline' };

function Cyan({ children }) { return <span style={{ color: 'var(--cyan)' }}>{children}</span>; }
function Dim({ children }) { return <span style={{ color: 'var(--fg-faint)', fontStyle: 'italic' }}>{children}</span>; }

function Tile({ label, body, c }) {
  return (
    <div className="offer-card">
      <div className="mono" style={{ fontSize: 10, color: `var(--${c})`, letterSpacing: '0.14em', marginBottom: 10, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function Step({ title, children }) {
  return (
    <div className="process-card">
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function BuildRow({ name, tagline, replaces, does, stack, href, live }) {
  return (
    <div className="work-row" style={{ gridTemplateColumns: '1fr auto' }}>
      <div>
        <Link to={href} style={{ textDecoration: 'none' }}>
          <h3 className="work-title">{name}</h3>
        </Link>
        <p className="work-desc" style={{ marginBottom: 8 }}>{tagline}</p>
        <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.6 }}>
          <div><span style={{ color: 'var(--fg-faint)' }}>Replaces: </span>{replaces}</div>
          <div style={{ marginTop: 4 }}><span style={{ color: 'var(--fg-faint)' }}>Does: </span>{does}</div>
          <div style={{ marginTop: 4 }}><span style={{ color: 'var(--fg-faint)' }}>Stack: </span>{stack}</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
          <Link to={href} className="hero-secondary">Case study →</Link>
          {live && <a href={live} target="_blank" rel="noreferrer" className="hero-secondary">Live →</a>}
        </div>
      </div>
      <Link to={href} className="work-arrow" style={{ textDecoration: 'none' }}>↗</Link>
    </div>
  );
}

function Tier({ name, price, duration, body, c }) {
  return (
    <div className="pricing-card">
      <div className="mono" style={{ fontSize: 10, color: `var(--${c})`, letterSpacing: '0.16em', marginBottom: 8, textTransform: 'uppercase' }}>{name}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{price}</div>
      <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)', marginTop: 4, marginBottom: 14 }}>{duration}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

function Faq({ q, children }) {
  return (
    <details className="faq-item">
      <summary>{q}<span aria-hidden="true">+</span></summary>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{children}</div>
    </details>
  );
}
