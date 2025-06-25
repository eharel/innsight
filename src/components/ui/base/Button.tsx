import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "./LoadingSpinner";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "destructive"
  | "text"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm py-1 px-3",
  md: "text-base py-2 px-4",
  lg: "text-lg py-3 px-5",
};

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-text-main)] hover:bg-[var(--color-bg-base)]",
  destructive: "bg-[var(--color-error)] text-white hover:bg-red-700",
  text: "text-[var(--color-text-main)] hover:bg-[var(--color-bg-base)]",
  link: "text-[var(--color-primary)] underline hover:text-[var(--color-primary-hover)]",
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
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || disabled}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {isLoading && <LoadingSpinner className="mr-2" />}
      {children}
    </button>
  );
}
