import { FiArrowUp, FiGithub, FiMail, FiMessageSquare, FiMapPin } from 'react-icons/fi';
import { SiTiktok, SiInstagram, SiX } from 'react-icons/si';
import { profile } from '../data';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="floating-card footer-root">
      <div className="container">

        {/* ── Top Grid ── */}
        <div className="footer-grid">

          {/* Col 1: Brand */}
          <div className="footer-brand">
            <div className="footer-brand-row">
              <div className="footer-logo-ring">
                <Logo width={40} style={{ borderRadius: '50%' }} />
              </div>
              <div>
                <div className="footer-brand-name">
                  CHILL <span className="gradient-text">TECH LTD</span>
                </div>
                <div className="footer-brand-tagline">INNOVATE • BUILD • EMPOWER</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              Delivering high-performance web applications and multi-million naira real estate solutions across Nigeria.
            </p>
            <div className="footer-address">
              <FiMapPin style={{ color: 'var(--electric-blue)', flexShrink: 0, marginTop: 3 }} />
              <div>
                <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 2 }}>Office Address:</strong>
                31 Grace Court, Chois Oasis, Abijo GRA, Ibeju-Lekki, Lagos, Nigeria
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Navigation</h4>
            <div className="footer-links">
              <a href="#top">Home</a>
              <a href="#about">About Me</a>
              <a href="#skills">Skills &amp; Tech Stack</a>
              <a href="#portfolio">Featured Portfolio</a>
              <a href="#/work-with-me">Work With Me</a>
              <a href="#/quote">Get a Quote</a>
              <a href="#/faq">FAQ Page</a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Services</h4>
            <div className="footer-links">
              <span>Full-Stack Web Development</span>
              <span>iOS &amp; Android Mobile Apps</span>
              <span>Progressive Web Apps (PWA)</span>
              <span>E-Commerce &amp; Logistics Stores</span>
              <span>Real Estate &amp; SaaS Portals</span>
              <span>API Integration &amp; Cloud Backends</span>
            </div>
          </div>

          {/* Col 4: Connect */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Connect &amp; Support</h4>
            <div className="footer-socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social-btn">
                <FiGithub />
              </a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" aria-label="X / Twitter" className="footer-social-btn">
                <SiX />
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-btn">
                <SiInstagram />
              </a>
              <a href={profile.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className="footer-social-btn">
                <SiTiktok />
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-social-btn">
                <FiMessageSquare />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="footer-social-btn">
                <FiMail />
              </a>
            </div>
            <div className="footer-legal">
              <a href="#/privacy">Privacy Policy &amp; Terms</a>
              <a href="#/faq">FAQ Page</a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} CHILL TECH LTD. All rights reserved.
          </div>
          <button onClick={scrollToTop} aria-label="Scroll to top" className="footer-top-btn">
            Back to top <FiArrowUp />
          </button>
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .footer-root {
          padding: 48px 0 28px;
        }

        /* ── Top Grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--panel-border);
        }

        /* ── Brand ── */
        .footer-brand-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .footer-logo-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(0,194,255,0.45);
          box-shadow: 0 0 12px rgba(0,194,255,0.3);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1rem;
          color: var(--text);
        }
        .footer-brand-tagline {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-top: 2px;
        }
        .footer-brand-desc {
          color: var(--text-dim);
          font-size: 0.88rem;
          line-height: 1.65;
          margin: 0;
        }
        .footer-address {
          margin-top: 14px;
          font-size: 0.82rem;
          color: var(--text-dim);
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        /* ── Columns ── */
        .footer-col-heading {
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 14px;
          color: var(--text);
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.87rem;
          color: var(--text-dim);
        }
        .footer-links a {
          transition: color 0.2s;
          color: var(--text-dim);
        }
        .footer-links a:hover {
          color: #00c2ff;
        }

        /* ── Socials ── */
        .footer-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .footer-social-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          font-size: 1rem;
        }
        .footer-social-btn:hover {
          color: #00c2ff;
          border-color: rgba(0,194,255,0.5);
          background: rgba(0,194,255,0.08);
        }
        .footer-legal {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .footer-legal a:first-child { color: var(--electric-blue); font-size: 0.85rem; }
        .footer-legal a:last-child  { color: var(--cyan); font-size: 0.85rem; }

        /* ── Bottom Bar ── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 22px;
        }
        .footer-copy {
          font-size: 0.82rem;
          color: var(--text-dim);
        }
        .footer-top-btn {
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 0.8rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--panel-border);
          color: var(--text-dim);
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .footer-top-btn:hover {
          color: #00c2ff;
          border-color: rgba(0,194,255,0.5);
        }

        /* ── TABLET (≤ 900px): 2-column ── */
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        /* ── MOBILE (≤ 600px): single column, clean stacked ── */
        @media (max-width: 600px) {
          .footer-root {
            /* Extra bottom padding to clear the floating tab bar */
            padding-bottom: calc(90px + env(safe-area-inset-bottom, 16px));
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-brand {
            grid-column: auto;
          }
          .footer-col-heading {
            font-size: 0.85rem;
            margin-bottom: 10px;
          }
          .footer-links {
            gap: 8px;
            font-size: 0.84rem;
          }
          .footer-socials {
            gap: 8px;
          }
          .footer-social-btn {
            width: 40px;
            height: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .footer-copy {
            font-size: 0.78rem;
          }
          .footer-top-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </footer>
  );
}
