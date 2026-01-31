/**
 * SectionHeader component
 * Consistent header styling for all sections
 */

const SectionHeader = ({
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const subtitleAlignment = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  return (
    <div className={`mb-16 ${alignments[align]} ${className}`}>
      <h2 className={`text-5xl md:text-7xl impact uppercase text-ink mb-4 font-machina ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg text-muted max-w-2xl font-manrope ${subtitleAlignment[align]} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
