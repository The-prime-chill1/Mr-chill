import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { SiGithub, SiInstagram, SiWhatsapp, SiX } from 'react-icons/si';
import { profile, projects, stats, testimonials } from '../data';
import companyLogo from '../assets/chill-tech-logo.jpeg';
import './PortfolioExperience.css';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    number: '01',
    title: 'Strategy & product direction',
    text: 'Turning business goals into a focused digital roadmap, clear user journeys, and a product people understand instantly.',
    tags: ['Discovery', 'UX direction', 'Product thinking'],
  },
  {
    number: '02',
    title: 'Art direction & interface design',
    text: 'Distinctive visual systems with strong typography, intentional motion, and responsive layouts that feel authored—not assembled.',
    tags: ['UI/UX', 'Design systems', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Creative development',
    text: 'Fast, scalable React experiences enriched with thoughtful micro-interactions, animation, and production-ready engineering.',
    tags: ['React', 'GSAP', 'APIs'],
  },
  {
    number: '04',
    title: 'Launch & long-term growth',
    text: 'Performance, SEO, deployment, analytics, and continued iteration—so the product keeps creating value after launch day.',
    tags: ['Performance', 'SEO', 'Support'],
  },
];

const process = [
  {
    number: '01',
    title: 'Listen deeply',
    text: 'We start with the business, the audience, and the real problem—not a template or a trend.',
    note: 'Discovery / 1–2 days',
  },
  {
    number: '02',
    title: 'Shape the idea',
    text: 'Information architecture, creative direction, and prototypes turn the brief into a clear visual world.',
    note: 'Direction / 3–7 days',
  },
  {
    number: '03',
    title: 'Build with intent',
    text: 'Clean engineering, responsive craft, and motion are developed together—not added as an afterthought.',
    note: 'Development / 1–4 weeks',
  },
  {
    number: '04',
    title: 'Launch. Learn. Refine.',
    text: 'After a careful launch, the data and real-world feedback become the roadmap for the next improvement.',
    note: 'Launch / ongoing',
  },
];

const projectPalette = [
  { color: '#1bc4ff', surface: '#061c35', label: 'Property technology' },
  { color: '#7cc9ff', surface: '#071a38', label: 'Global logistics' },
  { color: '#2f8dff', surface: '#081a32', label: 'Fintech product' },
  { color: '#b9e7ff', surface: '#0a2344', label: 'Commerce platform' },
];

const selectedProjects = [projects[0], projects[1], projects[7], projects[2]].filter(Boolean);

const marqueeItems = [
  'React engineering',
  'Creative development',
  'Digital strategy',
  'Motion systems',
  'UI/UX design',
  'Web applications',
];

function Preloader({ onDone }) {
  const scope = useRef(null);
  const count = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: onDone,
      });

      timeline
        .to(counter, {
          value: 100,
          duration: 1.15,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, '0');
          },
        })
        .to('.ct-loader-progress-fill', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0)
        .to('.ct-loader-word span', { yPercent: -115, duration: 0.55, stagger: 0.045, ease: 'power3.in' }, 1.05)
        .to('.ct-loader-meta', { autoAlpha: 0, y: -10, duration: 0.3 }, 1.08)
        .to('.ct-loader-panel--top', { yPercent: -101, duration: 0.9, ease: 'power4.inOut' }, 1.28)
        .to('.ct-loader-panel--bottom', { yPercent: 101, duration: 0.9, ease: 'power4.inOut' }, 1.28);
    }, scope);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onDone]);

  return (
    <div ref={scope} className="ct-loader" aria-hidden="true">
      <div className="ct-loader-panel ct-loader-panel--top" />
      <div className="ct-loader-panel ct-loader-panel--bottom" />
      <div className="ct-loader-content">
        <div className="ct-loader-word" aria-label="Chill Tech">
          {'CHILLTECH'.split('').map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}
        </div>
        <div className="ct-loader-meta">
          <span>Loading a better internet</span>
          <span ref={count}>000</span>
        </div>
        <div className="ct-loader-progress"><span className="ct-loader-progress-fill" /></div>
      </div>
    </div>
  );
}

function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.42, ease: 'power3' });
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.42, ease: 'power3' });
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2' });
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2' });

    gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50 });

    const onMove = (event) => {
      ringX(event.clientX);
      ringY(event.clientY);
      dotX(event.clientX);
      dotY(event.clientY);
      ring.current?.classList.add('is-visible');
      dot.current?.classList.add('is-visible');
    };
    const onOver = (event) => {
      if (event.target.closest('a, button, [data-cursor="view"]')) ring.current?.classList.add('is-active');
    };
    const onOut = (event) => {
      if (event.target.closest('a, button, [data-cursor="view"]')) ring.current?.classList.remove('is-active');
    };
    const onLeave = () => {
      ring.current?.classList.remove('is-visible');
      dot.current?.classList.remove('is-visible');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <span ref={ring} className="ct-cursor-ring"><span>VIEW</span></span>
      <span ref={dot} className="ct-cursor-dot" />
    </>
  );
}

function ProjectVisual({ project, index }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const palette = projectPalette[index % projectPalette.length];
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&type=jpeg&quality=82&viewport.width=1440&viewport.height=960`;

  return (
    <div className="ct-project-visual" style={{ '--project-color': palette.color, '--project-surface': palette.surface }} data-cursor="view">
      <div className={`ct-project-fallback ${loaded ? 'is-hidden' : ''}`}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{project.title}</strong>
      </div>
      {!failed && (
        <img
          src={screenshotUrl}
          alt={`${project.title} website preview`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={loaded ? 'is-loaded' : ''}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <div className="ct-browser-bar">
        <span /><span /><span />
        <small>{project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}</small>
      </div>
      <div className="ct-project-corner"><FiArrowUpRight /></div>
    </div>
  );
}

function Marquee() {
  const repeated = [...marqueeItems, ...marqueeItems];
  return (
    <div className="ct-marquee" aria-hidden="true">
      <div className="ct-marquee-track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}><i>✦</i>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioExperience() {
  const root = useRef(null);
  const portrait = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [introVisible, setIntroVisible] = useState(() => {
    const skipIntro = new URLSearchParams(window.location.search).has('skip-intro');
    return !skipIntro && sessionStorage.getItem('ct_intro_seen') !== 'true';
  });
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date()));
    };
    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('ct-menu-open', menuOpen);
    return () => document.body.classList.remove('ct-menu-open');
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (introVisible) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.set('.ct-scroll-progress', { transformOrigin: 'left center', scaleX: 0 });
      gsap.to('.ct-scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
      });

      if (reducedMotion) return;

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .from('.ct-nav', { y: -40, autoAlpha: 0, duration: 0.9 })
        .from('.ct-hero-kicker > *', { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.7 }, '-=0.55')
        .from('.ct-hero-line > span', { yPercent: 120, rotate: 3, duration: 1.15, stagger: 0.1 }, '-=0.45')
        .from('.ct-hero-summary, .ct-hero-actions', { y: 28, autoAlpha: 0, duration: 0.75, stagger: 0.1 }, '-=0.75')
        .from('.ct-hero-art', { clipPath: 'inset(100% 0 0 0)', y: 50, duration: 1.25 }, '-=1.15')
        .from('.ct-hero-art .ct-float-label, .ct-availability-stamp', { scale: 0.75, autoAlpha: 0, stagger: 0.1, duration: 0.65 }, '-=0.65');

      gsap.to('.ct-orbit', {
        rotate: 150,
        ease: 'none',
        scrollTrigger: { trigger: '.ct-hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.ct-hero-art', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: '.ct-hero', start: 'top top', end: 'bottom top', scrub: 1 },
      });

      gsap.utils.toArray('.ct-reveal').forEach((element) => {
        gsap.from(element, {
          y: 55,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.from('.ct-manifesto-word', {
        y: 28,
        opacity: 0.1,
        stagger: 0.025,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.ct-manifesto',
          start: 'top 72%',
          end: 'bottom 58%',
          scrub: 0.8,
        },
      });

      document.querySelectorAll('[data-count]').forEach((element) => {
        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || '';
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('.ct-project-card').forEach((card) => {
        gsap.from(card, {
          y: 80,
          autoAlpha: 0,
          scale: 0.97,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 83%', once: true },
        });
      });

      const media = gsap.matchMedia();
      media.add('(min-width: 901px)', () => {
        const track = document.querySelector('.ct-process-track');
        if (!track) return undefined;
        const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const horizontal = gsap.to(track, {
          x: () => -travel(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.ct-process-pin',
            start: 'top top',
            end: () => `+=${travel() + window.innerWidth * 0.35}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => horizontal.kill();
      });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
      return () => {
        window.clearTimeout(refreshTimer);
        media.revert();
      };
    }, root);

    return () => ctx.revert();
  }, [introVisible]);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem('ct_intro_seen', 'true');
    setIntroVisible(false);
  }, []);

  const handlePortraitMove = (event) => {
    if (!portrait.current || !window.matchMedia('(pointer: fine)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    gsap.to(portrait.current, {
      rotateY: x * 8,
      rotateX: y * -8,
      x: x * 14,
      y: y * 10,
      duration: 0.65,
      ease: 'power3.out',
    });
  };

  const resetPortrait = () => {
    if (portrait.current) gsap.to(portrait.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const manifesto = 'We help ambitious businesses turn ideas into reliable digital products—combining strategy, design, software engineering, and long-term support.';

  return (
    <div ref={root} className="ct-experience">
      {introVisible && <Preloader onDone={finishIntro} />}
      <Cursor />
      <span className="ct-scroll-progress" />
      <div className="ct-noise" aria-hidden="true" />

      <header className="ct-nav">
        <a className="ct-brand" href="#top" aria-label="Chill Tech home" onClick={closeMenu}>
          <img className="ct-brand-logo" src={companyLogo} alt="" />
          <span className="ct-brand-copy">Chill Tech Ltd<br />Innovate. Build. Empower.</span>
        </a>

        <nav className="ct-nav-links" aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#work">Case studies</a>
          <a href="#about">About</a>
        </nav>

        <div className="ct-nav-meta">
          <span>Lagos, NG&nbsp; {localTime}</span>
          <a className="ct-nav-cta" href="#contact">Start a project <FiArrowUpRight /></a>
        </div>

        <button className="ct-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      <div className={`ct-mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="ct-mobile-menu-index">Navigation / 2026</div>
        <nav>
          <a href="#services" onClick={closeMenu}><span>01</span> Services</a>
          <a href="#work" onClick={closeMenu}><span>02</span> Case studies</a>
          <a href="#about" onClick={closeMenu}><span>03</span> About us</a>
          <a href="#process" onClick={closeMenu}><span>04</span> Process</a>
          <a href="#contact" onClick={closeMenu}><span>05</span> Contact</a>
        </nav>
        <div className="ct-mobile-menu-bottom">
          <a href={profile.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <span>Lagos / {localTime}</span>
        </div>
      </div>

      <main>
        <section id="top" className="ct-hero">
          <div className="ct-hero-grid" aria-hidden="true" />
          <div className="ct-orbit" aria-hidden="true"><span /><span /><span /></div>

          <div className="ct-hero-copy">
            <div className="ct-hero-kicker">
              <span>Software development & digital solutions</span>
              <span>Nigeria / Serving clients worldwide</span>
            </div>

            <h1 className="ct-hero-title" aria-label="Digital solutions built for growth">
              <span className="ct-hero-line"><span>Digital</span></span>
              <span className="ct-hero-line ct-hero-line--outline"><span>solutions</span></span>
              <span className="ct-hero-line ct-hero-line--serif"><span>built for growth.</span></span>
            </h1>

            <div className="ct-hero-bottom">
              <p className="ct-hero-summary">
                <strong>CHILL TECH LTD</strong> designs and develops fast, scalable websites, business platforms, and custom software that help organizations operate better and grow online.
              </p>
              <div className="ct-hero-actions">
                <a className="ct-button ct-button--acid" href="#work">Explore our work <FiArrowDown /></a>
                <a className="ct-text-button" href="#/quote">Request a project quote <FiArrowUpRight /></a>
              </div>
            </div>
          </div>

          <div className="ct-hero-art" onPointerMove={handlePortraitMove} onPointerLeave={resetPortrait}>
            <div ref={portrait} className="ct-portrait-card ct-company-card">
              <img src={companyLogo} alt="CHILL TECH LTD company logo" />
              <div className="ct-portrait-shade" />
              <div className="ct-portrait-caption">
                <span>CHILL TECH LTD</span>
                <span>Innovate. Build. Empower.</span>
              </div>
            </div>
            <div className="ct-float-label">Nigeria-based<br />Global delivery</div>
            <div className="ct-availability-stamp">
              <span>Now booking new projects · 2026 · </span>
              <i>✦</i>
            </div>
          </div>

          <div className="ct-hero-side-note">Scroll to discover&nbsp; ↓</div>
        </section>

        <div className="ct-signal-bar">
          <span className="ct-live-dot" />
          <span>Available for new projects</span>
          <span className="ct-signal-rule" />
          <span>Web development / Business platforms / Product strategy</span>
          <span>© 2026</span>
        </div>

        <Marquee />

        <section id="about" className="ct-about">
          <div className="ct-section-index ct-reveal">01 / About</div>
          <p className="ct-manifesto">
            {manifesto.split(' ').map((word, index) => (
              <span className="ct-manifesto-word" key={`${word}-${index}`}>{word}{' '}</span>
            ))}
          </p>

          <div className="ct-about-grid">
            <div className="ct-about-intro ct-reveal">
              <p>
                <strong>CHILL TECH LTD</strong> is a digital solutions company helping businesses launch, improve, and scale with practical technology.
              </p>
              <a href="#/about">About the company <FiArrowUpRight /></a>
            </div>

            <div className="ct-about-copy ct-reveal">
              <p>We deliver responsive websites, e-commerce experiences, dashboards, portals, and custom web applications from strategy through deployment.</p>
              <p>Every decision is connected to a business outcome: clearer communication, stronger trust, better conversion, simpler operations, or sustainable growth.</p>
            </div>

            <div className="ct-stats">
              {stats.map((stat) => (
                <div className="ct-stat" key={stat.label}>
                  <strong data-count={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="ct-capabilities">
          <div className="ct-capabilities-heading">
            <div className="ct-section-index ct-reveal">02 / Capabilities</div>
            <div className="ct-heading-lockup ct-reveal">
              <p>One technology partner from the first conversation to launch and support.</p>
              <h2>What we build<br /><em>for businesses.</em></h2>
            </div>
          </div>

          <div className="ct-capability-list">
            {capabilities.map((item) => (
              <article className="ct-capability-row" key={item.number}>
                <span className="ct-capability-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <FiArrowUpRight />
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="ct-work">
          <div className="ct-work-heading">
            <div className="ct-section-index ct-reveal">03 / Selected work</div>
            <div className="ct-work-title ct-reveal">
              <h2>Built to be<br /><span>remembered.</span></h2>
              <p>A curated selection of production products across property, logistics, finance, education, and commerce.</p>
            </div>
          </div>

          <div className="ct-project-list">
            {selectedProjects.map((project, index) => {
              const palette = projectPalette[index % projectPalette.length];
              return (
                <article className="ct-project-card" key={project.title} style={{ '--project-color': palette.color }}>
                  <a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live website`}>
                    <ProjectVisual project={project} index={index} />
                  </a>
                  <div className="ct-project-info">
                    <div className="ct-project-meta">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{palette.label}</span>
                      <span>Live product</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="ct-project-footer">
                      <div>{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
                      <a href={project.link} target="_blank" rel="noreferrer">Visit live site <FiExternalLink /></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="ct-work-archive ct-reveal">
            <span>There’s more in the archive.</span>
            <a href="#/portfolio">View founder portfolio & all {projects.length} projects <FiArrowRight /></a>
          </div>
        </section>

        <section id="process" className="ct-process">
          <div className="ct-process-pin">
            <div className="ct-process-header">
              <div className="ct-section-index">04 / The process</div>
              <h2>From first spark<br /><em>to shipped product.</em></h2>
              <p>A clear, collaborative process keeps ambitious work moving without losing the magic.</p>
            </div>

            <div className="ct-process-track">
              {process.map((step) => (
                <article className="ct-process-card" key={step.number}>
                  <div className="ct-process-card-top"><span>{step.number}</span><i>✦</i></div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <small>{step.note}</small>
                </article>
              ))}
              <div className="ct-process-end">
                <span>Have a project?</span>
                <a href="#contact">Let’s make it real <FiArrowUpRight /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="ct-testimonial">
          <div className="ct-section-index ct-reveal">05 / Client feedback</div>
          <div className="ct-quote-mark" aria-hidden="true">“</div>
          <blockquote className="ct-reveal">{testimonials[1]?.quote}</blockquote>
          <div className="ct-quote-author ct-reveal">
            <span>{testimonials[1]?.name}</span>
            <span>{testimonials[1]?.role}</span>
          </div>
          <div className="ct-testimonial-note">Professional delivery. Clear communication. Measurable progress.</div>
        </section>

        <section id="contact" className="ct-contact">
          <div className="ct-contact-top">
            <div className="ct-section-index">06 / Contact</div>
            <span>Have an idea worth building?</span>
          </div>

          <div className="ct-contact-title">
            <h2>Let’s make<br /><em>something</em> matter.</h2>
            <a className="ct-contact-orb" href={`mailto:${profile.email}`} aria-label="Start a project by email">
              <span>Start a project</span>
              <FiArrowUpRight />
            </a>
          </div>

          <div className="ct-contact-details">
            <div>
              <span>New business</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button type="button" onClick={copyEmail}>{copied ? <FiCheck /> : <FiCopy />} {copied ? 'Copied' : 'Copy email'}</button>
            </div>
            <div>
              <span>Prefer a quick chat?</span>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp / {profile.phone}</a>
            </div>
            <div>
              <span>Location</span>
              <p>Lagos, Nigeria<br />Available worldwide</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="ct-footer">
        <div className="ct-footer-brand">
          <img className="ct-footer-logo" src={companyLogo} alt="CHILL TECH LTD" />
          <p>Strategy, design, and software engineering for ambitious organizations.</p>
        </div>
        <div className="ct-footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer"><SiGithub /> GitHub</a>
          <a href={profile.instagram} target="_blank" rel="noreferrer"><SiInstagram /> Instagram</a>
          <a href={profile.twitter} target="_blank" rel="noreferrer"><SiX /> X / Twitter</a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer"><SiWhatsapp /> WhatsApp</a>
        </div>
        <div className="ct-footer-bottom">
          <span>© {new Date().getFullYear()} CHILL TECH LTD</span>
          <span>Designed & developed with intention</span>
          <a href="#top">Back to top <FiArrowUpRight /></a>
        </div>
      </footer>
    </div>
  );
}
