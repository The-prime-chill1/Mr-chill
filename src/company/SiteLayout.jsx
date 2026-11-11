import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import { SiGithub, SiInstagram, SiThreads, SiTiktok, SiWhatsapp, SiX } from 'react-icons/si';
import { profile } from '../data';
import companyLogo from '../assets/chill-tech-logo.jpeg';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/projects', 'Projects'],
  ['/solutions', 'Solutions'],
  ['/contact', 'Contact'],
];

export function usePageMeta(title, description, path = '') {
  useEffect(() => {
    const fullTitle = title.includes('CHILL TECH') ? title : `${title} | CHILL TECH LTD`;
    document.title = fullTitle;

    const setMeta = (selector, attribute, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [name, value] = attribute;
        element.setAttribute(name, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', ['name', 'description'], description);
    setMeta('meta[property="og:title"]', ['property', 'og:title'], fullTitle);
    setMeta('meta[property="og:description"]', ['property', 'og:description'], description);
    setMeta('meta[property="og:url"]', ['property', 'og:url'], `https://www.chilltechltd.com${path}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.chilltechltd.com${path}`);
  }, [title, description, path]);
}

function ScrollManager() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const analyticsTimer = window.setTimeout(() => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: `${pathname}${search}`,
        });
      }
    }, 50);
    return () => window.clearTimeout(analyticsTimer);
  }, [pathname, search]);
  return null;
}

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('company-menu-open', menuOpen);
    return () => document.body.classList.remove('company-menu-open');
  }, [menuOpen]);

  return (
    <div className="company-site">
      <ScrollManager />
      <header className="company-header">
        <Link className="company-brand" to="/" aria-label="CHILL TECH LTD home">
          <img src={companyLogo} alt="" />
          <span><strong>CHILL TECH LTD</strong><small>Innovate. Build. Empower.</small></span>
        </Link>

        <nav className="company-nav" aria-label="Main navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>

        <Link className="company-header-cta" to="/enquiry">Work With Us <FiArrowUpRight /></Link>
        <button className="company-menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="company-mobile-menu" initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.25 }}>
            <nav aria-label="Mobile navigation">
              {navItems.map(([to, label], index) => (
                <NavLink key={to} to={to} end={to === '/'}><span>0{index + 1}</span>{label}</NavLink>
              ))}
            </nav>
            <Link className="button button-primary" to="/enquiry">Work With CHILL TECH <FiArrowUpRight /></Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer id="site-footer" className="company-footer">
        <div className="company-footer-callout">
          <div><span>Ready to move forward?</span><h2>Let’s build the right technology for your business.</h2></div>
          <Link className="button button-primary" to="/enquiry">Start a Project <FiArrowUpRight /></Link>
        </div>
        <div className="company-footer-top">
          <div>
            <Link className="company-brand company-brand-footer" to="/">
              <img src={companyLogo} alt="CHILL TECH LTD logo" />
              <span><strong>CHILL TECH LTD</strong><small>Engineering high-performance web applications and technology solutions for businesses worldwide, backed by leadership across multi-million-naira real estate operations nationwide.</small></span>
            </Link>
          </div>
          <div className="company-footer-nav">
            <span>Company</span>
            <Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/solutions">Solutions</Link>
          </div>
          <div className="company-footer-nav">
            <span>Leadership</span>
            <Link to="/portfolio">CEO Portfolio</Link><Link to="/cv">View CV</Link><Link to="/contact">Contact</Link>
          </div>
          <div className="company-footer-nav">
            <span>Resources</span>
            <Link to="/enquiry">Project Enquiry</Link><Link to="/reviews">Reviews</Link><Link to="/faq">FAQ</Link><Link to="/privacy">Privacy & Terms</Link><Link to="/invoice">Invoice Generator</Link>
          </div>
          <div className="company-footer-nav">
            <span>Connect</span>
            <a href={profile.instagram} target="_blank" rel="noreferrer"><SiInstagram /> Instagram</a>
            <a href={profile.threads} target="_blank" rel="noreferrer"><SiThreads /> Threads</a>
            <a href={profile.tiktok} target="_blank" rel="noreferrer"><SiTiktok /> TikTok</a>
            <a href={profile.twitter} target="_blank" rel="noreferrer"><SiX /> X / Twitter</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><SiGithub /> GitHub</a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer"><SiWhatsapp /> WhatsApp</a>
            <a href={profile.whatsappChannel} target="_blank" rel="noreferrer"><SiWhatsapp /> Official Channel</a>
          </div>
        </div>
        <div className="company-footer-bottom">
          <span>© {new Date().getFullYear()} CHILL TECH LTD. All rights reserved.</span>
          <span>Nigeria · Serving clients worldwide</span>
        </div>
      </footer>
    </div>
  );
}
