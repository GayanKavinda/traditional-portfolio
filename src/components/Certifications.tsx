import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const certs = [
  { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2024', color: '#E8A820', abbr: 'AWS' },
  { name: 'Cloud Professional Engineer', issuer: 'Google Cloud', date: '2023', color: '#7B9FDE', abbr: 'GCP' },
  { name: 'Certified Kubernetes Admin', issuer: 'CNCF', date: '2023', color: '#C0272D', abbr: 'CKA' },
  { name: 'React Developer Certificate', issuer: 'Meta', date: '2022', color: '#61DAFB', abbr: 'META' },
  { name: 'MongoDB Associate Developer', issuer: 'MongoDB Inc', date: '2022', color: '#47A248', abbr: 'MDB' },
];

const Certifications = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cert-card', {
        x: 60, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: ref.current!, start: 'top 80%' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-[100px]" style={{ background: '#0A0A0A' }}>
      <div className="text-center mb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Credentials</p>
        <h2 className="font-playfair text-[48px] text-bone mt-2">Certifications</h2>
      </div>
      <div className="scrollbar-hidden flex gap-5 overflow-x-auto px-10 pb-4">
        {certs.map(c => (
          <div key={c.name} className="cert-card flex-shrink-0 w-[280px] rounded-[10px] border border-white/[0.07] p-6 hover:-translate-y-1 hover:border-crimson/35 transition-all duration-300" style={{ background: '#111' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-[11px] font-medium" style={{ background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}44` }}>
              {c.abbr}
            </div>
            <p className="font-playfair text-[18px] text-bone mt-4 leading-[1.3]">{c.name}</p>
            <p className="font-mono text-[11px] text-gold mt-1.5">{c.issuer}</p>
            <p className="font-mono text-[11px] text-bone/40">{c.date}</p>
            <button className="font-mono text-[12px] text-crimson hover:underline mt-4">Verify →</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
