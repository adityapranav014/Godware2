/**
 * Reusable Card component
 * Container for content with optional hover effects
 */

const Card = ({
  children,
  onClick,
  className = '',
  hover = false,
  padding = 'medium'
}) => {
  const baseClasses = 'rounded-2xl border border-stroke bg-surface transition-all duration-200';
  const hoverClasses = hover 
    ? 'cursor-pointer hover:shadow-lg hover:border-gold/30 hover:-translate-y-1' 
    : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const paddings = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
