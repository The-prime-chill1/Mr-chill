import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { SiReact, SiJavascript, SiNodedotjs, SiFigma } from 'react-icons/si';
import StarBorder from './reactbits/StarBorder';
import { profile, stats } from '../data';
import logoImg from '../assets/chill-tech-logo.jpeg';
import TechCanvasBg from './TechCanvasBg';

function useTypewriter(text, speed = 40, startDelay = 500) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    let timeout;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setDisplay(text.slice(0, i));
        if (i < text.length) timeout = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return display;
}

export default function Hero({ onDownloadCV }) {
  const role = useTypewriter('General Manager & Web Developer', 35, 600);

  const techOrbits = [
    { icon: SiReact,      color: '#00c2ff', top: '10%', left: '-22%',  delay: 0 },
    { icon: SiJavascript, color: '#f7df1e', top: '70%', left: '-25%',  delay: 1 },
    { icon: SiNodedotjs,  color: '#22c55e', top: '10%', right: '-22%', delay: 0.5 },
    { icon: SiFigma,      color: '#a855f7', top: '70%', right: '-25%', delay: 1.5 },
  ];

  return (
    <section
      id="top"
      className="floating-card hero-section"
      style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Interactive Tech Canvas Background Animation */}
      <TechCanvasBg />

      {/* Background Radial Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 194, 255, 0.18) 0%, rgba(129, 140, 248, 0.08) 45%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid Pattern Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 40%, #000 70%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content */}
      <div className="hero-inner">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
        >
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Available for New Projects</span>
        </motion.div>

        {/* Central Logo Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="hero-logo-ring"
        >
          {/* Orbiting Icons — hidden on small mobile via CSS */}
          {techOrbits.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
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
                  border: `1px solid ${item.color}44`,
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
              </motion.div>
            );
          })}

          {/* Spinning Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--electric-blue), var(--cyan), var(--purple), var(--electric-blue))',
              filter: 'blur(2px)',
              animation: 'spin-ring 7s linear infinite',
            }}
          />

          {/* Logo Circle */}
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
              boxShadow: '0 0 30px rgba(0, 194, 255, 0.3)',
            }}
          >
            <img
              src={logoImg}
              alt="CHILL TECH LTD"
              style={{ width: '88%', height: '88%', objectFit: 'contain', borderRadius: 10 }}
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-headline"
        >
          Hi, I'm <span className="gradient-text">MR CHILL</span>
        </motion.h1>

        {/* Typewriter Role */}
        <p className="hero-role">
          {role}
          <span className="type-cursor" style={{ color: '#00c2ff', fontWeight: 'bold' }}>|</span>
        </p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-bio"
        >
          I manage multi-million naira property portfolios at CHIL Investment Ltd, and build
          high-performance web applications through CHILL TECH LTD — bridging strategic leadership with
          digital innovation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-cta-row"
        >
          <StarBorder as="a" href="#portfolio" color="#00c2ff" speed="4s" thickness={1.8}>
            View My Work
          </StarBorder>
          <button onClick={onDownloadCV} className="btn btn-ghost">
            Download CV
          </button>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="hero-stats-grid"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass hero-stat-card">
              <div className="hero-stat-value">{s.value}{s.suffix}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" aria-label="Scroll Down" className="hero-scroll-hint">
        <FiArrowDown style={{ fontSize: '1.1rem', animation: 'bounce-slow 2s infinite' }} />
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
          padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 48px) 32px;
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
          box-shadow: 0 0 10px #00c2ff;
          flex-shrink: 0;
        }
        .hero-badge-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          font-size: clamp(0.9rem, 3vw, 1.35rem);
          color: var(--cyan);
          margin-top: 10px;
          min-height: 1.6em;
          letter-spacing: 0.02em;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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

        /* ── Animations ── */
        @keyframes spin-ring  { to { transform: rotate(360deg); } }
        @keyframes spin-hud   { to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        .type-cursor { animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }

        /* ── RESPONSIVE ── */

        /* Tablet: 2-col stats */
        @media (max-width: 700px) {
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }

        /* Mobile ≤ 540px: hide orbit icons */
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
