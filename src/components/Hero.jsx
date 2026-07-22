import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StarBorder from './reactbits/StarBorder';
import { profile } from '../data';
import headshot from '../assets/lamidi-headshot.jpg';

function useTypewriter(text, speed = 45, startDelay = 0) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0;
    let timeout;
    const start = setTimeout(() => {
      const tick = () => {
        i++;
        setDisplay(text.slice(0, i));
        if (i < text.length) timeout = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return display;
}

export default function Hero({ onDownloadCV }) {
  const role = useTypewriter('General Manager & Web Developer', 35, 900);

  return (
    <section id="top" className="floating-card" style={{ paddingTop: 6 }}>
      {/* ambient glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(47,141,255,0.16), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '76px 24px 64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Stylized duotone avatar — deliberately not a plain, fully-revealed photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', width: 130, height: 130, marginBottom: 28 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, var(--electric-blue), var(--cyan), var(--purple), var(--electric-blue))',
              filter: 'blur(2px)',
              animation: 'spin-ring 6s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 4,
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#0c1222',
            }}
          >
            <img
              src={headshot}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 12%',
                filter: 'grayscale(1) contrast(1.15) brightness(0.85)',
                mixBlendMode: 'luminosity',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(160deg, rgba(47,141,255,0.55), rgba(34,211,238,0.35) 55%, rgba(91,110,232,0.5))',
                mixBlendMode: 'color',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 30%, transparent 40%, rgba(6,10,20,0.55) 100%)',
              }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.9rem, 4vw, 2.7rem)' }}
        >
          Hi, I'm <span className="gradient-text">MR CHILL</span>
        </motion.h1>

        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--cyan)',
            marginTop: 8,
            minHeight: '1.6em',
          }}
        >
          {role}
          <span className="type-cursor">|</span>
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          style={{ color: 'var(--text-dim)', maxWidth: 520, marginTop: 18, lineHeight: 1.65, fontSize: '0.95rem' }}
        >
          I manage multi-million naira property portfolios at CHIL Investment Ltd, and build
          full-stack web applications through CHILL TECH LTD — bridging business leadership with
          digital innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <StarBorder as="a" href="#portfolio" color="#2f8dff" speed="4.5s" thickness={1.5}>
            View My Work
          </StarBorder>
          <button onClick={onDownloadCV} className="btn btn-ghost">
            Download CV
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin-ring { to { transform: rotate(360deg); } }
        .type-cursor { animation: blink 1s step-end infinite; color: var(--electric-blue); }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
