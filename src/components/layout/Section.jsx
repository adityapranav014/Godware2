/**
 * Section wrapper component
 * Provides consistent spacing and layout for page sections
 */

const Section = ({
  children,
  id,
  dataSection,
  sectionRef,
  className = '',
  containerClassName = '',
  background = 'white',
  padding = 'default'
}) => {
  const backgrounds = {
    white: 'bg-surface',
    gray: 'bg-base',
    dark: 'bg-ink',
    transparent: 'bg-transparent'
  };

  const paddings = {
    none: '',
    small: 'py-16',
    default: 'py-24',
    large: 'py-32'
  };

  return (
    <section
      id={id}
      data-section={dataSection}
      ref={sectionRef}
      className={`w-full ${backgrounds[background]} ${paddings[padding]} ${className}`}
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
