/**
 * Reusable Button component
 * Supports multiple variants and sizes
 */

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  className = '',
  icon = null,
  iconPosition = 'left'
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-ink text-surface hover:bg-ink/90',
    secondary: 'bg-gold text-white hover:bg-gold/90',
    outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-surface',
    ghost: 'bg-transparent hover:bg-base text-ink'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm rounded-lg',
    medium: 'px-6 py-3 text-base rounded-xl',
    large: 'px-8 py-4 text-lg rounded-2xl'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;
