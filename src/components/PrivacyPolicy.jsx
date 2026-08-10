import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiShield, FiArrowLeft, FiArrowRight, FiMessageSquare,
  FiSun, FiMoon, FiLock,
} from 'react-icons/fi';
import { profile } from '../data';
import Logo from './Logo';

const SECTIONS = [
  {
    category: 'General',
    title: '1. Introduction',
    body: `Welcome to CHILL TECH LTD ("we", "our", "us"). We are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.

Please read this policy carefully. If you disagree with any part, please discontinue use of our site.`,
  },
  {
    category: 'Data Collection',
    title: '2. Information We Collect',
    body: `We may collect the following categories of personal information:

• Contact Details — name, email address, phone number provided through our contact form.
• Usage Data — pages visited, time spent, browser type, IP address, and device information collected automatically via analytics tools.
• Communications — the content of any messages you send to us, including enquiries and project briefs.
• Professional Information — company name, role, or project details you voluntarily share when requesting a quote or collaboration.`,
  },
  {
    category: 'Usage',
    title: '3. How We Use Your Information',
    body: `We use the information we collect to:

• Respond to your enquiries and service requests.
• Deliver the web development, digital strategy, or consultancy services you have engaged us for.
• Improve and personalise your experience on our website.
• Send you relevant updates, newsletters, or promotional content — only with your explicit consent.
• Comply with applicable laws, regulations, and legal obligations.
• Detect and prevent fraudulent or unauthorised activity.`,
  },
  {
    category: 'Legal Basis',
    title: '4. Legal Basis for Processing',
    body: `Where applicable under data protection legislation, we process your data on the following lawful bases:

• Contractual Necessity — to perform the services you have requested.
• Legitimate Interests — to improve our services and maintain our business operations.
• Consent — for marketing communications and non-essential cookies.
• Legal Obligation — to comply with applicable laws and regulatory requirements.`,
  },
  {
    category: 'Third Parties',
    title: '5. Sharing of Information',
    body: `We do not sell, rent, or trade your personal information. We may share it with:

• Service Providers — trusted third parties who assist us in operating our website or conducting our business (e.g., email delivery, analytics), subject to strict confidentiality obligations.
• Legal Authorities — where required to comply with a court order, legal process, or governmental request.
• Business Transfers — in the event of a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.`,
  },
  {
    category: 'Cookies',
    title: '6. Cookies & Tracking',
    body: `Our website uses cookies and similar tracking technologies to enhance your experience. Cookies are small text files placed on your device. We use:

• Essential Cookies — required for the website to function correctly.
• Analytics Cookies — to understand how visitors interact with our site.
• Preference Cookies — to remember your settings and preferences.

You may control cookie settings through your browser. Disabling cookies may affect site functionality.`,
  },
  {
    category: 'Retention',
    title: '7. Data Retention',
    body: `We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact form submissions are retained for up to 24 months. After that period, data is securely deleted or anonymised.`,
  },
  {
    category: 'Security',
    title: '8. Data Security',
    body: `We implement industry-standard technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. These include encrypted connections (HTTPS), access controls, and secure hosting infrastructure.

However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security and encourage you to take care when sharing information online.`,
  },
  {
    category: 'Your Rights',
    title: '9. Your Rights',
    body: `Depending on your jurisdiction, you may have the right to:

• Access the personal data we hold about you.
• Request correction of inaccurate or incomplete data.
• Request erasure of your personal data ("right to be forgotten").
• Restrict or object to our processing of your data.
• Request data portability in a machine-readable format.
• Withdraw consent at any time.

To exercise any of these rights, please contact us at chiltech2k26@gmail.com. We will respond within 30 days.`,
  },
  {
    category: 'Compliance',
    title: '10. Children\'s Privacy & Third-Party Links',
    body: `Our services are not directed at children under the age of 13. We do not knowingly collect personal information from children.

Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party sites.`,
  },
];

export default function PrivacyPolicy() {
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Privacy Policy — CHILL TECH LTD';
    return () => {
      document.title = 'CHILL TECH LTD';
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('chill_tech_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <div className="privacy-page">
      {/* ── Sticky Header ── */}
      <header className="privacy-header">
        <a href="#/" className="privacy-logo" aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: '50%', overflow: 'hidden',
            background: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
            border: '2px solid rgba(0,194,255,0.3)',
          }}>
            <Logo width={38} />
          </div>
          <span className="privacy-logo-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
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
          <a href="#/" className="btn btn-ghost privacy-home-btn" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            <FiArrowLeft /> Home
          </a>
          <a href="#/work-with-me" className="btn btn-primary privacy-cta-btn" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
            Hire Me <FiArrowRight />
          </a>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <div className="privacy-hero" style={{ position: 'relative', overflow: 'hidden' }}>
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
            <FiShield /> Legal &amp; Transparency
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 16 }}>
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 580 }}>
            How CHILL TECH LTD collects, uses, protects, and handles your personal information.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, fontSize: '0.78rem', color: 'var(--text-dim)', background: 'rgba(0,194,255,0.06)', border: '1px solid rgba(0,194,255,0.18)', padding: '4px 12px', borderRadius: 999 }}>
            <FiLock style={{ color: '#00c2ff' }} /> Effective Date: 1 August 2026
          </div>
        </motion.div>
      </div>

      {/* ── Privacy Sections ── */}
      <div className="container" style={{ maxWidth: 860, paddingTop: 8, paddingBottom: 60 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SECTIONS.map((s, idx) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass"
              style={{
                padding: 'clamp(20px, 4vw, 32px)',
                borderRadius: 18,
                border: '1px solid var(--panel-border)',
                transition: 'border-color 0.3s ease, boxShadow 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '4px 9px',
                  borderRadius: 999,
                  background: 'rgba(0,194,255,0.1)',
                  color: 'var(--cyan)',
                  border: '1px solid rgba(0,194,255,0.2)',
                  whiteSpace: 'nowrap',
                }}>
                  {s.category}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--text)', margin: 0 }}>
                  {s.title}
                </h2>
              </div>
              <p style={{
                color: 'var(--text-dim)',
                fontSize: 'clamp(0.86rem, 2.5vw, 0.94rem)',
                lineHeight: 1.8,
                margin: 0,
                whiteSpace: 'pre-line',
              }}>
                {s.body}
              </p>
            </motion.article>
          ))}
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
              Have questions about your data or privacy rights?
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', margin: 0 }}>
              Reach out directly to our team for prompt resolution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#/faq" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              View FAQs <FiArrowRight />
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
        .privacy-page { min-height: 100vh; background: var(--bg-dark); color: var(--text); }
        .privacy-header {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 32px; gap: 12px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--panel-border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .privacy-logo { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .privacy-hero { padding-top: 0; }

        @media (max-width: 768px) {
          .privacy-header { padding: 10px 16px; gap: 8px; }
          .privacy-logo-name { display: none; }
          .privacy-home-btn { display: none; }
          .privacy-cta-btn { padding: 8px 14px !important; font-size: 0.78rem !important; }
        }
        @media (max-width: 480px) {
          .privacy-header { padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
}
