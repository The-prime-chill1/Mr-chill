import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBorder from './reactbits/StarBorder';

const SECRET_PHRASE = 'MR CHILL';

export default function PassphraseGate({ open, onClose, onVerified }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setValue('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === SECRET_PHRASE) {
      setError('');
      onVerified();
    } else {
      setError('That phrase isn\u2019t right. Ask Lamidi for the CV passphrase.');
      setShake(true);
      setTimeout(() => setShake(false), 420);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(6,5,4,0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass"
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '32px 28px',
              position: 'relative',
              animation: shake ? 'gate-shake 0.4s ease' : 'none',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'transparent',
                color: 'var(--text-dim)',
                fontSize: '1.1rem',
                lineHeight: 1,
                padding: 6,
              }}
            >
              ✕
            </button>

            <span className="eyebrow" style={{ marginBottom: 6 }}>
              Protected Download
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>
              Enter the CV passphrase
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: 20 }}>
              This CV is passphrase-protected. Don\u2019t have it? Reach out to Lamidi directly to request it.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Secret phrase"
                autoComplete="off"
                className="contact-input"
                style={{ marginBottom: 12, textAlign: 'center', letterSpacing: '0.04em' }}
              />
              {error && (
                <p style={{ color: '#e2836b', fontSize: '0.8rem', marginBottom: 12, textAlign: 'center' }}>{error}</p>
              )}
              <StarBorder as="button" type="submit" color="#2f8dff" speed="4.5s" thickness={1.5} style={{ width: '100%' }}>
                Unlock & Download
              </StarBorder>
            </form>
          </motion.div>

          <style>{`
            @keyframes gate-shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-8px); }
              40% { transform: translateX(8px); }
              60% { transform: translateX(-5px); }
              80% { transform: translateX(5px); }
            }
            .contact-input {
              background: rgba(255,255,255,0.03);
              border: 1px solid var(--panel-border);
              border-radius: 10px;
              padding: 13px 16px;
              color: var(--text);
              font-family: var(--font-body);
              font-size: 0.95rem;
              width: 100%;
            }
            .contact-input:focus { outline: none; border-color: var(--electric-blue); }
            .contact-input::placeholder { color: var(--text-dim); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
