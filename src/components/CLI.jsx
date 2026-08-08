import { useEffect, useRef, useState } from 'react';

const HELP = `available commands:
  help            this message
  whoami          who is the operator
  ls              list site sections
  cat <file>      read a file (try: about.md, resume.md, contact.md)
  nav <section>   jump to section (home, about, stack, ops, log, git, cert, tx)
  open <link>     open a link (github, linkedin, credly, mail)
  sudo <...>      try it
  clear           clear the terminal
  exit            close (or press Esc)

tip: press \` (backtick) anytime to toggle this terminal.`;

const WHOAMI = `david pugliese · operator · class-A clearance
location: philadelphia, pa
clearance level: full-stack ↔ infra ↔ identity`;

const FILES = {
  'about.md': `IT Director, Lead Solutions Architect, and founder of The IT Visionary.
16+ years across enterprise infrastructure, cybersecurity, cloud platforms, and software development.
Building resilient systems, secure workflows, and practical technology that ships.`,
  'resume.md': `feb 2024 — present  · director of IT       (current)
jul 2023 — feb 2024  · IT manager           ergos technology partners
apr 2022 — jul 2023  · lead PSE             SWK technologies
aug 2018 — apr 2022  · network engineer     moving forward IT
aug 2018 — present   · director of IT       bensalem VFD (volunteer)
full timeline: scroll to /log`,
  'contact.md': `email     dp@dgpugliese.dev
linkedin  linkedin.com/in/dgpugliese
github    github.com/dgpugliese
credly    credly.com/users/dpugliese`,
};

const SECTIONS = {
  home: 'home', about: 'about', stack: 'stack', ops: 'projects',
  projects: 'projects', log: 'resume', resume: 'resume',
  press: 'press', speaking: 'press',
  git: 'github', github: 'github', cert: 'certs', certs: 'certs',
  tx: 'contact', contact: 'contact',
};

const LINKS = {
  github: 'https://github.com/dgpugliese',
  linkedin: 'https://linkedin.com/in/dgpugliese',
  credly: 'https://credly.com/users/dpugliese',
  mail: 'mailto:dp@dgpugliese.dev',
};

function run(input) {
  const line = input.trim();
  if (!line) return null;
  const [cmd, ...rest] = line.split(/\s+/);
  const arg = rest.join(' ');

  switch (cmd.toLowerCase()) {
    case 'help': return HELP;
    case 'whoami': return WHOAMI;
    case 'ls': return 'home  about  stack  ops  log  press  git  cert  tx';
    case 'cat': {
      const f = arg.replace(/^\.?\//, '');
      return FILES[f] || `cat: ${arg || '<file>'}: no such file. try: ${Object.keys(FILES).join(', ')}`;
    }
    case 'nav': {
      const target = SECTIONS[arg.toLowerCase()];
      if (!target) return `nav: unknown section '${arg}'. options: ${Object.keys(SECTIONS).join(', ')}`;
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }));
      return `[scrolling to /${arg}]`;
    }
    case 'open': {
      const url = LINKS[arg.toLowerCase()];
      if (!url) return `open: unknown target '${arg}'. options: ${Object.keys(LINKS).join(', ')}`;
      window.open(url, '_blank', 'noreferrer');
      return `[opening ${arg}...]`;
    }
    case 'sudo':
      if (arg.toLowerCase().includes('sandwich')) return 'permission denied: try harder.';
      return `[sudo] password for operator: ********\nsorry, operator is not in the sudoers file. this incident will be reported.`;
    case 'clear': return '__CLEAR__';
    case 'exit': case 'quit': case 'q': return '__EXIT__';
    case 'echo': return arg;
    case 'date': return new Date().toString();
    case 'rm':
      if (arg.includes('-rf') && arg.includes('/')) return 'nice try.';
      return `rm: cannot remove '${arg || ''}': operation not permitted`;
    default:
      return `command not found: ${cmd}. type 'help'.`;
  }
}

export function CLI() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([
    { kind: 'sys', text: 'dgpugliese.dev shell · v2.6.0\ntype \'help\' for commands. esc to close.' },
  ]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Global toggle: backtick (`) opens; Esc closes
  useEffect(() => {
    const onKey = (e) => {
      const target = e.target;
      const inField = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (e.key === '`' && !inField) {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, open]);

  const submit = (e) => {
    e.preventDefault();
    const out = run(value);
    if (out === '__CLEAR__') {
      setHistory([]);
    } else if (out === '__EXIT__') {
      setOpen(false);
    } else if (out !== null) {
      setHistory(h => [...h, { kind: 'in', text: value }, { kind: 'out', text: out }]);
    }
    setValue('');
  };

  if (!open) return null;
  return (
    <div role="dialog" aria-label="terminal" style={{
      position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 200,
      maxWidth: 720, margin: '0 auto',
      background: 'rgba(5, 8, 16, 0.96)',
      border: '1px solid var(--cyan)',
      boxShadow: '0 0 24px rgba(78, 201, 224, 0.35)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'JetBrains Mono, monospace',
      color: 'var(--fg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 14px', borderBottom: '1px solid var(--line)',
                    fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.18em' }}>
        <span>// operator@dgpugliese ~ %</span>
        <button onClick={() => setOpen(false)} aria-label="close" style={{
          background: 'transparent', border: 'none', color: 'var(--fg-faint)',
          cursor: 'pointer', fontSize: 14, fontFamily: 'inherit',
        }}>×</button>
      </div>
      <div ref={bodyRef} style={{
        padding: '12px 16px', fontSize: 12, lineHeight: 1.55,
        maxHeight: 320, minHeight: 140, overflowY: 'auto',
      }}>
        {history.map((h, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', marginBottom: 6,
                                color: h.kind === 'sys' ? 'var(--fg-dim)'
                                     : h.kind === 'in' ? 'var(--fg)' : 'var(--cyan)' }}>
            {h.kind === 'in' ? <><span style={{ color: 'var(--green)' }}>{'> '}</span>{h.text}</> : h.text}
          </div>
        ))}
        <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ color: 'var(--green)' }}>{'>'}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--fg)', fontFamily: 'inherit', fontSize: 12, caretColor: 'var(--cyan)',
            }}
          />
        </form>
      </div>
    </div>
  );
}
