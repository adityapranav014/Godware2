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

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

// Register CustomEase
gsap.registerPlugin(CustomEase);

// Define Signature Agency Eases
// "Secret Sauce" - Fluid, non-robotic, elastic-like but smooth
CustomEase.create("premium", "M0,0 C0.19,1 0.22,1 1,1");
// Dramatic "Apple-like" snap
CustomEase.create("snap", "M0,0 C0.05,0.85 0.1,1 1,1");
// Squeeze anticipation (starts slow, pulls back slightly, then snaps)
CustomEase.create("anticipation", "0.2,-0.1,0.2,1.2");

export const EASE = {
  // Agency-grade custom eases
  premium: "premium",
  snap: "snap",
  anticipation: "anticipation",

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
// MICRO-INTERACTIONS (Agency UX Toolkit)
// These are the "invisible" techniques that
// justify $50k–$200k project fees.
// ========================================

/**
 * shake() — Failed validation feedback.
 * Disney Principle: Action & Reaction.
 * Signals failure without disrupting layout.
 *
 * @param {Element} element - DOM element to shake
 * @param {number} intensity - Pixel intensity (default 7)
 */
export const shake = (element, intensity = 7) => {
  if (!element) return;
  gsap.killTweensOf(element);
  return gsap.to(element, {
    keyframes: {
      x: [0, -intensity, intensity, -(intensity * 0.65), (intensity * 0.65), -(intensity * 0.3), (intensity * 0.3), 0],
    },
    duration: 0.55,
    ease: 'power2.inOut',
    clearProps: 'x',
  });
};

/**
 * ripple() — Click satisfaction signal.
 * Confirms that the user's action was received.
 * Agency tier: Always acknowledge user intent.
 *
 * @param {Element} button - The button element (must be position:relative, overflow:hidden)
 * @param {MouseEvent} event - The click event for position accuracy
 * @param {string} color - Ripple color (default: semi-white)
 */
export const ripple = (button, event, color = 'rgba(255,255,255,0.28)') => {
  if (!button) return;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const x = (event?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (event?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;

  const rippleEl = document.createElement('span');
  rippleEl.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${size}px; height:${size}px;
    left:${x}px; top:${y}px;
    background:${color}; transform-origin:center; z-index:50;
  `;
  button.appendChild(rippleEl);

  return gsap.fromTo(rippleEl,
    { scale: 0, opacity: 0.7 },
    {
      scale: 1, opacity: 0, duration: 0.75, ease: 'power2.out',
      onComplete: () => rippleEl.remove(),
    }
  );
};

/**
 * errorFlash() — Red glow burst on invalid field.
 * Communicates error state through light, not just text.
 * Reduces user frustration by being unmissable.
 *
 * @param {Element} element - The field wrapper element
 */
export const errorFlash = (element) => {
  if (!element) return;
  return gsap.fromTo(element,
    { boxShadow: '0 0 0 2px rgba(239,68,68,0.9), 0 0 24px rgba(239,68,68,0.45)' },
    { boxShadow: '0 0 0 2px rgba(239,68,68,0)', duration: 1.6, ease: 'power2.out', clearProps: 'boxShadow' }
  );
};

/**
 * buttonHoverIn() — Full GSAP hover with anticipation.
 * Agency principle: Buttons must feel alive, not static.
 * Uses a 2-phase micro-timeline: anticipation squeeze → lift.
 *
 * @param {Element} element - The button element
 */
export const buttonHoverIn = (element) => {
  if (!element || isMobile()) return;
  gsap.killTweensOf(element);
  return gsap.timeline()
    .to(element, { scale: 0.97, duration: 0.08, ease: 'power2.in' })
    .to(element, { scale: 1.04, y: -4, duration: 0.28, ease: EASE.backGentle });
};

/**
 * buttonHoverOut() — Follow-through spring-back.
 * The button "settles" with elastic physics, not a dead stop.
 * This tiny detail signals craftsmanship to discerning users.
 *
 * @param {Element} element - The button element
 */
export const buttonHoverOut = (element) => {
  if (!element || isMobile()) return;
  gsap.killTweensOf(element);
  return gsap.to(element, { scale: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: true });
};

/**
 * svgIconDraw() — Stroke line-draw re-animation on hover.
 * Agency principle: Icons should feel drawn-in, not static.
 * Animates all stroked paths in an SVG from invisible → fully drawn.
 * Matches the behaviour already on AboutUsSection feature items.
 *
 * @param {Element | null} svgEl - The <svg> element (or its parent)
 * @param {number} duration - Animation duration in seconds (default 0.5)
 */
export const svgIconDraw = (svgEl, duration = 0.5) => {
  if (!svgEl) return;
  const root = svgEl.tagName === 'svg' ? svgEl : svgEl.querySelector('svg');
  if (!root) return;
  const paths = root.querySelectorAll('path, line, circle, polyline, polygon, rect');
  paths.forEach(path => {
    const length = path.getTotalLength ? path.getTotalLength() : 60;
    gsap.fromTo(path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration, ease: 'power2.inOut', overwrite: 'auto' }
    );
  });
};
