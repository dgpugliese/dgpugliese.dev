import { useEffect, useRef, useState } from 'react';

const lines = [
  ['$ think --systems', true],
  ['  architecture → implementation', false],
  ['$ build --with-intent', true],
  ['  security · software · infrastructure', false],
  ['$ ship --end-to-end', true],
  ['  ideas become working systems.', false],
];
const total = lines.reduce((n, [text]) => n + text.length, 0);

export function TerminalAtmosphere() {
  const root = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let count = 0;
    let visible = false;
    const stop = () => { clearInterval(timer); timer = undefined; };
    const sync = () => {
      stop();
      if (motion.matches) { count = total; setProgress(total); return; }
      if (!visible || document.hidden || count >= total) return;
      timer = setInterval(() => {
        count = Math.min(total, count + 1);
        setProgress(count);
        if (count >= total) stop();
      }, 22);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(root.current);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => { stop(); observer.disconnect(); motion.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, []);
  let offset = 0;
  return (
    <div className="terminal-atmosphere" ref={root} aria-hidden="true">
      <div className="terminal-grid" />
      <div className="terminal-script">
        <div className="terminal-heading">~/from-idea-to-production</div>
        {lines.map(([text, command], index) => {
          const amount = Math.max(0, Math.min(text.length, progress - offset));
          const active = progress >= offset && progress < offset + text.length;
          const finalLine = index === lines.length - 1;
          const visibleText = text.slice(0, amount);
          offset += text.length;
          return <div key={index} className={command ? 'terminal-command' : 'terminal-response'}>{finalLine && amount === text.length ? <>{visibleText.slice(0, -1)}<span className="terminal-period" /></> : visibleText}{active && <span className="terminal-caret" />}</div>;
        })}
      </div>
    </div>
  );
}
