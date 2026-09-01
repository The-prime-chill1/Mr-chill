import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle,
  FiMessageSquare, FiArrowLeft, FiHome, FiSun, FiMoon,
} from 'react-icons/fi';
import { testimonials } from '../data';
import Logo from './Logo';

/* ══════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════ */
const AVATAR_GRADIENTS = [
  ['#00c2ff', '#0080ff'],
  ['#818cf8', '#a855f7'],
  ['#22d3ee', '#0891b2'],
  ['#f59e0b', '#ef4444'],
  ['#22c55e', '#16a34a'],
  ['#f472b6', '#ec4899'],
  ['#fb923c', '#f97316'],
];

function getInitials(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

function Avatar({ name, idx, size = 56 }) {
  const [g1, g2] = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${g1}, ${g2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: size * 0.32,
      flexShrink: 0,
      boxShadow: `0 4px 20px ${g1}55`,
      border: '2.5px solid rgba(255,255,255,0.22)',
      letterSpacing: '0.04em',
    }}>
      {getInitials(name)}
    </div>
  );
}

function Stars({ count = 5, size = '1rem' }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[...Array(count)].map((_, i) => (
        <FiStar key={i} fill="#f59e0b" stroke="none"
          style={{ fontSize: size, filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.55))' }} />
      ))}
    </div>
  );
}

function VerifiedBadge({ project }) {
  if (!project) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 13px', borderRadius: 999,
      background: 'rgba(0,194,255,0.12)', border: '1px solid rgba(0,194,255,0.3)',
      color: '#00c2ff', fontSize: '0.73rem', fontWeight: 600,
      letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>
      <FiCheckCircle style={{ fontSize: '0.76rem' }} />
      Verified: {project}
    </span>
  );
}

/* ══════════════════════════════════════════
   HERO SPOTLIGHT CAROUSEL
   ══════════════════════════════════════════ */
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, paused]);

  const t = testimonials[index];
  const [g1] = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: 'relative', marginBottom: 72 }}
    >
      {/* Ambient glow blob behind the card */}
      <motion.div
        animate={{ background: `radial-gradient(ellipse, ${g1}1A 0%, transparent 70%)` }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', height: '80%',
          filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1,
        border: '1px solid rgba(0,194,255,0.22)',
        borderRadius: 28,
        padding: 'clamp(36px, 6vw, 60px) clamp(40px, 7vw, 72px)',
        background: 'var(--bg-card)',
        backdropFilter: 'blur(24px)',
        textAlign: 'center', overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.14)',
      }}>
        {/* Shimmering top bar */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
          background: `linear-gradient(90deg, transparent, ${g1}, #818cf8, transparent)`,
          borderRadius: 999, transition: 'background 0.8s',
        }} />

        {/* Decorative quote mark */}
        <div style={{
          position: 'absolute', top: 12, left: 32,
          fontSize: '10rem', lineHeight: 1, fontFamily: 'Georgia, serif',
          color: 'rgba(0,194,255,0.06)', userSelect: 'none', fontWeight: 900,
          pointerEvents: 'none',
        }}>"</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <Stars count={t.rating || 5} size="1.35rem" />
            </div>

            {/* Verified badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
              <VerifiedBadge project={t.project} />
            </div>

            {/* Quote */}
            <p style={{
              fontSize: 'clamp(1.05rem, 2.4vw, 1.3rem)',
              lineHeight: 1.85, fontStyle: 'italic', fontWeight: 400,
              color: 'var(--text)', maxWidth: 720, margin: '0 auto 36px',
              position: 'relative', zIndex: 2,
            }}>
              "{t.quote}"
            </p>

            {/* Reviewer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <Avatar name={t.name} idx={index} size={62} />
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '1.08rem', color: 'var(--text)',
                }}>{t.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 3 }}>
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot progress indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 36 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              style={{
                width: i === index ? 30 : 8, height: 8,
                borderRadius: 999, border: 'none',
                background: i === index ? '#00c2ff' : 'rgba(148,163,184,0.3)',
                cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
                boxShadow: i === index ? '0 0 12px rgba(0,194,255,0.6)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Left / Right arrows */}
        {[
          { fn: prev, side: 'left', Icon: FiChevronLeft, label: 'Previous' },
          { fn: next, side: 'right', Icon: FiChevronRight, label: 'Next' },
        ].map(({ fn, side, Icon, label }) => (
          <button key={side} onClick={fn} aria-label={label}
            style={{
              position: 'absolute', [side]: 16, top: '50%',
              transform: 'translateY(-50%)',
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid var(--panel-border)',
              background: 'var(--bg-card-hover)',
              backdropFilter: 'blur(8px)',
              color: 'var(--text-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '1.25rem',
              transition: 'all 0.22s', zIndex: 3,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#00c2ff'; e.currentTarget.style.borderColor = 'rgba(0,194,255,0.45)'; e.currentTarget.style.background = 'rgba(0,194,255,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--panel-border)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
          >
            <Icon />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SINGLE REVIEW CARD
   ══════════════════════════════════════════ */
function ReviewCard({ t, idx }) {
  const [g1] = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: idx * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--panel-border)',
        borderRadius: 22, padding: '28px 26px',
        display: 'flex', flexDirection: 'column', gap: 16,
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,194,255,0.35)';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,194,255,0.15)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--panel-border)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
      }}
    >
      {/* Corner ambient glow */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 100, height: 100, borderRadius: '50%',
        background: `${g1}18`, filter: 'blur(28px)', pointerEvents: 'none',
      }} />

      {/* Top row: stars + verified badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <Stars count={t.rating || 5} size="0.92rem" />
        {t.project && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: '0.67rem', fontWeight: 700,
            color: '#00c2ff', padding: '4px 10px', borderRadius: 999,
            background: 'rgba(0,194,255,0.09)', border: '1px solid rgba(0,194,255,0.22)',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <FiCheckCircle style={{ fontSize: '0.68rem' }} />
            Verified
          </span>
        )}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '0.91rem', lineHeight: 1.76,
        color: 'var(--text-dim)', fontStyle: 'italic', flexGrow: 1,
        position: 'relative', zIndex: 1,
      }}>
        "{t.quote}"
      </p>

      {/* Project label */}
      {t.project && (
        <div style={{
          fontSize: '0.74rem', color: '#00c2ff',
          fontWeight: 600, letterSpacing: '0.03em',
        }}>
          {t.project}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--panel-border)' }} />

      {/* Reviewer row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name={t.name} idx={idx} size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '0.94rem', color: 'var(--text)',
          }}>{t.name}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 2 }}>
            {t.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   STATS BANNER
   ══════════════════════════════════════════ */
function StatsBanner() {
  const items = [
    { value: '7+', label: 'Projects Delivered', color: '#00c2ff' },
    { value: '100%', label: '5-Star Rated', color: '#f59e0b' },
    { value: '7', label: 'Happy Clients', color: '#818cf8' },
    { value: '98%', label: 'Satisfaction Rate', color: '#22c55e' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      borderRadius: 22, overflow: 'hidden',
      border: '1px solid var(--panel-border)',
      marginBottom: 60,
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    }} className="reviews-stats-banner">
      {items.map((s, i) => (
        <div key={s.label} style={{
          textAlign: 'center', padding: '30px 12px',
          background: 'var(--bg-card)',
          borderRight: i < items.length - 1 ? '1px solid var(--panel-border)' : 'none',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* subtle bottom accent */}
          <div style={{
            position: 'absolute', bottom: 0, left: '20%', right: '20%',
            height: 2, borderRadius: 999,
            background: `${s.color}55`,
          }} />
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900,
            color: s.color, marginBottom: 6,
            filter: `drop-shadow(0 0 12px ${s.color}44)`,
          }}>{s.value}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN REVIEWS PAGE
   ══════════════════════════════════════════ */
export default function ReviewsPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chill_tech_theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const prev = document.title;
    document.title = 'Client Reviews — CHILL TECH LTD';
    return () => { document.title = prev; };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', fontFamily: 'var(--font-body)' }}>

      {/* ── Top Navigation ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        padding: '14px 28px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          background: theme === 'dark'
            ? 'rgba(10,15,26,0.82)' : 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--panel-border)',
          borderRadius: 999,
          padding: '10px 10px 10px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}>

          {/* Brand */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid rgba(0,194,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Logo width={34} style={{ borderRadius: '50%' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.01em',
            }}>
              Chill<span style={{ color: 'var(--electric-blue)' }}>Tech</span>
            </span>
          </a>

          {/* Centre label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: '0.78rem', fontWeight: 700,
            color: 'var(--text-dim)', letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            <FiStar fill="#f59e0b" stroke="none" style={{ fontSize: '0.82rem' }} />
            Client Reviews
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--panel-border)',
                background: 'var(--bg-card)',
                color: 'var(--text-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1rem', flexShrink: 0,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.4)'; e.currentTarget.style.color = '#00c2ff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--panel-border)'; e.currentTarget.style.color = 'var(--text-dim)'; }}
            >
              {theme === 'dark' ? <FiSun style={{ color: '#f59e0b' }} /> : <FiMoon style={{ color: '#3b82f6' }} />}
            </button>

            <a href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-dim)',
                textDecoration: 'none', padding: '8px 16px', borderRadius: 999,
                border: '1px solid var(--panel-border)',
                background: 'var(--bg-card)',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--electric-blue)'; e.currentTarget.style.borderColor = 'rgba(0,194,255,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
            >
              <FiArrowLeft style={{ fontSize: '0.9rem' }} /> Portfolio
            </a>

            <a href="#/quote"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.84rem', fontWeight: 700,
                color: '#000', padding: '8px 18px', borderRadius: 999,
                background: 'linear-gradient(135deg, #00c2ff, #0080ff)',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(0,194,255,0.35)',
                transition: 'opacity 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.87'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <FiHome style={{ fontSize: '0.82rem' }} /> Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px, 7vw, 72px) 24px 80px' }}>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--electric-blue)',
            padding: '6px 18px', borderRadius: 999,
            background: 'rgba(0,194,255,0.1)', border: '1px solid rgba(0,194,255,0.28)',
            marginBottom: 22,
          }}>
            <FiMessageSquare style={{ fontSize: '0.82rem' }} />
            Client Reviews & Testimonials
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900, lineHeight: 1.12,
            color: 'var(--text)', marginBottom: 18, letterSpacing: '-0.02em',
          }}>
            What Clients Say About{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00c2ff 0%, #818cf8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              My Work
            </span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
            lineHeight: 1.78, color: 'var(--text-dim)',
            maxWidth: 580, margin: '0 auto',
          }}>
            Real, verified feedback from founders, directors, and executives who trusted
            CHILL TECH LTD with their digital products and platforms.
          </p>
        </motion.div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <StatsBanner />
        </motion.div>

        {/* Hero spotlight carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <HeroCarousel />
        </motion.div>

        {/* Section divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--panel-border)' }} />
          <span style={{
            fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--text-dim)', whiteSpace: 'nowrap',
          }}>
            All {testimonials.length} Reviews
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--panel-border)' }} />
        </div>

        {/* All reviews grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 22, marginBottom: 72,
        }} className="reviews-card-grid">
          {testimonials.map((t, idx) => (
            <ReviewCard key={t.name} t={t} idx={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            padding: 'clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)',
            background: 'var(--bg-card)',
            border: '1px solid var(--panel-border)',
            borderRadius: 28,
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          }}
        >
          {/* Background gradient accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #00c2ff, #818cf8, transparent)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,194,255,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <Stars count={5} size="1.4rem" />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.35rem, 4vw, 2rem)',
              color: 'var(--text)', marginBottom: 12,
            }}>
              Ready to be the next success story?
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.97rem', marginBottom: 32, maxWidth: 460, margin: '0 auto 32px' }}>
              Let's build something extraordinary together. Reach out today and let's start your project.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 999,
                  background: 'linear-gradient(135deg, #00c2ff, #0080ff)',
                  color: '#000', fontWeight: 700, fontSize: '0.93rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(0,194,255,0.35)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.87'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <FiHome style={{ fontSize: '0.9rem' }} /> View My Portfolio
              </a>
              <a href="#/quote"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 999,
                  border: '1px solid rgba(0,194,255,0.38)',
                  color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.93rem',
                  textDecoration: 'none', background: 'rgba(0,194,255,0.06)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,194,255,0.14)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,194,255,0.06)'; }}
              >
                <FiMessageSquare style={{ fontSize: '0.9rem' }} /> Get a Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .reviews-stats-banner {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .reviews-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
