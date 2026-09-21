import { CaseProof } from '../components/CaseProof.jsx';
import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function PotholejawnCaseStudy() {
  useSeo({
    title: 'potholejawn · AI Agent Over Live 311 Data — Case Study · dgpugliese.dev',
    description:
      "Case study: potholejawn, an AI agent that scans Philadelphia's live 311 data — 5.9 million rows — to route you around the potholes. Built solo in one day at a hackathon. Claude tool use, PostGIS, SSE streaming, guarded SQL.",
    path: '/potholejawn',
    image: 'https://dgpugliese.dev/potholejawn-og-v1.png',
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
              ROUTE AROUND THE POTHOLES
            </div>
            <h1 className="case-title">
              potholejawn<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              an AI agent that scans Philadelphia&apos;s live 311 data — 5.9 million rows — to route you around the potholes.
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> LIVE</span>
              <span>SOLO BUILD · ONE DAY · HACKATHON</span>
              <span>SHIPPED 2026-09-20</span>
              <a href="https://potholejawn.com" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>potholejawn.com ↗</a>
              <a href="https://github.com/dgpugliese/potholejawn" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>SOURCE ↗</a>
            </div>
          </div>

          <CaseProof id="POTHOLEJAWN" />

          {/* Screenshot */}
          <div className="panel" style={{ padding: 0, marginBottom: 32, overflow: 'hidden' }}>
            <img
              src="/screenshots/potholejawn.jpg"
              alt="Full-viewport map of Philadelphia with 1,500+ live open pothole reports as yellow dots and a floating 'Where to?' search pill"
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>

          {/* 01 TL;DR */}
          <Section title="TL;DR" sub="60-second summary">
            <p style={P}>
              potholejawn is a map-first web app over Philadelphia&apos;s live 311 dataset. The map opens on
              <Cyan> every open pothole report in the city right now</Cyan> — 1,500+ in view before you type
              anything. Type where you are and where you&apos;re going, and an AI agent geocodes both places,
              pulls the driving routes, scans each one against live city data for open street-defect reports
              within 30 meters, and recommends the smoother drive with a plain-language briefing.
            </p>
            <p style={P}>
              It was built <Cyan>solo, in one day</Cyan>, at the Code &amp; Coffee Philadelphia AI Agent
              Hackathon on September 20, 2026, and was live at <Cyan>potholejawn.com</Cyan> the same day —
              with 42 passing tests, rate limits, prompt caching, and a deterministic fallback so the demo
              never dies. Cost hardening (a model-tier knob and a trip-result cache) landed the same evening.
            </p>
          </Section>

          {/* 02 Why */}
          <Section title="Why it exists" sub="the data is public; the answers aren't">
            <p style={P}>
              Philadelphia publishes every 311 request since 2014 — about 6 million rows — but answering a
              real question takes SQL skills and knowledge of the data&apos;s quirks. In 2026 the city closes
              illegal-dumping reports in about 4 days, while roughly <Cyan>19% of pothole reports</Cyan> and
              <Cyan> 81% of abandoned-vehicle reports</Cyan> are still open. Residents, journalists, and
              council staff should be able to find that out by asking.
            </p>
          </Section>

          {/* 03 Architecture */}
          <Section title="How the trip agent works" sub="the agent picks the tools; the rails pick the limits">
            <Diagram />
            <p style={P}>
              The agent decides which tools to call and in what order, weighs pothole count, report age, and
              drive time, then explains its pick. Both agents — trip and analyst — share
              <Cyan> one generic tool loop</Cyan>; the difference is entirely in the tools and the system prompt.
            </p>
          </Section>

          {/* 04 Watching it think */}
          <Section title="Watching it think" sub="streaming steps instead of a spinner">
            <p style={P}>
              Agent steps stream to the panel live over <Cyan>Server-Sent Events</Cyan>, so you watch the
              agent geocode, fetch routes, and scan them instead of staring at a spinner. After a trip, the
              <Cyan> &quot;What the agent did&quot;</Cyan> section shows the full audit trail — every thought, tool
              call, SQL query, error, and token count. The same trail is written to a per-run JSONL file on
              the server. An agent you can audit is an agent you can trust in front of strangers.
            </p>
            <div className="panel" style={{ padding: 0, marginBottom: 18, overflow: 'hidden' }}>
              <img
                src="/screenshots/potholejawn-trip.jpg"
                alt="Desktop trip view: slide-in panel with the agent's briefing, Route A recommended with 9 reports vs Route B's 13, a 'What the agent did' audit section, and both routes drawn on the map with pothole markers"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </div>
            <p style={{ ...P, marginBottom: 0 }}>
              Real result from live data: <Dim>Temple University → Citizens Bank Park</Dim> — same 17-minute
              drive, one route passes <Cyan>9 open pothole reports</Cyan>, the other <Cyan>13</Cyan>.
            </p>
          </Section>

          {/* 05 The analyst */}
          <Section title="The 311 analyst" sub="an agent that writes its own SQL — inside a cage">
            <p style={P}>
              The second agent answers open-ended questions — <Dim>&quot;where is the city slowest at fixing
              potholes?&quot;</Dim> — by writing and running SQL against the full 5.9M-row dataset through the
              city&apos;s public Carto SQL API. When a query fails, the error goes back to the model, which
              <Cyan> fixes its own SQL and retries</Cyan>. The UI streams the analyst&apos;s steps live and shows
              every query it runs.
            </p>
            <p style={P}>
              Its SQL is treated as <Cyan>untrusted input</Cyan>: single SELECT only, table allowlist, no
              comments, no admin functions, results capped at 200 rows. And the analyst carries honesty
              rules — it reports the open-case share next to any time-to-close figure, and does not confuse
              <Dim> more reports</Dim> with <Dim>more potholes</Dim>.
            </p>
          </Section>

          {/* 06 Guardrails */}
          <Section title="Guardrails" sub="autonomy where it helps, hard rails where it matters">
            <Decision
              title="The model never writes the route SQL."
              body="The PostGIS route-scan query is built in plain Python from validated numbers only — the search radius is clamped to 10–100 m, and every coordinate must fall inside a Philadelphia bounding box. The agent chooses when to scan; it never chooses the SQL."
            />
            <Decision
              title="The demo never dies."
              body="If the API key is missing or the model call fails, a plain-Python planner produces the same map and a simpler briefing. If the agent skips a route, a completeness check scans it anyway. Graceful degradation was a design requirement, not an afterthought."
            />
            <Decision
              title="A run cannot loop forever."
              body="Hard cap of 12 model turns per run, per-IP and global rate limits on the public agent endpoints, and a full JSONL audit trail of every step and token count."
            />
            <Decision
              title="Honest framing beats impressive framing."
              body="Markers are resident reports, not verified potholes, and the UI says so. API data is inserted with textContent, never parsed as HTML; CDN assets are pinned with Subresource Integrity hashes."
            />
          </Section>

          {/* 07 Cost engineering */}
          <Section title="Cost engineering" sub="the same-evening hardening pass">
            <ul style={UL}>
              <li><Cyan>Prompt caching</Cyan> on the agent loop — a system-prefix breakpoint plus a moving conversation breakpoint, so later steps read the prompt prefix from cache at ~10% price. Verified on a real run: cache reads climbing from 1,204 to 3,252 tokens by the later steps.</li>
              <li>A <Cyan>model-tier knob</Cyan> — an env var drops the trip loop to a smaller model (~3× cheaper) without touching the code path; the default stayed on the larger model through judging so briefing quality held.</li>
              <li>A <Cyan>1-hour trip-result cache</Cyan> keyed on normalized endpoints, checked before the rate limiter — a repeated route serves instantly without a single model token.</li>
              <li>Token usage is logged per step, so the cost of any run is a grep away.</li>
            </ul>
          </Section>

          {/* 08 Tests */}
          <Section title="Testing an agent" sub="42 tests, zero API calls">
            <p style={P}>
              The test suite runs against a <Cyan>fake model client</Cyan> — no API key, no network. That
              means the tool loop, the SQL guardrails, the geofence, the fallback planner, and the route
              scanner are all exercised deterministically in CI, and a hackathon-day refactor can&apos;t silently
              break the demo. <Cyan>42 tests passing</Cyan> at ship.
            </p>
          </Section>

          {/* 09 Lessons */}
          <Section title="Lessons" sub="what transferred">
            <ul style={UL}>
              <li>Build the guardrails before the intelligence. The SQL cage and the geofence took an hour and made every later feature safe to ship fast.</li>
              <li>Streaming the agent&apos;s steps is a trust feature, not a UX flourish — the audit trail was the most-discussed part of the demo.</li>
              <li>A deterministic fallback is what lets you demo an LLM app to a room with confidence.</li>
              <li>One generic tool loop, two very different agents. The abstraction paid for itself the same day.</li>
              <li>Prompt caching is the cheapest optimization in agent engineering — one breakpoint decision, ~90% off repeated prefix tokens.</li>
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
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// ONE TRIP</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  map-first UI (Leaflet + Flask)
  citywide pothole layer · "Where to?" pill · autocomplete
       │
  "Temple University" → "Citizens Bank Park"
       │
       ▼
  TRIP AGENT (Claude + tools, shared generic tool loop)
       ├── geocode_address    US Census geocoder, OpenStreetMap fallback
       ├── find_routes        OSRM: main route plus alternatives
       ├── scan_route         PostGIS query on the city's live 311 API —
       │                      open street-defect reports within 30 m of the route
       └── recommend_route    records the choice as structured output
       │
       ▼
  agent steps stream back live (SSE)
       │
       ▼
  slide-in panel / bottom sheet
  route signs · briefing · "What the agent did" audit · ask-the-analyst box

  every thought, tool call, SQL query, error, and token count
  ──── written to runs/run-<timestamp>.jsonl ────
`}</pre>
    </div>
  );
}
