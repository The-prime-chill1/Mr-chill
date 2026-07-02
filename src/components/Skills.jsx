import { motion } from 'framer-motion';
import { FiGitBranch } from 'react-icons/fi';
import { SiGithub, SiFigma, SiVercel, SiNetlify } from 'react-icons/si';
import { DiVisualstudio } from 'react-icons/di';
import { skills } from '../data';
import GlassIcons from './reactbits/GlassIcons';

const TOOL_ITEMS = [
  { icon: <FiGitBranch />, color: 'orange', label: 'Git' },
  { icon: <SiGithub />, color: 'indigo', label: 'GitHub' },
  { icon: <SiFigma />, color: 'purple', label: 'Figma' },
  { icon: <SiVercel />, color: 'blue', label: 'Vercel' },
  { icon: <SiNetlify />, color: 'green', label: 'Netlify' },
  { icon: <DiVisualstudio />, color: 'blue', label: 'VS Code' },
];

function SkillBar({ name, level }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 6 }}>
        <span>{name}</span>
        <span style={{ color: 'var(--text-dim)' }}>{level}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--electric-blue), var(--purple))' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="floating-card floating-card--soft section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">What I Work With</span>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Tools</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass"
              style={{ padding: 28 }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: 20, color: 'var(--cyan)' }}>
                {group.category}
              </h3>
              {group.items.map((item) => (
                <SkillBar key={item.name} {...item} />
              ))}
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', marginBottom: -8, color: 'var(--cyan)' }}>
            Tools & Platforms
          </h3>
          <GlassIcons items={TOOL_ITEMS} />
        </div>
      </div>
    </section>
  );
}
