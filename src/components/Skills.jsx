import { motion } from 'framer-motion';
import { FiGitBranch, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import { SiReact, SiJavascript, SiHtml5, SiFirebase, SiNodedotjs, SiGithub, SiVercel, SiNetlify, SiFigma } from 'react-icons/si';
import { DiVisualstudio, DiCss3 } from 'react-icons/di';
import { skills } from '../data';
import GlassIcons from './reactbits/GlassIcons';

// Comprehensive tech stack icons grid
const TECH_STACK = [
  { name: 'React', icon: SiReact, color: '#00c2ff' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: DiCss3, color: '#1572b6' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e' },
  { name: 'Git', icon: FiGitBranch, color: '#f05032' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'Vercel', icon: SiVercel, color: '#00c2ff' },
  { name: 'Figma', icon: SiFigma, color: '#a855f7' },
];

function SkillBar({ name, level }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: 8, fontWeight: 500 }}>
        <span>{name}</span>
        <span style={{ color: 'var(--electric-blue)', fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 7, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #00c2ff, #22d3ee, #818cf8)',
            boxShadow: '0 0 10px rgba(0, 194, 255, 0.6)',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="floating-card section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="eyebrow">Technical Expertise</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            A powerful suite of web development, real estate management, and digital strategy tools.
          </p>
        </div>

        {/* Tech Stack Icon Grid */}
        <div style={{ marginBottom: 64 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 24, textAlign: 'center', color: 'var(--cyan)' }}>
            Core Technology Stack
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
              gap: 16,
            }}
          >
            {TECH_STACK.map((tech) => {
              const IconComp = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="glass"
                  style={{
                    padding: '20px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    borderRadius: '16px',
                    textAlign: 'center',
                  }}
                >
                  <IconComp style={{ fontSize: '2rem', color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}66)` }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text)' }}>{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skill Category Progress Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass"
              style={{ padding: 32 }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 24, color: 'var(--cyan)' }}>
                {group.category}
              </h3>
              {group.items.map((item) => (
                <SkillBar key={item.name} {...item} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
