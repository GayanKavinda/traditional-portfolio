// src/components/EngineeringPhilosophy.tsx
// "How I Work" — proves senior wisdom beyond raw skill.
// 4 numbered principles with Playfair Display headings and prose descriptions.
// Separating dividers use the Crimson/Gold palette.
// Mobile: stacked. Desktop: 2x2 grid.
// Add to Home.tsx between About and Certifications.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: '01',
    title: 'Observability-first',
    body: 'If you can\'t measure it, you can\'t improve it. I instrument from day one — distributed traces, structured logs, Prometheus metrics — so production is never a black box. Dashboards before features.',
    color: '#C41E3A',
  },
  {
    num: '02',
    title: 'Simplicity over cleverness',
    body: 'The best code is code your team can debug at 3am during an incident. Boring technology for boring problems. Complexity only where it genuinely earns its place. Readable over clever, always.',
    color: '#D4891A',
  },
  {
    num: '03',
    title: 'Test at the boundaries',
    body: 'Integration tests over unit tests for distributed systems. Mock at the network boundary, not inside your domain. Fast feedback loops that actually catch production bugs before they reach users.',
    color: '#C41E3A',
  },
  {
    num: '04',
    title: 'Design for failure',
    body: 'Every external call can fail. Every database can go down. Circuit breakers, bulkheads, retry budgets, and graceful degradation are first-class architectural concerns — never afterthoughts.',
    color: '#D4891A',
  },
];

const EngineeringPhilosophy = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-card', {
        y: 24, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={ref} className="py-[80px] md:py-[100px] bg-background">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-[#D4891A] mb-2.5">
            // Engineering Philosophy
          </p>
          <h2 className="font-playfair text-[clamp(30px,5vw,48px)] font-bold text-foreground leading-tight">
            How I <em className="italic text-[#C41E3A]">Work</em>
          </h2>
          <p className="text-[14px] text-muted-foreground mt-3 max-w-[400px] mx-auto leading-relaxed">
            Principles I've earned through production incidents, architecture reviews, and a decade of shipping.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {PRINCIPLES.map(p => (
            <div
              key={p.num}
              className="phil-card group relative bg-card border border-border rounded-2xl p-6 md:p-7
                         transition-all duration-200 hover:border-border/60 overflow-hidden"
            >
              {/* Subtle left accent on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: p.color }}
              />

              {/* Number */}
              <div
                className="font-mono text-[11px] tracking-[.12em] mb-4"
                style={{ color: p.color }}
              >
                {p.num}
              </div>

              {/* Title */}
              <h3 className="font-playfair text-[18px] md:text-[20px] font-bold text-foreground mb-3 leading-tight">
                {p.title}
              </h3>

              {/* Body */}
              <p className="font-sans text-[13px] md:text-[14px] text-muted-foreground leading-[1.7]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPhilosophy;