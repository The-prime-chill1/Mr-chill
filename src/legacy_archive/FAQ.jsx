import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import { profile } from '../data';

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
    answer: 'Absoluty. Every project includes continuous post-launch support, performance optimization, security audits, and domain/hosting configuration via high-speed CDNs (Vercel / Netlify).',
    category: 'Support',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="floating-card section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FiHelpCircle /> FAQs & Answers
          </span>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 640 }}>
            Everything you need to know about working with CHILL TECH LTD, project timelines, pricing, and custom web development.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: isOpen ? '1px solid rgba(0, 194, 255, 0.45)' : '1px solid var(--panel-border)',
                  boxShadow: isOpen ? '0 0 24px rgba(0, 194, 255, 0.12)' : 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: 'clamp(16px, 3.5vw, 22px) clamp(16px, 4vw, 28px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: 'transparent',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(0.92rem, 2.5vw, 1.05rem)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '3px 8px',
                        borderRadius: 999,
                        background: 'rgba(0, 194, 255, 0.1)',
                        color: 'var(--cyan)',
                        border: '1px solid rgba(0, 194, 255, 0.2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.category}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(0, 194, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--cyan)' : 'var(--text-dim)',
                      transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      flexShrink: 0,
                    }}
                  >
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
                      <div
                        style={{
                          padding: '0 clamp(16px, 4vw, 28px) clamp(14px, 3vw, 24px)',
                          color: 'var(--text-dim)',
                          fontSize: 'clamp(0.86rem, 2vw, 0.94rem)',
                          lineHeight: 1.7,
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                          paddingTop: 14,
                        }}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Card underneath FAQ */}
        <div
          className="glass"
          style={{
            maxWidth: 840,
            margin: 'clamp(28px, 5vw, 40px) auto 0',
            padding: 'clamp(18px, 4vw, 28px)',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            background: 'linear-gradient(135deg, rgba(0, 194, 255, 0.08) 0%, rgba(12, 18, 34, 0.6) 100%)',
            border: '1px solid rgba(0, 194, 255, 0.25)',
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.98rem, 2.5vw, 1.1rem)', fontWeight: 700, marginBottom: 4, color: 'var(--text)' }}>
              Have more questions or a custom inquiry?
            </h4>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.86rem', margin: 0 }}>
              Let's talk directly about your project goals and requirements.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#/quote" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '0.84rem' }}>
              Get a Quote <FiArrowRight />
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              style={{ padding: '10px 16px', fontSize: '0.84rem' }}
            >
              <FiMessageSquare /> WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
