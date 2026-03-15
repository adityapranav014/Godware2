/**
 * Section wrapper component
 * Provides consistent spacing and layout for page sections.
 *
 * SPACING PHILOSOPHY:
 * High-end agencies use "aggressive whitespace" — large vertical gaps between
 * sections force the user to focus on one message at a time.
 * While a cheap site crams content "above the fold," a premium agency uses
 * 100px–160px+ vertical gaps. This feels expensive because it does what luxury
 * physical products do: give space for the object to breathe.
 *
 * All padding values use var(--space-*) fluid tokens (clamp()) so the spacing
 * shrinks and grows linearly between 375px and 1440px — never "awkward" at
 * any viewport width.
 */

const Section = ({
  children,
  id,
  dataSection,
  sectionRef,
  className = '',
  containerClassName = '',
  background = 'white',
  padding = 'default',
  style = {}
}) => {
  const backgrounds = {
    white: 'bg-subtle',
    gray: 'bg-base',
    dark: 'bg-black',
    transparent: 'bg-transparent'
  };

  /*
   * 8pt Grid + Luxury Whitespace:
   * - small:   ~40px mobile → ~64px desktop   (dense sections like stats bar)
   * - default: ~64px mobile → ~96px desktop   (standard content sections)
   * - large:   ~80px mobile → ~128px desktop  (feature sections, about, etc.)
   * - xl:      ~96px mobile → ~160px+ desktop (hero-adjacent, CTA — max breathing room)
   *
   * Uses CSS custom property fluid tokens, NOT fixed breakpoint classes.
   * This means the spacing is ALWAYS mathematically proportional — never
   * "random" like arbitrary px values.
   */
  const paddingStyles = {
    none: {},
    small: { paddingTop: 'var(--space-48)', paddingBottom: 'var(--space-48)' },
    default: { paddingTop: 'var(--space-80)', paddingBottom: 'var(--space-80)' },
    large: { paddingTop: 'var(--space-128)', paddingBottom: 'var(--space-128)' },
    xl: { paddingTop: 'var(--space-160)', paddingBottom: 'var(--space-160)' },
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      ref={sectionRef}
      className={`w-full ${backgrounds[background]} ${className}`}
      style={{ ...paddingStyles[padding], ...style }}
    >
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 ${containerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
