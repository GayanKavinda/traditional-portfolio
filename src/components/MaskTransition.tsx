import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/mask.png';

// UI/UX Pro Max recommended easing
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const MaskTransition = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // UI/UX Pro Max: Respect reduced motion accessibility
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Smooth scroll-triggered animation with UI/UX Pro Max easing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current!,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5, // Faster scrub for smoother feel
        }
      });

      // Mask transforms - using transform for performance (UI/UX Pro Max)
      tl.to(maskRef.current!, {
        scale: 1.15,
        opacity: 1,
        rotation: 0,
        ease: 'none'
      }, 0);

      // Glow fade in
      tl.to(glowRef.current!, {
        opacity: 1,
        ease: 'none'
      }, 0);

      // Content parallax (subtle)
      tl.to(contentRef.current!, {
        y: -30,
        opacity: 0.8,
        ease: 'none'
      }, 0);

    }, outerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'ENGINEER · ARCHITECT · BUILDER · CREATOR · ';

  return (
    <div ref={outerRef} className="relative" style={{ height: '180vh' }}>
      {/* Gradient fade at top - UI/UX Pro Max recommendation */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 100%)' }}
      />

      <div
        ref={contentRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ background: '#0A0A0A' }}
      >
        {/* Marquee - with reduced motion support */}
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-playfair select-none z-0"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)', color: 'rgba(192,39,45,0.08)' }}
        >
          <div
            className="inline-block"
            style={{
              animation: prefersReducedMotion() ? 'none' : 'marquee 20s linear infinite'
            }}
          >
            {marqueeText.repeat(4)}{marqueeText.repeat(4)}
          </div>
        </div>

        {/* Gold glow ring - UI/UX Pro Max: subtle glow effect */}
        <div
          ref={glowRef}
          className="absolute rounded-full"
          style={{
            width: '70vmin',
            height: '70vmin',
            maxWidth: 500,
            maxHeight: 500,
            boxShadow: '0 0 120px 40px rgba(232,168,32,0.15), inset 0 0 60px rgba(232,168,32,0.1)',
            opacity: 0
          }}
        />

        {/* Inner ring for depth */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '60vmin',
            height: '60vmin',
            maxWidth: 420,
            maxHeight: 420,
            border: '1px solid rgba(232,168,32,0.1)'
          }}
        />

        {/* Mask image with enhanced blend mode */}
        <img
          ref={maskRef}
          src={maskImg}
          alt="Artisan Mask"
          className="absolute z-10"
          style={{
            width: '58vmin',
            maxWidth: 560,
            minWidth: 280,
            mixBlendMode: 'screen',
            transform: 'scale(0.32) rotate(-6deg)',
            opacity: 0,
            filter: 'contrast(1.1) saturate(0.9)'
          }}
        />

        {/* Bottom decorative line */}
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-px z-10"
          style={{ background: 'linear-gradient(to right, transparent, rgba(232,168,32,0.4), transparent)' }}
        />
      </div>

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)' }}
      />
    </div>
  );
};

export default MaskTransition;