import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft, FiSun, FiMoon, FiSend, FiCheckCircle,
  FiZap, FiShoppingCart, FiHome, FiBarChart2, FiBook,
  FiTruck, FiSmartphone, FiLayers, FiClock, FiDollarSign,
  FiUser, FiMail, FiPhone, FiMessageSquare, FiChevronRight,
} from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import Logo from './Logo';
import { profile } from '../data';

/* ════════════════════════════════════════
   PRICING DATA
   ════════════════════════════════════════ */
const PROJECT_TYPES = [
  { id: 'ecommerce',  label: 'E-Commerce Store',        Icon: FiShoppingCart, base: 150000, color: '#00c2ff', desc: 'Online shop with product listings, cart & checkout' },
  { id: 'realestate', label: 'Real Estate Portal',       Icon: FiHome,         base: 200000, color: '#818cf8', desc: 'Property showcase, investment tools & client portal' },
  { id: 'business',  label: 'Business / Brand Site',     Icon: FiBarChart2,    base: 80000,  color: '#22c55e', desc: 'Corporate website, landing page or portfolio' },
  { id: 'education', label: 'Education Platform',         Icon: FiBook,         base: 180000, color: '#f59e0b', desc: 'LMS, course portal or registration platform' },
  { id: 'logistics', label: 'Logistics / Tracking App',  Icon: FiTruck,        base: 220000, color: '#f472b6', desc: 'Shipment tracking, route management, dashboard' },
  { id: 'mobile',    label: 'Mobile App (PWA)',           Icon: FiSmartphone,   base: 250000, color: '#fb923c', desc: 'Cross-platform progressive web app' },
  { id: 'saas',      label: 'SaaS / Web Platform',       Icon: FiLayers,       base: 350000, color: '#22d3ee', desc: 'Multi-user platform with dashboards & auth' },
  { id: 'other',     label: 'Something Else',             Icon: FiZap,          base: 70000,  color: '#a78bfa', desc: 'Tell us what you need — we build anything' },
];

const FEATURES = [
  { id: 'auth',       label: 'User Auth & Login',       cost: 30000,  Icon: FiUser },
  { id: 'dashboard',  label: 'Admin Dashboard',          cost: 50000,  Icon: FiBarChart2 },
  { id: 'payment',    label: 'Payment Integration',      cost: 40000,  Icon: FiDollarSign },
  { id: 'chat',       label: 'Live Chat / WhatsApp CTA', cost: 15000,  Icon: FiMessageSquare },
  { id: 'email',      label: 'Email Notifications',      cost: 20000,  Icon: FiMail },
  { id: 'mobile_opt', label: 'Mobile-First Design',      cost: 25000,  Icon: FiSmartphone },
  { id: 'seo',        label: 'SEO Optimisation',         cost: 20000,  Icon: FiZap },
  { id: 'cms',        label: 'Content Management (CMS)', cost: 45000,  Icon: FiLayers },
  { id: 'analytics',  label: 'Analytics & Tracking',     cost: 18000,  Icon: FiBarChart2 },
  { id: 'api',        label: 'Third-Party API Integration', cost: 35000, Icon: FiZap },
];

const TIMELINES = [
  { id: 'rush',     label: 'Rush (1–2 weeks)',     multiplier: 1.5,  Icon: FiZap,   color: '#ef4444', note: '+50% rush fee' },
  { id: 'normal',   label: 'Standard (3–4 weeks)', multiplier: 1.0,  Icon: FiClock, color: '#22c55e', note: 'Recommended' },
  { id: 'relaxed',  label: 'Flexible (5–8 weeks)', multiplier: 0.9,  Icon: FiClock, color: '#818cf8', note: '10% discount' },
];

const PAGES_OPTIONS = [
  { id: '1-3',  label: '1–3 pages',   cost: 0 },
  { id: '4-7',  label: '4–7 pages',   cost: 30000 },
  { id: '8-15', label: '8–15 pages',  cost: 70000 },
  { id: '15+',  label: '15+ pages',   cost: 130000 },
];

const STEPS = ['Project Type', 'Features', 'Timeline & Scale', 'Your Details'];

/* ════════════════════════════════════════
   FORMATTERS
   ════════════════════════════════════════ */
const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

function useEstimate(type, features, timeline, pages) {
  return useMemo(() => {
    const base = type?.base ?? 0;
    const featCost = features.reduce((sum, id) => {
      const f = FEATURES.find(f => f.id === id);
      return sum + (f?.cost ?? 0);
    }, 0);
    const pagesCost = PAGES_OPTIONS.find(p => p.id === pages)?.cost ?? 0;
    const multiplier = TIMELINES.find(t => t.id === timeline)?.multiplier ?? 1;
    const subtotal = (base + featCost + pagesCost) * multiplier;
    const low  = subtotal * 0.9;
    const high = subtotal * 1.15;
    return { low, high, subtotal };
  }, [type, features, timeline, pages]);
}

/* ════════════════════════════════════════
   STEP INDICATOR
   ════════════════════════════════════════ */
function StepBar({ step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 40 }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.88rem',
              background: i < step ? '#00c2ff' : i === step ? 'linear-gradient(135deg,#00c2ff,#818cf8)' : 'var(--bg-card)',
              color: i <= step ? '#000' : 'var(--text-dim)',
              border: i === step ? 'none' : '2px solid var(--panel-border)',
              boxShadow: i === step ? '0 0 16px rgba(0,194,255,0.5)' : 'none',
              transition: 'all 0.3s',
            }}>
              {i < step ? <FiCheckCircle style={{ fontSize: '1rem' }} /> : i + 1}
            </div>
            <span style={{
              fontSize: '0.68rem', fontWeight: i === step ? 700 : 500,
              color: i === step ? 'var(--electric-blue)' : 'var(--text-dim)',
              whiteSpace: 'nowrap', letterSpacing: '0.02em',
            }}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width: 48, height: 2, margin: '0 4px', marginBottom: 20,
              background: i < step ? '#00c2ff' : 'var(--panel-border)',
              borderRadius: 999, transition: 'background 0.3s',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   LIVE PRICE SIDEBAR
   ════════════════════════════════════════ */
function PriceSidebar({ type, features, timeline, pages }) {
  const { low, high } = useEstimate(type, features, timeline, pages);
  const tl = TIMELINES.find(t => t.id === timeline);
  const pg = PAGES_OPTIONS.find(p => p.id === pages);

  return (
    <div style={{
      position: 'sticky', top: 100,
      background: 'var(--bg-card)',
      border: '1px solid rgba(0,194,255,0.2)',
      borderRadius: 20, padding: 24,
      minWidth: 220,
    }}>
      {/* Top accent */}
      <div style={{
        height: 2, borderRadius: 999, marginBottom: 20,
        background: 'linear-gradient(90deg, #00c2ff, #818cf8)',
      }} />

      <div style={{ fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>
        Live Estimate
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 900,
        fontSize: '1.6rem', lineHeight: 1.1,
        background: 'linear-gradient(135deg, #00c2ff, #818cf8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 4,
      }}>
        {type ? `${fmt(low)} – ${fmt(high)}` : '₦0'}
      </div>
      {type && <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', marginBottom: 20 }}>Estimated range (excl. hosting)</div>}

      {/* Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, borderTop: '1px solid var(--panel-border)', paddingTop: 16 }}>
        {type && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Base ({type.label})</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{fmt(type.base)}</span>
          </div>
        )}
        {features.map(id => {
          const f = FEATURES.find(f => f.id === id);
          return f ? (
            <div key={id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>{f.label}</span>
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>+{fmt(f.cost)}</span>
            </div>
          ) : null;
        })}
        {pg && pg.cost > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>{pg.label}</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>+{fmt(pg.cost)}</span>
          </div>
        )}
        {tl && tl.multiplier !== 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>{tl.label}</span>
            <span style={{ color: tl.multiplier > 1 ? '#ef4444' : '#22c55e', fontWeight: 600 }}>
              {tl.multiplier > 1 ? `+${Math.round((tl.multiplier - 1) * 100)}%` : `-${Math.round((1 - tl.multiplier) * 100)}%`}
            </span>
          </div>
        )}
      </div>

      <div style={{
        marginTop: 16, padding: '10px 12px', borderRadius: 10,
        background: 'rgba(0,194,255,0.06)', border: '1px solid rgba(0,194,255,0.15)',
        fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5,
      }}>
        💡 Final pricing confirmed after a free consultation call.
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════ */
export default function QuotePage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('chill_tech_theme') || 'light');
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('chill_tech_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const [step, setStep]         = useState(0);
  const [type, setType]         = useState(null);
  const [features, setFeatures] = useState([]);
  const [timeline, setTimeline] = useState('normal');
  const [pages, setPages]       = useState('1-3');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', phone: '', notes: '' });

  const { low, high } = useEstimate(type, features, timeline, pages);

  const toggleFeature = (id) => setFeatures(prev =>
    prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const featureList = features.map(id => FEATURES.find(f => f.id === id)?.label).join(', ') || 'None';
    const tl = TIMELINES.find(t => t.id === timeline)?.label ?? '';
    const pg = PAGES_OPTIONS.find(p => p.id === pages)?.label ?? '';
    const text = [
      `*Project Estimate Request — CHILL TECH LTD*`,
      ``,
      `*Client:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Phone:* ${form.phone || 'Not provided'}`,
      ``,
      `*Project Type:* ${type?.label ?? 'Not selected'}`,
      `*Features:* ${featureList}`,
      `*No. of Pages:* ${pg}`,
      `*Timeline:* ${tl}`,
      ``,
      `*Estimated Budget Range:* ${fmt(low)} – ${fmt(high)}`,
      ``,
      `*Additional Notes:*`,
      form.notes || 'None',
    ].join('\n');
    window.open(`${profile.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  /* ── Step Panels ── */
  const stepContent = [

    /* STEP 0: Project Type */
    <div key="type">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
        What type of project do you need?
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 28 }}>
        Select the category that best describes your project.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
        {PROJECT_TYPES.map(({ id, label, Icon, base, color, desc }) => {
          const active = type?.id === id;
          return (
            <button key={id} onClick={() => setType({ id, label, base, color })}
              style={{
                padding: '18px 16px', borderRadius: 16, textAlign: 'left', cursor: 'pointer',
                border: `2px solid ${active ? color : 'var(--panel-border)'}`,
                background: active ? `${color}12` : 'var(--bg-card)',
                boxShadow: active ? `0 0 20px ${color}30` : 'none',
                transition: 'all 0.22s',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = `${color}88`; e.currentTarget.style.background = `${color}08`; }}}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = 'var(--panel-border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${color}18`, border: `1px solid ${color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color, fontSize: '1.15rem',
              }}>
                <Icon />
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>{label}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{desc}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color }}>From {fmt(base)}</div>
            </button>
          );
        })}
      </div>
    </div>,

    /* STEP 1: Features */
    <div key="features">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
        Which features do you need?
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 28 }}>
        Select all that apply — each adds to the estimate.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 12 }}>
        {FEATURES.map(({ id, label, cost, Icon }) => {
          const active = features.includes(id);
          return (
            <button key={id} onClick={() => toggleFeature(id)}
              style={{
                padding: '14px 16px', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                border: `2px solid ${active ? '#00c2ff' : 'var(--panel-border)'}`,
                background: active ? 'rgba(0,194,255,0.1)' : 'var(--bg-card)',
                boxShadow: active ? '0 0 14px rgba(0,194,255,0.2)' : 'none',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: active ? 'rgba(0,194,255,0.18)' : 'var(--bg-card-hover)',
                border: `1px solid ${active ? 'rgba(0,194,255,0.4)' : 'var(--panel-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: active ? '#00c2ff' : 'var(--text-dim)', fontSize: '1rem',
                transition: 'all 0.2s',
              }}>
                {active ? <FiCheckCircle /> : <Icon />}
              </div>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text)' }}>{label}</div>
                <div style={{ fontSize: '0.74rem', color: active ? '#00c2ff' : 'var(--text-dim)', fontWeight: 600, marginTop: 2 }}>+{fmt(cost)}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>,

    /* STEP 2: Timeline & Pages */
    <div key="timeline">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
        Timeline & Project Scale
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 28 }}>
        Choose your preferred delivery speed and size.
      </p>

      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
          Delivery Timeline
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {TIMELINES.map(({ id, label, multiplier, Icon, color, note }) => {
            const active = timeline === id;
            return (
              <button key={id} onClick={() => setTimeline(id)}
                style={{
                  padding: '16px 20px', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                  border: `2px solid ${active ? color : 'var(--panel-border)'}`,
                  background: active ? `${color}12` : 'var(--bg-card)',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon style={{ color, fontSize: '1.1rem' }} />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color, fontWeight: 600, marginTop: 2 }}>{note}</div>
                  </div>
                </div>
                {active && <FiCheckCircle style={{ color, fontSize: '1.1rem' }} />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
          Number of Pages / Screens
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {PAGES_OPTIONS.map(({ id, label, cost }) => {
            const active = pages === id;
            return (
              <button key={id} onClick={() => setPages(id)}
                style={{
                  padding: '14px 18px', borderRadius: 12, cursor: 'pointer',
                  border: `2px solid ${active ? '#818cf8' : 'var(--panel-border)'}`,
                  background: active ? 'rgba(129,140,248,0.1)' : 'var(--bg-card)',
                  transition: 'all 0.2s',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>{label}</span>
                <span style={{ fontSize: '0.76rem', color: active ? '#818cf8' : 'var(--text-dim)', fontWeight: 600 }}>
                  {cost === 0 ? 'Included' : `+${fmt(cost)}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,

    /* STEP 3: Details & Submit */
    <div key="details">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
        Your Details
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginBottom: 28 }}>
        We'll send the full proposal via WhatsApp with your estimate.
      </p>

      {/* Estimate summary box */}
      <div style={{
        padding: '18px 20px', borderRadius: 16, marginBottom: 28,
        background: 'linear-gradient(135deg, rgba(0,194,255,0.08), rgba(129,140,248,0.08))',
        border: '1px solid rgba(0,194,255,0.22)',
      }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Your Estimate Summary</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.8rem',
          background: 'linear-gradient(135deg, #00c2ff, #818cf8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4,
        }}>
          {type ? `${fmt(low)} – ${fmt(high)}` : '₦0'}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          {type?.label ?? 'No type selected'} · {features.length} feature{features.length !== 1 ? 's' : ''} · {TIMELINES.find(t => t.id === timeline)?.label}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { name: 'name',  placeholder: 'Your Full Name',     icon: FiUser,  type: 'text',  required: true },
          { name: 'email', placeholder: 'Your Email Address', icon: FiMail,  type: 'email', required: true },
          { name: 'phone', placeholder: 'WhatsApp / Phone',   icon: FiPhone, type: 'text',  required: false },
        ].map(({ name, placeholder, icon: Icon, type: inputType, required }) => (
          <div key={name} style={{ position: 'relative' }}>
            <Icon style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-dim)', fontSize: '1rem',
            }} />
            <input
              type={inputType} name={name} placeholder={placeholder}
              value={form[name]} required={required}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
              style={{
                width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
                border: '1px solid var(--panel-border)',
                background: 'var(--bg-card-hover)', color: 'var(--text)',
                fontSize: '0.93rem', outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(0,194,255,0.5)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--panel-border)'; }}
            />
          </div>
        ))}
        <div style={{ position: 'relative' }}>
          <FiMessageSquare style={{
            position: 'absolute', left: 14, top: 14,
            color: 'var(--text-dim)', fontSize: '1rem',
          }} />
          <textarea
            name="notes" placeholder="Any extra details about your project..."
            rows={4} value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={{
              width: '100%', padding: '12px 14px 12px 42px', borderRadius: 12,
              border: '1px solid var(--panel-border)',
              background: 'var(--bg-card-hover)', color: 'var(--text)',
              fontSize: '0.93rem', resize: 'vertical', outline: 'none',
              boxSizing: 'border-box', transition: 'border-color 0.2s',
              fontFamily: 'var(--font-body)',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(0,194,255,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--panel-border)'; }}
          />
        </div>

        <button type="submit"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '14px 32px', borderRadius: 999,
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            color: '#fff', fontWeight: 800, fontSize: '1rem',
            border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(37,211,102,0.35)',
            transition: 'opacity 0.2s', marginTop: 4,
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <SiWhatsapp style={{ fontSize: '1.15rem' }} />
          Send Estimate via WhatsApp
        </button>
      </form>
    </div>,
  ];

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-dark)', padding: 24, textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}
          style={{
            background: 'var(--bg-card)', border: '1px solid rgba(0,194,255,0.2)',
            borderRadius: 28, padding: 'clamp(40px,6vw,60px)', maxWidth: 480,
          }}
        >
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(37,211,102,0.12)', border: '2px solid rgba(37,211,102,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: '1.8rem', color: '#22c55e',
          }}>
            <FiCheckCircle />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>
            Quote Sent! 🎉
          </h2>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}>
            Your project estimate has been sent via WhatsApp. Lamidi will reply within <strong style={{ color: 'var(--electric-blue)' }}>24 hours</strong> with a full proposal.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 999,
              background: 'linear-gradient(135deg,#00c2ff,#0080ff)',
              color: '#000', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
            }}>
              <FiArrowLeft /> Back to Portfolio
            </a>
            <button onClick={() => { setSubmitted(false); setStep(0); setType(null); setFeatures([]); }}
              style={{
                padding: '12px 24px', borderRadius: 999,
                border: '1px solid var(--panel-border)', background: 'transparent',
                color: 'var(--text-dim)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              }}>
              New Estimate
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>

      {/* ── Sticky Navbar ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, padding: '14px 24px' }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          background: theme === 'dark' ? 'rgba(10,15,26,0.85)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--panel-border)',
          borderRadius: 999, padding: '10px 10px 10px 18px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '2px solid rgba(0,194,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <Logo width={34} style={{ borderRadius: '50%' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>
              Chill<span style={{ color: 'var(--electric-blue)' }}>Tech</span>
            </span>
          </a>

          <div style={{
            fontSize: '0.77rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text-dim)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <FiDollarSign style={{ color: 'var(--electric-blue)' }} />
            Project Estimator
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={toggleTheme} aria-label="Toggle theme"
              style={{
                width: 36, height: 36, borderRadius: '50%',
                border: '1px solid var(--panel-border)', background: 'var(--bg-card)',
                color: theme === 'dark' ? '#f59e0b' : '#3b82f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: '1rem', flexShrink: 0, transition: 'all 0.2s',
              }}>
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
            <a href="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-dim)',
                textDecoration: 'none', padding: '8px 16px', borderRadius: 999,
                border: '1px solid var(--panel-border)', background: 'var(--bg-card)',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00c2ff'; e.currentTarget.style.borderColor = 'rgba(0,194,255,0.4)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--panel-border)'; }}
            >
              <FiArrowLeft /> Portfolio
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div style={{
        textAlign: 'center', padding: 'clamp(36px,6vw,60px) 24px 20px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(0,194,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--electric-blue)',
            padding: '5px 16px', borderRadius: 999,
            background: 'rgba(0,194,255,0.1)', border: '1px solid rgba(0,194,255,0.28)',
            marginBottom: 18,
          }}>
            <FiDollarSign /> Project Cost Estimator
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1.12,
            fontSize: 'clamp(1.8rem,5vw,3rem)', color: 'var(--text)', marginBottom: 14,
          }}>
            Get an Instant{' '}
            <span style={{
              background: 'linear-gradient(135deg,#00c2ff,#818cf8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Project Estimate
            </span>
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.97rem', maxWidth: 520, margin: '0 auto' }}>
            Answer 4 quick questions and get a real-time price estimate for your web project — then send it straight to WhatsApp.
          </p>
        </motion.div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(20px,4vw,40px) 24px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 240px',
        gap: 28, alignItems: 'start',
      }} className="estimator-layout">

        {/* Left: Steps */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--panel-border)',
          borderRadius: 24, padding: 'clamp(24px,4vw,36px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}>
          <StepBar step={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {stepContent[step]}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--panel-border)',
            gap: 12,
          }}>
            <button
              onClick={() => setStep(s => s - 1)} disabled={step === 0}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '11px 22px', borderRadius: 999, cursor: step === 0 ? 'not-allowed' : 'pointer',
                border: '1px solid var(--panel-border)', background: 'transparent',
                color: step === 0 ? 'var(--text-dim)' : 'var(--text)',
                fontWeight: 600, fontSize: '0.88rem', opacity: step === 0 ? 0.4 : 1,
                transition: 'all 0.2s', fontFamily: 'var(--font-body)',
              }}
            >
              <FiArrowLeft /> Back
            </button>

            <div style={{ display: 'flex', gap: 6 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{
                  width: i === step ? 20 : 7, height: 7, borderRadius: 999,
                  background: i === step ? '#00c2ff' : 'var(--panel-border)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={step === 0 && !type}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '11px 24px', borderRadius: 999, cursor: (step === 0 && !type) ? 'not-allowed' : 'pointer',
                  background: (step === 0 && !type) ? 'var(--bg-card-hover)' : 'linear-gradient(135deg,#00c2ff,#0080ff)',
                  color: (step === 0 && !type) ? 'var(--text-dim)' : '#000',
                  border: 'none', fontWeight: 700, fontSize: '0.88rem',
                  opacity: (step === 0 && !type) ? 0.5 : 1,
                  boxShadow: (step === 0 && !type) ? 'none' : '0 6px 20px rgba(0,194,255,0.3)',
                  transition: 'all 0.2s', fontFamily: 'var(--font-display)',
                }}
              >
                Continue <FiChevronRight />
              </button>
            ) : null}
          </div>
        </div>

        {/* Right: Live Sidebar */}
        <PriceSidebar type={type} features={features} timeline={timeline} pages={pages} />
      </div>

      <style>{`
        @media (max-width: 760px) {
          .estimator-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
