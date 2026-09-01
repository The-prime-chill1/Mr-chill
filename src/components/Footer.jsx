import { FiArrowUp, FiGithub, FiMail, FiMapPin, FiStar, FiExternalLink } from 'react-icons/fi';
import { SiTiktok, SiInstagram, SiX, SiWhatsapp } from 'react-icons/si';
import { profile } from '../data';
import Logo from './Logo';

const SOCIALS = [
  { href: profile.github,            Icon: FiGithub,    label: 'GitHub',    hoverColor: '#e2e8f0' },
  { href: profile.twitter,           Icon: SiX,         label: 'X',         hoverColor: '#e2e8f0' },
  { href: profile.instagram,         Icon: SiInstagram, label: 'Instagram', hoverColor: '#f472b6' },
  { href: profile.tiktok,            Icon: SiTiktok,    label: 'TikTok',    hoverColor: '#e2e8f0' },
  { href: profile.whatsapp,          Icon: SiWhatsapp,  label: 'WhatsApp',  hoverColor: '#22c55e' },
  { href: `mailto:${profile.email}`, Icon: FiMail,      label: 'Email',     hoverColor: '#00c2ff' },
];

const NAV_LINKS = [
  { label: 'Home',           href: '#top' },
  { label: 'About Me',       href: '#about' },
  { label: 'Skills & Tech',  href: '#skills' },
  { label: 'Featured Work',  href: '#portfolio' },
  { label: 'Contact Me',     href: '#contact' },
];

const SERVICES = [
  'Full-Stack Web Development',
  'Mobile Web Apps (PWA)',
  'E-Commerce & Store Platforms',
  'Real Estate Portals',
  'API & Cloud Integrations',
];

const QUICK_LINKS = [
  { label: 'Work With Me',   href: '#/work-with-me' },
  { label: 'Request a Quote', href: '#/quote' },
  { label: 'Client Reviews', href: '#/reviews', star: true },
  { label: 'FAQ Page',       href: '#/faq' },
  { label: 'Privacy & Terms', href: '#/privacy' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const year = new Date().getFullYear();

  return (
    <footer className="pro-footer">
      {/* Top Gradient Divider */}
      <div className="pro-footer-divider" />

      <div className="container pro-footer-container">
        {/* Main Grid: Brand on Left (40%), Links on Right (60%) */}
        <div className="pro-footer-grid">

          {/* ── Brand Info Column ── */}
          <div className="pro-footer-brand-col">
            <div className="pro-footer-brand-header">
              <div className="pro-footer-logo-ring">
                <Logo width={38} style={{ borderRadius: '50%' }} />
              </div>
              <div>
                <div className="pro-footer-brand-name">
                  CHILL <span className="gradient-text">TECH LTD</span>
                </div>
                <div className="pro-footer-brand-tagline">
                  INNOVATE • BUILD • EMPOWER
                </div>
              </div>
            </div>

            <p className="pro-footer-desc">
              Engineering high-performance web applications and multi-million naira real estate solutions across Nigeria.
            </p>

            {/* Direct Contact Snippets */}
            <div className="pro-footer-contact-info">
              <div className="pro-footer-contact-item">
                <FiMapPin className="pro-footer-icon" />
                <span>31 Grace Court, Chois Oasis, Abijo GRA, Lekki, Lagos</span>
              </div>
              <a href={`mailto:${profile.officialEmail}`} className="pro-footer-contact-item pro-footer-link-hover" title="Company Official Email">
                <FiMail className="pro-footer-icon" />
                <span>{profile.officialEmail}</span>
              </a>
              <a href={`mailto:${profile.personalEmail}`} className="pro-footer-contact-item pro-footer-link-hover" title="Founder & GM Direct Email">
                <FiMail className="pro-footer-icon" />
                <span>{profile.personalEmail}</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pro-footer-socials">
              {SOCIALS.map(({ href, Icon, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  className="pro-social-btn"
                  style={{ '--hover-color': hoverColor }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link Columns (Right) ── */}
          <div className="pro-footer-links-grid">

            {/* Col 1: Navigation */}
            <div className="pro-footer-col">
              <h4 className="pro-footer-heading">Navigation</h4>
              <ul className="pro-footer-list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="pro-footer-link">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Services */}
            <div className="pro-footer-col">
              <h4 className="pro-footer-heading">Services</h4>
              <ul className="pro-footer-list">
                {SERVICES.map((s) => (
                  <li key={s} className="pro-footer-service-item">
                    <span className="pro-footer-dot" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Company & Pages */}
            <div className="pro-footer-col">
              <h4 className="pro-footer-heading">Explore</h4>
              <ul className="pro-footer-list">
                {QUICK_LINKS.map(({ label, href, star }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={`pro-footer-link ${star ? 'pro-footer-link-gold' : ''}`}
                    >
                      {star && <FiStar fill="#f59e0b" stroke="none" style={{ fontSize: '0.75rem', marginRight: 5 }} />}
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pro-footer-bottom">
          <div className="pro-footer-copy">
            © {year} <strong style={{ color: 'var(--text)' }}>CHILL TECH LTD</strong>. All rights reserved.
            <span className="pro-footer-author">
              &nbsp;·&nbsp; Engineered by{' '}
              <a href="#top" className="pro-footer-author-link">
                Lamidi Abdulhameed Olawale
              </a>
            </span>
          </div>

          <button onClick={scrollToTop} aria-label="Scroll to top" className="pro-footer-top-btn">
            Back to top <FiArrowUp style={{ fontSize: '0.82rem' }} />
          </button>
        </div>
      </div>

      <style>{`
        .pro-footer {
          position: relative;
          background: var(--bg-dark);
          color: var(--text);
          padding-bottom: calc(76px + env(safe-area-inset-bottom, 12px));
        }

        .pro-footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 194, 255, 0.45) 35%, rgba(129, 140, 248, 0.45) 65%, transparent 100%);
        }

        .pro-footer-container {
          padding-top: 48px;
          padding-bottom: 24px;
        }

        /* ── Main 2-part Grid ── */
        .pro-footer-grid {
          display: grid;
          grid-template-columns: 1.3fr 2fr;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--panel-border);
        }

        /* ── Brand Column ── */
        .pro-footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .pro-footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .pro-footer-logo-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(0, 194, 255, 0.4);
          box-shadow: 0 0 16px rgba(0, 194, 255, 0.2);
          flex-shrink: 0;
        }

        .pro-footer-brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text);
          letter-spacing: -0.01em;
        }

        .pro-footer-brand-tagline {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-top: 2px;
        }

        .pro-footer-desc {
          color: var(--text-dim);
          font-size: 0.86rem;
          line-height: 1.65;
          margin: 0 0 18px;
          max-width: 360px;
        }

        .pro-footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .pro-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-dim);
          line-height: 1.45;
          text-decoration: none;
        }

        .pro-footer-link-hover {
          transition: color 0.2s ease;
        }
        .pro-footer-link-hover:hover {
          color: var(--electric-blue);
        }

        .pro-footer-icon {
          color: var(--electric-blue);
          font-size: 0.88rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ── Social Buttons ── */
        .pro-footer-socials {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }

        .pro-social-btn {
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

        .pro-social-btn:hover {
          color: var(--hover-color, #00c2ff);
          border-color: rgba(0, 194, 255, 0.45);
          background: rgba(0, 194, 255, 0.08);
          transform: translateY(-2px);
        }

        /* ── Right Links Grid ── */
        .pro-footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .pro-footer-col {
          display: flex;
          flex-direction: column;
        }

        .pro-footer-heading {
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 16px;
          letter-spacing: 0.02em;
          position: relative;
          padding-bottom: 8px;
        }

        .pro-footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #00c2ff, #818cf8);
        }

        .pro-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pro-footer-link {
          font-size: 0.85rem;
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
        }

        .pro-footer-link:hover {
          color: var(--electric-blue);
          transform: translateX(3px);
        }

        .pro-footer-link-gold {
          color: #f59e0b;
          font-weight: 600;
        }
        .pro-footer-link-gold:hover {
          color: #fbbf24;
        }

        .pro-footer-service-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .pro-footer-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--electric-blue);
          opacity: 0.55;
          flex-shrink: 0;
        }

        /* ── Bottom Bar ── */
        .pro-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 24px;
          font-size: 0.82rem;
          color: var(--text-dim);
        }

        .pro-footer-author-link {
          color: var(--electric-blue);
          text-decoration: none;
          font-weight: 600;
        }
        .pro-footer-author-link:hover {
          text-decoration: underline;
        }

        .pro-footer-top-btn {
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

        .pro-footer-top-btn:hover {
          color: var(--electric-blue);
          border-color: rgba(0, 194, 255, 0.45);
          background: rgba(0, 194, 255, 0.05);
        }

        /* ── Responsive Tablet & Mobile ── */
        @media (max-width: 960px) {
          .pro-footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .pro-footer-desc {
            max-width: 100%;
          }

          .pro-footer-links-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 640px) {
          .pro-footer-container {
            padding-top: 36px;
          }

          .pro-footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .pro-footer-links-grid > div:nth-child(2) {
            grid-column: 1 / -1;
          }

          .pro-footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 14px;
          }

          .pro-footer-author {
            display: block;
            margin-top: 4px;
          }
        }
      `}</style>
    </footer>
  );
}
