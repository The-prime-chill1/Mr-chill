import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown, FiHelpCircle, FiMessageSquare,
  FiArrowRight, FiArrowLeft, FiSun, FiMoon,
} from 'react-icons/fi';
import { profile } from '../data';
import Logo from './Logo';

const FAQ_ITEMS = [
  {
    question: 'What services does CHILL TECH LTD provide?',
    answer: 'We specialize in full-stack web application development, high-converting e-commerce platforms, custom real estate portals, admin dashboards, and strategic business consulting across Nigeria and internationally.',
    category: 'Services',
  },
  {
    question: 'How long does a website or web application project take?',
    answer: 'Standard business and portfolio websites typically take 1 to 2 weeks. Complex custom web applications, e-commerce stores, or real estate portals take 2 to 4 weeks depending on the exact scope and functionality required.',
    category: 'Timeline',
  },
  {
    question: 'What technologies and frameworks do you use?',
    answer: 'We use a modern high-performance stack: React, JavaScript (ES6+), TypeScript, Three.js, Framer Motion for cinematic animations, and custom CSS glassmorphism. All projects are optimized for mobile responsiveness and ultra-fast page speeds.',
    category: 'Tech Stack',
  },
  {
    question: 'How do I hire CHILL TECH or request a project quote?',
    answer: 'You can click the "Work With Me" tab in the navigation bar to use our interactive Project Cost Estimator, fill out the contact form below, or reach out directly on WhatsApp at +234 913 763 2195.',
    category: 'Hiring',
  },
  {
    question: 'Do you provide website redesigns for existing platforms?',
    answer: 'Yes! We can elevate and redesign your existing website with a luxury dark theme, Apple/Linear aesthetic, smooth micro-animations, mobile responsiveness, and SEO optimization without breaking your existing workflow.',
    category: 'Redesign',
  },
  {
    question: 'Do you offer post-launch maintenance and technical support?',
    answer: 'Absolutely. Every project includes continuous post-launch support, performance optimization, security audits, and domain/hosting configuration via high-speed CDNs (Vercel / Netlify).',
    category: 'Support',
  },
  {
    question: 'Can you build a website that works both on mobile and desktop?',
    answer: 'Every single project we deliver is fully responsive — pixel-perfect on mobile phones, tablets, and large desktop screens. Mobile performance and accessibility are core requirements, never afterthoughts.',
    category: 'Mobile',
  },
  {
    question: 'What is your payment structure?',
    answer: 'We typically work with a 50% upfront deposit before development begins, and the remaining 50% upon project delivery. For larger enterprise projects, milestone-based payments can be arranged.',
    category: 'Payment',
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('chill_tech_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const toggle = (idx) => setActiveIndex(activeIndex === idx ? null : idx);

  return (
    <div className="faq-page">
      {/* ── Sticky Header ── */}
      <header className="faq-header">
        <a href="#/" className="faq-logo" aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', overflow: 'hidden',
            background: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
            border: '2px solid rgba(0,194,255,0.3)',
          }}>
            <Logo width={38} />
          </div>
          <span className="faq-logo-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
            CHILL <span className="gradient-text">TECH</span>
          </span>
        </a>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost"
            aria-label="Toggle theme"
            style={{ padding: '8px 14px', color: theme === 'dark' ? '#f59e0b' : '#3b82f6' }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#/" className="btn btn-ghost faq-home-btn" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            <FiArrowLeft /> Home
          </a>
          <a href="#/work-with-me" className="btn btn-primary faq-cta-btn" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
            Hire Me <FiArrowRight />
          </a>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <div className="faq-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,194,255,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,194,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px', pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(48px, 8vw, 80px) 20px 40px' }}
        >
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <FiHelpCircle /> FAQs &amp; Answers
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 16 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
            Everything you need to know about working with CHILL TECH LTD — project timelines, pricing, tech stack, and more.
          </p>
        </motion.div>
      </div>

      {/* ── FAQ Accordion ── */}
      <div className="container" style={{ maxWidth: 860, paddingTop: 8, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass"
                style={{
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: isOpen ? '1px solid rgba(0,194,255,0.45)' : '1px solid var(--panel-border)',
                  boxShadow: isOpen ? '0 0 28px rgba(0,194,255,0.12)' : 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: 'clamp(16px, 3vw, 22px) clamp(16px, 4vw, 28px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: 'transparent',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                    <span style={{
                      flexShrink: 0,
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '4px 9px',
                      borderRadius: 999,
                      background: 'rgba(0,194,255,0.1)',
                      color: 'var(--cyan)',
                      border: '1px solid rgba(0,194,255,0.2)',
                      marginTop: 2,
                      whiteSpace: 'nowrap',
                    }}>
                      {item.category}
                    </span>
                    {item.question}
                  </span>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: isOpen ? 'rgba(0,194,255,0.15)' : 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isOpen ? 'var(--cyan)' : 'var(--text-dim)',
                    transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    flexShrink: 0,
                  }}>
                    <FiChevronDown />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div style={{
                        padding: '0 clamp(16px, 4vw, 28px) clamp(16px, 3vw, 24px)',
                        color: 'var(--text-dim)',
                        fontSize: 'clamp(0.86rem, 2.5vw, 0.94rem)',
                        lineHeight: 1.75,
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: 14,
                      }}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass"
          style={{
            marginTop: 40,
            padding: 'clamp(20px, 5vw, 32px)',
            borderRadius: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
            background: 'linear-gradient(135deg, rgba(0,194,255,0.08) 0%, rgba(12,18,34,0.6) 100%)',
            border: '1px solid rgba(0,194,255,0.25)',
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>
              Have a specific question or custom project inquiry?
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', margin: 0 }}>
              Let's talk directly about your goals and requirements.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#/quote" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              Get a Quote <FiArrowRight />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <FiMessageSquare /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .faq-page { min-height: 100vh; background: var(--bg-dark); color: var(--text); }
        .faq-header {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 32px; gap: 12px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--panel-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .faq-logo { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .faq-hero { padding-top: 0; }

        @media (max-width: 768px) {
          .faq-header { padding: 10px 16px; gap: 8px; }
          .faq-logo-name { display: none; }
          .faq-home-btn { display: none; }
          .faq-cta-btn { padding: 8px 14px !important; font-size: 0.78rem !important; }
        }
        @media (max-width: 480px) {
          .faq-header { padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
}
