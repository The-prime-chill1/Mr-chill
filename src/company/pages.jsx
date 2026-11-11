import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiArrowRight, FiArrowUpRight, FiBriefcase, FiCheck, FiCode,
  FiDownload, FiExternalLink, FiFileText, FiGithub, FiGlobe, FiLayers, FiMail, FiMapPin,
  FiMessageSquare, FiPhone, FiPlus, FiPrinter, FiSend, FiStar, FiTarget, FiTrash2, FiTrendingUp, FiUsers,
} from 'react-icons/fi';
import { profile, stats, education, experience, testimonials } from '../data';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import headshot from '../assets/lamidi-headshot.jpg';
import { companyProjects, projectCategories, services, solutions, values } from './content';
import { usePageMeta } from './SiteLayout';
import { insertSupabaseRow, isSupabaseConfigured, sendEnquiryAcknowledgement } from '../lib/supabase';

const CV_URL = '/cv/Lamidi_Abdulhameed_Olawale_CV.pdf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/lamidi-abdulhameed-olawale-740985428';

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

function PageShell({ children }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, text, action }) {
  return (
    <motion.div className="section-heading" {...rise}>
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
      <div>{text && <p>{text}</p>}{action}</div>
    </motion.div>
  );
}

function ProjectVisual({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const screenshot = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&quality=80&viewport.width=1400&viewport.height=900`;
  const previewSource = project.preview || screenshot;
  return (
    <div className="project-visual">
      <span className="live-preview-badge">Live website preview</span>
      <div className={`project-visual-fallback ${loaded ? 'hidden' : ''}`}><FiLayers /><strong>{project.title}</strong></div>
      {!failed && <img src={previewSource} alt={`${project.title} actual landing page preview`} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
      {project.video && <a className="project-video-badge" href={project.video} target="_blank" rel="noreferrer">Watch project video <FiExternalLink /></a>}
    </div>
  );
}

function ProjectGrid({ limit, category = 'All', titles }) {
  const selected = titles ? titles.map((title) => companyProjects.find((project) => project.title === title)).filter(Boolean) : companyProjects;
  const filtered = category === 'All' ? selected : selected.filter((project) => project.category === category);
  const items = limit ? filtered.slice(0, limit) : filtered;
  return (
    <div className="project-grid">
      {items.map((project, index) => (
        <motion.article className="project-card" key={project.slug} {...rise} transition={{ ...rise.transition, delay: (index % 3) * 0.06 }}>
          <ProjectVisual project={project} />
          <div className="project-card-copy">
            <div className="project-card-meta"><span>{project.category}</span><span>{project.status}</span></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-services"><strong>Services</strong><div>{project.services.map((item) => <span key={item}>{item}</span>)}</div></div>
            {project.tech.length > 0 && <div className="project-tech"><strong>Verified technologies</strong><div>{project.tech.map((item) => <span key={item}>{item}</span>)}</div></div>}
            {project.attribution && <p className="project-attribution">{project.attribution}</p>}
            <div className="project-card-actions"><a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">View Live Project <FiExternalLink /></a>{project.video && <a className="project-video-link" href={project.video} target="_blank" rel="noreferrer">Watch YouTube Demo <FiExternalLink /></a>}<Link to={`/projects/${project.slug}`}>Project details <FiArrowUpRight /></Link></div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function CTASection({ title = 'Have a business challenge worth solving?', text = 'Tell us what you are building, improving, or trying to simplify. We will help you shape the right digital approach.' }) {
  return (
    <section className="company-cta section-pad">
      <motion.div {...rise}>
        <span className="eyebrow">Start a conversation</span>
        <h2>{title}</h2><p>{text}</p>
        <div className="button-row"><Link className="button button-light" to="/enquiry">Work With CHILL TECH <FiArrowUpRight /></Link><Link className="button button-outline-light" to="/projects">View Our Work</Link></div>
      </motion.div>
    </section>
  );
}

export function HomePage() {
  usePageMeta('CHILL TECH LTD | Web Development & Digital Solutions', 'CHILL TECH LTD builds professional websites, custom software, business platforms, and practical digital solutions for organizations in Nigeria and worldwide.', '/');
  return (
    <PageShell>
      <section className="company-hero section-pad">
        <div className="hero-grid-lines" aria-hidden="true" />
        <motion.div className="company-hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="eyebrow eyebrow-light">Digital engineering · Nigeria to the world</span>
          <h1>We build digital solutions that move businesses <em>forward.</em></h1>
          <p>From modern websites and custom software to intelligent business technology solutions, CHILL TECH LTD helps businesses turn ambitious ideas into practical digital experiences.</p>
          <div className="button-row"><Link className="button button-primary" to="/services">Explore Our Services <FiArrowRight /></Link><Link className="button button-secondary" to="/projects">View Our Work</Link><Link className="section-link" to="/enquiry">Work With CHILL TECH <FiArrowUpRight /></Link></div>
        </motion.div>
        <motion.div className="company-hero-visual" initial={{ opacity: 0, scale: 0.88, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
          <div className="hero-logo-panel"><img src={companyLogo} alt="CHILL TECH LTD — Innovate, Build, Empower" /></div>
          <span className="hero-chip hero-chip-top">Web · Software · Business Tech</span><span className="hero-chip hero-chip-bottom">Built for measurable growth</span>
        </motion.div>
      </section>

      <section className="intro-band section-pad">
        <motion.p {...rise}>CHILL TECH LTD is a digital engineering company dedicated to transforming business goals into modern, high-performing websites and custom software solutions.</motion.p>
        <div className="intro-stats">{stats.map((item) => <motion.div key={item.label} {...rise}><strong>{item.value}{item.suffix}</strong><span>{item.label}</span></motion.div>)}</div>
      </section>

      <section className="light-section section-pad">
        <SectionHeading eyebrow="What we do" title="Technology shaped around the business—not the other way around." text="We combine strategic thinking, product design, and modern engineering to deliver useful digital systems." action={<Link className="section-link" to="/services">Explore all services <FiArrowRight /></Link>} />
        <div className="service-grid">{services.slice(0, 4).map((service) => <motion.article className="service-card" key={service.id} {...rise}><span>{service.number}</span><h3>{service.title}</h3><p>{service.summary}</p><Link to={`/services#${service.id}`}>Learn more <FiArrowUpRight /></Link></motion.article>)}</div>
      </section>

      <section className="project-showcase-section section-pad">
        <SectionHeading eyebrow="Selected projects" title="See the real landing pages we have built." text="Each visual below is a live preview of the actual client website—not a generic mockup." action={<Link className="section-link" to="/projects">All company projects <FiArrowRight /></Link>} />
        <ProjectGrid titles={['Al-Irshaad Islamic Institute', 'BudgetBasics', 'R&G Collections']} />
      </section>

      <section className="solutions-preview section-pad">
        <SectionHeading eyebrow="Business solutions" title="We connect technology decisions to practical outcomes." text="Our work is structured around the progress a business needs to make—not a list of fashionable features." />
        <div className="solution-list">{solutions.map((solution, index) => <motion.article key={solution.title} {...rise}><span>0{index + 1}</span><h3>{solution.title}</h3><p>{solution.text}</p></motion.article>)}</div>
      </section>
      <CTASection />
    </PageShell>
  );
}

export function AboutCompanyPage() {
  usePageMeta('About CHILL TECH LTD', 'Learn about CHILL TECH LTD, our mission, technology philosophy, business approach, and Founder & CEO Lamidi Abdulhameed Olawale.', '/about');
  return (
    <PageShell>
      <section className="page-hero section-pad"><span className="eyebrow eyebrow-light">About CHILL TECH LTD</span><h1>Engineering digital progress with business purpose.</h1><p>We are building a technology company defined by useful innovation, dependable execution, and the ambition to help organizations grow through better digital systems.</p></section>

      <section className="company-story section-pad">
        <div className="story-lead"><span className="eyebrow">Our company</span><h2>A digital engineering partner for businesses ready to move forward.</h2></div>
        <div className="story-copy"><p>CHILL TECH LTD is a digital engineering company dedicated to transforming business goals into modern, high-performing websites and custom software solutions.</p><p>Our work sits at the intersection of technology and commercial understanding. We translate ideas, operational needs, and customer expectations into digital products that are clear, reliable, responsive, and built to support long-term progress.</p><p>Today, our active direction centers on software development, web engineering, business applications, e-commerce, and industry-focused digital solutions. Our longer-term ambition includes carefully expanding into broader technology products, gadgets, and electronics as the company grows.</p></div>
      </section>

      <section className="mission-grid section-pad">
        <motion.article {...rise}><FiTarget /><span>Mission</span><h3>Turn business goals into effective technology.</h3><p>To build modern digital solutions that help businesses communicate clearly, operate efficiently, and grow with confidence.</p></motion.article>
        <motion.article {...rise}><FiTrendingUp /><span>Vision</span><h3>Build a trusted, full-service technology company.</h3><p>To grow CHILL TECH LTD into a respected technology business delivering world-class digital products from Nigeria to international markets.</p></motion.article>
        <motion.article {...rise}><FiCode /><span>Technology philosophy</span><h3>Useful, maintainable, and designed for people.</h3><p>We use technology intentionally. Every interface, feature, and engineering decision should make a real task clearer or a business outcome stronger.</p></motion.article>
      </section>

      <section className="light-section section-pad">
        <SectionHeading eyebrow="How we work" title="Principles that guide every engagement." text="A strong product is the result of clear thinking, honest communication, and disciplined delivery." />
        <div className="values-grid">{values.map(([title, text], index) => <motion.article key={title} {...rise}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
      </section>

      <section className="founder-section section-pad">
        <motion.div className="founder-image" {...rise}><img src={headshot} alt="Lamidi Abdulhameed Olawale, Founder and CEO of CHILL TECH LTD" /><span>Founder & Chief Executive Officer</span></motion.div>
        <motion.div className="founder-copy" {...rise}>
          <span className="eyebrow eyebrow-light">Meet the Founder & CEO</span><h2>Lamidi Abdulhameed Olawale</h2><p className="founder-roles">Technology Entrepreneur · Software Engineer · Full-Stack Developer · Business Manager · Digital Solutions Specialist</p>
          <p>Lamidi leads CHILL TECH LTD with a focus on technology, entrepreneurship, software engineering, and practical business innovation. He is responsible for the company’s technical direction, client delivery, product thinking, and long-term growth.</p>
          <p>Alongside his role at CHILL TECH LTD, he serves as General Manager at CHIL Investment Ltd and is pursuing an Advanced Diploma in Software Engineering at Aptech. This combination of engineering education and business management shapes a leadership approach grounded in both execution and commercial understanding.</p>
          <div className="executive-facts"><span><FiBriefcase /> Founder & CEO, CHILL TECH LTD</span><span><FiUsers /> General Manager, CHIL Investment Ltd</span><span><FiCode /> ADSE Software Engineering, Aptech</span></div>
          <div className="button-row"><Link className="button button-primary" to="/portfolio">View CEO Portfolio <FiArrowRight /></Link><Link className="button button-outline-light" to="/cv">View CV</Link></div>
        </motion.div>
      </section>
      <CTASection title="Why businesses choose CHILL TECH LTD" text="We bring technology competence, business awareness, direct communication, and end-to-end ownership to every project." />
    </PageShell>
  );
}

export function ServicesPage() {
  usePageMeta('Technology Services', 'Explore CHILL TECH LTD web development, custom software, e-commerce, product design, industry solutions, deployment, and support services.', '/services');
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Services</span><h1>Digital engineering services built around progress.</h1><p>From the first business conversation to deployment and ongoing support, CHILL TECH LTD provides focused technology delivery under one roof.</p></section><section className="service-detail-list section-pad">{services.map((service) => <motion.article id={service.id} key={service.id} {...rise}><span>{service.number}</span><div><h2>{service.title}</h2><p>{service.summary}</p></div><ul>{service.details.map((item) => <li key={item}><FiCheck /> {item}</li>)}</ul></motion.article>)}</section><section className="process-section section-pad"><SectionHeading eyebrow="Delivery process" title="Clear from discovery to long-term support." text="A disciplined process keeps decisions visible and helps ambitious work move without unnecessary complexity." /><div className="process-grid">{[['01','Discover','Business goals, users, requirements, and success criteria.'],['02','Define','Product scope, information architecture, and creative direction.'],['03','Design & build','Responsive design and engineering developed as one system.'],['04','Launch & improve','Quality checks, deployment, support, and ongoing iteration.']].map(([n,t,x]) => <motion.article key={n} {...rise}><span>{n}</span><h3>{t}</h3><p>{x}</p></motion.article>)}</div></section><CTASection /></PageShell>;
}

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  usePageMeta('Company Projects & Case Studies', 'Explore websites, software platforms, and digital solutions delivered by CHILL TECH LTD across multiple industries.', '/projects');
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Company project portfolio</span><h1>Every project, visible before you click.</h1><p>Explore genuine live-page previews, project descriptions, industries, services, verified technologies, and delivery status directly on each card.</p><Link className="text-link-light" to="/portfolio">Visit CEO Portfolio <FiArrowUpRight /></Link></section><section className="projects-page section-pad"><div className="project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="project-results-count"><span>{activeCategory}</span><strong>{activeCategory === 'All' ? companyProjects.length : companyProjects.filter((project) => project.category === activeCategory).length} projects</strong></div><ProjectGrid category={activeCategory} /></section><CTASection title="CHILL TECH LTD — We Build. You Grow." /></PageShell>;
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = companyProjects.find((item) => item.slug === slug);
  usePageMeta(project ? `${project.title} Case Study` : 'Project Not Found', project ? project.description : 'The requested CHILL TECH LTD project could not be found.', `/projects/${slug}`);
  if (!project) return <PageShell><section className="not-found section-pad"><span>404</span><h1>Project not found.</h1><Link className="button button-primary" to="/projects"><FiArrowLeft /> Back to projects</Link></section></PageShell>;
  return <PageShell><section className="case-hero section-pad"><Link className="back-link" to="/projects"><FiArrowLeft /> All projects</Link><span className="eyebrow eyebrow-light">{project.sector} · Case study</span><h1>{project.title}</h1><p>{project.description}</p><a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">Visit Live Website <FiExternalLink /></a></section><section className="case-visual section-pad"><ProjectVisual project={project} /></section><section className="case-content section-pad"><article><span>01 · Challenge</span><h2>The business need</h2><p>{project.challenge}</p></article><article><span>02 · Solution</span><h2>What CHILL TECH delivered</h2><p>{project.solution}</p></article><article><span>03 · Outcome</span><h2>A stronger digital foundation</h2><p>{project.outcome}</p></article></section><section className="case-tech section-pad"><span>Technology used</span><div>{project.tech.map((item) => <strong key={item}>{item}</strong>)}</div></section><CTASection /></PageShell>;
}

export function SolutionsPage() {
  usePageMeta('Business & Digital Solutions', 'See how CHILL TECH LTD applies web, software, commerce, and industry technology to practical business challenges.', '/solutions');
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Solutions</span><h1>Technology should solve the right business problem.</h1><p>We organize our thinking around the outcome an organization needs—credibility, efficiency, commerce, or a stronger industry platform.</p></section><section className="solution-detail-grid section-pad">{solutions.map((solution, index) => <motion.article key={solution.title} {...rise}><span>0{index + 1}</span><h2>{solution.title}</h2><p>{solution.text}</p><ul>{solution.outcomes.map((item) => <li key={item}><FiCheck /> {item}</li>)}</ul></motion.article>)}</section><section className="direction-section section-pad"><div><span className="eyebrow eyebrow-light">Long-term direction</span><h2>Building beyond today’s service offering.</h2></div><p>CHILL TECH LTD’s current work is focused on digital engineering, websites, software, business applications, e-commerce, and sector-focused technology solutions. As the business matures, the company intends to explore broader technology opportunities—including gadgets and electronics—carefully and without presenting future divisions as currently operational.</p></section><CTASection /></PageShell>;
}

const capabilityGroups = [
  ['Software & Full-Stack Development', ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'Node.js', 'Express', 'REST APIs']],
  ['Frontend & Web Engineering', ['React', 'Vite', 'HTML5', 'CSS3', 'Responsive Design', 'Progressive Web Apps']],
  ['Data & Business Applications', ['SQL', 'MySQL', 'Database Management', 'Business dashboards', 'Client portals', 'Workflow applications']],
  ['Product & Design', ['UI/UX Design', 'Wireframing', 'Prototyping', 'Figma', 'Technology product development']],
  ['Tools & Delivery', ['Git', 'GitHub', 'Vercel', 'Netlify', 'VS Code', 'Generative AI tools']],
];

export function CEOPortfolioPage() {
  usePageMeta('Lamidi Abdulhameed Olawale — CEO Portfolio', 'Professional portfolio of Lamidi Abdulhameed Olawale, Founder and CEO of CHILL TECH LTD, technology entrepreneur, software engineer, and business manager.', '/portfolio');
  return <PageShell><section className="portfolio-hero section-pad"><motion.div className="portfolio-portrait" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}><img src={headshot} alt="Lamidi Abdulhameed Olawale, technology entrepreneur and software engineer" /><span>Founder & CEO · CHILL TECH LTD</span></motion.div><motion.div className="portfolio-hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}><Link className="portfolio-company-link" to="/"><FiArrowLeft /> CHILL TECH LTD website</Link><span className="eyebrow eyebrow-light">CEO personal portfolio</span><h1>Lamidi Abdulhameed Olawale</h1><h2>Building Technology. Creating Opportunities. Driving Innovation.</h2><p className="founder-roles">Founder & CEO | Technology Entrepreneur | Software Engineer | Business Manager</p><p>I build digital solutions, lead business initiatives, and pursue technology-driven opportunities that connect strong engineering with practical commercial value.</p><div className="button-row"><a className="button button-primary" href={CV_URL} download="Lamidi-Abdulhameed-Olawale-CV.pdf"><FiDownload /> Download CV</a><Link className="button button-outline-light" to="/cv">View CV</Link><Link className="text-link-light" to="/contact">Contact Me <FiArrowUpRight /></Link></div><div className="portfolio-socials"><a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a></div></motion.div></section>

  <section className="portfolio-bio section-pad"><SectionHeading eyebrow="Professional biography" title="Technology, entrepreneurship, and business leadership." /><div><p>Lamidi Abdulhameed Olawale is the Founder and Chief Executive Officer of CHILL TECH LTD, where he leads digital product strategy, software delivery, client engagement, and the company’s long-term direction.</p><p>His professional interests span software engineering, full-stack development, business technology, entrepreneurship, and building practical digital ventures. He approaches technology as both an engineering discipline and a tool for creating opportunities, improving operations, and helping businesses grow.</p><p>He also serves as General Manager at CHIL Investment Ltd, supporting business operations, investor relationships, property allocation, and organizational initiatives. He is currently pursuing an Advanced Diploma in Software Engineering at Aptech Computer Education.</p></div></section>

  <section className="portfolio-experience section-pad"><SectionHeading eyebrow="Professional experience" title="Leadership across technology and business operations." /><div>{experience.map((role) => <motion.article key={`${role.org}-${role.role}`} {...rise}><div><span>{role.period}</span><h3>{role.role}</h3><strong>{role.org} · {role.location}</strong></div><ul>{role.points.slice(0, 5).map((point) => <li key={point}><FiCheck /> {point}</li>)}</ul></motion.article>)}</div></section>

  <section className="portfolio-education section-pad"><SectionHeading eyebrow="Education" title="Verified academic and technical development." /><div>{education.map((item) => <motion.article key={item.school} {...rise}><span>{item.period}</span><h3>{item.school}</h3><strong>{item.degree}</strong><p>{item.detail}</p>{item.coursework && <small>{item.coursework}</small>}</motion.article>)}</div></section>

  <section className="capabilities-section section-pad"><SectionHeading eyebrow="Technical capabilities" title="A broad, practical foundation for building digital products." text="Capabilities are grouped by working area without assigning unsupported expert ratings." /><div className="capability-groups">{capabilityGroups.map(([group, items]) => <motion.article key={group} {...rise}><h3>{group}</h3><div>{items.map((item) => <span key={item}>{item}</span>)}</div></motion.article>)}</div></section>

  <section className="leadership-section section-pad"><div><span className="eyebrow eyebrow-light">Leadership & entrepreneurship</span><h2>Building a company while developing the skills to lead its future.</h2></div><div><p>Through CHILL TECH LTD, Lamidi is building a platform for technology services, digital products, and future technology-driven ventures. His role combines hands-on product development with company leadership, client communication, business development, and decision-making.</p><p>His management responsibilities at CHIL Investment Ltd further strengthen his experience in stakeholder relations, commercial operations, coordination, and execution under pressure.</p></div></section>

  <section className="portfolio-contact section-pad"><span className="eyebrow">Professional contact</span><h2>Let’s connect.</h2><div><a href={`mailto:${profile.personalEmail}`}><FiMail /> {profile.personalEmail}</a><a href={`tel:${profile.phone.replace(/\s/g, '')}`}><FiPhone /> {profile.phone}</a><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><FiGlobe /> LinkedIn</a><span><FiMapPin /> Nigeria · Open to global opportunities</span></div></section></PageShell>;
}

function ContactSubmissionForm({
  heading = 'Tell us what you want to build.',
  intro = 'Your details are submitted securely to the CHILL TECH LTD project inbox.',
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: 'Website development', message: '', website: '' });
  const [submission, setSubmission] = useState({ state: 'idle', message: '' });
  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event) => {
    event.preventDefault();
    if (form.website) return setSubmission({ state: 'success', message: 'Thank you. Your enquiry has been received.' });
    setSubmission({ state: 'loading', message: 'Sending your enquiry…' });
    try {
      const message = form.company ? `Company: ${form.company}\n\n${form.message}` : form.message;
      const submittedName = form.name.trim().split(/\s+/)[0];
      const submittedEmail = form.email.trim().toLowerCase();
      const submittedService = form.service.toLowerCase();
      await insertSupabaseRow('enquiries', { full_name: form.name.trim(), email: submittedEmail, phone: form.phone.trim() || null, service: form.service, message, status: 'new' });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { service: form.service });
      }
      let acknowledgementSent = false;
      try {
        await sendEnquiryAcknowledgement({ name: form.name.trim(), email: submittedEmail, phone: form.phone.trim(), company: form.company.trim(), service: form.service, message: form.message.trim(), website: form.website });
        acknowledgementSent = true;
      } catch {
        acknowledgementSent = false;
      }
      setSubmission({ state: 'success', message: `Thank you, ${submittedName}. Your ${submittedService} enquiry has been received securely. CHILL TECH LTD will review it and contact you through ${submittedEmail}.${acknowledgementSent ? ' A confirmation email has also been sent.' : ''}` });
      setForm({ name: '', email: '', phone: '', company: '', service: 'Website development', message: '', website: '' });
    } catch (error) {
      setSubmission({ state: 'error', message: error.message });
    }
  };

  return (
    <section className="contact-form-section section-pad">
      <div><span className="eyebrow">Project enquiry</span><h2>{heading}</h2><p>{intro}</p></div>
      <form onSubmit={submit}>
        <label className="form-honeypot" aria-hidden="true">Website<input tabIndex="-1" autoComplete="off" value={form.website} onChange={(event) => updateField('website', event.target.value)} /></label>
        <div className="form-pair"><label>Name<input required value={form.name} onChange={(event) => updateField('name', event.target.value)} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label></div>
        <div className="form-pair"><label>Phone<input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label><label>Company<input value={form.company} onChange={(event) => updateField('company', event.target.value)} /></label></div>
        <label>Service<select value={form.service} onChange={(event) => updateField('service', event.target.value)}><option>Website development</option><option>Custom software</option><option>E-commerce</option><option>UI/UX design</option><option>Business technology solution</option><option>Other</option></select></label>
        <label>Project details<textarea required minLength="10" value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Describe your goal, required features, and preferred timeline." /></label>
        <button className="button button-primary" type="submit" disabled={submission.state === 'loading'}><FiSend /> {submission.state === 'loading' ? 'Sending…' : 'Submit Enquiry'}</button>
        {submission.message && <p className={`form-status ${submission.state}`} role="status" aria-live="polite">{submission.message}</p>}
      </form>
    </section>
  );
}

export function CompanyEnquiryPage() {
  usePageMeta('Start a Project', 'Submit a secure project enquiry to CHILL TECH LTD for web development, custom software, e-commerce, UI/UX, and business technology solutions.', '/enquiry');
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Start a project</span><h1>Bring us the business goal. We’ll help shape the technology.</h1><p>Tell CHILL TECH LTD what you want to launch, improve, or automate. Your enquiry goes directly into our secure project dashboard for review.</p></section><ContactSubmissionForm heading="Start with a clear project brief." intro="Share the essentials below. After submission, you will receive an immediate confirmation on this page and the enquiry will be available to our team in the secure admin dashboard." /><section className="contact-note section-pad"><span>What happens next</span><div><p><strong>01</strong> Your enquiry is saved securely</p><p><strong>02</strong> The company reviews your requirements</p><p><strong>03</strong> We contact you to clarify the scope</p><p><strong>04</strong> You receive the appropriate proposal or next step</p></div></section></PageShell>;
}

export function CompanyContactPage() {
  usePageMeta('Contact CHILL TECH LTD', 'Contact CHILL TECH LTD to discuss a website, custom software application, business platform, or digital technology project.', '/contact');
  return <PageShell><section className="contact-hero section-pad"><div><span className="eyebrow eyebrow-light">Contact</span><h1>Let’s turn the next business goal into a working digital solution.</h1><p>Share your idea, current challenge, or project requirements. CHILL TECH LTD will respond with practical next steps.</p></div><div className="contact-direct"><a href={`mailto:${profile.officialEmail}`}><span>Email</span><strong>{profile.officialEmail}</strong><FiArrowUpRight /></a><a href={profile.whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{profile.phone}</strong><FiArrowUpRight /></a><a href={profile.whatsappChannel} target="_blank" rel="noreferrer"><span>Official WhatsApp Channel</span><strong>Follow CHILL TECH LTD updates</strong><FiArrowUpRight /></a><div><span>Location</span><strong>Nigeria · Working worldwide</strong></div></div></section><section className="contact-options section-pad"><motion.article {...rise}><FiGlobe /><h2>Start a project</h2><p>Tell us what you want to launch, improve, or automate, including your goals and expected timeline.</p><a className="button button-primary" href={`mailto:${profile.officialEmail}?subject=${encodeURIComponent('Project inquiry — CHILL TECH LTD')}`}>Send Project Brief <FiMail /></a></motion.article><motion.article {...rise}><FiPhone /><h2>Prefer a direct conversation?</h2><p>Use WhatsApp for an initial discussion, or follow the official channel for company updates.</p><div className="button-row"><a className="button button-secondary" href={profile.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp <FiArrowUpRight /></a><a className="section-link" href={profile.whatsappChannel} target="_blank" rel="noreferrer">Follow Official Channel <FiArrowUpRight /></a></div></motion.article></section><ContactSubmissionForm /><section className="contact-note section-pad"><span>What to include</span><div><p><strong>01</strong> Your business or organization</p><p><strong>02</strong> The problem or opportunity</p><p><strong>03</strong> Features or outcomes you need</p><p><strong>04</strong> Your preferred timeline</p></div></section></PageShell>;
}

const faqItems = [
  ['What services does CHILL TECH LTD provide?', 'We provide professional web development, custom software and business applications, e-commerce solutions, product strategy, UI/UX design, industry-focused platforms, deployment, and ongoing technical support.'],
  ['Does CHILL TECH LTD work with clients outside Nigeria?', 'Yes. The company is based in Nigeria and can work remotely with businesses and organizations in international markets.'],
  ['How long does a typical project take?', 'Timelines depend on the approved scope. A focused business website may take one to two weeks, while e-commerce, portals, and custom applications may require two to four weeks or more. The confirmed delivery schedule is documented before work begins.'],
  ['How are project payments handled?', 'Project fees, deposits, milestones, taxes, discounts, balances, and due dates are stated on the official CHILL TECH LTD invoice. Clients are required to pay the amount shown on the invoice according to its approved payment schedule.'],
  ['Can I request an invoice before payment?', 'Yes. Use the invoice generator to prepare a draft, or contact CHILL TECH LTD for an official project invoice based on an approved scope and quotation.'],
  ['Are the projects page and CEO portfolio the same?', 'No. /projects showcases company work and client case studies. /portfolio is the separate professional portfolio of Founder and CEO Lamidi Abdulhameed Olawale.'],
  ['Does CHILL TECH LTD currently sell gadgets or electronics?', 'The company has a long-term interest in broader technology opportunities, including gadgets and electronics. Those future divisions are not presented as currently operational unless formally launched.'],
  ['What happens after a website is launched?', 'Depending on the agreement, CHILL TECH LTD can provide deployment support, maintenance, technical improvements, performance work, and continued product iteration.'],
];

export function CompanyFAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  usePageMeta('Frequently Asked Questions', 'Answers about CHILL TECH LTD services, project timelines, invoices, payments, company projects, support, and working arrangements.', '/faq');
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Frequently asked questions</span><h1>Clear answers before we build.</h1><p>Learn how CHILL TECH LTD handles services, delivery, project payments, invoices, support, and company information.</p></section><section className="faq-section section-pad"><div className="faq-list">{faqItems.map(([question, answer], index) => <article key={question} className={openIndex === index ? 'open' : ''}><button type="button" onClick={() => setOpenIndex(openIndex === index ? -1 : index)} aria-expanded={openIndex === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><i>{openIndex === index ? '−' : '+'}</i></button>{openIndex === index && <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>{answer}</motion.p>}</article>)}</div><aside><span className="eyebrow">Still need help?</span><h2>Talk directly with the company.</h2><p>Share your question or project requirements and we will respond with the right next step.</p><Link className="button button-primary" to="/contact">Contact CHILL TECH <FiArrowUpRight /></Link></aside></section></PageShell>;
}

export function CompanyPrivacyPage() {
  usePageMeta('Privacy Policy & Business Terms', 'Read the CHILL TECH LTD privacy policy, website terms, invoice payment requirements, project responsibilities, and contact information.', '/privacy');
  const sections = [
    ['Information we collect', 'We may collect information you voluntarily provide through email, WhatsApp, project briefs, quotations, invoices, or other direct communication. This can include your name, business name, contact details, project requirements, and billing information.'],
    ['How information is used', 'Information is used to respond to enquiries, prepare quotations and invoices, deliver agreed services, provide support, improve our website and services, maintain business records, and meet applicable legal or administrative obligations.'],
    ['Cookies, analytics, and website data', 'The website uses Google Analytics 4 and Microsoft Clarity, and may use basic browser storage or technical logs to understand website visits, page usage, traffic sources, device information, interaction patterns, security, and performance. This helps CHILL TECH LTD improve its website, usability, and services. Google and Microsoft may process analytics information according to their own privacy policies and controls. We do not claim to sell personal information.'],
    ['Third-party services', 'Projects and website operations may use trusted third-party platforms such as hosting providers, deployment services, email services, analytics tools, payment services, or APIs. Their own terms and privacy policies may apply.'],
    ['Project invoices and payment', 'Clients must pay the fees, deposit, milestone amounts, taxes, discounts, and outstanding balance stated on the official invoice. Payment must follow the currency, method, due date, and schedule shown on that invoice. An invoice is tied to the approved scope or quotation; changes outside that scope may require a revised invoice.'],
    ['Late or incomplete payment', 'Where an invoice is overdue or a required milestone remains unpaid, CHILL TECH LTD may pause work, delay delivery, withhold deployment or transfer, or reschedule the project until payment obligations are resolved. Any special payment arrangement must be confirmed in writing.'],
    ['Intellectual property and delivery', 'Ownership, licensing, source-code transfer, third-party assets, and final handover depend on the written project agreement and full settlement of the applicable invoice. Pre-existing company tools, reusable components, and third-party materials remain subject to their respective rights and licences.'],
    ['Client responsibilities', 'Clients are responsible for providing accurate information, timely feedback, lawful content, required access, and approvals. Delays in these responsibilities may affect the delivery schedule.'],
    ['Security and retention', 'Reasonable steps are taken to protect business and personal information. No internet system is completely risk-free. Records may be retained where necessary for project delivery, support, invoicing, accounting, dispute resolution, or legal compliance.'],
    ['Your choices', 'You may request access, correction, or deletion of personal information held by CHILL TECH LTD, subject to records that must be retained for legitimate business, legal, or accounting purposes.'],
  ];
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Privacy policy & business terms</span><h1>Clear standards for data, projects, invoices, and payment.</h1><p>Last updated 11 November 2026. These terms explain how website information and project engagements are handled by CHILL TECH LTD.</p></section><section className="policy-layout section-pad"><nav><span>On this page</span>{sections.map(([title], index) => <a key={title} href={`#policy-${index + 1}`}>{String(index + 1).padStart(2, '0')} · {title}</a>)}</nav><div className="policy-content"><div className="policy-notice"><strong>Important invoice rule</strong><p>Clients are required to pay what is stated on the approved CHILL TECH LTD invoice, according to its listed currency, due date, deposit, milestone, and balance terms.</p><Link to="/invoice">Open Invoice Generator <FiArrowUpRight /></Link></div>{sections.map(([title, text], index) => <article id={`policy-${index + 1}`} key={title}><span>{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{text}</p></article>)}<article><span>11</span><h2>Contact</h2><p>Questions about privacy, project terms, or invoices can be sent to <a href={`mailto:${profile.officialEmail}`}>{profile.officialEmail}</a> or discussed through the official WhatsApp contact.</p></article></div></section></PageShell>;
}

export function CompanyReviewsPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', project: '', rating: 5, review: '', consent: false });
  const [submission, setSubmission] = useState({ state: 'idle', message: '' });
  usePageMeta('Client Reviews', 'Read verified CHILL TECH LTD client feedback and send a review about your website, software, or digital project experience.', '/reviews');
  const updateReview = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const submitReview = async (event) => {
    event.preventDefault();
    setSubmission({ state: 'loading', message: 'Sending your review…' });
    try {
      await insertSupabaseRow('reviews', { ...form, status: 'pending' });
      setSubmission({ state: 'success', message: 'Thank you. Your review was submitted for verification.' });
      setForm({ name: '', company: '', email: '', project: '', rating: 5, review: '', consent: false });
    } catch (error) {
      if (!isSupabaseConfigured) {
        const body = [`Client review submission`, ``, `Name: ${form.name}`, `Company: ${form.company || 'Not provided'}`, `Email: ${form.email}`, `Project: ${form.project || 'Not provided'}`, `Rating: ${form.rating}/5`, ``, `Review:`, form.review, ``, `Permission to publish: ${form.consent ? 'Yes' : 'No'}`].join('\n');
        window.location.href = `mailto:${profile.officialEmail}?subject=${encodeURIComponent('Client Review Submission — CHILL TECH LTD')}&body=${encodeURIComponent(body)}`;
        setSubmission({ state: 'success', message: 'Your email app was opened because Supabase is not configured yet.' });
        return;
      }
      setSubmission({ state: 'error', message: error.message });
    }
  };
  return <PageShell><section className="page-hero section-pad"><span className="eyebrow eyebrow-light">Client reviews</span><h1>What clients say about working with CHILL TECH LTD.</h1><p>Real feedback from organizations whose websites and digital platforms have been designed and developed through the company.</p></section><section className="reviews-grid section-pad">{testimonials.map((item, index) => <motion.blockquote key={`${item.name}-${item.project}`} {...rise}><div>{Array.from({ length: item.rating }, (_, star) => <FiStar key={star} />)}</div><p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.role}</span><small>{item.project}</small></footer><i>0{index + 1}</i></motion.blockquote>)}</section><section className="review-submit-section section-pad"><div><span className="eyebrow">Send a review</span><h2>Worked with CHILL TECH LTD?</h2><p>Share an honest review. Submissions are stored privately for verification before publication.</p><div className="review-trust-note"><FiMessageSquare /><span>Reviews are not published automatically. Client identity and project context are checked first.</span></div></div><form onSubmit={submitReview}><div className="form-pair"><label>Your name<input required value={form.name} onChange={(event) => updateReview('name', event.target.value)} /></label><label>Email<input required type="email" value={form.email} onChange={(event) => updateReview('email', event.target.value)} /></label></div><div className="form-pair"><label>Company / organization<input value={form.company} onChange={(event) => updateReview('company', event.target.value)} /></label><label>Project name<input value={form.project} onChange={(event) => updateReview('project', event.target.value)} /></label></div><label>Rating<select value={form.rating} onChange={(event) => updateReview('rating', Number(event.target.value))}><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select></label><label>Your review<textarea required minLength="20" value={form.review} onChange={(event) => updateReview('review', event.target.value)} placeholder="Tell us about the project, communication, delivery, and result." /></label><label className="consent-label"><input type="checkbox" checked={form.consent} onChange={(event) => updateReview('consent', event.target.checked)} /><span>I allow CHILL TECH LTD to publish this review after verification.</span></label><button className="button button-primary" type="submit" disabled={submission.state === 'loading'}><FiSend /> {submission.state === 'loading' ? 'Sending…' : 'Send Review'}</button>{submission.message && <p className={`form-status ${submission.state}`}>{submission.message}</p>}</form></section></PageShell>;
}

const todayString = () => new Date().toISOString().slice(0, 10);

export function InvoiceGeneratorPage() {
  const [invoice, setInvoice] = useState({
    number: `CTL-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`,
    date: todayString(), dueDate: '', currency: 'NGN', clientName: '', clientCompany: '', clientEmail: '', clientAddress: '', tax: 0, discount: 0,
    notes: 'Payment must be made according to the amount, currency, due date, and schedule stated on this invoice.',
    items: [{ id: 1, description: 'Website design and development', quantity: 1, rate: 0 }],
  });
  const [saveState, setSaveState] = useState({ state: 'idle', message: '' });
  usePageMeta('Invoice Generator', 'Create and print a professional CHILL TECH LTD project invoice with client details, line items, totals, payment terms, and due dates.', '/invoice');

  const update = (field, value) => setInvoice((current) => ({ ...current, [field]: value }));
  const updateItem = (id, field, value) => setInvoice((current) => ({ ...current, items: current.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  const addItem = () => setInvoice((current) => ({ ...current, items: [...current.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }] }));
  const removeItem = (id) => setInvoice((current) => ({ ...current, items: current.items.length === 1 ? current.items : current.items.filter((item) => item.id !== id) }));
  const subtotal = invoice.items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0);
  const taxValue = subtotal * (Number(invoice.tax || 0) / 100);
  const total = Math.max(0, subtotal + taxValue - Number(invoice.discount || 0));
  const money = (value) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: invoice.currency, maximumFractionDigits: 2 }).format(value || 0);
  const printInvoice = () => window.print();
  const saveInvoice = async () => {
    setSaveState({ state: 'loading', message: 'Saving invoice…' });
    try {
      await insertSupabaseRow('invoices', {
        invoice_number: invoice.number,
        issue_date: invoice.date,
        due_date: invoice.dueDate || null,
        currency: invoice.currency,
        client_name: invoice.clientName || null,
        client_company: invoice.clientCompany || null,
        client_email: invoice.clientEmail || null,
        client_address: invoice.clientAddress || null,
        items: invoice.items.map(({ description, quantity, rate }) => ({ description, quantity: Number(quantity), rate: Number(rate) })),
        subtotal, tax_percent: Number(invoice.tax), tax_amount: taxValue, discount: Number(invoice.discount), total, notes: invoice.notes, status: 'draft',
      });
      setSaveState({ state: 'success', message: 'Invoice saved to the admin dashboard.' });
    } catch (error) {
      setSaveState({ state: 'error', message: error.message });
    }
  };
  const downloadInvoice = () => {
    const preview = document.querySelector('.invoice-preview');
    if (!preview) return;
    const documentHtml = `<!doctype html><html><head><meta charset="utf-8"><title>${invoice.number}</title><style>body{font-family:Arial,sans-serif;color:#06172f;padding:32px}img{width:80px}.invoice-preview{max-width:900px;margin:auto}.invoice-preview-header,.invoice-parties,.invoice-total-row{display:flex;justify-content:space-between;gap:30px}.invoice-preview table{width:100%;border-collapse:collapse;margin:30px 0}.invoice-preview th,.invoice-preview td{padding:12px;border-bottom:1px solid #dce8f2;text-align:left}.invoice-totals{margin-left:auto;max-width:360px}.invoice-total-row{padding:7px 0}.invoice-total-row.grand{font-size:20px;font-weight:bold;border-top:2px solid #159cff;margin-top:8px;padding-top:14px}</style></head><body>${preview.outerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([documentHtml], { type: 'text/html' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `${invoice.number || 'CHILL-TECH-Invoice'}.html`; anchor.click();
    URL.revokeObjectURL(url);
  };

  return <PageShell><section className="invoice-page section-pad"><div className="invoice-page-heading"><div><span className="eyebrow">Invoice generator</span><h1>Create a professional project invoice.</h1><p>Prepare a draft invoice, confirm every detail, then print or save it as PDF. Official client invoices should reflect the approved project scope and payment agreement.</p>{saveState.message && <p className={`form-status ${saveState.state}`}>{saveState.message}</p>}</div><div className="button-row no-print"><button className="button button-secondary" type="button" onClick={saveInvoice} disabled={saveState.state === 'loading'}><FiFileText /> {saveState.state === 'loading' ? 'Saving…' : 'Save Invoice'}</button><button className="button button-secondary" type="button" onClick={downloadInvoice}><FiDownload /> Download Invoice</button><button className="button button-primary" type="button" onClick={printInvoice}><FiPrinter /> Print / Save PDF</button></div></div><div className="invoice-workspace"><form className="invoice-form no-print" onSubmit={(event) => event.preventDefault()}><fieldset><legend>Invoice details</legend><label>Invoice number<input value={invoice.number} onChange={(event) => update('number', event.target.value)} /></label><div className="form-pair"><label>Issue date<input type="date" value={invoice.date} onChange={(event) => update('date', event.target.value)} /></label><label>Due date<input type="date" value={invoice.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></label></div><label>Currency<select value={invoice.currency} onChange={(event) => update('currency', event.target.value)}><option value="NGN">NGN — Nigerian Naira</option><option value="USD">USD — US Dollar</option><option value="GBP">GBP — British Pound</option></select></label></fieldset><fieldset><legend>Bill to</legend><label>Client name<input value={invoice.clientName} onChange={(event) => update('clientName', event.target.value)} placeholder="Client full name" /></label><label>Company<input value={invoice.clientCompany} onChange={(event) => update('clientCompany', event.target.value)} placeholder="Business or organization" /></label><label>Email<input type="email" value={invoice.clientEmail} onChange={(event) => update('clientEmail', event.target.value)} placeholder="client@example.com" /></label><label>Address<textarea value={invoice.clientAddress} onChange={(event) => update('clientAddress', event.target.value)} placeholder="Client billing address" /></label></fieldset><fieldset><legend>Line items</legend>{invoice.items.map((item, index) => <div className="invoice-item-editor" key={item.id}><label>Description<input value={item.description} onChange={(event) => updateItem(item.id, 'description', event.target.value)} /></label><div className="form-pair"><label>Quantity<input type="number" min="0" step="1" value={item.quantity} onChange={(event) => updateItem(item.id, 'quantity', event.target.value)} /></label><label>Rate<input type="number" min="0" step="0.01" value={item.rate} onChange={(event) => updateItem(item.id, 'rate', event.target.value)} /></label></div><button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove item ${index + 1}`}><FiTrash2 /> Remove</button></div>)}<button className="add-line-button" type="button" onClick={addItem}><FiPlus /> Add line item</button></fieldset><fieldset><legend>Totals & terms</legend><div className="form-pair"><label>Tax (%)<input type="number" min="0" step="0.01" value={invoice.tax} onChange={(event) => update('tax', event.target.value)} /></label><label>Discount ({invoice.currency})<input type="number" min="0" step="0.01" value={invoice.discount} onChange={(event) => update('discount', event.target.value)} /></label></div><label>Payment terms<textarea value={invoice.notes} onChange={(event) => update('notes', event.target.value)} /></label></fieldset></form><article className="invoice-preview"><div className="invoice-preview-header"><div><img src={companyLogo} alt="CHILL TECH LTD" /><strong>CHILL TECH LTD</strong><span>Innovate. Build. Empower.</span></div><div><h2>INVOICE</h2><span>#{invoice.number}</span></div></div><div className="invoice-parties"><div><span>From</span><strong>CHILL TECH LTD</strong><p>{profile.officialEmail}<br />{profile.phone}<br />Nigeria</p></div><div><span>Bill to</span><strong>{invoice.clientCompany || invoice.clientName || 'Client / Company'}</strong><p>{invoice.clientCompany && invoice.clientName ? `${invoice.clientName}\n` : ''}{invoice.clientEmail || 'Client email'}<br />{invoice.clientAddress || 'Client billing address'}</p></div><div><span>Invoice dates</span><p>Issued: <strong>{invoice.date || '—'}</strong><br />Due: <strong>{invoice.dueDate || 'On receipt'}</strong></p></div></div><table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>{invoice.items.map((item) => <tr key={item.id}><td>{item.description || 'Service item'}</td><td>{item.quantity || 0}</td><td>{money(Number(item.rate))}</td><td>{money(Number(item.quantity) * Number(item.rate))}</td></tr>)}</tbody></table><div className="invoice-totals"><div className="invoice-total-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="invoice-total-row"><span>Tax ({Number(invoice.tax || 0)}%)</span><strong>{money(taxValue)}</strong></div><div className="invoice-total-row"><span>Discount</span><strong>− {money(Number(invoice.discount))}</strong></div><div className="invoice-total-row grand"><span>Total due</span><strong>{money(total)}</strong></div></div><div className="invoice-terms"><strong>Payment terms</strong><p>{invoice.notes}</p><small>Payment of this invoice confirms acceptance of the stated amount and payment schedule, subject to the approved project scope or agreement.</small></div></article></div></section></PageShell>;
}

export function NotFoundPage() {
  usePageMeta('Page Not Found', 'The requested page could not be found on the CHILL TECH LTD website.', '/404');
  return <PageShell><section className="not-found section-pad"><span>404</span><h1>This page is not part of the system.</h1><p>Return to the CHILL TECH LTD homepage or explore our company projects.</p><div className="button-row"><Link className="button button-primary" to="/">Back Home</Link><Link className="button button-secondary" to="/projects">View Projects</Link></div></section></PageShell>;
}
