import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeProvider';

const achievements = [
  { title: 'Best Architecture Award', org: 'Tech Summit APAC', year: '2024', desc: 'Distributed system design for 10M+ daily transactions' },
  { title: 'Top Open Source Contributor', org: 'GitHub', year: '2023', desc: '500+ stars on distributed caching library' },
  { title: 'Speaker — NodeConf Asia', org: 'CNCF', year: '2023', desc: 'Talk on production Kubernetes patterns' },
  { title: 'Hackathon Winner — FinTech', org: 'WSO2', year: '2022', desc: '1st place among 200+ teams' },
  { title: 'Stack Overflow Top 1%', org: 'Stack Overflow', year: '2022', desc: 'Top contributor in Node.js & TypeScript' },
  { title: 'Innovation Prize', org: 'TechCrunch', year: '2021', desc: 'Developer tooling category winner' },
];

const Achievements = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ach-item', {
        x: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 relative bg-background">
      {/* Gradient fade at top - behind content */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 100%)' }} />

      <div className="max-w-[720px] mx-auto px-6">
        {/* Header (Kandyan Arch Header) */}
        <div className="text-center pb-8 pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8A820] mb-2">// Recognition</p>
          <h2 className="font-playfair text-[38px] text-foreground font-medium tracking-[0.05em] leading-none m-0 max-sm:text-[30px]">Achievements</h2>
          
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

        {/* Lotus top ornament */}
        <div className="flex items-center justify-center py-2 opacity-55">
          <svg width="320" height="18" viewBox="0 0 320 18">
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

        {/* List (Batik Section) */}
        <div className="pb-12 pt-4">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="ach-item group relative grid gap-x-4 py-4 border-b border-foreground/[0.06] last:border-b-0 cursor-default"
              style={{ gridTemplateColumns: '28px 1fr' }}
            >
              <div className="absolute inset-0 bg-foreground/[0.015] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="font-playfair text-[20px] font-semibold text-[#C41E3A]/35 leading-[1.3] text-right pr-1">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-playfair text-[15px] font-medium text-foreground group-hover:text-gold transition-colors duration-200">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-[#E8A820]/15 text-[#E8A820] tracking-[0.05em]">
                    {item.year}
                  </span>
                  <span className="ml-auto text-[#C41E3A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm leading-none">
                    →
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-foreground/40">
                  <span className="text-[#E8A820]">{item.org}</span>
                  <span className="text-foreground/20">·</span>
                  <span>{item.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade at bottom - behind content */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)' }} />
    </section>
  );
};

export default Achievements;