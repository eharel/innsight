import { useFormFieldChild } from "@/hooks";
import Label from "./Label";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
}

export default function FormField({
  label,
  htmlFor,
  required,
  className,
  children,
  error,
  hint,
}: FormFieldProps) {
  const { id, modifiedChild } = useFormFieldChild(htmlFor, children);

  return (
    <div className={className}>
      <Label variant={required ? "required" : "default"} htmlFor={id}>
        {label}
      </Label>
      {modifiedChild}
      {error && <p className="text-red-600">{error}</p>}
      {hint && <p className="text-gray-500">{hint}</p>}
    </div>
  );
}
