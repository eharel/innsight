import type { ReactNode } from 'react';
import { Label } from './Label';

type FormFieldProps = {
  /**
   * Optional label text for the form field
   */
  label?: string;
  /**
   * ID of the form control this label is for
   */
  htmlFor?: string; 
  /**
   * Optional error message to display
   */
  error?: string;
  /**
   * Optional hint text to display
   */
  hint?: string;
  /**
   * Field content (typically an input, select, etc.)
   */
  children: ReactNode;
  /**
   * Layout orientation
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show borders between fields
   */
  hasBorder?: boolean;
  /**
   * Whether this field is required
   */
  required?: boolean;
};

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
  orientation = 'vertical',
  className = '',
  hasBorder = true,
  required = false,
}: FormFieldProps) {
  // Get the child's ID if available and htmlFor isn't explicitly provided
  const childId = !htmlFor && children && 
    typeof children === 'object' && 
    children !== null && 
    'props' in children && 
    typeof children.props === 'object' && 
    children.props !== null && 
    'id' in children.props ? 
    (children.props as { id?: string }).id : undefined;
  
  // Use htmlFor if provided, otherwise use the child's id
  const labelFor = htmlFor || childId;
  
  return (
    <div 
      className={`
        py-3
        ${hasBorder ? 'border-b border-gray-100 last:border-b-0' : ''}
        ${orientation === 'horizontal' ? 'sm:grid sm:grid-cols-12 sm:gap-6 sm:items-start' : ''}
        ${className}
      `}
    >
      {label && (
        <Label
          htmlFor={labelFor}
          variant={required ? 'required' : 'default'}
          className={`
            ${orientation === 'horizontal' ? 'sm:col-span-3 sm:pt-1.5' : 'mb-1.5'}
          `}
        >
          {label}
        </Label>
      )}
      
      <div 
        className={`
          ${orientation === 'horizontal' ? 'sm:col-span-9' : 'w-full'}
          ${label && orientation === 'horizontal' ? '' : ''}
        `}
      >
        {children}
        
        {(error || hint) && (
          <p className={`mt-1.5 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || hint}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormField;
