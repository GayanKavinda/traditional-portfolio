import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dancerImg from '@/assets/dancer human+robot.png';
import { useTheme } from '@/context/ThemeProvider';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const dancerRef = useRef<HTMLImageElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <section ref={heroRef} className="h-screen overflow-hidden relative" style={{ background: 'hsl(var(--background))' }}>
      {/* Decorative cobra SVG */}
      <svg className="absolute top-16 right-20 w-32 h-32 opacity-20" style={{ animation: 'float 4s ease-in-out infinite' }} viewBox="0 0 100 100" fill="none">
        <path d="M50 10 C30 25 20 50 35 70 C40 78 50 85 50 90 C50 85 60 78 65 70 C80 50 70 25 50 10Z" stroke="#C0272D" strokeWidth="0.5" />
        <circle cx="42" cy="45" r="2" fill="#C0272D" opacity="0.5" />
        <circle cx="58" cy="45" r="2" fill="#C0272D" opacity="0.5" />
      </svg>

      {/* Right content (swapped from left) */}
      <div className="relative z-10 h-full flex flex-col justify-start ml-auto" style={{ width: '55%', paddingRight: 'max(60px, 6vw)', paddingTop: '18vh' }}>
        <p className="hero-text-anim font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
          // Senior Software Engineer<span style={{ animation: 'blink 0.8s infinite' }}>|</span>
        </p>
        <h1 className="hero-text-anim font-playfair text-[72px] font-black leading-none mt-4 text-foreground">
          Gara Yaka
        </h1>
        <h1 className="hero-text-anim font-playfair text-[72px] font-black leading-none text-crimson">
          Crafting Systems.
        </h1>
        <p className="hero-text-anim font-sans text-[16px] leading-[1.7] max-w-[480px] mt-5 text-foreground/65">
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
            className="font-mono text-[13px] border border-foreground/25 text-foreground px-7 py-3 rounded transition-all hover:border-foreground/50"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Talk
          </button>
        </div>

        {/* Code block */}
        <div className="hero-text-anim mt-8 rounded-lg p-4 max-w-[440px]" style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))' }}>
          <pre className="font-mono text-[13px] leading-relaxed">
            <span className="text-crimson">const</span> <span className="text-gold">engineer</span> <span style={{ color: 'rgba(26,26,46,0.4)' }}>=</span> {'{\n'}
            {'  '}<span style={{ color: 'rgba(26,26,46,0.55)' }}>stack</span>: [<span className="text-green-600">"TypeScript"</span>, <span className="text-green-600">"React"</span>, <span className="text-green-600">"Go"</span>],{'\n'}
            {'  '}<span style={{ color: 'rgba(26,26,46,0.55)' }}>focus</span>: <span className="text-green-600">"distributed systems"</span>,{'\n'}
            {'  '}<span style={{ color: 'rgba(26,26,46,0.55)' }}>coffee</span>: <span className="text-gold">Infinity</span>{'\n'}
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
        style={{ mixBlendMode: isDark ? 'screen' : 'multiply', filter: 'drop-shadow(40px 0px 70px rgba(192,39,45,0.2))' }}
      />

      {/* Bottom fade for smooth section transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
      />
    </section>
  );
};

export default Hero;
