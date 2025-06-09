import type { HTMLAttributes, ReactNode } from 'react';

export interface FormGroupProps extends HTMLAttributes<HTMLFieldSetElement> {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}

export function FormGroup({
  children,
  title,
  description,
  className = '',
  columns = 1,
  gap = 'md',
  ...props
}: FormGroupProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  }[columns];

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  }[gap];

  return (
    <fieldset className={`mb-8 ${className}`} {...props}>
      {(title || description) && (
        <div className="mb-4">
          {title && <legend className="text-lg font-medium">{title}</legend>}
          {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
        </div>
      )}
      <div className={`grid ${columnClasses} ${gapClasses}`}>
        {children}
      </div>
    </fieldset>
  );
}
