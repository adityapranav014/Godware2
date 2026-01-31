/**
 * Reusable Badge component
 * For tags, labels, and status indicators
 */

const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold uppercase tracking-wide';

  const variants = {
    default: 'bg-ink text-surface',
    primary: 'bg-gold text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white',
    danger: 'bg-red-500 text-white',
    outline: 'border-2 border-ink text-ink bg-transparent'
  };

  const sizes = {
    small: 'px-2 py-1 text-xs rounded',
    medium: 'px-3 py-1.5 text-sm rounded-md',
    large: 'px-4 py-2 text-base rounded-lg'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
