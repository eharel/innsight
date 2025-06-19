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

/**
 * FormField manages the relationship between a form label and its input element.
 * 
 * The component automatically handles the ID linking between the label and its child input:
 * 
 * 1. If you provide an explicit `htmlFor` prop, that ID will be used for both the label and injected into the child component
 * 2. If you don't provide `htmlFor` but the child already has an `id` prop, that existing ID will be used
 * 3. If neither exists, FormField will generate a unique ID automatically and inject it into both
 * 
 * This means you don't need to manually specify IDs in most cases - FormField handles
 * the accessibility connection between label and input automatically.
 * 
 * @example
 * // No need to specify IDs - they're handled automatically:
 * <FormField label="Email address">
 *   <Input type="email" />
 * </FormField>
 * 
 * // You can still provide explicit IDs if needed:
 * <FormField label="Password" htmlFor="login-password">
 *   <Input type="password" />
 * </FormField>
 */
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
