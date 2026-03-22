import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/mask.png';
import dancerImg from '@/assets/dancer.png';
import { useTheme } from '@/context/ThemeProvider';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dancerRef = useRef<HTMLImageElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(dancerRef.current!, {
        x: 120, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current!, start: 'top 70%' }
      });
      gsap.from('.contact-field', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current!, start: 'top 75%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-[120px] relative overflow-hidden">
      <img src={maskImg} alt="" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] opacity-[0.06] pointer-events-none z-0" style={{ mixBlendMode: isDark ? 'screen' : 'multiply' }} />
      <img ref={dancerRef} src={dancerImg} alt="" className="absolute bottom-0 right-0 h-[70%] w-auto pointer-events-none z-0" style={{ mixBlendMode: isDark ? 'screen' : 'multiply', opacity: isDark ? 0.3 : 0.12 }} />

      <div className="relative z-[1] max-w-[580px] mx-auto px-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Get In Touch</p>
        <h2 className="font-playfair text-[48px] text-foreground mt-2">Let's Build Something.</h2>
        <p className="font-sans text-[16px] text-foreground/50 mt-4 max-w-[440px] mx-auto">
          Have a project in mind or want to discuss an opportunity? I'd love to hear from you.
        </p>

        {/* Availability */}
        <div className="flex items-center justify-center gap-2 mt-5 px-4 py-1.5 rounded-full w-fit mx-auto" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e', animation: 'greenPulse 2s infinite' }} />
          <span className="font-mono text-[12px]" style={{ color: 'rgba(34,197,94,0.9)' }}>Available for opportunities</span>
        </div>

        <p className="font-mono text-[12px] text-foreground/40 mt-2">📍 Colombo, Sri Lanka · Remote Worldwide</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left">
          <input
            className="contact-field w-full rounded-lg border border-border px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/30 focus:border-crimson/50 focus:outline-none transition-colors bg-card"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="contact-field w-full rounded-lg border border-border px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/30 focus:border-crimson/50 focus:outline-none transition-colors bg-card"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="contact-field w-full rounded-lg border border-border px-4 py-3 font-sans text-[15px] text-foreground placeholder:text-foreground/30 focus:border-crimson/50 focus:outline-none transition-colors resize-none bg-card"
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
          />
          <button className="contact-field w-full bg-crimson text-white font-mono text-[13px] py-3 rounded-lg hover:brightness-110 transition-all relative z-10" type="submit">
            Send Message →
          </button>
        </form>

        {/* Social */}
        <div className="flex justify-center gap-6 mt-8">
          {['GitHub', 'LinkedIn', 'X', 'Dev.to'].map(s => (
            <a key={s} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center font-mono text-[10px] text-foreground/50 hover:text-gold hover:border-gold/40 transition-all">
              {s[0]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
