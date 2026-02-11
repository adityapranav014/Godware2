import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, BadgeCheck } from "lucide-react";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import Badge from "../components/ui/Badge";
import { EASE, DURATION, STAGGER } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Dhruv Sharma",
    role: "Strength Coach",
    text: "The fit and durability are unreal. After heavy sessions, the compression tee still holds its shape perfectly.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Tarun Thakur",
    role: "CrossFit Athlete",
    text: "Finally, a compression shirt that handles high-intensity intervals without riding up or losing tension.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Rohan Gupta",
    role: "Marathon Runner",
    text: "Breathable and light. The compression reduces muscle fatigue significantly during my long training blocks.",
    image: "https://randomuser.me/api/portraits/men/68.jpg"
  },
  {
    name: "Arjun Malik",
    role: "Bodybuilder",
    text: "The stitching and cut are premium. This compression gear makes my physique look sharp in and out of the gym.",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Karan Mehta",
    role: "Functional Athlete",
    text: "This compression T-shirt locks my torso in place without restricting movement—ideal for stabilizing heavy lifts.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Aarav Joshi",
    role: "Fast Bowler (Cricket)",
    text: "Bowling long spells in heat demands sweat control. This gear keeps my shoulders loose and recovery fast.",
    image: "https://randomuser.me/api/portraits/men/15.jpg"
  },
  {
    name: "Aniket Rao",
    role: "Triathlete",
    text: "The moisture-wicking on this compression top is top-tier. Keeps me dry and supported mile after mile.",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Yash Kulkarni",
    role: "Batsman (Cricket)",
    text: "Running between wickets feels effortless. The shirt moves with my body during drives and pulls.",
    image: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    name: "Devansh Patel",
    role: "HIIT Specialist",
    text: "Hugs the right places so my form stays locked during plyometric drills. Best compression layer I've owned.",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  },
  {
    name: "Pranav Chauhan",
    role: "Football Winger",
    text: "Under my jersey, this base layer is essential. Keeps my core engaged during sprints and tackles.",
    image: "https://randomuser.me/api/portraits/men/41.jpg"
  },
  {
    name: "Nikhil Kapoor",
    role: "Circuit Racer",
    text: "I wear this under my race suit. The compressive feel keeps my muscles warm and responsive on track days.",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Gaurav Tanwar",
    role: "Kabaddi Defender",
    text: "Grip and durability are key. This fabric survives the mat burns and holds me tight during raids.",
    image: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    name: "Lakshya Tiwari",
    role: "Weightlifting Coach",
    text: "My clients ask about this gear constantly. It stays locked in for every snatch and provides excellent core support.",
    image: "https://randomuser.me/api/portraits/men/88.jpg"
  },
  {
    name: "Kartik Menon",
    role: "Tennis Player",
    text: "Serve motion feels unrestricted. The compression helps with arm fatigue deep in the third set.",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    name: "Aryan Desai",
    role: "Fitness Model",
    text: "Perfect for shoots. It never creases, and the compression accentuates muscle definition like nothing else.",
    image: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    name: "Rajveer Chahal",
    role: "Pro Boxer",
    text: "Sparring puts gear to the test. This shirt stays intact and protects my skin during clinches.",
    image: "https://randomuser.me/api/portraits/men/58.jpg"
  },
  {
    name: "Himanshu Dixit",
    role: "Trail Runner",
    text: "Heat and humidity are no match; the tee moves with me while supporting my midsection on uneven terrain.",
    image: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    name: "Deepak Rathore",
    role: "Javelin Thrower",
    text: "Explosive power needs stability. This compression top supports my rotation perfectly during throws.",
    image: "https://randomuser.me/api/portraits/men/71.jpg"
  },
  {
    name: "Kabir Seth",
    role: "Powerlifter",
    text: "Compression panels feel like a second skin. The tightness gives me that extra confidence under the heavy bar.",
    image: "https://randomuser.me/api/portraits/men/90.jpg"
  },
  {
    name: "Piyush Yadav",
    role: "Wrestler",
    text: "Grappling requires freedom of movement. This shirt shows off the gains and supports the grind.",
    image: "https://randomuser.me/api/portraits/men/14.jpg"
  },
  {
    name: "Saurabh Nair",
    role: "Cyclist",
    text: "Aerodynamics matter. This fits perfectly under my kit and wicks sweat on long rides.",
    image: "https://randomuser.me/api/portraits/men/25.jpg"
  }
];

/**
 * Professional GSAP-powered infinite marquee hook.
 * Uses GPU-accelerated transforms for buttery-smooth animation.
 * 
 * @param {React.RefObject} containerRef - ref to the flex row container
 * @param {number} speed - pixels per frame (default 0.5)
 * @param {boolean} reverse - if true, scrolls right instead of left
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

    // Initialize reverse row position
    if (reverse) {
      xRef.current = -getHalfWidth();
      gsap.set(el, { x: xRef.current });
    }

    // --- Animation loop (GPU-accelerated via GSAP transforms) ---
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

    // --- Mouse Drag (desktop) ---
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
      // Seamless wrap
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

    // --- Touch Drag (mobile) ---
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

      // Determine swipe direction once
      if (touchState.current.isHorizontal === null) {
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
          touchState.current.isHorizontal = Math.abs(dx) > Math.abs(dy);
        }
        return;
      }

      // Vertical swipe → let page scroll naturally
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

    // --- Mouse wheel (convert vertical to horizontal) ---
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
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
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

    // Header entrance
    tl.fromTo(
      headerRef.current,
      { y: 40, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.power,
      },
      '-=0.3'
    );

    // Marquee entrance (container fade in)
    tl.fromTo(
      marqueeRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.power,
      },
      '-=0.2'
    );
  }, { scope: sectionRef });

  // Row 1: scrolls LEFT  |  Row 2: scrolls RIGHT (opposite)
  useMarquee(row1Ref, 0.8, false);
  useMarquee(row2Ref, 0.6, true);

  return (
    <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white section-gradient-alt noise-overlay" containerClassName="w-full max-w-full">
      <div className="space-y-8 sm:space-y-10 md:space-y-12">

        {/* Badge */}
        <div ref={badgeRef}>
          <Badge>Voices</Badge>
        </div>

        {/* Header */}
        <div ref={headerRef}>
          <SectionHeader
            title="Proven By Athletes"
            subtitle="Real voices. Real results. Hear from those who train relentlessly and trust God Wear."
            align="center"
            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
            subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
          />
        </div>

        {/* Testimonials - Auto Scroll + Manual Swipe */}
        <div ref={marqueeRef} className="relative overflow-hidden testimonial-mask">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[5%] sm:w-[10%] bg-gradient-to-r from-dark-900 via-dark-900/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[5%] sm:w-[10%] bg-gradient-to-l from-dark-900 via-dark-900/80 to-transparent z-10" />

          {/* Row 1 → scrolls LEFT */}
          <div className="mb-4 sm:mb-6 overflow-hidden">
            <div
              ref={row1Ref}
              className="flex gap-4 sm:gap-6 will-change-transform"
            >
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex-shrink-0 depth-card rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] select-none testimonial-card">
                  {/* Quote Icon */}
                  <Quote size={20} className="text-gold-500/30 mb-3" strokeWidth={2} />

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < (index % 3 === 0 ? 4 : 5) ? "star-gold" : "text-dark-600"}
                        fill={i < (index % 3 === 0 ? 4 : 5) ? "currentColor" : "none"}
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

          {/* Row 2 → scrolls RIGHT (opposite) */}
          <div className="overflow-hidden">
            <div
              ref={row2Ref}
              className="flex gap-4 sm:gap-6 will-change-transform"
            >
              {[...testimonials].reverse().concat([...testimonials].reverse(), [...testimonials].reverse(), [...testimonials].reverse()).map((item, index) => (
                <div key={`${item.role}-${index}`} className="flex-shrink-0 depth-card rounded-xl sm:rounded-2xl md:rounded-2xl p-5 sm:p-6 md:p-8 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[32vw] select-none">
                  {/* Quote Icon */}
                  <Quote size={20} className="text-gold-500/30 mb-3" strokeWidth={2} />

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < (index % 2 === 0 ? 5 : 4) ? "star-gold" : "text-dark-600"}
                        fill={i < (index % 2 === 0 ? 5 : 4) ? "currentColor" : "none"}
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
                    <span className="verified-badge shrink-0 hidden sm:inline-flex">Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default TestimonialsSection;
