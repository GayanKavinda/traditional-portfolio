import maskImg from '@/assets/mask.png';
import { useTheme } from '@/context/ThemeProvider';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <footer className="border-t border-border py-8 px-10 bg-background">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <img src={maskImg} alt="" className="w-5 h-5" style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }} />
          <span className="font-mono text-[12px] text-foreground/40">© 2025 Gara Yaka</span>
        </div>
        <span className="font-mono text-[11px] text-foreground/20">React · GSAP · TypeScript · D3</span>
        <div className="flex gap-3">
          {['G', 'L', 'X', 'D'].map(s => (
            <a key={s} href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center font-mono text-[10px] text-foreground/40 hover:text-gold hover:border-gold/40 transition-all">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
