import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maskImg from '@/assets/mask.png';

const MaskTransition = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current!,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
          pin: false,
        }
      });
      tl.to(maskRef.current!, { scale: 1.1, opacity: 1, rotation: 0, ease: 'none' }, 0);
      tl.to(glowRef.current!, { opacity: 1, ease: 'none' }, 0);
    }, outerRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'ENGINEER · ARCHITECT · BUILDER · CREATOR · ';

  return (
    <div ref={outerRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        {/* Marquee */}
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-playfair select-none z-0"
          style={{ fontSize: 'clamp(60px,10vw,120px)', color: 'rgba(192,39,45,0.1)' }}
        >
          <div style={{ animation: 'marquee 18s linear infinite', display: 'inline-block' }}>
            {marqueeText.repeat(4)}{marqueeText.repeat(4)}
          </div>
        </div>

        {/* Gold glow ring */}
        <div
          ref={glowRef}
          className="absolute rounded-full"
          style={{ width: '68vmin', height: '68vmin', boxShadow: '0 0 100px 30px rgba(232,168,32,0.2)', opacity: 0 }}
        />

        {/* Mask image */}
        <img
          ref={maskRef}
          src={maskImg}
          alt="Ritual Mask"
          className="absolute z-10"
          style={{ width: '64vmin', maxWidth: 640, mixBlendMode: 'screen', transform: 'scale(0.35) rotate(-6deg)', opacity: 0 }}
        />
      </div>
    </div>
  );
};

export default MaskTransition;
