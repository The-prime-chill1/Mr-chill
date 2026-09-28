import { useMemo, useRef } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CircularGallery from './reactbits/CircularGallery';
import { getTechGalleryItems } from '../utils/techCards';

export default function Skills() {
  const galleryWrapperRef = useRef(null);

  // Generate crisp, verified Canvas PNG cards once on mount
  const items = useMemo(() => getTechGalleryItems(), []);

  const rotateGallery = (dir) => {
    if (!galleryWrapperRef.current) return;
    const target = galleryWrapperRef.current.querySelector('.circular-gallery');
    if (target) {
      target.dispatchEvent(new KeyboardEvent('keydown', {
        key: dir === 'left' ? 'ArrowLeft' : 'ArrowRight',
        bubbles: true,
      }));
    }
  };

  return (
    <section id="skills" className="floating-card section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span className="eyebrow">Technical Capabilities</span>
          <h2 className="section-title">
            Core <span className="gradient-text">Skills & Tech Stack</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
            A high-performance technology suite engineered to build fast, responsive, and scalable digital solutions.
          </p>
        </div>

        {/* ── Compact 3D CircularGallery Showcase ── */}
        <div
          ref={galleryWrapperRef}
          style={{ position: 'relative', marginBottom: 20 }}
        >
          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px 8px',
            fontSize: '0.78rem',
            color: 'var(--text-dim)',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)' }} />
              Drag, scroll, or use arrows to rotate
            </span>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => rotateGallery('left')}
                className="gallery-nav-btn"
                aria-label="Previous skill"
                title="Rotate left"
              >
                <FiChevronLeft />
              </button>
              <button
                onClick={() => rotateGallery('right')}
                className="gallery-nav-btn"
                aria-label="Next skill"
                title="Rotate right"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Compact 3D WebGL Canvas Container */}
          <div
            className="gallery-canvas-wrap glass"
            style={{
              height: '380px',
              position: 'relative',
              borderRadius: 20,
              border: '1px solid var(--panel-border)',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0, 194, 255, 0.05) 0%, rgba(10, 15, 29, 0.8) 100%)',
            }}
          >
            {items.length > 0 && (
              <CircularGallery
                items={items}
                bend={2.4}
                textColor="transparent"
                borderRadius={0.06}
                scrollEase={0.03}
                scrollSpeed={2.2}
              />
            )}
          </div>
        </div>

        {/* Action Button: View All Skills */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="#/skills"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', fontSize: '0.88rem' }}
          >
            View All Skills & Full Tech Stack (18+ Tools & Proficiencies) <FiArrowRight />
          </a>
        </div>
      </div>

      <style>{`
        .gallery-nav-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          background: var(--bg-card);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .gallery-nav-btn:hover {
          background: rgba(0, 194, 255, 0.15);
          border-color: var(--cyan);
          color: var(--cyan);
          transform: scale(1.06);
        }
        @media (max-width: 768px) {
          .gallery-canvas-wrap {
            height: 330px !important;
          }
        }
        @media (max-width: 480px) {
          .gallery-canvas-wrap {
            height: 290px !important;
          }
        }
      `}</style>
    </section>
  );
}
