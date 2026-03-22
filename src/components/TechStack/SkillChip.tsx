// src/components/TechStack/SkillChip.tsx

import { ICON_MAP } from './constants';

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';

interface SkillChipProps {
  name: string;
  accentColor: string;
}

export const SkillChip = ({ name, accentColor }: SkillChipProps) => (
  <div className="group relative inline-flex flex-col items-center justify-center gap-2.5 px-[22px] py-5 min-w-[96px] bg-card border border-border rounded-[20px] cursor-default select-none shrink-0 transition-all duration-200 hover:bg-muted hover:border-border/60">
    <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0">
      <img
        src={BASE + ICON_MAP[name]}
        alt={name}
        width={38}
        height={38}
        loading="lazy"
        draggable={false}
        className="object-contain block"
      />
    </div>
    <span className="text-[11.5px] font-medium text-foreground leading-none text-center whitespace-nowrap">
      {name}
    </span>
    {/* Category accent bar */}
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t-sm opacity-50 group-hover:opacity-100 group-hover:w-10 transition-all duration-200"
      style={{ background: accentColor, width: '24px' }}
    />
  </div>
);