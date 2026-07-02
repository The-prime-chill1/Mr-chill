import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { profile, stats, education, languages } from '../data';
import headshot from '../assets/lamidi-headshot.jpg';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="floating-card section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64, alignItems: 'center' }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            <div
              className="glass"
              style={{
                padding: 10,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={headshot}
                alt="Lamidi Abdulhameed Olawale at the Global Industry Summit, 21st UNIDO General Conference, Riyadh"
                style={{ width: '100%', borderRadius: 12 }}
                loading="lazy"
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: -14,
                background: 'linear-gradient(135deg, var(--electric-blue), var(--purple))',
                opacity: 0.18,
                filter: 'blur(40px)',
                zIndex: -1,
                borderRadius: 24,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">About Me</span>
            <h2 className="section-title">
              Building at the intersection of <span className="gradient-text">real estate & tech</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1.02rem' }}>{profile.bio}</p>

            <div style={{ marginTop: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="stats-grid">
                {stats.map((s) => (
                  <div key={s.label} className="glass" style={{ padding: '18px 10px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem' }} className="gradient-text">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16 }}>Education</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {education.map((e) => (
                  <div
                    key={e.school}
                    className="glass"
                    style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{e.school}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{e.detail}</div>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--cyan)' }}>{e.period}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="glass"
                  style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', gap: 6, alignItems: 'center' }}
                >
                  <strong>{l.name}</strong>
                  <span style={{ color: 'var(--text-dim)' }}>· {l.level}</span>
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
