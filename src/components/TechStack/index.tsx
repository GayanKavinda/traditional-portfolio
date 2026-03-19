import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import animeImg from '@/assets/anime-headdress.png';
import { BarGroup } from './BarGroup';
import { TechGraph } from './TechGraph';

gsap.registerPlugin(ScrollTrigger);

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

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current!, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

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

      <div className="relative z-[1] max-w-[1400px] mx-auto px-10">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Technologies</p>
          <h2 className="font-playfair text-[48px] text-bone mt-2">The Stack</h2>
        </div>

        <div className="grid gap-12 mt-10 items-start max-md:grid-cols-1" style={{ gridTemplateColumns: '35% 1fr' }}>
          <div ref={barsRef} className="pt-4">
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

export default TechStack;
