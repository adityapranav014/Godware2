import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium Text Reveal Component — Agency-level text splitting + GSAP animation.
 * 
 * @param {string} variant - Animation style: 'slideUp' | 'fadeBlur' | 'rotateIn' | 'stagger3D' | 'wordSlide'
 * @param {string} as - HTML element to render (default: 'div')
 * @param {string} splitBy - Split text by: 'words' | 'chars' | 'lines' | 'words,chars'
 * @param {string} trigger - ScrollTrigger start position (default: 'top 85%')
 * @param {number} stagger - Stagger amount between elements (default: 0.04)
 * @param {number} duration - Animation duration (default: 0.8)
 * @param {number} delay - Initial delay (default: 0)
 * @param {boolean} scrub - Whether to scrub animation to scroll (default: false)
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Text content
 */
const TextReveal = ({
  variant = 'slideUp',
  as: Tag = 'div',
  splitBy = 'words',
  trigger = 'top 85%',
  stagger = 0.04,
  duration = 0.8,
  delay = 0,
  scrub = false,
  className = '',
  children,
  style = {},
  ...rest
}) => {
  const containerRef = useRef(null);
  const splitRef = useRef(null);
  const tlRef = useRef(null);

  const getAnimationConfig = useCallback((elements) => {
    const mobile = window.innerWidth < 768;

    switch (variant) {
      case 'slideUp':
        return {
          from: {
            y: mobile ? '80%' : '110%',
            opacity: 0,
            rotateX: mobile ? 0 : -40,
          },
          to: {
            y: '0%',
            opacity: 1,
            rotateX: 0,
            duration,
            stagger,
            ease: 'power4.out',
          },
        };

      case 'fadeBlur':
        return {
          from: {
            opacity: 0,
            filter: mobile ? 'blur(4px)' : 'blur(12px)',
            y: mobile ? 15 : 30,
          },
          to: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: duration * 1.2,
            stagger: stagger * 1.5,
            ease: 'power3.out',
          },
        };

      case 'rotateIn':
        return {
          from: {
            opacity: 0,
            rotateY: mobile ? -30 : -60,
            rotateX: mobile ? -10 : -20,
            scale: 0.85,
            transformOrigin: 'left center',
          },
          to: {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: duration * 1.3,
            stagger: stagger * 2,
            ease: 'expo.out',
          },
        };

      case 'stagger3D':
        return {
          from: {
            opacity: 0,
            y: mobile ? 30 : 60,
            z: mobile ? -30 : -80,
            rotateX: mobile ? -30 : -60,
            scale: 0.9,
          },
          to: {
            opacity: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            scale: 1,
            duration: duration * 1.1,
            stagger: stagger * 1.5,
            ease: 'back.out(1.2)',
          },
        };

      case 'wordSlide':
        return {
          from: {
            y: '100%',
            opacity: 0,
          },
          to: {
            y: '0%',
            opacity: 1,
            duration: duration * 0.9,
            stagger: stagger * 2,
            ease: 'power3.out',
          },
        };

      case 'scramble':
        // Scramble uses a custom per-char sequence — return minimal config
        // Real animation is handled outside getAnimationConfig
        return {
          from: { opacity: 0 },
          to: { opacity: 1, duration: 0.001 },
        };

      default:
        return {
          from: { opacity: 0, y: 30 },
          to: { opacity: 1, y: 0, duration, stagger, ease: 'power3.out' },
        };
    }
  }, [variant, duration, stagger]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Set initial opacity to prevent FOUC
    gsap.set(el, { opacity: 1 });

    // Split the text
    // 'scramble' requires chars — auto-coerce splitBy to ensure chars are available
    const effectiveSplitBy = variant === 'scramble'
      ? (splitBy.includes('chars') ? splitBy : 'chars')
      : splitBy;

    splitRef.current = new SplitType(el, {
      types: effectiveSplitBy,
      tagName: 'span',
    });

    // Get the split elements
    let elements;
    if (effectiveSplitBy.includes(',')) {
      // For 'words,chars', animate chars
      elements = splitRef.current.chars;
    } else if (effectiveSplitBy === 'chars') {
      elements = splitRef.current.chars;
    } else if (effectiveSplitBy === 'lines') {
      elements = splitRef.current.lines;
    } else {
      elements = splitRef.current.words;
    }

    if (!elements || elements.length === 0) return;

    // Add overflow hidden to parent spans for clip-mask effect
    if (variant === 'slideUp' || variant === 'wordSlide') {
      // For word-based splits, wrap each word's parent in overflow hidden
      if (effectiveSplitBy === 'words' || effectiveSplitBy === 'lines') {
        elements.forEach(word => {
          if (word.parentElement) {
            word.parentElement.style.overflow = 'hidden';
            word.parentElement.style.display = 'inline-block';
            word.parentElement.style.verticalAlign = 'bottom';
            // Extra padding above clips the rotateX:-40 top-edge during entry.
            // Equal negative margin ensures line spacing stays correct.
            // paddingBottom mirrors this for descenders (g, y, p, q, j) —
            // without it, overflow:hidden hard-clips the tails of those glyphs.
            if (variant === 'slideUp') {
              word.parentElement.style.paddingTop = '0.22em';
              word.parentElement.style.marginTop = '-0.22em';
              word.parentElement.style.paddingBottom = '0.22em';
              word.parentElement.style.marginBottom = '-0.22em';
            }
          }
          word.style.display = 'inline-block';
          word.style.willChange = 'transform, opacity';
        });
      }
    }

    // Apply perspective for 3D variants
    if (variant === 'rotateIn' || variant === 'stagger3D') {
      el.style.perspective = '1000px';
      elements.forEach(item => {
        item.style.display = 'inline-block';
        item.style.willChange = 'transform, opacity';
      });
    }

    const config = getAnimationConfig(elements);

    // =========================================
    // SCRAMBLE VARIANT — Agency Signature Effect
    // Characters randomize then resolve to real text.
    // Signals technical sophistication to users.
    // =========================================
    if (variant === 'scramble') {
      // Scramble works best on chars; fall back to words
      const scrambleTargets = splitRef.current.chars || elements;
      const originalTexts = scrambleTargets.map(c => c.textContent);
      const randomPool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz0123456789!@#$%&*';
      const callsRef = [];

      gsap.set(scrambleTargets, { opacity: 0 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: trigger,
        once: true,
        onEnter: () => {
          scrambleTargets.forEach((char, i) => {
            const charDelay = delay + i * stagger;
            const scrambleCount = Math.floor(Math.random() * 4) + 5;
            const call = gsap.delayedCall(charDelay, () => {
              let count = 0;
              gsap.set(char, { opacity: 1 });
              const tick = () => {
                if (count < scrambleCount) {
                  char.textContent = randomPool[Math.floor(Math.random() * randomPool.length)];
                  count++;
                  const innerCall = gsap.delayedCall(0.04, tick);
                  callsRef.push(innerCall);
                } else {
                  char.textContent = originalTexts[i];
                }
              };
              tick();
            });
            callsRef.push(call);
          });
        },
      });

      // Store for cleanup
      tlRef.current = { kill: () => { st.kill(); callsRef.forEach(c => c.kill()); } };

      const handleResize = () => { if (splitRef.current) splitRef.current.revert(); };
      let resizeTimeout;
      const debouncedResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(handleResize, 250); };
      window.addEventListener('resize', debouncedResize);
      return () => {
        window.removeEventListener('resize', debouncedResize);
        clearTimeout(resizeTimeout);
        tlRef.current?.kill();
        if (splitRef.current) splitRef.current.revert();
      };
    }

    // Create timeline
    const scrollConfig = scrub
      ? {
        trigger: el,
        start: trigger,
        end: 'bottom 20%',
        scrub: 1.5,
      }
      : {
        trigger: el,
        start: trigger,
        once: true,
      };

    tlRef.current = gsap.timeline({
      scrollTrigger: scrollConfig,
      delay,
    });

    tlRef.current.fromTo(elements, config.from, config.to);

    // Handle resize - revert and re-split
    const handleResize = () => {
      if (splitRef.current) {
        splitRef.current.revert();

        splitRef.current = new SplitType(el, {
          types: splitBy,
          tagName: 'span',
        });
      }
    };

    // Debounced resize
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
      if (tlRef.current) {
        tlRef.current.kill();
      }
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [splitBy, variant, trigger, getAnimationConfig, delay, scrub]);

  return (
    <Tag
      ref={containerRef}
      className={className}
      style={{ opacity: 0, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default TextReveal;
