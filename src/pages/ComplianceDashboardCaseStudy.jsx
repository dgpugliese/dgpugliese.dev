import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function ComplianceDashboardCaseStudy() {
  useSeo({
    title: 'Compliance Dashboard · IRS Form 990 Tracking — Case Study · dgpugliese.dev',
    description:
      'Private case study: an internal compliance dashboard tracking IRS Form 990 obligations across a multi-region nonprofit network. Five data sources (four IRS feeds + Salesforce/Fonteva), automated refresh, $300/yr vs $110K–$246K vendor quotes.',
    path: '/compliance',
    image: 'https://dgpugliese.dev/og.png',
  });
  return (
    <>
      <Nav />
      <main>
        <article className="case-study" style={{ maxWidth: 980, margin: '0 auto', padding: '60px 32px 120px' }}>

          {/* Back nav */}
          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
            <div className="panel panel-corners" style={{ padding: '40px 44px', marginBottom: 32 }}>
            <span className="panel-label">CASE_STUDY · COMPLIANCE</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ◢ IRS FORM 990 COMPLIANCE · 702 ENTITIES + 12 REGIONS ◣
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
              COMPLIANCE<br/>PLATFORM<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              <span style={{ color: 'var(--cyan)' }}>&gt; </span>
              702 entities tracked across 12 regions · 5 data sources · refreshed nightly · $300/yr
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <Link to="/log/reverse-engineering-irs-teos" className="btn btn-ghost" style={{ textDecoration: 'none' }}>↗ TEOS WRITEUP</Link>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> IN-USE</span>
              <span>PRIVATE · STAFF ACCESS</span>
              <span>702 ENTITIES</span>
              <span>12 REGIONS</span>
              <span>3,672 FILINGS</span>
              <span>BACK TO 2008</span>
            </div>
          </div>

          {/* TL;DR */}
          <Section num="01" title="TL;DR" sub="60-second summary">
            <p style={P}>
              An internal tool tracking <Cyan>IRS Form 990</Cyan> filing status across 702 active nonprofit entities
              across 12 regions, so leadership can spot compliance gaps before entities drift into auto-revocation — and
              reconcile certification records against what the IRS actually shows. Internal staff login only; accounts issued manually.
            </p>
            <p style={P}>
              Aggregates <Cyan>five data sources</Cyan> — ProPublica Nonprofit Explorer, the IRS e-Postcard bulk
              ZIP, the IRS Auto-Revocation List, a custom scraper against the IRS TEOS internal JSON API
              (the only way to get historical 990-N data — the IRS doesn't publish it in bulk), and a daily
              Salesforce/Fonteva sync that anchors the entity roster and pulls in each entity's most recent
              certification submission + signed 990 PDF.
            </p>
            <p style={P}>
              Built end-to-end on infrastructure that scales for a mid-size nonprofit operation: under <Cyan>$300/yr</Cyan>{' '}
              total, against vendor alternatives quoting <Cyan>$110K–$246K</Cyan>.
            </p>
          </Section>

          {/* Why */}
          <Section num="02" title="Why it exists" sub="the problem">
            <p style={P}>
              Nonprofits that fail to file IRS Form 990 (or its 990-EZ / 990-N variants) for three consecutive
              years lose their tax-exempt status automatically. Reinstatement is painful, expensive, and visible
              on the IRS Auto-Revocation List. For an org with hundreds of affiliates filing under their
              own EINs, that's a recurring operational risk.
            </p>
            <p style={P}>
              The challenge: the data exists across at least four IRS surfaces, none of them designed for the
              "show me all filing entities' status" question. ProPublica covers full 990 / 990-EZ / 990-PF
              year-by-year. The IRS e-Postcard bulk ZIP covers latest 990-N per EIN (no history). The Auto-Revocation
              List covers revocations and reinstatements. Historical 990-N — the form most small affiliates file —
              has <Dim>no public bulk source at all</Dim>.
            </p>
            <p style={P}>
              Vendor quotes for a managed equivalent: $110K–$246K/yr. The build for what this project needed:
              ~$300/yr, finished in weeks, on infrastructure I already understand.
            </p>
          </Section>

          {/* How it works */}
          <Section num="03" title="How it works" sub="the architecture">
            <Diagram />
            <p style={P}>The pipeline, end to end:</p>
            <ol style={OL}>
              <li><Cyan>Roster anchor</Cyan> — entity EINs live in Supabase, synced nightly from Salesforce (Fonteva). The roster is the source of truth for which orgs we care about; the sync also pulls each entity's most recent certification submission and its signed 990 PDF link.</li>
              <li><Cyan>Five refresh paths</Cyan>, each owning a column range so they never clobber each other:
                <ul style={{ ...UL, marginTop: 8 }}>
                  <li><strong>Fonteva / Salesforce</strong> (GitHub Actions, daily 06:30 UTC, <code style={CODE}>sf</code> CLI + SOQL): roster, EIN, region name, stewardship contact + email, certification status + signed 990 PDF URL</li>
                  <li><strong>ProPublica</strong> (Edge Function, daily 07:00 UTC via pg_cron): year-by-year 990 / 990-EZ / 990-PF + PDF return URLs</li>
                  <li><strong>e-Postcard bulk ZIP</strong> (GitHub Actions, monthly): latest 990-N per EIN</li>
                  <li><strong>Auto-Revocation List</strong> (Edge Function, monthly 5th 08:00 UTC via pg_cron, plus on-demand <code style={CODE}>repository_dispatch</code> button): revocations + reinstatements with effective dates</li>
                  <li><strong>TEOS JSON API</strong> (GitHub Actions, weekly Saturday 09:00 UTC): historical 990-N back to 2008 — the only way to get this data</li>
                </ul>
              </li>
              <li><Cyan>Upsert + audit</Cyan> — every refresh writes a row to <code style={CODE}>refresh_runs</code> with counts, status, and a JSONB details blob. Source-of-truth rules at the column level prevent overwrites.</li>
              <li><Cyan>Frontend reads from a view</Cyan> — <code style={CODE}>chapters_with_status</code> (security_invoker) joins entities + latest filing + IRS status + certification into one shape, so the React app reads from a single source. Nine tap-to-filter KPI cards scope the entity list; region rollups drill from national view into any of the 12 regions in one click.</li>
              <li><Cyan>Auth</Cyan> — Supabase email/password, staff only, accounts created manually. No public signup, no email infrastructure. Phase 2 (now live at the DB layer) adds a <code style={CODE}>province_name</code> JWT claim via a custom access token hook, with RLS scoping per region.</li>
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
              <Cyan> 3,672 filings imported across 434 entities</Cyan>, back to 2008.{' '}
              <Link to="/log/reverse-engineering-irs-teos" style={LINK}>Full writeup →</Link>
            </p>
          </Section>

          {/* Stack */}
          <Section num="05" title="The stack" sub="under the hood">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <StackPanel label="FRONTEND" items={['React 18 · Vite', 'Tailwind 3', 'Single-component prototype', 'framer-motion + lucide-react']} c="cyan" />
              <StackPanel label="DATABASE" items={['Supabase Postgres', 'RLS on every table', '`chapters_with_status` view', 'JSONB raw payloads for audit']} c="violet" />
              <StackPanel label="REFRESH" items={['Supabase Edge Functions', 'GitHub Actions cron', 'pg_cron (daily + monthly)', 'Custom TEOS scraper (Node)', 'Salesforce CLI (Fonteva sync)']} c="amber" />
              <StackPanel label="HOSTING" items={['Cloudflare Pages', 'Native Git → push-to-deploy', 'Supabase Auth (email + password)', 'Free tier · $0 hosting']} c="green" />
            </div>
          </Section>

          {/* Design Decisions */}
          <Section num="06" title="Design decisions" sub="and the reasoning">
            <Decision title="Five sources, column-level ownership"
                      body="Each refresh path owns a specific subset of columns; the others never write to those columns. revocation_date is owned by the Auto-Revocation refresh only; richer form types (990 / 990-EZ / 990-PF) are never overwritten by 990-N upserts; cert_* fields are owned exclusively by the Fonteva sync. Keeps multi-source refreshes idempotent without a brittle priority queue." />
            <Decision title="TEOS JSON API instead of an HTML scraper"
                      body="The conventional approach to 'web-only' data is headless-browser scraping. Instead, devtools-inspect first — TEOS hands out clean JSON. Coupling to the JSON shape (which the IRS's own UI depends on) is far more durable than coupling to DOM markup the IRS could reskin tomorrow." />
            <Decision title="Audit row per refresh"
                      body="Every script run inserts a refresh_runs row with start/end time, processed/updated/error counts, and a JSONB details blob. Means I can answer 'when did this filing last sync?' or 'why did last Tuesday's refresh fail?' in seconds, without re-reading logs across three providers." />
            <Decision title="Standalone Supabase project, mergeable later"
                      body="This was built as a standalone platform in its own Supabase project rather than a direct extension of an existing portal. That kept scope tight while the data model matured. Optionality > premature coupling." />
            <Decision title="Manual account provisioning, no public signup"
                      body="Staff only. Accounts created by hand in Supabase Auth's dashboard. This trades convenience for blast-radius reduction: no email-confirmation infrastructure to operate, no signup-spam risk, and the moment of provisioning is also the moment of access review." />
            <Decision title="One-click audit packets"
                      body="Each entity detail page bundles every PDF return on record into a ZIP plus a manifest, exportable as a print-friendly PDF for board / legal review. The same package that used to take a half day now completes in ~8 seconds." />
          </Section>

          {/* Trust & Phase 2 */}
          <Section num="07" title="Trust posture &amp; Phase 2" sub="what's defensible, what's next">
            <p style={P}>
              Phase 1 is staff-only with full read/write under a single role. Trust scaffolding is the boring,
              load-bearing stuff:
            </p>
            <ul style={UL}>
              <li><Cyan>RLS on every table</Cyan> — no permissive USING(true) policies; staff role gates all reads</li>
              <li><Cyan>Audit row per refresh</Cyan>, attributed to the script + source, with counts and status</li>
              <li><Cyan>Activity log per entity</Cyan>, attributed to auth.uid() + email — every note timestamped and authored</li>
              <li><Cyan>JSONB raw payloads</Cyan> retained on every filing row, so any data quality question is one query away</li>
            </ul>
            <p style={P}>
              <Cyan>Phase 2 — region-based role access — is shipped at the data layer.</Cyan> A custom Supabase
              access-token hook attaches the user's <code style={CODE}>province_name</code> to their JWT on
              every login; RLS policies on <code style={CODE}>chapters</code>, <code style={CODE}>filings</code>,
              and <code style={CODE}>irs_org_status</code> scope reads to the entities in that region. The
              anon path the existing dashboard already uses is unchanged — phase 1 grants were tightened to{' '}
              <code style={CODE}>anon</code> only so a logged-in region role doesn't inherit global reads.
              A <code style={CODE}>province_keepers</code> roster is auto-synced from the daily Fonteva job
              via a trigger, so adds/removes flow through without manual table edits. Remaining work to flip
              it on: register the hook + invite users in the Supabase dashboard, and add a small session-aware
              login UI on the frontend.
            </p>
          </Section>

          {/* Outcome / cost */}
          <Section num="08" title="Outcome" sub="cost, scale, what's next">
            <p style={P}>
              In use today in a production nonprofit context. The headline numbers:
            </p>
            <ul style={UL}>
              <li><Cyan>702 active entities</Cyan> + 12 regions, tracked against five data sources, refreshed nightly</li>
              <li><Cyan>3,672 historical filings</Cyan> imported from TEOS on the first full pass, going back to 2008</li>
              <li><Cyan>~$300/yr total infrastructure cost</Cyan>, against vendor quotes of $110K–$246K</li>
              <li><Cyan>~8 seconds</Cyan> to produce an audit packet that previously took half a day manually</li>
            </ul>
            <p style={P}>
              The differentiator over a pure status tracker is reconciling <Cyan>internal</Cyan> certification
              records against IRS reality. Three data-quality KPIs unique to this tool:
            </p>
            <ul style={UL}>
              <li><Cyan>Entities missing EINs in Fonteva</Cyan> — surfaces the data-entry punch list blocking IRS lookups</li>
              <li><Cyan>Fonteva-certified but on the IRS Auto-Revocation List</Cyan> — records marked in good standing but with IRS revocation conflicts</li>
              <li><Cyan>Certified without a 990 uploaded to Fonteva</Cyan> — completed cert packets missing the document that proves the filing</li>
            </ul>
            <p style={P}>Recently shipped:</p>
            <ul style={UL}>
              <li><Cyan>TEOS scraper promoted to weekly GitHub Actions cron</Cyan> (was a manual Node script)</li>
              <li><Cyan>Region-based auth + per-region RLS</Cyan> live at the DB layer (activation pending in Supabase dashboard)</li>
              <li><Cyan>Salesforce/Fonteva roster sync</Cyan> — daily job that anchors the roster and pulls entity certification + signed 990 PDF links from Fonteva</li>
            </ul>
            <p style={P}>Punch list:</p>
            <ol style={OL}>
              <li>Activate Phase 2: register the auth hook + invite regional stewards in the Supabase dashboard, ship the session-aware login UI</li>
              <li>16 entities with EIN issues — EINs are missing or malformed in Fonteva (already surfaced via the "Needs EIN in Fonteva" KPI card; needs data-entry on the Fonteva side)</li>
              <li>Refine login page styling for the production theme</li>
              <li>Nav/IA rework — Overview as default landing, move Data Refresh to admin-only</li>
              <li>Audit a data quirk: 3 entities returned 18 entries from TEOS (more than the 17 years 2008–2024 available — likely two filings in one tax year)</li>
              <li>Public-facing read-only demo for portfolio purposes (separate Supabase project, sample data)</li>
            </ol>
            <p style={P}>If you run an organization with distributed entities and recognize the problem — <a href="mailto:dp@dgpugliese.dev" style={LINK}>dp@dgpugliese.dev</a>.</p>
          </Section>

          {/* Disclaimer */}
          <div className="panel" style={{ padding: '16px 20px', borderLeft: '2px solid var(--amber)', marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 8 }}>// DISCLOSURE</div>
            <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.65 }}>
              Internal compliance tooling built for a private nonprofit operations stack. Live link is gated behind staff login; visiting it as a non-staff user will land on the login screen. Source is private.
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
      <Footer />
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
        <span className="sect-num">{num}</span><span className="sect-mark" />
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
  DATA SOURCES                          SUPABASE POSTGRES               FRONTEND
  ────────────                          ──────────────────               ────────
  1. Fonteva / Salesforce ───┐  daily   entities             ┐
     (roster + cert + PDFs)  │  06:30   filings              │
                             │          irs_org_status       │
  2. ProPublica API ─────────┤  daily   refresh_runs (audit) │
     (year-by-year 990s)     │  07:00   entity_contacts      ├──► Cloudflare Pages
                             ├────────► region_keepers      │    React 18 + Vite
  3. e-Postcard bulk ZIP ────┤  monthly                      │    Tailwind 3
     (latest 990-N per EIN)  │                               │
                             │          RLS · staff role ┘
  4. Auto-Revocation List ───┤  monthly + region scope
     (revocations + dates)   │          (security_invoker view)
                             │                  ↓
  5. TEOS internal JSON API ─┘  weekly  Phase 2 (DB live): province_name
     (historical 990-N)               Sat  JWT claim → per-region RLS

  Refresh paths run on a mix of Supabase Edge Functions, GitHub Actions,
  pg_cron, and the Salesforce CLI. Every run writes an audit row to refresh_runs.
`}</pre>
    </div>
  );
}
