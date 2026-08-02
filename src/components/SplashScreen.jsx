import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import './SplashScreen.css';

/**
 * Awwwards-Quality Cinematic Intro Splash Screen
 * Apple / Tesla / Vercel / OpenAI inspired operating system launch experience for CHILL TECH LTD.
 */
export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING DIGITAL OS...');
  const [isExiting, setIsExiting] = useState(false);
  const [logoSize, setLogoSize] = useState(52);
  const canvasRef = useRef(null);

  // Responsive logo sizing
  useEffect(() => {
    const updateLogoSize = () => {
      const w = window.innerWidth;
      if (w <= 360) setLogoSize(32);
      else if (w <= 480) setLogoSize(38);
      else if (w <= 640) setLogoSize(44);
      else setLogoSize(52);
    };
    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  // 1. 60 FPS High-Speed Cinematic Progress Engine
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const duration = 3200; // 3.2 seconds duration
    const startTime = performance.now();
    let animationFrameId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);

      // Smooth cubic ease-out calculation for progress
      const easedProgress = Math.round(100 * (1 - Math.pow(1 - rawProgress / 100, 3)));
      setProgress(easedProgress);

      // Dynamic OS status text based on progress stage
      if (easedProgress < 25) {
        setStatusText('INITIALIZING DIGITAL CORE...');
      } else if (easedProgress < 55) {
        setStatusText('PREPARING DIGITAL INNOVATION...');
      } else if (easedProgress < 85) {
        setStatusText('CALIBRATING HIGH-PERFORMANCE SUITE...');
      } else if (easedProgress < 100) {
        setStatusText('FINALIZING SYSTEM REVEAL...');
      } else {
        setStatusText('WELCOME TO CHILL TECH');
      }

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          triggerExit();
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 2. High-Performance Particle Canvas Engine (GPU Accelerated)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle pool
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.6,
      speedY: -(Math.random() * 0.8 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 194, 255, ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00c2ff';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  const taglineText = "BUILDING THE FUTURE, ONE PIXEL AT A TIME";
  const taglineLetters = taglineText.split("");

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="splash-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Skip Intro Button */}
          <button
            onClick={triggerExit}
            className="splash-skip-btn"
            aria-label="Skip Intro"
          >
            Skip Intro
          </button>

          {/* Canvas Floating Particle Layer */}
          <canvas ref={canvasRef} className="splash-canvas" />

          {/* Futuristic Cyber Grid */}
          <div className="splash-grid-bg" />

          {/* Central Energy Shockwave Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 3.5], opacity: [0, 0.8, 0] }}
            transition={{ duration: 2.2, times: [0, 0.4, 1], ease: 'easeOut', repeat: Infinity, repeatDelay: 1.5 }}
            className="splash-energy-ring"
          />

          {/* Center Radial Ambient Blue Bloom */}
          <div className="splash-radial-glow" />

          {/* Lens Flare Light Beam */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.7, 0.3], scaleX: [0, 1.2, 1] }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="splash-lens-flare"
          />

          {/* Main Cinematic Content Card */}
          <div className="splash-content">
            {/* Logo Container with Particle Lock Reveal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)', y: 20 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="splash-logo-box"
            >
              {/* Laser Neon Light Sweep */}
              <div className="splash-light-sweep" />

              {/* Official CHILL TECH Logo Mark */}
              <Logo size={logoSize} withWordmark={true} withMotto={true} />
            </motion.div>

            {/* Tagline Blur & Staggered Letter Reveal */}
            <motion.div className="splash-tagline-wrap">
              {taglineLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.5,
                    delay: 1.0 + index * 0.025,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Premium Loading Progress Bar & Operating Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="splash-loading-section"
            >
              {/* Glowing Laser Progress Line */}
              <div className="splash-progress-track">
                <div
                  className="splash-progress-fill"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="splash-progress-head"
                  style={{ left: `${progress}%` }}
                />
              </div>

              {/* Operating System Status & Percentage */}
              <div className="splash-status-row">
                <span className="splash-status-dot" />
                <span className="splash-loading-text">{statusText}</span>
                <span className="splash-percentage">{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
