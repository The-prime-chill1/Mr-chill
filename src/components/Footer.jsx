import { FiArrowUp, FiGithub, FiMail, FiStar } from 'react-icons/fi';
import { SiTiktok, SiInstagram, SiX, SiWhatsapp } from 'react-icons/si';
import { profile } from '../data';
import Logo from './Logo';

const SOCIALS = [
  { href: profile.github,            Icon: FiGithub,    label: 'GitHub' },
  { href: profile.twitter,           Icon: SiX,         label: 'X' },
  { href: profile.instagram,         Icon: SiInstagram, label: 'Instagram' },
  { href: profile.tiktok,            Icon: SiTiktok,    label: 'TikTok' },
  { href: profile.whatsapp,          Icon: SiWhatsapp,  label: 'WhatsApp' },
  { href: `mailto:${profile.email}`, Icon: FiMail,      label: 'Email' },
];

const LINKS = [
  { label: 'Home',           href: '#top' },
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Portfolio',      href: '#portfolio' },
  { label: 'Work With Me',   href: '#/work-with-me' },
  { label: 'Get Quote',      href: '#/quote' },
  { label: 'Reviews',        href: '#/reviews', star: true },
  { label: 'FAQ',            href: '#/faq' },
  { label: 'Privacy',        href: '#/privacy' },
  { label: 'Contact',        href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="simple-footer">
      {/* Subtle top border line */}
      <div className="simple-footer-border" />

      <div className="container simple-footer-inner">
        {/* Main Row */}
        <div className="simple-footer-main">
          {/* Brand */}
          <div className="simple-footer-brand">
            <div className="simple-footer-logo-wrap">
              <Logo width={36} style={{ borderRadius: '50%' }} />
            </div>
            <div>
              <div className="simple-footer-title">
                CHILL <span className="gradient-text">TECH LTD</span>
              </div>
              <div className="simple-footer-tagline">
                Innovate • Build • Empower
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="simple-footer-socials">
            {SOCIALS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className="simple-social-btn"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links Navigation */}
        <nav className="simple-footer-nav" aria-label="Footer Navigation">
          {LINKS.map(({ label, href, star }) => (
            <a
              key={label}
              href={href}
              className={`simple-footer-link ${star ? 'simple-footer-link-star' : ''}`}
            >
              {star && <FiStar fill="#f59e0b" stroke="none" style={{ fontSize: '0.72rem', marginRight: 4 }} />}
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom Row */}
        <div className="simple-footer-bottom">
          <div className="simple-footer-copy">
            © {year} <strong style={{ color: 'var(--text)' }}>CHILL TECH LTD</strong>. All rights reserved.
            <span className="simple-footer-built"> · Built by <a href="#top">Lamidi Abdulhameed Olawale</a></span>
          </div>

          <button onClick={scrollToTop} aria-label="Scroll to top" className="simple-footer-top-btn">
            Back to top <FiArrowUp style={{ fontSize: '0.82rem' }} />
          </button>
        </div>
      </div>

      <style>{`
        .simple-footer {
          position: relative;
          background: var(--bg-dark);
          padding-bottom: calc(76px + env(safe-area-inset-bottom, 12px));
        }

        .simple-footer-border {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 194, 255, 0.4) 30%, rgba(129, 140, 248, 0.4) 70%, transparent 100%);
        }

        .simple-footer-inner {
          padding-top: 40px;
          padding-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Top Brand & Socials Row */
        .simple-footer-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .simple-footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .simple-footer-logo-wrap {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 194, 255, 0.35);
          box-shadow: 0 0 14px rgba(0, 194, 255, 0.2);
          flex-shrink: 0;
        }

        .simple-footer-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1rem;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .simple-footer-tagline {
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Social Icons */
        .simple-footer-socials {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .simple-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--panel-border);
          background: var(--bg-card);
          color: var(--text-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .simple-social-btn:hover {
          color: var(--electric-blue);
          border-color: rgba(0, 194, 255, 0.5);
          background: rgba(0, 194, 255, 0.08);
          transform: translateY(-2px);
        }

        /* Navigation Links */
        .simple-footer-nav {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 24px;
          padding: 16px 0;
          border-top: 1px solid var(--panel-border);
          border-bottom: 1px solid var(--panel-border);
        }

        .simple-footer-link {
          font-size: 0.85rem;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .simple-footer-link:hover {
          color: var(--electric-blue);
        }

        .simple-footer-link-star {
          color: #f59e0b;
          font-weight: 600;
        }

        .simple-footer-link-star:hover {
          color: #fbbf24;
        }

        /* Bottom Row */
        .simple-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          font-size: 0.8rem;
          color: var(--text-dim);
        }

        .simple-footer-copy strong {
          color: var(--text);
        }

        .simple-footer-copy a {
          color: var(--electric-blue);
          text-decoration: none;
          font-weight: 600;
        }

        .simple-footer-copy a:hover {
          text-decoration: underline;
        }

        .simple-footer-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid var(--panel-border);
          background: transparent;
          color: var(--text-dim);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-body);
        }

        .simple-footer-top-btn:hover {
          color: var(--electric-blue);
          border-color: rgba(0, 194, 255, 0.4);
          background: rgba(0, 194, 255, 0.05);
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .simple-footer-inner {
            padding-top: 32px;
            gap: 22px;
          }

          .simple-footer-main {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .simple-footer-brand {
            flex-direction: column;
            gap: 8px;
          }

          .simple-footer-nav {
            justify-content: center;
            gap: 10px 18px;
            padding: 14px 0;
          }

          .simple-footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  );
}
