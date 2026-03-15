import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ambient Glow Blobs — Soft, slowly animating gradient blobs for section backgrounds.
 * Creates depth and warmth in otherwise flat dark sections.
 */
const AmbientBlobs = ({ variant = 'gold', className = '' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.innerWidth < 768) return;

    const blobs = containerRef.current.querySelectorAll('.ambient-blob');
    blobs.forEach((blob, i) => {
      // Slow organic movement
      gsap.to(blob, {
        x: `random(-50, 50)`,
        y: `random(-30, 30)`,
        scale: `random(0.8, 1.3)`,
        duration: `random(10, 18)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2,
      });
    });
  }, { scope: containerRef });

  const configs = {
    gold: [
      { color: 'rgba(201, 139, 58, 0.06)', size: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]', pos: 'top-[10%] left-[15%]' },
      { color: 'rgba(232, 96, 46, 0.04)', size: 'w-[250px] h-[250px] md:w-[400px] md:h-[400px]', pos: 'bottom-[15%] right-[10%]' },
      { color: 'rgba(201, 139, 58, 0.03)', size: 'w-[200px] h-[200px] md:w-[350px] md:h-[350px]', pos: 'top-[50%] right-[30%]' },
    ],
    subtle: [
      { color: 'rgba(255, 255, 255, 0.02)', size: 'w-[300px] h-[300px] md:w-[450px] md:h-[450px]', pos: 'top-[20%] left-[10%]' },
      { color: 'rgba(255, 255, 255, 0.015)', size: 'w-[250px] h-[250px] md:w-[400px] md:h-[400px]', pos: 'bottom-[10%] right-[15%]' },
    ],
    warm: [
      { color: 'rgba(201, 139, 58, 0.08)', size: 'w-[250px] h-[250px] md:w-[450px] md:h-[450px]', pos: 'top-[15%] right-[20%]' },
      { color: 'rgba(232, 96, 46, 0.05)', size: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]', pos: 'bottom-[20%] left-[15%]' },
      { color: 'rgba(201, 139, 58, 0.04)', size: 'w-[180px] h-[180px] md:w-[300px] md:h-[300px]', pos: 'top-[60%] left-[40%]' },
    ],
  };

  const blobs = configs[variant] || configs.gold;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`ambient-blob absolute ${blob.size} ${blob.pos} rounded-full`}
          style={{
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBlobs;
