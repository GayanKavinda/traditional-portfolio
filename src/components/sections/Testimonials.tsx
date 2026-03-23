// src/components/Testimonials.tsx
// Social proof — the biggest missing piece per the AI Studio review.
// Quote cards with large opening quotation mark in Crimson, avatar initials, role.
// Mobile: stacked single-column. Desktop: 2-column grid.
// Add to Home.tsx just before ImpactMetrics.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: 'Gara is the engineer we call when distributed systems are on fire. Within 24 hours he had identified a cascading failure in our Kafka consumer group that was costing us $40K per day.',
    name: 'Arjun Rao',
    role: 'CTO · DataFlow Systems',
    initials: 'AR',
    color: '#C41E3A',
  },
  {
    quote: 'Rare combination of deep systems thinking and pragmatic execution. Gara architected our migration from monolith to microservices with zero downtime across 2M active users.',
    name: 'Sarah Mitchell',
    role: 'VP Engineering · TechCorp Global',
    initials: 'SM',
    color: '#D4891A',
  },
  {
    quote: 'He doesn\'t just write code — he understands the problem at a business level first. That instinct saved us from over-engineering a solution that would have taken 3× as long to build.',
    name: 'David Chen',
    role: 'Principal Engineer · WebScale Inc',
    initials: 'DC',
    color: '#C41E3A',
  },
  {
    quote: 'Gara introduced us to observability-first development. Six months later we reduced MTTR from 4 hours to 12 minutes. That shift alone was worth more than any feature we shipped that year.',
    name: 'Priya Kumar',
    role: 'Engineering Director · StartupLab',
    initials: 'PK',
    color: '#D4891A',
  },
];

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-card', {
        y: 24, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={ref} className="py-[80px] md:py-[100px] bg-background">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-mono text-[10px] tracking-[.18em] uppercase text-[#D4891A] mb-2.5">
            // Social Proof
          </p>
          <h2 className="font-playfair text-[clamp(30px,5vw,48px)] font-bold text-foreground leading-tight">
            What People <em className="italic text-[#C41E3A]">Say</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testi-card group relative bg-card border border-border rounded-2xl p-6 md:p-7
                         transition-all duration-200 hover:border-border/60 overflow-hidden"
            >
              {/* Giant opening quote mark */}
              <div
                className="absolute top-3 left-5 font-playfair text-[72px] leading-none select-none pointer-events-none"
                style={{ color: t.color, opacity: 0.15 }}
                aria-hidden
              >
                "
              </div>

              {/* Quote */}
              <blockquote className="font-playfair italic text-[14px] md:text-[15px] text-foreground leading-[1.7] mb-5 pt-6 relative z-10">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-[11px] font-medium text-white shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                  }}
                >
                  {t.initials}
                </div>

                <div>
                  <p className="font-mono text-[12px] font-medium text-foreground">{t.name}</p>
                  <p className="font-mono text-[9px] tracking-[.06em] text-muted-foreground/60 mt-0.5">{t.role}</p>
                </div>

                {/* Accent bar right edge */}
                <div
                  className="ml-auto w-5 h-[2px] rounded opacity-40 group-hover:opacity-80 group-hover:w-8 transition-all duration-300"
                  style={{ background: t.color }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;