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
    white: 'bg-subtle',
    gray: 'bg-base',
    dark: 'bg-black',
    transparent: 'bg-transparent'
  };

  const paddings = {
    none: '',
    small: 'py-10 sm:py-12 md:py-16',
    default: 'py-12 sm:py-16 md:py-20 lg:py-24',
    large: 'py-16 sm:py-20 md:py-24 lg:py-32'
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
