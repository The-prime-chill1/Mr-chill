import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiFigma,
  SiMysql,
  SiVercel
} from 'react-icons/si';

// Curated Top 8 Technologies for the Homepage Showcase
const FEATURED_TECH = [
  { name: 'React', icon: SiReact, color: '#00c2ff', cat: 'Frontend Web' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', cat: 'ES6+ Logic' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', cat: 'Type-Safe App' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e', cat: 'Backend APIs' },
  { name: 'Python', icon: SiPython, color: '#3776ab', cat: 'Data & Scripting' },
  { name: 'MySQL / SQL', icon: SiMysql, color: '#00758f', cat: 'Relational DB' },
  { name: 'Figma', icon: SiFigma, color: '#a855f7', cat: 'UI/UX Design' },
  { name: 'Vercel / Cloud', icon: SiVercel, color: 'var(--cyan)', cat: 'CI/CD & Hosting' },
];

export default function Skills() {
  return (
    <section id="skills" className="floating-card section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="eyebrow">Technical Capabilities</span>
          <h2 className="section-title">
            Core <span className="gradient-text">Skills & Tech Stack</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
            A high-performance technology suite engineered to build fast, responsive, and scalable digital solutions.
          </p>
        </div>

        {/* Curated Tech Badges Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))',
            gap: 14,
            marginBottom: 32,
          }}
          className="featured-tech-grid"
        >
          {FEATURED_TECH.map((tech, idx) => {
            const IconComp = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="glass"
                style={{
                  padding: '18px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 16,
                  textAlign: 'center',
                  minHeight: 100,
                  boxSizing: 'border-box',
                }}
              >
                <IconComp style={{ fontSize: '2.1rem', color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}55)` }} />
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text)' }}>{tech.name}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--cyan)', background: 'rgba(0, 194, 255, 0.08)', padding: '2px 8px', borderRadius: 999 }}>
                  {tech.cat}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button: View All Skills */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="#/skills"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', fontSize: '0.94rem' }}
          >
            View All Skills & Full Tech Stack (18+ Tools & Proficiencies) <FiArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .featured-tech-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}

