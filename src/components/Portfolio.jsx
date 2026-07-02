import { motion } from 'framer-motion';
import { projects } from '../data';
import BorderGlow from './reactbits/BorderGlow';

function ProjectCard({ project, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
      style={{ height: '100%' }}
    >
      <BorderGlow
        borderRadius={18}
        glowColor={project.featured ? '190 90% 65%' : '265 80% 70%'}
        colors={['#2f8dff', '#5b6ee8', '#22d3ee']}
        backgroundColor="transparent"
        edgeSensitivity={30}
        glowIntensity={project.featured ? 1.1 : 0.85}
      >
        <div
          className="glass project-card"
          style={{
            overflow: 'hidden',
            position: 'relative',
            height: '100%',
            border: project.featured ? '1px solid rgba(47,141,255,0.5)' : undefined,
          }}
        >
          {project.featured && (
            <span
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                zIndex: 2,
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, var(--electric-blue), var(--purple))',
                color: '#05060a',
                fontWeight: 700,
              }}
            >
              Featured
            </span>
          )}

          <div
            className="project-thumb"
            style={{
              height: 170,
              background: `linear-gradient(135deg, rgba(47,141,255,0.18), rgba(91,110,232,0.18))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 12,
                left: 12,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.64rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(6,10,20,0.55)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-dim)',
                fontWeight: 600,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }} />
              Live
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'rgba(255,255,255,0.35)' }}>
              {project.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
            <div
              className="project-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10,10,10,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                View Live
              </a>
            </div>
          </div>

          <div style={{ padding: 22 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: 8 }}>{project.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6, minHeight: 58 }}>{project.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 10px',
                    borderRadius: 999,
                    background: 'rgba(47,141,255,0.08)',
                    color: 'var(--cyan)',
                    border: '1px solid rgba(34,211,238,0.25)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {project.placeholder && <div className="placeholder-tag">Placeholder — send details</div>}
          </div>

          <style>{`
            .project-card:hover .project-overlay { opacity: 1; }
          `}</style>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="floating-card section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Selected Work</span>
          <h2 className="section-title">
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Seven production builds spanning real estate, e-commerce, logistics, fintech, and more.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }} className="portfolio-grid">
          {projects.map((p, idx) => (
            <ProjectCard key={p.title} project={p} idx={idx} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .portfolio-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
