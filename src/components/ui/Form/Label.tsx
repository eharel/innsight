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
    <label {...props} className={`${className}`}>
      {children}
      {variant === "required" && <span className="ml-1 text-red-600">*</span>}
    </label>
  );
}
