/**
 * Custom hook for smooth scrolling to sections using GSAP
 */

import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ANIMATION_CONFIG } from '../constants';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

export const useScrollToSection = (sectionRefs) => {
  const scrollToSection = useCallback((sectionName) => {
    // For Home section, scroll to top directly
    if (sectionName === 'Home') {
      gsap.to(window, {
        duration: ANIMATION_CONFIG.scrollDuration,
        scrollTo: { y: 0 },
        ease: 'power2.inOut'
      });
      return;
    }

    // For other sections, use ref with offset
    const targetRef = sectionRefs[sectionName];
    
    if (!targetRef || !targetRef.current) {
      console.warn(`Section ref for "${sectionName}" not found`);
      return;
    }

    gsap.to(window, {
      duration: ANIMATION_CONFIG.scrollDuration,
      scrollTo: {
        y: targetRef.current,
        offsetY: ANIMATION_CONFIG.scrollOffset
      },
      ease: 'power2.inOut'
    });
  }, [sectionRefs]);

  return scrollToSection;
};
