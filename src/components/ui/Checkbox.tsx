import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  checked?: boolean;
}

export function Checkbox({
  label,
  description,
  error,
  className = '',
  id,
  checked,
  disabled,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <div className={`flex ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={`h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-bg-surface
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-error' : 'border-border'}`}
          {...props}
        />
      </div>
      {(label || description) && (
        <div className="ml-2 text-sm">
          {label && (
            <label
              htmlFor={id}
              className={`font-medium ${
                disabled ? 'text-text-muted' : 'text-text-base'
              } ${error ? 'text-error' : ''}`}
            >
              {label}
            </label>
          )}
          {description && (
            <p id={`${id}-description`} className="text-text-muted">
              {description}
            </p>
          )}
          {error && <p className="mt-1 text-sm text-error">{error}</p>}
        </div>
      )}
    </div>
  );
}
