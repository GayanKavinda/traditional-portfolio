// src/components/EngineeringPhilosophy.tsx
// "How I Work" — 4 cards in one horizontal row, matching "How We Get Things Done" layout.
// Each card: animated SVG mockup on top, step label, bold title, body, pill tags.
// Crimson / Gold palette. Playfair Display headings. GSAP scroll animation.

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated SVG Mockups ────────────────────────────────────────────────────

const ObservabilityMockup = () => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full" style={{ display: 'block' }}>
    <style>{`
      @keyframes obs-line {
        0%   { stroke-dashoffset: 300; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes obs-pulse {
        0%, 100% { opacity: 0.5; }
        50%       { opacity: 1; }
      }
      @keyframes obs-bar {
        from { transform: scaleY(0); }
        to   { transform: scaleY(1); }
      }
      .obs-sparkline  { stroke-dasharray: 300; animation: obs-line 1.8s ease-out forwards; }
      .obs-sparkline2 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: obs-line 2.2s ease-out 0.3s forwards; }
      .obs-dot  { animation: obs-pulse 2s ease-in-out infinite; }
      .obs-bar1 { transform-origin: 50% 100%; animation: obs-bar 0.6s ease-out 0.4s both; }
      .obs-bar2 { transform-origin: 50% 100%; animation: obs-bar 0.6s ease-out 0.6s both; }
      .obs-bar3 { transform-origin: 50% 100%; animation: obs-bar 0.6s ease-out 0.8s both; }
      .obs-bar4 { transform-origin: 50% 100%; animation: obs-bar 0.6s ease-out 1.0s both; }
      .obs-bar5 { transform-origin: 50% 100%; animation: obs-bar 0.6s ease-out 1.2s both; }
    `}</style>
    <rect width="280" height="160" rx="10" fill="#f9f9fb"/>
    <rect width="280" height="28" rx="10" fill="#fff"/>
    <rect y="18" width="280" height="10" fill="#fff"/>
    <circle cx="16" cy="14" r="4" fill="#C41E3A" opacity="0.7" className="obs-dot"/>
    <rect x="26" y="10" width="50" height="8" rx="3" fill="#ececec"/>
    <rect x="218" y="10" width="44" height="8" rx="3" fill="#D4891A" opacity="0.22"/>
    <rect x="10" y="36" width="72" height="30" rx="6" fill="#fff" stroke="#ececec" strokeWidth="0.8"/>
    <rect x="14" y="42" width="28" height="4" rx="2" fill="#ddd"/>
    <rect x="14" y="50" width="44" height="8" rx="3" fill="#C41E3A" opacity="0.72"/>
    <rect x="92" y="36" width="72" height="30" rx="6" fill="#fff" stroke="#ececec" strokeWidth="0.8"/>
    <rect x="96" y="42" width="28" height="4" rx="2" fill="#ddd"/>
    <rect x="96" y="50" width="44" height="8" rx="3" fill="#D4891A" opacity="0.62"/>
    <rect x="174" y="36" width="72" height="30" rx="6" fill="#fff" stroke="#ececec" strokeWidth="0.8"/>
    <rect x="178" y="42" width="28" height="4" rx="2" fill="#ddd"/>
    <rect x="178" y="50" width="44" height="8" rx="3" fill="#22c55e" opacity="0.62"/>
    <rect x="10" y="76" width="260" height="72" rx="6" fill="#fff" stroke="#ececec" strokeWidth="0.8"/>
    <rect className="obs-bar1" x="24"  y="108" width="16" height="28" rx="2" fill="#C41E3A" opacity="0.58"/>
    <rect className="obs-bar2" x="50"  y="100" width="16" height="36" rx="2" fill="#C41E3A" opacity="0.72"/>
    <rect className="obs-bar3" x="76"  y="92"  width="16" height="44" rx="2" fill="#C41E3A" opacity="0.82"/>
    <rect className="obs-bar4" x="102" y="98"  width="16" height="38" rx="2" fill="#C41E3A" opacity="0.68"/>
    <rect className="obs-bar5" x="128" y="88"  width="16" height="48" rx="2" fill="#C41E3A" opacity="0.88"/>
    <polyline className="obs-sparkline"
      points="20,130 46,118 72,110 98,115 124,105 150,112 176,98 202,106 228,94 254,100"
      stroke="#D4891A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline className="obs-sparkline2"
      points="20,136 46,132 72,128 98,130 124,124 150,128 176,120 202,124 228,118 254,121"
      stroke="#D4891A" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2"/>
  </svg>
);

const SimplicityMockup = () => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full" style={{ display: 'block' }}>
    <style>{`
      @keyframes sim-fade { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
      @keyframes sim-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
      .sim-line1 { animation: sim-fade 0.4s ease-out 0.1s both; }
      .sim-line2 { animation: sim-fade 0.4s ease-out 0.3s both; }
      .sim-line3 { animation: sim-fade 0.4s ease-out 0.5s both; }
      .sim-line4 { animation: sim-fade 0.4s ease-out 0.7s both; }
      .sim-line5 { animation: sim-fade 0.4s ease-out 0.9s both; }
      .sim-line6 { animation: sim-fade 0.4s ease-out 1.1s both; }
      .sim-cursor { animation: sim-cursor 1s step-end infinite 1.3s; }
    `}</style>
    <rect width="280" height="160" rx="10" fill="#1a1b26"/>
    <rect width="280" height="24" rx="10" fill="#24253a"/>
    <rect y="14" width="280" height="10" fill="#24253a"/>
    <circle cx="18" cy="12" r="4" fill="#ff5f57"/>
    <circle cx="32" cy="12" r="4" fill="#febc2e"/>
    <circle cx="46" cy="12" r="4" fill="#28c840"/>
    <rect x="96" y="8" width="88" height="8" rx="3" fill="#32334a"/>
    <g className="sim-line1">
      <rect x="14" y="33" width="18" height="6" rx="2" fill="#C41E3A" opacity="0.85"/>
      <rect x="38" y="33" width="50" height="6" rx="2" fill="#D4891A" opacity="0.8"/>
      <rect x="94" y="33" width="34" height="6" rx="2" fill="#7ec8a0" opacity="0.7"/>
    </g>
    <g className="sim-line2">
      <rect x="24" y="47" width="14" height="6" rx="2" fill="#7ec8a0" opacity="0.6"/>
      <rect x="44" y="47" width="70" height="6" rx="2" fill="#8888b0"/>
      <rect x="120" y="47" width="28" height="6" rx="2" fill="#C41E3A" opacity="0.55"/>
    </g>
    <g className="sim-line3">
      <rect x="24" y="61" width="90" height="6" rx="2" fill="#8888b0"/>
      <rect x="120" y="61" width="46" height="6" rx="2" fill="#D4891A" opacity="0.6"/>
    </g>
    <g className="sim-line4">
      <rect x="14" y="75" width="14" height="6" rx="2" fill="#7ec8a0" opacity="0.6"/>
      <rect x="34" y="75" width="38" height="6" rx="2" fill="#8888b0"/>
    </g>
    <g className="sim-line5">
      <rect x="14" y="89" width="18" height="6" rx="2" fill="#C41E3A" opacity="0.7"/>
      <rect x="38" y="89" width="56" height="6" rx="2" fill="#D4891A" opacity="0.65"/>
      <rect x="100" y="89" width="40" height="6" rx="2" fill="#8888b0"/>
    </g>
    <g className="sim-line6">
      <rect x="24" y="103" width="80" height="6" rx="2" fill="#8888b0"/>
      <rect x="110" y="103" width="22" height="6" rx="2" fill="#7ec8a0" opacity="0.6"/>
    </g>
    <rect x="160" y="101" width="100" height="14" rx="5" fill="#D4891A" opacity="0.12"/>
    <rect x="166" y="104" width="60" height="5" rx="2" fill="#D4891A" opacity="0.5"/>
    <rect className="sim-cursor" x="134" y="103" width="2" height="8" rx="1" fill="#fff" opacity="0.7"/>
    <rect x="0" y="148" width="280" height="12" fill="#1e1f30"/>
    <rect x="10" y="151" width="30" height="5" rx="2" fill="#22c55e" opacity="0.45"/>
    <rect x="220" y="151" width="44" height="5" rx="2" fill="#8888b0" opacity="0.5"/>
  </svg>
);

const TestingMockup = () => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full" style={{ display: 'block' }}>
    <style>{`
      @keyframes tst-row { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
      @keyframes tst-prog { from { width:0; } to { } }
      .tst-r1 { animation: tst-row 0.3s ease-out 0.1s both; }
      .tst-r2 { animation: tst-row 0.3s ease-out 0.3s both; }
      .tst-r3 { animation: tst-row 0.3s ease-out 0.5s both; }
      .tst-r4 { animation: tst-row 0.3s ease-out 0.7s both; }
      .tst-r5 { animation: tst-row 0.3s ease-out 0.9s both; }
    `}</style>
    <rect width="280" height="160" rx="10" fill="#f6faf6"/>
    <rect width="280" height="26" rx="10" fill="#fff"/>
    <rect y="16" width="280" height="10" fill="#fff"/>
    <rect x="12" y="9" width="60" height="7" rx="3" fill="#e0e0e0"/>
    <rect x="202" y="8" width="66" height="10" rx="5" fill="#22c55e" opacity="0.18"/>
    <rect x="214" y="10" width="42" height="5" rx="2" fill="#22c55e" opacity="0.7"/>
    {([
      { cls: 'tst-r1', y: 35,  pass: true,  w: 80 },
      { cls: 'tst-r2', y: 52,  pass: true,  w: 100 },
      { cls: 'tst-r3', y: 69,  pass: false, w: 92 },
      { cls: 'tst-r4', y: 86,  pass: true,  w: 76 },
      { cls: 'tst-r5', y: 103, pass: true,  w: 110 },
    ] as { cls: string; y: number; pass: boolean; w: number }[]).map((r, i) => (
      <g key={i} className={r.cls}>
        <circle cx="22" cy={r.y + 6} r="6"
          fill={r.pass ? '#22c55e' : '#C41E3A'} opacity={r.pass ? 0.8 : 0.85}/>
        {r.pass
          ? <polyline
              points={`${18},${r.y+6} ${21},${r.y+9} ${26},${r.y+3}`}
              stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          : <>
              <line x1="18" y1={r.y+3} x2="26" y2={r.y+9} stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="26" y1={r.y+3} x2="18" y2={r.y+9} stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </>}
        <rect x="36" y={r.y+2} width={r.w} height="6" rx="2" fill="#d0d0d0" opacity="0.85"/>
        <rect x={r.w + 44} y={r.y+2} width={r.pass ? 30 : 48} height="6" rx="2"
          fill={r.pass ? '#D4891A' : '#C41E3A'} opacity="0.4"/>
        <rect x="236" y={r.y+2} width="34" height="6" rx="2" fill="#e8e8e8"/>
      </g>
    ))}
    <rect x="12" y="128" width="256" height="6" rx="3" fill="#e8e8e8"/>
    <rect x="12" y="128" width="200" height="6" rx="3" fill="#22c55e" opacity="0.55"/>
    <rect x="12"  y="140" width="40" height="5" rx="2" fill="#22c55e" opacity="0.4"/>
    <rect x="58"  y="140" width="30" height="5" rx="2" fill="#C41E3A" opacity="0.4"/>
    <rect x="94"  y="140" width="50" height="5" rx="2" fill="#d0d0d0"/>
  </svg>
);

const FailureMockup = () => (
  <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full" style={{ display: 'block' }}>
    <defs>
      <marker id="fa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
      <marker id="fad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="#C41E3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </marker>
    </defs>
    <style>{`
      @keyframes fail-flash { 0%,100%{opacity:.85} 50%{opacity:.32} }
      @keyframes fail-flow  { from{stroke-dashoffset:24} to{stroke-dashoffset:0} }
      @keyframes fail-slide { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      .fail-broken { animation: fail-flash 1.4s ease-in-out infinite; }
      .fail-arrow1 { animation: fail-flow 0.8s ease-out 0.2s both; }
      .fail-arrow2 { stroke-dasharray:6 4; animation: fail-flow 1.0s ease-out 0.6s both; }
      .fail-badge  { animation: fail-slide 0.4s ease-out 1.2s both; }
      .fail-badge2 { animation: fail-slide 0.4s ease-out 1.35s both; }
      .fail-badge3 { animation: fail-slide 0.4s ease-out 1.5s both; }
    `}</style>
    <rect width="280" height="160" rx="10" fill="#fff9f7"/>
    <rect width="280" height="26" rx="10" fill="#fff"/>
    <rect y="16" width="280" height="10" fill="#fff"/>
    <rect x="12" y="9" width="72" height="7" rx="3" fill="#ffe0d4"/>
    <rect x="238" y="7" width="32" height="12" rx="5" fill="#C41E3A" opacity="0.12"/>
    <rect x="244" y="10" width="20" height="5" rx="2" fill="#C41E3A" opacity="0.45"/>
    {/* Node A */}
    <rect x="12" y="42" width="64" height="36" rx="7" fill="#fff" stroke="#D4891A" strokeWidth="1.2"/>
    <rect x="18" y="50" width="40" height="5" rx="2" fill="#D4891A" opacity="0.45"/>
    <rect x="18" y="60" width="28" height="5" rx="2" fill="#e0e0e0"/>
    {/* Arrow A→B */}
    <line className="fail-arrow1" x1="78" y1="60" x2="102" y2="60"
      stroke="#ccc" strokeWidth="1.5" markerEnd="url(#fa)"/>
    {/* Node B — broken */}
    <g className="fail-broken">
      <rect x="104" y="42" width="64" height="36" rx="7" fill="#fff5f5"
        stroke="#C41E3A" strokeWidth="1.2" strokeDasharray="4 2"/>
      <rect x="110" y="50" width="40" height="5" rx="2" fill="#C41E3A" opacity="0.45"/>
      <rect x="110" y="60" width="28" height="5" rx="2" fill="#e0e0e0"/>
      <text x="157" y="51" fontSize="11" fill="#C41E3A" fontFamily="monospace">✕</text>
    </g>
    {/* Arrow B→C dashed */}
    <line className="fail-arrow2" x1="170" y1="60" x2="194" y2="60"
      stroke="#C41E3A" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#fad)"/>
    {/* Node C — fallback */}
    <rect x="196" y="42" width="72" height="36" rx="7" fill="#f6fff6" stroke="#22c55e" strokeWidth="1.2"/>
    <rect x="202" y="50" width="44" height="5" rx="2" fill="#22c55e" opacity="0.45"/>
    <rect x="202" y="60" width="28" height="5" rx="2" fill="#e0e0e0"/>
    <text x="252" y="51" fontSize="11" fill="#22c55e" fontFamily="monospace">↩</text>
    {/* Badges */}
    <g className="fail-badge">
      <rect x="12" y="92" width="64" height="16" rx="6" fill="#D4891A" opacity="0.1"
        stroke="#D4891A" strokeWidth="0.8" strokeOpacity="0.3"/>
      <rect x="18" y="97" width="44" height="5" rx="2" fill="#D4891A" opacity="0.4"/>
    </g>
    <g className="fail-badge2">
      <rect x="90" y="92" width="92" height="16" rx="6" fill="#C41E3A" opacity="0.08"
        stroke="#C41E3A" strokeWidth="0.8" strokeOpacity="0.2"/>
      <rect x="96" y="97" width="60" height="5" rx="2" fill="#C41E3A" opacity="0.35"/>
    </g>
    <g className="fail-badge3">
      <rect x="196" y="92" width="72" height="16" rx="6" fill="#22c55e" opacity="0.1"
        stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.25"/>
      <rect x="202" y="97" width="52" height="5" rx="2" fill="#22c55e" opacity="0.4"/>
    </g>
    {/* Status row */}
    <rect x="12"  y="122" width="16" height="16" rx="4" fill="#22c55e" opacity="0.15"/>
    <rect x="14"  y="126" width="10" height="5"  rx="2" fill="#22c55e" opacity="0.6"/>
    <rect x="36"  y="124" width="80" height="5"  rx="2" fill="#e0e0e0"/>
    <rect x="36"  y="133" width="60" height="5"  rx="2" fill="#eee"/>
    <rect x="202" y="122" width="66" height="16" rx="6" fill="#C41E3A" opacity="0.07"/>
    <rect x="208" y="127" width="48" height="5"  rx="2" fill="#C41E3A" opacity="0.3"/>
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    num: 'STEP 1',
    color: '#C41E3A',
    title: 'Observability-first',
    body: "If you can't measure it, you can't improve it. I instrument from day one. Distributed traces, structured logs, Prometheus metrics, so production is never a black box.",
    tags: ['Distributed traces', 'Prometheus metrics', 'Dashboards first'],
    Mockup: ObservabilityMockup,
  },
  {
    num: 'STEP 2',
    color: '#D4891A',
    title: 'Simplicity over cleverness',
    body: "The best code is what your team can debug at 3am in an incident. Boring technology for boring problems. Complexity only where it genuinely earns its place.",
    tags: ['Readable over clever', 'Boring tech', 'Team-debuggable'],
    Mockup: SimplicityMockup,
  },
  {
    num: 'STEP 3',
    color: '#C41E3A',
    title: 'Test at the boundaries',
    body: "Integration tests over unit tests for distributed systems. Mock at the network boundary, not inside your domain. Fast feedback loops that catch production bugs early.",
    tags: ['Integration tests', 'Network mocks', 'Fast feedback'],
    Mockup: TestingMockup,
  },
  {
    num: 'STEP 4',
    color: '#D4891A',
    title: 'Design for failure',
    body: "Every external call can fail. Circuit breakers, bulkheads, retry budgets, and graceful degradation are first-class architectural concerns, never afterthoughts.",
    tags: ['Circuit breakers', 'Retry budgets', 'Graceful degradation'],
    Mockup: FailureMockup,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const EngineeringPhilosophy = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-step', {
        y: 28,
        opacity: 0,
        stagger: 0.13,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={ref} className="py-[80px] md:py-[100px] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-1.5 mb-4">
            <span className="text-[10px] font-mono tracking-widest text-[#D4891A]">▶▶</span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
              Engineering Philosophy
            </span>
          </div>
          <h2 className="font-jakarta font-extrabold text-[clamp(30px,5vw,50px)] text-foreground leading-tight tracking-tight">
            How I <em className="font-playfair italic font-medium text-[#C41E3A]">Work</em>
          </h2>
          <p className="text-[14px] text-muted-foreground mt-3 max-w-[460px] mx-auto leading-relaxed">
            Principles I've earned through production incidents, architecture reviews, and a decade of shipping.
          </p>
        </div>

        {/* ── 4-column row — same structure as the screenshot ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 items-start">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="phil-step flex flex-col gap-4">

              {/* Visual mockup — matches screenshot image area */}
              <div
                className="w-full rounded-xl overflow-hidden border border-border bg-muted/30"
                style={{ aspectRatio: '4/3' }}
              >
                <p.Mockup />
              </div>

              {/* Step label */}
              <p
                className="font-mono text-[11px] font-semibold tracking-[.14em] uppercase"
                style={{ color: p.color }}
              >
                {p.num}
              </p>

              {/* Title */}
              <h3 className="font-jakarta text-[18px] md:text-[19px] font-bold text-foreground leading-snug -mt-2 tracking-tight">
                {p.title}
              </h3>

              {/* Body */}
              <p className="font-sans text-[13px] text-muted-foreground leading-[1.75]">
                {p.body}
              </p>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-2 mt-auto pt-1">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-sans text-foreground/65 border border-border rounded-full px-3 py-1 bg-muted/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EngineeringPhilosophy;