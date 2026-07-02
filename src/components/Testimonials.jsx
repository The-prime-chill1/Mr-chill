import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data';
import BorderGlow from './reactbits/BorderGlow';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const current = testimonials[index];
  const isPlaceholder = current.quote.startsWith('PLACEHOLDER');

  return (
    <section id="testimonials" className="floating-card floating-card--soft section">
      <div className="container" style={{ maxWidth: 780 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="eyebrow">Kind Words</span>
          <h2 className="section-title">
            What Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        <BorderGlow
          borderRadius={20}
          glowColor="265 80% 70%"
          colors={['#5b6ee8', '#2f8dff', '#22d3ee']}
          backgroundColor="transparent"
          edgeSensitivity={35}
        >
        <div className="glass" style={{ padding: '48px 40px', textAlign: 'center', minHeight: 220, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic' }}>
                “{isPlaceholder ? current.quote.replace('PLACEHOLDER — real client quote coming. ', '') : current.quote}”
              </p>
              <div style={{ marginTop: 24, fontWeight: 600 }}>{current.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{current.role}</div>
              {isPlaceholder && <div className="placeholder-tag">Placeholder — send real quote</div>}
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
               
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === index ? 'var(--electric-blue)' : 'rgba(255,255,255,0.2)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="btn-ghost"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="btn-ghost"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ›
          </button>
        </div>
        </BorderGlow>
      </div>
    </section>
  );
}
