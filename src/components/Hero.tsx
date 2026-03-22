import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dancerImg from '@/assets/dancer human+robot.png';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dancerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(dancerRef.current!, { x: -180, opacity: 0, duration: 1.4, ease: 'power3.out', delay: 0.5 });
      gsap.from('.hero-text-anim', { y: 40, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power2.out', delay: 0.2 });

      ScrollTrigger.create({
        trigger: heroRef.current!,
        start: 'center top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(dancerRef.current!, { x: -p * 250, opacity: 1 - p });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="h-screen overflow-hidden relative" style={{ background: '#0A0A0A' }}>
      {/* Decorative cobra SVG */}
      <svg className="absolute top-16 right-20 w-32 h-32 opacity-20" style={{ animation: 'float 4s ease-in-out infinite' }} viewBox="0 0 100 100" fill="none">
        <path d="M50 10 C30 25 20 50 35 70 C40 78 50 85 50 90 C50 85 60 78 65 70 C80 50 70 25 50 10Z" stroke="#E8A820" strokeWidth="0.5" />
        <circle cx="42" cy="45" r="2" fill="#E8A820" opacity="0.5" />
        <circle cx="58" cy="45" r="2" fill="#E8A820" opacity="0.5" />
      </svg>

      {/* Right content (swapped from left) */}
      <div className="relative z-10 h-full flex flex-col justify-start ml-auto" style={{ width: '55%', paddingRight: 'max(60px, 6vw)', paddingTop: '18vh' }}>
        <p className="hero-text-anim font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
          // Senior Software Engineer<span style={{ animation: 'blink 0.8s infinite' }}>|</span>
        </p>
        <h1 className="hero-text-anim font-playfair text-[72px] font-black leading-none text-bone mt-4">
          Gara Yaka
        </h1>
        <h1 className="hero-text-anim font-playfair text-[72px] font-black leading-none text-crimson">
          Crafting Systems.
        </h1>
        <p className="hero-text-anim font-sans text-[16px] leading-[1.7] text-bone/70 max-w-[480px] mt-5">
          Building scalable distributed systems and elegant interfaces. Passionate about clean architecture, performance optimization, and developer experience.
        </p>
        <div className="hero-text-anim flex gap-4 mt-8">
          <button
            className="font-mono text-[13px] bg-crimson text-white px-7 py-3 rounded hover:brightness-110 transition-all"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <button
            className="font-mono text-[13px] border border-bone/30 text-bone px-7 py-3 rounded hover:border-bone/60 transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk
          </button>
        </div>

        {/* Code block */}
        <div className="hero-text-anim mt-8 rounded-lg border border-white/[0.07] p-4 max-w-[440px]" style={{ background: '#0D0D0D' }}>
          <pre className="font-mono text-[13px] leading-relaxed">
            <span className="text-crimson">const</span> <span className="text-gold">engineer</span> <span className="text-bone/50">=</span> {'{\n'}
            {'  '}<span className="text-bone/60">stack</span>: [<span className="text-green-400">"TypeScript"</span>, <span className="text-green-400">"React"</span>, <span className="text-green-400">"Go"</span>],{'\n'}
            {'  '}<span className="text-bone/60">focus</span>: <span className="text-green-400">"distributed systems"</span>,{'\n'}
            {'  '}<span className="text-bone/60">coffee</span>: <span className="text-gold">Infinity</span>{'\n'}
            {'}'};
          </pre>
        </div>
      </div>

      {/* Left dancer (swapped from right) */}
      <img
        ref={dancerRef}
        src={dancerImg}
        alt="Dancer"
        className="absolute left-0 bottom-0 h-[92vh] w-auto object-contain"
        style={{ mixBlendMode: 'screen', filter: 'drop-shadow(40px 0px 70px rgba(192,39,45,0.4))' }}
      />

      {/* Bottom fade for smooth section transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />
    </section>
  );
};

export default Hero;
