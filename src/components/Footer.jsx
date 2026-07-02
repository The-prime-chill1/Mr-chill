import { profile } from '../data';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="floating-card" style={{ padding: '28px 0' }}>
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}
      >
        <Logo size={28} />
        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
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
    </footer>
  );
}
