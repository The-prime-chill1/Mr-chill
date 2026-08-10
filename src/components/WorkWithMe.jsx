import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, FiClock, FiZap, FiSmartphone, FiShield, FiCode, FiCpu, 
  FiHeadphones, FiArrowRight, FiMessageSquare, FiChevronDown, FiExternalLink, FiDollarSign,
  FiBriefcase, FiShoppingCart, FiFeather, FiBookOpen, FiSend, FiBarChart2, FiHome, FiTerminal, FiSun, FiMoon
} from 'react-icons/fi';
import Logo from './Logo';
import { profile, projects, testimonials } from '../data';
import StarBorder from './reactbits/StarBorder';

// 1. Services Data
const SERVICES = [
  { title: 'Business Websites', icon: FiBriefcase, desc: 'Corporate websites that project authority, build trust, and turn visitors into leads.' },
  { title: 'E-commerce Stores', icon: FiShoppingCart, desc: 'High-converting online shops with fast product catalogs and checkout integrations.' },
  { title: 'Portfolio Websites', icon: FiFeather, desc: 'Sleek, personal portfolio sites for creatives, developers, and executives.' },
  { title: 'School & Academic Portals', icon: FiBookOpen, desc: 'Tailored platforms for educational institutions, courses, and student portals.' },
  { title: 'Landing Pages', icon: FiSend, desc: 'High-speed, conversion-focused landing pages built to maximize marketing campaigns.' },
  { title: 'Admin Dashboards', icon: FiBarChart2, desc: 'Custom data management systems, analytics dashboards, and web software portals.' },
  { title: 'Real Estate Portals', icon: FiHome, desc: 'Property listing showcases, interactive map viewings, and investor portals.' },
  { title: 'Custom Web Applications', icon: FiTerminal, desc: 'Full-stack custom web apps built to solve unique business and operational needs.' },
];

// 2. Features / Why Choose
const FEATURES = [
  { icon: FiClock, title: 'Fast Delivery', desc: 'Rapid development timelines without compromising quality.' },
  { icon: FiSmartphone, title: 'Mobile Responsive', desc: 'Pixel-perfect display on mobile devices, tablets, and desktops.' },
  { icon: FiZap, title: 'SEO Optimized', desc: 'Built-in search engine optimization for maximum visibility on Google.' },
  { icon: FiCpu, title: 'Modern UI/UX', desc: 'State-of-the-art designs inspired by Apple, Stripe, and Vercel.' },
  { icon: FiShield, title: 'Secure Development', desc: 'Encrypted connections, secure APIs, and enterprise data safety.' },
  { icon: FiCode, title: 'Clean Code', desc: 'Production-ready, modular React & Vite architecture.' },
  { icon: FiZap, title: 'Performance Focused', desc: 'Lightning-fast load times with 60 FPS smooth animations.' },
  { icon: FiHeadphones, title: 'Ongoing Support', desc: 'Continuous maintenance, updates, and technical assistance.' },
];

// 3. Process Steps
const PROCESS_STEPS = [
  { step: '01', title: 'Consultation', desc: 'We discuss your project goals, scope, target audience, and business requirements.' },
  { step: '02', title: 'Planning', desc: 'Structuring site architecture, content wireframes, and technology stack.' },
  { step: '03', title: 'Design', desc: 'Crafting modern, luxury UI mockups and interactive prototypes for approval.' },
  { step: '04', title: 'Development', desc: 'Writing clean, high-performance React code with smooth Framer Motion animations.' },
  { step: '05', title: 'Testing', desc: 'Cross-browser testing, mobile responsiveness, speed tuning, and security audits.' },
  { step: '06', title: 'Launch', desc: 'Deploying your live site to Vercel/Netlify with custom domain configuration.' },
  { step: '07', title: 'Support', desc: 'Providing post-launch assistance, continuous optimization, and maintenance.' },
];

// 4. FAQ Items
const FAQS = [
  { q: 'How long does a website project take?', a: 'Standard business and portfolio websites typically take 1 to 2 weeks. Complex e-commerce stores or custom web applications take 2 to 4 weeks depending on feature requirements.' },
  { q: 'Do you redesign existing websites?', a: 'Yes! We can revamp your existing website to give it a modern, luxury look, improve mobile responsiveness, and accelerate page load speeds.' },
  { q: 'Can you host my website and handle domains?', a: 'Absolutely. We configure high-speed global CDN hosting via Vercel or Netlify and set up your custom domain with free SSL security.' },
  { q: 'Will my website work perfectly on mobile devices?', a: '100%. Every single project we build is engineered mobile-first and tested thoroughly across all screen sizes and mobile browsers.' },
  { q: 'Do you provide ongoing support after launch?', a: 'Yes, we provide ongoing maintenance, feature updates, and technical support to ensure your website continues running smoothly.' },
];

export default function WorkWithMe() {
  // Estimator State
  const [siteType, setSiteType] = useState('Business Website');
  const [pageCount, setPageCount] = useState('4-7 Pages');
  const [timeline, setTimeline] = useState('Standard (2-3 Weeks)');
  const [currency, setCurrency] = useState('NGN');
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');
  const [selectedFeatures, setSelectedFeatures] = useState(['SEO Optimization', 'Mobile Responsive']);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chill_tech_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Work With Me — CHILL TECH LTD';
    return () => {
      document.title = 'CHILL TECH LTD';
    };
  }, []);

  const featureOptions = [
    'SEO Optimization',
    'WhatsApp Live Chat',
    'E-Commerce / Payment Gateway',
    'Admin Dashboard',
    'Custom Animations & 3D',
    'Multi-language Support',
  ];

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  // Calculate estimated investment (in NGN / USD reference)
  const calculateEstimate = () => {
    let base = 150000; // Base Starter NGN
    if (siteType === 'E-commerce Store') base = 300000;
    if (siteType === 'Real Estate Portal') base = 350000;
    if (siteType === 'Custom Web Application') base = 400000;

    if (pageCount === '4-7 Pages') base += 50000;
    if (pageCount === '8-15 Pages') base += 100000;
    if (pageCount === '15+ Pages') base += 180000;

    base += selectedFeatures.length * 25000;

    if (timeline.includes('Rush')) base *= 1.25;

    return Math.round(base);
  };

  const estimatedCost = calculateEstimate();

  const handleWhatsAppEstimate = () => {
    const text = `Hi CHILL TECH! I used your project estimator on your website:
- Project Type: ${siteType}
- Page Count: ${pageCount}
- Features: ${selectedFeatures.join(', ')}
- Timeline: ${timeline}
- Estimated Investment: ₦${estimatedCost.toLocaleString()}

I'd like to get started on my project!`;

    const url = `${profile.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="work-page">
      {/* Sticky Header Nav */}
      <header className="work-header">
        <a href="#/" className="work-logo" aria-label="Home" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Logo width={38} />
          </div>
          <span className="work-logo-name" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)' }}>
            CHILL <span className="gradient-text">TECH</span>
          </span>
        </a>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost"
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ padding: '8px 14px', color: theme === 'dark' ? '#f59e0b' : '#3b82f6' }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#/" className="btn btn-ghost work-home-btn" style={{ padding: '8px 18px', fontSize: '0.82rem' }}>
            ← Home
          </a>
          <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Project Inquiry — CHILL TECH LTD')}`} className="btn btn-primary work-start-btn" style={{ padding: '8px 20px', fontSize: '0.82rem' }}>
            Start a Project
          </a>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="work-hero">
        <div className="work-hero-glow" />
        <div className="work-grid-bg" />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingTop: 60, paddingBottom: 60 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
            style={{ marginBottom: 16 }}
          >
            WORK WITH CHILL TECH LTD
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="section-title"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', maxWidth: 900, margin: '0 auto 20px', lineHeight: 1.15 }}
          >
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'var(--text-dim)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', maxWidth: 720, margin: '0 auto 36px', lineHeight: 1.7 }}
          >
            A modern website isn't an expense—it's an investment in your business growth. Whether you're a business owner, entrepreneur, startup, or organization, CHILL TECH builds fast, responsive, high-converting websites tailored to your vision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Project Inquiry — CHILL TECH LTD')}`} className="btn btn-primary" style={{ padding: '14px 32px' }}>
              Start Your Project <FiArrowRight />
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '14px 28px' }}>
              <FiMessageSquare /> Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <main className="container" style={{ paddingBottom: 80 }}>
        {/* 2. WHAT I CAN BUILD */}
        <section className="work-section">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow">Services & Solutions</span>
            <h2 className="section-title">What CHILL TECH Can <span className="gradient-text">Build For You</span></h2>
          </div>

          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {SERVICES.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="glass"
                  style={{ padding: 28 }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(0, 194, 255, 0.1)',
                    border: '1px solid rgba(0, 194, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00c2ff',
                    fontSize: '1.4rem',
                    marginBottom: 18
                  }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 3. WHY CHOOSE CHILL TECH? */}
        <section className="work-section">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow">The CHILL TECH Advantage</span>
            <h2 className="section-title">Why Choose <span className="gradient-text">CHILL TECH?</span></h2>
          </div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, idx) => {
              const IconComp = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass"
                  style={{ padding: 28 }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: 'rgba(0, 194, 255, 0.1)',
                    border: '1px solid rgba(0, 194, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00c2ff',
                    fontSize: '1.4rem',
                    marginBottom: 18
                  }}>
                    <IconComp />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. DEVELOPMENT PROCESS TIMELINE */}
        <section className="work-section">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow">Proven Workflow</span>
            <h2 className="section-title">Development <span className="gradient-text">Process</span></h2>
          </div>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {PROCESS_STEPS.map((ps, idx) => (
              <motion.div
                key={ps.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="glass"
                style={{ padding: 24, position: 'relative' }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: '#00c2ff', opacity: 0.8, marginBottom: 10 }}>
                  {ps.step}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
                  {ps.title}
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.6 }}>{ps.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. PRICING TIERS */}
        <section className="work-section">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow">Investment Options</span>
            <h2 className="section-title">Transparent <span className="gradient-text">Packages</span></h2>
          </div>

          <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {/* Starter */}
            <div className="glass" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: 8 }}>Starter Website</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 24, flexGrow: 1 }}>
                Perfect for individuals, portfolio sites, and emerging small businesses looking to establish an online presence.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Up to 3 Responsive Pages</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Mobile & Speed Optimized</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Contact Form & WhatsApp Link</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> 1 Week Delivery</li>
              </ul>
              <a href="#estimator" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Get Quote</a>
            </div>

            {/* Professional */}
            <div className="glass" style={{ padding: 36, display: 'flex', flexDirection: 'column', border: '1px solid rgba(0, 194, 255, 0.45)', boxShadow: '0 0 30px rgba(0, 194, 255, 0.15)' }}>
              <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 800, color: '#000', background: 'linear-gradient(90deg, #00c2ff, #818cf8)', padding: '3px 10px', borderRadius: 999, alignSelf: 'flex-start', marginBottom: 12 }}>MOST POPULAR</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: 8 }}>Professional Website</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 24, flexGrow: 1 }}>
                Ideal for growing businesses needing custom features, e-commerce, or interactive components.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Up to 8 Responsive Pages</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> E-commerce or Admin Dashboard</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Custom Animations & SEO Setup</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> 2-3 Weeks Delivery</li>
              </ul>
              <a href="#estimator" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Get Quote</a>
            </div>

            {/* Custom Solution */}
            <div className="glass" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: 8 }}>Custom Enterprise</h3>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 24, flexGrow: 1 }}>
                Tailored web platforms, real estate portals, or fintech apps with unique complex logic.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Unlimited Custom Pages & Features</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Full-stack Backend Integration</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Priority 24/7 Technical Support</li>
                <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}><FiCheckCircle style={{ color: '#00c2ff' }} /> Custom Timeline</li>
              </ul>
              <a href="#estimator" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Get Quote</a>
            </div>
          </div>
        </section>

        {/* 9. PROJECT COST ESTIMATOR */}
        <section id="estimator" className="work-section" style={{ scrollMarginTop: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">Instant Quote</span>
            <h2 className="section-title">Project Cost <span className="gradient-text">Estimator</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              Select your requirements below for an instant estimated investment range & delivery timeframe.
            </p>
          </div>

          <div className="glass" style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: 880, margin: '0 auto' }}>
            <div className="estimator-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
              {/* Website Type */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 10 }}>Website Type</label>
                <select
                  value={siteType}
                  onChange={(e) => setSiteType(e.target.value)}
                  className="estimator-select"
                >
                  <option value="Business Website">Business Website</option>
                  <option value="E-commerce Store">E-commerce Store</option>
                  <option value="Portfolio Website">Portfolio Website</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Real Estate Portal">Real Estate Portal</option>
                  <option value="Custom Web Application">Custom Web Application</option>
                </select>
              </div>

              {/* Page Count */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 10 }}>Number of Pages</label>
                <select
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  className="estimator-select"
                >
                  <option value="1-3 Pages">1 - 3 Pages</option>
                  <option value="4-7 Pages">4 - 7 Pages</option>
                  <option value="8-15 Pages">8 - 15 Pages</option>
                  <option value="15+ Pages">15+ Pages</option>
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 10 }}>Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="estimator-select"
                >
                  <option value="Standard (2-3 Weeks)">Standard (2 - 3 Weeks)</option>
                  <option value="Rush (1 Week)">Rush Delivery (1 Week)</option>
                  <option value="Flexible (1 Month)">Flexible (1 Month)</option>
                </select>
              </div>
            </div>

            {/* Extra Features Checkboxes */}
            <div style={{ marginBottom: 36 }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: 14 }}>Select Desired Features</label>
              <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                {featureOptions.map((feat) => {
                  const checked = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 10,
                        fontSize: '0.82rem',
                        textAlign: 'left',
                        background: checked ? 'rgba(0, 194, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: checked ? '1px solid #00c2ff' : '1px solid var(--panel-border)',
                        color: checked ? '#00c2ff' : 'var(--text-dim)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <FiCheckCircle style={{ opacity: checked ? 1 : 0.3 }} />
                      {feat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Box */}
            <div
              style={{
                padding: 28,
                borderRadius: 18,
                background: 'linear-gradient(135deg, rgba(0, 194, 255, 0.12) 0%, rgba(8, 12, 22, 0.8) 100%)',
                border: '1px solid rgba(0, 194, 255, 0.4)',
                boxShadow: '0 0 30px rgba(0, 194, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 20,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Estimated Investment
                  </span>
                  {/* Currency Switcher */}
                  <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 2, border: '1px solid var(--panel-border)' }}>
                    <button
                      type="button"
                      onClick={() => setCurrency('NGN')}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: currency === 'NGN' ? '#00c2ff' : 'transparent',
                        color: currency === 'NGN' ? '#000' : 'var(--text-dim)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      ₦ NGN
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrency('USD')}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 6,
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: currency === 'USD' ? '#00c2ff' : 'transparent',
                        color: currency === 'USD' ? '#000' : 'var(--text-dim)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      $ USD
                    </button>
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.2rem', color: '#00c2ff' }}>
                  {currency === 'NGN'
                    ? `₦${estimatedCost.toLocaleString()}`
                    : `$${(Math.round(estimatedCost / 1500)).toLocaleString()}`}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500, marginLeft: 10 }}>
                    ({currency === 'NGN' ? `approx. $${(Math.round(estimatedCost / 1500)).toLocaleString()} USD` : `approx. ₦${estimatedCost.toLocaleString()} NGN`})
                  </span>
                </div>
              </div>

              <button onClick={handleWhatsAppEstimate} className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '0.92rem' }}>
                <FiMessageSquare /> Start Project on WhatsApp
              </button>
            </div>
          </div>
        </section>

        {/* 8. FAQ ACCORDION */}
        <section className="work-section" style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="eyebrow">Got Questions?</span>
            <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={faq.q} className="glass" style={{ borderRadius: 14, overflow: 'hidden' }}>
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      color: 'var(--text)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textAlign: 'left',
                    }}
                  >
                    <span>{faq.q}</span>
                    <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease', color: '#00c2ff' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. FINAL CALL TO ACTION */}
        <section className="work-section">
          <div className="glass work-cta-glass" style={{ padding: 'clamp(28px, 5vw, 56px) clamp(20px, 5vw, 36px)', textAlign: 'center', borderRadius: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0, 194, 255, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}>
              Ready to Grow Your <span className="gradient-text">Business Online?</span>
            </h2>
            <p style={{ color: 'var(--text-dim)', maxW: 620, margin: '0 auto 36px', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Let's create a modern, high-performing website that represents your brand, attracts customers, and helps your business grow.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '14px 32px' }}>
                <FiMessageSquare /> Chat on WhatsApp
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost" style={{ padding: '14px 28px' }}>
                Email Me Directly
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Strip */}
      <footer style={{ padding: '24px 0', borderTop: '1px solid var(--panel-border)', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.82rem' }}>
        © {new Date().getFullYear()} CHILL TECH LTD. All rights reserved. · <a href="#/" style={{ color: '#00c2ff' }}>Return to Homepage</a>
      </footer>

      <style>{`
        .work-page { min-height: 100vh; background: var(--bg-dark); color: var(--text); }
        .work-header { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 14px 32px; background: var(--bg-card); border-bottom: 1px solid var(--panel-border); backdrop-filter: blur(16px); gap: 12px; }
        .work-logo { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .work-hero { position: relative; overflow: hidden; padding-top: 40px; }
        .work-hero-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 30%, rgba(0, 194, 255, 0.18) 0%, transparent 70%); pointer-events: none; }
        .work-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(0, 194, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.03) 1px, transparent 1px); background-size: 44px 44px; pointer-events: none; }
        .work-section { margin-top: 96px; }
        .estimator-select { width: 100%; padding: 12px 16px; border-radius: 10px; background: var(--bg-card-hover); border: 1px solid var(--panel-border); color: var(--text); font-family: var(--font-body); font-size: 0.9rem; outline: none; }
        .estimator-select:focus { border-color: #00c2ff; }
        @media (max-width: 768px) {
          .work-header { padding: 10px 16px; gap: 8px; }
          .work-logo-name { display: none; }
          .work-home-btn { display: none; }
          .work-start-btn { padding: 8px 14px !important; font-size: 0.78rem !important; }
          .work-section { margin-top: 56px; }
        }
        @media (max-width: 480px) {
          .work-header { padding: 8px 12px; }
          .work-section { margin-top: 40px; }
        }
      `}</style>
    </div>
  );
}
