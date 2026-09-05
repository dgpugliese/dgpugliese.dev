import { Link } from 'react-router-dom';
import { Nav, Footer } from '../components/Layout.jsx';
import { useSeo } from '../lib/seo';

export default function ObscuraCaseStudy() {
  useSeo({
    title: 'Obscura · Zero-Knowledge File Transfer — Case Study · dgpugliese.dev',
    description:
      'Case study: Obscura, a browser-side zero-knowledge file transfer tool. AES-256-GCM, Argon2id, Web Crypto API. The server only ever sees ciphertext.',
    path: '/obscura',
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
              <span>50 MB · 7d TTL · 1/3/5/10 downloads</span>
              <a href="https://github.com/dgpugliese/obscura/releases" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>v0.1.2 ↗</a>
            </div>
          </div>

          {/* Screenshot */}
          <div className="panel" style={{ padding: 0, marginBottom: 32, overflow: 'hidden' }}>
            <img
              src="/screenshots/obscura.jpg"
              alt="Obscura homepage — 'Encrypt in the browser. Ship the ciphertext. Burn the link.'"
              style={{ display: 'block', width: '100%', height: 'auto' }}
              loading="lazy"
            />
          </div>

          {/* TL;DR */}
          <Section num="01" title="TL;DR" sub="60-second summary">
            <p style={P}>
              Obscura is a public, browser-only file transfer tool that encrypts your files with <Cyan>AES-256-GCM</Cyan> in
              the browser before they ever leave your device. The server only ever sees ciphertext, and the key
              never reaches the server. You share a link (or QR code); the recipient opens it and the file decrypts
              in their browser. Optional <Cyan>passphrase mode</Cyan> adds an out-of-band password wrap. Files are
              ephemeral — <Cyan>50 MB design ceiling, 64 MiB hard cap, 7-day max TTL</Cyan>, pruned by design.
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
              <li><Cyan>Sender drops a file</Cyan> (or pastes text) into the page. Browser generates a random 256-bit key via <Cyan>WebCrypto</Cyan>.</li>
              <li>File is encrypted in-browser with <Cyan>AES-256-GCM</Cyan> (authenticated encryption — tampering breaks decryption).</li>
              <li>Ciphertext is uploaded to a Cloudflare Worker, stored in <Cyan>R2</Cyan>; per-share metadata (TTL, remaining downloads, size) lands in <Cyan>KV</Cyan>. Server only ever sees ciphertext.</li>
              <li>The key stays in the URL fragment (<code style={CODE}>#k=…</code>), which browsers do not transmit to servers. Browser produces a short share URL plus a <Cyan>QR code</Cyan> for mobile pickup.</li>
              <li>Recipient opens the link, page fetches ciphertext, decrypts in-browser using the key from the fragment, downloads the plaintext.</li>
              <li>Files are <Cyan>ephemeral</Cyan> — Worker purges R2 ciphertext + KV metadata on TTL expiry, on read-count exhaustion, or on manual burn from the sender's Done screen.</li>
              <li>Optional <Cyan>passphrase mode</Cyan>: data key is wrapped under an Argon2id-derived KEK; recipient enters the passphrase out-of-band and the link no longer carries the key.</li>
            </ol>
            <p style={P}>
              The crucial property: the key never reaches the server in either mode. The host cannot decrypt
              the file even if compelled, breached, or curious. This is what "zero-knowledge" actually means
              here — not a marketing line.
            </p>
          </Section>

          {/* Stack */}
          <Section num="04" title="The stack" sub="what's under the hood">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <StackPanel label="FRONTEND" items={['React 18', 'Single app view', 'Vanilla CSS · monospace HUD']} c="cyan" />
              <StackPanel label="CRYPTOGRAPHY" items={['Web Crypto API', 'AES-256-GCM (AEAD)', 'Argon2id (KDF)']} c="violet" />
              <StackPanel label="DELIVERY" items={['QR code share-links', 'URL fragment key carrier', 'Ephemeral TTL on storage']} c="amber" />
              <StackPanel label="HOSTING" items={['Cloudflare Workers', 'R2 (ciphertext)', 'KV (TTL metadata)', 'Custom domain · obscr.app']} c="green" />
              <StackPanel label="PUBLIC LIMITS" items={['50 MB design ceiling', '64 MiB hard server cap', '1h-7d TTL', '1 / 3 / 5 / 10 downloads', 'No accounts', 'No regulated data']} c="amber" />
            </div>
          </Section>

          {/* Design Decisions */}
          <Section num="05" title="Design decisions" sub="and the reasoning">
            <Decision title="Argon2id over PBKDF2 / bcrypt"
                      body="PBKDF2 is fine but old; bcrypt has password-length quirks. Argon2id is the modern memory-hard winner of the Password Hashing Competition and is the OWASP-recommended default. Slightly heavier in browser, worth it." />
            <Decision title="AES-256-GCM, not CBC + HMAC"
                      body="GCM gives authenticated encryption in one primitive — tampered ciphertext fails decryption rather than silently producing garbage. Lower footgun surface than rolling MAC-then-encrypt manually." />
            <Decision title="Default link-fragment key, optional passphrase wrap"
                      body="Default mode puts the random data key in the URL fragment (#k=…). Browsers don't transmit fragments, so the server never sees it — anyone with the link can decrypt, which is the correct trust model for 'send a link to one person.' Passphrase mode wraps the data key under an Argon2id-derived KEK so the link alone isn't enough; the recipient also needs the out-of-band passphrase. Two distinct trust models, one toggle." />
            <Decision title="Ephemeral by default"
                      body="Files prune after TTL or first download. This isn't archival. Encouraging short retention makes the trust story simpler — even a hypothetically compromised host can only leak what's currently in flight." />
            <Decision title="Zero-account, zero-install"
                      body="Requiring sign-up would defeat the point. The whole transaction works in two browsers, zero state on either client." />
            <Decision title="QR code for mobile pickup"
                      body="Real-world scenario: encrypt a file at a desk, hand it off to a phone in the same room. Scanning a QR is faster than typing a URL and avoids the SMS-link footgun." />
          </Section>

          {/* Trust posture */}
          <Section num="06" title="Trust posture is the product" sub="verifiable, not theoretical">
            <p style={P}>
              "Zero-knowledge" is a marketing word until the operator gives you a way to check. The unified Trust Center and
              public repo make Obscura's claim easier to audit:
            </p>
            <ul style={UL}>
              <li><a href="https://obscr.app/transparency.html" target="_blank" rel="noreferrer" style={LINK}>Trust Center</a> — one page for aggregate counters, 30-day service status, privacy posture, security policy, abuse reporting, and support. Legacy /status, /privacy, and /support URLs now land on the matching Trust Center sections.</li>
              <li><Cyan>Aggregate counters only</Cyan>: uploads, manual burns, TTL expirations, and exhausted shares. No per-share data, no IPs, no filenames in the app counters.</li>
              <li><Cyan>Privacy posture is explicit</Cyan>: the app stores ciphertext, TTL, and read counts; Cloudflare can still retain platform request logs, including IPs and paths, under its own retention model.</li>
            </ul>
            <p style={P}>
              Repo posture matches: branch protection on <code style={CODE}>main</code>, release-tag ruleset, Dependabot,
              secret-scanning push protection. MIT-licensed, ~108 KB of source — you can read every line in an
              evening. Trust is something you build by making yourself easy to check.
            </p>
          </Section>

          {/* What it isn't */}
          <Section num="07" title="What it isn't" sub="the honest gap">
            <p style={P}>
              Obscura's wedge is <Cyan>anonymity-by-default and source-you-can-read</Cyan>. It is intentionally
              not an enterprise tool. The honest gap vs. commercial competitors:
            </p>
            <ul style={UL}>
              <li><Cyan>No third-party security audit yet.</Cyan> Roadmap, not funded.</li>
              <li><Cyan>50 MB design ceiling, 64 MiB hard cap.</Cyan> Tresorit Send: 5 GB. Bitwarden Send: 100 MB. Obscura optimizes for ephemeral, not archival.</li>
              <li><Cyan>No SOC 2, no BAA.</Cyan> Not appropriate for HIPAA / PCI / CJIS / classified.</li>
              <li><Cyan>No SLA, no key recovery, no accounts.</Cyan> Provided AS IS under MIT.</li>
              <li><Cyan>No per-recipient audit trail.</Cyan> Trust model is "send link to one person you trust," not "regulated workflow with non-repudiation."</li>
            </ul>
            <p style={P}>
              Tresorit Send and Bitwarden Send win on enterprise parity. Obscura wins on
              <Cyan> anonymous, ephemeral, audit-the-code-yourself</Cyan>. Different lanes, on purpose.
            </p>
          </Section>

          {/* Shipped with Claude Code */}
          <Section num="08" title="Shipped with Claude Code" sub="AI as engineering partner">
            <p style={P}>
              Designed in Claude. Frontend and Cloudflare Worker written collaboratively in <Cyan>Claude Code</Cyan>.
              Cloudflare resources (Workers, R2, KV, custom domain) provisioned through the
              <Cyan> Cloudflare MCP</Cyan>. Security review pass done with the same toolchain.
            </p>
            <p style={P}>
              End-to-end in days, not weeks. AI as a serious engineering partner, not a code-completion toy.
            </p>
          </Section>

          {/* Outcome */}
          <Section num="09" title="Outcome &amp; what's next" sub="the result">
            <p style={P}>
              Obscura is live at <a href="https://obscr.app/" target="_blank" rel="noreferrer" style={LINK}>obscr.app</a> and
              public-source at <a href="https://github.com/dgpugliese/obscura" target="_blank" rel="noreferrer" style={LINK}>github.com/dgpugliese/obscura</a>.
              Free, ad-free; donations optional via <a href="https://buymeacoffee.com/dgpugliese" target="_blank" rel="noreferrer" style={LINK}>Buy Me a Coffee</a>.
              Built solo, end-to-end, in days — frontend, cryptography choices, storage layer, hosting, branding, trust scaffolding.
            </p>
            <p style={P}>The interesting part wasn't the code; it was the <Cyan>system design</Cyan> — picking primitives that compose to "the host can't see your file" without leaning on a heavy framework or a third-party crypto SaaS. Roadmap:</p>
            <ul style={UL}>
              <li>Optional public-key recipient mode (recipient publishes a pubkey, sender encrypts to it — no shared password)</li>
              <li>File-size streaming (currently buffers; needs chunked AES-GCM for &gt;1GB)</li>
              <li>WebAuthn-gated unlocks for repeat recipients</li>
              <li>Anonymous paid transfer-limit tokens for larger ephemeral sends</li>
              <li>Self-hostable distribution as a single Docker image for orgs with strict data-residency rules</li>
            </ul>
            <p style={P}>If you're reading this and want one of these, or have an integration use case — <a href="mailto:dp@dgpugliese.dev" style={LINK}>dp@dgpugliese.dev</a>.</p>
          </Section>

          {/* Disclaimer */}
          <div className="panel" style={{ padding: '16px 20px', borderLeft: '2px solid var(--amber)', marginBottom: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 8 }}>// DISCLAIMER</div>
            <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.65 }}>
              OBSCURA is a personal project distributed under the MIT License on an <strong>AS-IS</strong> basis.
              The integration is not independently security-audited and is <strong>not appropriate for regulated data</strong>
              (HIPAA / PCI / CJIS / classified). No SLA, no key recovery. Read the
              {' '}<a href="https://github.com/dgpugliese/obscura/blob/main/DISCLAIMER.md" target="_blank" rel="noreferrer" style={LINK}>full disclaimer</a> and
              {' '}<a href="https://github.com/dgpugliese/obscura/blob/main/PRIVACY.md" target="_blank" rel="noreferrer" style={LINK}>privacy policy</a> before relying on it.
            </div>
          </div>

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
  SENDER (browser)              CLOUDFLARE WORKER              RECIPIENT (browser)
  ────────────────              ─────────────────              ──────────────────
   file
     │
     ▼
   key = WebCrypto.random(256)
     │
     ▼
   AES-256-GCM(file, key) ───► R2     [ ciphertext ]   ◄── GET ──   fetch share URL
                              KV     { ttl, reads,                       │
                                       size, createdAt }                key from #k=…
                                          │                              ▼
                                     TTL/reads expiry             AES-256-GCM⁻¹(ct, key)
                                          │                              ▼
                                       pruned                       plaintext

   share URL: https://obscr.app/#k=<base64>      ← fragment never sent to server

  ────  optional passphrase mode wraps the key under Argon2id(passphrase) before share  ────
`}</pre>
    </div>
  );
}
