import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiLayers,
  FiSearch,
  FiCheckCircle,
  FiArrowRight,
  FiMessageSquare,
  FiFilter,
  FiGlobe
} from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa6';
import { projects, profile } from '../data';
import BorderGlow from './reactbits/BorderGlow';

const CATEGORIES = ['All', 'Real Estate', 'E-Commerce', 'Logistics', 'Fintech', 'Education'];

function categorizeProject(project) {
  const desc = (project.title + ' ' + project.description).toLowerCase();
  if (desc.includes('estate') || desc.includes('investment') || desc.includes('property')) return 'Real Estate';
  if (desc.includes('printing') || desc.includes('packaging') || desc.includes('amsolf')) return 'E-Commerce';
  if (desc.includes('institute') || desc.includes('quran') || desc.includes('education') || desc.includes('recruitment')) return 'Education';
  if (desc.includes('logistics') || desc.includes('cargo') || desc.includes('transbridge') || desc.includes('freight') || desc.includes('shipping') || desc.includes('motors') || desc.includes('dealership')) return 'Logistics';
  if (desc.includes('fintech') || desc.includes('expense') || desc.includes('budget')) return 'Fintech';
  return 'E-Commerce';
}

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

// Lazy screenshot thumbnail with smooth skeleton loader
function ProjectThumbnail({ url, title, category }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const colors = getCategoryColor(category);

  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&quality=75&viewport.width=1280&viewport.height=750`;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#070d1a' }}>
      {/* Fallback Artwork when loading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]}25 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: loaded ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${colors[1]}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <FiLayers style={{ fontSize: '1.6rem', color: colors[1] }} />
        </div>
        <span style={{ fontSize: '0.78rem', color: colors[1], fontWeight: 700, letterSpacing: '0.04em' }}>
          {title}
        </span>
      </div>

      {/* Live Website Screenshot via Microlink */}
      {!failed && (
        <img
          src={screenshotUrl}
          alt={`${title} live platform preview`}
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
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    projects.forEach((p) => {
      const cat = categorizeProject(p);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const cat = categorizeProject(project);
      const matchesCategory = activeTab === 'All' || cat === activeTab;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(query);
      const descMatch = project.description.toLowerCase().includes(query);
      const techMatch = project.tech.some((t) => t.toLowerCase().includes(query));
      const catMatch = cat.toLowerCase().includes(query);

      return titleMatch || descMatch || techMatch || catMatch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="portfolio" className="floating-card section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <FiGlobe /> Award-Winning Work
          </span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects & Platforms</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 640 }}>
            Production-ready web applications spanning real estate investment, e-commerce, international supply chain, fintech, and education.
          </p>
        </div>

        {/* Filter Controls Row: Category Tabs + Search Bar */}
        <div style={{ marginBottom: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontSize: 'clamp(0.78rem, 2vw, 0.86rem)',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                    background: isActive ? 'linear-gradient(135deg, #00c2ff, #0080ff)' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#000000' : 'var(--text-dim)',
                    border: isActive ? 'none' : '1px solid var(--panel-border)',
                    boxShadow: isActive ? '0 0 18px rgba(0, 194, 255, 0.35)' : 'none',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '1px 6px',
                      borderRadius: 999,
                      background: isActive ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#000' : 'var(--cyan)',
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div style={{ maxWidth: 440, margin: '0 auto', width: '100%', position: 'relative' }}>
            <FiSearch
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--cyan)',
                fontSize: '1.05rem',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, technology, or sector..."
              aria-label="Search projects"
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                borderRadius: 999,
                border: '1px solid var(--panel-border)',
                background: 'rgba(255, 255, 255, 0.03)',
                color: 'var(--text)',
                fontSize: '0.86rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div
            className="glass"
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              borderRadius: 20,
              maxWidth: 500,
              margin: '0 auto',
            }}
          >
            <FiFilter style={{ fontSize: '2rem', color: 'var(--cyan)', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 6px' }}>No projects found</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', margin: '0 0 16px' }}>
              No works matched your search for "{searchQuery}".
            </p>
            <button
              onClick={() => { setActiveTab('All'); setSearchQuery(''); }}
              className="btn btn-primary"
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(18px, 3vw, 28px)',
          }}
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
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                >
                  <BorderGlow
                    borderRadius={20}
                    glowColor={project.featured ? '190 90% 65%' : '210 80% 65%'}
                    colors={['#00c2ff', '#3b82f6', '#8b5cf6']}
                    backgroundColor="transparent"
                    edgeSensitivity={30}
                  >
                    <div
                      className="glass project-card"
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: 20,
                        border: '1px solid var(--panel-border)',
                        background: 'var(--bg-card, rgba(12, 18, 34, 0.7))',
                      }}
                    >
                      {/* Thumbnail Viewport */}
                      <div
                        style={{
                          height: 195,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <ProjectThumbnail
                          url={project.link}
                          title={project.title}
                          category={cat}
                        />

                        {/* Top Overlay Badges */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            right: 12,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 2,
                            pointerEvents: 'none',
                          }}
                        >
                          {/* Category pill */}
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: 999,
                              background: 'rgba(7, 13, 26, 0.85)',
                              border: '1px solid rgba(0, 194, 255, 0.3)',
                              color: '#00c2ff',
                              backdropFilter: 'blur(8px)',
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c2ff', boxShadow: '0 0 6px #00c2ff' }} />
                            {cat}
                          </span>

                          {/* Live / Featured pill */}
                          {project.featured ? (
                            <span
                              style={{
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                padding: '4px 10px',
                                borderRadius: 999,
                                background: 'linear-gradient(90deg, #00c2ff, #818cf8)',
                                color: '#000000',
                                boxShadow: '0 0 12px rgba(0, 194, 255, 0.5)',
                              }}
                            >
                              FEATURED
                            </span>
                          ) : (
                            <span
                              style={{
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                padding: '3px 8px',
                                borderRadius: 999,
                                background: 'rgba(7, 13, 26, 0.85)',
                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                color: '#22c55e',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                backdropFilter: 'blur(8px)',
                              }}
                            >
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                              LIVE
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div style={{ padding: 'clamp(18px, 4vw, 24px)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.18rem',
                            fontWeight: 800,
                            marginBottom: 8,
                            color: 'var(--text)',
                          }}
                        >
                          {project.title}
                        </h3>

                        <p
                          style={{
                            color: 'var(--text-dim)',
                            fontSize: '0.88rem',
                            lineHeight: 1.6,
                            flexGrow: 1,
                            marginBottom: 18,
                          }}
                        >
                          {project.description}
                        </p>

                        {/* Tech stack badges */}
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
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
                                fontWeight: 600,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{
                              fontSize: '0.84rem',
                              padding: '10px 18px',
                              flex: 1,
                              minWidth: 120,
                              justifyContent: 'center',
                              fontWeight: 700,
                            }}
                          >
                            Live Demo <FiExternalLink />
                          </a>

                          {project.video && (
                            <a
                              href={project.video}
                              target="_blank"
                              rel="noreferrer"
                              className="btn"
                              style={{
                                fontSize: '0.84rem',
                                padding: '10px 16px',
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                borderRadius: 999,
                                fontWeight: 700,
                                textDecoration: 'none',
                                flex: 1,
                                minWidth: 130,
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              <FaYoutube style={{ color: '#ef4444', fontSize: '1.05rem' }} /> Video Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Client Conversion Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="glass"
          style={{
            marginTop: 'clamp(40px, 6vw, 64px)',
            padding: 'clamp(24px, 5vw, 40px)',
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            background: 'linear-gradient(135deg, rgba(0,194,255,0.08) 0%, rgba(12,18,34,0.7) 100%)',
            border: '1px solid rgba(0, 194, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--cyan)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}
            >
              <FiCheckCircle /> Tailored For Commercial Impact
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 3vw, 1.55rem)',
                fontWeight: 800,
                margin: '0 0 8px',
                color: 'var(--text)',
              }}
            >
              Need a High-Performance Website for Your Business?
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
              Whether you need an e-commerce platform, real estate portal, corporate website, or custom web application, CHILL TECH LTD delivers on time and within scope.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="#/quote"
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700 }}
            >
              Get Instant Quote <FiArrowRight />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ padding: '12px 20px', fontSize: '0.92rem', fontWeight: 600 }}
            >
              <FiMessageSquare /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
