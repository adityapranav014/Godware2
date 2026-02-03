/**
 * Animation Configuration & Utilities
 * Premium easing functions and animation presets for industry-grade GSAP animations
 * Optimized for both desktop and mobile experiences with performance-first approach
 */

// ========================================
// DEVICE DETECTION
// ========================================

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// ========================================
// PREMIUM EASING FUNCTIONS
// ========================================

export const EASE = {
  // Smooth & Natural - Best for mobile
  smooth: 'power2.out',
  smoothIn: 'power2.in',
  smoothInOut: 'power2.inOut',
  
  // Dynamic & Punchy - Premium feel
  power: 'power3.out',
  powerIn: 'power3.in',
  powerInOut: 'power3.inOut',
  
  // Dramatic & Cinematic - Desktop emphasis
  expo: 'expo.out',
  expoIn: 'expo.in',
  expoInOut: 'expo.inOut',
  
  // Elastic & Playful - Use sparingly on mobile
  elastic: 'elastic.out(1, 0.6)',
  elasticSoft: 'elastic.out(1, 0.8)',
  elasticGentle: 'elastic.out(1, 0.9)',
  
  // Back & Anticipation - Great for buttons
  back: 'back.out(1.4)',
  backSoft: 'back.out(1.2)',
  backGentle: 'back.out(1.1)',
  backInOut: 'back.inOut(1.7)',
  
  // Bounce - Limited use
  bounce: 'bounce.out',
  
  // Sine (Gentle) - Excellent for mobile
  sine: 'sine.out',
  sineIn: 'sine.in',
  sineInOut: 'sine.inOut',
  
  // Circ (Smooth Acceleration) - Premium feel
  circ: 'circ.out',
  circIn: 'circ.in',
  circInOut: 'circ.inOut',
};

// ========================================
// ANIMATION DURATIONS (Mobile-Optimized)
// ========================================

export const DURATION = {
  instant: 0.15,
  micro: 0.25,
  fast: 0.35,
  normal: 0.5,
  medium: 0.65,
  slow: 0.85,
  slower: 1.0,
  slowest: 1.3,
  cinematic: 1.6,
  epic: 2.0,
};

// Mobile-specific durations (20% faster for snappier feel)
export const MOBILE_DURATION = {
  instant: 0.12,
  micro: 0.2,
  fast: 0.28,
  normal: 0.4,
  medium: 0.52,
  slow: 0.68,
  slower: 0.8,
  slowest: 1.0,
  cinematic: 1.3,
  epic: 1.6,
};

// Get responsive duration based on device
export const getResponsiveDuration = (durationType = 'normal') => {
  return isMobile() ? MOBILE_DURATION[durationType] : DURATION[durationType];
};

// ========================================
// STAGGER CONFIGURATIONS (Performance-Optimized)
// ========================================

export const STAGGER = {
  micro: 0.02,
  tiny: 0.04,
  fast: 0.05,
  normal: 0.08,
  medium: 0.12,
  slow: 0.15,
  dramatic: 0.2,
  
  // Advanced stagger with from position
  fromCenter: { 
    amount: 0.25, 
    from: 'center', 
    ease: EASE.power 
  },
  fromEdges: { 
    amount: 0.25, 
    from: 'edges', 
    ease: EASE.power 
  },
  fromStart: { 
    amount: 0.25, 
    from: 'start', 
    ease: EASE.power 
  },
  fromEnd: { 
    amount: 0.25, 
    from: 'end', 
    ease: EASE.power 
  },
};

// Mobile-specific stagger (faster for better perceived performance)
export const MOBILE_STAGGER = {
  micro: 0.015,
  tiny: 0.03,
  fast: 0.04,
  normal: 0.06,
  medium: 0.09,
  slow: 0.12,
  dramatic: 0.15,
};

export const getResponsiveStagger = (staggerType = 'normal') => {
  if (typeof staggerType === 'object') return staggerType;
  return isMobile() ? MOBILE_STAGGER[staggerType] : STAGGER[staggerType];
};

// ========================================
// SCROLL TRIGGER PRESETS (Mobile-Optimized)
// ========================================

export const SCROLL_TRIGGER = {
  // Standard entrance - mobile optimized
  default: {
    start: 'top 85%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  
  // Delayed entrance
  delayed: {
    start: 'top 75%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  
  // Early entrance - better for mobile
  early: {
    start: 'top 90%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
  },
  
  // Immediate - as soon as in viewport
  immediate: {
    start: 'top 98%',
    end: 'bottom 10%',
    toggleActions: 'play none none none',
  },
  
  // Pinned section
  pin: {
    start: 'top top',
    end: 'bottom top',
    pin: true,
    scrub: 1,
  },
  
  // Parallax - smooth on mobile
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: isMobile() ? 1.5 : 1,
  },
  
  // Scrub smooth - better mobile performance
  scrubSmooth: {
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: isMobile() ? 2 : 1.5,
  },
  
  // Once - plays once, never reverses (best for performance)
  once: {
    start: 'top 85%',
    end: 'bottom 20%',
    once: true,
  },
};

// ========================================
// ANIMATION PRESETS (Mobile-First Design)
// ========================================

export const ANIMATIONS = {
  // Fade animations - silky smooth
  fadeIn: {
    from: { opacity: 0 },
    to: { 
      opacity: 1, 
      duration: getResponsiveDuration('normal'), 
      ease: EASE.sine 
    },
  },
  
  fadeInUp: {
    from: { opacity: 0, y: isMobile() ? 30 : 40 },
    to: { 
      opacity: 1, 
      y: 0, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.circ 
    },
  },
  
  fadeInDown: {
    from: { opacity: 0, y: isMobile() ? -30 : -40 },
    to: { 
      opacity: 1, 
      y: 0, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.circ 
    },
  },
  
  fadeInLeft: {
    from: { opacity: 0, x: isMobile() ? -40 : -60 },
    to: { 
      opacity: 1, 
      x: 0, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.circ 
    },
  },
  
  fadeInRight: {
    from: { opacity: 0, x: isMobile() ? 40 : 60 },
    to: { 
      opacity: 1, 
      x: 0, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.circ 
    },
  },
  
  // Scale animations - premium feel
  scaleIn: {
    from: { opacity: 0, scale: 0.85 },
    to: { 
      opacity: 1, 
      scale: 1, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.backGentle 
    },
  },
  
  scaleInSubtle: {
    from: { opacity: 0, scale: 0.96 },
    to: { 
      opacity: 1, 
      scale: 1, 
      duration: getResponsiveDuration('normal'), 
      ease: EASE.circ 
    },
  },
  
  scaleInBold: {
    from: { opacity: 0, scale: 0.7 },
    to: { 
      opacity: 1, 
      scale: 1, 
      duration: getResponsiveDuration('slow'), 
      ease: EASE.backSoft 
    },
  },
  
  // Blur animations (premium effect) - optimized for mobile
  blurIn: {
    from: { 
      opacity: 0, 
      filter: isMobile() ? 'blur(10px)' : 'blur(20px)', 
      scale: 1.03 
    },
    to: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1, 
      duration: getResponsiveDuration('slow'), 
      ease: EASE.circ 
    },
  },
  
  // Rotate animations - subtle on mobile
  rotateIn: {
    from: { 
      opacity: 0, 
      rotateY: isMobile() ? -25 : -45, 
      scale: 0.92 
    },
    to: { 
      opacity: 1, 
      rotateY: 0, 
      scale: 1, 
      duration: getResponsiveDuration('slow'), 
      ease: EASE.backGentle 
    },
  },
  
  // Clip path animations (modern reveal) - desktop only for performance
  clipReveal: {
    from: { 
      clipPath: 'inset(0% 100% 0% 0%)', 
      opacity: 0 
    },
    to: { 
      clipPath: 'inset(0% 0% 0% 0%)', 
      opacity: 1, 
      duration: getResponsiveDuration('slow'), 
      ease: EASE.expo 
    },
  },
  
  // Slide reveal - smooth
  slideRevealRight: {
    from: { 
      x: isMobile() ? -60 : -100, 
      opacity: 0 
    },
    to: { 
      x: 0, 
      opacity: 1, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.expo 
    },
  },
  
  // Premium text reveal (letter by letter) - desktop optimized
  textReveal: {
    from: { 
      y: isMobile() ? 60 : 100, 
      opacity: 0, 
      rotateX: -90 
    },
    to: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      duration: getResponsiveDuration('medium'), 
      ease: EASE.power,
      stagger: getResponsiveStagger('tiny')
    },
  },
  
  // Combined premium entrance - hero elements
  heroEntrance: {
    from: { 
      opacity: 0, 
      y: isMobile() ? 40 : 60,
      scale: 0.95,
      filter: isMobile() ? 'blur(5px)' : 'blur(10px)'
    },
    to: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: getResponsiveDuration('slow'), 
      ease: EASE.expo 
    },
  },
};

// ========================================
// HOVER ANIMATIONS (Touch-Optimized)
// ========================================

export const HOVER = {
  // Lift effect - reduced for mobile
  lift: {
    y: isMobile() ? -4 : -8,
    scale: isMobile() ? 1.01 : 1.02,
    duration: getResponsiveDuration('fast'),
    ease: EASE.circ,
  },
  
  // Scale effect - subtle on mobile
  scale: {
    scale: isMobile() ? 1.03 : 1.05,
    duration: getResponsiveDuration('fast'),
    ease: EASE.backGentle,
  },
  
  // Bold scale - for CTA buttons
  scaleBold: {
    scale: isMobile() ? 1.05 : 1.08,
    duration: getResponsiveDuration('fast'),
    ease: EASE.backSoft,
  },
  
  // Glow effect - premium
  glow: {
    boxShadow: isMobile() 
      ? '0 12px 40px rgba(201, 139, 58, 0.35)' 
      : '0 20px 60px rgba(201, 139, 58, 0.4)',
    duration: getResponsiveDuration('fast'),
    ease: EASE.power,
  },
  
  // Rotate slight
  tilt: {
    rotateZ: isMobile() ? 1 : 2,
    duration: getResponsiveDuration('fast'),
    ease: EASE.power,
  },
  
  // Magnetic pull - desktop only
  magnetic: {
    duration: 0.3,
    ease: 'power2.out',
  },
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Create responsive animation values based on viewport width
 */
export const responsiveValue = (mobile, tablet, desktop) => {
  const width = window.innerWidth;
  if (width < 768) return mobile;
  if (width < 1024) return tablet;
  return desktop;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation with reduced motion and mobile fallback
 */
export const getAnimation = (animation) => {
  // Respect user's reduced motion preference
  if (prefersReducedMotion()) {
    return {
      from: { opacity: 0 },
      to: { opacity: 1, duration: 0.2, ease: 'none' },
    };
  }
  
  // Mobile optimization - simpler animations
  if (isMobile()) {
    // Remove complex transforms and filters on mobile for better performance
    const mobileFrom = { ...animation.from };
    const mobileTo = { ...animation.to };
    
    // Reduce blur effects on mobile
    if (mobileFrom.filter && mobileFrom.filter.includes('blur')) {
      const blurMatch = mobileFrom.filter.match(/blur\((\d+)px\)/);
      if (blurMatch) {
        const blurValue = Math.min(parseInt(blurMatch[1]) / 2, 10);
        mobileFrom.filter = `blur(${blurValue}px)`;
      }
    }
    
    // Reduce movement distances on mobile
    if (mobileFrom.y) mobileFrom.y = mobileFrom.y * 0.7;
    if (mobileFrom.x) mobileFrom.x = mobileFrom.x * 0.7;
    
    return {
      from: mobileFrom,
      to: mobileTo,
    };
  }
  
  return animation;
};

/**
 * Batch scroll trigger cleanup
 */
export const cleanupScrollTriggers = (triggers) => {
  triggers.forEach(trigger => trigger?.kill());
};

/**
 * Set will-change property for better performance
 */
export const optimizeForAnimation = (element, properties = 'transform, opacity') => {
  if (element) {
    element.style.willChange = properties;
    return () => {
      element.style.willChange = 'auto';
    };
  }
};

/**
 * Debounced window resize handler
 */
export const debounce = (func, wait = 150) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
