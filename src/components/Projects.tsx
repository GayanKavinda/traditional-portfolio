import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const heroProject = {
  name: 'Distributed Task Engine',
  desc: 'High-throughput task orchestration system handling 10M+ daily events',
  tags: ['Go', 'Kafka', 'Redis', 'K8s'],
  image: null,
};

const microProjects = [
  { name: 'AuthShield', tech: 'TypeScript', desc: 'Zero-trust auth SDK' },
  { name: 'DataPipe', tech: 'Python', desc: 'Real-time ETL pipeline' },
  { name: 'CloudDash', tech: 'React', desc: 'Infrastructure monitor' },
  { name: 'APIForge', tech: 'Go', desc: 'API gateway framework' },
];

const sideProject = {
  name: 'Real-time Analytics Platform',
  desc: 'WebSocket-driven dashboard with D3 visualizations',
  tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
};

const LinkBtn = ({ icon, text, color }: { icon: string; text: string; color: string }) => (
  <button className={`font-mono text-[12px] hover:underline transition-colors ${color}`}>
    {icon} {text}
  </button>
);

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
    gsap.from('.project-card', {
        y: 70, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: ref.current!, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-[100px] mt-[-60px] relative z-20" style={{ background: '#0A0A0A' }}>
      <div className="text-center mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Featured Work</p>
        <h2 className="font-playfair text-[48px] text-bone mt-2">Selected Work</h2>
        <div className="w-[60px] h-[2px] bg-crimson mx-auto mt-4" />
      </div>

      <div className="max-w-[1200px] mx-auto px-10">
        {/* Hero card */}
        <div className="project-card rounded-xl border border-white/[0.07] overflow-hidden hover:border-crimson/40 hover:-translate-y-[3px] transition-all duration-300" style={{ background: '#111' }}>
          <div className="h-[280px] overflow-hidden relative" style={{ 
            background: 'linear-gradient(135deg, #161616 0%, #1a0a0a 50%, #0f0f1a 100%)',
          }}>
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(rgba(192,39,45,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,39,45,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} 
            />
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-crimson hover-line transition-all duration-500" />
            <div className="w-full h-full flex items-center justify-center font-mono text-[13px] text-bone/20 z-10">
              [ Project Screenshot ]
            </div>
            <div className="absolute bottom-4 right-6 font-playfair text-[80px] font-black text-crimson/[0.06] leading-none select-none">
              01
            </div>
          </div>
          <div className="p-7 flex justify-between items-start">
            <div>
              <h3 className="font-playfair text-[24px] text-bone">{heroProject.name}</h3>
              <p className="font-sans text-[15px] text-bone/50 mt-1">{heroProject.desc}</p>
              <div className="flex gap-[6px] mt-3 flex-wrap">
                {heroProject.tags.map(t => (
                  <span key={t} className="font-mono text-[11px] text-crimson border border-crimson/25 bg-crimson/[0.12] px-[10px] py-[3px] rounded-[3px]">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <LinkBtn icon="↗" text="Live Demo" color="text-crimson" />
              <LinkBtn icon="{ }" text="GitHub" color="text-bone/50 hover:text-gold" />
              <LinkBtn icon="📄" text="Case Study" color="text-gold" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* Micro grid */}
          <div className="project-card rounded-xl border border-white/[0.07] p-6" style={{ background: '#111' }}>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[11px] uppercase text-gold">Recent Projects</span>
              <span className="font-mono text-[11px] text-bone/40">4 projects</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {microProjects.map((p, idx) => (
                <div key={p.name} className="group/tile rounded-lg border border-white/[0.06] p-[14px] cursor-pointer hover:border-crimson/35 hover:bg-crimson/[0.04] transition-all min-h-[110px] flex flex-col justify-between" style={{ background: '#0D0D0D' }}>
                  <p className="font-mono text-[13px] text-bone font-medium">{p.name}</p>
                  <p className="font-mono text-[11px] text-crimson">{p.tech}</p>
                  <p className="font-sans text-[13px] text-bone/40 mt-1">{p.desc}</p>
                  <div className="text-right mt-2">
                    <span className="text-gold text-[13px]">↗</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4">
              <button className="font-mono text-[12px] text-bone/50 hover:text-bone transition-colors">{'{ }'} GitHub →</button>
              <button className="font-mono text-[12px] text-gold hover:underline">📄 Case Study →</button>
            </div>
          </div>

          {/* Side project card */}
          <div className="project-card rounded-xl border border-white/[0.07] overflow-hidden hover:border-crimson/40 hover:-translate-y-[3px] transition-all duration-300" style={{ background: '#111' }}>
            <div className="h-[180px] overflow-hidden relative" style={{ 
              background: 'linear-gradient(135deg, #161616 0%, #1a0a0a 50%, #0f0f1a 100%)' 
            }}>
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none" 
                style={{ 
                  backgroundImage: 'linear-gradient(rgba(192,39,45,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,39,45,0.1) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} 
              />
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-crimson hover-line transition-all duration-500" />
              <div className="w-full h-full flex items-center justify-center font-mono text-[13px] text-bone/20 z-10">
                [ Project Screenshot ]
              </div>
              <div className="absolute bottom-2 right-4 font-playfair text-[60px] font-black text-crimson/[0.06] leading-none select-none">
                02
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-playfair text-[22px] text-bone">{sideProject.name}</h3>
              <p className="font-sans text-[15px] text-bone/50 mt-1">{sideProject.desc}</p>
              <div className="flex gap-[6px] mt-3 flex-wrap">
                {sideProject.tags.map(t => (
                  <span key={t} className="font-mono text-[11px] text-crimson border border-crimson/25 bg-crimson/[0.12] px-[10px] py-[3px] rounded-[3px]">{t}</span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <LinkBtn icon="↗" text="Live Demo" color="text-crimson" />
                <LinkBtn icon="{ }" text="GitHub" color="text-bone/50 hover:text-gold" />
                <LinkBtn icon="📄" text="Case Study" color="text-gold" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/projects')}
            className="font-mono text-[13px] text-crimson border border-crimson/40 px-8 py-3 rounded hover:bg-crimson/[0.08] transition-colors"
          >
            View All Projects →
          </button>
        </div>
      </div>
    </section>
  );
};

/* CSS for hover line animation */
const style = document.createElement('style');
style.textContent = `
  .project-card:hover .hover-line {
    width: 100% !important;
  }
`;
if (typeof document !== 'undefined') document.head.appendChild(style);

export default Projects;
