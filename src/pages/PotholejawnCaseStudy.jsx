import { CaseProof } from '../components/CaseProof.jsx';
import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function PotholejawnCaseStudy() {
  useSeo({
    title: 'potholejawn · Pothole-Aware Navigation — Case Study · dgpugliese.dev',
    description:
      "Case study: potholejawn, turn-by-turn navigation that routes around Philadelphia's potholes. Its own A* street graph with live 311 reports as penalties, every route verified against city data, voice navigation, and a Claude trip agent. Python, PostGIS, OSRM, Cloud Run.",
    path: '/potholejawn',
    image: 'https://dgpugliese.dev/potholejawn-og-v2.png',
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
              turn-by-turn navigation that routes around Philadelphia&apos;s potholes — planned on its own street graph, verified against the city&apos;s live 311 data.
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> LIVE</span>
              <span>SOLO BUILD · PRODUCT</span>
              <span>SINCE 2026-09-20</span>
              <a href="https://potholejawn.com" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>potholejawn.com ↗</a>
              <a href="https://github.com/dgpugliese/potholejawn-hackathon" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>SOURCE ↗</a>
            </div>
          </div>

          <CaseProof id="POTHOLEJAWN" />

          {/* Screenshot */}
          <div className="panel" style={{ padding: 0, marginBottom: 32, overflow: 'hidden' }}>
            <img
              src="/screenshots/potholejawn.jpg"
              alt="Full-viewport map of Philadelphia with over a thousand live open pothole reports as yellow dots and a floating 'Where to?' search pill"
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>

          {/* 01 TL;DR */}
          <Section title="TL;DR" sub="60-second summary">
            <p style={P}>
              potholejawn is navigation for Philadelphia that knows where the potholes are. The map opens on
              <Cyan> every open pothole report in the city right now</Cyan>. Type where you&apos;re going and it
              fetches the fastest routes, then <Cyan>re-plans the drive on its own street graph</Cyan> with every
              open report as a time penalty, verifies each route against the city&apos;s live data, and
              recommends one. Tap <Cyan>Start navigation</Cyan> and it drives you there: maneuver banner, voice,
              posted-limit speedometer, a heads-up for every reported pothole ahead, and an automatic smooth
              re-route when you leave the route.
            </p>
            <p style={P}>
              It started as a one-day build at the Code &amp; Coffee Philadelphia AI Agent Hackathon on
              September 20, 2026. That version could only <Dim>choose</Dim> between routes a time-optimal router
              offered. Since then it has been rebuilt into a product: its own router, live navigation, saved
              places, a redesigned interface, and a tested Google Cloud pipeline — <Cyan>60 tests</Cyan>, no API
              key or network needed to run them.
            </p>
          </Section>

          {/* 02 Why */}
          <Section title="Why it exists" sub="the data is public; the routing gap is real">
            <p style={P}>
              Mainstream routers optimise for time, and a time-optimal router like OSRM cannot avoid potholes: the
              best it can do is offer alternatives, and often every alternative runs down the same bad street. Meanwhile Philadelphia
              publishes every 311 request since 2014 — about 6 million rows — and in 2026 roughly
              <Cyan> 19% of pothole reports</Cyan> are still open, taking an average of 27 days to close. The
              data to route around them exists. Nothing was turning it into a drive.
            </p>
          </Section>

          {/* 03 Architecture */}
          <Section title="How a trip works" sub="plan our own route, grade it with the city's numbers">
            <Diagram />
            <p style={P}>
              The trip agent decides which tools to call and in what order, weighs pothole count, report age, and
              drive time, then explains its pick in plain language. Its steps stream to the panel live over
              <Cyan> Server-Sent Events</Cyan>, and <Cyan>&quot;How this route was chosen&quot;</Cyan> shows every
              lookup behind the result. When the model is unavailable, a plain-Python planner scores each route
              as minutes plus the same time value per report the router optimised with — so the recommendation
              always agrees with the plan.
            </p>
            <div className="panel" style={{ padding: 0, marginBottom: 18, overflow: 'hidden' }}>
              <img
                src="/screenshots/potholejawn-trip.jpg"
                alt="Desktop trip view: Temple University to Citizens Bank Park with three route cards — Fastest at 7 reported potholes, Alternative at 4, and the recommended Smoothest route at 0, all about 17 minutes — and the smooth route drawn in green on the map"
                style={{ display: 'block', width: '100%', height: 'auto' }}
                loading="lazy"
              />
            </div>
            <p style={{ ...P, marginBottom: 0 }}>
              Real result from live data: <Dim>Temple University → Citizens Bank Park</Dim> — the fastest route
              passes <Cyan>7 open pothole reports</Cyan>; the smooth route passes <Cyan>0</Cyan>, in the same
              17 minutes.
            </p>
          </Section>

          {/* 04 The smooth router */}
          <Section title="The smooth router" sub="why it stopped being a hackathon project">
            <p style={P}>
              Choosing the least-bad of someone else&apos;s routes was the hackathon&apos;s ceiling. Removing it
              meant routing on potholejawn&apos;s own copy of the city&apos;s streets:
            </p>
            <ul style={UL}>
              <li><Cyan>Street graph.</Cyan> Philadelphia&apos;s drivable network from OpenStreetMap, compacted to a 3 MB gzipped file — 64k intersections, 93k segments, one-way streets and posted speeds kept. It loads in a quarter of a second and ships inside the container.</li>
              <li><Cyan>Penalties from live data.</Cyan> Every open Street Defect report from the last 12 months is matched to the segments within 30 m and becomes a time penalty — 45 s on <Dim>Balanced</Dim>, 180 s on <Dim>Max avoidance</Dim> — weighted down as reports age. The set refreshes every 10 minutes.</li>
              <li><Cyan>Search.</Cyan> A* over travel time plus penalties, with turn-aware junction costs calibrated against OSRM on real Philly trips to within about 10%.</li>
              <li><Cyan>Make it legal.</Cyan> The graph path is snapped through OSRM via a handful of waypoints with bearings, so the route respects turn restrictions and comes back with real durations and turn-by-turn directions.</li>
              <li><Cyan>Verify.</Cyan> The smooth route is scanned with the exact same city-data query as every other route.</li>
            </ul>
          </Section>

          {/* 05 Live navigation */}
          <Section title="Live navigation" sub="in the spirit of Google Maps and Waze">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flex: '1 1 320px' }}>
                <p style={P}>
                  Navigation runs in the browser against the route&apos;s own geometry. Each GPS fix is snapped to
                  the line; the next maneuver drives the banner and the voice prompt; every reported pothole on the
                  route is announced when it is within 160 m ahead. Two fixes more than 45 m off the line trigger a
                  re-route: the smooth router runs again from your position — no model call, about a second — and
                  the new route takes over without leaving navigation.
                </p>
                <ul style={UL}>
                  <li>A <Cyan>speedometer</Cyan> with the posted limit read from the street graph&apos;s OpenStreetMap tags; it turns red when you are over.</li>
                  <li><Cyan>Alternatives from here</Cyan> — smooth, max avoidance, fastest — each scanned, switchable on tap.</li>
                  <li>Your <Cyan>vehicle and voice</Cyan>: seven top-down vehicle icons in eight colours, any English voice the device offers, haptic nudges before turns.</li>
                  <li>A <Cyan>night map</Cyan> from sunset to sunrise, route overview, and <Dim>Report a pothole here</Dim> to drop a pin for 311 after the drive.</li>
                  <li><Cyan>Saved places</Cyan> — Home, Work, favourites, recent trips — kept on your device, not on a server.</li>
                </ul>
                <p style={{ ...P, marginBottom: 0 }}>
                  <Dim>Preview drive</Dim> replays a route through the same code path, which is how navigation is
                  tested without a car.
                </p>
              </div>
              <div className="panel" style={{ padding: 0, overflow: 'hidden', flex: '0 1 280px', margin: '0 auto' }}>
                <img
                  src="/screenshots/potholejawn-mobile.jpg"
                  alt="Mobile navigation at night: a green maneuver banner reading 'Turn left onto North Broad Street (PA 611)', the vehicle icon on the route, a speedometer at 25 mph under a 30 limit, and the ETA bar"
                  style={{ display: 'block', width: '100%', height: 'auto' }}
                  loading="lazy"
                />
              </div>
            </div>
          </Section>

          {/* 06 Guardrails */}
          <Section title="Guardrails" sub="autonomy where it helps, hard rails where it matters">
            <Decision
              title="The router never grades its own homework."
              body="The smooth router plans with its own report matching, but the count you see always comes from the same PostGIS corridor query run against every route. The number on the smooth route is the city's number, not ours."
            />
            <Decision
              title="The model never writes the route SQL."
              body="The PostGIS route-scan query is built in plain Python from validated numbers only — the search radius is clamped to 10–100 m, and every coordinate must fall inside a Philadelphia bounding box. The agent chooses when to scan; it never chooses the SQL."
            />
            <Decision
              title="Every failure has a floor."
              body="No API key or a failed model call: a plain-Python planner produces the same pick and a simpler briefing. OSRM wanders or is down: the graph geometry is used as is. The agent skips a route: a completeness check scans it anyway. Re-routing mid-drive never waits on a model."
            />
            <Decision
              title="Honest framing beats impressive framing."
              body="Markers are resident reports, not verified potholes, and the UI says so. API data is inserted with textContent, never parsed as HTML; CDN assets are pinned with Subresource Integrity hashes; agent endpoints are rate limited per IP and globally; a run stops after 12 model turns."
            />
          </Section>

          {/* 07 Production */}
          <Section title="Production" sub="one Google Cloud project, nothing else">
            <ul style={UL}>
              <li><Cyan>Cloud Run</Cyan> serves the app with the street graph in memory; it scales to zero and carries both domains with managed certificates.</li>
              <li><Cyan>Cloud Build</Cyan> runs the test suite, builds the image, and rolls out the revision — a failing test never ships.</li>
              <li>The Anthropic key lives in <Cyan>Secret Manager</Cyan>, mounted at container start — never in the image, repo, or service config.</li>
              <li><Cyan>Prompt caching</Cyan> on the agent loop (later steps read the prompt prefix at ~10% price) and a <Cyan>one-hour trip-result cache</Cyan>, so a repeated route serves without a single model token.</li>
              <li>Installable to a phone home screen as a <Cyan>PWA</Cyan>.</li>
            </ul>
          </Section>

          {/* 08 Tests */}
          <Section title="Testing" sub="60 tests, zero API calls">
            <p style={P}>
              The suite runs against a <Cyan>fake model client</Cyan> and a <Cyan>synthetic street grid</Cyan> —
              no API key, no network. The tool loop, the A* router and its penalties, the SQL guardrails, the
              geofence, the fallback planner, and the route scanner are all exercised deterministically on every
              build.
            </p>
          </Section>

          {/* 09 Lessons */}
          <Section title="From hackathon to product" sub="what changed, and what transferred">
            <ul style={UL}>
              <li>The hackathon proved the data was useful; the product needed to <Dim>act</Dim> on it. Owning the router is what turned &quot;which of these routes is less bad&quot; into &quot;here is a route with none.&quot;</li>
              <li>Scope came off as well as on. The 311 analyst agent — an agent that wrote its own guarded SQL — was the most technical part of the demo, but it was not what a driver needs. It moved to the command line, and the interface became navigation only.</li>
              <li>Build the guardrails before the intelligence. The SQL cage, the geofence, and the deterministic fallback from day one are why every later feature was safe to ship.</li>
              <li>Keep the model off the hot path. The agent explains the pick; re-routing at 30 mph runs in plain Python in about a second.</li>
              <li>Verification is a product feature. Grading every route with the city&apos;s own query is what makes a &quot;0 reported&quot; claim worth trusting.</li>
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
  citywide pothole layer · "Where to?" pill · saved places · avoidance switch
       │
  your location → "Citizens Bank Park"
       │
       ▼
  TRIP AGENT (Claude + tools)          ── or the deterministic planner
       ├── geocode_address     US Census geocoder, OpenStreetMap fallback
       ├── find_routes         OSRM: fastest route plus alternatives (A, B)
       ├── find_smooth_route   our A* router on the street graph (S)
       │                       open 311 reports → time penalties
       ├── scan_route          PostGIS query on the city's live 311 API —
       │                       the same check for every route, ours included
       └── recommend_route     records the choice as structured output
       │
       ▼
  steps stream back live (SSE) → route cards · briefing · directions
       │
       ▼
  START NAVIGATION
  GPS snap · voice · speed limit · pothole-ahead alerts
  off route? → /api/navigate re-plans from here (no model call, ~1 s)
`}</pre>
    </div>
  );
}
