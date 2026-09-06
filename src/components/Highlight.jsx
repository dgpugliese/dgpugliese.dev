export function Highlight({ children }) {
  return (
    <span className="hero-highlight">
      {children}
      <svg className="brush-stroke" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M4 16 C 30 4, 55 22, 85 12 S 140 4, 170 14 S 210 18, 216 10" />
      </svg>
    </span>
  );
}
