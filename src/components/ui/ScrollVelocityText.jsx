import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-Velocity Text — Large text that stretches/skews based on scroll velocity.
 * Creates a dramatic, interactive feel. Used between sections as a visual divider.
 */
const ScrollVelocityText = ({
  text = 'GOD WEAR',
  repeat = 5,
  className = '',
  baseSpeed = 0.5,
}) => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current) return;
    if (window.innerWidth < 768) return; // Skip on mobile

    const inner = innerRef.current;
    let xPos = 0;
    let skew = 0;

    // Continuous horizontal scroll
    const animate = () => {
      xPos -= baseSpeed;
      const halfWidth = inner.scrollWidth / 2;
      if (xPos <= -halfWidth) xPos += halfWidth;
      gsap.set(inner, { x: xPos, skewX: skew });
      requestAnimationFrame(animate);
    };
    const rafId = requestAnimationFrame(animate);

    // Velocity-based skew on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const targetSkew = Math.max(-5, Math.min(5, velocity / 200));
        skew += (targetSkew - skew) * 0.1;
      },
    });

    // Reset skew when scroll stops
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        gsap.to({ val: skew }, {
          val: 0,
          duration: 0.8,
          ease: 'power3.out',
          onUpdate: function () {
            skew = this.targets()[0].val;
          },
        });
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [baseSpeed]);

  const textArray = Array.from({ length: repeat * 2 }, (_, i) => (
    <span key={i} className="inline-block whitespace-nowrap mx-4 sm:mx-6 md:mx-8">
      {text}
      <span className="inline-block mx-4 sm:mx-6 md:mx-8 text-gold-500/30">✦</span>
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden py-6 sm:py-8 md:py-10 select-none pointer-events-none ${className}`}
    >
      <div
        ref={innerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: 'max-content' }}
      >
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display uppercase tracking-widest text-white/5 font-bold"
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)' }}
        >
          {textArray}
        </span>
      </div>
    </div>
  );
};

export default ScrollVelocityText;
