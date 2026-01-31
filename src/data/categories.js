/**
 * Product categories and filter configuration
 */

export const CATEGORIES = [
  {
    id: 'all',
    name: 'All',
    count: 2,
    isActive: true
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    count: 2,
    isActive: false
  },
  {
    id: 'shorts',
    name: 'Shorts',
    count: 0,
    isActive: false
  },
  {
    id: 'trousers',
    name: 'Trousers',
    count: 0,
    isActive: false
  },
  {
    id: 'accessories',
    name: 'Accessories',
    count: 0,
    isActive: false
  }
];

export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name) => {
  return CATEGORIES.find(cat => cat.name === name);
};
