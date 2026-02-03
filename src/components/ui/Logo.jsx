/**
 * Reusable Logo component
 * Displays brand logo and text, can be clickable
 */

import { APP_CONFIG } from '../../constants';

const Logo = ({ onClick, size = 'medium', className = '' }) => {
  const sizes = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-12'
  };

  const textSizes = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  const supSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const baseClasses = 'flex items-center gap-2';
  const interactiveClasses = onClick 
    ? 'cursor-pointer hover:opacity-80 transition-opacity' 
    : '';
  
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} ${className}`}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/logo.webp`}
        alt={APP_CONFIG.name}
        className={`${sizes[size]} w-auto object-contain`}
      />
      <span className={`${textSizes[size]} font-display tracking-tight text-gold`}>
        {APP_CONFIG.name}
        <sup className={supSizes[size]}>®</sup>
      </span>
    </Component>
  );
};

export default Logo;
