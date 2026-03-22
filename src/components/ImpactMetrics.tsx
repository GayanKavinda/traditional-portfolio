import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeProvider';

const metrics = [
  { value: '10M+', label: 'users served' },
  { value: '99.99%', label: 'uptime achieved' },
  { value: '40%', label: 'latency reduced' },
  { value: '$2M+', label: 'infrastructure saved' },
];

const ImpactMetrics = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the whole section
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Count up animation (conceptually, for strings like "10M+" we focus on the number part)
      // Since these are specific strings, we'll do a simple stagger reveal for now
      // or a more complex count if the user wants. The prompt says "Count-up GSAP on scroll entry".
      // I'll implement a simple count-up for the numeric parts where possible.
      
      const stats = gsap.utils.toArray<HTMLElement>('.stat-value');
      stats.forEach((stat) => {
        const targetValue = stat.innerText;
        const numMatch = targetValue.match(/(\d+\.?\d*)/);
        if (numMatch) {
          const endVal = parseFloat(numMatch[0]);
          const suffix = targetValue.replace(numMatch[0], '');
          const obj = { val: 0 };
          gsap.to(obj, {
            val: endVal,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
              once: true,
            },
            onUpdate: () => {
              stat.innerText = obj.val.toFixed(targetValue.includes('.') ? 2 : 0) + suffix;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 border-y border-border bg-background">
      <div ref={containerRef} className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8 md:gap-0">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-1 flex-col items-center text-center px-4 relative">
              <span className="stat-value font-playfair text-[56px] font-bold text-gold leading-tight">
                {m.value}
              </span>
              <span className="font-sans text-[14px] text-foreground/50 uppercase tracking-widest mt-1">
                {m.label}
              </span>
              
              {/* Vertical divider */}
              {i < metrics.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-crimson/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
