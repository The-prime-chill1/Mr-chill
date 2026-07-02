import { useState, Suspense, lazy } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import PassphraseGate from './components/PassphraseGate';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Achievements = lazy(() => import('./components/Achievements'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const CV_URL = '/cv/Lamidi_Abdulhameed_Olawale_CV.pdf';

function SectionFallback() {
  return <div className="floating-card" style={{ minHeight: 200 }} />;
}

export default function App() {
  const [gateOpen, setGateOpen] = useState(false);

  const requestDownload = () => setGateOpen(true);

  const handleVerified = () => {
    setGateOpen(false);
    // Serve the real CV file directly — no in-browser rendering, no room for a blank output.
    const link = document.createElement('a');
    link.href = CV_URL;
    link.download = 'Lamidi_Abdulhameed_Olawale_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Sidebar onDownloadCV={requestDownload} />

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

      <PassphraseGate open={gateOpen} onClose={() => setGateOpen(false)} onVerified={handleVerified} />
    </>
  );
}
