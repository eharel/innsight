import { forwardRef } from 'react';
import type { FormHTMLAttributes } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Form visual variant
   * - 'regular': Standard form with box styling
   * - 'modal': Streamlined form for use in modal dialogs
   */
  variant?: 'regular' | 'modal';
  className?: string;
}

const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { variant = 'regular', className = '', children, ...props },
  ref
) {
  // Apply different styling based on form variant
  let styles = '';
  
  if (variant === 'regular') {
    // Regular form styling with box appearance
    styles = 'p-6 bg-white border border-gray-200 rounded-lg shadow-sm';
  } else if (variant === 'modal') {
    // Modal form styling
    styles = 'w-full max-w-5xl';
  }
  
  return (
    <form
      ref={ref}
      className={`overflow-hidden text-sm ${styles} ${className}`}
      {...props}
    >
      {children}
    </form>
  );
});

export default Form;
