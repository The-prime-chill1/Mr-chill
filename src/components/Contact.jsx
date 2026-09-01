import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiCheck, FiCopy, FiMessageSquare, FiGithub } from 'react-icons/fi';
import { SiTiktok, SiInstagram, SiX } from 'react-icons/si';
import { profile } from '../data';
import LightRays from './reactbits/LightRays';
import StarBorder from './reactbits/StarBorder';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    if (window.emailjs && import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_SERVICE_ID.startsWith('service_')) {
      window.emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            from_phone: form.phone,
            subject: form.subject,
            message: form.message,
            to_email: profile.email,
          }
        )
        .then(() => {
          setStatus('success');
          setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          setStatus('error');
        });
    } else {
      const whatsappMessage = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
      const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const btnLabel = {
    idle: 'Send Message',
    sending: 'Sending Message...',
    success: 'Message Sent Successfully',
    error: 'Failed — Try Again',
  }[status];

  return (
    <section id="contact" className="floating-card section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Have a project in mind or looking for strategic business consultation? Reach out today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40 }} className="contact-grid">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="glass"
            style={{ padding: 'clamp(20px, 5vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              {/* Availability Indicator */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: '#22c55e',
                  marginBottom: 24,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                Currently Available for Work
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: 24, fontWeight: 700 }}>
                Direct Contact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Official Email</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem' }}>{profile.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copy Email"
                      style={{
                        background: 'rgba(0, 194, 255, 0.1)',
                        border: '1px solid rgba(0, 194, 255, 0.25)',
                        color: 'var(--cyan)',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {copied ? <FiCheck /> : <FiCopy />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Phone & WhatsApp</div>
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem' }}>
                    {profile.phone}
                  </a>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>GitHub Profile</div>
                  <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem' }}>
                    github.com/The-prime-chill1
                  </a>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>TikTok Profile</div>
                  <a href={profile.tiktok} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <SiTiktok style={{ fontSize: '0.9rem' }} /> @chill_tech_ltd
                  </a>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>X / Twitter Profile</div>
                  <a href={profile.twitter} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <SiX style={{ fontSize: '0.85rem' }} /> @chill_tech_ltd
                  </a>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Instagram Profile</div>
                  <a href={profile.instagram} target="_blank" rel="noreferrer" style={{ color: 'var(--electric-blue)', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <SiInstagram style={{ fontSize: '0.9rem' }} /> @chill_tech_ltd
                  </a>
                </div>

                <div className="contact-info-item">
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Office Address</div>
                  <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.92rem', lineHeight: 1.5 }}>
                    31 Grace Court, Chois Oasis,<br />
                    Abijo GRA, Ibeju-Lekki,<br />
                    Lagos, Nigeria
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp CTA Button */}
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn"
              style={{
                marginTop: 32,
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#22c55e',
                justifyContent: 'center',
              }}
            >
              <FiMessageSquare /> Chat Directly on WhatsApp
            </a>
          </motion.div>

          {/* Form Card */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            onSubmit={handleSubmit}
            className="glass"
            style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
              <input
                required
                name="name"
                placeholder="Your Full Name"
                value={form.name}
                onChange={handleChange}
                className="contact-input"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={form.email}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={handleChange}
                className="contact-input"
              />
              <input
                required
                name="subject"
                placeholder="Subject / Project Type"
                value={form.subject}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <textarea
              required
              name="message"
              placeholder="Tell me about your project or inquiry..."
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="contact-input"
            />
            <StarBorder
              as="button"
              type="submit"
              color={status === 'error' ? '#ff4d4d' : '#00c2ff'}
              speed="4s"
              thickness={1.8}
              style={{ width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}
              disabled={status === 'sending'}
            >
              {btnLabel}
            </StarBorder>
          </motion.form>
        </div>
      </div>

      <style>{`
        .contact-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--panel-border);
          border-radius: 12px;
          padding: 14px 18px;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.92rem;
          width: 100%;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-input:focus {
          outline: none;
          border-color: #00c2ff;
          box-shadow: 0 0 16px rgba(0, 194, 255, 0.25);
        }
        .contact-input::placeholder { color: var(--text-dim); }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
