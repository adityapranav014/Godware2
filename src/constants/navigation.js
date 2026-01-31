/**
 * Navigation configuration
 * Defines main navigation links and sections
 */

export const NAV_LINKS = [
  {
    id: 'home',
    name: 'Home',
    isActive: false
  },
  {
    id: 'shop',
    name: 'Shop',
    isActive: false,
    hasDropdown: true
  },
  {
    id: 'about',
    name: 'About',
    isActive: false
  },
  {
    id: 'contact',
    name: 'Contact',
    isActive: false
  }
];

export const SECTION_IDS = {
  HOME: 'Home',
  SHOP: 'Shop',
  ABOUT: 'About',
  CONTACT: 'Contact'
};
