import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Optional variant for the label
   * - 'default': Standard styling
   * - 'required': Used for required fields
   */
  variant?: 'default' | 'required';
}

export function Label({ className = '', children, variant = 'default', ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium ${variant === 'required' ? 'text-gray-800' : 'text-gray-700'} ${className}`}
      {...props}
    >
      {children}
      {variant === 'required' && <span className="ml-1 text-red-600">*</span>}
    </label>
  );
}

export default Label;