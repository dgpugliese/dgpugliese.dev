import { Link } from 'react-router-dom';
import { Starfield, Clock } from '../components/fx.jsx';
import { useSeo } from '../lib/seo';

const CAL_URL = 'https://cal.com/dgpugliese.dev/build-scoping';
const EMAIL = 'dp@dgpugliese.dev';

export default function Build() {
  useSeo({
    title: 'Build Services · dgpugliese.dev',
    description:
      'Fixed-price product builds in 4–8 weeks. Privacy-minded internal tools, compliance products, and B2B web apps. Concept to shipped, by one experienced builder.',
    path: '/build',
    image: 'https://dgpugliese.dev/build-og.png',
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
          image: 'https://dgpugliese.dev/build-og.png',
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
      <Starfield />
      <div className="grid-bg" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="scanline" />

      <div className="statusbar">
        <span><span className="dot">●</span> ONLINE</span>
        <span className="sep">/</span>
        <span>SYS / DGPUGLIESE.DEV / BUILD</span>
        <div className="right">
          <span><Clock /></span>
          <span style={{ color: 'var(--green)' }}>● ACCEPTING WORK</span>
        </div>
      </div>

      <main style={{ marginLeft: 0, marginTop: 36, position: 'relative', zIndex: 10 }}>
        <article className="case-study" style={{ maxWidth: 980, margin: '0 auto', padding: '60px 32px 120px' }}>

          {/* Back nav */}
          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
          <div className="panel panel-corners" style={{ padding: '40px 44px', marginBottom: 32 }}>
            <span className="panel-label">BUILD · CONCEPT TO SHIPPED</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ◢ CONCEPT TO SHIPPED ◣
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 92px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
              BUILD<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <p style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--fg)', margin: '20px 0 8px', maxWidth: 760 }}>
              I build the product you've been quoting at <Cyan>$80k</Cyan> from agencies — in <Cyan>4–8 weeks</Cyan>, fixed price.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-dim)', margin: '0 0 24px', maxWidth: 720 }}>
              For founders, nonprofits, and small organizations that need working software — not a Gantt chart.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
              <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">→ BOOK A FREE 30-MIN SCOPING CALL</a>
              <a className="btn btn-ghost" href="#builds">↓ SEE RECENT BUILDS</a>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> ACCEPTING WORK</span>
              <span>U.S. CLIENTS</span>
              <span style={{ color: 'var(--cyan)' }}>{EMAIL}</span>
            </div>
          </div>

          {/* 01 — The offer */}
          <Section num="01" title="The offer" sub="what you get">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginTop: 4 }}>
              <Tile label="FIXED SCOPE · FIXED PRICE" body="No hourly billing. No surprise invoices. You know the number before the work starts." c="cyan" />
              <Tile label="4–8 WEEKS · CONCEPT TO SHIPPED" body="Weekly demos every Friday. You see real progress — not status reports." c="green" />
              <Tile label="50% DEPOSIT · 50% ON DELIVERY" body="Deposit secures your build slot. Non-refundable if you cancel — fair to both of us." c="yellow" />
            </div>
          </Section>

          {/* 02 — What I build best */}
          <Section num="02" title="What I build best" sub="the niche">
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
          </Section>

          {/* 03 — How it works */}
          <Section num="03" title="How it works" sub="the process">
            <Step num="1" title="Scoping call · free, 30 minutes">
              We talk through what you want, what success looks like, and whether I'm the right builder for it. No pressure, no
              sales pitch. If we're not a fit, I'll often know someone who is.
            </Step>
            <Step num="2" title="Proposal + contract · within 48 hours">
              Fixed scope, fixed price, fixed timeline — delivered in writing. You sign, you pay 50%, and your build slot is locked.
            </Step>
            <Step num="3" title="Build · 4–8 weeks">
              Weekly demos every Friday. You see real software growing week by week. Scope changes get re-quoted in writing before
              any work happens — no creep, no surprises.
            </Step>
            <Step num="4" title="Delivery + handoff">
              Final 50% on delivery. You get the code, the deployment, the documentation, and 30 days of bug-fix support included.
            </Step>
          </Section>

          {/* 04 — Recent builds */}
          <div id="builds" />
          <Section num="04" title="Recent builds" sub="proof of work">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              <BuildCard
                name="Compliance Dashboard"
                tagline="IRS 990 compliance dashboard for a distributed nonprofit affiliate set"
                replaces="an annual scramble through spreadsheets to confirm filing status across dozens of entities"
                does="aggregates five sources (ProPublica, IRS e-Postcard, Auto-Revocation List, TEOS, Salesforce/Fonteva), nightly refresh, audit-packet export"
                stack="Supabase + Edge Functions + GH Actions · in production"
                href="/compliance"
                live={null}
              />
              <BuildCard
                name="Obscura"
                tagline="Zero-knowledge file transfer"
                replaces="WeTransfer, Dropbox links, Google Drive — anywhere the host can read your file"
                does="browser-side AES-256-GCM; server only ever sees ciphertext, the key never leaves the recipient's URL fragment"
                stack="Cloudflare Workers + R2 + KV · Web Crypto · Argon2id"
                href="/obscura"
                live="https://obscr.app/"
              />
              <BuildCard
                name="SilentBeat"
                tagline="Honest dead man's switch"
                replaces={'"zero-knowledge" dead-man\'s switches that quietly hold the encryption key on their server'}
                does="split-key delivery — the AES key is split between server and recipient; the full key never exists on a server"
                stack="Cloudflare Workers · Durable Objects · D1 · ECIES + Argon2id"
                href="/silentbeat"
                live="https://silentbeat.app/"
              />
            </div>
            <p style={{ ...P, marginTop: 18, marginBottom: 0 }}>
              <Dim>More projects on </Dim>
              <Link to="/" style={LINK}>dgpugliese.dev</Link>
              <Dim> →</Dim>
            </p>
          </Section>

          {/* 05 — Pricing */}
          <Section num="05" title="Pricing" sub="what it costs">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
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
            <p style={{ ...P, marginTop: 18 }}>
              <Cyan>Larger or unusual scopes</Cyan> — quoted after the scoping call.
            </p>
            <p style={P}>
              All builds include: fixed scope and price, weekly demos, full code ownership transferred to you on final payment, and
              <Cyan> 30 days of bug-fix support</Cyan> after delivery.
            </p>
          </Section>

          {/* 06 — About */}
            <Section num="06" title="About" sub="who's building this">
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
          </Section>

          {/* 07 — FAQ */}
          <Section num="07" title="Frequently asked" sub="the answers">
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
          </Section>

          {/* CTA bottom */}
          <div className="panel panel-corners" style={{ padding: '36px 36px', textAlign: 'center', marginTop: 12 }}>
            <span className="panel-label">END_OF_TRANSMISSION</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 16 }}>◆ HAVE A PRODUCT IN MIND? ◆</div>
            <p style={{ fontSize: 16, color: 'var(--fg-dim)', maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Book a free 30-minute scoping call. We'll figure out together whether it's the right fit — no pressure, no sales pitch.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn" href={CAL_URL} target="_blank" rel="noreferrer">→ BOOK A SCOPING CALL</a>
              <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>✉ {EMAIL}</a>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.18em', marginTop: 24 }}>
              DAVID PUGLIESE · © 2026
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

/* ─────────────────────── helpers ─────────────────────── */

const P = { fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', margin: '0 0 16px' };
const UL = { fontSize: 15, lineHeight: 1.85, color: 'var(--fg-dim)', paddingLeft: 22, margin: '0 0 16px', listStyle: '"▸  "' };
const LINK = { color: 'var(--cyan)', textDecoration: 'underline' };

function Cyan({ children }) { return <span style={{ color: 'var(--cyan)' }}>{children}</span>; }
function Dim({ children }) { return <span style={{ color: 'var(--fg-faint)', fontStyle: 'italic' }}>{children}</span>; }

function Section({ num, title, sub, children }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div className="sect-head">
        <span className="sect-num">{num} //</span>
        <h2 className="sect-title">{title}</h2>
        <span className="sect-sub">{sub}</span>
      </div>
      <div className="panel panel-corners" style={{ padding: '28px 32px' }}>
        <span className="panel-label">{num}_{title.toUpperCase().replace(/[^A-Z]+/g, '_').replace(/^_|_$/g, '')}</span>
        {children}
      </div>
    </section>
  );
}

function Tile({ label, body, c }) {
  return (
    <div className="panel" style={{ padding: '18px 20px', borderLeft: `2px solid var(--${c})` }}>
      <div className="mono" style={{ fontSize: 10, color: `var(--${c})`, letterSpacing: '0.18em', marginBottom: 10 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function Step({ num, title, children }) {
  return (
    <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 16, marginBottom: 18 }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', marginBottom: 4 }}>// STEP {num}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}

function BuildCard({ name, tagline, replaces, does, stack, href, live }) {
  return (
    <div className="panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fg)' }}>{name}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginTop: 4 }}>{tagline}</div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.6 }}>
        <div><span style={{ color: 'var(--fg-faint)' }}>Replaces: </span>{replaces}</div>
        <div style={{ marginTop: 6 }}><span style={{ color: 'var(--fg-faint)' }}>Does: </span>{does}</div>
        <div style={{ marginTop: 6 }}><span style={{ color: 'var(--fg-faint)' }}>Stack: </span>{stack}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 'auto', flexWrap: 'wrap', paddingTop: 8 }}>
        <Link to={href} className="btn btn-ghost" style={{ textDecoration: 'none', fontSize: 11 }}>↗ CASE STUDY</Link>
        {live && <a className="btn btn-ghost" href={live} target="_blank" rel="noreferrer" style={{ fontSize: 11 }}>→ LIVE</a>}
      </div>
    </div>
  );
}

function Tier({ name, price, duration, body, c }) {
  return (
    <div className="panel" style={{ padding: '22px 24px', borderTop: `2px solid var(--${c})` }}>
      <div className="mono" style={{ fontSize: 10, color: `var(--${c})`, letterSpacing: '0.2em', marginBottom: 8 }}>{name.toUpperCase()}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em' }}>{price}</div>
      <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)', marginTop: 4, marginBottom: 14 }}>{duration}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

function Faq({ q, children }) {
  return (
    <div style={{ borderLeft: '2px solid var(--line)', paddingLeft: 14, marginBottom: 16 }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>{q}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}
