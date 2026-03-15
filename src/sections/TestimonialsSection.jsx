import { useRef, useEffect, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, BadgeCheck } from "lucide-react";
import Section from "../components/layout/Section";
import TextReveal from "../components/ui/TextReveal";
import { EASE, DURATION, STAGGER, isMobile } from '../utils/animations';
import { testimonialsData, uiConfigData } from '../assets/data';

gsap.registerPlugin(ScrollTrigger);

/**
 * Professional GSAP-powered infinite marquee hook.
 * Uses GPU-accelerated transforms for buttery-smooth animation.
 */
const useMarquee = (containerRef, speed = 0.5, reverse = false) => {
  const xRef = useRef(0);
  const animRef = useRef(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const dragState = useRef({ startX: 0, scrollX: 0 });
  const touchState = useRef({ startX: 0, startY: 0, scrollX: 0, isHorizontal: null });
  const wheelTimer = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getHalfWidth = () => el.scrollWidth / 2;

    if (reverse) {
      xRef.current = -getHalfWidth();
      gsap.set(el, { x: xRef.current });
    }

    const animate = () => {
      if (!isPaused.current) {
        const halfWidth = getHalfWidth();
        if (reverse) {
          xRef.current += speed;
          if (xRef.current >= 0) xRef.current -= halfWidth;
        } else {
          xRef.current -= speed;
          if (xRef.current <= -halfWidth) xRef.current += halfWidth;
        }
        gsap.set(el, { x: xRef.current });
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    const onMouseDown = (e) => {
      isDragging.current = true;
      isPaused.current = true;
      dragState.current = { startX: e.clientX, scrollX: xRef.current };
      el.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const delta = e.clientX - dragState.current.startX;
      const halfWidth = getHalfWidth();
      let newX = dragState.current.scrollX + delta;
      while (newX > 0) newX -= halfWidth;
      while (newX < -halfWidth) newX += halfWidth;
      xRef.current = newX;
      gsap.set(el, { x: xRef.current });
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      isPaused.current = false;
      el.style.cursor = 'grab';
    };

    const onTouchStart = (e) => {
      isPaused.current = true;
      touchState.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        scrollX: xRef.current,
        isHorizontal: null,
      };
    };

    const onTouchMove = (e) => {
      const { startX, startY, scrollX } = touchState.current;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;

      if (touchState.current.isHorizontal === null) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          touchState.current.isHorizontal = Math.abs(dx) > Math.abs(dy);
        }
        return;
      }

      if (!touchState.current.isHorizontal) return;

      e.preventDefault();
      const halfWidth = getHalfWidth();
      let newX = scrollX + dx;
      while (newX > 0) newX -= halfWidth;
      while (newX < -halfWidth) newX += halfWidth;
      xRef.current = newX;
      gsap.set(el, { x: xRef.current });
    };

    const onTouchEnd = () => {
      isPaused.current = false;
      touchState.current.isHorizontal = null;
    };

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 1) return;
      e.preventDefault();

      const halfWidth = getHalfWidth();
      xRef.current -= delta;
      while (xRef.current > 0) xRef.current -= halfWidth;
      while (xRef.current < -halfWidth) xRef.current += halfWidth;
      gsap.set(el, { x: xRef.current });

      isPaused.current = true;
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { isPaused.current = false; }, 800);
    };

    el.style.cursor = 'grab';

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(wheelTimer.current);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
    };
  }, [containerRef, speed, reverse]);
};

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const marqueeRef = useRef(null);
  const quoteSvgRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // ── 3D tilt handlers — desktop only, matches CategorySection patterns ──
  const handleCardEnter = useCallback((e) => {
    if (isMobile()) return;
    gsap.to(e.currentTarget, { scale: 1.04, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
  }, []);

  const handleCardMove = useCallback((e) => {
    if (isMobile()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    gsap.to(card, { rotateX, rotateY, transformPerspective: 1000, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }, []);

  const handleCardLeave = useCallback((e) => {
    if (isMobile()) return;
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)', overwrite: true });
  }, []);

  // Hide swipe hint after 3 seconds or on first touch
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3500);
    const hideOnTouch = () => setShowSwipeHint(false);
    window.addEventListener('touchstart', hideOnTouch, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('touchstart', hideOnTouch);
    };
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }
    });

    // Badge entrance
    tl.fromTo(
      badgeRef.current,
      { scale: 0.8, opacity: 0, y: -20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: DURATION.medium,
        ease: EASE.back,
      }
    );

    // Large quote SVG line-draw — removed (SVG removed in redesign)

    // Marquee entrance (container fade in)
    tl.fromTo(
      marqueeRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.power,
      },
      '-=0.8'
    );
  }, { scope: sectionRef });

  // Row 1: scrolls LEFT | Row 2: scrolls RIGHT (opposite) — different speeds for depth
  useMarquee(row1Ref, 0.9, false);
  useMarquee(row2Ref, 0.5, true);

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white section-gradient-alt noise-overlay" containerClassName="w-full max-w-full">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* ── Section Header — editorial left-aligned ── */}
        <div ref={badgeRef} className="flex flex-col gap-4 px-4 sm:px-6">
          <span className="section-tag">Voices</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8">
            <TextReveal
              as="h2"
              variant="slideUp"
              splitBy="words"
              trigger="top 80%"
              stagger={0.07}
              duration={0.9}
              className="text-section-xl font-display uppercase font-bold leading-none text-white"
            >
              Proven By Athletes
            </TextReveal>
            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xs lg:max-w-sm lg:text-right pb-1">
              Real voices. Real results. Hear from those who train relentlessly and trust God Wear.
            </p>
          </div>
          <div className="accent-rule-long mt-2" />
        </div>
        {/* Testimonials - Auto Scroll + Manual Swipe */}
        <div ref={marqueeRef} className="relative overflow-hidden testimonial-mask">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[5%] sm:w-[10%] bg-linear-to-r from-dark-900 via-dark-900/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[5%] sm:w-[10%] bg-linear-to-l from-dark-900 via-dark-900/80 to-transparent z-10" />

          {/* Row 1 → scrolls LEFT (faster) */}
          <div className="mb-4 sm:mb-6 py-3">
            <div
              ref={row1Ref}
              className="flex gap-4 sm:gap-6 will-change-transform"
            >
              {[...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData].map((item, index) => (
                <div key={`${item.name}-${index}`} className="shrink-0 depth-card rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[78vw] sm:w-[55vw] md:w-[45vw] lg:w-[32vw] select-none testimonial-card" onMouseEnter={handleCardEnter} onMouseMove={handleCardMove} onMouseLeave={handleCardLeave} style={{ transformStyle: 'preserve-3d' }}>
                  {/* Quote Icon */}
                  <Quote size={20} className="text-gold-500/30 mb-3" strokeWidth={2} />

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < ((index % testimonialsData.length) % 4 === 0 ? 4 : 5) ? "star-gold" : "text-dark-600"}
                        fill={i < ((index % testimonialsData.length) % 4 === 0 ? 4 : 5) ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-white/90 leading-relaxed font-sans line-clamp-4 mb-5">{item.text}</p>

                  {/* Header */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-5 mt-auto border-t border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                        draggable="false"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="sm:text-lg md:text-lg font-semibold md:font-bold text-white font-sans truncate">{item.name}</h3>
                        <BadgeCheck size={14} className="text-green-500 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-sm text-dark-400 font-sans truncate">{item.role}</p>
                    </div>
                    <span className="verified-badge shrink-0 hidden sm:inline-flex">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 → scrolls RIGHT (slower for depth) */}
          <div className="py-3">
            <div
              ref={row2Ref}
              className="flex gap-4 sm:gap-6 will-change-transform"
            >
              {[...testimonialsData].reverse().concat([...testimonialsData].reverse(), [...testimonialsData].reverse(), [...testimonialsData].reverse()).map((item, index) => (
                <div key={`${item.role}-${index}`} className="shrink-0 depth-card rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[78vw] sm:w-[55vw] md:w-[45vw] lg:w-[32vw] select-none testimonial-card" onMouseEnter={handleCardEnter} onMouseMove={handleCardMove} onMouseLeave={handleCardLeave} style={{ transformStyle: 'preserve-3d' }}>
                  {/* Quote Icon */}
                  <Quote size={20} className="text-gold-500/30 mb-3" strokeWidth={2} />

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < ((index % testimonialsData.length) % 4 === 0 ? 4 : 5) ? "star-gold" : "text-dark-600"}
                        fill={i < ((index % testimonialsData.length) % 4 === 0 ? 4 : 5) ? "currentColor" : "none"}
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-white/90 leading-relaxed font-sans line-clamp-4 mb-5">{item.text}</p>

                  {/* Author */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 md:pt-5 mt-auto border-t border-dark-700">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-dark-700 shrink-0">
                      <img
                        className="h-full w-full object-cover"
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        src={item.image}
                        draggable="false"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="sm:text-lg md:text-lg font-semibold md:font-bold text-white font-sans truncate">{item.name}</h3>
                        <BadgeCheck size={14} className="text-green-500 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm md:text-sm text-dark-400 font-sans truncate">{item.role}</p>
                    </div>
                    <span className="verified-badge shrink-0 hidden sm:inline-flex">{uiConfigData.testimonials.verifiedBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className={`flex md:hidden items-center justify-center gap-2 mt-4 text-xs text-dark-400/80 font-sans transition-opacity duration-700 ${showSwipeHint ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold-500/60"><path d="M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" /></svg>
            <span>{uiConfigData.testimonials.swipeHint}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default TestimonialsSection;
