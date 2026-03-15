import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Premium Magnetic Cursor — Agency-level custom cursor with dot + follower ring.
 * - Inner dot: follows mouse instantly
 * - Outer ring: follows with elastic lerp delay
 * - Magnetic pull on interactive elements
 * - Hidden on touch devices
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    // Hide default cursor
    document.body.style.cursor = 'none';

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isHovering = false;
    let isMagnetic = false;
    let magnetTarget = null;

    // Mouse move handler
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move dot instantly
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Magnetic effect
      if (isMagnetic && magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (mouseX - centerX) * 0.35;
        const deltaY = (mouseY - centerY) * 0.35;

        gsap.to(magnetTarget, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    // Ring follow with lerp
    const animateRing = () => {
      const speed = isHovering ? 0.15 : 0.12;
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animateRing);
    };
    const rafId = requestAnimationFrame(animateRing);

    // Hover handlers
    const handleMouseEnter = (e) => {
      isHovering = true;
      const target = e.currentTarget;
      const hasMagnetic = target.hasAttribute('data-magnetic') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';

      if (hasMagnetic) {
        isMagnetic = true;
        magnetTarget = target;
      }

      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: 'rgba(201, 139, 58, 0.6)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        width: 6,
        height: 6,
        backgroundColor: '#c98b3a',
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = (e) => {
      isHovering = false;

      if (isMagnetic && magnetTarget) {
        gsap.to(magnetTarget, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
        isMagnetic = false;
        magnetTarget = null;
      }

      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        width: 8,
        height: 8,
        backgroundColor: '#ffffff',
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseDown = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        scale: 0.6,
        duration: 0.15,
        ease: 'power3.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(ring, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    // Attach listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-magnetic], input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll('a, button, [data-magnetic], input, textarea, [role="button"]');
      newElements.forEach(el => {
        if (!el._cursorBound) {
          el.style.cursor = 'none';
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
          el._cursorBound = true;
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.style.cursor = '';
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-9999 pointer-events-none"
        style={{
          width: 8,
          height: 8,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-9998 pointer-events-none"
        style={{
          width: 40,
          height: 40,
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </>
  );
};

export default CustomCursor;
