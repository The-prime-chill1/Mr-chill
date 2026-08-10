import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiLayers } from 'react-icons/fi';
import { projects } from '../data';
import BorderGlow from './reactbits/BorderGlow';

const CATEGORIES = ['All', 'Real Estate', 'E-Commerce', 'Logistics', 'Fintech'];

function categorizeProject(project) {
  const desc = (project.title + ' ' + project.description).toLowerCase();
  if (desc.includes('estate') || desc.includes('investment') || desc.includes('property')) return 'Real Estate';
  if (desc.includes('commerce') || desc.includes('furniture') || desc.includes('fashion') || desc.includes('streetwear') || desc.includes('smile') || desc.includes('shop')) return 'E-Commerce';
  if (desc.includes('logistics') || desc.includes('cargo') || desc.includes('dealership') || desc.includes('transbridge')) return 'Logistics';
  if (desc.includes('fintech') || desc.includes('expense') || desc.includes('budget')) return 'Fintech';
  return 'E-Commerce';
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'All') return true;
    return categorizeProject(p) === activeTab;
  });

  return (
    <section id="portfolio" className="floating-card section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Award-Winning Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Production-ready applications spanning real estate, e-commerce, international logistics, and fintech.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                fontSize: '0.88rem',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                background: activeTab === cat ? 'linear-gradient(135deg, #00c2ff, #0080ff)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === cat ? '#000000' : 'var(--text-dim)',
                border: activeTab === cat ? 'none' : '1px solid var(--panel-border)',
                boxShadow: activeTab === cat ? '0 0 20px rgba(0, 194, 255, 0.4)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <BorderGlow
                  borderRadius={20}
                  glowColor={project.featured ? '190 90% 65%' : '265 80% 70%'}
                  colors={['#00c2ff', '#818cf8', '#22d3ee']}
                  backgroundColor="transparent"
                  edgeSensitivity={30}
                >
                  <div
                    className="glass"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* Thumbnail banner */}
                    <div
                      style={{
                        height: 180,
                        background: 'linear-gradient(135deg, rgba(0, 194, 255, 0.15), rgba(129, 140, 248, 0.15))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 999,
                          background: 'rgba(0,0,0,0.6)',
                          border: '1px solid rgba(0, 194, 255, 0.3)',
                          color: '#00c2ff',
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c2ff', boxShadow: '0 0 6px #00c2ff' }} />
                        {categorizeProject(project)}
                      </span>

                      {project.featured && (
                        <span
                          style={{
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: 999,
                            background: 'linear-gradient(90deg, #00c2ff, #818cf8)',
                            color: '#000000',
                          }}
                        >
                          FEATURED
                        </span>
                      )}

                      {/* Live site iframe preview */}
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          overflow: 'hidden',
                          position: 'relative',
                          borderRadius: 0,
                        }}
                      >
                        <iframe
                          src={project.link}
                          title={`${project.title} preview`}
                          scrolling="no"
                          style={{
                            width: '1280px',
                            height: '720px',
                            border: 'none',
                            transformOrigin: 'top left',
                            transform: 'scale(0.25)',
                            pointerEvents: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        />
                        {/* Overlay to block interaction */}
                        <div style={{ position: 'absolute', inset: 0 }} />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: 24, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
                        {project.title}
                      </h3>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1, marginBottom: 20 }}>
                        {project.description}
                      </p>

                      {/* Tech stack badges */}
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.72rem',
                              padding: '4px 10px',
                              borderRadius: 999,
                              background: 'rgba(0, 194, 255, 0.08)',
                              color: 'var(--cyan)',
                              border: '1px solid rgba(0, 194, 255, 0.2)',
                              fontWeight: 500,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                          style={{ fontSize: '0.82rem', padding: '10px 18px', flex: 1, justifyContent: 'center' }}
                        >
                          Live Demo <FiExternalLink />
                        </a>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
