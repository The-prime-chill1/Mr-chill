import { motion } from 'framer-motion';
import { experience } from '../data';
import BorderGlow from './reactbits/BorderGlow';

export default function Experience() {
  return (
    <section id="experience" className="floating-card floating-card--soft section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Career Journey</span>
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {experience.map((job, idx) => (
            <motion.div
              key={job.role + job.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <BorderGlow
                borderRadius={18}
                glowColor="190 90% 65%"
                colors={['#2f8dff', '#5b6ee8', '#22d3ee']}
                backgroundColor="rgba(255,255,255,0.03)"
                edgeSensitivity={35}
                glowIntensity={0.9}
              >
                <div className="glass" style={{ padding: 30, border: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: 8,
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>{job.role}</h3>
                      <div style={{ color: 'var(--cyan)', fontSize: '0.92rem', marginTop: 2 }}>
                        {job.org} · {job.location}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        border: '1px solid var(--panel-border)',
                        borderRadius: 999,
                        padding: '4px 12px',
                      }}
                    >
                      {job.period}
                    </span>
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: job.achievements.length ? 18 : 0 }}>
                    {job.points.map((p) => (
                      <li key={p} style={{ display: 'flex', gap: 10, fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--electric-blue)', flexShrink: 0 }}>—</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {job.achievements.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {job.achievements.map((a) => (
                        <span
                          key={a}
                          style={{
                            fontSize: '0.76rem',
                            padding: '5px 12px',
                            borderRadius: 999,
                            background: 'rgba(91,110,232,0.1)',
                            color: 'var(--purple)',
                            border: '1px solid rgba(91,110,232,0.25)',
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
