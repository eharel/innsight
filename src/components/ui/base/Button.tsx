import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  isLoading,
  className,
  disabled,
  onClick,
}: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
