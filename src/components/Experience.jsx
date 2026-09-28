import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiCode,
  FiTrendingUp,
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiLayers,
  FiArrowUpRight
} from 'react-icons/fi';
import { experience } from '../data';
import BorderGlow from './reactbits/BorderGlow';
import Logo from './Logo';

// Tech and domain skills for each role to demonstrate capability
const ROLE_SKILLS = {
  'CHILL TECH LTD': [
    'React',
    'Node.js',
    'Vite',
    'TypeScript',
    'REST APIs',
    'Vercel & Netlify',
    'UI/UX Architecture',
    'Client Solutions'
  ],
  'CHIL Investment Ltd': [
    'Portfolio Management',
    'Investor Relations',
    'Operations Strategy',
    'Asset Allocation',
    'Stakeholder Management',
    'Contract Execution'
  ]
};

export default function Experience() {
  return (
    <section id="experience" className="floating-card floating-card--soft section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <FiBriefcase /> Career Journey
          </span>
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 620 }}>
            Proven leadership combining software engineering precision with executive business management.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="experience-timeline" style={{ position: 'relative', maxWidth: 960, margin: '0 auto' }}>
          {/* Vertical Glowing Timeline Line */}
          <div
            className="timeline-vertical-line"
            style={{
              position: 'absolute',
              left: 28,
              top: 40,
              bottom: 40,
              width: 2,
              background: 'linear-gradient(180deg, rgba(0, 194, 255, 0.6) 0%, rgba(91, 110, 232, 0.5) 50%, rgba(245, 158, 11, 0.4) 100%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {experience.map((job, idx) => {
              const isChillTech = job.org.includes('CHILL TECH');
              const roleColor = isChillTech ? 'var(--cyan, #00c2ff)' : '#f59e0b';
              const roleGlow = isChillTech ? 'rgba(0, 194, 255, 0.35)' : 'rgba(245, 158, 11, 0.35)';
              const skillsList = ROLE_SKILLS[job.org] || [];

              return (
                <motion.div
                  key={job.role + job.org}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  style={{ position: 'relative', paddingLeft: 64 }}
                  className="timeline-item"
                >
                  {/* Timeline Node Icon */}
                  <div
                    className="timeline-node-icon"
                    style={{
                      position: 'absolute',
                      left: 10,
                      top: 24,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'var(--bg-dark, #070d1a)',
                      border: `2px solid ${roleColor}`,
                      boxShadow: `0 0 16px ${roleGlow}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: roleColor,
                      fontSize: '1.1rem',
                      zIndex: 3,
                    }}
                  >
                    {isChillTech ? <FiCode /> : <FiTrendingUp />}
                  </div>

                  <BorderGlow
                    borderRadius={20}
                    glowColor={isChillTech ? '190 90% 65%' : '38 90% 60%'}
                    colors={isChillTech ? ['#00c2ff', '#3b82f6', '#8b5cf6'] : ['#f59e0b', '#fbbf24', '#f97316']}
                    backgroundColor="rgba(255,255,255,0.02)"
                    edgeSensitivity={30}
                    glowIntensity={0.8}
                  >
                    <div
                      className="glass experience-card"
                      style={{
                        padding: 'clamp(20px, 4vw, 32px)',
                        borderRadius: 20,
                        border: '1px solid var(--panel-border)',
                        background: 'var(--bg-card, rgba(12, 18, 34, 0.65))',
                      }}
                    >
                      {/* Top Header Row */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: 16,
                          marginBottom: 20,
                          paddingBottom: 18,
                          borderBottom: '1px solid var(--panel-border)',
                        }}
                      >
                        {/* Company Badge + Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 14,
                              background: isChillTech ? 'rgba(0, 194, 255, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                              border: `1.5px solid ${roleColor}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              boxShadow: `0 0 14px ${roleGlow}`,
                              overflow: 'hidden',
                            }}
                          >
                            {isChillTech ? (
                              <Logo width={36} />
                            ) : (
                              <FiBriefcase style={{ color: '#f59e0b', fontSize: '1.4rem' }} />
                            )}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                              <h3
                                style={{
                                  fontFamily: 'var(--font-display)',
                                  fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                                  fontWeight: 800,
                                  margin: 0,
                                  color: 'var(--text)',
                                }}
                              >
                                {job.role}
                              </h3>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  padding: '2px 8px',
                                  borderRadius: 999,
                                  background: isChillTech ? 'rgba(0, 194, 255, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                                  color: roleColor,
                                  border: `1px solid ${roleColor}40`,
                                }}
                              >
                                Executive
                              </span>
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                marginTop: 4,
                                fontSize: '0.86rem',
                                color: 'var(--text-dim)',
                                flexWrap: 'wrap',
                              }}
                            >
                              <span style={{ color: roleColor, fontWeight: 700 }}>{job.org}</span>
                              <span>•</span>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                <FiMapPin style={{ fontSize: '0.8rem' }} /> {job.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Status / Period Pill */}
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '6px 14px',
                            borderRadius: 999,
                            background: isChillTech ? 'rgba(0, 194, 255, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                            border: `1px solid ${roleColor}35`,
                            color: 'var(--text)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              background: '#22c55e',
                              boxShadow: '0 0 8px #22c55e',
                              display: 'inline-block',
                            }}
                          />
                          <FiCalendar style={{ fontSize: '0.8rem', color: roleColor }} />
                          <span>{job.period}</span>
                        </div>
                      </div>

                      {/* Responsibilities Grid */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                          gap: 12,
                        }}>
                          {job.points.map((p) => (
                            <div
                              key={p}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                fontSize: '0.88rem',
                                color: 'var(--text)',
                                lineHeight: 1.55,
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.04)',
                                padding: '10px 14px',
                                borderRadius: 12,
                              }}
                            >
                              <FiCheckCircle
                                style={{
                                  color: roleColor,
                                  fontSize: '1rem',
                                  flexShrink: 0,
                                  marginTop: 3,
                                }}
                              />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Key Highlights / Achievements */}
                      {job.achievements.length > 0 && (
                        <div style={{ marginBottom: 18 }}>
                          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800, color: 'var(--text-dim)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <FiAward style={{ color: roleColor }} /> Key Impact &amp; Highlights
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {job.achievements.map((a) => (
                              <div
                                key={a}
                                style={{
                                  fontSize: '0.84rem',
                                  padding: '10px 16px',
                                  borderRadius: 12,
                                  background: isChillTech
                                    ? 'linear-gradient(90deg, rgba(0, 194, 255, 0.08) 0%, rgba(12, 18, 34, 0.4) 100%)'
                                    : 'linear-gradient(90deg, rgba(245, 158, 11, 0.08) 0%, rgba(12, 18, 34, 0.4) 100%)',
                                  color: 'var(--text)',
                                  border: `1px solid ${roleColor}30`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 8,
                                  fontWeight: 500,
                                }}
                              >
                                <span style={{ color: roleColor, fontSize: '1rem' }}>✦</span>
                                {a}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Competency & Skill Tags */}
                      {skillsList.length > 0 && (
                        <div style={{ paddingTop: 14, borderTop: '1px solid var(--panel-border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              Core Competencies:
                            </span>
                            {skillsList.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  fontSize: '0.74rem',
                                  padding: '3px 10px',
                                  borderRadius: 999,
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  border: '1px solid var(--panel-border)',
                                  color: 'var(--text-dim)',
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-vertical-line {
            display: none !important;
          }
          .timeline-node-icon {
            display: none !important;
          }
          .timeline-item {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
