/**
 * Refactored CategorySection using new structure
 * Uses ProductGrid, CategoryTabs components and new data imports
 */

import { useRef, useState } from "react";
import { Section, SectionHeader } from "../components/layout";
import { CategoryTabs, ProductGrid } from "../components/common";
import { CATEGORIES, PRODUCTS, filterProductsByCategory } from "../data";

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {
  const productsContainerRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const tabButtonsRef = useRef([]);

  // Filter products based on active category
  const filteredProducts = filterProductsByCategory(selectedCategory);

  return (
    <Section background="white" padding="default">
      <SectionHeader 
        title="Shop Collection"
        subtitle="Discover our premium range of gym wear designed for peak performance"
      />

      <CategoryTabs 
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        tabsContainerRef={tabsContainerRef}
        tabButtonsRef={tabButtonsRef}
      />

      <ProductGrid 
        products={filteredProducts}
        activeCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        productsContainerRef={productsContainerRef}
      />
    </Section>
  );
};

export default CategorySection;
