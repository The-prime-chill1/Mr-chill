import { FiArrowDown, FiEye, FiDownload } from 'react-icons/fi';
import { SiReact, SiJavascript, SiNodedotjs, SiFigma } from 'react-icons/si';
import StarBorder from './reactbits/StarBorder';
import { profile, stats } from '../data';
import logoImg from '../assets/chill-tech-logo.jpeg';

export default function Hero({ onDownloadCV, onViewCV, cvUrl }) {
  // 4 Static Tech Icons around the logo ring
  const techOrbits = [
    { icon: SiReact,      color: '#00c2ff', top: '10%', left: '-22%' },
    { icon: SiJavascript, color: '#f7df1e', top: '70%', left: '-25%' },
    { icon: SiNodedotjs,  color: '#22c55e', top: '10%', right: '-22%' },
    { icon: SiFigma,      color: '#a855f7', top: '70%', right: '-25%' },
  ];

  return (
    <section
      id="top"
      className="floating-card hero-section"
      style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    >

      {/* Main Content */}
      <div className="hero-inner">

        {/* Availability Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Available for New Projects</span>
        </div>

        {/* Central Logo Ring with Orbit Icons */}
        <div className="hero-logo-ring">
          {techOrbits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="hero-orbit-icon-item"
                style={{
                  position: 'absolute',
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(12, 18, 34, 0.9)',
                  border: `1px solid ${item.color}55`,
                  boxShadow: `0 0 16px ${item.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  fontSize: '1.1rem',
                  zIndex: 3,
                }}
              >
                <IconComponent />
              </div>
            );
          })}

          {/* Outer Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--electric-blue), var(--cyan), var(--purple))',
              filter: 'blur(1px)',
              opacity: 0.8,
            }}
          />

          {/* Inner White Logo Box */}
          <div
            style={{
              position: 'absolute',
              inset: 4,
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 194, 255, 0.25)',
            }}
          >
            <img
              src={logoImg}
              alt="CHILL TECH LTD"
              style={{ width: '88%', height: '88%', objectFit: 'contain', borderRadius: 10 }}
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Hi, I'm <span className="gradient-text">MR CHILL</span>
        </h1>

        {/* Role Text */}
        <p className="hero-role">
          {profile.role || "Software Engineering Student • Web Developer • Technology Entrepreneur"}
        </p>

        {/* Bio Paragraph */}
        <p className="hero-bio">
          {profile.heroBio || "Software Engineering student at Aptech, Founder of CHILL TECH LTD, and General Manager at CHIL Investment Ltd — managing multi-million naira real estate portfolios while engineering modern, high-performance digital solutions across e-commerce, real estate, gadgets, and web tech."}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-row">
          <StarBorder as="a" href="#portfolio" color="#00c2ff" speed="4s" thickness={1.8}>
            View My Work
          </StarBorder>

          <a
            href="#/cv"
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <FiEye style={{ fontSize: '1.05rem' }} />
            Read CV
          </a>

          <button
            onClick={onDownloadCV}
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <FiDownload style={{ fontSize: '1.05rem' }} />
            Download CV
          </button>
        </div>

        {/* Stats Strip */}
        <div className="hero-stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="glass hero-stat-card">
              <div className="hero-stat-value">{s.value}{s.suffix}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#about" aria-label="Scroll Down" className="hero-scroll-hint">
        <FiArrowDown style={{ fontSize: '1.1rem' }} />
      </a>

      <style>{`
        /* ── Hero Layout ── */
        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(90px, 12vw, 120px) clamp(16px, 5vw, 48px) 32px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* ── Badge ── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.08);
          border: 1px solid rgba(0, 194, 255, 0.25);
          font-size: clamp(0.64rem, 2.5vw, 0.78rem);
          font-weight: 600;
          color: var(--electric-blue);
          margin-bottom: 24px;
          letter-spacing: 0.04em;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00c2ff;
          box-shadow: 0 0 8px #00c2ff;
          flex-shrink: 0;
        }

        /* ── Logo Ring ── */
        .hero-logo-ring {
          position: relative;
          width: clamp(110px, 28vw, 160px);
          height: clamp(110px, 28vw, 160px);
          margin-bottom: 24px;
          flex-shrink: 0;
        }

        /* ── Headline ── */
        .hero-headline {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.9rem, 6vw, 3.4rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          word-break: break-word;
          width: 100%;
        }

        /* ── Role ── */
        .hero-role {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(0.85rem, 2.8vw, 1.25rem);
          color: var(--cyan);
          margin-top: 10px;
          letter-spacing: 0.02em;
          width: 100%;
        }

        /* ── Bio ── */
        .hero-bio {
          color: var(--text-dim);
          max-width: 560px;
          width: 100%;
          margin-top: 16px;
          line-height: 1.7;
          font-size: clamp(0.88rem, 2.5vw, 1.02rem);
          word-break: break-word;
        }

        /* ── CTA Row ── */
        .hero-cta-row {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        /* ── Stats Grid ── */
        .hero-stats-grid {
          margin-top: 36px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .hero-stat-card {
          padding: 16px 10px;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hero-stat-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.1rem, 3vw, 1.6rem);
          color: var(--electric-blue);
        }
        .hero-stat-label {
          font-size: clamp(0.62rem, 1.8vw, 0.78rem);
          color: var(--text-dim);
          margin-top: 4px;
          line-height: 1.3;
        }

        /* ── Scroll hint ── */
        .hero-scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-dim);
          font-size: 0.75rem;
          padding-bottom: 20px;
          transition: color 0.2s ease;
        }

        /* ── RESPONSIVE ── */

        /* Tablet: 2-col stats */
        @media (max-width: 700px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }

        /* Mobile ≤ 540px */
        @media (max-width: 540px) {
          .hero-orbit-icon-item { display: none; }
          .hero-cta-row {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 100%;
          }
          .hero-cta-row > * {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          .hero-badge {
            font-size: 0.64rem;
            padding: 5px 12px;
          }
          .hero-inner {
            padding-top: 32px;
            padding-bottom: 24px;
          }
        }

        /* Very small phones ≤ 380px */
        @media (max-width: 380px) {
          .hero-headline {
            font-size: 1.7rem;
          }
          .hero-role {
            font-size: 0.82rem;
          }
          .hero-bio {
            font-size: 0.84rem;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hero-stat-card {
            padding: 12px 6px;
          }
          .hero-stat-value {
            font-size: 1.1rem;
          }
          .hero-stat-label {
            font-size: 0.58rem;
          }
        }
      `}</style>
    </section>
  );
}

