import { useEffect, useState, useCallback, useRef } from 'react';

export const useScrollSpy = (sectionRefs) => {
  const [activeSection, setActiveSection] = useState('Home');
  const rafId = useRef(null);

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // If near the top of the page, always set Home
    if (scrollY < 100) {
      setActiveSection('Home');
      return;
    }

    // If near the bottom of the page, set last section
    if (scrollY + viewportHeight >= document.documentElement.scrollHeight - 50) {
      const sectionNames = Object.keys(sectionRefs);
      setActiveSection(sectionNames[sectionNames.length - 1]);
      return;
    }

    // Find which section is most in view
    // We check which section's top is closest to (but above) the viewport center
    const viewportCenter = scrollY + viewportHeight * 0.4;
    let currentSection = 'Home';
    let minDistance = Infinity;

    Object.entries(sectionRefs).forEach(([name, ref]) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Check if the viewport center is within this section
        if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
          currentSection = name;
          minDistance = 0;
        }
        // Otherwise find the closest section above the viewport center
        else if (sectionTop <= viewportCenter) {
          const distance = viewportCenter - sectionTop;
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = name;
          }
        }
      }
    });

    setActiveSection(currentSection);
  }, [sectionRefs]);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending RAF to avoid stacking
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateActiveSection);
    };

    // Run once on mount to set initial state
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateActiveSection]);

  return activeSection;
};
