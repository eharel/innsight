import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export default function Select(
  {
    label,
    options,
    error,
    hint,
    className = "",
    fullWidth = true,
    id,
    ...props
  },
  ref
) {
  // Generate a unique id if one isn't provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

  // Base select styles
  const baseSelectClasses = `
      bg-bg-base 
      text-text-base 
      rounded-md 
      border 
      border-border 
      py-2 
      px-3 
      pr-10 
      appearance-none 
      focus:outline-none 
      focus:ring-2 
      focus:ring-primary/30 
      focus:border-primary 
      transition-all
      ${fullWidth ? "w-full" : ""}
    `;

  // Error state styles
  const errorClasses = error
    ? "border-error focus:border-error focus:ring-error/30"
    : "";

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`${baseSelectClasses} ${errorClasses}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-text-muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {(error || hint) && (
        <p
          className={`mt-1 text-sm ${error ? "text-error" : "text-text-muted"}`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}
