import { useRef, useEffect, useState } from 'react';

/**
 * Floating Particles — Ambient gold/white micro-dots that drift through dark backgrounds.
 * Creates a sense of depth and life in empty dark spaces.
 * Pure CSS animation (no GSAP dependency) for max performance.
 * Hidden on mobile for performance.
 */
const FloatingParticles = ({ count = 30, color = 'gold', className = '' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  const particles = Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * -20;
    const opacity = Math.random() * 0.3 + 0.05;
    const drift = Math.random() * 60 + 20;

    const particleColor = color === 'gold'
      ? `rgba(201, 139, 58, ${opacity})`
      : `rgba(255, 255, 255, ${opacity})`;

    return (
      <div
        key={i}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: particleColor,
          boxShadow: size > 2 ? `0 0 ${size * 2}px ${particleColor}` : 'none',
          animation: `particle-float-${i % 4} ${duration}s ease-in-out ${delay}s infinite`,
          willChange: 'transform, opacity',
        }}
      />
    );
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {particles}
      <style>{`
        @keyframes particle-float-0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(20px, -30px) scale(1.2); opacity: 0.6; }
          50% { transform: translate(-10px, -60px) scale(0.8); opacity: 0.2; }
          75% { transform: translate(30px, -20px) scale(1.1); opacity: 0.5; }
        }
        @keyframes particle-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(-25px, -40px) scale(1.3); opacity: 0.5; }
          66% { transform: translate(15px, -70px) scale(0.7); opacity: 0.15; }
        }
        @keyframes particle-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(35px, -50px) scale(1.15); opacity: 0.1; }
        }
        @keyframes particle-float-3 {
          0%, 100% { transform: translate(0, 0) scale(0.9); opacity: 0.25; }
          40% { transform: translate(-20px, -35px) scale(1.2); opacity: 0.55; }
          80% { transform: translate(10px, -65px) scale(0.85); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

export default FloatingParticles;
