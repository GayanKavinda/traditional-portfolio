import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/mask.png';

const stats = [
  { num: '10+', label: 'YEARS', sub: 'Experience' },
  { num: '50+', label: 'PROJECTS', sub: 'Shipped' },
  { num: '∞', label: 'LINES', sub: 'of Code' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(maskRef.current!, {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
      });
      gsap.from(photoRef.current!, {
        x: -60, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top 75%' }
      });
      gsap.from('.stat-num', {
        textContent: 0, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 },
        scrollTrigger: { trigger: '.stats-row', start: 'top 85%', once: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-[120px] relative overflow-hidden">
      <img ref={maskRef} src={maskImg} alt="" className="absolute left-[-80px] top-1/2 -translate-y-1/2 h-[80%] w-auto opacity-[0.08] pointer-events-none z-0" style={{ mixBlendMode: 'screen' }} />

      <div className="relative z-[1] max-w-[1100px] mx-auto px-10 grid grid-cols-2 gap-20 items-center">
        {/* Photo */}
        <div ref={photoRef} className="relative w-fit">
          <div className="w-[320px] h-[380px] rounded-lg border-2 border-crimson/40 overflow-hidden bg-card flex items-center justify-center">
            <span className="font-mono text-[13px] text-bone/20">[ Your Photo ]</span>
          </div>
          {/* Corner brackets */}
          {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
            <svg key={i} className={`absolute ${pos} w-6 h-6`} viewBox="0 0 24 24">
              <path d="M0 8V0h8" fill="none" stroke="#E8A820" strokeWidth="1.5" />
            </svg>
          ))}
          <div className="flex gap-4 mt-5">
            {['GitHub', 'LinkedIn', 'Twitter'].map(s => (
              <a key={s} href="#" className="font-mono text-[12px] text-bone/50 hover:text-gold transition-colors">{s}</a>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// About Me</p>
          <h2 className="font-playfair text-[42px] text-bone mt-2 leading-[1.1]">I code with intent.</h2>
          <div className="mt-6 space-y-4 font-sans text-[16px] leading-[1.7] text-bone/70">
            <p>With over a decade in the trenches, I've learned that great software isn't just about clean code — it's about understanding the problem deeply before writing a single line.</p>
            <p>I specialize in distributed systems, cloud architecture, and building developer tools that teams actually enjoy using. My approach combines battle-tested engineering principles with a relentless focus on user experience.</p>
            <p>When I'm not architecting systems, you'll find me contributing to open source, writing about software design patterns, or exploring the intersection of technology and traditional art forms.</p>
          </div>

          <div className="stats-row grid grid-cols-3 gap-6 mt-10 border-t border-white/[0.07] pt-8">
            {stats.map(s => (
              <div key={s.label}>
                <p className="font-playfair text-[44px] text-crimson">{s.num}</p>
                <p className="font-mono text-[11px] text-gold uppercase">{s.label}</p>
                <p className="font-sans text-[13px] text-bone/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
