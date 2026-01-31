/**
 * Reusable Input component
 * Supports text, email, textarea types
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
  error = null
}) => {
  const baseClasses =
    'input-placeholder-visible w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/20';
  const stateClasses = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-stroke focus:border-gold';
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-60' : '';

  const combinedClasses = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  if (type === 'textarea') {
    return (
      <div className="w-full">
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={combinedClasses}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={combinedClasses}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
