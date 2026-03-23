// src/components/TechStack/index.tsx
// Upgraded "The Stack" section.
// KEY CHANGES from previous version:
//   - Radar chart replaced with SystemPillars (4 architectural pillars)
//   - "Avg proficiency %" stat removed — subjective and junior-looking
//   - Stat row now shows: Technologies · Domains · Years
//   - Top-4 featured cards retain progress bars (useful for recruiters) but are
//     repositioned below the marquee, right column beside the pillars
//   - Full mobile responsiveness

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillMarquee } from './SkillMarquee';
import { SystemPillars } from '../SystemPillars';
import { SKILLS, CAT_META } from './constants';

gsap.registerPlugin(ScrollTrigger);

const rm = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TOP_4 = [...SKILLS].sort((a, b) => b.pct - a.pct).slice(0, 4);

// ── Animated count-up ────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (rm()) { el.textContent = String(target) + suffix; return; }
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
    });
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (rm()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.feat-bar').forEach(el => {
        gsap.to(el, {
          width: el.dataset.width,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-[80px] md:py-[100px] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-[#D4891A] mb-2.5">
            // Technology
          </p>
          <h2 className="font-playfair text-[clamp(32px,5vw,56px)] font-bold text-foreground leading-tight">
            The <em className="italic text-[#C41E3A]">Stack</em>
          </h2>
          <p className="text-[13px] md:text-[14px] text-muted-foreground mt-3 max-w-[360px] mx-auto leading-relaxed">
            Technologies grouped by the engineering pillar they serve.
          </p>
        </div>

        {/* ── Stat row — no subjective percentages ─────────────────── */}
        <div className="flex justify-center mb-10 md:mb-14">
          <div className="inline-flex border border-border rounded-2xl overflow-hidden divide-x divide-border">
            {[
              { target: SKILLS.length, suffix: '',  label: 'Technologies' },
              { target: 4,             suffix: '',  label: 'Pillars'      },
              { target: 10,            suffix: '+', label: 'Years'        },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center px-6 md:px-10 py-4 md:py-5 min-w-[90px] md:min-w-[120px]">
                <div className="font-playfair text-[24px] md:text-[28px] font-bold text-foreground leading-none">
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[8px] md:text-[9px] tracking-[.14em] uppercase text-muted-foreground/50 mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Marquee ───────────────────────────────────────────────── */}
        <div className="mb-12 md:mb-16">
          <SkillMarquee />
        </div>

        {/* ── System Pillars — replaces radar ───────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-10 items-start">

          {/* Left — pillars */}
          <div>
            <p className="font-mono text-[9px] tracking-[.16em] uppercase text-muted-foreground/50 mb-1">
              // System design pillars
            </p>
            <SystemPillars />
          </div>

          {/* Right — top-4 skills */}
          <div>
            <p className="font-mono text-[9px] tracking-[.16em] uppercase text-muted-foreground/50 mb-4">
              // Top skills
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TOP_4.map(s => {
                const meta = CAT_META[s.cat];
                return (
                  <div
                    key={s.id}
                    className="bg-card border border-border rounded-2xl p-[16px] transition-colors duration-200 hover:border-border/60"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-playfair text-[13px] font-bold text-foreground leading-tight">
                          {s.name}
                        </div>
                        <div
                          className="font-mono text-[8px] tracking-[.1em] uppercase mt-1"
                          style={{ color: meta.color }}
                        >
                          {meta.label}
                        </div>
                      </div>
                    </div>
                    {/* Thin bar — kept for scannability, no percentage number shown */}
                    <div className="h-[2px] bg-border rounded overflow-hidden">
                      <div
                        className="feat-bar h-full rounded"
                        data-width={s.pct + '%'}
                        style={{ width: 0, background: meta.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Domain legend */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {Object.entries(CAT_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-[5px] h-[5px] rounded-full" style={{ background: meta.color }} />
                  <span className="font-mono text-[8px] tracking-[.08em] uppercase text-muted-foreground/50">
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechStack;