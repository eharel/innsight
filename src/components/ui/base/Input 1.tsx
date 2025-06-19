import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional icon to display on the left side of the input
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon to display on the right side of the input
   */
  rightIcon?: React.ReactNode;
  /**
   * Whether the input should take up the full width of its container
   */
  fullWidth?: boolean;
}

export default function Input(
  { 
    leftIcon, 
    rightIcon, 
    className = '', 
      fullWidth = true,
      ...props 
    }, 
    ref
  ) {
    
    // Base input styles
    const baseInputClasses = 'bg-bg-base text-text-base rounded-md border border-border py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all';
    
    // Icon padding classes
    const iconPaddingClasses = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : 'px-3';
    
    // Width classes
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} relative ${className}`}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${baseInputClasses} ${iconPaddingClasses} ${widthClasses}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-text-muted">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
