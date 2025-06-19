import type { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "text"
  | "destructive";
type ButtonSize = "sm" | "md" | "lg";

// Base button props without the HTML button specific attributes
type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
};

// Props for polymorphic rendering
type PolymorphicProps<E extends ElementType> = ButtonBaseProps & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof ButtonBaseProps>;

// Helps with typing the polymorphic component

export default function Button<E extends ElementType = "button">({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  as,
  ...props
}: PolymorphicProps<E>) {
  // Determine the component to render
  const Component = as || "button";

  // Base classes that all buttons share
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/50";

  // Size-specific classes
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  }[size];

  // Variant-specific classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover",
    secondary: "bg-secondary text-white hover:bg-secondary-hover",
    outline:
      "bg-transparent border border-border text-text-base hover:bg-bg-base",
    danger: "bg-error text-white hover:bg-error/90",
    text: "bg-transparent text-text-base hover:bg-bg-base px-2 py-1",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
  }[variant];

  // Additional state classes
  const stateClasses = [
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    fullWidth ? "w-full" : "",
  ].join(" ");

  const combinedClassName = `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses} ${className}`;

  // Different props for different component types
  const componentProps: Record<string, any> = {};

  // Handle button-specific props
  if (Component === "button") {
    componentProps.type = "button" in props ? props.type : "button";
    componentProps.disabled = disabled || isLoading;
    delete (props as any).type; // Remove type from props to avoid passing it twice
  }

  return (
    <Component className={combinedClassName} {...componentProps} {...props}>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && iconPosition === "left" && !isLoading && (
        <span className="icon">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="icon">{icon}</span>}
    </Component>
  );
}
