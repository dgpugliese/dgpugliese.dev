// Decorative scrolling band between sections. The track holds the words twice
// so a -50% translate loops seamlessly; reduced-motion users get a static row.
export function Marquee({ words }) {
  const run = words.map((w) => <span key={w}>{w}<i>·</i></span>);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{run}{run}</div>
    </div>
  );
}
