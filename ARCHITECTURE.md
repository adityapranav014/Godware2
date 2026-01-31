# GOD WEAR - Production-Level Code Structure

## 📁 Project Architecture

This project follows industry-standard patterns for React applications with a clear separation of concerns:

```
src/
├── components/           # Reusable components
│   ├── ui/              # Basic UI elements (Button, Input, Card, Badge, Logo)
│   ├── layout/          # Layout components (Navbar, Footer, Section, SectionHeader)
│   ├── common/          # Shared business components (ProductCard, ContactForm, etc.)
│   └── index.js         # Barrel exports
│
├── sections/            # Page sections (HeroSection, CategorySection, etc.)
│
├── hooks/               # Custom React hooks
│   ├── useScrollSpy.js          # Tracks active section in viewport
│   ├── useScrollToSection.js    # Smooth GSAP scroll to sections
│   ├── useMobileMenu.js         # Mobile menu state management
│   └── index.js                 # Barrel exports
│
├── utils/               # Utility functions
│   ├── whatsapp.js      # WhatsApp integration utilities
│   ├── scroll.js        # Scroll-related utilities
│   ├── validation.js    # Form validation
│   └── index.js         # Barrel exports
│
├── constants/           # Application constants
│   ├── config.js        # App config (contact info, social links)
│   ├── navigation.js    # Navigation configuration
│   └── index.js         # Barrel exports
│
├── data/                # Data files
│   ├── products.js      # Product data and filters
│   ├── categories.js    # Category configuration
│   └── index.js         # Barrel exports
│
├── assets/              # Static assets (kept for backward compatibility)
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🎯 Key Improvements

### 1. **Separation of Concerns**
- **UI Components**: Reusable, presentation-only components
- **Layout Components**: Page structure (Navbar, Footer, Section wrappers)
- **Common Components**: Business logic components (ProductCard, ContactForm)
- **Sections**: Page-level sections composing smaller components

### 2. **Custom Hooks**
Extract complex logic into reusable hooks:
- `useScrollSpy`: IntersectionObserver-based section tracking
- `useScrollToSection`: GSAP-powered smooth scrolling
- `useMobileMenu`: Mobile menu state with body scroll lock

### 3. **Utilities**
Pure functions for common operations:
- WhatsApp message formatting
- Form validation
- Scroll utilities

### 4. **Constants & Configuration**
Centralized configuration management:
- Contact information
- Social media links
- Navigation structure
- Animation settings

### 5. **Data Layer**
Structured data management:
- Product catalog
- Category definitions
- Helper functions for data filtering

## 📦 Component Library

### UI Components (`components/ui/`)

#### Logo
```jsx
import { Logo } from '../components/ui';

<Logo onClick={handleClick} size="medium" />
```

#### Button
```jsx
import { Button } from '../components/ui';

<Button variant="primary" size="large" icon={<Send />}>
  Submit
</Button>
```

#### Input
```jsx
import { Input } from '../components/ui';

<Input 
  type="email" 
  placeholder="Email" 
  error={errors.email}
/>
```

#### Card
```jsx
import { Card } from '../components/ui';

<Card hover padding="large">
  {content}
</Card>
```

#### Badge
```jsx
import { Badge } from '../components/ui';

<Badge variant="success">70% OFF</Badge>
```

### Layout Components (`components/layout/`)

#### Section
```jsx
import { Section } from '../components/layout';

<Section background="white" padding="large">
  {children}
</Section>
```

#### SectionHeader
```jsx
import { SectionHeader } from '../components/layout';

<SectionHeader 
  title="Get in Touch"
  subtitle="We'd love to hear from you"
/>
```

### Common Components (`components/common/`)

#### ProductCard
```jsx
import { ProductCard } from '../components/common';

<ProductCard product={productData} />
```

#### ProductGrid
```jsx
import { ProductGrid } from '../components/common';

<ProductGrid 
  products={filteredProducts}
  activeCategory={category}
  onCategoryChange={handleChange}
/>
```

#### ContactForm
```jsx
import { ContactForm } from '../components/common';

<ContactForm />
```

#### ContactInfo
```jsx
import { ContactInfo } from '../components/common';

<ContactInfo />
```

## 🔧 Custom Hooks Usage

### useScrollSpy
```jsx
import { useScrollSpy } from './hooks';

const activeSection = useScrollSpy(sectionRefs);
```

### useScrollToSection
```jsx
import { useScrollToSection } from './hooks';

const scrollToSection = useScrollToSection(sectionRefs);
scrollToSection('Home');
```

### useMobileMenu
```jsx
import { useMobileMenu } from './hooks';

const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
```

## 📊 Data Management

### Products
```jsx
import { PRODUCTS, filterProductsByCategory } from './data';

const tshirts = filterProductsByCategory('T-Shirts');
```

### Categories
```jsx
import { CATEGORIES, getCategoryByName } from './data';

const category = getCategoryByName('T-Shirts');
```

## ⚙️ Configuration

All configuration is centralized in `constants/`:

```jsx
import { 
  APP_CONFIG, 
  CONTACT_INFO, 
  SOCIAL_LINKS,
  ANIMATION_CONFIG 
} from './constants';

console.log(CONTACT_INFO.whatsappNumber); // 917903598844
console.log(ANIMATION_CONFIG.scrollOffset); // 72
```

## 🛠️ Utilities

### WhatsApp Integration
```jsx
import { sendWhatsAppMessage } from './utils';

sendWhatsAppMessage({ name, email, message });
```

### Form Validation
```jsx
import { validateContactForm } from './utils';

const { isValid, errors } = validateContactForm(formData);
```

### Scroll Utilities
```jsx
import { scrollToTop, scrollToElement } from './utils';

scrollToTop();
scrollToElement(elementRef.current);
```

## 🎨 Design System

### Colors
- **Gold**: `#d4af37` - Primary accent
- **Zinc-900**: Dark backgrounds
- **White**: Light backgrounds

### Typography
- **Impact**: Headings (5xl → 7xl responsive)
- **Montreal**: Body text

### Spacing
- Section padding: `py-20` (default), `py-32` (large)
- Container: `max-w-7xl mx-auto px-4 xl:px-0`

## 🚀 Migration Guide

### Old vs New Structure

#### Before
```jsx
import { filterButtonsData, productData } from '../assets/data';
```

#### After
```jsx
import { CATEGORIES, PRODUCTS } from '../data';
```

#### Before
```jsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
useEffect(() => {
  // Manage body scroll
}, [isMobileMenuOpen]);
```

#### After
```jsx
const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
```

## 📝 Best Practices

1. **Always use barrel exports** (`index.js`) for cleaner imports
2. **Keep components small** - Single Responsibility Principle
3. **Extract reusable logic** into custom hooks
4. **Use TypeScript-style JSDoc** for documentation
5. **Centralize configuration** - No hardcoded values
6. **Consistent naming** - PascalCase for components, camelCase for utils

## 🔄 Backward Compatibility

Original files remain in `src/sections/` and `src/assets/` for backward compatibility. 
Refactored versions are available as `.refactored.jsx` files.

## 📚 Further Improvements

Potential enhancements for production:
- [ ] TypeScript migration
- [ ] Unit tests with Vitest
- [ ] Storybook for component documentation
- [ ] Performance monitoring
- [ ] Error boundaries
- [ ] Lazy loading for routes
- [ ] Progressive Web App (PWA) features

---

**Developed with ❤️ using modern React patterns and industry best practices**
