import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/cyberpunk-design-mask.png';
import { useTheme } from '@/context/ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = ['ENGINEER', 'ARCHITECT', 'BUILDER', 'CREATOR'];

const HUD_CONFIG = {
  title: "GARA YAKA // SYSTEMS ARCHITECT",
  scrollLabel: "SCROLL TO EXPLORE ↓"
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MaskTransition = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
          pin: false,
        },
      });

      // Mask: scale up and fade in from below
      tl.fromTo(
        maskRef.current,
        { scale: 0.3, opacity: 0, y: 80 },
        { scale: 1.08, opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Glow: fades in with mask
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, ease: 'none' },
        0
      );

      // Marquee: parallax feel (optional, but removed to avoid conflict with infinite CSS animation)
      // If needed, apply this to a wrapper div instead.

      // Progress bar fills as you scroll
      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0
      );
    }, outerRef);
    return () => ctx.revert();
  }, []);


  const marqueeContent = [...DISCIPLINES, ...DISCIPLINES].map((w, i) => ({
    word: w,
    filled: i % 2 === 1,
  }));

  return (
    <div ref={outerRef} style={{ height: '220vh', position: 'relative' }}>
      {/* TOP FADE */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: `linear-gradient(to bottom, hsl(var(--background)), transparent)`,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* STICKY CONTAINER */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'hsl(var(--background))',
        }}
      >
        {/* GRID BACKGROUND */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage:
              isDark
                ? 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)'
                : 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        {/* RADIAL VIGNETTE over grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background:
              `radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 75%)`,
          }}
        />

        {/* MEGA MARQUEE (behind mask) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-10%',
            width: '120%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div
            ref={marqueeRef}
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              animation: 'mqCinema 28s linear infinite',
            }}
          >
            {marqueeContent.map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: item.filled
                    ? 'rgba(232,168,32,0.08)'
                    : 'transparent',
                  WebkitTextStroke: item.filled
                    ? 'none'
                    : '1px rgba(232,168,32,0.08)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {item.word}
                {i < marqueeContent.length - 1 && (
                  <span style={{ margin: '0 1.5rem', opacity: 0.4 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* HUD TOP BAR */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            right: 40,
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 15,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'rgba(232,168,32,0.5)' }}>
            {HUD_CONFIG.title}
          </span>
        </div>

        {/* HUD BOTTOM BAR */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            right: 40,
            display: 'flex',
            justifyContent: 'flex-end',
            zIndex: 15,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'rgba(232,168,32,0.4)' }}>
            {HUD_CONFIG.scrollLabel}
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 40,
            right: 40,
            height: '1px',
            background: isDark ? 'rgba(245,240,232,0.06)' : 'rgba(0,0,0,0.08)',
            zIndex: 15,
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: '100%',
              background: 'rgba(232,168,32,0.5)',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
            }}
          />
        </div>


        {/* CORNER BRACKETS */}
        {[
          { top: 60, left: 40 },
          { top: 60, right: 40 },
          { bottom: 60, left: 40 },
          { bottom: 60, right: 40 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: 20,
              height: 20,
              zIndex: 15,
              borderTop:
                i < 2 ? '1px solid rgba(232,168,32,0.2)' : 'none',
              borderBottom:
                i >= 2 ? '1px solid rgba(232,168,32,0.2)' : 'none',
              borderLeft:
                i === 0 || i === 2
                  ? '1px solid rgba(232,168,32,0.2)'
                  : 'none',
              borderRight:
                i === 1 || i === 3
                  ? '1px solid rgba(232,168,32,0.2)'
                  : 'none',
            }}
          />
        ))}

        {/* GLOW */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(232,168,32,0.15) 0%, rgba(200,60,20,0.08) 40%, transparent 70%)',
            zIndex: 3,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />

        {/* MASK IMAGE */}
        <img
          ref={maskRef}
          src={maskImg}
          alt="Sri Lankan traditional mask"
          style={{
            width: 'clamp(260px, 36vw, 440px)',
            height: 'auto',
            position: 'relative',
            zIndex: 10,
            opacity: 0,
            filter: 'drop-shadow(0 0 60px rgba(232,168,32,0.3))',
          }}
        />

        {/* CIRCUIT LINES FROM MASK (decorative SVG) */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <line
            x1="50%"
            y1="35%"
            x2="20%"
            y2="10%"
            stroke="rgba(232,168,32,0.07)"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="35%"
            x2="80%"
            y2="10%"
            stroke="rgba(232,168,32,0.07)"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="65%"
            x2="15%"
            y2="90%"
            stroke="rgba(232,168,32,0.05)"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="65%"
            x2="85%"
            y2="90%"
            stroke="rgba(232,168,32,0.05)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* BOTTOM FADE */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: `linear-gradient(to top, hsl(var(--background)), transparent)`,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MaskTransition;