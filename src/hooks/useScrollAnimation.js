/**
 * useScrollAnimation Hook
 * Premium scroll-triggered animations with mobile-first approach
 * Optimized for performance on touch devices with smooth, buttery animations
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ANIMATIONS, 
  SCROLL_TRIGGER, 
  STAGGER,
  getAnimation,
  cleanupScrollTriggers,
  isMobile,
  getResponsiveStagger,
  optimizeForAnimation,
  debounce
} from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

// Configure ScrollTrigger for better mobile performance
ScrollTrigger.config({ 
  limitCallbacks: true,
  syncInterval: isMobile() ? 120 : 60,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

/**
 * Main scroll animation hook
 * @param {Object} options - Animation configuration
 */
export const useScrollAnimation = (options = {}) => {
  const {
    animation = 'fadeInUp', // Animation preset name
    trigger = 'default', // Scroll trigger preset
    stagger = null, // Stagger configuration
    customAnimation = null, // Custom animation object
    dependencies = [], // Dependencies array
    markers = false, // Debug markers
  } = options;

  const elementRef = useRef(null);
  const triggersRef = useRef([]);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animConfig = customAnimation || getAnimation(ANIMATIONS[animation]);
    const scrollConfig = SCROLL_TRIGGER[trigger] || SCROLL_TRIGGER.default;

    // Optimize element for animation
    cleanupRef.current = optimizeForAnimation(element);

    // Apply animation with mobile-optimized settings
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        ...scrollConfig,
        markers: markers,
        fastScrollEnd: isMobile() ? true : false,
        preventOverlaps: true,
      }
    });

    tl.fromTo(
      element,
      animConfig.from,
      {
        ...animConfig.to,
        ...(stagger && { 
          stagger: typeof stagger === 'string' 
            ? getResponsiveStagger(stagger) 
            : stagger 
        }),
        onComplete: () => {
          // Clean up will-change after animation
          if (cleanupRef.current) {
            cleanupRef.current();
          }
        }
      }
    );

    triggersRef.current.push(tl.scrollTrigger);

    return () => {
      cleanupScrollTriggers(triggersRef.current);
      tl.kill();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, dependencies);

  return elementRef;
};

/**
 * Batch animation for multiple elements
 */
export const useBatchAnimation = (options = {}) => {
  const {
    animation = 'fadeInUp',
    trigger = 'default',
    stagger = 'normal',
    selector = '.animate-item',
    dependencies = [],
    markers = false,
  } = options;

  const containerRef = useRef(null);
  const triggersRef = useRef([]);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Optimize elements for animation
    cleanupRef.current = optimizeForAnimation(containerRef.current);

    const animConfig = getAnimation(ANIMATIONS[animation]);
    const scrollConfig = SCROLL_TRIGGER[trigger] || SCROLL_TRIGGER.default;
    const staggerConfig = typeof stagger === 'string' 
      ? getResponsiveStagger(stagger) 
      : stagger;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        ...scrollConfig,
        markers: markers,
        fastScrollEnd: isMobile() ? true : false,
        preventOverlaps: true,
      }
    });

    tl.fromTo(
      elements,
      animConfig.from,
      {
        ...animConfig.to,
        stagger: staggerConfig,
        onComplete: () => {
          if (cleanupRef.current) {
            cleanupRef.current();
          }
        }
      }
    );

    triggersRef.current.push(tl.scrollTrigger);

    return () => {
      cleanupScrollTriggers(triggersRef.current);
      tl.kill();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, dependencies);

  return containerRef;
};

/**
 * Parallax effect hook - Mobile optimized
 */
export const useParallax = (options = {}) => {
  const {
    speed = 0.5, // Parallax speed (0-1)
    direction = 'vertical', // 'vertical' or 'horizontal'
    dependencies = [],
  } = options;

  const elementRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Reduce parallax effect on mobile for better performance
    const effectiveSpeed = isMobile() ? speed * 0.5 : speed;
    const movement = direction === 'vertical' 
      ? { y: -100 * effectiveSpeed } 
      : { x: -100 * effectiveSpeed };

    gsap.to(element, {
      ...movement,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: isMobile() ? 2 : 1.5,
        invalidateOnRefresh: true,
      }
    });

    triggerRef.current = ScrollTrigger.getById(element);

    return () => {
      triggerRef.current?.kill();
    };
  }, dependencies);

  return elementRef;
};

/**
 * Reveal on scroll with intersection observer fallback
 */
export const useRevealOnScroll = (options = {}) => {
  const {
    threshold = 0.1,
    animation = 'fadeInUp',
    once = true,
    dependencies = [],
  } = options;

  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animConfig = getAnimation(ANIMATIONS[animation]);

    // Set initial state
    gsap.set(element, animConfig.from);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimatedRef.current)) {
            gsap.to(element, animConfig.to);
            hasAnimatedRef.current = true;
            
            if (once) {
              observer.unobserve(element);
            }
          } else if (!entry.isIntersecting && !once) {
            gsap.to(element, { ...animConfig.from, duration: 0.3 });
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, dependencies);

  return elementRef;
};

/**
 * Stagger children animation
 */
export const useStaggerChildren = (options = {}) => {
  const {
    animation = 'fadeInUp',
    stagger = 'normal',
    trigger = 'default',
    childSelector = '> *',
    dependencies = [],
  } = options;

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(childSelector);
    if (children.length === 0) return;

    cleanupRef.current = optimizeForAnimation(containerRef.current);

    const animConfig = getAnimation(ANIMATIONS[animation]);
    const scrollConfig = SCROLL_TRIGGER[trigger] || SCROLL_TRIGGER.default;
    const staggerConfig = typeof stagger === 'string' 
      ? getResponsiveStagger(stagger) 
      : stagger;

    gsap.fromTo(
      children,
      animConfig.from,
      {
        ...animConfig.to,
        stagger: staggerConfig,
        scrollTrigger: {
          trigger: containerRef.current,
          ...scrollConfig,
          fastScrollEnd: isMobile() ? true : false,
        },
        onComplete: () => {
          if (cleanupRef.current) {
            cleanupRef.current();
          }
        }
      }
    );

    triggerRef.current = ScrollTrigger.getById(containerRef.current);

    return () => {
      triggerRef.current?.kill();
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, dependencies);

  return containerRef;
};

/**
 * Split text animation (requires SplitType library)
 */
export const useSplitText = (options = {}) => {
  const {
    type = 'lines', // 'lines', 'words', or 'chars'
    animation = 'fadeInUp',
    stagger = 'fast',
    trigger = 'default',
    dependencies = [],
  } = options;

  const textRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // This requires SplitType library - ensure it's installed
    import('split-type').then(({ default: SplitType }) => {
      const split = new SplitType(textRef.current, { types: type });
      const animConfig = getAnimation(ANIMATIONS[animation]);
      const scrollConfig = SCROLL_TRIGGER[trigger] || SCROLL_TRIGGER.default;
      const staggerConfig = typeof stagger === 'string' ? STAGGER[stagger] : stagger;

      gsap.fromTo(
        split[type],
        animConfig.from,
        {
          ...animConfig.to,
          stagger: staggerConfig,
          scrollTrigger: {
            trigger: textRef.current,
            ...scrollConfig,
          }
        }
      );

      triggerRef.current = ScrollTrigger.getById(textRef.current);
    }).catch(err => {
      console.warn('SplitType not available, using fallback animation');
      const animConfig = getAnimation(ANIMATIONS[animation]);
      gsap.fromTo(textRef.current, animConfig.from, animConfig.to);
    });

    return () => {
      triggerRef.current?.kill();
    };
  }, dependencies);

  return textRef;
};

/**
 * Magnetic button effect - Desktop only for premium feel
 */
export const useMagneticHover = (options = {}) => {
  const { strength = 0.3, enabled = !isMobile() } = options;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current || !enabled) return;

    const button = buttonRef.current;
    let bounds;

    const handleMouseMove = (e) => {
      if (!bounds) bounds = button.getBoundingClientRect();
      
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
      });
      bounds = null;
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, enabled]);

  return buttonRef;
};
