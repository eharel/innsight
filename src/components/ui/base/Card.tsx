import type { HTMLAttributes, ReactNode } from "react";

interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "flat" | "border";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function CardComponent({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardBaseProps) {
  // Base card styles
  const baseClasses = "overflow-hidden rounded-lg";

  // Variant-specific classes
  const variantClasses = {
    default: "bg-bg-surface shadow",
    flat: "bg-bg-surface",
    border: "bg-bg-surface border border-border",
  }[variant];

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      data-component="card"
      {...props}
    >
      {children}
    </div>
  );
}

function Header({
  children,
  actions,
  className = "",
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-border p-4 ${className}`}
      data-component="card-header"
      {...props}
    >
      <div className="space-y-1">{children}</div>
      {actions && <div>{actions}</div>}
    </div>
  );
}

function Body({ children, className = "", ...props }: CardBodyProps) {
  return (
    <div className={`p-4 ${className}`} data-component="card-body" {...props}>
      {children}
    </div>
  );
}

function Footer({ children, className = "", ...props }: CardFooterProps) {
  return (
    <div
      className={`border-t border-border p-4 ${className}`}
      data-component="card-footer"
      {...props}
    >
      {children}
    </div>
  );
}

// Legacy Card function to support older usages with title, subtitle, etc.
export default function Card({
  children,
  title,
  subtitle,
  headerAction,
  footerContent,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardBaseProps & {
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  footerContent?: ReactNode;
}) {
  // Padding classes for card content
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }[padding];

  // Only render header if we have any header content
  const renderHeader = title || subtitle || headerAction;

  return (
    <CardComponent variant={variant} className={className} {...props}>
      {renderHeader && (
        <Header actions={headerAction}>
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-text-muted text-sm">{subtitle}</p>}
        </Header>
      )}

      <div className={paddingClasses}>{children}</div>

      {footerContent && <Footer>{footerContent}</Footer>}
    </CardComponent>
  );
}

// Add compound components
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
