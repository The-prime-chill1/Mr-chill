import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  FiArrowLeft, FiCode, FiLayers, FiCpu, FiCheckCircle,
  FiDatabase, FiLayout, FiServer, FiGlobe, FiTool, FiArrowRight
} from 'react-icons/fi';
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
import { skills, tools } from '../data';
import Logo from './Logo';

const ALL_TECH_STACK = [
  { name: 'React', icon: SiReact, color: '#00c2ff', cat: 'Frontend' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', cat: 'Core JS' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', cat: 'TypeScript' },
  { name: 'Python', icon: SiPython, color: '#3776ab', cat: 'Backend & AI' },
  { name: 'Java', icon: FaJava, color: '#e76f00', cat: 'Enterprise' },
  { name: 'C++', icon: SiCplusplus, color: '#00599c', cat: 'Systems' },
  { name: 'HTML5', icon: SiHtml5, color: '#e34f26', cat: 'Markup' },
  { name: 'CSS3', icon: DiCss3, color: '#1572b6', cat: 'Styling' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22c55e', cat: 'Backend' },
  { name: 'MySQL / SQL', icon: SiMysql, color: '#00758f', cat: 'Database' },
  { name: 'Firebase', icon: SiFirebase, color: '#ffca28', cat: 'Cloud' },
  { name: 'Vite', icon: SiVite, color: '#9333ea', cat: 'Tooling' },
  { name: 'Git', icon: FiCode, color: '#f05032', cat: 'Git' },
  { name: 'GitHub', icon: SiGithub, color: 'var(--text)', cat: 'CI/CD' },
  { name: 'Vercel', icon: SiVercel, color: 'var(--cyan)', cat: 'Cloud' },
  { name: 'Netlify', icon: SiNetlify, color: '#00c7b7', cat: 'Deploy' },
  { name: 'Figma', icon: SiFigma, color: '#a855f7', cat: 'UI/UX' },
  { name: 'VS Code', icon: DiVisualstudio, color: '#007acc', cat: 'IDE' },
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

      {/* Progress Track */}
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

export default function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="skills-page-wrapper">
      {/* Top Header Navigation Bar */}
      <header className="skills-page-nav">
        <div className="skills-page-nav-inner">
          <a href="#/" className="skills-back-btn" aria-label="Back to Homepage">
            <FiArrowLeft /> <span>Home</span>
          </a>
          <div className="skills-nav-brand">
            <Logo width={26} style={{ borderRadius: '50%' }} />
            <span>Chill<strong className="gradient-text">Tech</strong></span>
          </div>
          <a href="#/cv" className="skills-nav-cv-btn">
            Read CV
          </a>
        </div>
      </header>


      <main className="container skills-page-content">

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="skills-page-hero"
        >
          <div className="skills-badge">
            <span className="skills-badge-dot" />
            <span>TECHNICAL CAPABILITIES & STACK</span>
          </div>
          <h1 className="skills-main-title">
            Complete <span className="gradient-text">Technical Stack & Expertise</span>
          </h1>
          <p className="skills-hero-sub">
            From modern frontend design with React and Tailwind/CSS, to robust backend APIs, databases, real estate tech, and cloud deployment pipelines.
          </p>
        </motion.div>


        {/* ── All 18 Technologies Grid ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass skills-tech-section"
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '0 0 8px' }}>
              Core Technologies & Development Tools
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', margin: 0 }}>
              Primary languages, frameworks, and deployment platforms engineered at CHILL TECH LTD.
            </p>
          </div>

          <div className="all-tech-grid">
            {ALL_TECH_STACK.map((tech, idx) => {
              const IconComp = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.025 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="glass tech-card"
                >
                  <IconComp className="tech-icon" style={{ color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}55)` }} />
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-cat">{tech.cat}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Categorized Progress Bars ── */}
        <section style={{ marginTop: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '0 0 8px' }}>
              Skill Category Breakdown
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', margin: 0 }}>
              Proficiency levels across frontend, backend, UI/UX, tools, and commercial management.
            </p>
          </div>

          <div className="skills-categories-grid">
            {skills.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="glass skill-group-card"
              >
                <h3 className="skill-group-title">
                  {group.category}
                </h3>
                {group.items.map((item) => (
                  <SkillBar key={item.name} {...item} />
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Quick Tools Tags ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass tools-strip-card"
          style={{ marginTop: 40 }}
        >
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', margin: '0 0 16px', color: 'var(--cyan)' }}>
            Tools & Ecosystem
          </h3>
          <div className="tools-tags-wrap">
            {tools.map((t) => (
              <span key={t.label} className="tool-tag-pill">
                {t.label}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA Banner */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass skills-cta-banner"
          style={{ marginTop: 48 }}
        >
          <h2>Need software engineered with this stack?</h2>
          <p>
            Let's discuss your technical requirements, architecture, and timeline.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href="#/work-with-me" className="btn btn-primary">
              Work With Me <FiArrowRight />
            </a>
            <a href="#/quote" className="btn btn-ghost">
              Request a Quote
            </a>
          </div>
        </motion.section>

      </main>

      {/* Page Footer */}
      <footer className="skills-page-footer">
        <div className="container">
          <div className="skills-page-footer-inner">
            <span>© {new Date().getFullYear()} CHILL TECH LTD. All rights reserved.</span>
            <a href="#/" className="skills-footer-home-link">Back to Homepage</a>
          </div>
        </div>
      </footer>

      <style>{`
        .skills-page-wrapper {
          min-height: 100vh;
          background: var(--bg-dark, #0a0f1d);
          color: var(--text, #f8fafc);
          display: flex;
          flex-direction: column;
        }

        .skills-page-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 14px 24px;
          background: rgba(10, 15, 29, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        [data-theme="light"] .skills-page-nav {
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .skills-page-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .skills-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--cyan, #00c2ff);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          transition: transform 0.2s ease;
        }

        .skills-back-btn:hover {
          transform: translateX(-3px);
        }

        .skills-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .skills-nav-cv-btn {
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.1);
          border: 1px solid rgba(0, 194, 255, 0.3);
          color: var(--cyan, #00c2ff);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .skills-page-content {
          padding-top: 40px;
          padding-bottom: 80px;
          max-width: 1140px;
          margin: 0 auto;
        }

        .skills-page-hero {
          text-align: center;
          margin-bottom: 48px;
        }

        .skills-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.08);
          border: 1px solid rgba(0, 194, 255, 0.25);
          color: var(--cyan, #00c2ff);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .skills-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00c2ff;
          box-shadow: 0 0 10px #00c2ff;
        }

        .skills-main-title {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .skills-hero-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: var(--text-dim);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.65;
        }

        .skills-tech-section {
          padding: 36px 28px;
          border-radius: 24px;
        }

        .all-tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 16px;
        }

        .tech-card {
          padding: 18px 12px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .tech-icon {
          font-size: 2.2rem;
        }

        .tech-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
        }

        .tech-cat {
          font-size: 0.7rem;
          color: var(--cyan);
          background: rgba(0, 194, 255, 0.08);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .skills-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 20px;
        }

        .skill-group-card {
          padding: 28px 24px;
          border-radius: 20px;
        }

        .skill-group-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          margin: 0 0 20px;
          color: var(--cyan);
          border-bottom: 1px solid var(--panel-border);
          padding-bottom: 10px;
        }

        .tools-strip-card {
          padding: 28px;
          border-radius: 20px;
        }

        .tools-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tool-tag-pill {
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--panel-border);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text);
        }

        .skills-cta-banner {
          padding: 40px 32px;
          border-radius: 24px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0, 194, 255, 0.08) 0%, rgba(129, 140, 248, 0.08) 100%);
          border: 1px solid rgba(0, 194, 255, 0.25);
        }

        .skills-cta-banner h2 {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 800;
          margin: 0 0 10px;
        }

        .skills-cta-banner p {
          max-width: 540px;
          margin: 0 auto 24px;
          color: var(--text-dim);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .skills-page-footer {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 0;
          font-size: 0.84rem;
          color: var(--text-dim);
        }

        .skills-page-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skills-footer-home-link {
          color: var(--cyan);
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .skills-page-nav {
            padding: 10px 12px;
          }
          .skills-page-nav-inner {
            gap: 6px;
          }
          .skills-back-btn {
            font-size: 0.82rem;
            gap: 4px;
            white-space: nowrap;
          }
          .skills-nav-brand {
            font-size: 0.85rem;
            gap: 6px;
            white-space: nowrap;
          }
          .skills-nav-cv-btn {
            padding: 4px 10px;
            font-size: 0.78rem;
            white-space: nowrap;
          }
          .skills-page-content {
            padding-top: 20px;
            padding-bottom: 40px;
          }
          .skills-page-hero {
            margin-bottom: 24px;
          }
          .skills-badge {
            font-size: 0.68rem;
            padding: 4px 12px;
            margin-bottom: 12px;
          }
          .skills-main-title {
            font-size: 1.55rem;
            line-height: 1.24;
            margin-bottom: 10px;
          }
          .skills-hero-sub {
            font-size: 0.86rem;
            line-height: 1.55;
          }
          .all-tech-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          .tech-card {
            padding: 14px 6px;
            border-radius: 14px;
            gap: 6px;
          }
          .tech-icon {
            font-size: 1.8rem;
          }
          .tech-name {
            font-size: 0.8rem;
          }
          .tech-cat {
            font-size: 0.64rem;
            padding: 2px 6px;
            white-space: nowrap;
          }
          .skills-tech-section {
            padding: 18px 10px;
            border-radius: 18px;
          }
          .skill-group-card {
            padding: 20px 14px;
            border-radius: 16px;
          }
          .skills-cta-banner {
            padding: 28px 16px;
            border-radius: 18px;
          }

          .skills-cta-banner h2 {
            font-size: 1.35rem;
          }
          .skills-cta-banner p {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
}

