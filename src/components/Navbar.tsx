import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home',       id: 'home',       sub: 'Start here',       icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg> },
  { label: 'Projects',   id: 'projects',   sub: 'Selected work',    icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { label: 'Skills',     id: 'skills',     sub: 'The stack',        icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
  { label: 'Experience', id: 'experience', sub: 'Career timeline',  icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> },
  { label: 'About',      id: 'about',      sub: 'I code with intent', icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { label: 'Contact',    id: 'contact',    sub: "Let's build",      icon: (c:string) => <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
];

const iconColors = ['#C0272D','#E8A820','#4F8EF7','#34C98A','#A78BFA','#E8A820'];
const iconBgs    = ['rgba(192,39,45,0.12)','rgba(232,168,32,0.1)','rgba(79,142,247,0.1)','rgba(52,201,138,0.1)','rgba(167,139,250,0.1)','rgba(232,168,32,0.1)'];
const iconBords  = ['rgba(192,39,45,0.2)','rgba(232,168,32,0.16)','rgba(79,142,247,0.16)','rgba(52,201,138,0.16)','rgba(167,139,250,0.16)','rgba(232,168,32,0.16)'];

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    if (id === 'home') {
      if (location.pathname !== '/') navigate('/');
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ─── Shared style tokens ───────────────────────────────────────────────────
  const pillBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center',
    background: 'rgba(8,8,8,0.85)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: 50,
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  };

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP NAVBAR
      ════════════════════════════════════════ */}
      <div className="hidden lg:block fixed z-[999] top-0 left-0 right-0 pointer-events-none">
        
        {/* ── SCROLLED STATE ── */}
        <nav
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'rgba(8,8,8,0.97)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: 56, padding: '0 40px',
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#C0272D', fontWeight: 900, cursor: 'pointer', background: 'none', border: 'none' }}
          >
            GY.
          </button>
          {/* Centered links */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="nav-link"
                style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 10,
                  color: 'rgba(245,240,232,0.5)', letterSpacing: '0.18em',
                  textTransform: 'uppercase', background: 'none', border: 'none',
                  cursor: 'pointer', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.5)')}
              >
                {l.label}
              </button>
            ))}
          </div>
          {/* Resume */}
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              color: '#E8A820', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '6px 18px', borderRadius: 50,
              border: '1px solid rgba(232,168,32,0.35)',
              background: 'rgba(232,168,32,0.06)', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(232,168,32,0.12)'; e.currentTarget.style.borderColor='rgba(232,168,32,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(232,168,32,0.06)'; e.currentTarget.style.borderColor='rgba(232,168,32,0.35)'; }}
          >
            ↓ Resume
          </button>
        </nav>

        {/* ── PILL STATE ── */}
        <nav
          style={{
            ...pillBase,
            position: 'absolute', top: 20, left: '50%',
            transform: `translateX(-50%) scale(${scrolled ? 0.95 : 1})`,
            opacity: scrolled ? 0 : 1,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'none' : 'auto',
            padding: '8px 10px 8px 16px', gap: 2, whiteSpace: 'nowrap'
          }}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            style={{
              fontFamily: "'Playfair Display',serif", fontSize: 15,
              color: '#C0272D', fontWeight: 900, marginRight: 8,
              paddingRight: 14, borderRight: '1px solid rgba(255,255,255,0.08)',
              background: 'none', border: 'none', borderRadius: 0, cursor: 'pointer',
            }}
          >
            GY.
          </button>
          {/* Links */}
          {navLinks.map(l => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              style={{
                fontFamily: "'DM Mono',monospace", fontSize: 10,
                color: 'rgba(245,240,232,0.55)', letterSpacing: '0.14em',
                textTransform: 'uppercase', padding: '6px 12px', borderRadius: 50,
                border: '1px solid transparent', background: 'none',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#F5F0E8';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(245,240,232,0.55)';
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {l.label}
            </button>
          ))}
          {/* Divider */}
          <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)', margin: '0 6px', flexShrink: 0 }} />
          {/* Resume pill */}
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10,
              color: '#E8A820', letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '6px 16px', borderRadius: 50,
              border: '1px solid rgba(232,168,32,0.35)',
              background: 'rgba(232,168,32,0.06)', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(232,168,32,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(232,168,32,0.06)'; }}
          >
            ↓ Resume
          </button>
        </nav>
      </div>

      {/* ════════════════════════════════════════
          MOBILE NAVBAR
      ════════════════════════════════════════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-[999] pointer-events-none">

        {/* ── SCROLLED STATE ── */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'rgba(8,8,8,0.97)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: 56, padding: '0 16px',
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: '#C0272D', fontWeight: 900 }}>GY.</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(245,240,232,0.4)', letterSpacing: '0.05em' }}>Gara Yaka</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid transparent',
              background: menuOpen ? 'rgba(192,39,45,0.1)' : 'transparent',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 5, cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <span style={{ display: 'block', width: 14, height: 1, background: menuOpen ? '#C0272D' : '#F5F0E8', borderRadius: 1, transform: menuOpen ? 'rotate(45deg) translate(3px, 4px)' : 'none', transition: 'transform 0.3s, background 0.3s' }} />
            <span style={{ display: 'block', width: menuOpen ? 0 : 10, height: 1, background: '#F5F0E8', borderRadius: 1, transition: 'width 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 14, height: 1, background: menuOpen ? '#C0272D' : '#F5F0E8', borderRadius: 1, transform: menuOpen ? 'rotate(-45deg) translate(3px, -4px)' : 'none', transition: 'transform 0.3s, background 0.3s' }} />
          </button>
        </div>

        {/* ── PILL STATE ── */}
        <div
          style={{
            ...pillBase,
            position: 'absolute', top: 12, left: 16, right: 16,
            justifyContent: 'space-between',
            padding: '10px 16px',
            transform: `scale(${scrolled ? 0.95 : 1})`,
            opacity: scrolled ? 0 : 1,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => go('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: '#C0272D', fontWeight: 900 }}>GY.</span>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'rgba(245,240,232,0.4)', letterSpacing: '0.05em' }}>Gara Yaka</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
              background: menuOpen ? 'rgba(192,39,45,0.1)' : 'rgba(255,255,255,0.04)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 5, cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            <span style={{ display: 'block', width: 14, height: 1, background: menuOpen ? '#C0272D' : '#F5F0E8', borderRadius: 1, transform: menuOpen ? 'rotate(45deg) translate(3px, 4px)' : 'none', transition: 'transform 0.3s, background 0.3s' }} />
            <span style={{ display: 'block', width: menuOpen ? 0 : 10, height: 1, background: '#F5F0E8', borderRadius: 1, transition: 'width 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 14, height: 1, background: menuOpen ? '#C0272D' : '#F5F0E8', borderRadius: 1, transform: menuOpen ? 'rotate(-45deg) translate(3px, -4px)' : 'none', transition: 'transform 0.3s, background 0.3s' }} />
          </button>
        </div>

        {/* Dropdown menu */}
        <div style={{
          position: 'absolute', top: scrolled ? 68 : 80, left: 16, right: 16,
          pointerEvents: menuOpen ? 'auto' : 'none',
          background: 'rgba(10,10,10,0.96)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 24,
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          overflow: 'hidden',
          maxHeight: menuOpen ? 600 : 0,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5)',
        }}>
          <div style={{ padding: '36px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Ultra-Clean Link List */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  style={{
                    fontFamily: "'DM Mono',monospace", fontSize: 13,
                    color: 'rgba(245,240,232,0.6)', letterSpacing: '0.25em',
                    textTransform: 'uppercase', background: 'none', border: 'none',
                    cursor: 'pointer', transition: 'color 0.2s', padding: '4px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.6)'}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Tiny Divider */}
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.08)', margin: '40px auto 32px auto' }} />

            {/* Bottom Stack: Resume & Socials */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
              <button
                onClick={() => { setMenuOpen(false); window.open('/resume.pdf','_blank'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'none', border: '1px solid rgba(232,168,32,0.3)',
                  borderRadius: 50, cursor: 'pointer',
                  fontFamily: "'DM Mono',monospace", fontSize: 11,
                  color: '#E8A820', letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '10px 24px', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,168,32,0.08)'; e.currentTarget.style.borderColor = 'rgba(232,168,32,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(232,168,32,0.3)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Resume
              </button>
              
              <div style={{ display: 'flex', gap: 24 }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(245,240,232,0.4)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.4)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(245,240,232,0.4)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#F5F0E8'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.4)'}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

