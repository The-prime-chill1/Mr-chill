import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiUser, FiBriefcase, FiCode } from 'react-icons/fi';
import { profile, stats } from '../data';
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
        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 54, alignItems: 'center' }} className="about-grid">
          {/* Left: Founder Headshot */}
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
                borderRadius: 20,
              }}
            >
              <img
                src={headshot}
                alt="Lamidi Abdulhameed Olawale at the Global Industry Summit, 21st UNIDO General Conference, Riyadh"
                style={{ width: '100%', borderRadius: 14, display: 'block' }}
                loading="lazy"
              />
              <div style={{ padding: '12px 6px 4px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text)' }}>
                  Lamidi Abdulhameed Olawale
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--cyan)', marginTop: 2 }}>
                  Founder & CEO @ CHILL TECH LTD • GM @ CHIL Investment Ltd
                </div>
              </div>
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

          {/* Right: Concise Content & Learn More */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">About CHILL TECH & Founder</span>
            <h2 className="section-title">
              Building <span className="gradient-text">technology solutions</span> that move businesses forward
            </h2>

            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '1rem', marginBottom: 14 }}>
              <strong>CHILL TECH LTD</strong> is a digital engineering company dedicated to transforming business goals into modern, high-performing websites and custom software solutions.
            </p>

            <p style={{ color: 'var(--text-dim)', lineHeight: 1.75, fontSize: '0.94rem', marginBottom: 20 }}>
              Led by Founder & CEO <strong>Lamidi Abdulhameed Olawale</strong> (studying ADSE Software Engineering at Aptech and serving as General Manager at CHIL Investment Ltd), we combine engineering precision with commercial strategy to deliver results that elevate your brand.
            </p>

            {/* Quick Feature Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 26 }} className="about-badges-grid">
              <div className="glass" style={{ padding: '10px 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiCode style={{ color: 'var(--cyan)', fontSize: '1.1rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Full-Stack Web Engineering</span>
              </div>
              <div className="glass" style={{ padding: '10px 14px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiBriefcase style={{ color: 'var(--electric-blue)', fontSize: '1.1rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Real Estate & E-Commerce</span>
              </div>
            </div>

            {/* Action Buttons: Learn More & CV */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 30 }}>
              <a
                href="#/about"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', fontSize: '0.92rem' }}
              >
                Learn More (Company & CEO) <FiArrowRight />
              </a>
              <a
                href="#/cv"
                className="btn btn-ghost"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', fontSize: '0.92rem' }}
              >
                <FiUser /> Read Full CV
              </a>
            </div>

            {/* Stats Grid Counters */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="stats-grid">
                {stats.map((s) => (
                  <div key={s.label} className="glass" style={{ padding: '14px 8px', textAlign: 'center', borderRadius: 14 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem' }} className="gradient-text">
                      <Counter value={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 540px) {
          .about-badges-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

