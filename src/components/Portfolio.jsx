import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiLayers, FiStar, FiArrowRight } from 'react-icons/fi';
import { projects, testimonials } from '../data';
import BorderGlow from './reactbits/BorderGlow';

const CATEGORIES = ['All', 'Real Estate', 'E-Commerce', 'Logistics', 'Fintech', 'Education'];

function categorizeProject(project) {
  const desc = (project.title + ' ' + project.description).toLowerCase();
  if (desc.includes('estate') || desc.includes('investment') || desc.includes('property')) return 'Real Estate';
  if (desc.includes('institute') || desc.includes('quran') || desc.includes('education') || desc.includes('recruitment')) return 'Education';
  if (desc.includes('logistics') || desc.includes('cargo') || desc.includes('transbridge')) return 'Logistics';
  if (desc.includes('fintech') || desc.includes('expense') || desc.includes('budget')) return 'Fintech';
  if (desc.includes('motors') || desc.includes('dealership')) return 'Logistics';
  return 'E-Commerce';
}

// Color palette per category for the placeholder thumbnail
const CATEGORY_GRADIENTS = {
  'Real Estate':  ['#0c1222', '#00c2ff'],
  'E-Commerce':   ['#1a0a2e', '#818cf8'],
  'Logistics':    ['#0a1f0a', '#22c55e'],
  'Fintech':      ['#1a1000', '#f7df1e'],
  'Education':    ['#1a0a1a', '#a855f7'],
};

function getCategoryColor(cat) {
  return CATEGORY_GRADIENTS[cat] || ['#0c1222', '#00c2ff'];
}

// Lazy screenshot thumbnail — loads via Microlink CDN, falls back to gradient
function ProjectThumbnail({ url, title, category }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [colors] = useState(() => getCategoryColor(category));

  // Microlink screenshot API — free, edge-cached, returns a screenshot image
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&quality=60&viewport.width=1280&viewport.height=720`;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Gradient placeholder — always visible underneath */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]}33 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <FiLayers style={{ fontSize: '2rem', color: colors[1], opacity: 0.7 }} />
        <span style={{ fontSize: '0.75rem', color: colors[1], opacity: 0.6, fontWeight: 600 }}>
          {title}
        </span>
      </div>

      {/* Actual screenshot — lazy loaded, hidden until loaded */}
      {!failed && (
        <img
          src={screenshotUrl}
          alt={`${title} screenshot`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
            position: 'absolute',
            inset: 0,
          }}
        />
      )}
    </div>
  );
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
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 999,
                fontSize: 'clamp(0.78rem, 2vw, 0.88rem)',
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                background: activeTab === cat ? 'linear-gradient(135deg, #00c2ff, #0080ff)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === cat ? '#000000' : 'var(--text-dim)',
                border: activeTab === cat ? 'none' : '1px solid var(--panel-border)',
                boxShadow: activeTab === cat ? '0 0 20px rgba(0, 194, 255, 0.4)' : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(16px, 3vw, 28px)' }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const cat = categorizeProject(project);
              return (
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
                      {/* Thumbnail banner — uses screenshot, no iframe */}
                      <div
                        style={{
                          height: 180,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <ProjectThumbnail
                          url={project.link}
                          title={project.title}
                          category={cat}
                        />

                        {/* Category badge */}
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
                            background: 'rgba(0,0,0,0.7)',
                            border: '1px solid rgba(0, 194, 255, 0.3)',
                            color: '#00c2ff',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2,
                          }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c2ff', boxShadow: '0 0 6px #00c2ff' }} />
                          {cat}
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
                              zIndex: 2,
                            }}
                          >
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: 'clamp(16px, 4vw, 24px)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
                          {project.title}
                        </h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6, flexGrow: 1, marginBottom: 18 }}>
                          {project.description}
                        </p>

                        {/* Tech stack badges */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
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

                        {/* Action Button */}
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
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Reviews CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: 'clamp(36px, 6vw, 56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 32px)',
            borderRadius: 20,
            background: 'rgba(0,194,255,0.04)',
            border: '1px solid rgba(0,194,255,0.15)',
          }}
        >
          {/* Left: star summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill="#f59e0b" stroke="none"
                  style={{ fontSize: '1.1rem', filter: 'drop-shadow(0 0 5px rgba(245,158,11,0.5))' }} />
              ))}
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '0.94rem', color: 'var(--text)',
              }}>
                {testimonials.length} verified client reviews
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: 2 }}>
                100% 5-star rated · Real feedback from real clients
              </div>
            </div>
          </div>

          {/* Right: CTA button */}
          <a
            href="#/reviews"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '11px 24px', borderRadius: 999,
              background: 'linear-gradient(135deg, #00c2ff, #0080ff)',
              color: '#000', fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 6px 22px rgba(0,194,255,0.3)',
              transition: 'opacity 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Read All Reviews <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
