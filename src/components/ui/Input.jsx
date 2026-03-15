import { useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Premium Input component with agency-level focus animations
 * - Gold border glow on focus
 * - Floating label effect
 * - Subtle scale micro-interaction
 */
const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  rows = 4,
  error = null,
  style = {},
  autocomplete
}) => {
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const lineRef = useRef(null);

  const handleFocus = () => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleBlur = () => {
    if (lineRef.current) {
      gsap.to(lineRef.current, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power2.in' });
    }
  };

  const baseClasses =
    'w-full px-4 py-3.5 bg-transparent border rounded-xl transition-all duration-300 focus:outline-none text-white placeholder:text-white/25 font-sans text-sm';

  const focusClasses = 'border-white/10 hover:border-white/20';

  const errorClasses = error
    ? 'border-red-500/50 focus:border-red-500/70 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
    : '';

  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';

  const combinedClasses = `${baseClasses} ${error ? errorClasses : focusClasses} ${disabledClasses} ${className}`;

  const wrapperStyle = {
    position: 'relative',
    borderRadius: '0.75rem',
  };

  if (type === 'textarea') {
    return (
      <div ref={wrapRef} className="w-full" style={wrapperStyle}>
        <textarea
          ref={inputRef}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={combinedClasses}
          style={style}
          autoComplete={autocomplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span ref={lineRef} aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'var(--gold-500)', transform: 'scaleX(0)', pointerEvents: 'none', boxShadow: '0 0 6px rgba(201,139,58,0.5)' }} />
        {error && <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="w-full" style={wrapperStyle}>
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={combinedClasses}
        style={style}
        autoComplete={autocomplete}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span ref={lineRef} aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'var(--gold-500)', transform: 'scaleX(0)', pointerEvents: 'none', boxShadow: '0 0 6px rgba(201,139,58,0.5)' }} />
      {error && <p className="mt-1.5 text-xs text-red-400 font-sans">{error}</p>}
    </div>
  );
};

export default Input;
