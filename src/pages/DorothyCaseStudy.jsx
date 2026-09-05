import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function DorothyCaseStudy() {
  useSeo({
    title: 'DOROTHY · Salesforce Monitoring Bot — Case Study · dgpugliese.dev',
    description:
      'Case study: DOROTHY, a zero-dependency Salesforce/Fonteva monitoring bot that emails a daily storm forecast. Python stdlib, GitHub Actions, an LLM analyst layer, and a design rule that silence itself is an alarm.',
    path: '/dorothy',
    image: 'https://dgpugliese.dev/dorothy-og.png',
  });
  return (
    <>
      <Nav />
      <main>
        <article className="case-study" style={{ maxWidth: 980, margin: '0 auto', padding: '60px 32px 120px' }}>

          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
          <div className="panel panel-corners" style={{ padding: '40px 44px', marginBottom: 32 }}>
            <span className="panel-label">CASE_STUDY · DOROTHY</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ◢ READ THE STORM BEFORE IT TOUCHES DOWN ◣
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 92px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
              DOROTHY<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              <span style={{ color: 'var(--cyan)' }}>&gt; </span>
              a monitoring bot for a 150K-member Salesforce org. if she ever misses a morning, her silence is the alarm.
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> IN PRODUCTION</span>
              <span>SOLO BUILD · AI-PAIRED</span>
              <span>SHIPPED 2026-08</span>
              <span style={{ color: 'var(--cyan)' }}>PYTHON STDLIB · ZERO DEPS</span>
            </div>
          </div>

          {/* 01 TL;DR */}
          <Section num="01" title="TL;DR" sub="60-second summary">
            <p style={P}>
              DOROTHY — named for the tornado-sensing rig in <Dim>Twister</Dim> — is a read-only monitoring
              bot for a production Salesforce/Fonteva org serving ~150,000 members. Every morning she sweeps
              <Cyan> 14 systems</Cyan> (governor limits, mail queues, async job failures, installed package
              versions, payment-pipeline invariants, certificates, the live member site) and emails IT
              leadership a <Cyan>storm forecast</Cyan>: ALL CLEAR, CLOUDS FORMING, or STORM WARNING.
            </p>
            <p style={P}>
              She is a single Python file with <Cyan>zero dependencies</Cyan>, running on GitHub Actions,
              deliberately <Cyan>outside</Cyan> the platform she watches — because a sick org cannot be
              trusted to report on itself. On her very first dry run she found production data storage over
              100% of allocation and a vendor batch job failing hundreds of times a day. Nobody had noticed
              either.
            </p>
          </Section>

          {/* 02 Why */}
          <Section num="02" title="Why she exists" sub="the silent failures">
            <p style={P}>
              Two incidents made the case. First, a scheduled job that delivers member-portal email died
              quietly — no error surfaced anywhere a human looks — and mail queued for <Cyan>25 days</Cyan> before
              anyone reported it. Second, a badge-automation chain was silently burning 40–110K async Apex
              executions a day against a 250K daily budget. Both were textbook monitoring gaps: the platform
              knew, but nothing was <Dim>watching</Dim>.
            </p>
            <p style={P}>
              The uncomfortable insight: every signal needed to catch both failures early was already sitting
              in the org, queryable over plain REST. What was missing wasn't data — it was an
              <Cyan> outside observer with a routine</Cyan>.
            </p>
          </Section>

          {/* 03 Design rules */}
          <Section num="03" title="Design rules" sub="the opinions that shaped her">
            <Decision
              title="Monitoring must live outside the system it monitors."
              body="If the org's scheduler is broken, an org-hosted monitor scheduled by it says nothing. DOROTHY runs on GitHub Actions cron and authenticates in over OAuth client-credentials as a read-only, API-only integration user."
            />
            <Decision
              title="Silence is an alarm."
              body="She emails every day — green days included, as a one-liner. A missing email is itself a signal. If she crashes, she exits non-zero and GitHub sends a workflow-failure notice: a dead monitor can never masquerade as a healthy org."
            />
            <Decision
              title="Every red must be actionable."
              body="Known, vendor-acknowledged failure storms are annotated with their context and capped at WARN by a fingerprint runbook. A red always means something NEW. The fastest way to kill a monitoring tool is to train its readers to delete it."
            />
            <Decision
              title="Zero dependencies, boring runtime."
              body="One Python file, stdlib only — urllib, smtplib, json, csv. No framework, no requirements.txt, nothing to rot. The entire operational surface is a cron schedule and a secrets vault."
            />
          </Section>

          {/* 04 Architecture */}
          <Section num="04" title="Architecture" sub="one file, one cron, one email">
            <Diagram />
            <p style={P}>
              State lives in a <code style={CODE}>state.json</code> the workflow commits back to the repo after
              each run — yesterday's limit percentages, installed package versions, log-table row counts.
              That one file upgrades every check from <Cyan>level detection</Cyan> to
              <Cyan> change detection</Cyan>: a limit that jumps 20 points overnight alerts while still green,
              because the incident that taught us that lesson crossed its threshold three days before a level
              alarm would have fired.
            </p>
          </Section>

          {/* 05 What she watches */}
          <Section num="05" title="What she watches" sub="14 systems, every morning">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 16 }}>
              <StackPanel label="PLATFORM VITALS" c="cyan" items={[
                'All governor limits w/ per-limit thresholds',
                'Day-over-day limit deltas (slope, not just level)',
                'Async Apex failure storms, grouped + sampled',
                'Scheduled jobs in ERROR / stuck WAITING',
                'Unhandled exceptions from EventLogFile',
                'Failed logins · Salesforce Trust incidents',
              ]} />
              <StackPanel label="BUSINESS INVARIANTS" c="green" items={[
                'Member-mail queue depth + staleness (the 25-day-outage detector)',
                'Settled payments must reconcile to a payout',
                'Posted receipts must carry a gateway transaction id',
                'Nothing stuck in Processing past settlement',
                'Stripe webhook config can never silently lose records',
              ]} />
              <StackPanel label="TRIPWIRES" c="amber" items={[
                'Installed managed-package version changes (vendor pushes)',
                'Org certificate expiry — domain TLS, SAML, JWT',
                'Vendor error-log table refilling after cleanup',
                'Availability + TLS canary on the live member site',
                'Weekly Security Health Check score drops',
              ]} />
            </div>
            <p style={P}>
              The business-invariant checks are the interesting ones: they encode <Cyan>what correct looks
              like</Cyan> for this specific org's payment pipeline, so a regression reads as a one-line
              plain-English finding — <Dim>"14 of 86 settled payments have no payout association — Finance
              cannot reconcile these deposits"</Dim> — instead of a dashboard nobody opens.
            </p>
          </Section>

          {/* 06 Knowledge layer */}
          <Section num="06" title="The knowledge layer" sub="fingerprints.json — a runbook the bot reads">
            <p style={P}>
              Raw monitoring reports symptoms. DOROTHY carries a small JSON runbook that maps known error
              signatures — an Apex class plus an error substring, or a section plus a message fragment — to
              <Cyan> context</Cyan>: which vendor ticket covers it, why it happens, whether it's noise.
              Matching findings get annotated in place and demoted from CRIT to WARN.
            </p>
            <p style={P}>
              The effect on day one was dramatic: a digest with <Cyan>five criticals</Cyan> became a digest
              with <Cyan>one</Cyan> — the one that actually needed a human — while the four known storms
              stayed visible, each carrying its explanation. When a vendor ticket closes, its entry is
              deleted and the underlying check silently becomes a permanent regression guard. The checks stay
              generic; the institutional memory lives in one reviewable file.
            </p>
          </Section>

          {/* 07 Day one findings */}
          <Section num="07" title="Findings" sub="what she caught before breakfast">
            <ul style={UL}>
              <li>Production data storage at <Cyan>100%+ of allocation</Cyan> and climbing — traced to a vendor error-log table of 838K rows whose log-shipping flag showed it had never once shipped.</li>
              <li>A vendor sync batch failing <Cyan>hundreds of times daily</Cyan> against a query governor — invisible because the failures were caught and retried forever.</li>
              <li>100% of posted electronic receipts missing the <Cyan>gateway transaction id</Cyan> that ties them to the payment processor — a reconciliation gap Finance had been feeling but couldn't name.</li>
              <li>The member-portal domain certificate quietly <Cyan>74 days from expiry</Cyan>.</li>
              <li>A false alarm that taught a lesson: a legitimate 1,800-message send tripped the queue-depth alert, so the check learned to distinguish <Dim>deep-but-draining</Dim> from <Dim>stale</Dim> — only a stale queue means the sender is dead.</li>
            </ul>
          </Section>

          {/* 08 AI layer */}
          <Section num="08" title="The AI layer" sub="deterministic checks, narrated">
            <p style={P}>
              An optional final stage sends the day's findings — with their fingerprint annotations — to a
              small Claude model, which writes a 2–3 sentence <Cyan>"My read"</Cyan> at the top of the
              digest: what deserves attention first and why, connecting related findings. The division of
              labor is deliberate: <Cyan>detection stays deterministic</Cyan> and auditable; the LLM only
              prioritizes and explains. If the API call fails, the note is skipped and the digest ships
              anyway. The bot never depends on the model to be correct — only to be helpful.
            </p>
          </Section>

          {/* 09 Cost */}
          <Section num="09" title="Cost &amp; ops posture" sub="the part CFOs like">
            <ul style={UL}>
              <li><Cyan>$0/month infrastructure.</Cyan> GitHub Actions free tier, one SMTP relay already in use, no servers, no database.</li>
              <li>Closest commercial equivalent runs ~<Cyan>$100+/month</Cyan> — and doesn't know this org's payment pipeline or vendor ticket history.</li>
              <li>Least-privilege by construction: a dedicated integration user, API-only, read-only, client-credentials OAuth. No human credentials anywhere.</li>
              <li>Whole system is reviewable in one sitting: one Python file, one runbook JSON, one workflow YAML, one state file.</li>
            </ul>
          </Section>

          {/* 10 Lessons */}
          <Section num="10" title="Lessons" sub="what transferred">
            <ul style={UL}>
              <li>Level thresholds can't see slope. The storage alarm was <Dim>correct</Dim> and still three days late — rate-of-change alerting is not a nice-to-have.</li>
              <li>Known issues must be first-class citizens of a monitoring system, or every digest cries wolf.</li>
              <li>Design the system so its <Cyan>failure mode is loud</Cyan>. Every run emails; silence means something is wrong.</li>
              <li>An LLM belongs at the narration layer of monitoring, not the detection layer.</li>
              <li>A weekend of stdlib Python plus institutional knowledge beats a quarter of vendor evaluation.</li>
            </ul>
            <p style={{ ...P, marginTop: 18, marginBottom: 0 }}>
              <Dim>Source is private (employer-operated). The architecture above is the whole trick — there is
              deliberately nothing clever left out.</Dim>
            </p>
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
      <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em', marginBottom: 4 }}>// DESIGN RULE</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 14, color: 'var(--fg-dim)', lineHeight: 1.65 }}>{body}</div>
    </div>
  );
}

/* Architecture diagram — pure ASCII */
function Diagram() {
  return (
    <div style={{ background: 'rgba(5, 8, 16, 0.5)', border: '1px dashed var(--line)', padding: '20px 24px', marginBottom: 18, overflow: 'auto' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// DAILY RUN</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  GITHUB ACTIONS (cron, 7:00 AM)                 SALESFORCE / FONTEVA (prod)
  ──────────────────────────────                 ───────────────────────────
   checkout repo  ─── state.json (yesterday)
        │
        ▼
   healthbot.py  ── OAuth client-credentials ──►  read-only integration user
        │                                           │
        ├── REST /limits ◄──────────────────────────┤   governor limits
        ├── SOQL ◄──────────────────────────────────┤   queues · jobs · payments
        ├── Tooling ◄───────────────────────────────┤   packages · certs · logs
        └── EventLogFile CSV ◄──────────────────────┘   unhandled exceptions
        │
        ▼
   fingerprints.json ── annotate + demote known issues
        │
        ▼
   delta vs state.json ── level alarms + SLOPE alarms
        │
        ├──► Claude API (optional) ──► "My read" analyst note
        │
        ▼
   SMTP relay ──► daily forecast email ──► IT leadership inbox
        │
        └──► commit state.json back  (tomorrow's baseline)

   crash at ANY step → exit 1 → GitHub failure email.
   ──── a dead monitor is never mistaken for a healthy org. ────
`}</pre>
    </div>
  );
}
