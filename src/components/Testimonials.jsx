import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import { testimonials } from '../data';
import BorderGlow from './reactbits/BorderGlow';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const current = testimonials[index];

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section id="testimonials" className="floating-card section">
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">Client Endorsements</span>
          <h2 className="section-title">
            Trusted by <span className="gradient-text">Visionaries</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Real reviews and feedback from enterprise executives, founders, and organization leaders.
          </p>
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <BorderGlow
            borderRadius={24}
            glowColor="190 90% 65%"
            colors={['#00c2ff', '#818cf8', '#22d3ee']}
            backgroundColor="transparent"
            edgeSensitivity={35}
          >
            <div
              className="glass"
              style={{
                padding: 'clamp(28px, 6vw, 48px)',
                textAlign: 'center',
                minHeight: 280,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Header inside card: Stars + Project Tag */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                {/* 5-Star Rating */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, color: '#f59e0b', fontSize: '1.25rem' }}>
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <FiStar key={i} fill="#f59e0b" style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.45))' }} />
                  ))}
                </div>

                {/* Verified Project Badge */}
                {current.project && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 12px',
                      borderRadius: 999,
                      background: 'rgba(0, 194, 255, 0.1)',
                      border: '1px solid rgba(0, 194, 255, 0.25)',
                      color: 'var(--electric-blue)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                    }}
                  >
                    <FiCheckCircle style={{ fontSize: '0.85rem' }} />
                    <span>Verified Project: {current.project}</span>
                  </div>
                )}
              </div>

              {/* Animated Testimonial Text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                      lineHeight: 1.75,
                      color: 'var(--text)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      maxWidth: 680,
                      margin: '0 auto',
                    }}
                  >
                    “{current.quote}”
                  </p>

                  {/* Reviewer Profile */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 28 }}>
                    {/* Avatar Initials Bubble */}
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #00c2ff 0%, #6366f1 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px rgba(0, 194, 255, 0.35)',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {getInitials(current.name)}
                    </div>

                    <div style={{ textAlign: 'left' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: '1.05rem',
                          color: 'var(--text)',
                        }}
                      >
                        {current.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 2 }}>
                        {current.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32 }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    style={{
                      width: i === index ? 28 : 8,
                      height: 8,
                      borderRadius: 999,
                      background: i === index ? 'var(--electric-blue)' : 'var(--text-dim)',
                      opacity: i === index ? 1 : 0.3,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Left / Right Nav Arrows */}
              <button
                onClick={prev}
                aria-label="Previous review"
                className="btn-ghost"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  border: '1px solid var(--panel-border)',
                  background: 'var(--bg-card-hover)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={next}
                aria-label="Next review"
                className="btn-ghost"
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  border: '1px solid var(--panel-border)',
                  background: 'var(--bg-card-hover)',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <FiChevronRight />
              </button>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
