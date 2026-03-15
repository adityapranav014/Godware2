import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * Premium Scroll Progress Bar — Gold line at top of viewport.
 *
 * Uses a live scroll event instead of ScrollTrigger so the total scroll
 * height is always read from the real DOM on every tick. This fixes the
 * "bar finishes early" bug caused by lazy-loaded sections expanding the
 * page height after ScrollTrigger's initial measurement.
 */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      gsap.set(bar, { scaleX: progress });
    };

    window.addEventListener('scroll', update, { passive: true });
    // Run once on mount in case the page is already scrolled (browser restore)
    update();

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-9997 pointer-events-none"
      style={{
        height: '2px',
        background: 'linear-gradient(90deg, #c98b3a, #e8602e, #c98b3a)',
        boxShadow: '0 0 8px rgba(201, 139, 58, 0.65), 0 0 16px rgba(201, 139, 58, 0.3)',
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
        willChange: 'transform',
      }}
    />
  );
};

export default ScrollProgress;
