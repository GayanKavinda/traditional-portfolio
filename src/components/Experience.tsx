import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import crowdImg from '@/assets/crowd.png';

interface Entry {
  company: string; role: string; period: string; year: string;
  bullets: string[]; tags: string[]; current?: boolean;
}

const entries: Entry[] = [
  {
    company: 'TechCorp Global', role: 'Senior Software Engineer', period: '2022 — Present', year: '2022',
    bullets: ['Led migration of monolith to microservices serving 2M+ users', 'Designed event-driven architecture reducing latency by 40%', 'Mentored team of 6 engineers on distributed systems patterns'],
    tags: ['Go', 'Kafka', 'K8s', 'AWS'], current: true,
  },
  {
    company: 'DataFlow Systems', role: 'Software Engineer II', period: '2020 — 2022', year: '2020',
    bullets: ['Built real-time data pipeline processing 500K events/sec', 'Implemented CI/CD reducing deployment time by 60%', 'Architected PostgreSQL sharding strategy for 10TB+ dataset'],
    tags: ['Python', 'PostgreSQL', 'Docker', 'Redis'],
  },
  {
    company: 'WebScale Inc', role: 'Full Stack Developer', period: '2018 — 2020', year: '2018',
    bullets: ['Developed React dashboard used by 50K+ daily active users', 'Created GraphQL API layer consolidating 12 REST endpoints', 'Optimized bundle size by 45% through code splitting'],
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  },
  {
    company: 'StartupLab', role: 'Junior Developer', period: '2016 — 2018', year: '2016',
    bullets: ['Shipped 3 production apps from concept to launch', 'Introduced automated testing increasing coverage to 85%', 'Built responsive UI components used across 4 products'],
    tags: ['JavaScript', 'React', 'Express', 'MongoDB'],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      entryRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          x: i % 2 === 0 ? -60 : 60, opacity: 0, duration: 0.8, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { trigger: el, start: 'top 82%' }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-[120px] relative overflow-hidden">
      <img src={crowdImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none z-0" style={{ mixBlendMode: 'multiply' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(10,10,10,0.92)' }} />

      <div className="relative z-[2] text-center mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Career</p>
        <h2 className="font-playfair text-[48px] text-bone mt-2">Experience</h2>
      </div>

      <div className="relative z-[2] max-w-[900px] mx-auto px-10">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(192,39,45,0.3)' }} />

        {entries.map((e, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={e.company} className="relative mb-16" ref={el => { entryRefs.current[i] = el; }}>
              {/* Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-crimson z-10" style={{ top: 20 }} />
              <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] text-gold z-10" style={{ top: 36 }}>{e.year}</div>

              <div className={`w-[44%] ${isLeft ? 'mr-auto pr-10 text-right' : 'ml-auto pl-10'}`}>
                <div
                  className={`rounded-lg border border-white/[0.07] p-5 ${e.current ? 'border-l-[3px] border-l-crimson border-crimson/35' : ''}`}
                  style={{ background: '#111' }}
                >
                  <p className="font-mono text-[13px] text-gold">{e.company}</p>
                  <p className="font-playfair text-[18px] text-bone mt-1">{e.role}</p>
                  <p className="font-mono text-[11px] text-bone/40">{e.period}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.bullets.map((b, j) => (
                      <li key={j} className={`font-sans text-[14px] text-bone/65 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <span className="text-crimson mr-1.5">›</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className={`flex gap-[6px] mt-3 flex-wrap ${isLeft ? 'justify-end' : ''}`}>
                    {e.tags.map(t => (
                      <span key={t} className="font-mono text-[11px] text-crimson border border-crimson/25 bg-crimson/[0.12] px-[10px] py-[3px] rounded-[3px]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
