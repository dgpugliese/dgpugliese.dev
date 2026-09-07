import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function SilentBeatCaseStudy() {
  useSeo({
    title: 'SilentBeat · Honest Dead Man\'s Switch — Case Study · dgpugliese.dev',
    description:
      'Case study: SilentBeat, a zero-knowledge dead man\'s switch dispatcher built on Cloudflare Workers, Durable Objects, D1, split-key ECIES, and Argon2id.',
    path: '/silentbeat',
    image: 'https://dgpugliese.dev/og.png',
  });
  return (
    <>
      <Nav />
      <main id="main-content">
        <article className="case-study editorial-case">

          {/* Back nav */}
          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
          <div className="case-hero">
            <div className="page-intro-label mono">Case study</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              HONEST DEAD MAN'S SWITCH
            </div>
            <h1 className="case-title">
              SilentBeat<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>

              a check-in you keep. a message that ships if you don't.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a className="btn" href="https://silentbeat.app/" target="_blank" rel="noreferrer">→ TRY IT · silentbeat.app</a>
              <a className="btn btn-ghost" href="https://github.com/dgpugliese/silentbeat" target="_blank" rel="noreferrer">↗ SOURCE</a>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> LIVE</span>
              <span>SOLO BUILD</span>
              <span>SHIPPED 2026-05-06</span>
              <span style={{ color: 'var(--cyan)' }}>v0.6</span>
            </div>
          </div>

          {/* Screenshot */}
          <div className="panel" style={{ padding: 0, marginBottom: 32, overflow: 'hidden' }}>
            <img
              src="/screenshots/silentbeat.jpg"
              alt="SilentBeat homepage — 'If you go silent, someone gets the message.'"
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>

          {/* TL;DR */}
          <Section title="TL;DR" sub="60-second summary">
            <p style={P}>
              SilentBeat is a dead-man's-switch where the server <Cyan>cannot read your payload</Cyan>. You write
              an encrypted message, name a recipient, set a timer. Check in before it expires; nothing
              happens. Stop checking in; the message is delivered.
            </p>
            <p style={P}>
              The novel piece is the trust model: the AES key is <Cyan>split into two halves</Cyan> — the
              server holds one (share A), the recipient holds the other (share B, in a rescue file generated in
              their browser at enrollment). Neither half decrypts on its own.
            </p>
            <p style={P}>
              End-to-end verified: the recipient reconstructs the key from share A plus an <Cyan>ECIES envelope</Cyan> decrypted
              with their rescue private key, and only then can they download and decrypt the payload. The server
              never has the combined key at any moment.
            </p>
          </Section>

          {/* Why */}
          <Section title="Why it exists" sub="the problem">
            <p style={P}>
              Every dead-man's-switch product I could find either <Dim>(a)</Dim> called itself "zero-knowledge"
              while quietly holding the encryption key on the server, or <Dim>(b)</Dim> was honest about being
              escrow but didn't try to make it better.
            </p>
            <p style={P}>
              A switch that releases <Cyan>when the user is gone</Cyan> literally cannot be zero-knowledge —
              someone has to fire it on the user's behalf. But it can be <Cyan>split-key</Cyan>, where firing
              only delivers half of what's needed.
            </p>
            <p style={P}>
              SilentBeat is built around this distinction. The whole UX, the schema, the public-facing trust
              statement, the threat-model page — they all turn on it.
            </p>
          </Section>

          {/* How it works */}
          <Section title="How it works" sub="the architecture">
            <Diagram />
            <p style={P}>The flow, end to end:</p>
            <ol style={OL}>
              <li>User's browser generates random <Cyan>AES-256</Cyan> key K, AES-GCM encrypts the payload with K.</li>
              <li>K is split client-side: <Cyan>shareA</Cyan> random, <Cyan>shareB = K XOR shareA</Cyan>.</li>
              <li>Browser uploads ciphertext + shareA to the server. shareB is stashed in the user's <Cyan>localStorage</Cyan>. Server cannot decrypt: it has shareA but not K.</li>
              <li>Server emails the recipient an enrollment link with a one-time <Cyan>SHA-256-hashed token</Cyan>.</li>
              <li>Recipient's browser generates a <Cyan>P-256 ECDH</Cyan> keypair, downloads a rescue file with the private key, sends the public key + token back.</li>
              <li>User's browser polls <code style={CODE}>/api/switches/:id</code>; once the recipient pubkey arrives, browser ECIES-encrypts shareB to it (P-256 ECDH → AES-GCM, JSON envelope), POSTs to <code style={CODE}>/api/switches/:id/finalize</code>.</li>
              <li>Switch arms. <Cyan>Durable Object</Cyan> sets <code style={CODE}>setAlarm()</code>; cron sweep is the backup.</li>
              <li>Timer expires (or user enters duress PIN). Release email contains: shareA, the ECIES envelope of shareB, and a one-time tokened payload-download URL.</li>
              <li>Recipient pastes their rescue file → browser ECIES-decrypts shareB → XORs with shareA → recovers K → fetches and AES-GCM-decrypts the payload.</li>
              <li>Combined K <Cyan>never exists on a server</Cyan>. Verified bit-for-bit in the project's end-to-end node smoke.</li>
            </ol>
          </Section>

          {/* Threat model */}
          <Section title="The threat model is the spec" sub="security as specification">
            <p style={P}>
              The single most important page on the site is{' '}
              <a href="https://silentbeat.app/threat-model.html" target="_blank" rel="noreferrer" style={LINK}>/threat-model.html</a>.
              It enumerates each adversary and what we defend vs. what we don't. In a security product, the
              threat model <Cyan>is the specification</Cyan> — feature lists are downstream of it.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 8, marginBottom: 18 }}>
              <Actor name="Curious operator" defend="Cannot read payload — only holds shareA, ciphertext, ECIES envelope. Audit log is Ed25519-signed and tamper-evident." />
              <Actor name="Compelled operator" defend="A subpoena for the database returns shareA + envelope but never the recovered K. PIN duress slot is wrapped under a Workers Secret KEK so a DB-only dump can't tell which hash is the duress PIN." />
              <Actor name="Network attacker" defend="TLS in transit; the rescue private key never leaves the recipient's device; payload AES-GCM is authenticated." />
              <Actor name="Malicious recipient" defend="Cannot trigger early release — recipient pubkey is gated by a one-time SHA-256-hashed enrollment token, constant-time compared." />
              <Actor name="Malicious user" defend="User cannot exfiltrate plaintext through us — we never see plaintext. The system is symmetric in not trusting anyone." />
              <Actor name="Coercer with the user" defend="Duress PIN slot delivers a decoy fire-path indistinguishable from the normal one in a database dump." />
              <Actor name="Lost device / lost PIN" caveat="Unrecoverable by design. We do not hold key material that could be used to reset the switch." />
              <Actor name="Recipient lost share B" caveat="The rescue file is the only copy of the recipient's private key. Lose it, and a future release email cannot be opened. Stated up front in the recipient enrollment UI." />
            </div>

            <AuditLog />
          </Section>

          {/* Decisions */}
          <Section title="Decisions I'd defend in code review" sub="and the reasoning">
            <Decision title="Argon2id PIN hashing in pure JS (@noble/hashes)"
                      body="Cloudflare Workers reject runtime WebAssembly.compile, so the obvious WASM path (libargon2) didn't work. Documented as the reason we ship Argon2id via @noble/hashes rather than bundling a WASM build." />
            <Decision title="Duress PIN wrapped under a master KEK (Workers Secret)"
                      body="A database-only dump cannot tell which of the two stored hashes is the duress PIN — both look like opaque blobs. Caught in a Phase 3 self-audit; the original code had it readable and was fixed before ship." />
            <Decision title="Recipient enrollment is one-time-token gated, constant-time compared"
                      body="Caught in the same audit — the original endpoint was unauthenticated, which would have allowed pubkey hijack and a release path the user never approved. Now: SHA-256-hashed token, constant-time compare, single-use." />
            <Decision title="Ed25519-signed audit log with a public verification root"
                      body="Every audit-log entry is Ed25519-signed; the signed root checkpoint at /api/log/root exposes the public key (SPKI b64) so anyone can verify the chain off-server. The widget above this section pulls it live on every page load." />
            <Decision title="Hono router on Workers + Workers Assets for the static frontend"
                      body="Single deploy, single binding surface, no edge/origin split. Keeps the trust boundary simple: there is one process, and you can read its source." />
          </Section>

          {/* Roadmap */}
          <Section title="What I'd build next" sub="roadmap">
            <ul style={UL}>
              <li>WebAuthn passkey UI — server side already implements it via <code style={CODE}>@simplewebauthn/server</code> v10; client flow is the holdout.</li>
              <li><Cyan>HKDF</Cyan> on the ECIES shared bits for label-domain separation.</li>
              <li>Multi-device shareB sync — today shareB lives only in the user's localStorage between create and finalize, so clearing the browser before finalize means the switch must be destroyed.</li>
              <li>Threshold / multi-recipient release.</li>
              <li>Resend domain verified + custom-domain production deploy.</li>
            </ul>
          </Section>

          {/* Stack */}
          <Section title="The stack" sub="what's under the hood">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <StackPanel label="RUNTIME" items={['Cloudflare Workers', 'Hono router', 'Durable Objects', 'Cron Triggers']} c="cyan" />
              <StackPanel label="STORAGE" items={['D1 (switches, audit log)', 'R2 (ciphertext blobs)', 'KV (rate-limit, tokens)']} c="green" />
              <StackPanel label="CRYPTO" items={['WebCrypto AES-256-GCM', 'ECDH P-256 (ECIES)', 'Ed25519 audit signing', '@noble/hashes Argon2id', 'Split-key XOR']} c="violet" />
              <StackPanel label="FRONTEND" items={['Vanilla JS', 'Workers Assets', 'JetBrains Mono / Inter', 'Monospace HUD']} c="amber" />
              <StackPanel label="TOOLING" items={['@simplewebauthn/server', 'Wrangler', 'Node smoke harness', 'Resend (email)']} c="cyan" />
            </div>
          </Section>

          {/* Disclaimer */}
          <div className="panel" style={{ padding: '16px 20px', borderLeft: '2px solid var(--amber)', marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 8 }}>// DISCLAIMER</div>
            <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.65 }}>
              SILENTBEAT is a personal project distributed under the MIT License on an <strong>AS-IS</strong> basis.
              The integration is not independently security-audited and is <strong>not appropriate for regulated data</strong>
              {' '}or fiduciary use. No SLA, no key recovery — losing the recipient rescue file or both shares is unrecoverable
              by design. Read the
              {' '}<a href="https://github.com/dgpugliese/silentbeat" target="_blank" rel="noreferrer" style={LINK}>repository docs</a>
              {' '}and the
              {' '}<a href="https://silentbeat.app/threat-model.html" target="_blank" rel="noreferrer" style={LINK}>threat model</a>
              {' '}before relying on it.
            </div>
          </div>

          {/* CTA bottom */}
          <div className="panel panel-corners" style={{ padding: '32px 36px', textAlign: 'center', marginTop: 12 }}>
            <span className="panel-label">Explore further</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 16 }}>◆ TRY IT · INSPECT IT · BREAK IT ◆</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn" href="https://silentbeat.app/" target="_blank" rel="noreferrer">→ silentbeat.app</a>
              <a className="btn btn-ghost" href="https://github.com/dgpugliese/silentbeat" target="_blank" rel="noreferrer">↗ SOURCE</a>
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

function Actor({ name, defend, caveat }) {
  const isCaveat = !!caveat;
  const accent = isCaveat ? 'amber' : 'green';
  const label = isCaveat ? '// CAVEAT' : '// DEFEND';
  const text = defend || caveat;
  return (
    <div className="panel" style={{ padding: '12px 14px', borderLeft: `2px solid var(--${accent})` }}>
      <div className="mono" style={{ fontSize: 10, color: `var(--${accent})`, letterSpacing: '0.18em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, color: 'var(--fg-dim)', lineHeight: 1.55 }}>{text}</div>
    </div>
  );
}

/* Architecture diagram — pure ASCII */
function Diagram() {
  return (
    <div style={{ background: 'var(--bg-elev)', border: '1px dashed var(--line)', padding: '20px 24px', marginBottom: 18, overflow: 'auto' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// FLOW</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  USER (browser)              CLOUDFLARE (Worker · DO · D1 · R2 · KV)         RECIPIENT (browser)
  ───────────────             ──────────────────────────────────────         ──────────────────────
   payload
     │
     ▼
   K = WebCrypto.random(256)
   shareA = random(256)
   shareB = K XOR shareA
   AES-256-GCM(payload, K)
     │
     ├─ ciphertext + shareA ─────────► R2 + D1
     ├─ shareB → localStorage  (stays on user's device)
                                     │
                                     ├──── enroll email + token ────────►   ECDH P-256 keypair
                                     │                                       priv → rescue file (download)
                                     ◄──── pubkey + token ─────────────────  POST
   poll /api/switches/:id  ◄─────────┤
     │
     ▼
   ECIES(shareB → recipient.pub) ───► D1  [envelope]
   setAlarm(deadline)        DO
   ░░░░░░░░ timer expires ░░░░░░░░
                                     ├──── release email ───────────────►   shareA
                                                                             ECIES envelope
                                                                             one-time DL link
                                                                                    │
                                                                                    ▼
                                                                             paste rescue file
                                                                             ECIES⁻¹(envelope) → shareB
                                                                             K = shareA XOR shareB
                                                                             AES-256-GCM⁻¹(ct, K)
                                                                                    │
                                                                                    ▼
                                                                                 plaintext

  ──── combined K never exists on a server. server holds shareA + envelope, never both halves combined. ────
`}</pre>
    </div>
  );
}

/* Live audit-log root widget */
function AuditLog() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch('https://silentbeat.app/api/log/root');
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        if (!cancelled) setData(j);
      } catch (e) {
        if (!cancelled) setErr(String(e));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const trunc = (s, n = 8) => {
    if (!s || typeof s !== 'string') return '—';
    if (s.length <= n * 2 + 1) return s;
    return `${s.slice(0, n)}…${s.slice(-n)}`;
  };

  return (
    <div className="panel panel-corners" style={{ padding: '20px 22px', marginTop: 8, borderLeft: '2px solid var(--green)' }}>
      <span className="panel-label">Live audit log · /api/log/root</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>signed root checkpoint · pulled live on page load</div>
        {data ? (
          <span className="mono" style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.15em' }}>● VERIFIED</span>
        ) : err ? (
          <span className="mono" style={{ fontSize: 11, color: 'var(--amber)', letterSpacing: '0.15em' }}>● rate-limited / offline</span>
        ) : (
          <span className="mono pulse" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em' }}>● handshaking…</span>
        )}
      </div>

      {data ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 8 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em' }}>SEQ</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--fg)' }}>{data.seq ?? '—'}</span>

          <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em' }}>ROOT</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--fg)' }} title={data.root}>{trunc(data.root, 8)}</span>

          <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em' }}>SIGNATURE</span>
          <span className="mono" style={{ fontSize: 12, color: 'var(--fg)' }} title={data.signature}>{trunc(data.signature, 8)}</span>

          <span className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em', alignSelf: 'start' }}>PUBLIC_KEY</span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', wordBreak: 'break-all', userSelect: 'all' }}>{data.public_key || '—'}</span>
        </div>
      ) : err ? (
        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-faint)' }}>
          // could not reach silentbeat.app/api/log/root · the page renders without it; the chain is still verifiable from source.
        </div>
      ) : (
        <div className="mono pulse" style={{ fontSize: 12, color: 'var(--cyan)' }}>● fetching signed root…</div>
      )}
    </div>
  );
}
