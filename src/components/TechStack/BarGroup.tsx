interface SkillBar { name: string; pct: number; }

export const BarGroup = ({ title, items }: { title: string; items: SkillBar[] }) => (
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
