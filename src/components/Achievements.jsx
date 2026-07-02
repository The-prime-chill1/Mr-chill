import { motion } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiMapPin, FiAward, FiBarChart2, FiCheckCircle } from 'react-icons/fi';
import { achievements } from '../data';

const ICONS = [FiUsers, FiCheckCircle, FiMapPin, FiAward, FiTrendingUp, FiBarChart2];

export default function Achievements() {
  return (
    <section className="floating-card section-tight">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow">By The Numbers</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            Professional <span className="gradient-text">Achievements</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {achievements.map((text, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            return (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="glass"
                style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(47,141,255,0.15), rgba(91,110,232,0.15))',
                    color: 'var(--electric-blue)',
                    fontSize: '1.1rem',
                  }}
                >
                  <Icon />
                </span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5, paddingTop: 6 }}>{text}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
