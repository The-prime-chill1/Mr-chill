import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data';
import LightRays from './reactbits/LightRays';
import StarBorder from './reactbits/StarBorder';

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Initialise EmailJS once when component mounts (v4 API)
  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Send email via EmailJS (init already called in useEffect)
    // If EmailJS is configured and service ID looks valid, use EmailJS
    if (window.emailjs && import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_SERVICE_ID.startsWith('service_')) {
      window.emailjs.send(
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
      // Fallback: open WhatsApp with prefilled message
      const whatsappMessage = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
      const whatsappUrl = `${profile.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  const btnLabel = {
    idle: 'Send Message',
    sending: 'Sending…',
    success: 'Message Sent ✓',
    error: 'Failed — Try Again',
  }[status];


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
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Brand Email</div>
                <div style={{ color: 'var(--electric-blue)' }}>{profile.email}</div>
              </a>
              <a href={`mailto:${profile.emailPersonal}`}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Personal Email</div>
                <div style={{ color: 'var(--electric-blue)' }}>{profile.emailPersonal}</div>
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
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="contact-input"
              />
            </div>
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="contact-input"
            />
            <StarBorder as="button" type="submit" color={status === 'error' ? '#ff4d4d' : status === 'success' ? '#22d3ee' : '#22d3ee'} speed="5s" thickness={1.5} style={{ width: '100%', opacity: status === 'sending' ? 0.7 : 1 }} disabled={status === 'sending'}>
              {btnLabel}
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
        @media (max-width: 480px) {
          .contact-input {
            padding: 16px 14px;
            font-size: 1rem;
          }
          .contact-grid {
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
