import type { ReactNode } from 'react';

type FormRowProps = {
  label?: string;
  htmlFor?: string; 
  error?: string;
  hint?: string;
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
};

export function FormRow({
  label,
  htmlFor,
  error,
  hint,
  children,
  orientation = 'vertical',
  className = '',
}: FormRowProps) {
  return (
    <div className={`${orientation === 'horizontal' ? 'sm:flex sm:items-start sm:gap-4' : ''} ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={`block text-sm font-medium ${
            orientation === 'horizontal'
              ? 'sm:pt-2 sm:w-1/4'
              : 'mb-1'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className={orientation === 'horizontal' ? 'sm:w-3/4' : 'w-full'}>
        {children}
        
        {(error || hint) && (
          <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || hint}
          </p>
        )}
      </div>
    </div>
  );
}
