import { motion } from 'framer-motion';
import { 
  FiArrowRight, FiExternalLink, FiLayers, FiStar, 
  FiBriefcase, FiSmartphone, FiTerminal, FiEye 
} from 'react-icons/fi';
import { stats, projects, testimonials } from '../data';
import headshot from '../assets/lamidi-headshot.jpg';

export default function HomePage({ onDownloadCV }) {
  // Top 3 Flagship Projects for teaser
  const featuredProjects = projects.slice(0, 3);
  const featuredReview = testimonials[0] || {
    name: 'Alhaji Abdulrasheed',
    role: 'Managing Director, CHIL Investment Ltd',
    quote: 'Lamidi has exceptional technical and leadership abilities. He transformed our digital workflow and customer experience completely.',
    stars: 5,
  };

  return (
    <div className="homepage-content">
      {/* ── 1. Hero Section ── */}
      <section className="hero-landing-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-center-box"
          >
            <div className="hero-company-pill">
              <span className="pulse-dot"></span>
              <span>CHILL TECH LTD · INNOVATE • BUILD • EMPOWER</span>
            </div>

            <h1 className="hero-main-title">
              We engineer <span className="gradient-text">high-performance</span> websites & custom software.
            </h1>

            <p className="hero-subtext">
              Transforming bold business ideas into modern, scalable digital platforms. 
              Led by Founder & CEO <strong>Lamidi Abdulhameed Olawale</strong>.
            </p>

            <div className="hero-cta-group">
              <a href="#/portfolio" className="btn-hero-primary">
                <span>Explore Portfolio</span>
                <FiArrowRight />
              </a>
              <a href="#/quote" className="btn-hero-secondary">
                <span>Request a Quote</span>
              </a>
              <a href="#/work-with-me" className="btn-hero-ghost">
                <span>Services</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Impact Metrics Strip ── */}
      <section className="metrics-strip-section">
        <div className="container">
          <div className="metrics-bar glass">
            {stats.map((s) => (
              <div key={s.label} className="metric-item">
                <div className="metric-val gradient-text">{s.value}{s.suffix}</div>
                <div className="metric-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Featured Work Teaser (Top 3) ── */}
      <section className="featured-work-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">PORTFOLIO PREVIEW</span>
              <h2 className="section-heading">Featured Client Works</h2>
            </div>
            <a href="#/portfolio" className="btn-section-link">
              View All 8+ Projects <FiArrowRight />
            </a>
          </div>

          <div className="featured-cards-grid">
            {featuredProjects.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="featured-project-card glass"
              >
                <div className="fproject-thumb">
                  <FiLayers className="fproject-thumb-icon" />
                  <span className="fproject-badge">Production Live</span>
                </div>
                <div className="fproject-body">
                  <h3 className="fproject-title">{p.title}</h3>
                  <p className="fproject-desc">{p.description}</p>
                  
                  {p.tech && (
                    <div className="fproject-tags">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  )}

                  <div className="fproject-foot">
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" className="fproject-link">
                        <span>Visit Website</span>
                        <FiExternalLink />
                      </a>
                    ) : (
                      <span className="fproject-link" style={{ opacity: 0.6 }}>Enterprise Portal</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Core Services Teaser (Top 3) ── */}
      <section className="services-teaser-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="eyebrow">WHAT WE BUILD</span>
              <h2 className="section-heading">Tailored Digital Solutions</h2>
            </div>
            <a href="#/work-with-me" className="btn-section-link">
              Explore All 12 Services & Pricing <FiArrowRight />
            </a>
          </div>

          <div className="services-teaser-grid">
            <div className="service-teaser-card glass">
              <div className="service-icon-box">
                <FiBriefcase />
              </div>
              <h3 className="service-card-title">Corporate & E-Commerce Websites</h3>
              <p className="service-card-desc">
                High-converting websites and digital storefronts engineered with luxury UI/UX, lightning-fast loading speeds, and integrated payment gateways.
              </p>
              <a href="#/work-with-me" className="service-card-arrow">
                <span>View Details</span> <FiArrowRight />
              </a>
            </div>

            <div className="service-teaser-card glass">
              <div className="service-icon-box">
                <FiSmartphone />
              </div>
              <h3 className="service-card-title">Mobile Web Apps & PWAs</h3>
              <p className="service-card-desc">
                Cross-platform web applications that look and feel like native mobile apps — installable on iOS and Android with smooth animations.
              </p>
              <a href="#/work-with-me" className="service-card-arrow">
                <span>View Details</span> <FiArrowRight />
              </a>
            </div>

            <div className="service-teaser-card glass">
              <div className="service-icon-box">
                <FiTerminal />
              </div>
              <h3 className="service-card-title">Custom Portals & SaaS Systems</h3>
              <p className="service-card-desc">
                Full-stack web software, real estate management dashboards, client portals, and administrative tools built with React and cloud backends.
              </p>
              <a href="#/work-with-me" className="service-card-arrow">
                <span>View Details</span> <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Compact Founder & Company Teaser ── */}
      <section className="about-teaser-section">
        <div className="container">
          <div className="about-teaser-box glass">
            <div className="about-teaser-img-col">
              <img
                src={headshot}
                alt="Lamidi Abdulhameed Olawale - Founder & CEO CHILL TECH LTD"
                className="about-teaser-photo"
              />
            </div>
            <div className="about-teaser-text-col">
              <span className="eyebrow">FOUNDER & CEO</span>
              <h2 className="about-teaser-title">Lamidi Abdulhameed Olawale</h2>
              <p className="about-teaser-bio">
                Founder & CEO of <strong>CHILL TECH LTD</strong> and General Manager at <strong>CHIL Investment Ltd</strong>. 
                With an Advanced Diploma in Software Engineering (ADSE) from Aptech, he combines technical mastery with commercial strategy to engineer high-value digital experiences.
              </p>
              <div className="about-teaser-buttons">
                <a href="#/about" className="btn-teaser-primary">
                  <span>Read Full Story & Vision</span>
                  <FiArrowRight />
                </a>
                <a href="#/experience" className="btn-teaser-secondary">
                  <span>View Track Record</span>
                </a>
                <a href="#/cv" className="btn-teaser-ghost">
                  <FiEye style={{ marginRight: 6 }} /> View Full CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Client Trust / Testimonial Banner ── */}
      <section className="review-teaser-section">
        <div className="container">
          <div className="review-highlight-card glass">
            <div className="review-stars-row">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill="#f59e0b" stroke="none" style={{ color: '#f59e0b', fontSize: '1.1rem' }} />
              ))}
            </div>
            <blockquote className="review-quote">
              "{featuredReview.quote}"
            </blockquote>
            <div className="review-author-row">
              <div>
                <div className="review-author-name">{featuredReview.name}</div>
                <div className="review-author-role">{featuredReview.role}</div>
              </div>
              <a href="#/reviews" className="btn-review-more">
                <span>Read All Client Reviews</span>
                <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Call To Action (Bottom) ── */}
      <section className="home-cta-section">
        <div className="container">
          <div className="home-cta-card glass">
            <span className="eyebrow" style={{ color: '#051019', opacity: 0.8 }}>START YOUR PROJECT</span>
            <h2 className="home-cta-title">Ready to take your business to the next level?</h2>
            <p className="home-cta-sub">
              Let's engineer a bespoke website, application, or software solution for your brand.
            </p>
            <div className="home-cta-actions">
              <a href="#/quote" className="btn-cta-dark">
                <span>Get an Instant Cost Estimate</span>
                <FiArrowRight />
              </a>
              <a href="#/contact" className="btn-cta-outline">
                <span>Contact CHILL TECH LTD</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .homepage-content {
          padding-top: 10px;
          padding-bottom: 60px;
        }

        .hero-landing-section {
          padding: 40px 0 30px;
          text-align: center;
        }

        .hero-center-box {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-company-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(0, 194, 255, 0.08);
          border: 1px solid rgba(0, 194, 255, 0.25);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--cyan);
          margin-bottom: 20px;
          max-width: 100%;
          box-sizing: border-box;
          word-break: break-word;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: 0 0 10px var(--cyan);
          flex-shrink: 0;
        }

        .hero-main-title {
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 5.5vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin: 0 0 18px;
        }

        .hero-subtext {
          font-size: clamp(1rem, 2.8vw, 1.18rem);
          color: var(--text-dim);
          line-height: 1.65;
          max-width: 720px;
          margin: 0 auto 32px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--cyan), var(--electric-blue));
          color: #051019;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(0, 194, 255, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-height: 46px;
        }

        .btn-hero-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 194, 255, 0.55);
        }

        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--text);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
          min-height: 46px;
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 20px;
          border-radius: 999px;
          color: var(--text-dim);
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .btn-hero-ghost:hover {
          color: var(--cyan);
        }

        /* ── Metrics Strip ── */
        .metrics-strip-section {
          padding: 10px 0 40px;
        }

        .metrics-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 24px 16px;
          border-radius: 20px;
          text-align: center;
          gap: 16px;
        }

        .metric-val {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 2.3rem);
          font-weight: 800;
          line-height: 1;
        }

        .metric-lbl {
          font-size: 0.82rem;
          color: var(--text-dim);
          margin-top: 6px;
        }

        /* ── Section Header Row ── */
        .section-head-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .section-heading {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4vw, 2rem);
          font-weight: 800;
          margin: 6px 0 0;
          color: var(--text);
        }

        .btn-section-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--cyan);
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s ease;
        }

        .btn-section-link:hover {
          transform: translateX(4px);
        }

        /* ── Featured Work Grid ── */
        .featured-work-section {
          padding: 30px 0;
        }

        .featured-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .featured-project-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .featured-project-card:hover {
          transform: translateY(-6px);
        }

        .fproject-thumb {
          height: 130px;
          background: linear-gradient(135deg, #0c1222, #00c2ff22);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .fproject-thumb-icon {
          font-size: 2.2rem;
          color: var(--cyan);
          opacity: 0.8;
        }

        .fproject-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .fproject-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .fproject-title {
          font-family: var(--font-display);
          font-size: 1.12rem;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .fproject-desc {
          font-size: 0.86rem;
          color: var(--text-dim);
          line-height: 1.55;
          margin: 0 0 16px;
          flex-grow: 1;
        }

        .fproject-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .tech-badge {
          font-size: 0.72rem;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-dim);
        }

        .fproject-foot {
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .fproject-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--cyan);
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
        }

        /* ── Services Teaser Grid ── */
        .services-teaser-section {
          padding: 40px 0;
        }

        .services-teaser-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .service-teaser-card {
          padding: 28px 24px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .service-teaser-card:hover {
          transform: translateY(-5px);
        }

        .service-icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: rgba(0, 194, 255, 0.1);
          border: 1px solid rgba(0, 194, 255, 0.25);
          color: var(--cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          margin-bottom: 18px;
        }

        .service-card-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .service-card-desc {
          font-size: 0.88rem;
          color: var(--text-dim);
          line-height: 1.6;
          margin: 0 0 18px;
          flex-grow: 1;
        }

        .service-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--cyan);
          text-decoration: none;
        }

        /* ── Founder Teaser Box ── */
        .about-teaser-section {
          padding: 30px 0;
        }

        .about-teaser-box {
          padding: 32px;
          border-radius: 24px;
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          align-items: center;
        }

        .about-teaser-photo {
          width: 100%;
          border-radius: 16px;
          display: block;
        }

        .about-teaser-title {
          font-family: var(--font-display);
          font-size: clamp(1.4rem, 3.5vw, 1.8rem);
          font-weight: 800;
          margin: 6px 0 12px;
        }

        .about-teaser-bio {
          font-size: 0.94rem;
          color: var(--text-dim);
          line-height: 1.65;
          margin: 0 0 20px;
        }

        .about-teaser-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-teaser-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--cyan), var(--electric-blue));
          color: #051019;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
        }

        .btn-teaser-secondary {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--text);
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
        }

        .btn-teaser-ghost {
          display: inline-flex;
          align-items: center;
          color: var(--cyan);
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
        }

        /* ── Review Highlight ── */
        .review-teaser-section {
          padding: 30px 0;
        }

        .review-highlight-card {
          padding: 32px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(0, 194, 255, 0.04));
          border: 1px solid rgba(245, 158, 11, 0.25);
        }

        .review-stars-row {
          display: flex;
          gap: 4px;
          margin-bottom: 12px;
        }

        .review-quote {
          font-size: clamp(1rem, 2.5vw, 1.15rem);
          font-style: italic;
          line-height: 1.6;
          color: var(--text);
          margin: 0 0 18px;
        }

        .review-author-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .review-author-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text);
        }

        .review-author-role {
          font-size: 0.82rem;
          color: var(--text-dim);
        }

        .btn-review-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #f59e0b;
          font-weight: 700;
          font-size: 0.88rem;
          text-decoration: none;
        }

        /* ── Home CTA Bottom ── */
        .home-cta-section {
          padding: 40px 0 10px;
        }

        .home-cta-card {
          padding: 44px 32px;
          border-radius: 28px;
          text-align: center;
          background: linear-gradient(135deg, var(--cyan), var(--electric-blue));
          color: #051019;
          box-shadow: 0 16px 50px -10px rgba(0, 194, 255, 0.45);
        }

        .home-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4.5vw, 2.4rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 8px 0 10px;
          color: #051019;
        }

        .home-cta-sub {
          font-size: clamp(0.95rem, 2.5vw, 1.08rem);
          color: rgba(5, 16, 25, 0.85);
          max-width: 600px;
          margin: 0 auto 24px;
        }

        .home-cta-actions {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-cta-dark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: #051019;
          color: #fff;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
          min-height: 46px;
        }

        .btn-cta-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(5, 16, 25, 0.25);
          color: #051019;
          font-weight: 700;
          font-size: 0.92rem;
          text-decoration: none;
          min-height: 46px;
        }

        @media (max-width: 960px) {
          .featured-cards-grid, .services-teaser-grid {
            grid-template-columns: 1fr;
          }
          .about-teaser-box {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-teaser-photo {
            max-width: 180px;
            margin: 0 auto;
          }
          .about-teaser-buttons {
            justify-content: center;
          }
          .metrics-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 580px) {
          .home-cta-card {
            padding: 30px 16px;
          }
          .btn-hero-primary, .btn-hero-secondary, .btn-cta-dark, .btn-cta-outline {
            width: 100%;
          }
          .hero-cta-group, .home-cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .about-teaser-buttons {
            flex-direction: column;
            width: 100%;
          }
          .btn-teaser-primary, .btn-teaser-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
