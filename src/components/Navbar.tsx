import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const links = ['Home', 'Projects', 'Skills', 'Experience', 'About', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (link: string) => {
    if (link === 'Home') {
      if (location.pathname !== '/') navigate('/');
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link === 'Projects') {
      if (location.pathname !== '/') navigate('/');
      setTimeout(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const id = link.toLowerCase();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-[100] transition-all duration-[400ms]"
      style={{
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)'}`,
      }}
    >
      <div className="relative h-14 flex items-center">
        <button onClick={() => navigate('/')} className="absolute left-6 font-playfair text-2xl text-crimson font-bold">
          GY
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          {links.map(l => (
            <button
              key={l}
              onClick={() => handleClick(l)}
              className="nav-link font-mono text-[11px] uppercase tracking-[0.15em] text-bone/70 hover:text-gold transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        <button
          className="absolute right-6 font-mono text-[13px] border border-crimson text-bone/80 px-5 py-2 hover:bg-crimson/10 transition-colors"
          onClick={() => window.open('/resume.pdf', '_blank')}
        >
          ↓ Resume
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
