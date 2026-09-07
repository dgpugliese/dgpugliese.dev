export function PageIntro({ label, title, accent, children, aside }) {
  return (
    <header className="page-intro">
      <div className="page-intro-label mono"><span className="sect-mark" aria-hidden="true" />{label}</div>
      <div className="page-intro-grid">
        <div><h1>{title}<br /><span>{accent}</span></h1><div className="page-intro-copy">{children}</div></div>
        {aside && <div className="page-intro-aside">{aside}</div>}
      </div>
    </header>
  );
}
