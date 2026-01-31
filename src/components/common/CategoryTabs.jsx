/**
 * CategoryTabs component
 * Displays horizontal category filter tabs with swipe support
 */

import { useCallback, useEffect } from 'react';
import { CATEGORIES } from '../../data';

const CategoryTabs = ({ activeCategory, onCategoryChange, tabsContainerRef, tabButtonsRef }) => {
  
  // Scroll active tab into view smoothly
  const scrollActiveTabIntoView = useCallback(
    (categoryName) => {
      if (!tabsContainerRef.current) return;

      const activeIndex = CATEGORIES.findIndex(cat => cat.name === categoryName);
      const activeButton = tabButtonsRef.current[activeIndex];

      if (activeButton && tabsContainerRef.current) {
        const container = tabsContainerRef.current;
        const button = activeButton;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const scrollLeft = button.offsetLeft - (containerRect.width / 2) + (buttonRect.width / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    },
    [tabsContainerRef, tabButtonsRef]
  );

  // Scroll to active tab on mount and category change
  useEffect(() => {
    scrollActiveTabIntoView(activeCategory);
  }, [activeCategory, scrollActiveTabIntoView]);

  return (
    <div 
      ref={tabsContainerRef}
      className="flex md:justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide mb-10 sm:mb-12 pb-2 px-4 sm:px-6 md:px-0"
    >
      {CATEGORIES.map((category, index) => {
        const isActive = activeCategory === category.name;
        const count = category.count;
        
        return (
          <button
            key={category.id}
            ref={el => tabButtonsRef.current[index] = el}
            onClick={() => onCategoryChange(category.name)}
            className={`
              flex-shrink-0 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer font-manrope
              ${isActive 
                ? 'bg-accent/15 text-white border-accent/70 shadow-lg scale-105' 
                : 'bg-white/5 text-white/70 border-white/10 hover:border-accent/60 hover:text-white'
              }
            `}
          >
            <span className="font-semibold">{category.name}</span>
            {count > 0 && (
              <span className={`ml-2 ${isActive ? 'text-white/70' : 'text-white/50'}`}>
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
