import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiDownload } from 'react-icons/fi';
import Logo from './Logo';
import Portfolio from './Portfolio';

export default function PortfolioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portfolio & Works — CHILL TECH LTD';
    return () => {
      document.title = 'CHILL TECH LTD';
    };
  }, []);

  return (
    <div className="portfolio-page-wrapper">
      {/* Top Header Navigation */}
      <header className="portfolio-page-nav">
        <div className="portfolio-page-nav-inner">
          <a href="#/" className="portfolio-back-btn" aria-label="Back to Homepage">
            <FiArrowLeft /> <span>Home</span>
          </a>

          <div className="portfolio-nav-brand">
            <Logo width={28} style={{ borderRadius: '50%' }} />
            <span>CHILL <strong className="gradient-text">TECH LTD</strong></span>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href="#/cv" className="portfolio-nav-btn ghost">
              <FiEye /> <span>CV</span>
            </a>
            <a href="#/quote" className="portfolio-nav-btn primary">
              <span>Hire Us</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="portfolio-page-main">
        <Portfolio />
      </main>

      <style>{`
        .portfolio-page-wrapper {
          min-height: 100vh;
          background: var(--bg-dark, #070d1a);
          color: var(--text, #f8fafc);
          padding-bottom: 60px;
        }

        .portfolio-page-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 15, 26, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--panel-border, rgba(255, 255, 255, 0.08));
          padding: 12px 24px;
        }

        [data-theme="light"] .portfolio-page-nav {
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .portfolio-page-nav-inner {
          max-width: 1340px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .portfolio-back-btn {
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

        .portfolio-back-btn:hover {
          color: var(--cyan);
          border-color: var(--cyan);
          transform: translateX(-2px);
        }

        .portfolio-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display, sans-serif);
          font-weight: 800;
          font-size: 1.05rem;
          white-space: nowrap;
        }

        .portfolio-nav-btn {
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

        .portfolio-nav-btn.ghost {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--panel-border);
          color: var(--text);
        }

        .portfolio-nav-btn.ghost:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .portfolio-nav-btn.primary {
          background: linear-gradient(135deg, #00c2ff, #2f8dff);
          color: #000;
          border: none;
          box-shadow: 0 0 14px rgba(0, 194, 255, 0.35);
        }

        .portfolio-nav-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(0, 194, 255, 0.5);
        }

        .portfolio-page-main {
          padding-top: 24px;
        }

        @media (max-width: 600px) {
          .portfolio-page-nav {
            padding: 10px 14px;
          }
          .portfolio-nav-brand span {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
