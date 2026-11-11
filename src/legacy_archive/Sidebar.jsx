import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiUser, FiBarChart2, FiGrid, FiMail,
  FiDownload, FiEye, FiBriefcase, FiHelpCircle, FiSun, FiMoon, FiMessageSquare,
} from 'react-icons/fi';
import Logo from './Logo';

/* ── Nav Items ── */
const LINKS = [
  { id: 'top',          icon: FiHome,       label: 'Home',     href: '#top' },
  { id: 'about',        icon: FiUser,       label: 'About',    href: '#about' },
  { id: 'portfolio',    icon: FiGrid,       label: 'Work',     href: '#portfolio' },
  { id: 'work-with-me', icon: FiBriefcase,  label: 'Hire Me',  href: '#/work-with-me' },
  { id: 'quote',        icon: FiMessageSquare, label: 'Quote', href: '#/quote' },
  { id: 'contact',      icon: FiMail,       label: 'Contact',  href: '#contact' },
];

/* ── All links for desktop ── */
const ALL_LINKS = [
  { id: 'top',          icon: FiHome,       label: 'Home',         href: '#top' },
  { id: 'about',        icon: FiUser,       label: 'About',        href: '#about' },
  { id: 'skills',       icon: FiBarChart2,  label: 'Skills',       href: '#skills' },
  { id: 'portfolio',    icon: FiGrid,       label: 'Portfolio',    href: '#portfolio' },
  { id: 'work-with-me', icon: FiBriefcase,  label: 'Work With Me', href: '#/work-with-me' },
  { id: 'quote',        icon: FiMessageSquare, label: 'Quote',       href: '#/quote' },
  { id: 'faq',          icon: FiHelpCircle, label: 'FAQ',          href: '#/faq' },
  { id: 'contact',      icon: FiMail,       label: 'Contact',      href: '#contact' },
];

export default function Sidebar({ onDownloadCV, onViewCV, cvUrl }) {
  const [active, setActive] = useState('top');
  const [theme, setTheme]   = useState(() => localStorage.getItem('chill_tech_theme') || 'light');
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef(null);

  /* ── Theme sync ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chill_tech_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');

  /* ── Detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Section observer ── */
  useEffect(() => {
    const sections = ALL_LINKS.map(l => document.getElementById(l.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(s => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  /* ══════════════════════════════════════════
     DESKTOP — Left vertical pill (unchanged)
  ══════════════════════════════════════════ */
  if (!isMobile) {
    return (
      <nav className="sidebar-rail" aria-label="Primary navigation">
        <a href="#top" className="sidebar-logo" aria-label="Home">
          <div style={{
            width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid rgba(47,141,255,0.45)',
            boxShadow: '0 0 12px rgba(47,141,255,0.3)',
            flexShrink: 0, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Logo width={44} style={{ borderRadius: '50%' }} />
          </div>
        </a>

        <div className="sidebar-links">
          {ALL_LINKS.map(({ id, icon: Icon, label, href }) => (
            <a
              key={id}
              href={href || `#${id}`}
              className={`sidebar-icon ${active === id ? 'is-active' : ''}`}
              aria-label={label}
              title={label}
            >
              <Icon />
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={toggleTheme}
            className="sidebar-icon"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ color: theme === 'dark' ? '#f59e0b' : '#3b82f6', border: '1px solid var(--panel-border)' }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>

          <a
            href="#/cv"
            className="sidebar-icon sidebar-download"
            aria-label="Read CV"
            title="Read CV"
            style={{ color: '#00c2ff' }}
          >
            <FiEye />
          </a>

          <button
            onClick={onDownloadCV}
            className="sidebar-icon sidebar-download"
            aria-label="Download CV"
            title="Download CV"
          >
            <FiDownload />
          </button>
        </div>

        <style>{`
          .sidebar-rail {
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 60;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 22px;
            padding: 20px 12px;
            border-radius: 999px;
            background: var(--bg-card);
            border: 1px solid var(--panel-border);
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 20px 45px -20px rgba(0,0,0,0.25);
            transition: background 0.3s ease, border-color 0.3s ease;
          }
          .sidebar-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4px;
          }
          .sidebar-links {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .sidebar-icon {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-dim);
            font-size: 1.05rem;
            background: transparent;
            transition: background 0.25s ease, color 0.25s ease, transform 0.2s ease;
          }
          .sidebar-icon:hover {
            color: var(--text);
            transform: scale(1.06);
          }
          .sidebar-icon.is-active {
            background: linear-gradient(135deg, var(--electric-blue), var(--cyan));
            color: #051019;
            box-shadow: 0 8px 20px -6px rgba(47,141,255,0.7);
          }
          .sidebar-download {
            color: var(--cyan);
            border: 1px solid rgba(34,211,238,0.3);
          }
        `}</style>
      </nav>
    );
  }

  /* ══════════════════════════════════════════
     MOBILE — Bottom Tab Bar (perfectly centered)
  ══════════════════════════════════════════ */

  /* The wrapper is position:fixed and handles centering.
     The motion.nav handles ONLY the entrance animation (y + opacity).
     This avoids the framer-motion vs CSS transform conflict. */
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0 16px 16px',
        /* iOS safe area */
        paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
        pointerEvents: 'none',
      }}
    >
      <motion.nav
        aria-label="Primary navigation"
        initial={{ y: 120, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30, delay: 0.12 }}
        style={{
          pointerEvents: 'all',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px calc(8px + env(safe-area-inset-bottom, 0px))',
          borderRadius: 28,
          background: 'rgba(8, 11, 22, 0.92)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: `
            0 20px 60px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 1px 0 rgba(255,255,255,0.08) inset
          `,
          width: '100%',
          maxWidth: 440,
          gap: 0,
        }}
      >
        {/* Nav links */}
        {LINKS.map(({ id, icon: Icon, label, href }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href || `#${id}`}
              aria-label={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                flex: 1,
                textDecoration: 'none',
                position: 'relative',
                padding: '4px 0',
                minWidth: 0,
              }}
            >
              {/* Animated glowing pill under active tab */}
              {isActive && (
                <motion.div
                  layoutId="bottom-tab-active"
                  style={{
                    position: 'absolute',
                    inset: '-4px 0',
                    borderRadius: 20,
                    background: 'rgba(0, 194, 255, 0.12)',
                    border: '1px solid rgba(0, 194, 255, 0.2)',
                    zIndex: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}

              {/* Icon container */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, #00c2ff 0%, #818cf8 100%)'
                    : 'transparent',
                  boxShadow: isActive
                    ? '0 4px 18px rgba(0, 194, 255, 0.5), 0 0 0 1px rgba(0,194,255,0.3)'
                    : 'none',
                  transition: 'background 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <Icon
                  style={{
                    fontSize: '1.1rem',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.42)',
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>

              {/* Label */}
              <span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-display, "Outfit", sans-serif)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
              </span>
            </a>
          );
        })}

        {/* Divider */}
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.07)', flexShrink: 0, margin: '0 4px' }} />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            flex: '0 0 52px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {theme === 'dark'
              ? <FiSun  style={{ fontSize: '1.1rem', color: '#f59e0b' }} />
              : <FiMoon style={{ fontSize: '1.1rem', color: '#60a5fa' }} />}
          </div>
          <span style={{
            fontSize: '0.6rem',
            fontFamily: 'var(--font-display, "Outfit", sans-serif)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>
      </motion.nav>
    </div>
  );
}
