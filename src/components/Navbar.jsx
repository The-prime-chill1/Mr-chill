import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiUser, FiBarChart2, FiGrid, FiMail,
  FiDownload, FiEye, FiBriefcase, FiHelpCircle, FiSun, FiMoon, FiMessageSquare,
  FiMenu, FiX
} from 'react-icons/fi';
import Logo from './Logo';

const NAV_LINKS = [
  { id: 'top',          icon: FiHome,          label: 'Home',         href: '#top' },
  { id: 'about',        icon: FiUser,          label: 'About',        href: '#about' },
  { id: 'skills',       icon: FiBarChart2,     label: 'Skills',       href: '#skills' },
  { id: 'portfolio',    icon: FiGrid,          label: 'Portfolio',    href: '#portfolio' },
  { id: 'work-with-me', icon: FiBriefcase,     label: 'Work With Me', href: '#/work-with-me' },
  { id: 'quote',        icon: FiMessageSquare, label: 'Get Quote',    href: '#/quote' },
  { id: 'faq',          icon: FiHelpCircle,    label: 'FAQ',          href: '#/faq' },
  { id: 'contact',      icon: FiMail,          label: 'Contact',      href: '#contact' },
];

export default function Navbar({ onDownloadCV, onViewCV, cvUrl }) {
  const [active, setActive] = useState('top');
  const [theme, setTheme]   = useState(() => localStorage.getItem('chill_tech_theme') || 'light');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  /* ── Theme sync ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chill_tech_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  /* ── Scroll shadow listener ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Section observer for active state ── */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    );
    sections.forEach(s => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-container">
        
        {/* Brand / Logo */}
        <a href="#top" className="navbar-brand">
          <div className="logo-ring">
            <Logo width={36} style={{ borderRadius: '50%' }} />
          </div>
          <span className="brand-name">Chill<span className="brand-accent">Tech</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(({ id, icon: Icon, label, href }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href || `#${id}`}
                className={`nav-link ${isActive ? 'is-active' : ''}`}
              >
                <Icon className="nav-link-icon" />
                <span>{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="active-pill-bg"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls (CV + Theme + Mobile toggle) */}
        <div className="navbar-actions">
          
          <a
            href="#/cv"
            className="btn-nav-ghost"
            title="Read CV"
          >
            <FiEye style={{ fontSize: '1.1rem' }} />
            <span className="btn-label-desktop">View CV</span>
          </a>

          <button
            onClick={onDownloadCV}
            className="btn-nav-primary"
            title="Download CV"
          >
            <FiDownload style={{ fontSize: '1rem' }} />
            <span className="btn-label-desktop">CV</span>
          </button>

          <div className="nav-divider" />

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <FiSun style={{ color: '#f59e0b' }} /> : <FiMoon style={{ color: '#3b82f6' }} />}
          </button>

          {/* Hamburger toggle for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-inner">
              {NAV_LINKS.map(({ id, icon: Icon, label, href }) => (
                <a
                  key={id}
                  href={href || `#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${active === id ? 'is-active' : ''}`}
                >
                  <Icon className="mobile-link-icon" />
                  <span>{label}</span>
                </a>
              ))}
              
              <div className="mobile-actions-row">
                <a
                  href="#/cv"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-action-btn view-cv"
                >
                  <FiEye /> View CV
                </a>
                <button
                  onClick={() => { onDownloadCV(); setMobileMenuOpen(false); }}
                  className="mobile-action-btn download-cv"
                >
                  <FiDownload /> Download CV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-header.is-scrolled {
          padding: 10px 24px;
        }

        .navbar-container {
          max-width: 1340px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px 8px 12px;
          border-radius: 999px;
          background: rgba(10, 15, 26, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        [data-theme="light"] .navbar-container {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-ring {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(0, 194, 255, 0.5);
          box-shadow: 0 0 12px rgba(0, 194, 255, 0.3);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .navbar-brand:hover .logo-ring {
          transform: scale(1.05);
        }

        .brand-name {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text, #f8fafc);
          letter-spacing: -0.02em;
        }

        .brand-accent {
          color: var(--cyan, #00c2ff);
        }

        /* Desktop Nav Links */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        [data-theme="light"] .desktop-nav {
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-dim, rgba(255, 255, 255, 0.65));
          text-decoration: none;
          transition: color 0.25s ease;
          z-index: 1;
        }

        .nav-link:hover {
          color: var(--text, #fff);
        }

        .nav-link.is-active {
          color: #051019;
          font-weight: 600;
        }

        [data-theme="light"] .nav-link.is-active {
          color: #fff;
        }

        .nav-link-icon {
          font-size: 0.95rem;
        }

        .active-pill-bg {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--cyan, #00c2ff), var(--electric-blue, #2f8dff));
          box-shadow: 0 4px 14px rgba(0, 194, 255, 0.4);
          z-index: -1;
        }

        /* Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-nav-ghost {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--cyan, #00c2ff);
          text-decoration: none;
          background: rgba(0, 194, 255, 0.08);
          border: 1px solid rgba(0, 194, 255, 0.25);
          transition: all 0.25s ease;
        }

        .btn-nav-ghost:hover {
          background: rgba(0, 194, 255, 0.16);
          transform: translateY(-1px);
        }

        .btn-nav-primary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #051019;
          background: linear-gradient(135deg, var(--cyan, #00c2ff), var(--electric-blue, #2f8dff));
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 194, 255, 0.3);
          transition: all 0.25s ease;
        }

        .btn-nav-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(0, 194, 255, 0.45);
        }

        .nav-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 2px;
        }

        [data-theme="light"] .nav-divider {
          background: rgba(0, 0, 0, 0.1);
        }

        .theme-toggle-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.25s ease;
        }

        [data-theme="light"] .theme-toggle-btn {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        .theme-toggle-btn:hover {
          transform: scale(1.08);
        }

        .mobile-menu-btn {
          display: none;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text);
          cursor: pointer;
          font-size: 1.2rem;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          overflow: hidden;
          max-width: 1340px;
          margin: 8px auto 0;
        }

        .mobile-drawer-inner {
          padding: 16px;
          border-radius: 20px;
          background: rgba(10, 15, 26, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        [data-theme="light"] .mobile-drawer-inner {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: var(--text-dim);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .mobile-nav-link.is-active {
          background: rgba(0, 194, 255, 0.1);
          color: var(--cyan, #00c2ff);
          font-weight: 600;
        }

        .mobile-actions-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }

        .mobile-action-btn.view-cv {
          background: rgba(0, 194, 255, 0.1);
          color: var(--cyan);
          border: 1px solid rgba(0, 194, 255, 0.2);
        }

        .mobile-action-btn.download-cv {
          background: linear-gradient(135deg, var(--cyan, #00c2ff), var(--electric-blue, #2f8dff));
          color: #051019;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .btn-nav-ghost, .btn-nav-primary {
            display: none;
          }
          .nav-divider {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .navbar-header {
            padding: 10px 12px;
          }
        }
      `}</style>
    </header>
  );
}
