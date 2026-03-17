import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as d3 from 'd3';
import animeImg from '@/assets/anime-headdress.png';

interface SkillBar { name: string; pct: number; }
const languages: SkillBar[] = [
  { name: 'TypeScript', pct: 92 }, { name: 'React', pct: 88 }, { name: 'Node.js', pct: 85 }, { name: 'Python', pct: 78 },
];
const infra: SkillBar[] = [
  { name: 'AWS', pct: 82 }, { name: 'Docker', pct: 80 }, { name: 'PostgreSQL', pct: 75 }, { name: 'Kubernetes', pct: 70 },
];

type Cat = 'Frontend' | 'Backend' | 'Infra' | 'Data';
const catColors: Record<Cat, { stroke: string; fill: string }> = {
  Frontend: { stroke: '#C0272D', fill: 'rgba(192,39,45,0.1)' },
  Backend: { stroke: '#E8A820', fill: 'rgba(232,168,32,0.1)' },
  Infra: { stroke: 'rgba(245,240,232,0.7)', fill: 'rgba(245,240,232,0.07)' },
  Data: { stroke: '#7B9FDE', fill: 'rgba(123,159,222,0.1)' },
};

interface NodeData extends d3.SimulationNodeDatum {
  id: string; name: string; category: Cat; radius: number;
}
interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData; target: string | NodeData;
}

const nodes: NodeData[] = [
  { id: 'react', name: 'React', category: 'Frontend', radius: 28 },
  { id: 'ts', name: 'TypeScript', category: 'Frontend', radius: 26 },
  { id: 'next', name: 'Next.js', category: 'Frontend', radius: 20 },
  { id: 'tw', name: 'TailwindCSS', category: 'Frontend', radius: 18 },
  { id: 'node', name: 'Node.js', category: 'Backend', radius: 26 },
  { id: 'python', name: 'Python', category: 'Backend', radius: 24 },
  { id: 'go', name: 'Go', category: 'Backend', radius: 20 },
  { id: 'gql', name: 'GraphQL', category: 'Backend', radius: 18 },
  { id: 'aws', name: 'AWS', category: 'Infra', radius: 26 },
  { id: 'docker', name: 'Docker', category: 'Infra', radius: 24 },
  { id: 'k8s', name: 'K8s', category: 'Infra', radius: 22 },
  { id: 'tf', name: 'Terraform', category: 'Infra', radius: 18 },
  { id: 'pg', name: 'PostgreSQL', category: 'Data', radius: 24 },
  { id: 'redis', name: 'Redis', category: 'Data', radius: 20 },
  { id: 'kafka', name: 'Kafka', category: 'Data', radius: 18 },
];

const links: LinkData[] = [
  { source: 'react', target: 'ts' }, { source: 'react', target: 'next' }, { source: 'react', target: 'tw' },
  { source: 'ts', target: 'node' }, { source: 'node', target: 'python' }, { source: 'node', target: 'go' },
  { source: 'node', target: 'gql' }, { source: 'aws', target: 'docker' }, { source: 'aws', target: 'k8s' },
  { source: 'aws', target: 'tf' }, { source: 'docker', target: 'k8s' }, { source: 'pg', target: 'redis' },
  { source: 'pg', target: 'node' }, { source: 'redis', target: 'kafka' }, { source: 'aws', target: 'pg' },
  { source: 'python', target: 'pg' }, { source: 'go', target: 'kafka' }, { source: 'k8s', target: 'docker' },
  { source: 'react', target: 'node' }, { source: 'aws', target: 'node' },
];

const BarGroup = ({ title, items }: { title: string; items: SkillBar[] }) => (
  <div className="mb-8">
    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-3">// {title}</p>
    {items.map(s => (
      <div key={s.name} className="mb-5">
        <div className="flex justify-between">
          <span className="font-mono text-[13px] text-bone">{s.name}</span>
          <span className="font-mono text-[13px] text-gold">{s.pct}%</span>
        </div>
        <div className="mt-2 h-[2px] rounded-[1px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="bar-fill h-full rounded-[1px] bg-crimson" style={{ width: 0 }} data-width={`${s.pct}%`} />
        </div>
      </div>
    ))}
  </div>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // BG parallax
      gsap.to(bgRef.current!, {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current!, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
      // Bar fills
      gsap.utils.toArray<HTMLElement>('.bar-fill').forEach(el => {
        gsap.to(el, {
          width: el.dataset.width!, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: barsRef.current!, start: 'top 80%', once: true }
        });
      });
    }, sectionRef);

    // D3 graph
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth || 500;
    const height = 460;

    svg.selectAll('*').remove();

    const nodesCopy = nodes.map(d => ({ ...d }));
    const linksCopy = links.map(d => ({ ...d }));

    const sim = d3.forceSimulation<NodeData>(nodesCopy)
      .force('charge', d3.forceManyBody().strength(-220))
      .force('link', d3.forceLink<NodeData, LinkData>(linksCopy).id(d => d.id).distance(90))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide<NodeData>().radius(d => d.radius + 10));

    // Warm up
    for (let i = 0; i < 120; i++) sim.tick();
    sim.stop();

    const linkG = svg.append('g');
    const nodeG = svg.append('g');

    const linkEls = linkG.selectAll('line').data(linksCopy).join('line')
      .attr('stroke', 'rgba(255,255,255,0.12)').attr('stroke-width', 1)
      .attr('x1', d => (d.source as NodeData).x!).attr('y1', d => (d.source as NodeData).y!)
      .attr('x2', d => (d.target as NodeData).x!).attr('y2', d => (d.target as NodeData).y!);

    const groups = nodeG.selectAll('g').data(nodesCopy).join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'grab');

    groups.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => catColors[d.category].fill)
      .attr('stroke', d => catColors[d.category].stroke)
      .attr('stroke-width', 1.5);

    groups.append('text')
      .text(d => d.name)
      .attr('y', d => d.radius + 14)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .style('font-family', '"DM Mono", monospace')
      .style('font-size', '12px');

    // Hover
    groups.on('mouseenter', function (_e, d) {
      const connected = new Set<string>();
      linksCopy.forEach(l => {
        const s = (l.source as NodeData).id, t = (l.target as NodeData).id;
        if (s === d.id) connected.add(t);
        if (t === d.id) connected.add(s);
      });
      groups.style('opacity', n => n.id === d.id || connected.has(n.id) ? 1 : 0.2);
      linkEls.style('opacity', l => ((l.source as NodeData).id === d.id || (l.target as NodeData).id === d.id) ? 0.5 : 0.05);
      d3.select(this).select('circle').attr('transform', 'scale(1.15)');
    }).on('mouseleave', () => {
      groups.style('opacity', 1);
      linkEls.style('opacity', 1);
      groups.selectAll('circle').attr('transform', null);
    });

    // Drag
    const drag = d3.drag<SVGGElement, NodeData>()
      .on('drag', function (event, d) {
        d.x = event.x; d.y = event.y;
        d3.select(this).attr('transform', `translate(${d.x},${d.y})`);
        linkEls
          .attr('x1', l => (l.source as NodeData).x!).attr('y1', l => (l.source as NodeData).y!)
          .attr('x2', l => (l.target as NodeData).x!).attr('y2', l => (l.target as NodeData).y!);
      });
    groups.call(drag);

    // Legend
    const cats: Cat[] = ['Frontend', 'Backend', 'Infra', 'Data'];
    const legend = svg.append('g').attr('transform', `translate(${width / 2 - 120}, ${height - 20})`);
    cats.forEach((c, i) => {
      const g = legend.append('g').attr('transform', `translate(${i * 70}, 0)`);
      g.append('circle').attr('r', 4).attr('fill', catColors[c].stroke);
      g.append('text').text(c).attr('x', 10).attr('y', 4).attr('fill', 'rgba(245,240,232,0.6)')
        .style('font-family', '"DM Mono", monospace').style('font-size', '11px');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-[120px] relative overflow-hidden">
      <img ref={bgRef} src={animeImg} alt="" className="absolute right-[-100px] top-1/2 -translate-y-1/2 h-[90%] w-auto opacity-[0.06] pointer-events-none z-0" style={{ mixBlendMode: 'screen' }} />

      <div className="relative z-[1] max-w-[1200px] mx-auto px-10">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Technologies</p>
          <h2 className="font-playfair text-[48px] text-bone mt-2">The Stack</h2>
        </div>

        <div className="grid gap-[5%] mt-12" style={{ gridTemplateColumns: '40% 55%' }}>
          <div ref={barsRef} className="mt-12">
            <BarGroup title="Languages" items={languages} />
            <BarGroup title="Infrastructure" items={infra} />
          </div>
          <div>
            <svg ref={svgRef} className="w-full" style={{ height: 460 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
