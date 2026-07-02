import { useState, useEffect, useRef } from 'react';
import { FiHome, FiUser, FiBarChart2, FiGrid, FiMail, FiDownload } from 'react-icons/fi';
import Logo from './Logo';

const LINKS = [
  { id: 'top', icon: FiHome, label: 'Home' },
  { id: 'about', icon: FiUser, label: 'About' },
  { id: 'skills', icon: FiBarChart2, label: 'Skills' },
  { id: 'portfolio', icon: FiGrid, label: 'Portfolio' },
  { id: 'contact', icon: FiMail, label: 'Contact' },
];

export default function Sidebar({ onDownloadCV }) {
  const [active, setActive] = useState('top');
  const observerRef = useRef(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((s) => observerRef.current.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <nav className="sidebar-rail" aria-label="Primary">
      <a href="#top" className="sidebar-logo" aria-label="Home">
        <Logo size={26} withWordmark={false} />
      </a>

      <div className="sidebar-links">
        {LINKS.map(({ id, icon: Icon, label }) => (
          <a key={id} href={`#${id}`} className={`sidebar-icon ${active === id ? 'is-active' : ''}`} aria-label={label} title={label}>
            <Icon />
          </a>
        ))}
      </div>

      <button onClick={onDownloadCV} className="sidebar-icon sidebar-download" aria-label="Download CV" title="Download CV">
        <FiDownload />
      </button>

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
          background: rgba(12, 18, 34, 0.75);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 20px 45px -20px rgba(10,20,50,0.6);
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

        @media (max-width: 860px) {
          .sidebar-rail {
            left: 50%;
            top: auto;
            bottom: 16px;
            transform: translateX(-50%);
            flex-direction: row;
            padding: 10px 14px;
            gap: 14px;
          }
          .sidebar-logo { display: none; }
          .sidebar-links { flex-direction: row; gap: 10px; }
          .sidebar-icon { width: 40px; height: 40px; }
        }
      `}</style>
    </nav>
  );
}
