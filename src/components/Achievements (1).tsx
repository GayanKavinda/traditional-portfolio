import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const achievements = [
  { title: 'Best Architecture Award', org: 'DevConf Global', year: '2024', desc: 'Recognized for innovative microservices design pattern' },
  { title: 'Open Source Contributor', org: 'GitHub', year: '2023', desc: 'Top contributor to 3 major open-source projects' },
  { title: 'Top 1% Developer', org: 'Stack Overflow', year: '2023', desc: 'Ranked in top percentile for TypeScript answers' },
  { title: 'Speaker of the Year', org: 'JSConf Asia', year: '2022', desc: 'Keynote on real-time distributed systems' },
  { title: 'Innovation Prize', org: 'TechCrunch Disrupt', year: '2021', desc: 'First place for developer tooling category' },
  { title: 'Patent Holder', org: 'USPTO', year: '2020', desc: 'Patent for novel caching algorithm optimization' },
];

const Achievements = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ach-card', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: ref.current!, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-[100px] border-t border-white/[0.06]" style={{ background: '#0A0A0A' }}>
      <div className="text-center mb-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Recognition</p>
        <h2 className="font-playfair text-[48px] text-bone mt-2">Achievements</h2>
      </div>
      <div className="max-w-[1100px] mx-auto px-10 grid grid-cols-3 gap-5">
        {achievements.map(a => (
          <div key={a.title} className="ach-card rounded-[10px] border border-white/[0.07] p-6 hover:border-gold/35 hover:-translate-y-[3px] transition-all duration-300" style={{ background: '#111' }}>
            <svg className="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <p className="font-sans text-[17px] text-bone font-medium mt-3.5">{a.title}</p>
            <div className="flex justify-between items-center mt-1.5">
              <span className="font-mono text-[12px] text-gold">{a.org}</span>
              <span className="font-mono text-[11px] text-bone/40">{a.year}</span>
            </div>
            <p className="font-sans text-[14px] text-bone/[0.55] mt-2">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
