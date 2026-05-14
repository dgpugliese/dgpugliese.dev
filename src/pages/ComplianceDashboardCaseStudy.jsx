import { Link } from 'react-router-dom';
import { Starfield, Clock } from '../components/fx.jsx';
import { useSeo } from '../lib/seo';

export default function ComplianceDashboardCaseStudy() {
  useSeo({
    title: 'Chapter Compliance Dashboard · IRS Form 990 Tracking — Case Study · dgpugliese.dev',
    description:
      'Case study: an internal IHQ tool tracking IRS Form 990 compliance across 858 fraternity chapters. Four IRS data sources, daily refresh, $300/yr vs $246K vendor quotes.',
    path: '/compliance',
    image: 'https://dgpugliese.dev/og.svg',
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
        <span>SYS / DGPUGLIESE.DEV / CASE_STUDY · COMPLIANCE</span>
        <div className="right">
          <span><Clock /></span>
          <span style={{ color: 'var(--green)' }}>● IN-USE</span>
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
            <span className="panel-label">CASE_STUDY · COMPLIANCE</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ◢ IRS FORM 990 COMPLIANCE · 858 CHAPTERS ◣
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
              CHAPTER<br/>COMPLIANCE<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              <span style={{ color: 'var(--cyan)' }}>&gt; </span>
              858 chapters · 4 IRS data sources · refreshed nightly · $300/yr
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a className="btn" href="https://compliance.kapsi1911.com/" target="_blank" rel="noreferrer">→ LIVE · compliance.kapsi1911.com</a>
              <Link to="/log/reverse-engineering-irs-teos" className="btn btn-ghost" style={{ textDecoration: 'none' }}>↗ TEOS WRITEUP</Link>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> IN-USE</span>
              <span>INTERNAL · IHQ STAFF</span>
              <span>858 CHAPTERS</span>
              <span>3,672 FILINGS</span>
              <span>16 YEARS BACK</span>
            </div>
          </div>

          {/* TL;DR */}
          <Section num="01" title="TL;DR" sub="60-second summary">
            <p style={P}>
              An internal tool tracking <Cyan>IRS Form 990</Cyan> filing status across 858 Kappa Alpha Psi
              chapters, so IHQ can spot compliance gaps before chapters drift into auto-revocation. Live at
              <a href="https://compliance.kapsi1911.com" target="_blank" rel="noreferrer" style={LINK}> compliance.kapsi1911.com</a>{' '}
              (IHQ staff login; accounts issued manually).
            </p>
            <p style={P}>
              Aggregates <Cyan>four IRS data sources</Cyan> — ProPublica Nonprofit Explorer, the IRS e-Postcard bulk
              ZIP, the IRS Auto-Revocation List, and a custom scraper against the IRS TEOS internal JSON API
              (the only way to get historical 990-N data — the IRS doesn't publish it in bulk).
            </p>
            <p style={P}>
              Built end-to-end on free-tier infrastructure that scales for IHQ's volume: under <Cyan>$300/yr</Cyan>{' '}
              total, against vendor alternatives quoting <Cyan>$110K–$246K</Cyan>.
            </p>
          </Section>

          {/* Why */}
          <Section num="02" title="Why it exists" sub="the problem">
            <p style={P}>
              Nonprofits that fail to file IRS Form 990 (or its 990-EZ / 990-N variants) for three consecutive
              years lose their tax-exempt status automatically. Reinstatement is painful, expensive, and visible
              on the IRS Auto-Revocation List. For an org with hundreds of chapter affiliates filing under their
              own EINs, that's not a hypothetical — it's a recurring operational risk.
            </p>
            <p style={P}>
              The challenge: the data exists across at least four IRS surfaces, none of them designed for the
              "show me all my chapters' filing status" question. ProPublica covers full 990 / 990-EZ / 990-PF
              year-by-year. The IRS e-Postcard bulk ZIP covers latest 990-N per EIN (no history). The Auto-Revocation
              List covers revocations and reinstatements. Historical 990-N — the form most small chapters file —
              has <Dim>no public bulk source at all</Dim>.
            </p>
            <p style={P}>
              Vendor quotes for a managed equivalent: $110K–$246K/yr. The build for what IHQ actually needs:
              ~$300/yr, finished in weeks, on infrastructure I already understand.
            </p>
          </Section>

          {/* How it works */}
          <Section num="03" title="How it works" sub="the architecture">
            <Diagram />
            <p style={P}>The pipeline, end to end:</p>
            <ol style={OL}>
              <li><Cyan>Roster anchor</Cyan> — chapter EINs live in Supabase. The roster is the source of truth for which orgs we care about.</li>
              <li><Cyan>Four refresh paths</Cyan>, each owning a column range so they never clobber each other:
                <ul style={{ ...UL, marginTop: 8 }}>
                  <li><strong>ProPublica</strong> (Edge Function): year-by-year 990 / 990-EZ / 990-PF + PDF return URLs</li>
                  <li><strong>e-Postcard bulk ZIP</strong> (GitHub Action): latest 990-N per EIN</li>
                  <li><strong>Auto-Revocation List</strong> (GitHub Action): revocations + reinstatements, with effective dates</li>
                  <li><strong>TEOS JSON API</strong> (Node script): historical 990-N back to 2008 — the only way to get this data</li>
                </ul>
              </li>
              <li><Cyan>Upsert + audit</Cyan> — every refresh writes a row to <code style={CODE}>refresh_runs</code> with counts, status, and a JSONB details blob. Source-of-truth rules at the column level prevent overwrites.</li>
              <li><Cyan>Frontend reads from a view</Cyan> — <code style={CODE}>chapters_with_status</code> joins chapters + latest filing + IRS status into one shape, so the React app reads from a single source.</li>
              <li><Cyan>Auth</Cyan> — Supabase email/password, IHQ staff only, accounts created manually. No public signup, no email infrastructure. Phase 2 adds a <code style={CODE}>chapter_ein</code> JWT claim with RLS scoping per chapter.</li>
            </ol>
          </Section>

          {/* The TEOS Discovery */}
          <Section num="04" title="The TEOS discovery" sub="the technical wedge">
            <p style={P}>
              The interesting engineering moment was the historical 990-N problem. The IRS doesn't publish a
              bulk feed of 990-N filings year by year — only the latest one per EIN. But TEOS, the IRS's search
              UI, clearly has it: type in an EIN, get the full history.
            </p>
            <p style={P}>
              Thirty seconds in DevTools: TEOS is a thin JavaScript page that makes a single XHR to
              <code style={CODE}>apps.irs.gov/teos/details/ePostSearch/&lt;EIN&gt;</code>, gets clean JSON back,
              and renders it. No auth header. No API key. No rate limit. The IRS exposes the data; they just
              never documented it as an API.
            </p>
            <p style={P}>
              The scraper is ~30 lines of Node. No HTML parsing, no headless browser, no fragile selectors.
              The JSON shape is the surface I'm coupling to. One full pass:
              <Cyan> 3,672 filings imported across 434 chapters</Cyan>, back to 2008.{' '}
              <Link to="/log/reverse-engineering-irs-teos" style={LINK}>Full writeup on the Signal Log →</Link>
            </p>
          </Section>

          {/* Stack */}
          <Section num="05" title="The stack" sub="under the hood">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <StackPanel label="FRONTEND" items={['React 18 · Vite', 'Tailwind 3', 'Single-component prototype', 'framer-motion + lucide-react']} c="cyan" />
              <StackPanel label="DATABASE" items={['Supabase Postgres', 'RLS on every table', '`chapters_with_status` view', 'JSONB raw payloads for audit']} c="violet" />
              <StackPanel label="REFRESH" items={['Supabase Edge Functions', 'GitHub Actions cron', 'pg_cron', 'Custom TEOS scraper (Node)']} c="amber" />
              <StackPanel label="HOSTING" items={['Cloudflare Pages', 'compliance.kapsi1911.com', 'Direct-upload via Wrangler', 'Supabase Auth']} c="green" />
            </div>
          </Section>

          {/* Design Decisions */}
          <Section num="06" title="Design decisions" sub="and the reasoning">
            <Decision title="Four sources, column-level ownership"
                      body="Each refresh path owns a specific subset of columns; the others never write to those columns. revocation_date is owned by the Auto-Revocation refresh only; richer form types (990 / 990-EZ / 990-PF) are never overwritten by 990-N upserts. Keeps multi-source refreshes idempotent without a brittle priority queue." />
            <Decision title="TEOS JSON API instead of an HTML scraper"
                      body="The conventional approach to 'web-only' data is headless-browser scraping. Instead, devtools-inspect first — TEOS hands out clean JSON. Coupling to the JSON shape (which the IRS's own UI depends on) is far more durable than coupling to DOM markup the IRS could reskin tomorrow." />
            <Decision title="Audit row per refresh"
                      body="Every script run inserts a refresh_runs row with start/end time, processed/updated/error counts, and a JSONB details blob. Means I can answer 'when did this filing last sync?' or 'why did last Tuesday's refresh fail?' in seconds, without re-reading logs across three providers." />
            <Decision title="Standalone Supabase project, mergeable later"
                      body="Could have lived inside the KAPSI Connect database (same nonprofit, same Postgres). Instead it's standalone — its own Supabase project, its own roster table, its own auth. Path to merging into Connect is a `compliance` schema swap once the data model stabilizes. Optionality > premature coupling." />
            <Decision title="Manual account provisioning, no public signup"
                      body="IHQ staff only. Accounts created by hand in Supabase Auth's dashboard. Trades convenience for blast-radius reduction: no email-confirmation infrastructure to operate, no signup-spam risk, and the moment of provisioning is also the moment of access review." />
            <Decision title="One-click audit packets"
                      body="Each chapter detail page bundles every PDF return on record into a ZIP plus a manifest, exportable as a print-friendly PDF for board / legal review. The grunt-work step the existing process used to take a half-day per chapter — now 8 seconds." />
          </Section>

          {/* Trust & Phase 2 */}
          <Section num="07" title="Trust posture &amp; Phase 2" sub="what's defensible, what's next">
            <p style={P}>
              Phase 1 is IHQ-staff-only with full read/write under a single role. Trust scaffolding is the boring,
              load-bearing stuff:
            </p>
            <ul style={UL}>
              <li><Cyan>RLS on every table</Cyan> — no permissive USING(true) policies; staff role gates all reads</li>
              <li><Cyan>Audit row per refresh</Cyan>, attributed to the script + source, with counts and status</li>
              <li><Cyan>Activity log per chapter</Cyan>, attributed to auth.uid() + email — every note timestamped and authored</li>
              <li><Cyan>JSONB raw payloads</Cyan> retained on every filing row, so any data quality question is one query away</li>
            </ul>
            <p style={P}>
              <Cyan>Phase 2</Cyan> opens scoped access to chapter exchequers (treasurers): a <code style={CODE}>chapter_ein</code>{' '}
              JWT claim with RLS policies that scope <code style={CODE}>filings</code> and <code style={CODE}>irs_org_status</code>{' '}
              to a single chapter. The schema and indexes are already shaped for it; the gate is auth provisioning,
              not data model.
            </p>
          </Section>

          {/* Outcome / cost */}
          <Section num="08" title="Outcome" sub="cost, scale, what's next">
            <p style={P}>
              In use today across IHQ leadership and finance. The headline numbers:
            </p>
            <ul style={UL}>
              <li><Cyan>858 chapters</Cyan> tracked against four IRS data sources, refreshed nightly</li>
              <li><Cyan>3,672 historical filings</Cyan> imported from TEOS on the first full pass, going back to 2008</li>
              <li><Cyan>~$300/yr total infrastructure cost</Cyan>, against vendor quotes of $110K–$246K</li>
              <li><Cyan>~8 seconds</Cyan> to produce an audit packet that previously took half a day per chapter</li>
            </ul>
            <p style={P}>Punch list:</p>
            <ol style={OL}>
              <li>Promote the TEOS scraper from manual to monthly cron (currently manual)</li>
              <li>Phase 2 chapter-exchequer login with RLS</li>
              <li>Audit a data quirk: 3 chapters returned 18 entries from TEOS (more than the 17 years 2008–2024 available — likely two filings in one tax year)</li>
              <li>Public-facing read-only demo for portfolio purposes (separate Supabase project, sample data)</li>
            </ol>
            <p style={P}>If you run a nonprofit with chapter affiliates and recognize the problem — <a href="mailto:dp@dgpugliese.dev" style={LINK}>dp@dgpugliese.dev</a>.</p>
          </Section>

          {/* Disclaimer */}
          <div className="panel" style={{ padding: '16px 20px', borderLeft: '2px solid var(--amber)', marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 8 }}>// DISCLOSURE</div>
            <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.65 }}>
              Internal IHQ tooling for Kappa Alpha Psi Fraternity, Inc. Built as part of my role as Director of IT. Live link is gated behind staff login; visiting it as a non-staff user will land on the login screen. Source is private.
            </div>
          </div>

          {/* CTA bottom */}
          <div className="panel panel-corners" style={{ padding: '32px 36px', textAlign: 'center', marginTop: 12 }}>
            <span className="panel-label">END_OF_TRANSMISSION</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 16 }}>◆ READ · QUESTION · ASK ◆</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/log/reverse-engineering-irs-teos" className="btn" style={{ textDecoration: 'none' }}>→ TEOS WRITEUP</Link>
              <a className="btn btn-ghost" href="mailto:dp@dgpugliese.dev">↗ ASK</a>
              <Link to="/" className="btn btn-ghost" style={{ textDecoration: 'none' }}>← MORE WORK</Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}

/* ─────────────────────── helpers ─────────────────────── */

const P = { fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', margin: '0 0 16px' };
const OL = { fontSize: 15, lineHeight: 1.75, color: 'var(--fg-dim)', paddingLeft: 22, margin: '0 0 16px' };
const UL = { fontSize: 15, lineHeight: 1.75, color: 'var(--fg-dim)', paddingLeft: 22, margin: '0 0 16px', listStyle: '"▸  "' };
const LINK = { color: 'var(--cyan)', textDecoration: 'underline' };
const CODE = { fontFamily: 'JetBrains Mono, monospace', fontSize: '0.92em', background: 'rgba(78,201,224,0.08)', border: '1px solid var(--line)', padding: '1px 6px', color: 'var(--cyan)' };

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

function StackPanel({ label, items, c }) {
  return (
    <div className="panel" style={{ padding: '16px 18px', borderLeft: `2px solid var(--${c})` }}>
      <div className="mono" style={{ fontSize: 10, color: `var(--${c})`, letterSpacing: '0.18em', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map(i => (
          <div key={i} className="mono" style={{ fontSize: 12, color: 'var(--fg)' }}>
            <span style={{ color: `var(--${c})`, opacity: 0.6, marginRight: 6 }}>▸</span>{i}
          </div>
        ))}
      </div>
    </div>
  );
}

function Decision({ title, body }) {
  return (
    <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 14, marginBottom: 18 }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', marginBottom: 4 }}>// DECISION</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* Architecture diagram — pure ASCII */
function Diagram() {
  return (
    <div style={{ background: 'rgba(5, 8, 16, 0.5)', border: '1px dashed var(--line)', padding: '20px 24px', marginBottom: 18, overflow: 'auto' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// PIPELINE</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  IRS PUBLIC DATA SOURCES               SUPABASE POSTGRES               FRONTEND
  ───────────────────────               ──────────────────               ────────
  1. ProPublica API ─────────┐
     (year-by-year 990s)     │
                             │
  2. e-Postcard bulk ZIP ────┤
     (latest 990-N per EIN)  │          chapters             ┐
                             ├────────► filings              │
  3. Auto-Revocation List ───┤          irs_org_status       ├──► Cloudflare Pages
     (revocations + dates)   │          refresh_runs (audit) │    React + Vite
                             │          chapter_contacts     │    Tailwind 3
  4. TEOS internal JSON API ─┘                               │
     (historical 990-N)                 RLS · IHQ staff role ┘
                                                ↓
                                        Phase 2: chapter_ein JWT claim
                                                → per-chapter RLS

  Refresh paths run on a mix of Supabase Edge Functions, GitHub Actions,
  and pg_cron. Every run writes an audit row to refresh_runs.
`}</pre>
    </div>
  );
}
