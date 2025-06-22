import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "default" | "required";
}

export default function Label({
  children,
  variant = "default",
  className = "",
  ...props
}: LabelProps) {
  return (
    <label {...props} className={`text-[var(--color-text-main)] text-sm font-medium ${className}`}>
      {children}
      {variant === "required" && <span className="ml-1 text-[var(--color-error)]">*</span>}
    </label>
  );
}
