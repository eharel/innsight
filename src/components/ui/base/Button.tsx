import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "link";
export type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm py-1.5 px-3",
  md: "text-base py-2 px-4",
  lg: "text-lg py-3 px-5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `btn btn-${variant} ${disabled ? "btn-disabled" : ""}`;

  return (
    <button
      {...props}
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading && <LoadingSpinner className="mr-2" />}
      {children}
    </button>
  );
}
