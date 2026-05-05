import { Link } from 'react-router-dom';
import { Starfield, Clock } from '../components/fx.jsx';

export default function ObscuraCaseStudy() {
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
        <span>SYS / DGPUGLIESE.DEV / CASE_STUDY · OBSCURA</span>
        <div className="right">
          <span><Clock /></span>
          <span style={{ color: 'var(--green)' }}>● ZERO-KNOWLEDGE</span>
        </div>
      </div>

      <main style={{ marginLeft: 0, marginTop: 36, position: 'relative', zIndex: 10 }}>
        <article className="sect" style={{ maxWidth: 980, margin: '0 auto', padding: '60px 32px 120px' }}>

          {/* Back nav */}
          <Link to="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--cyan)', textDecoration: 'none', letterSpacing: '0.15em', display: 'inline-block', marginBottom: 32 }}>
            ← BACK TO PORTFOLIO
          </Link>

          {/* Hero */}
          <div className="panel panel-corners" style={{ padding: '40px 44px', marginBottom: 32 }}>
            <span className="panel-label">CASE_STUDY · OBSCURA</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 14 }}>
              ◢ ZERO-KNOWLEDGE FILE TRANSFER ◣
            </div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(48px, 8vw, 92px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em', margin: 0, color: 'var(--fg)' }}>
              OBSCURA<span style={{ color: 'var(--cyan)' }}>.</span>
            </h1>
            <div className="mono" style={{ fontSize: 16, marginTop: 16, color: 'var(--fg-dim)' }}>
              <span style={{ color: 'var(--cyan)' }}>&gt; </span>
              files encrypted in your browser. the server never sees your keys.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a className="btn" href="https://obscr.app/" target="_blank" rel="noreferrer">→ TRY IT · obscr.app</a>
              <a className="btn btn-ghost" href="https://github.com/dgpugliese/obscura" target="_blank" rel="noreferrer">↗ SOURCE</a>
            </div>
            <div className="mono" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 28, fontSize: 11, color: 'var(--fg-faint)', borderTop: '1px dashed var(--line)', paddingTop: 16, letterSpacing: '0.12em' }}>
              <span><span style={{ color: 'var(--green)' }}>●</span> LIVE</span>
              <span>SOLO BUILD</span>
              <span>SHIPPED 2026-05-05</span>
              <span style={{ color: 'var(--cyan)' }}>v1.0</span>
            </div>
          </div>

          {/* TL;DR */}
          <Section num="01" title="TL;DR" sub="60-second summary">
            <p style={P}>
              Obscura is a public, browser-only file transfer tool that encrypts your files with <Cyan>AES-256-GCM</Cyan> in
              the browser before they ever leave your device. The server only ever sees ciphertext. The key
              never reaches the server. You share a link (or QR code); the recipient unlocks it with a password
              you set. Files are <Cyan>ephemeral</Cyan> — they expire by design.
            </p>
            <p style={P}>
              I built it solo as a demonstrable, end-to-end answer to a question that comes up constantly in
              IT and security work: <Dim>"how do I send this sensitive file without trusting the host?"</Dim>
            </p>
          </Section>

          {/* Why */}
          <Section num="02" title="Why it exists" sub="the problem">
            <p style={P}>
              Every common file-share tool — WeTransfer, Dropbox links, Google Drive — assumes you trust the host.
              Hosts can read your file. Subpoenas can read your file. Breaches can read your file.
            </p>
            <p style={P}>
              For day-to-day attachments that doesn't matter. For legal documents, health records, security
              incident artifacts, or credentials in transit, it absolutely does. The standard answer in those
              situations is <Dim>"use Signal"</Dim> — but Signal isn't a file drop, requires installs and accounts,
              and doesn't fit cross-org workflows.
            </p>
            <p style={P}>
              Obscura is the gap-filler: zero-install, zero-account, browser-native, and zero-knowledge by
              design. The host is a dumb pipe. The cryptography is a primitive everyone can verify.
            </p>
          </Section>

          {/* How it works */}
          <Section num="03" title="How it works" sub="the architecture">
            <Diagram />
            <p style={P}>The flow, end to end:</p>
            <ol style={OL}>
              <li><Cyan>Sender drops a file</Cyan> + sets a password.</li>
              <li>Browser derives an encryption key from the password using <Cyan>Argon2id</Cyan> (memory-hard, modern KDF). Salt + parameters travel with the ciphertext, never the key.</li>
              <li>File is encrypted with <Cyan>AES-256-GCM</Cyan> (authenticated encryption — tampering breaks decryption) using the Web Crypto API.</li>
              <li>Ciphertext + public metadata uploaded to a Cloudflare-fronted store. Server only sees ciphertext.</li>
              <li>Browser produces a short share URL plus a <Cyan>QR code</Cyan> for mobile pickup.</li>
              <li>Recipient opens the link, enters the password, browser pulls ciphertext, derives the key, decrypts locally, downloads the plaintext.</li>
              <li>Files are <Cyan>ephemeral</Cyan> — pruned automatically after their TTL or on first successful retrieval.</li>
            </ol>
            <p style={P}>
              The crucial property: the password and the derived key never travel to the server. The host
              cannot decrypt the file even if compelled, breached, or curious. This is what "zero-knowledge"
              actually means here — not a marketing line.
            </p>
          </Section>

          {/* Stack */}
          <Section num="04" title="The stack" sub="what's under the hood">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <StackPanel label="FRONTEND" items={['React 18', 'JetBrains Mono / Inter', 'Vanilla CSS · monospace HUD']} c="cyan" />
              <StackPanel label="CRYPTOGRAPHY" items={['Web Crypto API', 'AES-256-GCM (AEAD)', 'Argon2id (KDF)']} c="violet" />
              <StackPanel label="DELIVERY" items={['QR code share-links', 'URL fragment key carrier', 'Ephemeral TTL on storage']} c="amber" />
              <StackPanel label="HOSTING" items={['Cloudflare Pages', 'Cloudflare edge storage', 'Custom domain · obscr.app']} c="green" />
            </div>
          </Section>

          {/* Design Decisions */}
          <Section num="05" title="Design decisions" sub="and the reasoning">
            <Decision title="Argon2id over PBKDF2 / bcrypt"
                      body="PBKDF2 is fine but old; bcrypt has password-length quirks. Argon2id is the modern memory-hard winner of the Password Hashing Competition and is the OWASP-recommended default. Slightly heavier in browser, worth it." />
            <Decision title="AES-256-GCM, not CBC + HMAC"
                      body="GCM gives authenticated encryption in one primitive — tampered ciphertext fails decryption rather than silently producing garbage. Lower footgun surface than rolling MAC-then-encrypt manually." />
            <Decision title="Password-based, not link-based key"
                      body="Many zero-knowledge clones put the key in the URL fragment (after #). That's fine, but it means anyone with the link decrypts. Password-based requires the recipient to actually possess a shared secret — better fit for the 'I'm sending this to a specific person' use case." />
            <Decision title="Ephemeral by default"
                      body="Files prune after TTL or first download. This isn't archival. Encouraging short retention makes the trust story simpler — even a hypothetically compromised host can only leak what's currently in flight." />
            <Decision title="Zero-account, zero-install"
                      body="Requiring sign-up would defeat the point. The whole transaction works in two browsers, zero state on either client." />
            <Decision title="QR code for mobile pickup"
                      body="Real-world scenario: encrypt a file at a desk, hand it off to a phone in the same room. Scanning a QR is faster than typing a URL and avoids the SMS-link footgun." />
          </Section>

          {/* Outcome */}
          <Section num="06" title="Outcome &amp; what's next" sub="the result">
            <p style={P}>
              Obscura is live at <a href="https://obscr.app/" target="_blank" rel="noreferrer" style={LINK}>obscr.app</a> and
              public-source at <a href="https://github.com/dgpugliese/obscura" target="_blank" rel="noreferrer" style={LINK}>github.com/dgpugliese/obscura</a>.
              Built solo, end-to-end, in days — frontend, cryptography choices, storage layer, hosting, branding.
            </p>
            <p style={P}>The interesting part wasn't the code; it was the <Cyan>system design</Cyan> — picking primitives that compose to "the host can't see your file" without leaning on a heavy framework or a third-party crypto SaaS. Roadmap:</p>
            <ul style={UL}>
              <li>Optional public-key recipient mode (recipient publishes a pubkey, sender encrypts to it — no shared password)</li>
              <li>File-size streaming (currently buffers; needs chunked AES-GCM for &gt;1GB)</li>
              <li>WebAuthn-gated unlocks for repeat recipients</li>
              <li>Self-hostable distribution as a single Docker image for orgs with strict data-residency rules</li>
            </ul>
            <p style={P}>If you're reading this and want one of these, or have an integration use case — <a href="mailto:dp@dgpugliese.dev" style={LINK}>dp@dgpugliese.dev</a>.</p>
          </Section>

          {/* CTA bottom */}
          <div className="panel panel-corners" style={{ padding: '32px 36px', textAlign: 'center', marginTop: 12 }}>
            <span className="panel-label">END_OF_TRANSMISSION</span>
            <div className="mono" style={{ fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.25em', marginBottom: 16 }}>◆ TRY IT · INSPECT IT · BREAK IT ◆</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a className="btn" href="https://obscr.app/" target="_blank" rel="noreferrer">→ obscr.app</a>
              <a className="btn btn-ghost" href="https://github.com/dgpugliese/obscura" target="_blank" rel="noreferrer">↗ SOURCE</a>
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

/* Architecture diagram — pure SVG */
function Diagram() {
  return (
    <div style={{ background: 'rgba(5, 8, 16, 0.5)', border: '1px dashed var(--line)', padding: '20px 24px', marginBottom: 18, overflow: 'auto' }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-faint)', letterSpacing: '0.2em', marginBottom: 12 }}>// FLOW</div>
      <pre className="mono" style={{ fontSize: 12, color: 'var(--fg)', lineHeight: 1.55, margin: 0, whiteSpace: 'pre' }}>{`
  SENDER (browser)                 CLOUDFLARE EDGE              RECIPIENT (browser)
  ────────────────                 ───────────────              ──────────────────
   file ──┐
          ▼
   Argon2id(password) ──► key
          │
          ▼
   AES-256-GCM(file, key) ──────► [ ciphertext ] ◄─── pull ────  fetch share URL
                                      │                                │
                                  TTL expiry                     enter password
                                      │                                ▼
                                      ▼                         Argon2id(password) ──► key
                                  pruned                                ▼
                                                                  AES-256-GCM⁻¹  ──► plaintext

  ───  the key is never transmitted. the server stores ciphertext + metadata only.  ───
`}</pre>
    </div>
  );
}
