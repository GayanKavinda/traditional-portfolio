import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aftermathImg from '@/assets/aftermath.png';

// Generate mock heatmap data
const generateData = () => {
  const data: number[][] = [];
  for (let col = 0; col < 52; col++) {
    const week: number[] = [];
    for (let row = 0; row < 7; row++) {
      const r = Math.random();
      if (r < 0.2) week.push(0);
      else if (r < 0.45) week.push(Math.floor(Math.random() * 3) + 1);
      else if (r < 0.7) week.push(Math.floor(Math.random() * 5) + 4);
      else if (r < 0.9) week.push(Math.floor(Math.random() * 7) + 9);
      else week.push(Math.floor(Math.random() * 10) + 16);
    }
    data.push(week);
  }
  return data;
};

const getColor = (n: number) => {
  if (n === 0) return 'rgba(255,255,255,0.04)';
  if (n <= 3) return 'rgba(192,39,45,0.2)';
  if (n <= 8) return 'rgba(192,39,45,0.55)';
  if (n <= 15) return 'rgba(200,100,32,0.65)';
  return 'rgba(232,168,32,0.9)';
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Mon', '', 'Wed', '', 'Fri', '', ''];
const langBars = [
  { name: 'TypeScript', pct: 78 }, { name: 'Python', pct: 52 },
  { name: 'Go', pct: 31 }, { name: 'Shell', pct: 24 },
];

const CodeCadence = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const data = useMemo(generateData, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current!, {
        y: -50, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
      gsap.from('.heatmap-col', {
        opacity: 0, stagger: 0.015, duration: 0.6, immediateRender: false,
        scrollTrigger: { trigger: heatmapRef.current!, start: 'top 80%', once: true }
      });
      gsap.from('.lang-bar-fill', {
        width: 0, stagger: 0.08, duration: 1, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: '.lang-bars', start: 'top 85%', once: true }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cellSize = 11;
  const gap = 4;

  return (
    <section ref={sectionRef} className="py-[100px] relative overflow-hidden">
      <img ref={bgRef} src={aftermathImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none z-0" />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(10,10,10,0.94)' }} />

      <div className="relative z-[2] max-w-[1100px] mx-auto px-10">
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// GitHub Activity</p>
          <h2 className="font-playfair text-[48px] text-bone mt-2">Code Cadence</h2>
        </div>

        {/* Heatmap */}
        <div className="relative">
          <svg ref={heatmapRef} width="100%" viewBox={`0 0 ${52 * (cellSize + gap) + 40} ${7 * (cellSize + gap) + 30}`}>
            {/* Month labels */}
            {months.map((m, i) => (
              <text key={m} x={40 + i * (52 / 12) * (cellSize + gap)} y={10} fill="rgba(245,240,232,0.4)" fontSize="10" fontFamily='"DM Mono", monospace'>{m}</text>
            ))}
            {/* Day labels */}
            {days.map((d, i) => (
              <text key={i} x={0} y={24 + i * (cellSize + gap) + cellSize / 2 + 3} fill="rgba(245,240,232,0.4)" fontSize="10" fontFamily='"DM Mono", monospace'>{d}</text>
            ))}
            {/* Cells */}
            {data.map((week, col) => (
              <g key={col} className="heatmap-col">
                {week.map((val, row) => (
                  <rect
                    key={`${col}-${row}`}
                    x={40 + col * (cellSize + gap)}
                    y={20 + row * (cellSize + gap)}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    fill={getColor(val)}
                    className="cursor-pointer"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltip({ x: rect.left, y: rect.top - 40, text: `${val} contributions` });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </g>
            ))}
          </svg>
          {tooltip && (
            <div className="fixed rounded-md border border-white/10 px-3 py-2 font-mono text-[12px] text-bone z-50 pointer-events-none" style={{ left: tooltip.x, top: tooltip.y, background: '#1A1A1A' }}>
              {tooltip.text}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[{ num: '2,847', label: 'TOTAL COMMITS' }, { num: 'TypeScript', label: 'TOP LANGUAGE' }, { num: '47 days', label: 'LONGEST STREAK' }].map(s => (
            <div key={s.label} className="rounded-lg border border-white/[0.07] p-5" style={{ background: '#111' }}>
              <p className="font-playfair text-[36px] text-gold">{s.num}</p>
              <p className="font-mono text-[11px] text-bone/50 uppercase">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Language bars */}
        <div className="lang-bars grid grid-cols-2 gap-4 mt-8">
          {langBars.map(l => (
            <div key={l.name}>
              <div className="flex justify-between">
                <span className="font-mono text-[13px] text-bone">{l.name}</span>
                <span className="font-mono text-[13px] text-gold">{l.pct}%</span>
              </div>
              <div className="mt-2 h-[2px] rounded-[1px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="lang-bar-fill h-full rounded-[1px] bg-crimson" style={{ width: `${l.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodeCadence;
