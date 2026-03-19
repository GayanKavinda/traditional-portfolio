import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/mask.png';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MaskTransition = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

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

      // Marquee: slows down as mask appears (parallax feel)
      tl.fromTo(
        marqueeRef.current,
        { x: '0%' },
        { x: '-8%', ease: 'none' },
        0
      );

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

  // Word cycling for side words
  useEffect(() => {
    const words = document.querySelectorAll('.hud-side-word');
    if (!words.length) return;
    let i = 0;
    const interval = setInterval(() => {
      words.forEach((w) => {
        (w as HTMLElement).style.color = 'rgba(245,240,232,0.14)';
      });
      i = (i + 1) % words.length;
      (words[i] as HTMLElement).style.color = 'rgba(232,168,32,0.7)';
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const words = ['ENGINEER', 'ARCHITECT', 'BUILDER', 'CREATOR'];
  const marqueeContent = [...words, ...words, ...words, ...words].map(
    (w, i) => ({ word: w, filled: i % 2 === 1 })
  );

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
          background: 'linear-gradient(to bottom, #0A0A0A, transparent)',
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
          background: '#0A0A0A',
        }}
      >
        {/* GRID BACKGROUND */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
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
              'radial-gradient(ellipse at center, transparent 30%, #0A0A0A 75%)',
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
            ENGINEER · ARCHITECT · BUILDER · CREATOR
          </span>
          <span style={{ color: 'rgba(245,240,232,0.25)' }}>
            10+ YRS · 50+ PROJECTS · 10M+ USERS
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
            justifyContent: 'space-between',
            zIndex: 15,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: 'rgba(245,240,232,0.25)' }}>
            COLOMBO, SL — REMOTE WORLDWIDE
          </span>
          <span style={{ color: 'rgba(232,168,32,0.4)' }}>
            SCROLL TO EXPLORE ↓
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
            background: 'rgba(245,240,232,0.06)',
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

        {/* LEFT SIDE WORDS */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {['ENGINEER', 'ARCHITECT', 'BUILDER', 'CREATOR'].map((w, i) => (
            <span
              key={w}
              className="hud-side-word"
              style={{
                color:
                  i === 0
                    ? 'rgba(232,168,32,0.7)'
                    : 'rgba(245,240,232,0.14)',
                transition: 'color 0.4s ease',
              }}
            >
              {w}
            </span>
          ))}
        </div>

        {/* RIGHT SIDE WORDS */}
        <div
          style={{
            position: 'absolute',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.14)',
          }}
        >
          {['SRI LANKA', 'REMOTE', 'GLOBAL'].map((w) => (
            <span key={w}>{w}</span>
          ))}
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
          background: 'linear-gradient(to top, #0A0A0A, transparent)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default MaskTransition;