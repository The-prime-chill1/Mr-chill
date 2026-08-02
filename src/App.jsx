import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PassphraseGate from './components/PassphraseGate';
import SplashScreen from './components/SplashScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQPage from './components/FAQPage';
import QuotePage from './components/QuotePage';
import WorkWithMe from './components/WorkWithMe';

const About       = lazy(() => import('./components/About'));
const Experience  = lazy(() => import('./components/Experience'));
const Skills      = lazy(() => import('./components/Skills'));
const Achievements = lazy(() => import('./components/Achievements'));
const Portfolio   = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ          = lazy(() => import('./components/FAQ'));
const Contact     = lazy(() => import('./components/Contact'));
const Footer      = lazy(() => import('./components/Footer'));

const CV_URL = '/cv/Lamidi_Abdulhameed_Olawale_CV.pdf';

function SectionFallback() {
  return <div className="floating-card" style={{ minHeight: 200 }} />;
}

/** Minimal hash-based router — no extra dependencies required */
function useHashRoute() {
  const getHash = () => window.location.hash.replace('#', '') || '/';
  const [route, setRoute] = useState(getHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return route;
}

export default function App() {
  const route = useHashRoute();
  const [showSplash, setShowSplash] = useState(true);
  const [gateOpen, setGateOpen]     = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('chill_tech_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    // Only show splash screen once per session (skip on privacy page)
    const hasSeenSplash = sessionStorage.getItem('chill_tech_splash_seen');
    if (hasSeenSplash === 'true' || route === '/privacy') {
      setShowSplash(false);
    }
  }, [route]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('chill_tech_splash_seen', 'true');
  };

  const requestDownload = () => setGateOpen(true);

  const handleVerified = () => {
    setGateOpen(false);
    const link = document.createElement('a');
    link.href = CV_URL;
    link.download = 'Lamidi_Abdulhameed_Olawale_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ── Privacy Policy page (standalone, no sidebar/splash) ──
  if (route === '/privacy') {
    return <PrivacyPolicy />;
  }

  // ── FAQ page (standalone, no sidebar/splash) ──
  if (route === '/faq') {
    return <FAQPage />;
  }

  // ── Quote page (standalone, no sidebar/splash) ──
  if (route === '/quote') {
    return <QuotePage />;
  }

  // ── Work With Me page (standalone, no sidebar/splash) ──
  if (route === '/work-with-me') {
    return <WorkWithMe />;
  }

  // ── Main Portfolio ──
  return (
    <>
      {/* Full-screen Intro Splash */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Sidebar lives OUTSIDE the motion.div so position:fixed works correctly.
          CSS rule: any ancestor with a transform creates a new containing block,
          breaking fixed positioning. The motion.div has scale/y transforms. */}
      <Sidebar onDownloadCV={requestDownload} />

      {/* Homepage — fades & glides up once splash exits */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 25 : 0, scale: showSplash ? 0.98 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <main className="page-shell">
          <Hero onDownloadCV={requestDownload} />

          <Suspense fallback={<SectionFallback />}>
            <About />
            <Experience />
            <Skills />
            <Achievements />
            <Portfolio />
            <Testimonials />
            <Contact />
            <Footer />
          </Suspense>
        </main>

        <PassphraseGate
          open={gateOpen}
          onClose={() => setGateOpen(false)}
          onVerified={handleVerified}
        />
      </motion.div>
    </>
  );
}
