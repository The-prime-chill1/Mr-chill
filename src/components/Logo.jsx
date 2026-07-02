// Bespoke CHILL TECH mark: a skyline chevron fused with a circuit node,
// reading as both a building silhouette (real estate) and a play/forward
// arrow (momentum, tech). Built to work at favicon size and full wordmark size.
export default function Logo({ size = 34, withWordmark = true, className = '' }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ctGrad" x1="4" y1="42" x2="44" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2f8dff" />
            <stop offset="100%" stopColor="#5b6ee8" />
          </linearGradient>
          <linearGradient id="ctGradSoft" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5b6ee8" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <rect x="1" y="1" width="46" height="46" rx="13" fill="#0d0d0d" stroke="url(#ctGradSoft)" strokeWidth="1.4" />

        {/* Skyline steps — three ascending bars reading as buildings */}
        <rect x="10" y="26" width="6" height="12" rx="1.4" fill="url(#ctGrad)" opacity="0.85" />
        <rect x="18" y="19" width="6" height="19" rx="1.4" fill="url(#ctGrad)" />
        <rect x="26" y="12" width="6" height="26" rx="1.4" fill="url(#ctGrad)" opacity="0.85" />

        {/* Forward chevron / signal node — the "tech" momentum mark */}
        <path
          d="M34 14 L40.5 20.5 L34 27"
          stroke="url(#ctGrad)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="40.5" cy="20.5" r="1.8" fill="#2f8dff" />
      </svg>

      {withWordmark && (
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.02em' }}>
          CHILL<span className="gradient-text">TECH</span>
        </span>
      )}
    </span>
  );
}
