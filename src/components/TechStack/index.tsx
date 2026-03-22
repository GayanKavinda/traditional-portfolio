// src/components/TechStack/index.tsx
// Layout (top → bottom):
//   1. Header — eyebrow + Playfair title + subtitle
//   2. Stat counter row (avg %, count, domains)
//   3. SkillMarquee — full-width, row 1 left / row 2 right
//   4. Two-column grid:
//        Left  — radar chart with category filter pills + legend
//        Right — top-4 featured skill cards

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechGraph } from './TechGraph';
import { SkillMarquee } from './SkillMarquee';
import { SKILLS, CAT_META } from './constants';

gsap.registerPlugin(ScrollTrigger);

const rm = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const AVG   = Math.round(SKILLS.reduce((a, s) => a + s.pct, 0) / SKILLS.length);
const TOP_4 = [...SKILLS].sort((a, b) => b.pct - a.pct).slice(0, 4);

// ── Animated count-up number ─────────────────────────────────────────────────
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

  // Animate feat-bar fills on scroll
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
    <section id="skills" ref={sectionRef} className="py-[100px] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 md:px-12">

        {/* ── 1. Header ────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-[#D4891A] mb-2.5">
            // proficiency map
          </p>
          <h2 className="font-playfair text-[clamp(38px,5vw,58px)] font-bold text-foreground leading-tight">
            The <em className="italic text-[#C41E3A]">Stack</em>
          </h2>
          <p className="text-[14px] text-muted-foreground mt-3 max-w-[360px] mx-auto leading-relaxed">
            Technologies I reach for — mapped by category and proficiency.
          </p>
        </div>

        {/* ── 2. Stat row — bordered pill container ────────────────── */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex border border-border rounded-2xl overflow-hidden divide-x divide-border">
            {[
              { target: AVG,            suffix: '%', label: 'avg proficiency' },
              { target: SKILLS.length,  suffix: '',  label: 'technologies'    },
              { target: 4,              suffix: '',  label: 'domains'          },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center px-10 py-5 min-w-[120px]">
                <div className="font-playfair text-[28px] font-bold text-foreground leading-none">
                  <CountUp target={s.target} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[9px] tracking-[.14em] uppercase text-muted-foreground/50 mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Marquee — full width, above grid ──────────────────── */}
        <div className="mb-16">
          <SkillMarquee />
        </div>

        {/* ── 4. Grid: radar left, featured cards right ────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left — radar */}
          <TechGraph />

          {/* Right — top-4 featured skill cards */}
          <div>
            <p className="font-mono text-[9px] tracking-[.16em] uppercase text-muted-foreground/50 mb-4">
              // top skills
            </p>

            <div className="grid grid-cols-2 gap-3">
              {TOP_4.map(s => {
                const meta = CAT_META[s.cat];
                return (
                  <div
                    key={s.id}
                    className="bg-card border border-border rounded-2xl p-[18px] transition-colors duration-200 hover:border-border/60"
                  >
                    <div className="flex items-start justify-between mb-3.5">
                      <div>
                        <div className="font-playfair text-[14px] font-bold text-foreground leading-tight">
                          {s.name}
                        </div>
                        <div
                          className="font-mono text-[8px] tracking-[.1em] uppercase mt-1"
                          style={{ color: meta.color }}
                        >
                          {meta.label}
                        </div>
                      </div>
                      <div className="font-playfair text-[24px] font-bold text-foreground leading-none">
                        {s.pct}
                        <span className="text-[11px] text-muted-foreground/40">%</span>
                      </div>
                    </div>

                    {/* Progress bar */}
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
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {Object.entries(CAT_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-[6px] h-[6px] rounded-full" style={{ background: meta.color }} />
                  <span className="font-mono text-[9px] tracking-[.08em] uppercase text-muted-foreground/50">
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