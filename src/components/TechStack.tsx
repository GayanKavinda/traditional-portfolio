import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animeImg from '@/assets/anime-headdress.png';

// UI/UX Pro Max recommended easing
// UI/UX Pro Max recommended easing + reduced motion support
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

interface SkillBar { name: string; pct: number; }
const languages: SkillBar[] = [
  { name: 'TypeScript', pct: 92 }, { name: 'React', pct: 88 }, { name: 'Node.js', pct: 85 }, { name: 'Python', pct: 78 },
];
const infra: SkillBar[] = [
  { name: 'AWS', pct: 82 }, { name: 'Docker', pct: 80 }, { name: 'PostgreSQL', pct: 75 }, { name: 'Kubernetes', pct: 70 },
];

const BarGroup = ({ title, items }: { title: string; items: SkillBar[] }) => (
  <div className="mb-8">
    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-3">// {title}</p>
    {items.map(s => (
      <div key={s.name} className="mb-5">
        <div className="flex justify-between">
          <span className="font-mono text-[13px] text-bone">{s.name}</span>
          <span className="font-mono text-[13px] text-gold">{s.pct}%</span>
        </div>
        <div className="mt-2 h-[2px] rounded-[1px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="bar-fill h-full rounded-[1px] bg-crimson" style={{ width: 0 }} data-width={`${s.pct}%`} />
        </div>
      </div>
    ))}
  </div>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference (UI/UX Pro Max accessibility)
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // BG parallax with UI/UX Pro Max easing
      gsap.to(bgRef.current!, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      // Bar fills with recommended easing (300-400ms per UX guidelines)
      gsap.utils.toArray<HTMLElement>('.bar-fill').forEach(el => {
        gsap.to(el, {
          width: el.dataset.width!,
          duration: 1,
          ease: EASING,
          scrollTrigger: { trigger: barsRef.current!, start: 'top 80%', once: true }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-[120px] relative overflow-hidden">
      <img ref={bgRef} src={animeImg} alt="" className="absolute right-[-100px] top-1/2 -translate-y-1/2 h-[90%] w-auto opacity-[0.06] pointer-events-none z-0" style={{ mixBlendMode: 'screen' }} />

      <div className="relative z-[1] max-w-[1200px] mx-auto px-10">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Technologies</p>
          <h2 className="font-playfair text-[48px] text-bone mt-2">The Stack</h2>
        </div>

        <div className="grid gap-[5%] mt-12" style={{ gridTemplateColumns: '40% 55%' }}>
          <div ref={barsRef} className="mt-12">
            <BarGroup title="Languages" items={languages} />
            <BarGroup title="Infrastructure" items={infra} />
          </div>
          <div>
            <TechGraph />
          </div>
        </div>
      </div>
    </section>
  );
};

// Modern Tech Graph Component
const TechGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  const technologies = [
    { name: 'React', x: 0, y: -80, color: '#61DAFB' },
    { name: 'TypeScript', x: -60, y: -40, color: '#3178C6' },
    { name: 'Next.js', x: 60, y: -40, color: '#FFFFFF' },
    { name: 'Node.js', x: -80, y: 20, color: '#339933' },
    { name: 'Python', x: 80, y: 20, color: '#3776AB' },
    { name: 'AWS', x: -40, y: 80, color: '#FF9900' },
    { name: 'Docker', x: 40, y: 80, color: '#2496ED' },
  ];

  useEffect(() => {
    // Respect reduced motion preference
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Staggered entrance with UI/UX Pro Max easing
      gsap.from('.tech-node', {
        scale: 0,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: graphRef.current!, start: 'top 80%', once: true }
      });

      gsap.from('.tech-line', {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        ease: EASING,
        stagger: 0.05,
        transformOrigin: 'left center',
        scrollTrigger: { trigger: graphRef.current!, start: 'top 80%', once: true }
      });
    }, graphRef);
    return () => ctx.revert();
  }, []);

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [1, 4], [3, 5]
  ];

  return (
    <div ref={graphRef} className="relative w-full" style={{ height: 280 }}>
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        {connections.map(([from, to], i) => {
          const fromTech = technologies[from];
          const toTech = technologies[to];
          const midX = (fromTech.x + toTech.x) / 2;
          const midY = (fromTech.y + toTech.y) / 2;
          return (
            <path
              key={i}
              className="tech-line"
              d={`M ${fromTech.x + 100} ${fromTech.y + 140} Q ${midX + 100} ${midY + 100} ${toTech.x + 100} ${toTech.y + 140}`}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {technologies.map((tech, i) => (
        <div
          key={tech.name}
          className="tech-node group absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
          style={{
            left: `calc(50% + ${tech.x}px - 32px)`,
            top: `calc(50% + ${tech.y}px - 32px)`,
            background: 'rgba(17, 17, 17, 0.8)',
            border: `2px solid ${tech.color}40`,
            boxShadow: `0 0 20px ${tech.color}20`
          }}
        >
          <span
            className="font-mono text-[10px] font-medium"
            style={{ color: tech.color }}
          >
            {tech.name.split(' ')[0]}
          </span>

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 30px ${tech.color}40`
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TechStack;