import { CaseProof } from '../components/CaseProof.jsx';
import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function BvfdCaseStudy() {
  useSeo({
    title: 'BVFD Command · Fire Department Member App — Case Study · dgpugliese.dev',
    description:
      'Case study: BVFD Command, the member app and public site of the Bensalem Volunteer Fire Department. Readiness, training, stipend shifts, elections and recruitment in one installable app. Next.js 16, Supabase with row-level security, Microsoft Entra sign-in, Vercel.',
    path: '/bvfd',
    image: 'https://dgpugliese.dev/screenshots/bvfd-home-light.jpg',
  });
  return (
    <>
      <Nav />
      <main id="main-content">
        <article className="case-study editorial-case">

          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
          <div className="case-hero">
            <div className="page-intro-label mono">Case study</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ONE APP FOR THE WHOLE DEPARTMENT
            </div>
            <h1 className="case-title">
              BVFD Command<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              the member app and public website of the Bensalem Volunteer Fire Department — built for a phone in a turnout coat pocket and a big screen at the station.
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> PILOT · LAUNCHING ON BENSALEMVFD.ORG</span>
              <span>SOLO BUILD · VOLUNTEER</span>
              <span>SINCE 2026-03-11</span>
              <a href="https://bensalemvfd.org" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>bensalemvfd.org ↗</a>
            </div>
          </div>

          <CaseProof id="BVFD" />

          <Shot src="/screenshots/bvfd-home-light.jpg" alt="BVFD Command Home on desktop: a greeting over a Rescue 16 photo, a 'your next step' card for a missing certification, readiness, points-by-month and this week's training tiles, announcements, and upcoming drills and training weeks" />
          <p className="mono" style={{ fontSize: 11, color: 'var(--fg-faint)', letterSpacing: '0.12em', margin: '-20px 0 32px' }}>
            SCREENSHOTS USE SEED DATA — EVERY PERSON, RECORD AND NUMBER SHOWN IS MADE UP.
          </p>

          {/* 01 TL;DR */}
          <Section title="TL;DR" sub="60-second summary">
            <p style={P}>
              BVFD Command is the app a volunteer firefighter in Bensalem opens to find out
              <Cyan> what the department needs from them</Cyan>: an expiring clearance, this week&apos;s
              training, an open stipend seat they&apos;re qualified for, their points against the yearly
              requirement. Officers run the department from the same app — recruitment, probation, apparatus
              checks, shift weeks, expenses, elections and the document library.
            </p>
            <p style={P}>
              It started in March 2026 as a rebuild of <Dim>bensalemvfd.org</Dim> — a static site with an
              elections app, then online recruitment applications and a member portal bolted on. By October the
              portal had outgrown that foundation, so it was rebuilt as <Cyan>one Next.js app on a new,
              secure-from-the-first-migration Supabase database</Cyan>. A pilot group uses it now; launch day
              moves the data across and switches the domain.
            </p>
          </Section>

          {/* 02 What members get */}
          <Section title="What members get" sub="what needs you first, then everything else">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 320px' }}>
                <ul style={UL}>
                  <li><Cyan>Readiness.</Cyan> Clearances, certifications and physicals with expiry tracking and 90/60/30-day nudges. Upload a photo and the dates are read for you; officers review and approve.</li>
                  <li><Cyan>Training.</Cyan> The year planned week by week, holidays marked, empty weeks called out, plus training videos and safety tips.</li>
                  <li><Cyan>Stipend shifts.</Cyan> One-tap sign-up for seats you&apos;re qualified for, trades, clock-in with the station&apos;s QR code and a location check, your hours per pay period.</li>
                  <li><Cyan>Activity and points.</Cyan> Check in at drills and meetings with a rotating code; see points by month against the requirement.</li>
                  <li><Cyan>Elections.</Cyan> Checked-in members vote on their phones in the room and get a receipt code.</li>
                  <li><Cyan>ID card</Cyan> with a QR code, ready for Apple and Google Wallet, and a plain-language <Dim>What&apos;s new</Dim> shown only to the people a change affects.</li>
                </ul>
              </div>
              <div style={{ flex: '1 1 100%' }}>
                <Shot src="/screenshots/bvfd-phones.jpg" alt="Three phones showing BVFD Command: Home with a ChildLine clearance expiring in 14 days, Schedule with upcoming stipend shifts and trade buttons, and Readiness at 5 of 7 current" />
              </div>
            </div>
          </Section>

          {/* 03 Officers */}
          <Section title="What officers get" sub="the department's back office, on the same login">
            <ul style={UL}>
              <li><Cyan>Recruitment pipeline</Cyan> from the public application to the board vote — a majority of the whole board, with a roll call for directors — and a secure link for the township&apos;s review.</li>
              <li><Cyan>Readiness board and probation:</Cyan> six-month probation with mentors, reviews and expiry alerts; one screen answers &quot;who is compliant at Station 65?&quot;</li>
              <li><Cyan>Apparatus:</Cyan> checklists per truck, problem reports, and a board of every station.</li>
              <li><Cyan>Week builder for stipend shifts:</Cyan> generate weeks from shift blocks, fill seats, approve trades, review hours, export pay for QuickBooks.</li>
              <li><Cyan>Expenses</Cyan> with receipts and an approval chain, a <Cyan>document library</Cyan> replacing the shared OneDrive, announcements with push, reports and an audit log.</li>
            </ul>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              <Shot src="/screenshots/bvfd-training-planner.jpg" alt="Training planner: the year laid out week by week with holidays and month-long items" mb={0} />
              <Shot src="/screenshots/bvfd-schedule.jpg" alt="Stipend shift schedule: your shifts and open seats you can take" mb={0} />
              <Shot src="/screenshots/bvfd-readiness.jpg" alt="Readiness: what's current, expiring or missing" mb={0} />
              <Shot src="/screenshots/bvfd-home-dark.jpg" alt="Home in the dark theme, for night shifts" mb={0} />
            </div>
          </Section>

          {/* 04 Architecture */}
          <Section title="How it's built" sub="one app, one database, nothing to babysit">
            <Diagram />
            <ul style={UL}>
              <li><Cyan>Next.js 16</Cyan> App Router with server components and server actions, TypeScript, Tailwind CSS v4 and shadcn/ui on Base UI.</li>
              <li><Cyan>Supabase</Cyan> Postgres, Storage and Vault, with <Cyan>Microsoft Entra ID</Cyan> sign-in on the department&apos;s Microsoft 365 accounts.</li>
              <li><Cyan>Vercel</Cyan> for hosting, preview deployments and scheduled jobs; <Cyan>Resend</Cyan> for email; <Cyan>Web Push</Cyan> for notifications.</li>
              <li>An <Cyan>installable PWA</Cyan> with an offline page. The service worker never stores personal pages and clears its cache at sign-out.</li>
              <li>The same app serves the <Cyan>public site</Cyan>: stations, apparatus, events, join and donate.</li>
            </ul>
            <Shot src="/screenshots/bvfd-public-home.jpg" alt="The public bensalemvfd.org home page served by the same app" />
          </Section>

          {/* 05 Security */}
          <Section title="Security model" sub="why it was rebuilt instead of patched">
            <p style={P}>
              The old portal&apos;s database functions trusted whatever email the browser sent, so the public key
              in every page could reach member data. Patching a live system run by volunteers is how you break
              it on a drill night. The decision was to leave the old site untouched, build the new database
              secure from the first migration, and end the exposure on the day the domain switches.
            </p>
            <Decision
              title="Identity comes from the session, never the request."
              body="Every table has row-level security keyed on the signed-in member. No function takes a member's email or ID as a parameter it believes."
            />
            <Decision
              title="Sensitive changes go through locked-down functions."
              body="Ballots, pay, sign-in links and applicant data change only through security-definer functions with an empty search_path, with execute revoked from public, anon and authenticated until explicitly granted."
            />
            <Decision
              title="A vote can't be traced back to a voter."
              body="Ballots are held and shuffled before they're stored. Even the service role can't join ballots to voters."
            />
            <Decision
              title="Applicant SSNs are radioactive."
              body="They live only in Vault-encrypted storage, never in email or logs, and are erased on a 90-day clock. Admin changes to people, pay, documents or settings land in the audit log."
            />
          </Section>

          {/* 06 Testing and shipping */}
          <Section title="Testing and shipping" sub="every role, every screen size">
            <ul style={UL}>
              <li><Cyan>pgTAP</Cyan> database tests for policies, functions and guards — the security model is tested where it lives.</li>
              <li><Cyan>Vitest</Cyan> unit tests, Biome lint and TypeScript on every push; CI also checks the generated database types are current.</li>
              <li><Cyan>Playwright</Cyan> signs in as every made-up seed member — probie, fire police, officer, treasurer, admin and more — on desktop and phone, with <Cyan>axe</Cyan> accessibility checks.</li>
              <li>Schema changes reach the cloud only as migrations. Pushing to main deploys; pull requests get previews.</li>
              <li>Launch is a <Cyan>written runbook</Cyan>: a short pause, a final read-only import from the old database, a DNS switch. The old site stays untouched as the rollback.</li>
            </ul>
          </Section>

          {/* 07 Lessons */}
          <Section title="Lessons" sub="building software for volunteers">
            <ul style={UL}>
              <li>Lead with what the member needs to do, not what the app can do. Home shows the one thing that needs you first.</li>
              <li>Volunteers have phones, not workstations. Mobile first, installable, and fast on a station&apos;s Wi-Fi.</li>
              <li>When a system is insecure by design, a clean rebuild with a single switch day beats patching it in place.</li>
              <li>Write the plain-language changelog as you ship. It&apos;s how a department of volunteers learns the app.</li>
            </ul>
          </Section>

        </article>
      </main>
      <Footer />
    </>
  );
}

/* ---------------- local helpers (case-study pattern) ---------------- */

const P = { fontSize: 16, lineHeight: 1.7, color: 'var(--fg-dim)', margin: '0 0 16px' };
const UL = { fontSize: 15, lineHeight: 1.75, color: 'var(--fg-dim)', paddingLeft: 22, margin: '0 0 16px', listStyle: '"▸  "' };

function Shot({ src, alt, mb = 32 }) {
  return (
    <div className="panel" style={{ padding: 0, marginBottom: mb, overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} loading="lazy" />
    </div>
  );
}

function Cyan({ children }) { return <span style={{ color: 'var(--cyan)' }}>{children}</span>; }
function Dim({ children }) { return <span style={{ color: 'var(--fg-faint)', fontStyle: 'italic' }}>{children}</span>; }

function Section({ title, sub, children }) {
  return (
    <section className="case-section">
      <div className="sect-head">
        <span className="sect-mark" aria-hidden="true" />
        <h2 className="sect-title">{title}</h2>
        <span className="sect-sub">{sub}</span>
      </div>
      <div className="case-section-body">
        {children}
      </div>
    </section>
  );
}

function Decision({ title, body }) {
  return (
    <div style={{ borderLeft: '2px solid var(--cyan)', paddingLeft: 14, marginBottom: 18 }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', marginBottom: 4 }}>// DESIGN RULE</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* Architecture diagram — pure ASCII */
function Diagram() {
  return (
    <div style={{ background: 'var(--bg-elev)', border: '1px dashed var(--line)', padding: '20px 24px', marginBottom: 18, overflow: 'auto' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// THE SYSTEM</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  phone PWA · station screens · public visitors
       │
       ▼
  VERCEL
  Next.js 16 App Router ── server components, server actions
  scheduled jobs ───────── expiry nudges, reminders
       │
       ├── Supabase Auth ─── Microsoft Entra ID (department M365)
       ├── Postgres ──────── row-level security on every table
       │                     security-definer functions, audit log
       ├── Storage ───────── private buckets (documents, uploads)
       ├── Vault ─────────── encrypted applicant SSNs, 90-day erase
       ├── Resend ────────── email
       └── Web Push ──────── announcements, nudges
`}</pre>
    </div>
  );
}
