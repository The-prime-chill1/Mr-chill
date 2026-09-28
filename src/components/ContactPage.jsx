import { useEffect } from 'react';
import { FiArrowLeft, FiEye, FiDownload } from 'react-icons/fi';
import Logo from './Logo';
import Contact from './Contact';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact — CHILL TECH LTD';
    return () => {
      document.title = 'CHILL TECH LTD';
    };
  }, []);

  return (
    <div className="contact-page-wrapper">
      {/* Top Header Navigation */}
      <header className="contact-page-nav">
        <div className="contact-page-nav-inner">
          <a href="#/" className="contact-back-btn" aria-label="Back to Homepage">
            <FiArrowLeft /> <span>Home</span>
          </a>

          <div className="contact-nav-brand">
            <Logo width={28} style={{ borderRadius: '50%' }} />
            <span>CHILL <strong className="gradient-text">TECH LTD</strong></span>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href="#/cv" className="contact-nav-btn ghost">
              <FiEye /> <span>CV</span>
            </a>
            <a href="#/work-with-me" className="contact-nav-btn primary">
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="contact-page-main">
        <Contact />
      </main>

      <style>{`
        .contact-page-wrapper {
          min-height: 100vh;
          background: var(--bg-dark, #070d1a);
          color: var(--text, #f8fafc);
          padding-bottom: 60px;
        }

        .contact-page-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 15, 26, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--panel-border, rgba(255, 255, 255, 0.08));
          padding: 12px 24px;
        }

        [data-theme="light"] .contact-page-nav {
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .contact-page-nav-inner {
          max-width: 1340px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .contact-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--panel-border);
          color: var(--text);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .contact-back-btn:hover {
          color: var(--cyan);
          border-color: var(--cyan);
          transform: translateX(-2px);
        }

        .contact-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display, sans-serif);
          font-weight: 800;
          font-size: 1.05rem;
          white-space: nowrap;
        }

        .contact-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .contact-nav-btn.ghost {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--panel-border);
          color: var(--text);
        }

        .contact-nav-btn.ghost:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .contact-nav-btn.primary {
          background: linear-gradient(135deg, #00c2ff, #2f8dff);
          color: #000;
          border: none;
          box-shadow: 0 0 14px rgba(0, 194, 255, 0.35);
        }

        .contact-nav-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(0, 194, 255, 0.5);
        }

        .contact-page-main {
          padding-top: 24px;
        }

        @media (max-width: 600px) {
          .contact-page-nav {
            padding: 10px 14px;
          }
          .contact-nav-brand span {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
