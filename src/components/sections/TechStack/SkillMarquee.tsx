// src/components/TechStack/SkillMarquee.tsx
// Row 1 scrolls LEFT  (Frontend + Backend)   — 60 s
// Row 2 scrolls RIGHT (Infra + Data)         — 72 s
// True seamless loop: the Marquee component duplicates children internally.
// Full-height vertical separators use bg-border (theme-aware).

import React from 'react';
import { SkillChip } from './SkillChip';
import { CAT_META, SKILLS } from './constants';

const ROW_1 = SKILLS.filter(s => s.cat === 'fe' || s.cat === 'be');
const ROW_2 = SKILLS.filter(s => s.cat === 'infra' || s.cat === 'data');

// Full-height vertical separator
const Sep = () => (
  <div className="w-[0.5px] self-stretch bg-border shrink-0 mx-2.5 rounded-[1px]" />
);

// Interleave <Sep /> between chips
function withSeps(skills: typeof ROW_1, runIndex: number): React.ReactNode[] {
  return skills.flatMap((s, i) => {
    const nodes: React.ReactNode[] = [
      <SkillChip key={`${s.id}-${runIndex}`} name={s.name} accentColor={CAT_META[s.cat].color} />,
    ];
    if (i < skills.length - 1) nodes.push(<Sep key={`sep-${s.id}-${runIndex}`} />);
    return nodes;
  });
}

// Render a single track row four times with 10px spacing acting as a logical separator block
function renderTrackItems(skills: typeof ROW_1) {
  const items: React.ReactNode[] = [];
  for (let r = 0; r < 4; r++) {
    items.push(...withSeps(skills, r));
    if (r < 3) {
      items.push(<div key={`gap-${r}`} style={{ width: '10px', flexShrink: 0 }} />);
    }
  }
  return items;
}

export const SkillMarquee = () => (
  <div className="mq-section w-full mb-16 overflow-hidden">
    {/* Row 1 — left */}
    <div>
      <div className="mq-label font-mono text-[9px] tracking-[.18em] uppercase text-muted-foreground/50 mb-3 px-0">
        Frontend &amp; Backend
      </div>
      <div className="mq-outer">
        <div className="mq-track mq-l">
          {renderTrackItems(ROW_1)}
        </div>
      </div>
    </div>

    {/* Row 2 — right */}
    <div>
      <div className="mq-label font-mono text-[9px] tracking-[.18em] uppercase text-muted-foreground/50 mb-3 px-0">
        Infrastructure &amp; Data
      </div>
      <div className="mq-outer">
        <div className="mq-track mq-r">
          {renderTrackItems(ROW_2)}
        </div>
      </div>
    </div>
  </div>
);