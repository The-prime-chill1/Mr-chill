import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiMapPin, FiAward, FiBarChart2, FiCheckCircle, FiGlobe, FiStar } from 'react-icons/fi';
import { achievements } from '../data';

const ICONS = [FiStar, FiCheckCircle, FiAward, FiUsers, FiMapPin, FiTrendingUp, FiBarChart2, FiGlobe];

export default function Achievements() {
  return (
    <section className="floating-card section-tight">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow">Track Record</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Key <span className="gradient-text">Achievements</span>
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: 560, margin: '12px auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
            A snapshot of what CHILL TECH LTD and its founder have built, managed, and delivered.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(12px, 2.5vw, 18px)' }}>
          {achievements.map((text, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="glass"
                style={{ padding: 'clamp(16px, 3vw, 22px)', display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(47,141,255,0.18), rgba(91,110,232,0.18))',
                    color: 'var(--electric-blue)',
                    fontSize: '1.1rem',
                  }}
                >
                  <Icon />
                </span>
                <span style={{ fontSize: 'clamp(0.84rem, 2vw, 0.9rem)', color: 'var(--text-dim)', lineHeight: 1.6, paddingTop: 6 }}>{text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
