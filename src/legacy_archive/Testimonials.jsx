import { motion } from 'framer-motion';
import { FiStar, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { testimonials } from '../data';

// Show just 3 preview cards on the homepage
const PREVIEW = testimonials.slice(0, 3);

const AVATAR_GRADIENTS = [
  ['#00c2ff', '#0080ff'],
  ['#818cf8', '#a855f7'],
  ['#22d3ee', '#0891b2'],
];

function Avatar({ name, idx }) {
  const [g1, g2] = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      background: `linear-gradient(135deg, ${g1}, ${g2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 800, fontSize: '0.88rem', flexShrink: 0,
      boxShadow: `0 4px 14px ${g1}55`,
      border: '2px solid rgba(255,255,255,0.15)',
    }}>{initials}</div>
  );
}

function PreviewCard({ t, idx }) {
  const [g1] = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: idx * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--panel-border)',
        borderRadius: 20, padding: '24px 22px',
        display: 'flex', flexDirection: 'column', gap: 14,
        position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: -24, right: -24,
        width: 80, height: 80, borderRadius: '50%',
        background: `${g1}14`, filter: 'blur(22px)', pointerEvents: 'none',
      }} />

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[...Array(t.rating || 5)].map((_, i) => (
          <FiStar key={i} fill="#f59e0b" stroke="none"
            style={{ fontSize: '0.88rem', filter: 'drop-shadow(0 0 4px rgba(245,158,11,0.4))' }} />
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: '0.9rem', lineHeight: 1.72,
        color: 'var(--text-dim)', fontStyle: 'italic', flexGrow: 1,
      }}>
        "{t.quote}"
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--panel-border)' }} />

      {/* Reviewer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <Avatar name={t.name} idx={idx} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '0.9rem', color: 'var(--text)',
          }}>{t.name}</div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: 1 }}>
            {t.role}
          </div>
        </div>
        {t.project && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: '0.66rem', fontWeight: 600,
            color: 'var(--electric-blue)', padding: '3px 8px', borderRadius: 999,
            background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.2)',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <FiCheckCircle style={{ fontSize: '0.67rem' }} />
            Verified
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="floating-card section">
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">
            <FiStar style={{ marginRight: 6, verticalAlign: 'middle' }} />
            Client Endorsements
          </span>
          <h2 className="section-title">
            Trusted by <span className="gradient-text">Visionaries</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Real reviews and feedback from founders, directors, and executives who trusted CHILL TECH LTD.
          </p>
        </div>

        {/* 3 preview cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(14px, 3vw, 20px)',
          marginBottom: 36,
        }}>
          {PREVIEW.map((t, idx) => (
            <PreviewCard key={t.name} t={t} idx={idx} />
          ))}
        </div>

        {/* CTA to full reviews page */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          {/* Mini stats row */}
          <div style={{
            display: 'inline-flex', gap: 'clamp(12px, 4vw, 28px)', alignItems: 'center',
            padding: 'clamp(10px, 2.5vw, 14px) clamp(16px, 4vw, 28px)', borderRadius: 999,
            background: 'rgba(0,194,255,0.05)',
            border: '1px solid rgba(0,194,255,0.15)',
            marginBottom: 24,
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {[
              { v: '7+', l: 'Projects' },
              { v: '7', l: 'Clients' },
              { v: '100%', l: '5-Star Rated' },
              { v: '98%', l: 'Satisfaction' },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
                  background: 'linear-gradient(135deg, #00c2ff, #818cf8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>{s.v}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#/reviews"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px', borderRadius: 999,
                background: 'linear-gradient(135deg, #00c2ff, #0080ff)',
                color: '#000', fontWeight: 700, fontSize: '0.92rem',
                textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(0,194,255,0.3)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.87'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              See All {testimonials.length} Reviews <FiArrowRight />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
