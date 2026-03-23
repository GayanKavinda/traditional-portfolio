// src/components/Certifications.tsx
// Mobile: 2-column grid (already correct), padding tightened
// All original Kandyan ornaments and hover effects preserved

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const certifications = [
  { name: 'AWS Solutions Architect',      issuer: 'Amazon Web Services', abbr: 'AWS',  year: '2024', icon: 'aws'   },
  { name: 'Certified Kubernetes Admin',   issuer: 'CNCF',               abbr: 'CKA',  year: '2024', icon: 'k8s'   },
  { name: 'Google Cloud Professional',    issuer: 'Google',             abbr: 'GCP',  year: '2024', icon: 'cloud' },
  { name: 'Meta React Developer',         issuer: 'Meta',               abbr: 'META', year: '2023', icon: 'react' },
  { name: 'MongoDB Associate Developer',  issuer: 'MongoDB',            abbr: 'MDB',  year: '2023', icon: 'db'    },
  { name: 'GitHub Actions Certified',     issuer: 'GitHub',             abbr: 'GH',   year: '2023', icon: 'git'   },
];

const CertIcon = ({ type }: { type: string }) => {
  const base = { width: 16, height: 16, stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' };
  const icons: Record<string, JSX.Element> = {
    aws:   <svg viewBox="0 0 24 24" {...base}><path d="M6 9.5l6-3.5 6 3.5M12 21V13m0 0l-6-3.5m6 3.5l6-3.5"/></svg>,
    k8s:   <svg viewBox="0 0 24 24" {...base}><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>,
    cloud: <svg viewBox="0 0 24 24" {...base}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
    react: <svg viewBox="0 0 24 24" {...base}><circle cx="12" cy="12" r="8"/><path d="M8 12h8M12 8v8"/></svg>,
    db:    <svg viewBox="0 0 24 24" {...base}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/></svg>,
    git:   <svg viewBox="0 0 24 24" {...base}><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 8v8a2 2 0 002 2h8"/></svg>,
  };
  return <div className="text-[#E8A820]">{icons[type] || icons.aws}</div>;
};

const Certifications = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-cell', {
        y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-20 relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)' }}
      />

      <div className="max-w-[720px] mx-auto px-6">
        {/* Header */}
        <div className="text-center pb-6 md:pb-8 pt-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8A820] mb-2">// Credentials</p>
          <h2 className="font-playfair text-[clamp(28px,5vw,38px)] text-foreground font-medium tracking-[0.05em] leading-none">Certifications</h2>
          <div className="flex items-center justify-center gap-2.5 mt-3.5">
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, transparent, #C41E3A)' }} />
            <svg width="60" height="18" viewBox="0 0 60 18">
              <g fill="none">
                <path d="M30 2 C22 2 16 9 16 9 C16 9 22 16 30 16 C38 16 44 9 44 9 C44 9 38 2 30 2 Z" stroke="#E8A820" strokeWidth="0.8" opacity="0.5"/>
                <path d="M30 5 C25 5 21 9 21 9 C21 9 25 13 30 13 C35 13 39 9 39 9 C39 9 35 5 30 5 Z" stroke="#E8A820" strokeWidth="0.6" opacity="0.35"/>
                <circle cx="30" cy="9" r="2" fill="#E8A820" opacity="0.7"/>
                <circle cx="9" cy="9" r="1.5" fill="#C41E3A" opacity="0.7"/>
                <circle cx="51" cy="9" r="1.5" fill="#C41E3A" opacity="0.7"/>
                <line x1="2" y1="9" x2="14" y2="9" stroke="#E8A820" strokeWidth="0.6" opacity="0.4"/>
                <line x1="46" y1="9" x2="58" y2="9" stroke="#E8A820" strokeWidth="0.6" opacity="0.4"/>
              </g>
            </svg>
            <div className="w-10 h-px" style={{ background: 'linear-gradient(to left, transparent, #C41E3A)' }} />
          </div>
        </div>

        {/* Ornament */}
        <div className="flex items-center justify-center py-2 opacity-55 overflow-hidden">
          <svg width="100%" viewBox="0 0 320 18" preserveAspectRatio="xMidYMid meet">
            <g fill="none" stroke="#E8A820" strokeWidth="0.7" opacity="0.5">
              <line x1="0" y1="9" x2="118" y2="9"/>
              <path d="M130 9 C130 4 135 1 140 1 C145 1 150 4 150 9 C150 14 145 17 140 17 C135 17 130 14 130 9 Z"/>
              <path d="M140 1 L140 17 M130 9 L150 9"/>
              <path d="M120 9 C120 6 125 3 130 9"/>
              <path d="M160 9 C160 6 155 3 150 9"/>
              <circle cx="140" cy="9" r="2" fill="#E8A820"/>
              <circle cx="120" cy="9" r="1" fill="#C41E3A"/>
              <circle cx="160" cy="9" r="1" fill="#C41E3A"/>
              <line x1="162" y1="9" x2="320" y2="9"/>
            </g>
          </svg>
        </div>

        {/* Grid — 2 cols on mobile, 3 on desktop */}
        <div className="pb-10 md:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[2px] rounded-[6px] overflow-hidden border border-border"
            style={{ background: 'hsl(var(--border))' }}
          >
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-cell group relative flex items-start gap-3 py-4 px-3 md:px-3.5 bg-card hover:bg-muted transition-colors duration-250 cursor-default"
              >
                <div className="absolute top-0 left-0 w-[3px] h-full bg-transparent group-hover:bg-[#C41E3A] transition-colors duration-250" />
                <div className="flex-shrink-0 w-[28px] h-[28px] md:w-[30px] md:h-[30px] rounded bg-[#E8A820]/15 flex items-center justify-center">
                  <CertIcon type={cert.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-[12px] md:text-[13px] font-medium text-foreground leading-[1.3]">{cert.name}</p>
                  <div className="flex items-center gap-1.5 mt-[3px]">
                    <span className="font-mono text-[9px] md:text-[10px] text-[#E8A820]">{cert.abbr}</span>
                    <span className="text-foreground/15 text-[10px]">·</span>
                    <span className="font-mono text-[9px] md:text-[10px] text-foreground/30">{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border ornament */}
        <div className="pb-8 relative z-10 w-full overflow-hidden flex justify-center opacity-30">
          <svg width="100%" height="24" viewBox="0 0 672 24" preserveAspectRatio="xMidYMid meet">
            <g fill="none" stroke="#E8A820" strokeWidth="0.8">
              <line x1="0" y1="12" x2="672" y2="12"/>
              <rect x="312" y="6" width="12" height="12" rx="1" transform="rotate(45 318 12)"/>
              <rect x="296" y="9" width="6" height="6" rx="0.5" transform="rotate(45 299 12)"/>
              <rect x="326" y="9" width="6" height="6" rx="0.5" transform="rotate(45 329 12)"/>
              <circle cx="318" cy="12" r="2" fill="#E8A820" opacity="0.4"/>
            </g>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)' }}
      />
    </section>
  );
};

export default Certifications;