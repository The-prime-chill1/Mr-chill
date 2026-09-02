import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { FiGitBranch, FiCode, FiLayers, FiCpu } from 'react-icons/fi';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiFirebase,
  SiNodedotjs,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiMysql,
  SiVite
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { DiCss3, DiVisualstudio } from 'react-icons/di';
import { skills } from '../data';
import GlassIcons from './reactbits/GlassIcons';

// Comprehensive tech stack icons grid (18 core technologies)
const TECH_STACK = [
  { name: 'React', icon: SiReact, color: '#00c2ff' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
  { name: 'Python', icon: SiPython, color: '#3776ab' },
  { name: 'Java', icon: FaJava, color: '#e76f00' },
  { name: 'C++', icon: SiCplusplus, color: '#00599c' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26' },
  { name: 'CSS3', icon: DiCss3, color: '#1572b6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e' },
  { name: 'MySQL / SQL', icon: SiMysql, color: '#00758f' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28' },
  { name: 'Vite', icon: SiVite, color: '#9333ea' },
  { name: 'Git', icon: FiGitBranch, color: '#f05032' },
  { name: 'GitHub', icon: SiGithub, color: 'var(--text)' },
  { name: 'Vercel', icon: SiVercel, color: 'var(--cyan)' },
  { name: 'Netlify', icon: SiNetlify, color: '#00c7b7' },
  { name: 'Figma', icon: SiFigma, color: '#a855f7' },
  { name: 'VS Code', icon: DiVisualstudio, color: '#007acc' },
];

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, level, {
        duration: 1.1,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      });
      return () => controls.stop();
    } else {
      const t = setTimeout(() => setDisplayValue(level), 300);
      return () => clearTimeout(t);
    }
  }, [isInView, level]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', marginBottom: 8, fontWeight: 600 }}>
        <span style={{ color: 'var(--text)' }}>{name}</span>
        <span style={{
          color: 'var(--electric-blue)',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          fontSize: '0.92rem',
          minWidth: 40,
          textAlign: 'right',
        }}>
          {displayValue > 0 ? displayValue : level}%
        </span>
      </div>

      {/* Progress Track - Visible in both Light and Dark mode */}
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: 'rgba(0, 194, 255, 0.12)',
          border: '1px solid rgba(0, 194, 255, 0.28)',
          padding: 1.5,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #00c2ff 0%, #0080ff 60%, #818cf8 100%)',
            boxShadow: '0 0 12px rgba(0, 194, 255, 0.8)',
            position: 'relative',
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
        <div style={{ marginBottom: 56 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: 24, textAlign: 'center', color: 'var(--cyan)' }}>
            Core Technology Stack
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 100px), 1fr))',
              gap: 'clamp(10px, 2vw, 16px)',
            }}
          >
            {TECH_STACK.map((tech, idx) => {
              const IconComp = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass"
                  style={{
                    padding: 'clamp(14px, 2.5vw, 18px) clamp(8px, 2vw, 12px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    borderRadius: 14,
                    textAlign: 'center',
                    cursor: 'default',
                    minHeight: 92,
                    boxSizing: 'border-box',
                  }}
                >
                  <IconComp style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)', color: tech.color, filter: `drop-shadow(0 0 10px ${tech.color}55)` }} />
                  <span style={{ fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skill Category Progress Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(14px, 3vw, 24px)' }}>
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass"
              style={{ padding: 'clamp(18px, 4vw, 32px)' }}
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
      </div>
    </section>
  );
}
