import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiCheck,
  FiCopy,
  FiMessageSquare,
  FiGithub,
  FiMapPin,
  FiSend,
  FiUser,
  FiTag,
  FiClock,
  FiArrowRight,
  FiExternalLink
} from 'react-icons/fi';
import { SiTiktok, SiInstagram, SiX } from 'react-icons/si';
import emailjs from '@emailjs/browser';
import { profile } from '../data';
import LightRays from './reactbits/LightRays';
import StarBorder from './reactbits/StarBorder';

const PROJECT_TYPES = [
  'Custom Website',
  'Web App / SaaS',
  'E-Commerce Store',
  'Real Estate Portal',
  'Consultation / Other'
];

export default function Contact() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Custom Website',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [copiedPersonal, setCopiedPersonal] = useState(false);
  const [copiedOfficial, setCopiedOfficial] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopyPersonalEmail = () => {
    navigator.clipboard.writeText(profile.personalEmail);
    setCopiedPersonal(true);
    setTimeout(() => setCopiedPersonal(false), 2500);
  };

  const handleCopyOfficialEmail = () => {
    navigator.clipboard.writeText(profile.officialEmail);
    setCopiedOfficial(true);
    setTimeout(() => setCopiedOfficial(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (emailjs && serviceId && serviceId.startsWith('service_')) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            from_phone: form.phone || 'Not provided',
            subject: `[${form.projectType}] Inquiry from ${form.name}`,
            message: form.message,
            to_email: profile.email,
          }
        )
        .then(() => {
          setStatus('success');
          setForm({ name: '', email: '', phone: '', projectType: 'Custom Website', message: '' });
        })
        .catch((err) => {
          console.error('EmailJS send error:', err);
          // Fallback to WhatsApp
          forwardToWhatsApp();
        });
    } else {
      forwardToWhatsApp();
    }
  };

  const forwardToWhatsApp = () => {
    const text = `*New Project Inquiry — CHILL TECH LTD*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n` +
      `📱 *Phone:* ${form.phone || 'N/A'}\n` +
      `💼 *Service:* ${form.projectType}\n\n` +
      `📝 *Message:*\n${form.message}`;

    const url = `${profile.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setStatus('success');
    setForm({ name: '', email: '', phone: '', projectType: 'Custom Website', message: '' });
  };

  return (
    <section id="contact" className="floating-card section" style={{ position: 'relative' }}>
      {/* Background Ambience */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {isMobile ? (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,194,255,0.08) 0%, transparent 70%)',
          }} />
        ) : (
          <LightRays
            raysOrigin="top-center"
            raysColor="#00c2ff"
            raysSpeed={1.2}
            lightSpread={0.8}
            rayLength={1.4}
            followMouse
            mouseInfluence={0.12}
            noiseAmount={0.05}
            distortion={0.03}
            fadeDistance={1.1}
            saturation={0.9}
          />
        )}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <FiMail /> Get In Touch
          </span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 640 }}>
            Have a project in mind, need a bespoke software application, or seeking strategic business consultation? Reach out directly to our team.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'clamp(24px, 4vw, 44px)' }} className="contact-grid">
          {/* ── Left Column: Direct Channels & Corporate Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="glass"
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              borderRadius: 24,
              border: '1px solid var(--panel-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 28,
            }}
          >
            <div>
              {/* Live Availability Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 16px',
                  borderRadius: 999,
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#22c55e',
                  marginBottom: 24,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                <span>Currently Available for New Projects</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: 20, fontWeight: 800, color: 'var(--text)' }}>
                Direct Communication Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* 1. Official Company Email */}
                <div
                  className="contact-card-box"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--panel-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 6 }}>
                    <FiMail style={{ color: 'var(--cyan)' }} /> Company / Official Email
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <a href={`mailto:${profile.officialEmail}`} style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.92rem', wordBreak: 'break-all', textDecoration: 'none' }}>
                      {profile.officialEmail}
                    </a>
                    <button
                      onClick={handleCopyOfficialEmail}
                      aria-label="Copy Official Email"
                      className="contact-copy-btn"
                    >
                      {copiedOfficial ? <FiCheck /> : <FiCopy />}
                      <span>{copiedOfficial ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Direct / Founder Email */}
                <div
                  className="contact-card-box"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--panel-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 6 }}>
                    <FiUser style={{ color: '#818cf8' }} /> Founder &amp; Direct Email
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                    <a href={`mailto:${profile.personalEmail}`} style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.92rem', wordBreak: 'break-all', textDecoration: 'none' }}>
                      {profile.personalEmail}
                    </a>
                    <button
                      onClick={handleCopyPersonalEmail}
                      aria-label="Copy Personal Email"
                      className="contact-copy-btn"
                    >
                      {copiedPersonal ? <FiCheck /> : <FiCopy />}
                      <span>{copiedPersonal ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* 3. Phone & WhatsApp */}
                <div
                  className="contact-card-box"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--panel-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 6 }}>
                    <FiPhone style={{ color: '#22c55e' }} /> Phone &amp; Instant WhatsApp
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <a href={profile.whatsapp} target="_blank" rel="noreferrer" style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
                      {profile.phone}
                    </a>
                    <span style={{ fontSize: '0.74rem', color: '#22c55e', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <FiClock /> Fast Response
                    </span>
                  </div>
                </div>

                {/* 4. Office Location */}
                <div
                  className="contact-card-box"
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--panel-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 6 }}>
                    <FiMapPin style={{ color: '#f59e0b' }} /> Registered Office Address
                  </div>
                  <div style={{ color: 'var(--text)', fontSize: '0.88rem', lineHeight: 1.5, fontWeight: 500 }}>
                    31 Grace Court, Chois Oasis, Abijo GRA, Ibeju-Lekki, Lagos, Nigeria
                  </div>
                </div>

                {/* 5. Social & Developer Links */}
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: 10 }}>
                    Official Channels &amp; Developer Profiles
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="social-chip" title="GitHub">
                      <FiGithub /> <span>GitHub</span>
                    </a>
                    <a href={profile.tiktok} target="_blank" rel="noreferrer" className="social-chip" title="TikTok">
                      <SiTiktok /> <span>TikTok</span>
                    </a>
                    <a href={profile.twitter} target="_blank" rel="noreferrer" className="social-chip" title="X (Twitter)">
                      <SiX /> <span>Twitter</span>
                    </a>
                    <a href={profile.instagram} target="_blank" rel="noreferrer" className="social-chip" title="Instagram">
                      <SiInstagram /> <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA Button */}
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#fff',
                justifyContent: 'center',
                padding: '13px 22px',
                fontSize: '0.92rem',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
              }}
            >
              <FiMessageSquare style={{ fontSize: '1.1rem' }} /> Start Instant WhatsApp Consultation
            </a>
          </motion.div>

          {/* ── Right Column: Interactive Inquiry Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="glass"
            style={{
              padding: 'clamp(24px, 4vw, 38px)',
              borderRadius: 24,
              border: '1px solid var(--panel-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: 6, fontWeight: 800, color: 'var(--text)' }}>
                Send a Message or Project Brief
              </h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', margin: '0 0 20px', lineHeight: 1.5 }}>
                Fill out the form below. We will review your requirements and respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Project Type Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                    Select Service Required
                  </label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = form.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, projectType: type })}
                          style={{
                            padding: '6px 12px',
                            borderRadius: 999,
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: isSelected ? '1px solid var(--cyan)' : '1px solid var(--panel-border)',
                            background: isSelected ? 'rgba(0, 194, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            color: isSelected ? 'var(--cyan)' : 'var(--text-dim)',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: 6 }}>
                      Your Full Name *
                    </label>
                    <input
                      required
                      name="name"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: 6 }}>
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </div>
                </div>

                {/* Phone & Inquiry Type */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: 6 }}>
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="e.g. +234 810 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="contact-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 600, marginBottom: 6 }}>
                    Project Description / Inquiries *
                  </label>
                  <textarea
                    required
                    name="message"
                    placeholder="Describe your project, objectives, desired features, or timeline..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="contact-input"
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>

                {/* Success Banner */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 12,
                        background: 'rgba(34, 197, 94, 0.12)',
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        color: '#22c55e',
                        fontSize: '0.86rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <FiCheck style={{ fontSize: '1.1rem' }} />
                      <span>Inquiry transmitted successfully! We will connect with you shortly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <StarBorder
                  as="button"
                  type="submit"
                  color={status === 'error' ? '#ff4d4d' : '#00c2ff'}
                  speed="4s"
                  thickness={1.8}
                  style={{ width: '100%', opacity: status === 'sending' ? 0.7 : 1, marginTop: 4 }}
                  disabled={status === 'sending'}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '0.95rem' }}>
                    <FiSend />
                    {status === 'sending' ? 'Transmitting Message...' : 'Send Message / Inquire Now'}
                  </span>
                </StarBorder>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          border-radius: 12px;
          padding: 12px 16px;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.9rem;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .contact-input:focus {
          outline: none;
          border-color: var(--cyan, #00c2ff);
          box-shadow: 0 0 16px rgba(0, 194, 255, 0.25);
        }

        .contact-input::placeholder {
          color: var(--text-dim);
          opacity: 0.7;
        }

        .contact-copy-btn {
          background: rgba(0, 194, 255, 0.1);
          border: 1px solid rgba(0, 194, 255, 0.25);
          color: var(--cyan);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .contact-copy-btn:hover {
          background: rgba(0, 194, 255, 0.2);
          transform: translateY(-1px);
        }

        .social-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          color: var(--text);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-chip:hover {
          border-color: var(--cyan);
          color: var(--cyan);
          background: rgba(0, 194, 255, 0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
