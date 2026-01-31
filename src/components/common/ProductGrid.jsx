/**
 * ProductGrid component
 * Displays grid of products with swipe support for category changes
 */

import { useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../../data';

const ProductGrid = ({ 
  products, 
  activeCategory, 
  onCategoryChange,
  productsContainerRef 
}) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Swipe gesture handlers for mobile category switching
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      const currentIndex = CATEGORIES.findIndex(cat => cat.name === activeCategory);

      if (swipeDistance > 0) {
        // Swipe left - next category
        const nextIndex = Math.min(currentIndex + 1, CATEGORIES.length - 1);
        if (nextIndex !== currentIndex) {
          animateCategoryChange(CATEGORIES[nextIndex].name);
        }
      } else {
        // Swipe right - previous category
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          animateCategoryChange(CATEGORIES[prevIndex].name);
        }
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Animate category change
  const animateCategoryChange = (newCategory) => {
    setIsAnimating(true);
    
    // Change category immediately
    onCategoryChange(newCategory);
    
    // Scroll to top of products grid
    if (productsContainerRef.current) {
      const elementPosition = productsContainerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset for navbar
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted">No products found in this category</p>
      </div>
    );
  }

  return (
    <div
      ref={productsContainerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id || index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
