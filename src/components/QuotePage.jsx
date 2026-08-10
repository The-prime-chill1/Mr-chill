import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiArrowLeft, FiMail, FiPhone, FiSend } from 'react-icons/fi';
import Logo from './Logo';
import { profile } from '../data';

export default function QuotePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('chill_tech_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*Quote Request – CHILL TECH LTD*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`;
    const url = `${profile.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="quote-page">
      {/* Sticky Header */}
      <motion.header className="quote-header" style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', background: 'var(--bg-card)', borderBottom: '1px solid var(--panel-border)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <a href="#/" className="quote-logo" aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid rgba(0,194,255,0.3)' }}>
            <Logo width={38} />
          </div>
          <span className="quote-logo-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
            CHILL <span className="gradient-text">TECH</span>
          </span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ padding: '8px 14px', color: theme === 'dark' ? '#f59e0b' : '#3b82f6', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#/" className="btn btn-ghost" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            <FiArrowLeft /> Home
          </a>
        </div>
      </motion.header>

      {/* Hero Banner */}
      <div className="quote-hero" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(48px,8vw,80px) 20px 40px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,194,255,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,194,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.03) 1px, transparent 1px)', backgroundSize: '44px 44px', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
            <FiMail /> Request a Quote
          </span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: 16 }}>
            Get Your <span className="gradient-text">Custom Quote</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: 560, color: 'var(--text-dim)' }}>
            Fill in the brief details below and we'll get back with a tailored proposal.
          </p>
        </motion.div>
      </div>

      {/* Quote Form */}
      <div className="container" style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px', paddingBottom: 80 }}>
        <motion.form onSubmit={handleSubmit} className="glass" style={{ padding: 'clamp(20px,4vw,32px)', borderRadius: 18, border: '1px solid var(--panel-border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: 16 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--panel-border)', background: 'var(--bg-card-hover)', color: 'var(--text)', fontSize: '0.95rem' }} />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--panel-border)', background: 'var(--bg-card-hover)', color: 'var(--text)', fontSize: '0.95rem' }} />
          <input type="text" name="phone" placeholder="Your Phone (optional)" value={form.phone} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--panel-border)', background: 'var(--bg-card-hover)', color: 'var(--text)', fontSize: '0.95rem' }} />
          <input type="text" name="budget" placeholder="Your Budget (e.g., 50000)" value={form.budget} onChange={handleChange} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--panel-border)', background: 'var(--bg-card-hover)', color: 'var(--text)', fontSize: '0.95rem' }} />
          <textarea name="message" placeholder="Project details, questions..." rows={5} value={form.message} onChange={handleChange} required style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--panel-border)', background: 'var(--bg-card-hover)', color: 'var(--text)', fontSize: '0.95rem' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '0.95rem' }}>
            <FiSend /> Send via WhatsApp
          </button>
        </motion.form>
      </div>

      <style>{`
        .quote-page { min-height: 100vh; background: var(--bg-dark); color: var(--text); }
        .quote-header { /* inline styles used */ }
        .quote-hero { position: relative; overflow: hidden; }
        .container { width: 100%; }
        .glass { background: var(--bg-card); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        @media (max-width: 768px) {
          .quote-header { padding: 10px 16px; gap: 8px; }
          .quote-logo-name { display: none; }
        }
        @media (max-width: 480px) {
          .quote-header { padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
}
