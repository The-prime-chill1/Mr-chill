import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiCode, FiAward, FiCheckCircle, FiTarget,
  FiTrendingUp, FiGlobe, FiBriefcase, FiBookOpen, FiArrowRight, FiMail, FiPhone
} from 'react-icons/fi';
import { profile, stats, education, languages } from '../data';
import headshot from '../assets/lamidi-headshot.jpg';
import Logo from './Logo';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv/Lamidi_Abdulhameed_Olawale_CV.pdf';
    link.download = 'Lamidi_Abdulhameed_Olawale_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="about-page-wrapper">
      {/* Top Header Navigation Bar */}
      <header className="about-page-nav">
        <div className="about-page-nav-inner">
          <a href="#/" className="about-back-btn" aria-label="Back to Homepage">
            <FiArrowLeft /> <span>Home</span>
          </a>
          <div className="about-nav-brand">
            <Logo width={26} style={{ borderRadius: '50%' }} />
            <span>Chill<strong className="gradient-text">Tech</strong></span>
          </div>
          <a href="#/cv" className="about-nav-cv-btn">
            Read CV
          </a>
        </div>
      </header>

      <main className="container about-page-content">

        {/* Page Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="about-page-hero"
        >
          <div className="about-badge">
            <span className="about-badge-dot" />
            <span>ABOUT CHILL TECH & FOUNDER</span>
          </div>
          <h1 className="about-main-title">
            Engineering <span className="gradient-text">High-Impact Digital Solutions</span> & Business Innovation
          </h1>
          <p className="about-hero-sub">
            Discover the mission, technology expertise, and leadership behind <strong>CHILL TECH LTD</strong> and Founder & CEO <strong>Lamidi Abdulhameed Olawale</strong>.
          </p>
        </motion.div>


        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: ABOUT THE COMPANY (CHILL TECH LTD)
        ═══════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="about-card-section"
        >
          <div className="about-section-header">
            <span className="about-section-pill">PART 01</span>
            <h2 className="about-section-heading">About The Company — CHILL TECH LTD</h2>
            <p className="about-section-desc">
              A forward-thinking software development and digital solutions company built to empower modern enterprises with world-class technology.
            </p>
          </div>

          <div className="company-grid">
            <div className="glass company-info-card">
              <div className="icon-badge">
                <FiTarget />
              </div>
              <h3>Our Core Mission</h3>
              <p>
                To help businesses thrive, scale, and outperform in the digital era by delivering high-converting websites, automated workflow portals, and robust software applications tailored specifically to their commercial goals.
              </p>
            </div>

            <div className="glass company-info-card">
              <div className="icon-badge">
                <FiTrendingUp />
              </div>
              <h3>Our Vision</h3>
              <p>
                To grow CHILL TECH LTD into a leading full-service technology company — delivering world-class digital products, software solutions, and tech innovation for businesses across Nigeria, the United Kingdom, and global markets.
              </p>
            </div>

            <div className="glass company-info-card">
              <div className="icon-badge">
                <FiCode />
              </div>
              <h3>What We Build</h3>
              <p>
                Full-stack web applications, real estate investment portals, high-converting e-commerce stores, international logistics platforms, educational portals, and custom corporate SaaS dashboards.
              </p>
            </div>
          </div>

          {/* Company Strengths Strip */}
          <div className="glass company-pillars-strip">
            <div className="pillar-item">
              <FiCheckCircle className="pillar-icon" />
              <div>
                <strong>Modern Engineering</strong>
                <span>React, Node.js, Three.js, clean code & performance optimization</span>
              </div>
            </div>
            <div className="pillar-item">
              <FiCheckCircle className="pillar-icon" />
              <div>
                <strong>Commercial Awareness</strong>
                <span>Designs built to convert visitors, capture leads, and drive revenue</span>
              </div>
            </div>
            <div className="pillar-item">
              <FiCheckCircle className="pillar-icon" />
              <div>
                <strong>End-to-End Delivery</strong>
                <span>From UI/UX design and wireframes to cloud deployment on Vercel & Netlify</span>
              </div>
            </div>
          </div>

          {/* Live Metric Counters */}
          <div className="about-metrics-grid">
            {stats.map((s) => (
              <div key={s.label} className="glass metric-box">
                <div className="metric-val gradient-text">{s.value}{s.suffix}</div>
                <div className="metric-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: ABOUT THE FOUNDER & CEO
        ═══════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="about-card-section"
        >
          <div className="about-section-header">
            <span className="about-section-pill">PART 02</span>
            <h2 className="about-section-heading">About The Founder & CEO</h2>
            <p className="about-section-desc">
              Meet <strong>Lamidi Abdulhameed Olawale</strong> — Software Developer, Technology Entrepreneur, and General Manager at CHIL Investment Ltd.
            </p>
          </div>

          <div className="founder-grid">
            {/* Left: Image Card */}
            <div className="founder-photo-col">
              <div className="glass founder-photo-frame">
                <img
                  src={headshot}
                  alt="Lamidi Abdulhameed Olawale at the Global Industry Summit, 21st UNIDO General Conference, Riyadh"
                  className="founder-headshot"
                />
                <div className="founder-photo-caption">
                  <strong>Lamidi Abdulhameed Olawale</strong>
                  <span>Delegate @ 21st UNIDO General Conference (Global Industry Summit, Riyadh)</span>
                </div>
              </div>

              {/* Direct Reach */}
              <div className="glass founder-direct-card">
                <h4>Connect Directly</h4>
                <a href={`mailto:${profile.personalEmail}`} className="founder-contact-link">
                  <FiMail /> {profile.personalEmail}
                </a>
                <a href={`tel:${profile.phone}`} className="founder-contact-link">
                  <FiPhone /> {profile.phone}
                </a>
              </div>
            </div>

            {/* Right: Detailed Biography */}
            <div className="founder-bio-col">
              <h3 className="founder-title">
                Software Engineer & <span className="gradient-text">Commercial General Manager</span>
              </h3>

              <p className="founder-p">
                I'm <strong>Lamidi Abdulhameed Olawale</strong> — Founder & CEO of <strong>CHILL TECH LTD</strong> and General Manager at <strong>CHIL Investment Ltd</strong>. I specialize in turning business objectives into clean, functional, and visually compelling digital experiences — from landing pages to full-scale web applications.
              </p>

              <p className="founder-p">
                Currently pursuing an <strong>Advanced Diploma in Software Engineering (ADSE)</strong> at Aptech Computer Education, I bring deep practical expertise in React.js, JavaScript, modern CSS architecture, UI/UX design, database systems, and cloud deployment pipelines.
              </p>

              {/* Dual Leadership Card */}
              <div className="glass dual-role-card">
                <div className="dual-role-header">
                  <FiBriefcase className="dual-role-icon" />
                  <div>
                    <h4>Dual Leadership: General Manager @ CHIL Investment Ltd</h4>
                    <span>Real Estate Investment & Commercial Asset Management</span>
                  </div>
                </div>
                <p>
                  Alongside leading CHILL TECH LTD, I oversee operational strategies and investor relations for 500+ property investors across Nigeria, managing multi-million naira portfolios and supervising the successful allocation of over 1,000 plots across Lagos, Ogun, and Oyo States. This dual role sharpens my ability to think commercially, understand business numbers, and execute under pressure.
                </p>
              </div>

              {/* Academic & Leadership Highlights */}
              <div className="education-box">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 14px' }}>
                  <FiBookOpen style={{ color: 'var(--cyan)' }} /> Education & Key Credentials
                </h4>
                <div className="edu-cards-list">
                  {education.map((e) => (
                    <div key={e.school} className="glass edu-item">
                      <div className="edu-item-top">
                        <strong>{e.school}</strong>
                        <span className="edu-period">{e.period}</span>
                      </div>
                      <div className="edu-degree">{e.degree}</div>
                      <div className="edu-detail">{e.detail}</div>
                      {e.coursework && (
                        <div className="edu-coursework">
                          <strong>Coursework:</strong> {e.coursework}
                        </div>
                      )}
                      {e.achievement && (
                        <div className="edu-achievement">
                          <FiAward style={{ color: '#f59e0b', flexShrink: 0 }} />
                          <span>{e.achievement}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="languages-strip">
                <span className="lang-label">Languages:</span>
                {languages.map((l) => (
                  <span key={l.name} className="glass lang-pill">
                    <strong>{l.name}</strong> ({l.level})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: PROFESSIONAL EXPERIENCE & CAREER JOURNEY
        ═══════════════════════════════════════════════════════════════ */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="about-card-section"
        >
          <div className="about-section-header">
            <span className="about-section-pill">PART 03</span>
            <h2 className="about-section-heading">Professional Career Experience</h2>
            <p className="about-section-desc">
              Track record of digital leadership, commercial operations, and hands-on software development across leading organizations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {profile && [
              {
                role: 'Founder & CEO',
                org: 'CHILL TECH LTD',
                location: 'Nigeria',
                period: 'Present',
                points: [
                  "Lead the company's digital and technology direction and manage client-facing software projects.",
                  "Design and develop responsive websites, web applications, and e-commerce platforms based on business requirements.",
                  "Translate client requirements into practical, high-converting digital solutions.",
                  "Manage projects from initial consultation through design, coding, testing, deployment, and ongoing delivery.",
                  "Build and maintain projects using React, JavaScript, Node.js, and version-control workflows.",
                  "Deploy and maintain scalable websites using Vercel, Netlify, and cloud infrastructure.",
                  "Develop tailored solutions for e-commerce, real estate, logistics, education, and business use cases."
                ],
                achievements: [
                  "Founded and scaled CHILL TECH LTD into a recognized digital engineering brand.",
                  "Successfully delivered 20+ websites and web applications with 98% client satisfaction."
                ]
              },
              {
                role: 'General Manager',
                org: 'CHIL Investment Ltd',
                location: 'Nigeria',
                period: 'Present',
                points: [
                  "Coordinate day-to-day corporate operations and support executive management decision-making.",
                  "Manage relationships with 500+ investors, commercial clients, stakeholders, and business partners.",
                  "Supervise land documentation, property allocation, sales operations, and estate development initiatives.",
                  "Supervised the successful allocation of over 1,000 plots across Lagos, Ogun, and Oyo States.",
                  "Contribute to business growth, investor relations, property marketing, and operational optimization."
                ],
                achievements: [
                  "Grew the investor portfolio by 40% year-on-year through structured relations.",
                  "Spearheaded digital transformation for client onboarding and investment tracking."
                ]
              }
            ].map((job) => (
              <div key={job.role + job.org} className="glass" style={{ padding: '24px 28px', borderRadius: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: '0 0 4px', color: 'var(--text)' }}>{job.role}</h3>
                    <div style={{ color: 'var(--cyan)', fontSize: '0.92rem', fontWeight: 600 }}>
                      {job.org} · {job.location}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--cyan)', border: '1px solid rgba(0,194,255,0.3)', background: 'rgba(0,194,255,0.08)', borderRadius: 999, padding: '4px 14px', fontWeight: 600 }}>
                    {job.period}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {job.points.map((p) => (
                    <li key={p} style={{ display: 'flex', gap: 10, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
                      <span style={{ color: 'var(--electric-blue)', flexShrink: 0, fontWeight: 700 }}>—</span>
                      {p}
                    </li>
                  ))}
                </ul>

                {job.achievements.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                    {job.achievements.map((a) => (
                      <span
                        key={a}
                        style={{
                          fontSize: '0.78rem',
                          padding: '5px 12px',
                          borderRadius: 999,
                          background: 'rgba(91,110,232,0.1)',
                          color: 'var(--electric-blue)',
                          border: '1px solid rgba(91,110,232,0.25)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <FiAward style={{ color: '#f59e0b' }} /> {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: KEY ACHIEVEMENTS & MILESTONES
        ═══════════════════════════════════════════════════════════════ */}
        <motion.section
          id="achievements"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="about-card-section"
        >
          <div className="about-section-header">
            <span className="about-section-pill">PART 04</span>
            <h2 className="about-section-heading">Key Achievements & Track Record</h2>
            <p className="about-section-desc">
              A detailed snapshot of what CHILL TECH LTD and Founder Lamidi Abdulhameed Olawale have built, managed, and delivered.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
            {[
              "Founded & built CHILL TECH LTD from the ground up — delivering high-performance websites and digital solutions for clients across multiple industries",
              "Successfully designed, developed, and deployed 20+ websites and web applications across real estate, logistics, education, e-commerce, and SaaS platforms",
              "Capable of building any type of website — from business landing pages, e-commerce stores, and portfolios, to booking platforms, dashboards, and full web applications",
              "Achieved a 98% client satisfaction rate across all delivered projects through consistent quality, communication, and results",
              "Serves as General Manager at CHIL Investment Ltd, overseeing real estate investments for 500+ investors across Nigeria",
              "Supervised the successful allocation of 1,000+ plots across multiple estate locations in Lagos, Ogun, and Oyo States",
              "Grew the CHIL Investment Ltd investor portfolio by 40% year-on-year through strategic asset management and investor relations",
              "First Student Provost in the history of Police Secondary School, Akure — recognised for exceptional leadership, discipline, and responsibility",
              "Represented Nigeria as a delegate at the 21st UNIDO General Conference, Riyadh — the Global Industry Summit attended by world leaders and government ministers"
            ].map((text, idx) => (
              <div key={idx} className="glass" style={{ padding: '18px 20px', borderRadius: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 194, 255, 0.12)',
                    color: 'var(--cyan)',
                    fontSize: '1rem',
                  }}
                >
                  <FiAward />
                </span>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════════
            CALL TO ACTION BANNER
        ═══════════════════════════════════════════════════════════════ */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass about-cta-banner"
        >

          <h2>Ready to bring your project or idea to life?</h2>
          <p>
            Whether you need a brand-new website, an e-commerce platform, a real estate portal, or software consultation, let's talk and build something exceptional together.
          </p>
          <div className="about-cta-btns">
            <a href="#/work-with-me" className="btn btn-primary">
              Work With Me <FiArrowRight />
            </a>
            <a href="#/quote" className="btn btn-ghost">
              Request a Quote
            </a>
            <button onClick={handleDownloadCV} className="btn btn-ghost">
              Download Full CV
            </button>
          </div>
        </motion.section>

      </main>

      {/* Page Footer */}
      <footer className="about-page-footer">
        <div className="container">
          <div className="about-page-footer-inner">
            <span>© {new Date().getFullYear()} CHILL TECH LTD. All rights reserved.</span>
            <a href="#/" className="about-footer-home-link">Back to Homepage</a>
          </div>
        </div>
      </footer>

      <style>{`
        .about-page-wrapper {
          min-height: 100vh;
          background: var(--bg-dark, #0a0f1d);
          color: var(--text, #f8fafc);
          display: flex;
          flex-direction: column;
        }

        /* ── Top Nav ── */
        .about-page-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 14px 24px;
          background: rgba(10, 15, 29, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        [data-theme="light"] .about-page-nav {
          background: rgba(255, 255, 255, 0.9);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .about-page-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .about-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--cyan, #00c2ff);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.92rem;
          transition: transform 0.2s ease;
        }

        .about-back-btn:hover {
          transform: translateX(-3px);
        }

        .about-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .about-nav-cv-btn {
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.1);
          border: 1px solid rgba(0, 194, 255, 0.3);
          color: var(--cyan, #00c2ff);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .about-nav-cv-btn:hover {
          background: rgba(0, 194, 255, 0.2);
        }

        /* ── Content Container ── */
        .about-page-content {
          padding-top: 40px;
          padding-bottom: 80px;
          max-width: 1140px;
          margin: 0 auto;
        }

        /* ── Hero ── */
        .about-page-hero {
          text-align: center;
          margin-bottom: 56px;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.08);
          border: 1px solid rgba(0, 194, 255, 0.25);
          color: var(--cyan, #00c2ff);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }

        .about-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00c2ff;
          box-shadow: 0 0 10px #00c2ff;
        }

        .about-main-title {
          font-family: var(--font-display, 'Outfit', sans-serif);
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .about-hero-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: var(--text-dim);
          max-width: 720px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ── Section Cards ── */
        .about-card-section {
          background: var(--bg-card, rgba(16, 24, 45, 0.6));
          border: 1px solid var(--panel-border, rgba(255, 255, 255, 0.08));
          border-radius: 24px;
          padding: 44px;
          margin-bottom: 48px;
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
        }

        .about-section-header {
          margin-bottom: 32px;
        }

        .about-section-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--electric-blue, #2f8dff);
          margin-bottom: 8px;
        }

        .about-section-heading {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3.5vw, 1.95rem);
          font-weight: 800;
          margin: 0 0 10px;
        }

        .about-section-desc {
          color: var(--text-dim);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          max-width: 800px;
        }

        /* ── Company Grid ── */
        .company-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        .company-info-card {
          padding: 24px 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .company-info-card h3 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
          color: var(--text);
        }

        .company-info-card p {
          font-size: 0.9rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0;
        }

        .icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(0, 194, 255, 0.1);
          border: 1px solid rgba(0, 194, 255, 0.25);
          color: var(--cyan, #00c2ff);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        /* ── Pillars Strip ── */
        .company-pillars-strip {
          padding: 20px 24px;
          border-radius: 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }

        .pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .pillar-icon {
          color: #22c55e;
          font-size: 1.25rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .pillar-item div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pillar-item strong {
          font-size: 0.92rem;
          color: var(--text);
        }

        .pillar-item span {
          font-size: 0.8rem;
          color: var(--text-dim);
          line-height: 1.45;
        }

        /* ── Metrics Grid ── */
        .about-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .metric-box {
          padding: 18px 12px;
          border-radius: 14px;
          text-align: center;
        }

        .metric-val {
          font-family: var(--font-display);
          font-size: 1.65rem;
          font-weight: 800;
        }

        .metric-lbl {
          font-size: 0.78rem;
          color: var(--text-dim);
          margin-top: 4px;
        }

        /* ── Founder Section ── */
        .founder-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 44px;
          align-items: flex-start;
        }

        .founder-photo-frame {
          padding: 12px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .founder-headshot {
          width: 100%;
          border-radius: 14px;
          display: block;
        }

        .founder-photo-caption {
          margin-top: 12px;
          padding: 4px 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .founder-photo-caption strong {
          font-size: 0.95rem;
          color: var(--text);
        }

        .founder-photo-caption span {
          font-size: 0.78rem;
          color: var(--text-dim);
          line-height: 1.4;
        }

        .founder-direct-card {
          padding: 18px 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .founder-direct-card h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--cyan);
        }

        .founder-contact-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.84rem;
          transition: color 0.2s ease;
          word-break: break-all;
        }

        .founder-contact-link:hover {
          color: var(--cyan);
        }

        /* ── Founder Bio Col ── */
        .founder-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 16px;
        }

        .founder-p {
          font-size: 0.95rem;
          color: var(--text-dim);
          line-height: 1.75;
          margin-bottom: 16px;
        }

        .dual-role-card {
          padding: 20px;
          border-radius: 16px;
          border-left: 4px solid var(--cyan);
          margin-bottom: 24px;
        }

        .dual-role-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .dual-role-icon {
          font-size: 1.4rem;
          color: var(--cyan);
          flex-shrink: 0;
        }

        .dual-role-header h4 {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
        }

        .dual-role-header span {
          font-size: 0.76rem;
          color: var(--cyan);
        }

        .dual-role-card p {
          margin: 0;
          font-size: 0.88rem;
          color: var(--text-dim);
          line-height: 1.65;
        }

        /* ── Education Box ── */
        .education-box {
          margin-bottom: 20px;
        }

        .edu-cards-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .edu-item {
          padding: 16px;
          border-radius: 14px;
        }

        .edu-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .edu-item-top strong {
          font-size: 0.95rem;
        }

        .edu-period {
          font-size: 0.75rem;
          color: var(--cyan);
          font-weight: 600;
        }

        .edu-degree {
          font-size: 0.85rem;
          color: var(--electric-blue);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .edu-detail {
          font-size: 0.82rem;
          color: var(--text-dim);
          line-height: 1.5;
        }

        .edu-coursework {
          margin-top: 6px;
          font-size: 0.78rem;
          color: var(--text-dim);
          background: rgba(0, 0, 0, 0.15);
          padding: 6px 10px;
          border-radius: 6px;
        }

        .edu-achievement {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #fbbf24;
        }

        /* ── Languages Strip ── */
        .languages-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 14px;
        }

        .lang-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text);
        }

        .lang-pill {
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
        }

        /* ── CTA Banner ── */
        .about-cta-banner {
          padding: 44px 36px;
          border-radius: 24px;
          text-align: center;
          background: linear-gradient(135deg, rgba(0, 194, 255, 0.08) 0%, rgba(129, 140, 248, 0.08) 100%);
          border: 1px solid rgba(0, 194, 255, 0.25);
        }

        .about-cta-banner h2 {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 800;
          margin: 0 0 12px;
        }

        .about-cta-banner p {
          max-width: 600px;
          margin: 0 auto 24px;
          color: var(--text-dim);
          font-size: 0.98rem;
          line-height: 1.6;
        }

        .about-cta-btns {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ── Footer ── */
        .about-page-footer {
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 0;
          font-size: 0.84rem;
          color: var(--text-dim);
        }

        .about-page-footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .about-footer-home-link {
          color: var(--cyan);
          text-decoration: none;
          font-weight: 600;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .founder-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .company-grid {
            grid-template-columns: 1fr;
          }
          .company-pillars-strip {
            grid-template-columns: 1fr;
          }
          .about-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .about-page-nav {
            padding: 10px 12px;
          }
          .about-page-nav-inner {
            gap: 6px;
          }
          .about-back-btn {
            font-size: 0.82rem;
            gap: 4px;
          }
          .about-nav-brand {
            font-size: 0.85rem;
            gap: 6px;
          }
          .about-nav-cv-btn {
            padding: 4px 10px;
            font-size: 0.78rem;
          }
          .about-page-content {
            padding-top: 20px;
            padding-bottom: 40px;
          }
          .about-page-hero {
            margin-bottom: 28px;
          }
          .about-badge {
            font-size: 0.68rem;
            padding: 4px 12px;
            margin-bottom: 14px;
          }
          .about-main-title {
            font-size: 1.55rem;
            line-height: 1.24;
            margin-bottom: 12px;
          }
          .about-hero-sub {
            font-size: 0.86rem;
            line-height: 1.55;
          }
          .about-card-section {
            padding: 20px 14px;
            border-radius: 18px;
            margin-bottom: 32px;
          }
          .about-section-heading {
            font-size: 1.3rem;
          }
          .about-section-desc {
            font-size: 0.88rem;
          }
          .about-cta-banner {
            padding: 28px 16px;
            border-radius: 18px;
          }
          .about-cta-banner h2 {
            font-size: 1.35rem;
          }
          .about-cta-banner p {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
}

