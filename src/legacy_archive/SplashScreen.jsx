import { useState, useEffect } from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Logo from './Logo';
import './SplashScreen.css';

/**
 * Clean, Static Light Brand Splash Screen (No Animations)
 */
export default function SplashScreen({ onComplete }) {
  const [logoSize, setLogoSize] = useState(64);

  // Responsive logo sizing
  useEffect(() => {
    const updateLogoSize = () => {
      const w = window.innerWidth;
      if (w <= 360) setLogoSize(40);
      else if (w <= 480) setLogoSize(48);
      else if (w <= 640) setLogoSize(56);
      else setLogoSize(64);
    };
    updateLogoSize();
    window.addEventListener('resize', updateLogoSize);
    return () => window.removeEventListener('resize', updateLogoSize);
  }, []);

  // Lock body scroll while splash is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleEnterSite = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="splash-container">
      {/* Light Grid Backdrop */}
      <div className="splash-grid-bg" />

      {/* Main Content Card */}
      <div className="splash-content">
        
        {/* Status Pill */}
        <div className="splash-status-pill">
          <span className="splash-pill-dot" />
          <span>CHILL TECH OS · ONLINE</span>
        </div>

        {/* Official Logo Box */}
        <div className="splash-logo-box">
          <Logo size={logoSize} withWordmark={true} withMotto={true} />
        </div>

        {/* Sub-headline */}
        <div className="splash-text-group">
          <h2 className="splash-title">
            Digital Engineering <span className="splash-accent">&amp; Innovation</span>
          </h2>
          <p className="splash-subtitle">
            Bridging Software Engineering with Strategic Business Solutions
          </p>
        </div>

        {/* Feature Pills */}
        <div className="splash-features-row">
          <div className="splash-feature-chip">
            <FiCheckCircle className="chip-icon" /> Web Development
          </div>
          <div className="splash-feature-chip">
            <FiCheckCircle className="chip-icon" /> Real Estate Tech
          </div>
          <div className="splash-feature-chip">
            <FiCheckCircle className="chip-icon" /> E-Commerce Solutions
          </div>
        </div>

        {/* Enter Site Call To Action Button */}
        <div style={{ marginTop: 32 }}>
          <button
            onClick={handleEnterSite}
            className="splash-enter-btn"
            aria-label="Enter Portfolio Site"
          >
            <span>ENTER PORTFOLIO</span>
            <FiArrowRight className="enter-btn-arrow" />
          </button>
        </div>

      </div>
    </div>
  );
}
