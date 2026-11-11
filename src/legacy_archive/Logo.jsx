/**
 * CHILL TECH LTD — Official Logo Component
 * Uses the real brand image supplied by the client.
 *
 * SETUP: Place your logo image at:
 *   public/logo.jpg
 * Vite serves the public/ folder at the root URL, so no JS import is needed.
 *
 * Props:
 *  - width        : rendered image width in px (default 160)
 *  - withWordmark : kept for API compatibility, ignored (image includes text)
 *  - className    : extra class names
 *  - style        : inline style overrides
 *  - dark         : if true, applies a glow drop-shadow for dark backgrounds
 */
import logoSrc from '../assets/chill-tech-logo.jpeg';

export default function Logo({
  width = 160,
  // Legacy props — kept so existing <Logo size={n} withWordmark … /> calls don't break
  size,
  withWordmark,
  withMotto,
  className = '',
  style = {},
  dark = false,
}) {
  // Honour the old `size` prop by mapping it to a sensible pixel width
  const resolvedWidth = size ? Math.round(size * 4.2) : width;

  return (
    <img
      src={logoSrc}
      alt="CHILL TECH LTD — Innovate. Build. Empower."
      className={`chill-logo-img ${className}`}
      style={{
        width: resolvedWidth,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
        // On dark backgrounds: boost brightness so the white-bg logo doesn't feel flat;
        // The mix-blend-mode trick removes the white square on modern browsers.
        filter: dark
          ? 'brightness(1) drop-shadow(0 0 12px rgba(0,229,255,0.5))'
          : 'none',
        mixBlendMode: dark ? 'screen' : 'normal',
        borderRadius: 12,
        ...style,
      }}
      draggable={false}
    />
  );
}
