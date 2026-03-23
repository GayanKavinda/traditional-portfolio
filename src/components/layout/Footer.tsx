// src/components/Footer.tsx
// Mobile: stacked vertically centered
// Desktop: three-column horizontal row

import maskImg from '@/assets/mask.png';
import { useTheme } from '@/context/ThemeProvider';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className="border-t border-border py-8 px-6 md:px-10 bg-background">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 max-w-[1200px] mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={maskImg} alt=""
            className="w-5 h-5"
            style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }}
          />
          <span className="font-mono text-[12px] text-foreground/40">© 2025 Gara Yaka</span>
        </div>

        {/* Stack credit */}
        <span className="font-mono text-[10px] md:text-[11px] text-foreground/20 text-center">
          React · GSAP · TypeScript · D3
        </span>

        {/* Social icons */}
        <div className="flex gap-3">
          {[
            { label: 'G', href: 'https://github.com'   },
            { label: 'L', href: 'https://linkedin.com' },
            { label: 'X', href: '#' },
            { label: 'D', href: '#' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center font-mono text-[10px] text-foreground/40 hover:text-gold hover:border-gold/40 transition-all"
            >
              {s.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;