import type { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
}: BadgeProps) {
  // Base classes for all badges
  const baseClasses = "inline-flex items-center font-medium rounded-full";

  // Size-specific classes
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-0.5 gap-1.5",
    lg: "text-base px-3 py-1 gap-1.5",
  }[size];

  // Variant-specific classes - using CSS variables to respect theming
  const variantClasses = {
    default: "bg-bg-base text-text-base",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    error: "bg-error/10 text-error",
    info: "bg-info/10 text-info",
  }[variant];

  return (
    <span
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && <span className="icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
