import { profile } from '../data';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="floating-card" style={{ padding: '28px 0' }}>
      <div className="container footer-grid">
        <Logo size={28} />
        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} CHILL TECH LTD. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href={profile.github} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            GitHub
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            WhatsApp
          </a>
          <a href={`mailto:${profile.email}`} style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Email
          </a>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            text-align: center;
            gap: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
