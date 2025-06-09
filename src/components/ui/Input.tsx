import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { 
      label, 
      error, 
      hint, 
      leftIcon, 
      rightIcon, 
      className = '', 
      fullWidth = true,
      id,
      ...props 
    }, 
    ref
  ) {
    // Generate a unique id if one isn't provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // Base input styles
    const baseInputClasses = 'bg-bg-base text-text-base rounded-md border border-border py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all';
    
    // Error state styles
    const errorClasses = error ? 'border-error focus:border-error focus:ring-error/30' : '';
    
    // Icon padding classes
    const iconPaddingClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : 'px-3';
    
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={`${baseInputClasses} ${errorClasses} ${iconPaddingClasses} ${widthClasses}`}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || hint) && (
          <p className={`mt-1 text-sm ${error ? 'text-error' : 'text-text-muted'}`}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
