import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../data';
import BorderGlow from './reactbits/BorderGlow';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="floating-card section">
      <div className="container" style={{ maxWidth: 840 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Client Endorsements</span>
          <h2 className="section-title">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Trusted by investors, business owners, and organization leaders across Nigeria.
          </p>
        </div>

        <BorderGlow
          borderRadius={24}
          glowColor="190 90% 65%"
          colors={['#00c2ff', '#818cf8', '#22d3ee']}
          backgroundColor="transparent"
          edgeSensitivity={35}
        >
          <div className="glass" style={{ padding: '48px 36px', textAlign: 'center', minHeight: 260, position: 'relative' }}>
            {/* 5-Star Rating */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, color: '#ffca28', fontSize: '1.2rem', marginBottom: 24 }}>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill="#ffca28" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <p style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}>
                  “{current.quote.replace(/^PLACEHOLDER — real client quote coming\. /, '')}”
                </p>
                <div style={{ marginTop: 28, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#00c2ff' }}>
                  {current.name}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: 4 }}>
                  {current.role}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicator Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 36 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === index ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    background: i === index ? '#00c2ff' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Left / Right Nav Arrows */}
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="btn-ghost"
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: 44,
                height: 44,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
              }}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="btn-ghost"
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: 44,
                height: 44,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
              }}
            >
              ›
            </button>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}
