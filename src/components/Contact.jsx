import { useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data';
import LightRays from './reactbits/LightRays';
import StarBorder from './reactbits/StarBorder';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to your form backend of choice (EmailJS, Formspree, etc.)
    setSent(true);
  };

  return (
    <section id="contact" className="floating-card section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#2f8dff"
          raysSpeed={1.1}
          lightSpread={0.7}
          rayLength={1.3}
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0.06}
          distortion={0.03}
          fadeDistance={1.1}
          saturation={0.9}
        />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Together</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40 }} className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="glass"
            style={{ padding: 32 }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: 24 }}>Contact Info</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <a href={`mailto:${profile.email}`}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Email</div>
                <div style={{ color: 'var(--electric-blue)' }}>{profile.email}</div>
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>WhatsApp / Phone</div>
                <div style={{ color: 'var(--electric-blue)' }}>{profile.phone}</div>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>GitHub</div>
                <div style={{ color: 'var(--electric-blue)' }}>The-prime-chill1</div>
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            onSubmit={handleSubmit}
            className="glass"
            style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
              <input
                required
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="contact-input"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <input
              required
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="contact-input"
            />
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="contact-input"
            />
            <StarBorder as="button" type="submit" color="#22d3ee" speed="5s" thickness={1.5} style={{ width: '100%' }}>
              {sent ? 'Message Sent ✓' : 'Send Message'}
            </StarBorder>
          </motion.form>
        </div>
      </div>

      <style>{`
        .contact-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--panel-border);
          border-radius: 10px;
          padding: 13px 16px;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 0.9rem;
          width: 100%;
          resize: vertical;
        }
        .contact-input:focus { outline: none; border-color: var(--electric-blue); }
        .contact-input::placeholder { color: var(--text-dim); }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
